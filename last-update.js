// ══════════════════════════════════════════════════════════════
// last-update.js  —  Datum des letzten Commits im Footer anzeigen
//
// KONFIGURATION (im <head>, VOR dem Laden dieser Datei):
//
//   var LAST_UPDATE_FIXED = '20.07.2026';   // Festes Datum, kein API-Call
//   var LAST_UPDATE_MODE  = 'repo';         // Letzter Commit im GESAMTEN Repo
//   var LAST_UPDATE_FILES = ['index.html', 'index'];  // Maximum der Liste;
//                          ein Ordnername steht fuer alles darin (1 Abfrage)
//   var LAST_UPDATE_AUTO  = false;          // die Zusatzdateien NICHT selbst suchen
//   (nichts davon gesetzt)                  // Die Seite und die Dateien, die
//                                           // sie laedt (siehe luSeitenDateien)
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

/* ── Welche Dateien gehoeren zu dieser Seite? ──────────────────────────
   Viele Seiten holen ihr Verhalten aus gemeinsamen Dateien (aufgaben.js,
   polynome.js, aufgaben.css) oder aus einem Ordner voller Daten (woerter,
   index). Aendert sich dort etwas, hat sich auch die Seite geaendert -
   also zaehlt das spaeteste Datum von allem, was sie laedt.

   Diese Dateien liegen auf jeder Seite und sagen nichts darueber, wann
   die Seite inhaltlich zuletzt angefasst wurde: */
const LU_EGAL = ['last-update.js', 'theme-language.js', 'einwilligung.js',
                 'styles.css', 'styles2.css', 'scale.css', 'scale.js'];
/* Mehr Pfade kosten mehr Abfragen. Sechs reichen fuer jede Seite hier,
   und die gemeinsamen Dateien liegen nach dem ersten Besuch ohnehin im
   Zwischenspeicher des Browsers - jeder Pfad wird je Browser und Tag
   genau einmal abgefragt, egal von wie vielen Seiten aus. */
const LU_MAX_DATEIEN = 6;

/** Eine Adresse aus der Seite auf ihren Pfad im Repo bringen. */
function luNormPfad(roh) {
  let p;
  try { p = new URL(roh, window.location.href).pathname; }
  catch (e) { return ''; }
  p = decodeURIComponent(p || '');
  const teile = p.split('/').filter(Boolean);
  if (!teile.length) return '';
  const datei = teile[teile.length - 1];
  const ordner = teile.length > 1 ? teile[teile.length - 2] : '';
  return (ordner && LU_ORDNER.indexOf(ordner) >= 0) ? ordner + '/' + datei : datei;
}

/** Die Seite selbst und alles, was sie an eigenen Dateien laedt. */
function luSeitenDateien() {
  const raus = [luCurrentPath()];
  const kandidaten = [];
  const imOrdner = {};
  document.querySelectorAll('script[src], link[rel="stylesheet"][href], img[src]')
    .forEach(el => {
      const roh = el.getAttribute('src') || el.getAttribute('href') || '';
      if (!roh || /^(https?:)?\/\//i.test(roh) || /^data:/i.test(roh)) return;
      const p = luNormPfad(roh);
      if (!p || LU_EGAL.indexOf(p) >= 0 || p === raus[0]) return;
      const i = p.indexOf('/');
      if (i > 0) imOrdner[p.slice(0, i)] = (imOrdner[p.slice(0, i)] || 0) + 1;
      kandidaten.push(p);
    });
  kandidaten.forEach(p => {
    const i = p.indexOf('/');
    /* Liegen mehrere Dateien im selben Projektordner, fragen wir lieber
       den Ordner ab: eine Abfrage statt sechs. */
    const eintrag = (i > 0 && imOrdner[p.slice(0, i)] > 1) ? p.slice(0, i) : p;
    if (raus.indexOf(eintrag) < 0) raus.push(eintrag);
  });
  return raus.slice(0, LU_MAX_DATEIEN);
}

/** Datum der aktuellen Datei - und der Dateien, die sie mitbringt. */
async function initLastUpdate() {
  const auto = (typeof LAST_UPDATE_AUTO === 'undefined') ? true : !!LAST_UPDATE_AUTO;
  if (!auto) { luWrite(await fetchLastCommitDate(luCurrentPath())); return; }
  const dateien = luSeitenDateien();
  luDebug('eigene Dateien dieser Seite:', dateien.join(', '));
  await setLastUpdateFromFiles(dateien);
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
