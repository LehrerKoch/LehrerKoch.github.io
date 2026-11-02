// ══════════════════════════════════════════════════════════════
// theme-language.js — Hell/Dunkel-Umschalter + Deutsch/Englisch
//
// Bindet auf jeder Seite oben rechts zwei runde Knöpfe ein
// (Look wie in Geographie/geographie.html) und verwaltet:
//
//   localStorage 'matheToolsTheme'  : 'light' | 'dark'
//   localStorage 'matheToolsLang'   : 'de' | 'en'
//
// Die Einstellungen gelten für die gesamte Website (alle Seiten
// der Domain lesen dieselben Schlüssel).
//
// EINBINDUNG (jede Seite):
//   1) Im <head> möglichst früh der Mini-Bootstrap (verhindert
//      Farb-Aufblitzen beim Laden):
//        <script>try{var t=localStorage.getItem('matheToolsTheme');
//        if(t==='dark'||(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches))
//        document.documentElement.classList.add('dark');}catch(e){}</script>
//   2) <script src="theme-language.js" defer></script>
//   Fehlt diese Datei, funktioniert die Seite normal weiter
//   (Deutsch + per Bootstrap gespeichertes Farbschema, nur ohne Knöpfe).
//
// KONFIGURATION (im <head>, VOR dem Laden dieser Datei):
//   var THEME_LANG_NO_THEME   = true;  // nur Sprach- und Melde-Knopf (Speziallook, z.B. ram_viewer)
//   var THEME_LANG_NO_MELDEN  = true;  // ohne "Fehler melden"-Knopf
//   var THEME_LANG_NO_BUTTONS = true;  // Logik ohne Knöpfe (Seite baut eigene Bedienelemente)
//
// FEHLER MELDEN (dritter Knopf ⚠ oben rechts):
//   Öffnet das Mailprogramm mit vorbereitetem Text in der aktuellen
//   Sprache: Seitentitel, vollständige URL, Ansicht (Sprache/Modus),
//   Browser-Kennung – und, wenn die Seite es anbietet, das gerade
//   angezeigte Beispiel:
//     window.fehlerKontext = () => 'f(x) = (3x²+2)⁵';
//   Die Funktion wird erst beim Klick aufgerufen, gibt also immer den
//   aktuellen Stand zurück. Eigene Bedienelemente rufen tlFehlerMelden().
//
// ÜBERSETZUNGEN IM HTML:
//   <h1 data-de="Aufgabe" data-en="Task">Aufgabe</h1>
//   Attribute: data-de-title / data-en-title, data-de-placeholder / …,
//              data-de-aria-label / …, data-de-value / …, data-de-alt / …,
//              data-de-tooltip / … und data-de-tip / … (eigene Tooltips)
//   Elemente ohne data-Attribute bleiben unverändert (z.B. „ln“, Namen).
//   HTML in den Werten ist erlaubt; enthält ein Wert \( … \) oder $$ … $$,
//   wird MathJax für das Element automatisch neu gesetzt.
//
// DYNAMISCHE TEXTE IM SEITEN-JS:
//   tlText('Lösung', 'Solution')   → Text in aktueller Sprache
//   tlSprache()                    → 'de' | 'en'
//   tlDunkel()                     → true | false
//   tlUebersetze(element?)         → data-de/-en unterhalb von element (neu) anwenden
//
// DEZIMALZAHLEN:
//   tlDezimal(3.5)          → "3,5"   (de)  bzw. "3.5"  (en)
//   tlDezimal(3.5, true)    → "3{,}5" (de)  bzw. "3.5"  (en)   ← für LaTeX
//   tlDezimalText(str, tex) → alle Zahlen in einem Text/TeX-Ausdruck umstellen
//   tlZahlAus("3,5")        → 3.5     (Eingabe: Komma und Punkt immer erlaubt)
//
// EIGENE REAKTION AUF UMSCHALTEN (z.B. Canvas neu zeichnen):
//   window.addEventListener('tl-theme',   e => { /* e.detail.dunkel  */ });
//   window.addEventListener('tl-sprache', e => { /* e.detail.sprache */ });
//   oder: window.onThemeWechsel = (dunkel) => {…};
//         window.onSprachWechsel = (sprache) => {…};
//
// KNOPF-POSITION: Standard ist schwebend oben rechts. Besitzt die
// Seite ein Element mit id="themeLangSlot", werden die Knöpfe
// stattdessen dort eingefügt (z.B. in einer eigenen Kopfleiste).
// Farben der Knöpfe sind per CSS-Variablen übersteuerbar:
//   --tl-knopf-bg, --tl-knopf-text, --tl-knopf-rand (+ '-dunkel')
// ══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const THEME_KEY = 'matheToolsTheme';
  const LANG_KEY  = 'matheToolsLang';

  let sprache = 'de';
  let dunkel  = false;

  // ── Hilfen ───────────────────────────────────────────────────
  function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lsSet(key, wert) { try { localStorage.setItem(key, wert); } catch (e) {} }

  // ── Erkennung Startzustand ───────────────────────────────────
  function ermittleTheme() {
    const gespeichert = lsGet(THEME_KEY);
    if (gespeichert === 'dark' || gespeichert === 'light') return gespeichert === 'dark';
    try {
      return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) { return false; }
  }

  // Regel: Systemsprache Deutsch (egal welches Land) ODER Gerät in
  // D/A/CH (Locale-Region bzw. Zeitzone) → Deutsch, sonst Englisch.
  function ermittleSprache() {
    const gespeichert = lsGet(LANG_KEY);
    if (gespeichert === 'de' || gespeichert === 'en') return gespeichert;
    try {
      const liste = (navigator.languages && navigator.languages.length)
        ? navigator.languages : [navigator.language || 'de'];
      if (liste.some(l => /^de/i.test(l))) return 'de';
      const regionDACH = liste.some(l => /[-_](DE|AT|CH|LI)($|[-_])/i.test(l));
      let zoneDACH = false;
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        zoneDACH = ['Europe/Berlin', 'Europe/Busingen', 'Europe/Vienna',
                    'Europe/Zurich', 'Europe/Vaduz'].indexOf(tz) !== -1;
      } catch (e) {}
      return (regionDACH || zoneDACH) ? 'de' : 'en';
    } catch (e) { return 'de'; }
  }

  // ── Übersetzung anwenden ─────────────────────────────────────
  // 'tooltip' und 'tip' zielen auf data-tooltip bzw. data-tip
  // (eigene Tooltip-Systeme der Seiten)
  const ATTRIBUTE = ['title', 'placeholder', 'aria-label', 'value', 'alt', 'tooltip', 'tip'];

  function tlUebersetze(wurzel) {
    const basis = wurzel || document;
    const mathNeu = [];
    basis.querySelectorAll('[data-de], [data-en]').forEach(el => {
      const wert = el.getAttribute('data-' + sprache);
      if (wert === null) return;                       // für diese Sprache nichts hinterlegt
      if (el.tagName === 'TITLE') { el.textContent = wert; return; }
      if (el.innerHTML !== wert) {
        el.innerHTML = wert;
        // \( … \), \[ … \], $$ … $$ und – auf Seiten mit entsprechender
        // MathJax-Konfiguration – auch $ … $ neu setzen lassen
        if (/\\\(|\\\[|\$\$|\$[^$]+\$/.test(wert)) mathNeu.push(el);
      }
    });
    ATTRIBUTE.forEach(attr => {
      const ziel = (attr === 'tooltip' || attr === 'tip') ? ('data-' + attr) : attr;
      basis.querySelectorAll('[data-de-' + attr + '], [data-en-' + attr + ']').forEach(el => {
        const wert = el.getAttribute('data-' + sprache + '-' + attr);
        if (wert !== null) el.setAttribute(ziel, wert);
      });
    });
    if (mathNeu.length && window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise(mathNeu).catch(() => {});
    }
  }

  // ── Aufgeklappte Bereiche überdauern den Wechsel ─────────────
  // Viele Seiten bauen beim Sprach- oder Themenwechsel Teile der Seite neu
  // auf. Dabei gingen aufgeklappte <details> zu. Hier wird ihr Zustand kurz
  // gemerkt und danach wiederhergestellt - die Seiten selbst müssen nichts tun.
  function klappstand() {
    var auf = [];
    var alle = document.querySelectorAll('details');
    for (var i = 0; i < alle.length; i++) if (alle[i].open) auf.push(alle[i].id || ('#' + i));
    return auf;
  }
  function klappstandHerstellen(auf) {
    if (!auf || !auf.length) return;
    var alle = document.querySelectorAll('details');
    for (var i = 0; i < alle.length; i++) {
      var schluessel = alle[i].id || ('#' + i);
      if (auf.indexOf(schluessel) >= 0 && !alle[i].open) alle[i].open = true;
    }
  }
  function mitKlappstand(fn) {
    var auf = klappstand();
    fn();
    // einmal sofort und einmal nach dem Neuaufbau der Seite
    klappstandHerstellen(auf);
    setTimeout(function () { klappstandHerstellen(auf); }, 0);
    setTimeout(function () { klappstandHerstellen(auf); }, 120);
  }

  // ── Setzen + speichern ───────────────────────────────────────
  function setzeTheme(neuDunkel, speichern) {
    dunkel = !!neuDunkel;
    document.documentElement.classList.toggle('dark', dunkel);
    if (document.body) document.body.classList.toggle('dark', dunkel);
    if (speichern !== false) lsSet(THEME_KEY, dunkel ? 'dark' : 'light');
    aktualisiereKnoepfe();
    try { mitKlappstand(function () {
      window.dispatchEvent(new CustomEvent('tl-theme', { detail: { dunkel: dunkel } }));
    }); } catch (e) {}
    if (typeof window.onThemeWechsel === 'function') { try { window.onThemeWechsel(dunkel); } catch (e) {} }
  }

  function setzeSprache(neueSprache, speichern) {
    sprache = (neueSprache === 'en') ? 'en' : 'de';
    document.documentElement.lang = sprache;
    if (speichern !== false) lsSet(LANG_KEY, sprache);
    tlUebersetze(document);
    aktualisiereKnoepfe();
    try { mitKlappstand(function () {
      window.dispatchEvent(new CustomEvent('tl-sprache', { detail: { sprache: sprache } }));
    }); } catch (e) {}
    if (typeof window.onSprachWechsel === 'function') { try { window.onSprachWechsel(sprache); } catch (e) {} }
  }

  // ── Dezimaltrennzeichen ──────────────────────────────────────
  // Angezeigt wird im Deutschen das Komma, im Englischen der Punkt.
  // In LaTeX gehört das deutsche Komma in geschweifte Klammern ({,}),
  // sonst setzt MathJax dahinter einen Abstand wie nach einem Satzzeichen.
  // Eingaben werden überall großzügig behandelt: Komma und Punkt sind beide
  // erlaubt, unabhängig von der eingestellten Sprache.
  function dezimal(wert, tex) {
    if (wert === null || wert === undefined || wert === '') return '';
    const s = String(wert).trim().replace(',', '.');
    if (sprache === 'en') return s;
    return s.replace('.', tex ? '{,}' : ',');
  }

  // Dasselbe für alle Zahlen in einem längeren Text bzw. TeX-Ausdruck.
  function dezimalText(text, tex) {
    if (text === null || text === undefined) return '';
    const s = String(text);
    if (sprache === 'en') return s.replace(/(\d)\{,\}(\d)/g, '$1.$2')
                                  .replace(/(\d),(\d)/g, '$1.$2');
    return s.replace(/(\d)\.(\d)/g, tex ? '$1{,}$2' : '$1,$2');
  }

  // Eingabe -> Zahl. Komma und Punkt gelten gleichermaßen, Leerzeichen
  // (auch geschützte) werden ignoriert. Ergibt NaN, wenn nichts passt.
  function zahlAus(text) {
    if (typeof text === 'number') return text;
    const s = String(text === null || text === undefined ? '' : text)
      .replace(/[\s  ]/g, '').replace(',', '.');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s)) return NaN;
    return parseFloat(s);
  }

  // ── Fehlermeldung per E-Mail ─────────────────────────────────
  // Die Adresse steht nicht im Klartext im Quelltext, sondern wird erst
  // beim Klick entschlüsselt (schützt gegen einfaches Absammeln).
  // Zum Ändern: btoa('neue@adresse.de') in der Browser-Konsole ausführen.
  const MAIL_B64 = 'bGVocmVya29jaDkwQGdtYWlsLmNvbQ==';

  // Text eines Elements in gut lesbarer Form. Bei MathJax-Formeln wird
  // die ursprüngliche TeX-Quelle zurückgegeben - "f(x)=\ln(2x-5)" liest
  // sich in einer E-Mail deutlich besser als die gesetzte Formel, deren
  // innerText zu "𝑓 ( 𝑥 ) = ln ⁡ ( 2 𝑥 − 5 )" zerfällt.
  function formelText(el) {
    if (!el) return '';
    try {
      const doc = window.MathJax && MathJax.startup && MathJax.startup.document;
      if (doc && doc.math && el.querySelector('mjx-container, .MathJax')) {
        const teile = [];
        for (const eintrag of doc.math) {
          if (!eintrag.typesetRoot || !el.contains(eintrag.typesetRoot) || !eintrag.math) continue;
          // MathJax legt zusaetzlich MathML-Eintraege an - die sind hier unbrauchbar
          const istTeX = !eintrag.inputJax || eintrag.inputJax.name === 'TeX';
          const quelle = String(eintrag.math).replace(/\s+/g, ' ').trim();
          if (!istTeX || /^<math\b/i.test(quelle)) continue;
          if (quelle) teile.push(quelle);
        }
        if (teile.length) return teile.join('   ');
      }
    } catch (e) {}
    return (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  // Eine Seite kann ihr gerade angezeigtes Beispiel beisteuern:
  //   window.fehlerKontext = () => 'f(x) = (3x²+2)⁵';
  // Fehlt das, bleibt es bei URL und Seitentitel - auf Seiten, die ihre
  // Einstellungen im Hash führen, steckt das Nötige schon in der URL.
  function holeKontext() {
    try {
      if (typeof window.fehlerKontext === 'function') {
        const wert = window.fehlerKontext();
        if (wert) return String(wert).replace(/\s+/g, ' ').trim().slice(0, 500);
      }
    } catch (e) {}
    return '';
  }

  function meldeBetreff() {
    const titel = (document.title || '').trim();
    return (sprache === 'en' ? 'Problem report – Mathe-Tools' : 'Fehlermeldung – Mathe-Tools') +
           (titel ? ': ' + titel : '');
  }

  function meldeText() {
    const en = (sprache === 'en');
    const beispiel = holeKontext();
    const zeilen = [
      en ? 'Description of the problem:' : 'Fehlerbeschreibung:',
      '',
      '',
      '',
      en ? '--- Please keep the lines below, they help me reproduce it ---'
         : '--- Bitte stehen lassen, das hilft beim Nachstellen ---',
      (en ? 'Page:     ' : 'Seite:    ') + (document.title || '-'),
      'URL:      ' + location.href
    ];
    if (beispiel) zeilen.push((en ? 'Example:  ' : 'Beispiel: ') + beispiel);
    zeilen.push(
      (en ? 'View:     ' : 'Ansicht:  ') +
        (en ? 'English' : 'Deutsch') + ', ' +
        (dunkel ? (en ? 'dark' : 'Dunkel') : (en ? 'light' : 'Hell')),
      (en ? 'Browser:  ' : 'Browser:  ') + (navigator.userAgent || '-')
    );
    return zeilen.join('\n');
  }

  function fehlerMelden() {
    let adresse = '';
    try { adresse = atob(MAIL_B64); } catch (e) { return; }
    const ziel = 'mailto:' + adresse +
      '?subject=' + encodeURIComponent(meldeBetreff()) +
      '&body='    + encodeURIComponent(meldeText());
    try { window.location.href = ziel; } catch (e) {}
  }

  // ── Knöpfe ───────────────────────────────────────────────────
  let knopfTheme = null, knopfSprache = null, knopfMelden = null;

  function aktualisiereKnoepfe() {
    if (knopfTheme) {
      knopfTheme.textContent = dunkel ? '☀️' : '🌙';
      knopfTheme.title = (sprache === 'en') ? 'Toggle light/dark mode' : 'Hell/Dunkel umschalten';
      knopfTheme.setAttribute('aria-label', knopfTheme.title);
    }
    if (knopfSprache) {
      // zeigt die Sprache, AUF die umgeschaltet wird
      knopfSprache.textContent = (sprache === 'de') ? 'EN' : 'DE';
      knopfSprache.title = (sprache === 'de') ? 'Switch to English' : 'Auf Deutsch umschalten';
      knopfSprache.setAttribute('aria-label', knopfSprache.title);
    }
    if (knopfMelden) {
      knopfMelden.title = (sprache === 'en') ? 'Report a problem' : 'Fehler melden';
      knopfMelden.setAttribute('aria-label', knopfMelden.title);
    }
  }

  function baueKnoepfe() {
    if (window.THEME_LANG_NO_BUTTONS) return;

    const stil = document.createElement('style');
    stil.textContent =
      '.tl-schalter{display:inline-flex;gap:8px;align-items:center;}' +
      '.tl-schalter.tl-schwebend{position:fixed;top:10px;right:10px;z-index:5000;}' +
      // !important, damit seitenweite button-Regeln (manche nutzen selbst
      // !important) die Knöpfe nicht verformen
      '.tl-knopf{background:var(--tl-knopf-bg,#fff)!important;color:var(--tl-knopf-text,#1f2428)!important;' +
        'border:1px solid var(--tl-knopf-rand,#d5dad2)!important;border-radius:50%!important;' +
        'width:42px!important;height:42px!important;min-width:0!important;' +
        'font-size:1.25em!important;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.10);flex:0 0 auto;' +
        'padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;' +
        'line-height:1;overflow:hidden;text-indent:0;' +
        // Wichtig: Manche Seiten setzen scrollbar-gutter:stable auf *alle* Elemente
        // (z.B. ziegenproblem.html). Zusammen mit overflow:hidden reserviert Chrome
        // dann auch im Knopf rechts ~15px fuer eine Scrollleiste – das Zeichen sitzt
        // dadurch sichtbar links der Kreismitte. auto schaltet die Reserve wieder ab.
        'scrollbar-gutter:auto!important;' +
        'font-family:Calibri,sans-serif;' +
        'margin:0!important;text-align:center;opacity:1!important;}' +
      '.tl-knopf.tl-sprachknopf{font-size:0.85em!important;font-weight:bold;letter-spacing:0;}' +
      // Der Melde-Knopf tritt bewusst leiser auf als die beiden Schalter
      '.tl-knopf.tl-meldenknopf{font-size:1.05em!important;opacity:0.72!important;}' +
      '@media (hover:hover) and (pointer:fine){.tl-knopf.tl-meldenknopf:hover{opacity:1!important;}}' +
      'html.dark .tl-knopf{background:var(--tl-knopf-bg-dunkel,#1e2429)!important;color:var(--tl-knopf-text-dunkel,#e7eae8)!important;' +
        'border-color:var(--tl-knopf-rand-dunkel,#3a434b)!important;box-shadow:0 1px 4px rgba(0,0,0,0.55);}' +
      '@media (hover:hover) and (pointer:fine){.tl-knopf:hover{filter:brightness(0.95);}}' +
      '@media (max-width:500px){.tl-knopf{width:34px!important;height:34px!important;font-size:1.05em!important;}' +
        '.tl-knopf.tl-sprachknopf{font-size:0.75em!important;}' +
        '.tl-knopf.tl-meldenknopf{font-size:0.9em!important;}' +
        '.tl-schalter{gap:6px;}}';
    document.head.appendChild(stil);

    const box = document.createElement('div');
    const slot = document.getElementById('themeLangSlot');
    box.className = 'tl-schalter' + (slot ? '' : ' tl-schwebend');

    if (!window.THEME_LANG_NO_THEME) {
      knopfTheme = document.createElement('button');
      knopfTheme.type = 'button';
      knopfTheme.className = 'tl-knopf tl-themeknopf';
      knopfTheme.addEventListener('click', () => setzeTheme(!dunkel));
      box.appendChild(knopfTheme);
    }

    knopfSprache = document.createElement('button');
    knopfSprache.type = 'button';
    knopfSprache.className = 'tl-knopf tl-sprachknopf';
    knopfSprache.addEventListener('click', () => setzeSprache(sprache === 'de' ? 'en' : 'de'));
    box.appendChild(knopfSprache);

    if (!window.THEME_LANG_NO_MELDEN) {
      knopfMelden = document.createElement('button');
      knopfMelden.type = 'button';
      knopfMelden.className = 'tl-knopf tl-meldenknopf';
      knopfMelden.textContent = '⚠';
      knopfMelden.addEventListener('click', fehlerMelden);
      box.appendChild(knopfMelden);
    }

    (slot || document.body).appendChild(box);
    aktualisiereKnoepfe();
  }

  // ── Änderungen aus anderen Tabs übernehmen ───────────────────
  window.addEventListener('storage', e => {
    if (e.key === THEME_KEY && !window.THEME_LANG_NO_THEME &&
        (e.newValue === 'dark' || e.newValue === 'light')) {
      if ((e.newValue === 'dark') !== dunkel) setzeTheme(e.newValue === 'dark', false);
    }
    if (e.key === LANG_KEY && (e.newValue === 'de' || e.newValue === 'en')) {
      if (e.newValue !== sprache) setzeSprache(e.newValue, false);
    }
  });

  // ── Öffentliche API ──────────────────────────────────────────
  window.tlSprache = function () { return sprache; };
  window.tlDunkel = function () { return dunkel; };
  window.tlText = function (de, en) { return sprache === 'en' ? en : de; };
  window.tlUebersetze = tlUebersetze;
  window.tlSetzeSprache = setzeSprache;
  window.tlSetzeTheme = setzeTheme;
  // Für Seiten mit eigenen Bedienelementen (THEME_LANG_NO_BUTTONS):
  window.tlFehlerMelden = fehlerMelden;
  window.tlMeldeText = meldeText;
  // Hilfe für window.fehlerKontext: liest ein Element als Text, Formeln als TeX
  window.tlFormelText = formelText;
  // Dezimaltrennzeichen: Anzeige sprachrichtig, Eingabe tolerant
  window.tlDezimal = dezimal;
  window.tlDezimalText = dezimalText;
  window.tlZahlAus = zahlAus;

  // ── Grüner Streifen neben der Scrollleiste ───────────────────
  // Der Platz der Scrollleiste ist immer belegt (gross.css), damit beim
  // Ein- und Ausblenden nichts umbricht. Damit das grüne Kopfband trotzdem
  // bis zum Fensterrand läuft, wird der Hintergrund der Leiste oben in
  // Bandhöhe grün eingefärbt; hier stehen Farbe und Unterkante des Bandes.
  // Beim Rollen wandert der grüne Teil mit nach oben. Ohne Kopfband oder
  // ohne gross.css passiert hier nichts.
  function bandStreifen() {
    try {
      const wurzel = document.documentElement;
      const band = document.querySelector('.tool-kopf');
      if (!band || !band.offsetHeight) {
        wurzel.style.removeProperty('--tk-bandfarbe');
        wurzel.style.removeProperty('--tk-bandunten');
        return;
      }
      const zoom = parseFloat(getComputedStyle(wurzel).zoom) || 1;
      const unten = Math.max(0, Math.round(band.getBoundingClientRect().bottom / zoom));
      wurzel.style.setProperty('--tk-bandunten', unten + 'px');
      wurzel.style.setProperty('--tk-bandfarbe', getComputedStyle(band).backgroundColor);
    } catch (e) {}
  }
  let streifenWartet = false;
  function bandStreifenBald() {
    if (streifenWartet) return;
    streifenWartet = true;
    requestAnimationFrame(() => { streifenWartet = false; bandStreifen(); });
  }

  // ── Start ────────────────────────────────────────────────────
  function start() {
    sprache = ermittleSprache();
    dunkel = window.THEME_LANG_NO_THEME ? false : ermittleTheme();
    baueKnoepfe();
    if (!window.THEME_LANG_NO_THEME) setzeTheme(dunkel);
    setzeSprache(sprache);
    bandStreifen();
    window.addEventListener('scroll', bandStreifenBald, { passive: true });
    window.addEventListener('resize', bandStreifenBald);
    window.addEventListener('tl-theme', bandStreifenBald);
    window.addEventListener('tl-sprache', bandStreifenBald);
    try { new ResizeObserver(bandStreifenBald).observe(document.querySelector('.tool-kopf') || document.body); } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
