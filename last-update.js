// ══════════════════════════════════════════════════════════════
// last-update.js  —  Datum des letzten Commits im Footer anzeigen
//
// KONFIGURATION (im <head>, VOR dem Laden dieser Datei):
//
//   var LAST_UPDATE_FIXED = '20.07.2026';   // Festes Datum, kein API-Call
//   var LAST_UPDATE_MODE  = 'repo';         // Letzter Commit im GESAMTEN Repo
//   var LAST_UPDATE_FILES = ['index.html', 'index/cards.js'];  // Maximum der Liste
//   (nichts davon gesetzt)                  // Wie bisher: nur die aktuelle Datei
//
//   var LAST_UPDATE_CACHE       = true;     // sessionStorage nutzen (Standard: true)
//   var LAST_UPDATE_CACHE_HOURS = 24;       // Gueltigkeitsdauer in Stunden (Standard: 24)
//   var LAST_UPDATE_DEBUG       = true;     // console.log: woher kam das Datum?
//
// Manuell jederzeit aufrufbar:
//   setLastUpdateFromRepo();
//   setLastUpdateFromFiles(['a.html','b.js']);
//   clearLastUpdateCache();                 // Cache verwerfen (Testen)
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
  if (element && date) element.textContent = luFormat(date);
}

// ── sessionStorage-Cache ─────────────────────────────────────

function luCacheRead(key) {
  if (!luCacheEnabled()) return undefined;
  try {
    const raw = sessionStorage.getItem(LU_CACHE_PREFIX + key);
    if (!raw) return undefined;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.ts > luCacheMs()) {
      sessionStorage.removeItem(LU_CACHE_PREFIX + key);
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
  try {
    sessionStorage.setItem(LU_CACHE_PREFIX + key, JSON.stringify({
      ts: Date.now(),
      date: date ? date.toISOString() : null
    }));
  } catch (e) {
    // sessionStorage voll oder deaktiviert – kein Problem
  }
}

/** Alle gecachten Datums-Eintraege loeschen (nuetzlich zum Testen). */
function clearLastUpdateCache() {
  try {
    Object.keys(sessionStorage)
      .filter(k => k.startsWith(LU_CACHE_PREFIX))
      .forEach(k => sessionStorage.removeItem(k));
    luDebug('Cache geleert');
  } catch (e) {}
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
  if (!dates.length) return;
  const max = new Date(Math.max(...dates.map(d => d.getTime())));
  luDebug('Maximum aus', files.length, 'Datei(en) →', luFormat(max));
  luWrite(max);
}

/** Bisheriges Verhalten: Datum der aktuellen Datei. */
async function initLastUpdate() {
  let currentFile = window.location.pathname.split('/').pop();
  if (!currentFile) currentFile = 'index.html';
  luWrite(await fetchLastCommitDate(currentFile));
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
