// ══════════════════════════════════════════════════════════════
// last-update.js  —  Datum des letzten Commits im Footer anzeigen
//
// KONFIGURATION (im <head>, VOR dem Laden dieser Datei):
//
//   var LAST_UPDATE_FIXED = '20.07.2026';   // Festes Datum, kein API-Call
//   var LAST_UPDATE_MODE  = 'repo';         // Letzter Commit im GESAMTEN Repo
//   var LAST_UPDATE_FILES = ['index.html', 'index'];  // Maximum der Liste;
//                          ein Ordnername steht fuer alles darin (1 Abfrage)
//   (nichts davon gesetzt)                  // Wie bisher: nur die aktuelle Datei
//
//   var LAST_UPDATE_CACHE       = true;     // Zwischenspeicher nutzen (Standard: true)
//   var LAST_UPDATE_CACHE_HOURS = 24;       // Gueltigkeitsdauer in Stunden (Standard: 24)
//   var LAST_UPDATE_DEBUG       = true;     // console.log: woher kam das Datum?
//
// Manuell jederzeit aufrufbar:
//   setLastUpdateFromRepo();
//   setLastUpdateFromFiles(['a.html','b.js']);
//   clearLastUpdateCache();                 // Cache verwerfen (Testen)
//
// Jede Seite fragt nur ihre eigene Datei ab (bzw. die in LAST_UPDATE_FILES
// aufgezaehlten Dateien/Ordner). Das Ergebnis liegt danach im Browser des
// Besuchers (localStorage, ersatzweise sessionStorage) und wird 24 Stunden
// lang wiederverwendet - ohne das waere das GitHub-Kontingent von 60
// Abfragen je Stunde und IP in einem Klassenraum schnell aufgebraucht.
// ══════════════════════════════════════════════════════════════

const LU_USER = 'LehrerKoch';
const LU_REPO = 'LehrerKoch.github.io';
const LU_CACHE_PREFIX = 'lastUpdate:';

// ── Konfiguration auslesen (mit Defaults) ────────────────────

function luCacheEnabled() {
  return (typeof LAST_UPDATE_CACHE === 'undefined') ? true : !!LAST_UPDATE_CACHE;
}
function luCacheMs() {
  const h = (typeof LAST_UPDATE_CACHE_HOURS === 'number') ? LAST_UPDATE_CACHE_HOURS : 24;
  return h * 3600 * 1000;
}
function luDebug(...args) {
  if (typeof LAST_UPDATE_DEBUG !== 'undefined' && LAST_UPDATE_DEBUG) {
    console.log('[last-update]', ...args);
  }
}

// ── Hilfsfunktionen ──────────────────────────────────────────

function luFormat(date) {
  return date.toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

function luWrite(date) {
  const element = document.getElementById('last-update');
  if (!element) return;
  if (date) { element.textContent = luFormat(date); return; }
  /* Kein Datum zu bekommen (offline, Kontingent aufgebraucht, unbekannter
     Pfad): Dann lieber gar nichts zeigen als dauerhaft drei Punkte. */
  element.textContent = '';
  const wort = document.querySelector('.fu-wort');
  if (wort) wort.style.display = 'none';
}

// ── Zwischenspeicher im Browser ──────────────────────────────
// Bevorzugt localStorage (bleibt beim naechsten Besuch erhalten), sonst
// sessionStorage. Ist beides gesperrt, wird eben jedes Mal neu gefragt.

function luStore() {
  try { if (typeof localStorage !== 'undefined') return localStorage; } catch (e) {}
  try { if (typeof sessionStorage !== 'undefined') return sessionStorage; } catch (e) {}
  return null;
}

function luCacheRead(key) {
  if (!luCacheEnabled()) return undefined;
  const store = luStore();
  if (!store) return undefined;
  try {
    const raw = store.getItem(LU_CACHE_PREFIX + key);
    if (!raw) return undefined;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.ts > luCacheMs()) {
      store.removeItem(LU_CACHE_PREFIX + key);
      luDebug('Cache abgelaufen fuer', key);
      return undefined;
    }
    // null = "kein Commit gefunden", wird ebenfalls gecacht
    return entry.date === null ? null : new Date(entry.date);
  } catch (e) {
    return undefined;
  }
}

function luCacheWrite(key, date) {
  if (!luCacheEnabled()) return;
  const store = luStore();
  if (!store) return;
  try {
    store.setItem(LU_CACHE_PREFIX + key, JSON.stringify({
      ts: Date.now(),
      date: date ? date.toISOString() : null
    }));
  } catch (e) {
    // Speicher voll oder gesperrt – kein Problem
  }
}

