// ══════════════════════════════════════════════════════════════
// einwilligung.js  —  Hinweis beim ersten Besuch: Was wird gespeichert?
//
// Zwei Arten von Speicherung sind zu unterscheiden:
//
//   1. NOTWENDIG. Alles, was die Seite selbst braucht, damit sie so
//      funktioniert, wie man sie bedient hat: Hell/Dunkel, Deutsch/Englisch,
//      die Einstellungen der einzelnen Übungsseiten und das gemerkte Datum der
//      letzten Änderung. Das bleibt im Browser des Besuchers (localStorage /
//      sessionStorage), wird an niemanden übertragen und braucht deshalb keine
//      Einwilligung – ohne diese Speicherung gäbe es die gewünschte Funktion
//      nicht. Abschalten lässt es sich trotzdem: im Browser die Website-Daten
//      löschen oder blockieren; die Seiten laufen dann weiter, merken sich nur
//      nichts mehr.
//
//   2. STATISTIK. Google Analytics zählt Besuche. Das ist nicht notwendig und
//      überträgt Daten an einen Dritten, also wird es NUR nach ausdrücklicher
//      Einwilligung geladen. Solange niemand zugestimmt hat, wird die Datei
//      von Google gar nicht erst angefordert – es gibt also auch keine
//      stillen Verbindungen dorthin.
//
// Die Entscheidung steht unter 'matheToolsEinwilligung' im localStorage und
// lässt sich jederzeit ändern (Knopf auf der Datenschutzseite, oder
// tkEinwilligungFragen() aufrufen).
//
// Einbinden (im <head>, NACH dem gtag-Block, der nur noch TK_GA_ID setzt):
//   <script src="einwilligung.js" defer></script>
//
// Fehlt diese Datei, passiert schlicht nichts: kein Hinweis, keine Statistik.
// Die Seite selbst funktioniert unverändert.
//
// Öffentlich:
//   tkEinwilligung()            → {statistik:bool, zeit:'…'} oder null
//   tkEinwilligungSetzen(bool)  → Entscheidung speichern und anwenden
//   tkEinwilligungFragen()      → Hinweis erneut zeigen
// ══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var SCHLUESSEL = 'matheToolsEinwilligung';
  /* Fassung des Hinweistextes. Sie steigt, wenn sich die Grundlage der
     Entscheidung ändert - dann wird erneut gefragt, denn eine Einwilligung
     gilt nur für die Angaben, über die dabei informiert wurde.
       1: erste Fassung
       2: Hinweis nennt jetzt Anbieter (Google Ireland Limited), die
          Übermittlung in die USA, die Rechtsgrundlagen und den Widerruf */
  var STAND = 2;

  // ── Speicher (darf fehlen oder gesperrt sein) ────────────────
  function lies() {
    try {
      var roh = localStorage.getItem(SCHLUESSEL);
      if (!roh) return null;
      var e = JSON.parse(roh);
      if (!e || e.v !== STAND) return null;
      return e;
    } catch (e) { return null; }
  }
  function schreib(statistik) {
    var e = { v: STAND, statistik: !!statistik, zeit: new Date().toISOString().slice(0, 10) };
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(e)); } catch (x) {}
    return e;
  }

  // ── Sprache (theme-language.js darf fehlen) ──────────────────
  function sprache() {
    if (typeof window.tlSprache === 'function') return window.tlSprache();
    try { return localStorage.getItem('matheToolsLang') === 'en' ? 'en' : 'de'; } catch (e) { return 'de'; }
  }
  function T(de, en) { return sprache() === 'en' ? en : de; }

  // ── Google Analytics erst nach Einwilligung nachladen ────────
  var geladen = false;
  function statistikStarten() {
    if (geladen) return;
    var id = window.TK_GA_ID;
    if (!id) return;                                   // Seite ohne Statistik
    geladen = true;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') window.gtag = function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', id);
  }

  // ── Pfad zur Datenschutzseite (Unterordner beachten) ─────────
  function datenschutzPfad() {
    var tiefe = 0;
    try {
      var teile = location.pathname.replace(/^\/+/, '').split('/');
      tiefe = Math.max(0, teile.length - 1);
    } catch (e) {}
    return (tiefe ? new Array(tiefe + 1).join('../') : '') + 'datenschutz.html';
  }

  // ── Der Hinweis selbst ───────────────────────────────────────
  function zeigen() {
    if (document.getElementById('tk-einwilligung')) return;

    var box = document.createElement('div');
    box.id = 'tk-einwilligung';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', T('Hinweis zum Datenschutz', 'Privacy notice'));

    var stil = document.createElement('style');
    stil.textContent =
      '#tk-einwilligung{position:fixed;left:0;right:0;bottom:0;z-index:9999;' +
      'background:#ffffff;border-top:2px solid #2e7d32;box-shadow:0 -4px 16px rgba(0,0,0,.18);' +
      'font-family:Calibri,"Segoe UI",sans-serif;color:#1f2a22;font-size:14px;line-height:1.42;' +
      'padding:14px 16px;box-sizing:border-box;max-height:70vh;overflow-y:auto}' +
      '#tk-einwilligung .tk-ew-inner{max-width:980px;margin:0 auto;display:flex;flex-wrap:wrap;' +
      'gap:10px 22px;align-items:center;justify-content:space-between}' +
      '#tk-einwilligung .tk-ew-text{flex:1 1 380px;min-width:0}' +
      '#tk-einwilligung .tk-ew-titel{display:block;font-size:15px;margin-bottom:4px}' +
      '#tk-einwilligung p{margin:0 0 5px}' +
      '#tk-einwilligung p:last-child{margin-bottom:0}' +
      '#tk-einwilligung .tk-ew-knoepfe{display:flex;flex-wrap:wrap;gap:10px;flex:0 0 auto}' +
      /* Ablehnen und Einverstanden sind absichtlich gleich gestaltet - gleiche
         Farbe, gleiche Groesse, gleiche Schrift. */
      '#tk-einwilligung button{font:inherit;font-weight:bold;font-size:15px;padding:10px 20px;' +
      'border-radius:8px;border:2px solid #2e7d32;background:#2e7d32;color:#ffffff;' +
      'cursor:pointer;margin:0;min-width:150px}' +
      '#tk-einwilligung button:hover{filter:brightness(1.12)}' +
      '#tk-einwilligung button:focus-visible{outline:3px solid #1b5e20;outline-offset:2px}' +
      '#tk-einwilligung a{color:#2e7d32}' +
      'html.dark #tk-einwilligung{background:#1c2229;color:#e7eae8;border-top-color:#66bb6a;' +
      'box-shadow:0 -4px 16px rgba(0,0,0,.6)}' +
      'html.dark #tk-einwilligung button{background:#66bb6a;color:#10160f;border-color:#66bb6a}' +
      'html.dark #tk-einwilligung button:focus-visible{outline-color:#e7eae8}' +
      'html.dark #tk-einwilligung a{color:#a5d6a7}' +
      '@media (max-width:760px){#tk-einwilligung{font-size:13.5px;padding:12px}' +
      '#tk-einwilligung .tk-ew-knoepfe{width:100%}' +
      '#tk-einwilligung .tk-ew-knoepfe button{flex:1 1 40%;min-width:0}}';

    /* Kleine Hilfe: Absatz oder Schaltfläche mit deutschem und englischem Text.
       theme-language.js schaltet später über data-de / data-en um und setzt
       dabei innerHTML - der Inhalt darf also auch einen Link enthalten. */
    function zweisprachig(tag, de, en) {
      var el = document.createElement(tag);
      el.setAttribute('data-de', de);
      el.setAttribute('data-en', en);
      el.innerHTML = el.getAttribute('data-' + sprache()) || de;
      return el;
    }

    var titel = zweisprachig('strong',
      'Einwilligung in die Besuchszählung',
      'Consent to visitor counting');
    titel.className = 'tk-ew-titel';

    /* Erste Ebene des Hinweises. Sie muss selbst schon sagen, WAS gespeichert
       wird, WOZU, WER die Daten erhält und dass die Entscheidung frei und
       widerruflich ist (§ 25 TDDDG, Art. 4 Nr. 11 und Art. 7 DSGVO). */
    var satz1 = zweisprachig('p',
      'Diese Website speichert Informationen auf Ihrem Endgerät. Für den Betrieb notwendig sind allein Ihre eigenen Einstellungen – Farbschema, Sprache und die Einstellungen der Übungen. Sie verbleiben in Ihrem Browser, werden an niemanden übermittelt und bedürfen keiner Einwilligung.',
      'This website stores information on your device. Only your own settings are necessary in order to run it – colour scheme, language and the options of the exercises. They remain in your browser, are not passed on to anyone and do not require consent.');
    var ds = '<a href="' + datenschutzPfad() + '">';
    var satz2 = zweisprachig('p',
      'Darüber hinaus möchten wir die Nutzung der Website mit Google Analytics statistisch auswerten, um das Angebot zu verbessern. Anbieter ist Google Ireland Limited, Irland; dabei können Daten an Google LLC in den USA übermittelt werden. Diese Auswertung setzt Cookies und erfolgt ausschließlich mit Ihrer Einwilligung (§&nbsp;25 Abs.&nbsp;1 TDDDG, Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO). Die Einwilligung ist freiwillig; Sie können sie jederzeit mit Wirkung für die Zukunft unter ' + ds + 'Datenschutz</a> widerrufen. Wenn Sie ablehnen, entstehen Ihnen dadurch keine Nachteile.',
      'In addition, we would like to analyse the use of this website statistically with Google Analytics in order to improve what is offered here. The provider is Google Ireland Limited, Ireland; data may be transferred to Google LLC in the USA. This analysis sets cookies and takes place solely with your consent (Section 25(1) TDDDG, Article 6(1)(a) GDPR). Consent is voluntary; you may withdraw it at any time with effect for the future under ' + ds + 'Privacy</a>. Declining puts you at no disadvantage.');

    var text = document.createElement('div');
    text.className = 'tk-ew-text';
    text.appendChild(titel); text.appendChild(satz1); text.appendChild(satz2);

    /* Beide Schaltflächen sind bewusst gleich gestaltet: Ablehnen muss ebenso
       leicht möglich sein wie Zustimmen. */
    var knoepfe = document.createElement('div');
    knoepfe.className = 'tk-ew-knoepfe';

    var nein = zweisprachig('button', 'Ablehnen', 'Decline');
    nein.type = 'button';
    var ja = zweisprachig('button', 'Einverstanden', 'Agree');
    ja.type = 'button';

    nein.addEventListener('click', function () { entscheiden(false); });
    ja.addEventListener('click', function () { entscheiden(true); });

    knoepfe.appendChild(nein); knoepfe.appendChild(ja);

    var innen = document.createElement('div');
    innen.className = 'tk-ew-inner';
    innen.appendChild(text); innen.appendChild(knoepfe);
    box.appendChild(stil); box.appendChild(innen);
    document.body.appendChild(box);

    if (typeof window.tlUebersetze === 'function') { try { window.tlUebersetze(box); } catch (e) {} }
  }

  function schliessen() {
    var box = document.getElementById('tk-einwilligung');
    if (box && box.parentNode) box.parentNode.removeChild(box);
  }

  function entscheiden(statistik) {
    var e = schreib(statistik);
    schliessen();
    if (statistik) statistikStarten();
    try { window.dispatchEvent(new CustomEvent('tk-einwilligung', { detail: e })); } catch (x) {}
  }

  // ── Öffentliche Funktionen ───────────────────────────────────
  window.tkEinwilligung = lies;
  window.tkEinwilligungSetzen = entscheiden;
  window.tkEinwilligungFragen = function () { schliessen(); zeigen(); };

  // ── Start ────────────────────────────────────────────────────
  function start() {
    var e = lies();
    if (e) { if (e.statistik) statistikStarten(); return; }
    zeigen();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