/** Alle gecachten Datums-Eintraege loeschen (nuetzlich zum Testen). */
function clearLastUpdateCache() {
  for (const store of [luStore(), (function () { try { return sessionStorage; } catch (e) { return null; } })()]) {
    if (!store) continue;
    try {
      Object.keys(store)
        .filter(k => k.startsWith(LU_CACHE_PREFIX))
        .forEach(k => store.removeItem(k));
    } catch (e) {}
  }
  luDebug('Cache geleert');
}

// ── GitHub-Abfrage ───────────────────────────────────────────

/**
 * Letztes Commit-Datum fuer einen Pfad. Ohne path: gesamtes Repo.
 * @returns {Promise<Date|null>}
 */
async function fetchLastCommitDate(path) {
  const key = path || '__repo__';
  const label = path || '(gesamtes Repo)';

  const cached = luCacheRead(key);
  if (cached !== undefined) {
    luDebug('aus sessionStorage:', label, '→', cached ? luFormat(cached) : 'kein Datum');
    return cached;
  }

  const q = path ? `path=${encodeURIComponent(path)}&` : '';
  const url = `https://api.github.com/repos/${LU_USER}/${LU_REPO}/commits?${q}page=1&per_page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      luDebug('API-Antwort nicht ok fuer', label, '– Status', response.status);
      return null;
    }
    const commits = await response.json();
    if (!Array.isArray(commits) || commits.length === 0) {
      luCacheWrite(key, null);
      luDebug('von GitHub-API:', label, '→ kein Commit gefunden');
      return null;
    }
    const date = new Date(commits[0].commit.committer.date);
    luCacheWrite(key, date);
    luDebug('von GitHub-API:', label, '→', luFormat(date));
    return date;
  } catch (error) {
    console.error('GitHub API Fehler:', error);
    return null;
  }
}

// ── Oeffentliche API ─────────────────────────────────────────

/** Letzter Commit des gesamten Repos (1 API-Request). */
async function setLastUpdateFromRepo() {
  luWrite(await fetchLastCommitDate(null));
}

/**
 * Maximum der letzten Update-Daten ueber eine Liste von Dateien.
 * @param {string[]} files z.B. ['index.html', 'index/cards.js']
 */
async function setLastUpdateFromFiles(files) {
  if (!Array.isArray(files) || files.length === 0) return;
  const dates = (await Promise.all(files.map(f => fetchLastCommitDate(f))))
                  .filter(d => d instanceof Date && !isNaN(d));
  if (!dates.length) { luWrite(null); return; }
  const max = new Date(Math.max(...dates.map(d => d.getTime())));
  luDebug('Maximum aus', files.length, 'Datei(en) →', luFormat(max));
  luWrite(max);
}

/* Unterordner des Projekts. Nur diese duerfen im Pfad stehen bleiben - alles
   davor gehoert zum Rechner des Besuchers und nicht ins Repo. */
const LU_ORDNER = ['Geographie', 'Anno', 'Abitur', 'index', 'woerter', 'static', 'Bilder'];

/**
 * Pfad der aktuellen Seite, so wie er im Repo steht.
 * Liegt die Seite in einem Projektordner, gehoert der davor
 * ("Geographie/geographie.html") - sonst faende die API nichts.
 * Alles andere vor dem Dateinamen wird weggelassen: Oeffnet man die Datei
 * direkt vom Rechner (file://), stuende dort sonst der komplette Pfad des
 * Ordners, und die Abfrage liefe ins Leere - in der Fusszeile blieb dann
 * dauerhaft "..." stehen.
 */
function luCurrentPath() {
  let p = decodeURIComponent(window.location.pathname || '');
  if (p.endsWith('/') || !p) p += 'index.html';
  const teile = p.split('/').filter(Boolean);
  const datei = teile[teile.length - 1] || 'index.html';
  const ordner = teile.length > 1 ? teile[teile.length - 2] : '';
  return (ordner && LU_ORDNER.indexOf(ordner) >= 0) ? ordner + '/' + datei : datei;
}

/** Bisheriges Verhalten: Datum der aktuellen Datei. */
async function initLastUpdate() {
  luWrite(await fetchLastCommitDate(luCurrentPath()));
}

// ── Auto-Start ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof LAST_UPDATE_FIXED === 'string' && LAST_UPDATE_FIXED.trim()) {
    const element = document.getElementById('last-update');
    if (element) element.textContent = LAST_UPDATE_FIXED.trim();
    luDebug('festes Datum aus LAST_UPDATE_FIXED →', LAST_UPDATE_FIXED.trim());
    return;
  }
  if (Array.isArray(window.LAST_UPDATE_FILES) && window.LAST_UPDATE_FILES.length) {
    setLastUpdateFromFiles(window.LAST_UPDATE_FILES);
  } else if (window.LAST_UPDATE_MODE === 'repo') {
    setLastUpdateFromRepo();
  } else {
    initLastUpdate();
  }
});
