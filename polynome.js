/* ═══════════════════════════════════════════════════════════════════════════
   polynome.js – gemeinsame Schicht der Seiten zu Polynomgleichungen
   ───────────────────────────────────────────────────────────────────────────
   Gehört zu aufgaben.css / aufgaben.js und wird genauso eingebunden:

       <script src="polynome.js" defer></script>

   Hier steht, was alle Gleichungsseiten gemeinsam haben: das Schreiben von
   Zahlen und Polynomen in TeX, das Lesen eingegebener Lösungen, die Skizze
   mit hervorgehobenen Nullstellen, der Bereich „eigene Lösungen eingeben"
   und das Gerüst für das Quiz.

   Fehlt die Datei, bleibt die Seite benutzbar: Aufgabe und Lösungsweg baut
   jede Seite selbst, nur Skizze, Lösungseingabe und Quiz entfallen dann.

   Angeboten werden:
     pgZahl(x)                 Zahl als TeX (ganz, Komma oder Bruch)
     pgZahlText(x)             dieselbe Zahl als Klartext (für Eingabefelder)
     pgKlammer(x)              Zahl, bei Bedarf in Klammern
     pgWurzel(r)               √r, so weit wie möglich vereinfacht
     pgTerm(k, e, opt)         ein Summand wie „-3x^2"
     pgPoly(koeff, opt)        ein ganzes Polynom
     pgLese(text)              Eingabe → Zahl (Komma, Bruch, Wurzel, π)
     pgLesePolyTeil(text)      Eingabe → Polynom { exponent: koeffizient }
     pgLeseGleichung(text)     Eingabe → { links, rechts }
     pgGleich(a, b)            Zahlenvergleich mit Toleranz
     pgSkizze(host, opt)       Funktionsplot mit markierten Stellen
     pgAntwort(host, opt)      „Wie viele Lösungen?" + Eingabefelder + Prüfen
     pgQuiz(host, schritte)    Quiz, das Schritt für Schritt durch die Aufgabe führt
     pgSchrittePQ(a,b,c,opt)   fertige kleinschrittige Schritte (pq-Formel)
     pgSchritteMNF(a,b,c,opt)  dasselbe über die Mitternachtsformel
     pgSchrittePotenz(a,d,n)   dasselbe für a·xⁿ + d = 0
     pgZahlSchritt(...)        ein einzelner Schritt „Zahl eingeben"
     pgStil(stil, opt)         Aufgabentext und Zwischenschritt der Aufgabenstile
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* Zweisprachig - ohne theme-language.js bleibt es bei Deutsch. */
  function T(de, en){ return (typeof window.tlText === 'function') ? window.tlText(de, en) : de; }
  var EPS = 1e-9;

  /* ── 1. Zahlen ─────────────────────────────────────────────────────────── */

  function ganz(x){ return Math.abs(x - Math.round(x)) < EPS; }
  function ggT(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var h = a % b; a = b; b = h; } return a; }

  /** Nähert x als Bruch an (Nenner bis 10000); null, wenn das nicht aufgeht. */
  function bruchVon(x){
    for (var d = 1; d <= 10000; d++){
      var n = x * d;
      if (Math.abs(n - Math.round(n)) < 1e-9 * Math.max(1, Math.abs(n))) return { n: Math.round(n), d: d };
    }
    return null;
  }

  /** Zahl als TeX: ganze Zahlen schlicht, sonst Bruch, sonst Dezimalzahl. */
  function pgZahl(x, opt){
    opt = opt || {};
    if (!isFinite(x)) return '\\text{?}';
    if (ganz(x)) return String(Math.round(x));
    var b = bruchVon(x);
    /* Nenner 1: eine ganze Zahl mit winzigem Rundungsfehler - kein „2/1". */
    if (b && b.d === 1) return String(b.n);
    if (b && b.d <= (opt.maxNenner || 100) && !opt.dezimal){
      var v = (b.n < 0 ? '-' : '') + '\\frac{' + Math.abs(b.n) + '}{' + b.d + '}';
      return v;
    }
    return String(Math.round(x * 1e6) / 1e6).replace('.', '{,}');
  }

  /** Dieselbe Zahl als Klartext - so, wie man sie eintippen würde. */
  function pgZahlText(x){
    if (!isFinite(x)) return '';
    if (ganz(x)) return String(Math.round(x));
    var b = bruchVon(x);
    if (b && b.d === 1) return String(b.n);
    if (b && b.d <= 100) return b.n + '/' + b.d;
    return String(Math.round(x * 1e6) / 1e6).replace('.', ',');
  }

  /** Zahl, die in einem Produkt steht - negative und krumme kommen in Klammern. */
  function pgKlammer(x){
    var t = pgZahl(x);
    return (x < 0 || !ganz(x)) ? '\\left(' + t + '\\right)' : t;
  }

  /** √r, so weit wie möglich vereinfacht: 12 → 2\sqrt{3}, 225 → 15. */
  function pgWurzel(r){
    if (r < 0) return '\\sqrt{' + pgZahl(r) + '}';
    if (ganz(r)){
      var n = Math.round(r), w = Math.round(Math.sqrt(n));
      if (w * w === n) return String(w);
      for (var k = Math.floor(Math.sqrt(n)); k >= 2; k--){
        if (n % (k * k) === 0){
          var rest = n / (k * k);
          return (rest === 1 ? String(k) : k + '\\sqrt{' + rest + '}');
        }
      }
      return '\\sqrt{' + n + '}';
    }
    var b = bruchVon(r);
    if (b && b.d <= 100){
      var zn = pgWurzel(b.n), nn = pgWurzel(b.d);
      if (zn.indexOf('sqrt') < 0 && nn.indexOf('sqrt') < 0) return '\\frac{' + zn + '}{' + nn + '}';
    }
    return '\\sqrt{' + pgZahl(r) + '}';
  }

  /** √r, ohne teilweises Wurzelziehen: aus 12 wird \sqrt{12}, nicht
      2\sqrt{3}. So steht die Lösung genau so da, wie sie aus der Formel
      fällt - das ist beim Nachrechnen leichter wiederzuerkennen. */
  function pgWurzelRoh(r){
    if (r < 0) return '\\sqrt{' + pgZahl(r) + '}';
    var w = Math.sqrt(r);
    if (ganz(w)) return pgZahl(w);
    return '\\sqrt{' + pgZahl(r) + '}';
  }

  /** Krumm heisst: keine Bruchzahl mit erträglichem Nenner - also eine
      Zahl, die man nur genau ODER gerundet hinschreiben kann. */
  function pgKrumm(x){
    if (typeof x !== 'number' || !isFinite(x)) return false;
    if (ganz(x)) return false;
    var b = bruchVon(x);
    return !(b && b.d <= 100);
  }
  /** Gerundet, mit Komma: -1,33 */
  function pgGerundet(x, stellen){
    var n = (stellen == null) ? 2 : stellen;
    /* Die Nullen am Ende bleiben stehen: „≈ 10,00" zeigt, dass gerundet wurde -
       „≈ 10" sähe aus wie ein genauer Wert. */
    return (Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n).replace('.', '{,}');
  }
  /** Die genaue Schreibweise, und dahinter der Näherungswert - aber nur,
      wenn der Wert wirklich krumm ist. */
  function pgGenau(tex, x, stellen){
    return pgKrumm(x) ? (tex + ' \\approx ' + pgGerundet(x, stellen)) : tex;
  }
  /** Wie genau muss eine eingetippte Loesung stimmen? Eine irrationale Loesung
      darf man genau (mit sqrt) oder auf zwei Stellen gerundet eingeben -
      deshalb ist die Schranke dort groesser als eine halbe Hundertstelle. */
  function pgLoesTol(x){ return pgKrumm(x) ? 6e-3 : 1e-6; }
  /** Zwei eingetippte Werte gelten als derselbe, wenn schon die groessere der
      beiden Schranken passt - sonst waeren sqrt(11) und 3,32 zwei Loesungen. */
  function gleichTol(a, b){ return Math.max(pgLoesTol(a), pgLoesTol(b)); }
  /** Dasselbe fuer die Schrittfolgen, die schon eine eigene Schranke hatten:
      eine krumme Zahl darf auch auf zwei Stellen gerundet dastehen. */
  function schrittTol(a, b){
    var t = Math.max(1e-3, pgLoesTol(a));
    return (b == null) ? t : Math.max(t, pgLoesTol(b));
  }

  /** Ist die Wurzel aus r eine „glatte" Zahl? */
  function pgWurzelGlatt(r){
    if (r < 0) return false;
    var w = Math.sqrt(r);
    return ganz(w);
  }

  /* ── 2. Terme und Polynome ─────────────────────────────────────────────── */

  /**
   * Ein Summand.
   *   k      Koeffizient
   *   e      Exponent
   *   opt.v  Variablenname (Standard „x")
   *   opt.erstes   true: kein führendes Plus
   *   opt.immerPlus  false: Pluszeichen weglassen
   */
  function pgTerm(k, e, opt){
    opt = opt || {};
    var v = opt.v || 'x';
    if (Math.abs(k) < EPS) return '';
    var vz = opt.erstes ? (k < 0 ? '-' : '') : (k < 0 ? '-' : '+');
    var a = Math.abs(k), zahl;
    if (e === 0) zahl = pgZahl(a);
    else zahl = (Math.abs(a - 1) < EPS) ? '' : pgZahl(a);
    var pot = (e === 0) ? '' : (e === 1 ? v : v + '^{' + e + '}');
    return vz + zahl + pot;
  }

  /**
   * Dasselbe Polynom in Tippschreibweise - so, wie man es in ein Eingabefeld
   * schreiben würde: 2x^3-5x+6. Damit lassen sich Gleichungen an andere Seiten
   * weiterreichen (?gl=…).
   */
  function pgPolyText(koeff, opt){
    opt = opt || {};
    var v = opt.v || 'x';
    var liste = [];
    if (Array.isArray(koeff)){
      var g = koeff.length - 1;
      koeff.forEach(function(k, i){ liste.push([g - i, k]); });
    } else {
      Object.keys(koeff).forEach(function(e){ liste.push([Number(e), koeff[e]]); });
      liste.sort(function(a, b){ return b[0] - a[0]; });
    }
    var zahl = function(x){
      if (ganz(x)) return String(Math.round(x));
      var b2 = bruchVon(x);
      if (b2 && b2.d <= 50) return b2.n + '/' + b2.d;
      return String(Math.round(x * 1e6) / 1e6);
    };
    var out = '';
    liste.forEach(function(pp){
      var k = pp[1], e = pp[0];
      if (Math.abs(k) < EPS) return;
      var vz = (k < 0) ? '-' : (out ? '+' : '');
      var a2 = Math.abs(k);
      var z = (e !== 0 && Math.abs(a2 - 1) < EPS) ? '' : zahl(a2);
      out += vz + z + (e === 0 ? '' : (e === 1 ? v : v + '^' + e));
    });
    return out || '0';
  }

  /**
   * Ein Polynom. koeff ist entweder ein Objekt {exponent: koeffizient} oder
   * ein Feld [a_n, …, a_1, a_0] (höchste Potenz zuerst).
   */
  function pgPoly(koeff, opt){
    opt = opt || {};
    var liste = [];
    if (Array.isArray(koeff)){
      var g = koeff.length - 1;
      koeff.forEach(function(k, i){ liste.push([g - i, k]); });
    } else {
      Object.keys(koeff).forEach(function(e){ liste.push([Number(e), koeff[e]]); });
      liste.sort(function(a, b){ return b[0] - a[0]; });
    }
    var out = '', erstes = true;
    liste.forEach(function(p){
      var t = pgTerm(p[1], p[0], { v: opt.v, erstes: erstes });
      if (!t) return;
      out += t; erstes = false;
    });
    return out || '0';
  }

  /* ── 3. Eingaben lesen ─────────────────────────────────────────────────── */

  /**
   * Liest eine eingegebene Zahl. Erlaubt sind 3 · -1,5 · 3/4 · 1.5 ·
   * sqrt(2) bzw. √2 · 2*sqrt(3) · -2/3*sqrt(5) · pi.
   * Rückgabe: Zahl oder null.
   */
  function pgLese(text){
    if (text === null || text === undefined) return null;
    var s = String(text).trim().toLowerCase();
    if (!s) return null;
    s = s.replace(/[−–—]/g, '-').replace(/\s+/g, '');
    s = s.replace(/,/g, '.');
    s = s.replace(/√/g, 'sqrt');
    s = s.replace(/·|×/g, '*');
    s = s.replace(/wurzel/g, 'sqrt');
    s = s.replace(/pi|π/g, '(' + Math.PI + ')');
    /* nur erlaubte Zeichen */
    if (!/^[-+*/().0-9sqrt]+$/.test(s)) return null;
    /* sqrt ohne Klammer: sqrt2 → sqrt(2) */
    /* Erst die Klammern ergaenzen, dann Math davorsetzen - andersherum
       fand die zweite Regel das „sqrt(" in „Math.sqrt(" noch einmal und
       machte „MathMath.sqrt(" daraus. Deshalb ging „√5" nicht. */
    s = s.replace(/sqrt(\d+(\.\d+)?)/g, 'sqrt($1)');
    s = s.replace(/sqrt\(/g, 'Math.sqrt(');
    /* Ohne i wird „Math.sqrt" hier nicht erkannt (grosses M) - und dann
       galt jede Eingabe mit einer Wurzel als unleserlich. */
    if (/[a-z]/i.test(s.replace(/Math\.sqrt/gi, ''))) return null;
    var wert;
    try { wert = Function('"use strict";return (' + s + ');')(); } catch (e){ return null; }
    return (typeof wert === 'number' && isFinite(wert)) ? wert : null;
  }

  function pgGleich(a, b, tol){
    if (a === null || b === null) return false;
    return Math.abs(a - b) < (tol || 1e-6);
  }

  /**
   * Liest eine Seite einer Gleichung als Polynom.
   * Erlaubt sind Summen von Termen wie 3x^2, -x, 1,5x, 2/3x^4, 7.
   * Rückgabe: { exponent: koeffizient, … } oder null.
   */
  function pgLesePolyTeil(text, variable){
    var v = (variable || 'x').toLowerCase();
    var s = String(text || '').toLowerCase().replace(/\s+/g, '')
      .replace(/[−–—]/g, '-').replace(/,/g, '.').replace(/·|×/g, '*').replace(/\*\*/g, '^');
    if (!s) return null;
    /* erlaubte Zeichen prüfen */
    var erlaubt = new RegExp('^[-+*/^().0-9' + v + ']+$');
    if (!erlaubt.test(s)) return null;
    var out = {}, i = 0, gefunden = false;
    while (i < s.length){
      /* Vorzeichen */
      var vz = 1;
      while (s[i] === '+' || s[i] === '-'){ if (s[i] === '-') vz = -vz; i++; }
      if (i >= s.length) return null;
      /* Zahl davor (auch Bruch) */
      var zahl = '', hatZahl = false;
      while (i < s.length && /[0-9.]/.test(s[i])){ zahl += s[i]; i++; hatZahl = true; }
      var wert = hatZahl ? parseFloat(zahl) : 1;
      if (hatZahl && !isFinite(wert)) return null;
      if (s[i] === '/'){
        i++;
        var n2 = '';
        while (i < s.length && /[0-9.]/.test(s[i])){ n2 += s[i]; i++; }
        var nn = parseFloat(n2);
        if (!isFinite(nn) || Math.abs(nn) < EPS) return null;
        wert = wert / nn;
      }
      if (s[i] === '*') i++;
      /* Variable mit Exponent */
      var exp = 0;
      if (s[i] === v){
        i++; exp = 1;
        if (s[i] === '^'){
          i++;
          var e = '';
          if (s[i] === '('){ i++; while (i < s.length && s[i] !== ')'){ e += s[i]; i++; } i++; }
          else while (i < s.length && /[0-9]/.test(s[i])){ e += s[i]; i++; }
          exp = parseInt(e, 10);
          if (!isFinite(exp)) return null;
        }
      } else if (!hatZahl) return null;
      out[exp] = (out[exp] || 0) + vz * wert;
      gefunden = true;
      if (i < s.length && s[i] !== '+' && s[i] !== '-') return null;
    }
    return gefunden ? out : null;
  }

  /** Liest „linke Seite = rechte Seite"; ohne „=" gilt die rechte Seite als 0. */
  function pgLeseGleichung(text, variable){
    var s = String(text || '');
    var teile = s.split('=');
    if (teile.length > 2) return null;
    var l = pgLesePolyTeil(teile[0], variable);
    if (!l) return null;
    var r = (teile.length === 2) ? pgLesePolyTeil(teile[1], variable) : { 0: 0 };
    if (!r) return null;
    return { links: l, rechts: r };
  }

  /* ── 4. Skizze ─────────────────────────────────────────────────────────── */

  /**
   * Zeichnet einen Funktionsgraphen in host.
   *   opt.f          Funktion x → y (Pflicht)
   *   opt.g          zweite Funktion (für Schnittstellen)
   *   opt.stellen    [x, …] hervorgehobene Stellen
   *   opt.marke      'nullstelle' | 'schnitt'
   *   opt.xMin/xMax  Bereich; sonst aus den Stellen berechnet
   *   opt.hoehe      Höhe in Bildpunkten (Standard 260)
   */
  function pgSkizze(host, opt){
    if (!host) return;
    opt = opt || {};
    var f = opt.f; if (typeof f !== 'function') return;
    var g = (typeof opt.g === 'function') ? opt.g : null;
    var stellen = (opt.stellen || []).filter(function(x){ return isFinite(x); });

    var xMin = opt.xMin, xMax = opt.xMax;
    if (xMin === undefined || xMax === undefined){
      var lo = -4, hi = 4;
      if (stellen.length){
        lo = Math.min.apply(null, stellen);
        hi = Math.max.apply(null, stellen);
        /* Nur wenig Rand außerhalb der äußersten Stellen - weiter draußen
           wird ein Polynom schnell sehr groß, und der Bereich um die
           Nullstellen ginge unter. */
        var rand = Math.max(1.2, (hi - lo) * 0.2);
        lo -= rand; hi += rand;
        if (hi - lo < 4){ var mm = (lo + hi) / 2; lo = mm - 2; hi = mm + 2; }
        /* Die y-Achse soll möglichst zu sehen sein - wenn der Ausschnitt dafür
           höchstens doppelt so breit wird. */
        if (lo > 0 && lo <= hi - lo) lo = -0.5;
        if (hi < 0 && -hi <= hi - lo) hi = 0.5;
      }
      xMin = (xMin === undefined) ? lo : xMin;
      xMax = (xMax === undefined) ? hi : xMax;
    }
    if (!(xMax > xMin)) { xMin = -4; xMax = 4; }

    var N = 400, pts = [], pts2 = [], yMin = Infinity, yMax = -Infinity;
    for (var i = 0; i <= N; i++){
      var x = xMin + (xMax - xMin) * i / N;
      var y = f(x);
      if (isFinite(y)){ pts.push([x, y]); if (y < yMin) yMin = y; if (y > yMax) yMax = y; }
      if (g){ var y2 = g(x); if (isFinite(y2)){ pts2.push([x, y2]); if (y2 < yMin) yMin = y2; if (y2 > yMax) yMax = y2; } }
    }
    if (!pts.length) return;
    /* Der sichtbare Ausschnitt in y: die markierten Stellen, der Bereich
       dazwischen und etwas Luft - nicht der volle Wertebereich einer steilen
       Potenzfunktion, sonst sieht man vom Scheitel nichts mehr. */
    var wichtig = [0];
    var mitte = (xMin + xMax) / 2;
    [mitte, xMin, xMax].forEach(function(x){ var y = f(x); if (isFinite(y)) wichtig.push(y); });
    stellen.forEach(function(x){ var y = g ? f(x) : 0; if (isFinite(y)) wichtig.push(y); });
    for (var s2 = 1; s2 < stellen.length; s2++){
      var ym = f((stellen[s2 - 1] + stellen[s2]) / 2);
      if (isFinite(ym)) wichtig.push(ym);
    }
    if (g) [mitte, xMin, xMax].forEach(function(x){ var y = g(x); if (isFinite(y)) wichtig.push(y); });
    /* die Ränder dürfen den Ausschnitt nicht sprengen */
    var kern = wichtig.slice(0, 1).concat(wichtig.slice(1));
    var grenze = Math.max.apply(null, kern.map(Math.abs)) || 1;
    var innen = wichtig.filter(function(y){ return Math.abs(y) <= grenze; });
    var yLo = Math.min.apply(null, innen), yHi = Math.max.apply(null, innen);
    /* Mit markierten Stellen zählt der Bereich zwischen ihnen - und ein Stück
       darüber hinaus, damit man den Graphen weiterlaufen sieht. Die Werte
       ganz außen bestimmen den Ausschnitt nicht mehr: dort läuft der Graph
       aus dem Bild. */
    if (stellen.length){
      var sLo = Math.min.apply(null, stellen), sHi = Math.max.apply(null, stellen);
      var weit = Math.max(sLo - xMin, xMax - sHi, 0);
      var aLo = Math.max(xMin, sLo - 0.35 * weit), aHi = Math.min(xMax, sHi + 0.35 * weit);
      if (sHi - sLo < 1e-9){ aLo = Math.max(xMin, sLo - 0.5 * weit); aHi = Math.min(xMax, sHi + 0.5 * weit); }
      var werte = [0];
      for (var k2 = 0; k2 <= 160; k2++){
        var xx = aLo + (aHi - aLo) * k2 / 160;
        var w1 = f(xx); if (isFinite(w1)) werte.push(w1);
        if (g){ var w2 = g(xx); if (isFinite(w2)) werte.push(w2); }
      }
      yLo = Math.min.apply(null, werte); yHi = Math.max.apply(null, werte);
    }
    /* nicht über den tatsächlichen Wertebereich hinaus */
    yLo = Math.max(yLo, yMin); yHi = Math.min(yHi, yMax);
    if (!(yHi > yLo)){ yLo = yMin; yHi = yMax; }
    if (!(yHi > yLo)){ yLo = -1; yHi = 1; }
    var pad = (yHi - yLo) * 0.12; yLo -= pad; yHi += pad;
    if (yLo > 0) yLo = 0; if (yHi < 0) yHi = 0;

    var B = 520, H = opt.hoehe || 260, M = 18;
    var sx = function(x){ return M + (x - xMin) / (xMax - xMin) * (B - 2 * M); };
    var sy = function(y){ return H - M - (y - yLo) / (yHi - yLo) * (H - 2 * M); };
    var pfad = function(liste){
      var d = '', auf = false;
      liste.forEach(function(p){
        var y = p[1];
        if (!isFinite(y) || y < yLo - (yHi - yLo) || y > yHi + (yHi - yLo)){ auf = false; return; }
        d += (auf ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(y).toFixed(1) + ' ';
        auf = true;
      });
      return d;
    };

    var teil = function(von, bis){
      var s = '', schritt = Math.pow(10, Math.floor(Math.log10(Math.max(1e-6, (bis - von) / 6))));
      if ((bis - von) / schritt > 12) schritt *= 2;
      if ((bis - von) / schritt < 4) schritt /= 2;
      for (var t = Math.ceil(von / schritt) * schritt; t <= bis + 1e-9; t += schritt) s += '|' + t;
      return s.slice(1).split('|').map(Number);
    };

    var svg = '<svg viewBox="0 0 ' + B + ' ' + H + '" class="pg-plot" role="img" aria-label="'
      + T('Skizze des Graphen', 'Sketch of the graph') + '">';
    /* Was oben oder unten hinausläuft, wird an der Zeichenfläche abgeschnitten. */
    var clipId = 'pgclip' + (pgSkizze._nr = (pgSkizze._nr || 0) + 1);
    svg += '<clipPath id="' + clipId + '"><rect x="' + M + '" y="' + (M - 2) + '" width="' + (B - 2 * M)
         + '" height="' + (H - 2 * M + 4) + '"/></clipPath>';
    /* Gitter */
    svg += '<g class="pg-gitter">';
    teil(xMin, xMax).forEach(function(t){
      if (Math.abs(t) < 1e-9) return;
      svg += '<line x1="' + sx(t).toFixed(1) + '" y1="' + M + '" x2="' + sx(t).toFixed(1) + '" y2="' + (H - M) + '"/>';
    });
    teil(yLo, yHi).forEach(function(t){
      if (Math.abs(t) < 1e-9) return;
      svg += '<line x1="' + M + '" y1="' + sy(t).toFixed(1) + '" x2="' + (B - M) + '" y2="' + sy(t).toFixed(1) + '"/>';
    });
    svg += '</g>';
    /* Achsen - mit Pfeilen an den Enden und den Namen x und y */
    var y0 = sy(0), x0 = sx(0), yAchse = (x0 >= M - 0.5 && x0 <= B - M + 0.5);
    svg += '<g class="pg-achse">'
      + '<line x1="' + M + '" y1="' + y0.toFixed(1) + '" x2="' + (B - M + 4) + '" y2="' + y0.toFixed(1) + '"/>'
      + (yAchse ? '<line x1="' + x0.toFixed(1) + '" y1="' + (M - 4) + '" x2="' + x0.toFixed(1) + '" y2="' + (H - M) + '"/>' : '')
      + '</g>';
    svg += '<g class="pg-pfeil">'
      + '<polygon points="' + (B - M + 11).toFixed(1) + ',' + y0.toFixed(1) + ' ' + (B - M + 1).toFixed(1) + ',' + (y0 - 4.5).toFixed(1)
      + ' ' + (B - M + 1).toFixed(1) + ',' + (y0 + 4.5).toFixed(1) + '"/>'
      + (yAchse ? '<polygon points="' + x0.toFixed(1) + ',' + (M - 11).toFixed(1) + ' ' + (x0 - 4.5).toFixed(1) + ',' + (M - 1).toFixed(1)
      + ' ' + (x0 + 4.5).toFixed(1) + ',' + (M - 1).toFixed(1) + '"/>' : '')
      + '</g>';
    svg += '<g class="pg-achsname">'
      + '<text x="' + (B - M + 6).toFixed(1) + '" y="' + (y0 - 8).toFixed(1) + '" text-anchor="middle">x</text>'
      + (yAchse ? '<text x="' + (x0 + 9).toFixed(1) + '" y="' + (M - 2).toFixed(1) + '" text-anchor="start">y</text>' : '')
      + '</g>';
    /* Beschriftung der x-Achse an den ganzen Zahlen */
    svg += '<g class="pg-beschriftung">';
    teil(xMin, xMax).forEach(function(t){
      if (Math.abs(t) < 1e-9 || !ganz(t)) return;
      svg += '<text x="' + sx(t).toFixed(1) + '" y="' + (sy(0) + 13).toFixed(1) + '">' + Math.round(t) + '</text>';
    });
    svg += '</g>';
    /* Graphen */
    svg += '<g clip-path="url(#' + clipId + ')">';
    if (g) svg += '<path class="pg-kurve2" d="' + pfad(pts2) + '"/>';
    svg += '<path class="pg-kurve" d="' + pfad(pts) + '"/>';
    svg += '</g>';
    /* Eine bewegliche Marke (Erkundungsmodus): senkrechte Linie und ein
       kleiner Punkt auf dem Graphen. */
    if (opt.marke !== undefined && opt.marke !== null && isFinite(opt.marke)
        && opt.marke >= xMin && opt.marke <= xMax){
      var mx = sx(opt.marke);
      svg += '<line class="pg-marke" x1="' + mx.toFixed(1) + '" y1="' + M
           + '" x2="' + mx.toFixed(1) + '" y2="' + (H - M) + '"/>';
      var my = f(opt.marke);
      if (isFinite(my) && my >= yLo && my <= yHi)
        svg += '<circle class="pg-markepunkt" cx="' + mx.toFixed(1) + '" cy="' + sy(my).toFixed(1) + '" r="3.5"/>';
    }
    /* Markierungen */
    stellen.forEach(function(x){
      if (x < xMin || x > xMax) return;
      var y = g ? f(x) : 0;
      svg += '<line class="pg-lot" x1="' + sx(x).toFixed(1) + '" y1="' + sy(0).toFixed(1)
           + '" x2="' + sx(x).toFixed(1) + '" y2="' + sy(y).toFixed(1) + '"/>';
      svg += '<circle class="pg-stelle" cx="' + sx(x).toFixed(1) + '" cy="' + sy(y).toFixed(1) + '" r="5"/>';
    });
    svg += '</svg>';
    host.innerHTML = svg;
  }

  /**
   * Passender x-Ausschnitt für eine Skizze: alle wichtigen Stellen (Lösungen,
   * Scheitel …) mit etwas Luft, mindestens opt.minBreite breit.
   */
  function pgBereich(punkte, opt){
    opt = opt || {};
    var alle = (punkte || []).filter(function(x){ return isFinite(x); });
    if (opt.mitNull) alle = alle.concat([0]);
    if (!alle.length) alle = [0];
    var lo = Math.min.apply(null, alle), hi = Math.max.apply(null, alle);
    /* wenig Rand außerhalb der äußersten Stellen (wie bei pgSkizze) */
    var rand = Math.max(1.2, (hi - lo) * 0.22);
    lo -= rand; hi += rand;
    /* die y-Achse mit ins Bild nehmen, wenn das den Ausschnitt höchstens verdoppelt */
    if (lo > 0 && lo <= hi - lo) lo = -0.5;
    if (hi < 0 && -hi <= hi - lo) hi = 0.5;
    var min = opt.minBreite || 6;
    if (hi - lo < min){ var m = (lo + hi) / 2; lo = m - min / 2; hi = m + min / 2; }
    return { xMin: lo, xMax: hi };
  }

  /* ── 5. Eigene Lösungen eingeben ───────────────────────────────────────── */

  /**
   * Baut den Bereich „eigene Lösungen eingeben" in host.
   *   opt.loesungen    [x1, x2, …] die richtigen Werte (aufsteigend)
   *   opt.max          höchste wählbare Anzahl (Standard 3)
   *   opt.frage         eigene Überschrift statt „Wie viele Lösungen …?"
   *   opt.hinweis(n, eingaben) → Text | null   eigene Rückmeldung der Seite
   *   opt.onFertig(richtig)    wird nach dem Prüfen gerufen
   *   opt.variable     Name der Variablen (Standard „x")
   */
  function pgAntwort(host, opt){
    if (!host) return;
    opt = opt || {};
    var loes = (opt.loesungen || []).slice().sort(function(a, b){ return a - b; });
    var v = opt.variable || 'x';
    var max = opt.max || Math.max(3, loes.length);
    var gewaehlt = null, fertig = false;

    host.innerHTML = '';
    host.classList.add('pg-antwort');

    var frage = document.createElement('div');
    frage.className = 'pg-frage';
    frage.innerHTML = opt.frage || T('Wie viele Lösungen hat die Gleichung?', 'How many solutions does the equation have?');
    host.appendChild(frage);

    var zeile = document.createElement('div');
    if (max <= 8){
      zeile.className = 'pg-anzahl seg';
      for (var n = 0; n <= max; n++){
        (function(n){
          var b = document.createElement('button');
          b.type = 'button';
          b.textContent = String(n);
          b.addEventListener('click', function(){ waehle(n, b); });
          zeile.appendChild(b);
        })(n);
      }
    } else {
      /* Bei sehr vielen möglichen Lösungen wäre eine Knopfreihe zu breit -
         dann wird die Anzahl eingetippt. */
      zeile.className = 'pg-anzahl-feld';
      var ein = document.createElement('input');
      ein.type = 'text'; ein.inputMode = 'numeric'; ein.size = 3;
      ein.setAttribute('aria-label', T('Anzahl der Lösungen', 'number of solutions'));
      var ok = document.createElement('button');
      ok.type = 'button'; ok.className = 'pruef-knopf';
      ok.textContent = T('Weiter', 'Continue');
      function uebernimm(){
        var n = parseInt((ein.value || '').replace(/\s/g, ''), 10);
        if (isNaN(n) || n < 0 || n > max) return;
        waehle(n, null);
      }
      ok.addEventListener('click', uebernimm);
      ein.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); uebernimm(); } });
      zeile.appendChild(ein); zeile.appendChild(ok);
    }
    host.appendChild(zeile);

    var felder = document.createElement('div');
    felder.className = 'pg-felder';
    host.appendChild(felder);

    var fb = document.createElement('div');
    fb.className = 'pg-fb';
    host.appendChild(fb);

    function melde(art, text){
      fb.className = 'pg-fb ' + art;
      fb.innerHTML = text;
      if (window.MathJax && MathJax.typesetPromise)
        MathJax.typesetPromise([fb]).catch(function(){});
    }

    function waehle(n, knopf){
      if (fertig) return;
      gewaehlt = n;
      [].forEach.call(zeile.querySelectorAll('button'), function(b){ b.classList.toggle('on', b === knopf); });
      felder.innerHTML = '';
      fb.className = 'pg-fb'; fb.innerHTML = '';
      if (n === 0){
        var k0 = document.createElement('button');
        k0.type = 'button'; k0.className = 'pruef-knopf';
        k0.textContent = T('✓ Prüfen', '✓ Check');
        k0.addEventListener('click', function(){ pruefe([]); });
        felder.appendChild(k0);
        return;
      }
      for (var i = 0; i < n; i++){
        var wrap = document.createElement('span');
        wrap.className = 'pg-feld';
        var lab = document.createElement('span');
        lab.className = 'pg-feld-name';
        lab.innerHTML = v + '<sub>' + (i + 1) + '</sub>&nbsp;=';
        var inp = document.createElement('input');
        inp.type = 'text'; inp.inputMode = 'text'; inp.autocomplete = 'off';
        inp.setAttribute('aria-label', v + ' ' + (i + 1));
        inp.addEventListener('keydown', function(ev){ if (ev.key === 'Enter') pruefeFelder(); });
        wrap.appendChild(lab); wrap.appendChild(inp);
        felder.appendChild(wrap);
      }
      var k = document.createElement('button');
      k.type = 'button'; k.className = 'pruef-knopf';
      k.textContent = T('✓ Prüfen', '✓ Check');
      k.addEventListener('click', pruefeFelder);
      felder.appendChild(k);
      var erste = felder.querySelector('input');
      if (erste) erste.focus();
    }

    function pruefeFelder(){
      var werte = [].map.call(felder.querySelectorAll('input'), function(e){ return e.value; });
      pruefe(werte);
    }

    function pruefe(eingaben){
      if (fertig) return;
      var zahlen = eingaben.map(pgLese);
      var leer = zahlen.some(function(z, i){ return z === null && String(eingaben[i]).trim() !== ''; });
      if (eingaben.some(function(s){ return String(s).trim() === ''; })){
        melde('warn', T('Es fehlt noch eine Zahl.', 'A number is still missing.'));
        return;
      }
      if (leer){
        melde('err', T('Das konnte ich nicht lesen. Erlaubt sind z.&nbsp;B. <code>3</code>, <code>-1,5</code>, <code>3/4</code> oder <code>sqrt(5)</code>.',
                       'I could not read that. Allowed are e.g. <code>3</code>, <code>-1.5</code>, <code>3/4</code> or <code>sqrt(5)</code>.'));
        return;
      }
      /* Anzahl */
      if (zahlen.length !== loes.length){
        var eigen = opt.hinweis ? opt.hinweis(zahlen.length, zahlen) : null;
        melde('err', (zahlen.length < loes.length
          ? T('Es sind mehr Lösungen. Prüfe, ob du einen Fall übersehen hast.',
              'There are more solutions. Check whether you missed a case.')
          : T('Es sind weniger Lösungen. Prüfe, ob du eine doppelt gezählt hast.',
              'There are fewer solutions. Check whether you counted one twice.'))
          + (eigen ? '<div class="pg-fb-sub">' + eigen + '</div>' : ''));
        return;
      }
      var sortiert = zahlen.slice().sort(function(a, b){ return a - b; });
      var allesGut = sortiert.every(function(z, i){ return pgGleich(z, loes[i], pgLoesTol(loes[i])); });
      if (allesGut){
        fertig = true;
        melde('ok', T('✓ Richtig!', '✓ Correct!'));
        [].forEach.call(felder.querySelectorAll('input'), function(e){ e.disabled = true; e.classList.add('ok'); });
        [].forEach.call(felder.querySelectorAll('button'), function(e){ e.disabled = true; });
        [].forEach.call(zeile.querySelectorAll('button'), function(e){ e.disabled = true; });
        if (opt.onFertig) opt.onFertig(true);
        return;
      }
      /* Welche stimmen schon? */
      var offen = loes.slice();
      [].forEach.call(felder.querySelectorAll('input'), function(e, i){
        var z = zahlen[i], tref = -1;
        offen.forEach(function(l, k){ if (tref < 0 && pgGleich(z, l, pgLoesTol(l))) tref = k; });
        if (tref >= 0){ offen.splice(tref, 1); e.classList.add('ok'); e.classList.remove('err'); }
        else { e.classList.add('err'); e.classList.remove('ok'); }
      });
      var eigen2 = opt.hinweis ? opt.hinweis(zahlen.length, zahlen) : null;
      melde('err', T('Noch nicht ganz - die grün umrandeten Werte stimmen schon.',
                     'Not quite yet - the values with a green border are already right.')
        + (eigen2 ? '<div class="pg-fb-sub">' + eigen2 + '</div>' : ''));
      if (opt.onFertig) opt.onFertig(false);
    }

    return { waehle: waehle };
  }

  /* ── 6. Quiz ───────────────────────────────────────────────────────────── */

  /**
   * Führt Schritt für Schritt durch die Aufgabe.
   * schritte ist ein Feld von Objekten:
   *   { titel, frage, art:'wahl',    optionen:[…], richtig:index, hilfe:[…] }
   *   { titel, frage, art:'eingabe', pruefe:function(text){…}, loesung:'…', hilfe:[…] }
   *   { titel, frage, art:'info' }
   * pruefe() liefert true (richtig), false (falsch) oder einen Text als
   * Rückmeldung bei einem typischen Fehler.
   */
  /** Oeffnet dieses Feld am Handy die Zifferntastatur? Nur dann, wenn
      wirklich eine einzelne Zahl gefragt ist - sonst fehlen dort die
      Buchstaben und die Satzzeichen. */
  function zahlTastatur(s){
    if (!s) return true;
    if (s.tastatur) return s.tastatur === 'zahl';
    var ph = String(s.platzhalter == null ? '' : s.platzhalter).trim();
    return ph === '' || /^(zahl|number)$/i.test(ph);
  }

    /* In welcher Reihenfolge die Antworten einer Auswahlfrage dastehen.
       Gemischt wird, damit die richtige Antwort nicht immer vorn steht - aber
       nur einmal je Schritt und nach einem festen Muster aus Frage und
       Gleichung: Blendet man eine Hilfe ein, bleibt alles an seinem Platz,
       und ein geteilter Link zeigt dieselbe Reihenfolge. Natürliche Folgen
       (ja/nein, keine/eine/zwei, aufsteigende Zahlen) bleiben, wie sie sind;
       ein Schritt kann das Mischen mit fest: true auch abschalten. */
    function reihenfolge(s, gl){
      if (s._folge && s._folge.length === (s.optionen || []).length) return s._folge;
      var ops = s.optionen || [], idx = ops.map(function(o, i){ return i; });
      if (!s.fest && ops.length >= 3 && !natuerlicheFolge(ops)){
        var t = ops.join('|') + '#' + (gl || '') + '#' + (s.frage || ''), h = 7;
        for (var k = 0; k < t.length; k++) h = (h * 31 + t.charCodeAt(k)) >>> 0;
        for (var j = idx.length - 1; j > 0; j--){
          h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
          var z = (h >>> 8) % (j + 1), tmp = idx[j];
          idx[j] = idx[z]; idx[z] = tmp;
        }
      }
      s._folge = idx;
      return idx;
    }
    function natuerlicheFolge(ops){
      var t = ops.map(function(o){
        return String(o).replace(/<[^>]*>/g, '').replace(/\\\(|\\\)/g, '').trim().toLowerCase();
      });
      var skalen = [['keine', 'eine', 'zwei'], ['none', 'one', 'two'], ['ja', 'nein'], ['yes', 'no']];
      if (skalen.some(function(b){ return t.every(function(x, i){ return b[i] && x.indexOf(b[i]) === 0; }); })) return true;
      var z = t.map(function(x){ return parseFloat(x.replace(',', '.')); });
      return z.every(function(x){ return isFinite(x); })
          && z.every(function(x, i){ return i === 0 || x > z[i - 1]; });
    }

  function pgQuiz(host, schritte, opt){
    if (!host) return null;
    opt = opt || {};
    var idx = 0, hilfe = 0, erledigt = [];

    function mj(node){
      if (!(window.MathJax && MathJax.typesetPromise)) return;
      MathJax.typesetPromise([node]).then(function(){
        /* Zu breite Formeln verkleinern - sonst ragen sie auf schmalen
           Bildschirmen heraus. */
        if (window.abFormelnPassen) abFormelnPassen(node);
      }).catch(function(){});
    }
    /* Rueckmeldungen enthalten Formeln - ohne diesen Satz bliebe im Kasten
       der rohe LaTeX-Quelltext stehen (\(x^{0}\) statt x hoch 0). */
    function melde(kasten, art, text){
      kasten.className = 'pg-fb ' + (art || '');
      kasten.innerHTML = text || '';
      mj(kasten);
    }

    function male(){
      host.innerHTML = '';
      host.className = 'pg-quiz';
      /* schon erledigte Schritte als Kette */
      if (erledigt.length){
        var kette = document.createElement('div');
        kette.className = 'pg-kette';
        erledigt.forEach(function(e){
          var s = document.createElement('span');
          s.className = 'pg-kette-teil';
          /* Kurztexte mit Formelzeichen werden gesetzt, reiner Text bleibt Text. */
          var t = String(e);
          if (/[\\^_]/.test(t) && t.indexOf('\\(') < 0 && t.indexOf('$') < 0) t = '\\(' + t + '\\)';
          s.innerHTML = '✓ ' + t;
          kette.appendChild(s);
        });
        host.appendChild(kette);
      }
      if (idx >= schritte.length){
        var fertig = document.createElement('div');
        fertig.className = 'pg-quiz-fertig';
        fertig.innerHTML = T('🎉 Geschafft - du hast die Gleichung vollständig gelöst.',
                             '🎉 Done - you have solved the equation completely.');
        host.appendChild(fertig);
        mj(host);
        if (opt.onFertig) opt.onFertig();
        return;
      }
      var s = schritte[idx];
      /* Was von diesem Schritt in der Kette oben stehen bleibt. Das soll die
         Zusammenfassung sein, mit der man weiterrechnet - reine Hinweise
         ohne Ergebnis setzen kurz: false und kommen gar nicht in die Kette. */
      function merke(ersatz){
        if (s.kurz === false) return;
        erledigt.push(s.kurz || ersatz);
      }
      var box = document.createElement('div');
      box.className = 'pg-schritt';
      /* Woran gerade gearbeitet wird, steht in jedem Schritt oben - sonst muss
         man zur Aufgabe zurückblättern. */
      var gl = s.gleichung || (typeof opt.gleichung === 'function' ? opt.gleichung(s, idx) : opt.gleichung);
      box.innerHTML = '<div class="pg-schritt-kopf">' + (idx + 1) + '. ' + (s.titel || '') + '</div>'
                    + (gl ? '<div class="pg-schritt-gl">\\(' + gl + '\\)</div>' : '')
                    + (s.frage ? '<div class="pg-schritt-frage">' + s.frage + '</div>' : '');
      host.appendChild(box);

      var fb = document.createElement('div');
      fb.className = 'pg-fb';

      if (s.art === 'wahl'){
        var btns = document.createElement('div');
        btns.className = 'pg-wahl';
        reihenfolge(s, gl).forEach(function(i){
          var o = s.optionen[i];
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'pg-wahl-knopf';
          b.innerHTML = o;
          b.addEventListener('click', function(){
            /* s.richtige erlaubt mehrere richtige Antworten (z. B. wenn eine
               Gleichung auf zwei Wegen gelöst werden kann). */
            var richtige = s.richtige || [s.richtig];
            if (richtige.indexOf(i) >= 0){
              b.classList.add('ok');
              merke(o);
              setTimeout(weiter, 420);
            } else {
              b.classList.add('err');
              melde(fb, 'err', s.falschText || T('Das passt noch nicht.', 'That does not fit yet.'));
            }
          });
          btns.appendChild(b);
        });
        box.appendChild(btns);
      } else if (s.art === 'eingabe'){
        var zeile = document.createElement('div');
        zeile.className = 'pg-eingabe';
        var paar = document.createElement('span');
        paar.className = 'pg-feldpaar';
        /* „x = " gehört zum Feld und darf nicht davon abbrechen. */
        if (s.vorFeld){
          var vf = document.createElement('span');
          vf.className = 'pg-vor';
          vf.innerHTML = '\\(' + s.vorFeld + ' =\\)';
          paar.appendChild(vf);
        }
        var inp = document.createElement('input');
        inp.type = 'text'; inp.autocomplete = 'off';
        /* Am Handy soll die Zifferntastatur aufgehen, wenn wirklich nur eine
           Zahl gefragt ist. Steht im Platzhalter ein Term (x^2-5x+6=0) oder
           eine Liste (1; -2), braucht es die gewoehnliche Tastatur. */
        inp.inputMode = zahlTastatur(s) ? 'decimal' : 'text';
        if (s.platzhalter) inp.placeholder = s.platzhalter;
        inp.addEventListener('keydown', function(ev){ if (ev.key === 'Enter') pruefe(); });
        paar.appendChild(inp);
        var k = document.createElement('button');
        k.type = 'button'; k.className = 'pruef-knopf';
        k.textContent = T('✓ Prüfen', '✓ Check');
        k.addEventListener('click', pruefe);
        zeile.appendChild(paar); zeile.appendChild(k);
        /* Zusatzknöpfe, z. B. „keine Lösung" - dann muss man nichts tippen. */
        (s.knoepfe || []).forEach(function(kn){
          var bz = document.createElement('button');
          bz.type = 'button'; bz.className = 'btn-secondary';
          bz.textContent = kn.text;
          bz.addEventListener('click', function(){ inp.value = kn.wert; pruefe(); });
          zeile.appendChild(bz);
        });
        box.appendChild(zeile);
        function pruefe(){
          var r = s.pruefe ? s.pruefe(inp.value) : false;
          if (r === true){
            inp.classList.add('ok'); inp.disabled = true; k.disabled = true;
            merke(inp.value);
            setTimeout(weiter, 420);
          } else {
            inp.classList.add('err');
            melde(fb, 'err', (typeof r === 'string' && r) ? r : T('Das stimmt noch nicht.', 'That is not right yet.'));
          }
        }
        setTimeout(function(){ inp.focus(); }, 30);
      } else if (s.art === 'felder'){
        /* Mehrere Werte auf einmal - z. B. p und q zusammen ablesen. */
        var zeile2 = document.createElement('div');
        zeile2.className = 'pg-eingabe mehr';
        var felder = [];
        (s.felder || []).forEach(function(f){
          var paar2 = document.createElement('span');
          paar2.className = 'pg-feldpaar';
          var lab = document.createElement('span');
          lab.className = 'pg-vor';
          lab.innerHTML = '\\(' + f.name + ' =\\)';
          var inp2 = document.createElement('input');
          inp2.type = 'text'; inp2.autocomplete = 'off';
          inp2.inputMode = zahlTastatur(f) ? 'decimal' : 'text';
          inp2.placeholder = f.platzhalter || T('Zahl', 'number');
          inp2.addEventListener('keydown', function(ev){ if (ev.key === 'Enter') pruefeAlle(); });
          paar2.appendChild(lab); paar2.appendChild(inp2);
          zeile2.appendChild(paar2);
          felder.push({ f: f, el: inp2 });
        });
        var k2 = document.createElement('button');
        k2.type = 'button'; k2.className = 'pruef-knopf';
        k2.textContent = T('✓ Prüfen', '✓ Check');
        k2.addEventListener('click', function(){ pruefeAlle(); });
        zeile2.appendChild(k2);
        box.appendChild(zeile2);
        function pruefeAlle(){
          var alleOk = true, meldung = '';
          felder.forEach(function(it){
            var v = pgLese(it.el.value);
            var ok = (v !== null) && pgGleich(v, it.f.soll, it.f.tol || 1e-6);
            it.el.classList.toggle('ok', ok);
            it.el.classList.toggle('err', !ok);
            if (!ok){
              alleOk = false;
              if (!meldung && it.f.fehler){
                for (var i2 = 0; i2 < it.f.fehler.length; i2++)
                  if (v !== null && pgGleich(v, it.f.fehler[i2][0], it.f.tol || 1e-6)) meldung = it.f.fehler[i2][1];
              }
            }
          });
          if (alleOk){
            felder.forEach(function(it){ it.el.disabled = true; });
            k2.disabled = true;
            merke('…');
            setTimeout(weiter, 420);
          } else {
            melde(fb, 'err', meldung || s.falschText || T('Das stimmt noch nicht.', 'That is not right yet.'));
          }
        }
        setTimeout(function(){ if (felder[0]) felder[0].el.focus(); }, 30);
      } else {
        var w = document.createElement('div');
        w.className = 'pg-wahl';
        var bw = document.createElement('button');
        bw.type = 'button'; bw.className = 'pg-wahl-knopf';
        bw.textContent = T('Weiter →', 'Next →');
        bw.addEventListener('click', function(){ merke('…'); weiter(); });
        w.appendChild(bw);
        box.appendChild(w);
      }

      /* Hilfestufen und Überspringen */
      var fuss = document.createElement('div');
      fuss.className = 'pg-fuss';
      var hs = s.hilfe || [];
      if (hilfe < hs.length){
        var bh = document.createElement('button');
        bh.type = 'button'; bh.className = 'act-btn hint';
        bh.textContent = T('💡 Hilfe', '💡 Hint');
        bh.addEventListener('click', function(){ hilfe++; male(); });
        fuss.appendChild(bh);
      }
      var bs = document.createElement('button');
      bs.type = 'button'; bs.className = 'btn-secondary';
      bs.textContent = T('Überspringen', 'Skip');
      bs.addEventListener('click', function(){ merke('…'); weiter(); });
      fuss.appendChild(bs);
      box.appendChild(fb);
      box.appendChild(fuss);

      for (var i = 0; i < Math.min(hilfe, hs.length); i++){
        var hb = document.createElement('div');
        hb.className = 'pg-hilfe';
        var h = hs[i];
        if (typeof h === 'string'){ hb.innerHTML = h; }
        else {
          /* Zweite Hilfestufe: mehrere Vorschläge, einer davon stimmt. */
          hb.innerHTML = h.text || T('Eine davon stimmt:', 'One of these is right:');
          var aus = document.createElement('div');
          aus.className = 'pg-hilfe-wahl';
          (h.auswahl || []).forEach(function(w){
            var hbtn = document.createElement('button');
            hbtn.type = 'button'; hbtn.className = 'pg-wahl-knopf klein';
            hbtn.innerHTML = (typeof w === 'string') ? w : (w.zeig || w.tex || String(w.wert));
            hbtn.addEventListener('click', function(){
              var feld = box.querySelector('.pg-eingabe input');
              if (feld && !feld.disabled){
                feld.value = (typeof w === 'string') ? w : String(w.wert);
                feld.focus();
              }
            });
            aus.appendChild(hbtn);
          });
          hb.appendChild(aus);
        }
        box.appendChild(hb);
      }
      mj(host);
    }

    function weiter(){ idx++; hilfe = 0; male(); }

    male();
    return {
      neu: function(neue){ schritte = neue; idx = 0; hilfe = 0; erledigt = []; male(); },
      /* Die noch nicht bearbeiteten Schritte austauschen. Gebraucht, wenn der
         weitere Weg von der Antwort abhaengt - etwa davon, welche Nullstelle
         geraten wurde. Aus pruefe() heraus aufrufen: der laufende Schritt
         bleibt stehen, alles danach wird ersetzt. */
      rest: function(neue){ schritte = schritte.slice(0, idx + 1).concat(neue || []); }
    };
  }

  /* ── 6b. Fertige Schrittfolgen für das Quiz ───────────────────────────────
     Damit auf allen Seiten derselbe kleinschrittige Weg abgefragt wird:
     erst p und q mit Vorzeichen, dann einsetzen, dann jeden Zwischenwert
     einzeln, zum Schluss die beiden Lösungen getrennt.                     */

  /** Hilfsschritt: eine Zahl eingeben. */
  function zahlSchritt(titel, frage, soll, opt){
    opt = opt || {};
    /* Wenn das Ergebnis krumm ist und grob geprüft wird, darf gerundet werden -
       das steht dann an der Frage. Der Platzhalter verrät nie die Lösung. */
    var grob = (opt.tol && opt.tol >= 1e-4);
    /* Der Hinweis aufs Runden steht nur da, wo wirklich gerundet werden muss:
       2,5 oder 0,125 tippt man einfach ab. */
    var krumm = grob && Math.abs(soll * 1000 - Math.round(soll * 1000)) > 1e-6;
    /* Irrationale Werte duerfen genau (sqrt) oder auf zwei Stellen gerundet
       dastehen, periodische Brueche auf drei. */
    var stellen = (opt.tol && opt.tol >= 5e-3) ? 2 : 3;
    /* Zweite Hilfestufe: ein paar Vorschläge, darunter der richtige Wert. */
    var hs = (opt.hilfe || []).slice();
    if (opt.vorschlaege !== false){
      /* Brueche bleiben Brueche - 0,333 fuer 1/3 wuerde beim Pruefen gar nicht
         angenommen. Gerundet wird nur, was sich nicht genau schreiben laesst. */
      var runde = function(z){
        if (!pgKrumm(z)) return z;
        var f = Math.pow(10, stellen);
        return Math.round(z * f) / f;
      };
      var kand = [soll];
      (opt.fehler || []).forEach(function(f){ kand.push(f[0]); });
      [-soll, soll + 1, soll - 1, soll * 2].forEach(function(z){ kand.push(z); });
      var fertig = [];
      kand.forEach(function(z){
        if (!isFinite(z)) return;
        if (fertig.length >= 4) return;
        if (fertig.some(function(w){ return Math.abs(w - z) < 1e-9; })) return;
        fertig.push(runde(z));
      });
      /* feste, aber nicht sortierte Reihenfolge - der richtige Wert steht mal
         vorn, mal hinten, aber bei gleicher Aufgabe immer gleich */
      var dreh = Math.abs(Math.round(soll * 7 + fertig.length)) % fertig.length;
      fertig = fertig.slice(dreh).concat(fertig.slice(0, dreh));
      hs.push({ text: T('Eine dieser Zahlen stimmt - welche?', 'One of these numbers is right - which one?'),
                auswahl: fertig.map(function(z){ return { wert: pgZahlText(z), zeig: '\\(' + pgZahl(z) + '\\)' }; }) });
    }
    return {
      titel: titel, art: 'eingabe',
      frage: frage + (krumm ? ' <span class="pg-rund">'
        + (stellen === 2
            ? T('(genau, z.&nbsp;B. mit sqrt(…), oder auf 2 Nachkommastellen gerundet)',
                '(exact, e.g. with sqrt(…), or rounded to 2 decimals)')
            : T('(als Bruch oder auf 3 Nachkommastellen gerundet)',
                '(as a fraction or rounded to 3 decimals)')) + '</span>' : ''),
      platzhalter: opt.platzhalter || T('Zahl', 'number'),
      vorFeld: opt.vorFeld,
      /* Steht im Schritt selbst, mit welcher Gleichung gerade gerechnet wird,
         so gilt die - sonst setzte das Quiz die Gleichung der ganzen Reihe
         darueber, beim Durchteilen also schon die geteilte. */
      gleichung: opt.gleichung,
      kurz: opt.kurz || (pgZahl(soll)),
      hilfe: hs,
      pruefe: function(txt){
        var v = pgLese(txt);
        if (v === null) return T('Bitte eine Zahl eingeben.', 'Please enter a number.');
        if (pgGleich(v, soll, opt.tol || 1e-5)) return true;
        if (opt.fehler){
          for (var i = 0; i < opt.fehler.length; i++){
            if (pgGleich(v, opt.fehler[i][0], opt.tol || 1e-5)) return opt.fehler[i][1];
          }
        }
        return T('Das stimmt noch nicht.', 'That is not right yet.');
      }
    };
  }

  /**
   * Kleinschrittige Schritte für a·v² + b·v + c = 0 mit der pq-Formel.
   *   opt.v        Name der Variablen (Standard „x")
   *   opt.ohneAnzahl   die Frage nach der Anzahl weglassen
   */
  /* Kettentext für „Wurzel ziehen": lässt sich die Wurzel nicht vereinfachen,
     wäre „√x = √x" nur Füllmaterial - dann steht die Wurzel allein da. */
  function wurzelKurz(D){
    var gl = '\\sqrt{' + pgZahl(D) + '}', w = Math.sqrt(D);
    /* Ohne teilweises Wurzelziehen: geht die Wurzel nicht auf, folgt der
       Näherungswert. */
    return pgKrumm(w) ? (gl + ' \\approx ' + pgGerundet(w, 2)) : (gl + ' = ' + pgZahl(w));
  }
  /** Eine Lösung der Form „vorn ± Wurzel", exakt und - wenn krumm - gerundet.
      vornTeX: der Teil vor dem ±, nennerTeX: bei der Mitternachtsformel 2a. */
  function loesGenauTeX(x, vz, vornTeX, D, nennerTeX){
    if (!pgKrumm(x)) return pgZahl(x);
    var zaehler = (vornTeX ? vornTeX + (vz < 0 ? ' - ' : ' + ') : (vz < 0 ? '-' : '')) + pgWurzelRoh(D);
    return (nennerTeX ? '\\frac{' + zaehler + '}{' + nennerTeX + '}' : zaehler) + ' \\approx ' + pgGerundet(x, 2);
  }

  /* Über jedem Schritt soll die Gleichung stehen, an der gerade gerechnet
     wird. Beim Weg über die p-q-Formel wechselt sie einmal: nach dem Teilen
     durch den Vorfaktor steht dort die Normalform. */
  function glSetzen(S, vorText, nachText, abIndex){
    S.forEach(function(st, i){
      if (!st.gleichung) st.gleichung = (i < abIndex) ? vorText : nachText;
    });
    return S;
  }

  function pgSchrittePQ(a, b, c, opt){
    opt = opt || {};
    var v = opt.v || 'x';
    var p = b / a, q = c / a, m = p / 2, m2 = m * m, D = m2 - q;
    /* Eine winzige negative Zahl ist Rechenungenauigkeit, keine fehlende Lösung. */
    var W = (D >= -1e-9) ? Math.sqrt(Math.max(0, D)) : null;
    var x1 = (W === null) ? null : -m - W, x2 = (W === null) ? null : -m + W;
    var S = [];
    var normal = (Math.abs(a - 1) > 1e-9);
    var glVor = pgPoly({ 2: a, 1: b, 0: c }, { v: v }) + ' = 0';
    var glNach = pgPoly({ 2: 1, 1: p, 0: q }, { v: v }) + ' = 0';
    var fertig = function(){ return glSetzen(S, glVor, glNach, normal ? 1 : 0); };

    if (normal){
      S.push(zahlSchritt(T('Normalform', 'Standard form'),
        T('Die pq-Formel gilt nur, wenn vor ' + v + '² eine 1 steht. Durch welche Zahl musst du teilen?',
          'The pq formula only works with a 1 in front of ' + v + '². Which number do you have to divide by?'),
        a, { /* In der Kette steht die Gleichung, mit der weitergerechnet wird -
                „:5" allein sagt nicht, wie sie danach aussieht. */
             kurz: pgPoly({ 2: 1, 1: p, 0: q }, { v: v }) + ' = 0',
             hilfe: [T('Es ist die Zahl, die vor ' + v + '² steht.', 'It is the number in front of ' + v + '².')] }));
    }
    S.push(zahlSchritt('p', T('Wie groß ist p? Gib das Vorzeichen mit an.', 'What is p? Include the sign.'), p,
      { vorFeld: 'p', kurz: 'p = ' + pgZahl(p),
        fehler: [[-p, T('Fast – achte auf das Vorzeichen.', 'Almost – mind the sign.')],
                 [b, T('Das ist noch b. Teile zuerst durch die Zahl vor ' + v + '².',
                       'That is still b. First divide by the number in front of ' + v + '².')]],
        hilfe: [T('p ist der Faktor vor ' + v + ' in der Normalform.', 'p is the factor in front of ' + v + ' in the standard form.')] }));
    S.push(zahlSchritt('q', T('Wie groß ist q? Gib das Vorzeichen mit an.', 'What is q? Include the sign.'), q,
      { vorFeld: 'q', kurz: 'q = ' + pgZahl(q),
        fehler: [[-q, T('Fast – achte auf das Vorzeichen.', 'Almost – mind the sign.')],
                 [c, T('Das ist noch c. Teile zuerst durch die Zahl vor ' + v + '².',
                       'That is still c. First divide by the number in front of ' + v + '².')]],
        hilfe: [T('q ist die Zahl ohne ' + v + ' in der Normalform.', 'q is the number without ' + v + ' in the standard form.')] }));
    /* opt.knapp: Die Restgleichung ist hier nur Wiederholung - dann genügt
       ein Schritt für beide Lösungen. Geübt wird die p-q-Formel auf ihrer
       eigenen Seite. */
    if (opt.knapp){
      var loesListe = (W === null) ? [] : (D > 1e-9 ? [x1, x2] : [x1]);
      S.push({ titel: T('p-q-Formel', 'pq formula'), art: 'eingabe', vorFeld: v,
        frage: T('Setze in \\(' + v + '_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^{2} - q}\\) ein. Was kommt heraus? Mehrere Werte mit Semikolon trennen.',
                 'Substitute into \\(' + v + '_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^{2} - q}\\). What do you get? Separate several values with a semicolon.'),
        platzhalter: T('z. B. 2; -3', 'e.g. 2; -3'),
        knoepfe: loesListe.length ? [] : [{ text: T('keine Lösung', 'no solution'), wert: 'keine' }],
        kurz: loesListe.length
          ? loesListe.map(function(z, i){
              return loesGenauTeX(z, i === 0 && loesListe.length > 1 ? -1 : 1, Math.abs(m) < 1e-12 ? '' : pgZahl(-m), D);
            }).join(';\\ ')
          : T('keine Lösung', 'no solution'),
        /* So würde man die Antwort tippen - gebraucht vom Prüflauf. */
        muster: loesListe.length ? loesListe.map(function(z){ return pgKrumm(z) ? pgGerundet(z, 2).replace('{,}', ',') : pgZahlText(z); }).join('; ') : 'keine',
        hilfe: [T('Unter der Wurzel steht \\(\\left(\\frac{p}{2}\\right)^{2} - q = ' + pgZahl(D) + '\\).',
                  'Under the root you get \\(\\left(\\frac{p}{2}\\right)^{2} - q = ' + pgZahl(D) + '\\).'),
                (D < -1e-9)
                  ? T('Aus einer negativen Zahl lässt sich keine Wurzel ziehen.', 'You cannot take the square root of a negative number.')
                  : T('Rechne \\(' + pgZahl(-m) + ' \\pm ' + pgWurzelRoh(D) + '\\).', 'Work out \\(' + pgZahl(-m) + ' \\pm ' + pgWurzelRoh(D) + '\\).')],
        pruefe: function(txt){
          var t = String(txt || '').trim();
          if (/^(keine|none|-|\u2205)$/i.test(t))
            return loesListe.length ? T('Lösungen gibt es hier schon.', 'There are solutions here.') : true;
          var teile = t.replace(/\u2228/g, ';').split(';').map(function(x){ return x.trim(); })
                       .filter(function(x){ return x !== ''; });
          var zahlen = teile.map(pgLese);
          if (!zahlen.length || zahlen.some(function(z){ return z === null; }))
            return T('Bitte Zahlen eingeben, mehrere mit Semikolon.', 'Please enter numbers, several separated by a semicolon.');
          var eigen = [];
          zahlen.forEach(function(z){ if (!eigen.some(function(w){ return pgGleich(w, z, schrittTol(w, z)); })) eigen.push(z); });
          eigen.sort(function(x, y){ return x - y; });
          var soll2 = loesListe.slice().sort(function(x, y){ return x - y; });
          if (eigen.length === soll2.length && eigen.every(function(z, i){ return pgGleich(z, soll2[i], schrittTol(soll2[i])); })) return true;
          if (eigen.length !== soll2.length)
            return T('Die Anzahl passt noch nicht – schau auf das Vorzeichen unter der Wurzel.',
                     'The number of values does not fit yet – look at the sign under the root.');
          return T('Noch nicht ganz – prüfe die Vorzeichen.', 'Not quite yet – check the signs.');
        } });
      return fertig();
    }
    S.push({ titel: T('Formel', 'Formula'), art: 'wahl',
      frage: T('Welche Formel ist die richtige?', 'Which formula is the right one?'),
      optionen: ['\\(' + v + '_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^{2} - q}\\)',
                 '\\(' + v + '_{1,2} = \\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^{2} + q}\\)',
                 '\\(' + v + '_{1,2} = -\\frac{p}{2} \\pm \\sqrt{p^{2} - q}\\)'],
      richtig: 0, kurz: T('p-q-Formel', 'pq formula'),
      falschText: T('Vor dem Bruch steht ein Minus, unter der Wurzel wird q abgezogen – und p wird zuerst halbiert.',
                    'There is a minus in front of the fraction, q is subtracted under the root – and p is halved first.'),
      hilfe: [T('Merksatz: minus p halbe, plusminus Wurzel aus p halbe Quadrat minus q.',
                'Mnemonic: minus p over two, plus-minus the root of (p over two) squared minus q.')] });
    S.push(zahlSchritt(T('p halbieren', 'Halve p'),
      T('Berechne \\(\\frac{p}{2}\\).', 'Work out \\(\\frac{p}{2}\\).'), m,
      { vorFeld: '\\frac{p}{2}', kurz: '\\frac{p}{2} = ' + pgZahl(m),
        fehler: [[-m, T('Achtung: das Vorzeichen von p bleibt beim Halbieren erhalten.',
                        'Careful: the sign of p stays the same when halving.')],
                 [p, T('Das ist noch p selbst – es muss halbiert werden.', 'That is still p itself – it has to be halved.')]],
        hilfe: [T('p durch 2 teilen, Vorzeichen mitnehmen.', 'Divide p by 2, keeping the sign.')] }));
    S.push(zahlSchritt(T('quadrieren', 'Square it'),
      T('Berechne \\(\\left(\\frac{p}{2}\\right)^{2}\\).', 'Work out \\(\\left(\\frac{p}{2}\\right)^{2}\\).'), m2,
      { vorFeld: '\\left(\\frac{p}{2}\\right)^{2}', kurz: '\\left(\\frac{p}{2}\\right)^{2} = ' + pgZahl(m2),
        fehler: [[-m2, T('Ein Quadrat ist nie negativ.', 'A square is never negative.')],
                 [2 * m, T('Quadrieren heißt mit sich selbst multiplizieren, nicht verdoppeln.',
                           'Squaring means multiplying by itself, not doubling.')]],
        hilfe: [T('Die Zahl mit sich selbst multiplizieren – minus mal minus ergibt plus.',
                  'Multiply the number by itself – minus times minus gives plus.')] }));
    S.push(zahlSchritt(T('unter der Wurzel', 'Under the root'),
      T('Jetzt \\(\\left(\\frac{p}{2}\\right)^{2} - q\\). Was steht unter der Wurzel?',
        'Now \\(\\left(\\frac{p}{2}\\right)^{2} - q\\). What is under the root?'), D,
      { vorFeld: '\\left(\\frac{p}{2}\\right)^{2}-q', kurz: '\\sqrt{' + pgZahl(D) + '}',
        fehler: [[m2 + q, (q < 0)
            ? T('Vorsicht: q ist negativ – minus mal minus ergibt plus, es wird also addiert.',
                'Careful: q is negative – minus times minus gives plus, so it is added.')
            : T('q wird abgezogen, nicht addiert.', 'q is subtracted, not added.')]],
        hilfe: [T('Vom eben berechneten Quadrat wird q abgezogen – mit seinem Vorzeichen.',
                  'q is subtracted from the square you just worked out – with its sign.')] }));
    if (!opt.ohneAnzahl){
      S.push({ titel: T('Wie viele Lösungen?', 'How many solutions?'), art: 'wahl',
        frage: T('Was folgt aus dieser Zahl?', 'What follows from this number?'),
        optionen: [T('keine Lösung', 'no solution'), T('eine (doppelte) Lösung', 'one (double) solution'), T('zwei Lösungen', 'two solutions')],
        richtig: (D < -1e-9) ? 0 : (Math.abs(D) < 1e-9 ? 1 : 2),
        kurz: ((D < -1e-9) ? 0 : (Math.abs(D) < 1e-9 ? 1 : 2)) + ' ' + T('Lösung(en)', 'solution(s)'),
        falschText: T('negativ → keine Lösung, 0 → eine, positiv → zwei.',
                      'negative → no solution, 0 → one, positive → two.'),
        hilfe: [T('Aus einer negativen Zahl lässt sich keine Wurzel ziehen.',
                  'You cannot take the square root of a negative number.')] });
    }
    if (W !== null && D > 1e-9){
      S.push(zahlSchritt(T('Wurzel ziehen', 'Take the root'),
        T('Berechne \\(\\sqrt{' + pgZahl(D) + '}\\).', 'Work out \\(\\sqrt{' + pgZahl(D) + '}\\).'), W,
        { vorFeld: '\\sqrt{D}', kurz: wurzelKurz(D), tol: schrittTol(W),
          fehler: [[D / 2, T('Wurzelziehen ist nicht Halbieren.', 'Taking a root is not halving.')]],
          hilfe: [T('Welche Zahl mit sich selbst malgenommen ergibt ' + pgZahlText(D) + '?',
                    'Which number multiplied by itself gives ' + pgZahlText(D) + '?')] }));
    }
    if (W !== null && D <= 1e-9){
      /* Unter der Wurzel steht 0: plus und minus ergeben dasselbe. */
      S.push(zahlSchritt(T('Die Lösung', 'The solution'),
        T('Unter der Wurzel steht 0 – plus und minus ergeben dasselbe. Wie lautet die (doppelte) Lösung \\(' + v + ' = -\\frac{p}{2}\\)?',
          'There is 0 under the root – plus and minus give the same. What is the (double) solution \\(' + v + ' = -\\frac{p}{2}\\)?'), x1,
        { vorFeld: v, kurz: v + '_{1,2} = ' + pgZahl(x1), tol: schrittTol(x1),
          fehler: [[-x1, T('Achte auf das Vorzeichen: es heißt minus p halbe.', 'Mind the sign: it is minus p over two.')]],
          hilfe: [T('Es bleibt nur der Wert vor dem ±.', 'Only the value in front of the ± is left.')] }));
    } else if (W !== null){
      var vornPQ = (Math.abs(m) < 1e-12) ? '' : pgZahl(-m);
      S.push(zahlSchritt(v + '₁',
        T('Jetzt der Fall mit <b>minus</b>: \\(' + v + '_1 = ' + (vornPQ ? vornPQ + ' - ' : '-') + pgWurzelRoh(D) + '\\). Wie viel ist das?',
          'Now the case with <b>minus</b>: \\(' + v + '_1 = ' + (vornPQ ? vornPQ + ' - ' : '-') + pgWurzelRoh(D) + '\\). What is that?'), x1,
        { vorFeld: v + '_1', kurz: v + '_1 = ' + loesGenauTeX(x1, -1, vornPQ, D), tol: schrittTol(x1),
          fehler: [[x2, T('Das ist der Fall mit plus – hier ist der mit minus gefragt.',
                          'That is the case with plus – here the one with minus is wanted.')],
                   [-x1, T('Achte auf die Vorzeichen.', 'Mind the signs.')]],
          hilfe: [T('Vom ersten Wert die Wurzel abziehen.', 'Subtract the root from the first value.')] }));
      S.push(zahlSchritt(v + '₂',
        T('Und der Fall mit <b>plus</b>: \\(' + v + '_2 = ' + (vornPQ ? vornPQ + ' + ' : '') + pgWurzelRoh(D) + '\\).',
          'And the case with <b>plus</b>: \\(' + v + '_2 = ' + (vornPQ ? vornPQ + ' + ' : '') + pgWurzelRoh(D) + '\\).'), x2,
        { vorFeld: v + '_2', kurz: v + '_2 = ' + loesGenauTeX(x2, 1, vornPQ, D), tol: schrittTol(x2),
          fehler: [[x1, T('Das war schon der Fall mit minus.', 'That was the case with minus already.')]],
          hilfe: [T('Zum ersten Wert die Wurzel addieren.', 'Add the root to the first value.')] }));
    }
    return fertig();
  }

  /**
   * Die zwei Schritte der Aufgabenart „Einsetzen": erst die linke Seite
   * ausrechnen, dann mit der rechten vergleichen.
   *   e   { linksTeX, links, rechts, gleich } - dieselbe Rechnung, die die Seite
   *       in ihrem Lösungsweg zeigt
   *   opt.probeTeX   die eingesetzte Zahl      opt.v   Name der Variablen
   *   opt.nullstelle wird nach einer Nullstelle gefragt (statt nach einer Lösung)?
   */
  function pgSchritteEinsetzen(e, opt){
    opt = opt || {};
    var v = opt.v || 'x', pT = opt.probeTeX, S = [];
    var wasDe = opt.nullstelle ? 'eine Nullstelle' : 'eine Lösung',
        wasEn = opt.nullstelle ? 'a root' : 'a solution';
    S.push(zahlSchritt(T('Einsetzen', 'Substituting'),
      T('Setze \\(' + v + ' = ' + pT + '\\) in die linke Seite ein. Was kommt heraus?',
        'Substitute \\(' + v + ' = ' + pT + '\\) on the left-hand side. What do you get?')
        + '<br>\\[' + e.linksTeX + ' = \\;?\\]', e.links,
      { kurz: e.linksTeX + ' = ' + pgZahl(e.links), tol: 1e-4,
        hilfe: opt.hilfe || [T('Erst die Potenzen ausrechnen, dann multiplizieren, zuletzt zusammenzählen.',
                               'Work out the powers first, then multiply, then add up.')] }));
    S.push({ titel: T('Vergleichen', 'Compare'), art: 'wahl',
      frage: T('Links kommt \\(' + pgZahl(e.links) + '\\) heraus, rechts steht \\(' + pgZahl(e.rechts)
               + '\\). Ist \\(' + v + ' = ' + pT + '\\) also ' + wasDe + '?',
               'The left-hand side gives \\(' + pgZahl(e.links) + '\\), the right-hand side is \\(' + pgZahl(e.rechts)
               + '\\). So is \\(' + v + ' = ' + pT + '\\) ' + wasEn + '?'),
      optionen: [T('ja', 'yes'), T('nein', 'no')],
      richtig: e.gleich ? 0 : 1,
      kurz: e.gleich ? (opt.nullstelle ? T('Nullstelle', 'root') : T('Lösung', 'solution'))
                     : (opt.nullstelle ? T('keine Nullstelle', 'not a root') : T('keine Lösung', 'not a solution')),
      falschText: T('Eine Zahl ist genau dann ' + wasDe + ', wenn beide Seiten denselben Wert haben.',
                    'A number is ' + wasEn + ' exactly when both sides have the same value.'),
      hilfe: [T('Vergleiche die beiden Zahlen: Sind sie gleich?', 'Compare the two numbers: are they equal?')] });
    return S;
  }

  /** Dasselbe über die Mitternachtsformel. */
  function pgSchritteMNF(a, b, c, opt){
    opt = opt || {};
    var v = opt.v || 'x';
    var D = b * b - 4 * a * c;
    /* Eine winzige negative Zahl ist Rechenungenauigkeit, keine fehlende Lösung. */
    var W = (D >= -1e-9) ? Math.sqrt(Math.max(0, D)) : null;
    var x1 = (W === null) ? null : (-b - W) / (2 * a), x2 = (W === null) ? null : (-b + W) / (2 * a);
    var S = [];
    /* Hier wird nicht umgeformt - über allen Schritten steht dieselbe Gleichung. */
    var glMNF = pgPoly({ 2: a, 1: b, 0: c }, { v: v }) + ' = 0';
    S.push(zahlSchritt('a', T('Wie groß ist a, der Faktor vor ' + v + '²?', 'What is a, the factor in front of ' + v + '²?'), a,
      { vorFeld: 'a', kurz: 'a = ' + pgZahl(a), hilfe: [T('Steht kein Faktor da, ist a = 1.', 'If there is no factor, a = 1.')] }));
    S.push(zahlSchritt('b', T('Wie groß ist b? Gib das Vorzeichen mit an.', 'What is b? Include the sign.'), b,
      { vorFeld: 'b', kurz: 'b = ' + pgZahl(b),
        fehler: [[-b, T('Fast – achte auf das Vorzeichen.', 'Almost – mind the sign.')]],
        hilfe: [T('b ist der Faktor vor ' + v + '.', 'b is the factor in front of ' + v + '.')] }));
    S.push(zahlSchritt('c', T('Wie groß ist c? Gib das Vorzeichen mit an.', 'What is c? Include the sign.'), c,
      { vorFeld: 'c', kurz: 'c = ' + pgZahl(c),
        fehler: [[-c, T('Fast – achte auf das Vorzeichen.', 'Almost – mind the sign.')]],
        hilfe: [T('c ist die Zahl ohne ' + v + '.', 'c is the number without ' + v + '.')] }));
    S.push(zahlSchritt('b²', T('Berechne \\(b^{2}\\).', 'Work out \\(b^{2}\\).'), b * b,
      { vorFeld: 'b^{2}', kurz: 'b^{2} = ' + pgZahl(b * b),
        fehler: [[-b * b, T('Ein Quadrat ist nie negativ.', 'A square is never negative.')],
                 [2 * b, T('Quadrieren heißt mit sich selbst multiplizieren.', 'Squaring means multiplying by itself.')]] }));
    S.push(zahlSchritt('4ac', T('Berechne \\(4 \\cdot a \\cdot c\\).', 'Work out \\(4 \\cdot a \\cdot c\\).'), 4 * a * c,
      { vorFeld: '4ac', kurz: '4ac = ' + pgZahl(4 * a * c),
        fehler: [[-4 * a * c, T('Achte auf die Vorzeichen von a und c.', 'Mind the signs of a and c.')]] }));
    S.push(zahlSchritt(T('Diskriminante', 'Discriminant'),
      T('Jetzt \\(b^{2} - 4ac\\). Was steht unter der Wurzel?', 'Now \\(b^{2} - 4ac\\). What is under the root?'), D,
      { vorFeld: 'D', kurz: 'D = ' + pgZahl(D),
        fehler: [[b * b + 4 * a * c, T('4ac wird abgezogen – achte auf das Vorzeichen.',
                                       '4ac is subtracted – mind the sign.')]] }));
    if (!opt.ohneAnzahl){
      S.push({ titel: T('Wie viele Lösungen?', 'How many solutions?'), art: 'wahl',
        frage: T('Was folgt aus dieser Zahl?', 'What follows from this number?'),
        optionen: [T('keine Lösung', 'no solution'), T('eine (doppelte) Lösung', 'one (double) solution'), T('zwei Lösungen', 'two solutions')],
        richtig: (D < -1e-9) ? 0 : (Math.abs(D) < 1e-9 ? 1 : 2),
        kurz: ((D < -1e-9) ? 0 : (Math.abs(D) < 1e-9 ? 1 : 2)) + ' ' + T('Lösung(en)', 'solution(s)'),
        falschText: T('negativ → keine Lösung, 0 → eine, positiv → zwei.',
                      'negative → no solution, 0 → one, positive → two.') });
    }
    if (W !== null && D > 1e-9){
      S.push(zahlSchritt(T('Wurzel ziehen', 'Take the root'),
        T('Berechne \\(\\sqrt{' + pgZahl(D) + '}\\).', 'Work out \\(\\sqrt{' + pgZahl(D) + '}\\).'), W,
        { vorFeld: '\\sqrt{D}', tol: schrittTol(W),
          kurz: wurzelKurz(D) }));
    }
    if (W !== null){
      S.push(zahlSchritt(T('Nenner', 'Denominator'),
        T('Berechne den Nenner \\(2a\\).', 'Work out the denominator \\(2a\\).'), 2 * a,
        { vorFeld: '2a', kurz: '2a = ' + pgZahl(2 * a) }));
      if (D <= 1e-9){
        S.push(zahlSchritt(T('Die Lösung', 'The solution'),
          T('Unter der Wurzel steht 0 – plus und minus ergeben dasselbe: \\(' + v + ' = \\frac{-b}{2a}\\). Wie lautet die (doppelte) Lösung?',
            'There is 0 under the root – plus and minus give the same: \\(' + v + ' = \\frac{-b}{2a}\\). What is the (double) solution?'), x1,
          { vorFeld: v, kurz: v + '_{1,2} = ' + pgZahl(x1), tol: schrittTol(x1),
            fehler: [[-x1, T('Achte auf das Vorzeichen von b.', 'Mind the sign of b.')]] }));
      } else {
        var vornM = (Math.abs(b) < 1e-12) ? '' : pgZahl(-b);
        S.push(zahlSchritt(v + '₁',
          T('Jetzt der Fall mit <b>minus</b>: \\(' + v + '_1 = \\frac{' + (vornM ? vornM + ' - ' : '-') + pgWurzelRoh(D) + '}{' + pgZahl(2 * a) + '}\\).',
            'Now the case with <b>minus</b>: \\(' + v + '_1 = \\frac{' + (vornM ? vornM + ' - ' : '-') + pgWurzelRoh(D) + '}{' + pgZahl(2 * a) + '}\\).'), x1,
          { vorFeld: v + '_1', kurz: v + '_1 = ' + loesGenauTeX(x1, -1, vornM, D, pgZahl(2 * a)), tol: schrittTol(x1),
            fehler: [[x2, T('Das ist der Fall mit plus.', 'That is the case with plus.')]] }));
        S.push(zahlSchritt(v + '₂',
          T('Und der Fall mit <b>plus</b>: \\(' + v + '_2 = \\frac{' + (vornM ? vornM + ' + ' : '') + pgWurzelRoh(D) + '}{' + pgZahl(2 * a) + '}\\).',
            'And the case with <b>plus</b>: \\(' + v + '_2 = \\frac{' + (vornM ? vornM + ' + ' : '') + pgWurzelRoh(D) + '}{' + pgZahl(2 * a) + '}\\).'), x2,
          { vorFeld: v + '_2', kurz: v + '_2 = ' + loesGenauTeX(x2, 1, vornM, D, pgZahl(2 * a)), tol: schrittTol(x2),
            fehler: [[x1, T('Das war schon der Fall mit minus.', 'That was the case with minus already.')]] }));
      }
    }
    return glSetzen(S, glMNF, glMNF, 0);
  }

  /** Kleinschrittig für a·vⁿ + d = 0. */
  function pgSchrittePotenz(a, d, n, opt){
    opt = opt || {};
    var v = opt.v || 'x';
    var w = -d / a, gerade = (n % 2 === 0);
    var S = [];
    /* Die Potenz mit ihrem Faktor - ohne „1x²". */
    var pot = function(k){ var o = {}; o[n] = k; return pgPoly(o, { v: v }); };
    /* Über den Schritten steht die Gleichung, an der gerade gerechnet wird:
       erst a·xⁿ + d = 0, nach dem Hinüberbringen a·xⁿ = −d, zuletzt xⁿ = w. */
    var glNull = (function(){
      var o = {}; o[n] = a; if (Math.abs(d) > 1e-12) o[0] = d;
      return pgPoly(o, { v: v }) + ' = 0';
    })();
    var glZahl = pot(a) + ' = ' + pgZahl(-d);
    var glPot  = pot(1) + ' = ' + pgZahl(w);
    /* opt.schon: Die Aufgabe steht schon als xⁿ = w da - dann gibt es nichts
       hinüberzubringen und nichts zu teilen. */
    if (!opt.schon){
      if (Math.abs(d) > 1e-12)
        S.push(zahlSchritt(T('Zahl beiseite', 'Move the number'),
          T('Bringe die Zahl auf die andere Seite: \\(' + pot(a) + ' = \\;?\\)',
            'Move the number to the other side: \\(' + pot(a) + ' = \\;?\\)'), -d,
          { gleichung: glNull, kurz: glZahl,
            fehler: [[d, T('Beim Hinüberbringen dreht sich das Vorzeichen um.',
                           'The sign flips when you move it across.')]],
            hilfe: [T('Auf beiden Seiten dieselbe Zahl addieren bzw. subtrahieren.',
                      'Add or subtract the same number on both sides.')] }));
      if (Math.abs(a - 1) > 1e-9){
        S.push(zahlSchritt(T('durch den Faktor teilen', 'Divide by the factor'),
          T('Teile durch ' + pgZahlText(a) + ': \\(' + pot(1) + ' = \\;?\\)',
            'Divide by ' + pgZahlText(a) + ': \\(' + pot(1) + ' = \\;?\\)'), w,
          { gleichung: glZahl, kurz: glPot,
            fehler: [[-w, T('Achte auf das Vorzeichen des Faktors.', 'Mind the sign of the factor.')],
                     [-d * a, T('Hier wird geteilt, nicht multipliziert.', 'Here you divide, not multiply.')]],
            hilfe: [T('Beide Seiten durch den Faktor vor der Potenz teilen.',
                      'Divide both sides by the factor in front of the power.')] }));
      }
    }
    S.push({ titel: T('Exponent ansehen', 'Look at the exponent'), art: 'wahl', gleichung: glPot,
      frage: T('Der Exponent ist ' + n + '. Was heißt das für die Anzahl der Lösungen?',
               'The exponent is ' + n + '. What does that mean for the number of solutions?'),
      optionen: gerade
        ? [T('zwei Lösungen, wenn rechts eine positive Zahl steht', 'two solutions if the right-hand side is positive'),
           T('immer genau eine Lösung', 'always exactly one solution'),
           T('immer zwei Lösungen', 'always two solutions')]
        : [T('immer genau eine Lösung', 'always exactly one solution'),
           T('zwei Lösungen', 'two solutions'),
           T('keine Lösung bei negativer Zahl', 'no solution for a negative number')],
      richtig: 0,
      kurz: gerade ? T('gerader Exponent', 'even exponent') : T('ungerader Exponent', 'odd exponent'),
      falschText: gerade
        ? T('Eine gerade Potenz ist nie negativ: bei positiver Zahl zwei Lösungen, bei 0 eine, bei negativer keine.',
            'An even power is never negative: a positive number gives two solutions, 0 gives one, a negative none.')
        : T('Eine ungerade Potenz nimmt jeden Wert an – es gibt immer genau eine Lösung.',
            'An odd power takes every value – there is always exactly one solution.'),
      hilfe: [gerade
        ? T('Denk an \\(' + v + '^{2}\\): das Ergebnis ist nie negativ.',
            'Think of \\(' + v + '^{2}\\): the result is never negative.')
        : T('Denk an \\(' + v + '^{3}\\): \\((-2)^{3} = -8\\) – das Vorzeichen bleibt erhalten.',
            'Think of \\(' + v + '^{3}\\): \\((-2)^{3} = -8\\) – the sign is kept.')] });
    var loes = [];
    if (Math.abs(w) < 1e-12) loes = [0];
    else if (gerade) loes = (w > 0) ? [-Math.pow(w, 1 / n), Math.pow(w, 1 / n)] : [];
    else loes = [Math.sign(w) * Math.pow(Math.abs(w), 1 / n)];
    S.push({ titel: T('Wie viele Lösungen?', 'How many solutions?'), art: 'wahl', gleichung: glPot,
      frage: T('Rechts steht \\(' + pgZahl(w) + '\\). Wie viele Lösungen gibt es also?',
               'The right-hand side is \\(' + pgZahl(w) + '\\). So how many solutions are there?'),
      optionen: [T('keine', 'none'), T('eine', 'one'), T('zwei', 'two')],
      richtig: loes.length,
      kurz: loes.length + ' ' + T('Lösung(en)', 'solution(s)'),
      falschText: T('Vorzeichen der rechten Seite und Exponent entscheiden gemeinsam.',
                    'The sign on the right and the exponent decide together.') });
    if (loes.length){
      var gross = loes[loes.length - 1];
      /* Geht die Wurzel nicht auf, bleibt sie als Wurzel stehen - dahinter
         der Näherungswert. */
      var wurzel = function(vz){
        var betrag = (n === 2) ? '\\sqrt{' + pgZahl(Math.abs(w)) + '}'
                               : '\\sqrt[' + n + ']{' + pgZahl(Math.abs(w)) + '}';
        return (vz < 0 ? '-' : '') + betrag;
      };
      var genau = function(x){
        return pgKrumm(x) ? (wurzel(x) + ' \\approx ' + pgGerundet(x, 2)) : pgZahl(x);
      };
      var welche = (n === 2) ? T('die Wurzel', 'the square root')
                             : T('die ' + n + '. Wurzel', 'the ' + n + 'th root');
      S.push(zahlSchritt(T('Wurzel ziehen', 'Take the root'),
        T('Ziehe ' + welche + ': ' + (loes.length > 1 ? 'Wie lautet die positive Lösung?' : 'Wie lautet die Lösung?'),
          'Take ' + welche + ': ' + (loes.length > 1 ? 'what is the positive solution?' : 'what is the solution?')), gross,
        { gleichung: glPot, kurz: v + ' = ' + genau(gross), tol: schrittTol(gross),
          fehler: [[w, T('Das ist noch \\(' + v + '^{' + n + '}\\) – jetzt fehlt die Wurzel.',
                         'That is still \\(' + v + '^{' + n + '}\\) – the root is still missing.')],
                   [w / n, T('Wurzelziehen ist nicht Teilen.', 'Taking a root is not dividing.')]],
          hilfe: [T('Welche Zahl hoch ' + n + ' ergibt \\(' + pgZahl(w) + '\\)?',
                    'Which number raised to the power ' + n + ' gives \\(' + pgZahl(w) + '\\)?')] }));
      if (loes.length > 1){
        /* Die Auswahl steht als Formel da - sonst bliebe bei Brüchen und
           Wurzeln der TeX-Quelltext auf dem Knopf stehen. */
        var kehr = pgKrumm(gross) ? ('\\frac{1}{' + wurzel(1) + '}')
                 : (Math.abs(gross - 1) < 1e-9 ? pgZahl(2) : pgZahl(1 / gross));
        S.push({ titel: T('die zweite Lösung', 'the second solution'), art: 'wahl', gleichung: glPot,
          frage: T('Wie lautet die zweite Lösung?', 'What is the second solution?'),
          optionen: ['\\(' + (pgKrumm(gross) ? wurzel(-1) : pgZahl(loes[0])) + '\\)',
                     '\\(' + kehr + '\\)', '\\(0\\)'],
          richtig: 0, kurz: v + ' = ' + genau(loes[0]),
          falschText: T('Bei einem geraden Exponenten gehört zu jeder Lösung auch ihre Gegenzahl.',
                        'With an even exponent every solution comes with its opposite.'),
          hilfe: [T('(−a)ⁿ ist bei geradem n dasselbe wie aⁿ.', '(−a)ⁿ equals aⁿ for even n.')] });
      }
    }
    return S;
  }

  /* ── 7. Aufgabenstile ──────────────────────────────────────────────────── */

  /**
   * Die Aufgabenstile, die alle Gleichungsseiten teilen. Jede Seite baut nur
   * ihre Gleichung; hier stehen Überschrift, Aufgabentext und der
   * Zwischenschritt, der aus der Aufgabe wieder „… = 0" macht.
   */
  var STILE = {
    loesen: {
      name: function(){ return T('Gleichung lösen', 'Solve the equation'); },
      text: function(){ return T('Löse die Gleichung.', 'Solve the equation.'); }
    },
    nullstelle: {
      name: function(){ return T('Nullstellen finden', 'Find the roots'); },
      text: function(o){ return T('Bestimme die Nullstellen von ' + (o && o.fname || 'f') + '.',
                                  'Find the roots of ' + (o && o.fname || 'f') + '.'); }
    },
    umstellen: {
      name: function(){ return T('umstellen und lösen', 'rearrange, then solve'); },
      text: function(){ return T('Bringe die Gleichung zuerst auf die Form „… = 0" und löse sie dann.',
                                 'First bring the equation into the form “… = 0”, then solve it.'); }
    },
    schnitt: {
      name: function(){ return T('Schnittstellen finden', 'Find the intersections'); },
      text: function(){ return T('Bestimme die Schnittstellen der beiden Graphen.',
                                 'Find the x-values where the two graphs intersect.'); }
    },
    erkennen: {
      name: function(){ return T('Art erkennen', 'Recognise the type'); },
      text: function(){ return T('Lässt sich diese Gleichung mit dem Verfahren dieser Seite lösen?',
                                 'Can this equation be solved with the method of this page?'); }
    },
    einsetzen: {
      name: function(){ return T('Stelle prüfen', 'Test a value'); },
      text: function(){ return T('Prüfe durch Einsetzen, ob die angegebene Stelle eine Lösung ist.',
                                 'Substitute the given value to check whether it is a solution.'); }
    }
  };
  function pgStil(stil){ return STILE[stil] || STILE.loesen; }

  /**
   * Erster Schritt in jedem Quiz: Steht die Gleichung schon gleich 0?
   * schonNull sagt, ob sie es tut; gl ist die Gleichung als TeX.
   */
  function pgSchrittNullForm(schonNull, gl, opt){
    opt = opt || {};
    /* Bei „Nullstellen finden" wird nicht umgestellt, sondern f(x) = 0 gesetzt -
       „erst umstellen" wäre dort schlicht falsch. opt.art ist der Aufgabenstil. */
    var nst = (opt.art === 'nullstelle'), schn = (opt.art === 'schnitt');
    var nein = opt.nein || (nst ? T('nein – erst f(x) = 0 setzen', 'no – first set f(x) = 0')
                          : schn ? T('nein – erst gleichsetzen', 'no – first set them equal')
                                 : T('nein – erst umstellen', 'no – rearrange first'));
    var neinKurz = opt.neinKurz || (nst ? T('f(x) = 0 setzen', 'set f(x) = 0')
                                  : schn ? T('gleichsetzen', 'set them equal')
                                         : T('umstellen', 'rearrange'));
    return {
      titel: T('Form prüfen', 'Check the form'),
      art: 'wahl',
      gleichung: gl,
      frage: T('Steht die Gleichung schon in der Form „… = 0“?',
               'Is the equation already in the form “… = 0”?'),
      optionen: [T('ja', 'yes'), nein],
      richtig: schonNull ? 0 : 1,
      kurz: schonNull ? T('steht schon = 0', 'already = 0') : neinKurz,
      falschText: schonNull
        ? T('Doch – rechts steht schon die 0.', 'It does – the right-hand side is already 0.')
        : T('Schau genau hin: rechts steht noch nicht 0.', 'Look closely: the right-hand side is not 0 yet.'),
      hilfe: [T('Fast alle Verfahren setzen voraus, dass auf einer Seite 0 steht.',
                'Nearly all methods need a 0 on one side.')]
    };
  }

  /**
   * Die Gleichung, die über den Quizschritten steht, wechselt unterwegs:
   * erst die Aufgabe, nach dem Ansatz die Nullform, nach dem Substituieren
   * die neue Gleichung. Sonst stünde dort noch „f(x) = …", obwohl man längst
   * mit etwas anderem weiterrechnet.
   *   stufen: [[ab welchem Schritt, TeX], …]  -  Schritte ab 0 gezählt
   * Rückgabe: ein fester Text oder eine Funktion für pgQuiz(…, {gleichung}).
   */
  function pgGleichungFolge(stufen){
    var l = (stufen || []).filter(function(s){ return s && s[1]; });
    if (!l.length) return '';
    /* Wechselt nichts, genügt der feste Text. */
    if (l.length === 1 || l.every(function(s){ return s[1] === l[0][1]; })) return l[0][1];
    return function(st, i){
      var t = l[0][1];
      l.forEach(function(s){ if (i >= s[0]) t = s[1]; });
      return t;
    };
  }

  /* ── 7b. Schreibweise der Lösungen ────────────────────────────────────────
     Dieselben Lösungen lassen sich verschieden aufschreiben. Welche Form eine
     Seite nimmt, entscheidet die Einstellung „Schreibweise der Lösungen".     */
  /**
   * loes: ['3', '-1']  oder  [{tex:'3', n:2}, …]   n = Vielfachheit
   * opt.art      'index' (Standard) | 'oder' | 'menge'
   * opt.trenner  'komma' (Standard) | 'wedge'   - nur bei 'index'
   * opt.v        Name der Variablen (Standard 'x')
   * opt.keine    eigener Text, wenn es keine Lösung gibt
   */
  function pgLoesungen(loes, opt){
    opt = opt || {};
    var v = opt.v || 'x';
    var art = opt.art || 'index';
    var liste = (loes || []).map(function(e){
      return (typeof e === 'string' || typeof e === 'number')
        ? { tex: String(e), n: 1 }
        : { tex: e.tex, n: Math.max(1, e.n || 1) };
    });
    if (!liste.length){
      if (art === 'menge') return '\\mathbb{L} = \\{\\,\\}';
      return '\\text{' + (opt.keine || T('keine Lösung', 'no solution')) + '}';
    }
    if (art === 'menge')
      return '\\mathbb{L} = \\left\\{' + liste.map(function(e){ return e.tex; }).join(';\\ ') + '\\right\\}';
    /* Viele Lösungen in einer Zeile werden auf dem Handy zu breit - ab vier
       Stück werden sie gestapelt. */
    var stapeln = function(teile, trenner){
      if (teile.length <= 3 || opt.block === false) return teile.join(trenner);
      var zeilen = [];
      for (var i = 0; i < teile.length; i += 3)
        zeilen.push(teile.slice(i, i + 3).join(trenner));
      return '\\begin{gathered}' + zeilen.join(trenner.replace(/\s+$/, '') + ' \\\\ ') + '\\end{gathered}';
    };
    if (art === 'oder')
      return stapeln(liste.map(function(e){ return v + ' = ' + e.tex; }), ' \\vee ');
    /* durchnummeriert: mehrfache Lösungen bekommen mehrere Nummern */
    var nr = 1, teile = [];
    liste.forEach(function(e){
      var idx;
      if (e.n > 1){
        var ids = [];
        for (var i = 0; i < e.n; i++) ids.push(nr + i);
        idx = ids.join(',\\,');
        nr += e.n;
      } else { idx = String(nr); nr++; }
      teile.push(v + '_{' + idx + '} = ' + e.tex);
    });
    if (liste.length === 1 && liste[0].n === 1) return v + ' = ' + liste[0].tex;
    /* Kein Komma zwischen den Lösungen: bei „1,5" wäre nicht zu erkennen, ob
       das eine Zahl ist oder zwei. Ein breiter Zwischenraum trennt eindeutig. */
    return stapeln(teile, opt.trenner === 'wedge' ? ' \\wedge ' : ' \\qquad ');
  }

  /* ── 7c. Welche Seite passt zu dieser Gleichung? ──────────────────────────
     Jede Seite übernimmt nur ihre eigene Art von Gleichung. Wird eine andere
     eingetippt, verweist sie auf die Seite, auf die sie gehört.             */
  var PGSEITEN = {
    linear:        ['waage.html', 'lineare Gleichung', 'linear equation'],
    potenz:        ['potenzgleichungen.html', 'reine Potenzgleichung', 'pure power equation'],
    quadratisch:   ['quadratische_gleichungen.html', 'quadratische Gleichung', 'quadratic equation'],
    ausklammern:   ['ausklammern.html', 'Gleichung ohne Absolutglied (x ausklammern)',
                    'equation without a constant term (factor out x)'],
    biquadratisch: ['biquadratische_gleichungen.html', 'biquadratische Gleichung', 'biquadratic equation'],
    raten:         ['nullstelle_raten.html', 'Gleichung höheren Grades (Nullstelle raten)',
                    'higher-degree equation (guess a root)'],
    nullprodukt:   ['nullprodukt.html', 'Gleichung in Produktform', 'equation in product form']
  };
  /**
   * Welche Art von Gleichung ist 0 = koeff? koeff wie bei pgPoly.
   * Die Reihenfolge der Prüfungen entspricht der, in der man im Unterricht
   * hinschaut: erst das Absolutglied, dann die Zahl der Summanden, dann der
   * Grad, zuletzt die Potenzen.
   */
  function pgArt(koeff){
    var k = (koeff || []).slice();
    while (k.length > 1 && Math.abs(k[0]) < EPS) k.shift();
    var grad = k.length - 1;
    if (grad < 1) return 'linear';
    var besetzt = [];
    for (var i = 0; i <= grad; i++) if (Math.abs(k[grad - i]) > EPS) besetzt.push(i);
    if (grad === 1) return 'linear';
    if (Math.abs(k[grad]) < EPS) return 'ausklammern';          /* kein Absolutglied */
    if (besetzt.length === 2) return 'potenz';                  /* a·xⁿ + d = 0 */
    if (grad === 2) return 'quadratisch';
    var nurGerade = besetzt.every(function(e){ return e % 2 === 0; });
    if (nurGerade && grad % 2 === 0) return 'biquadratisch';
    return 'raten';
  }
  /** Aus einem Objekt {Exponent: Koeffizient} das Koeffizientenfeld bauen. */
  function pgKoeffAus(diff){
    var grad = 0;
    Object.keys(diff || {}).forEach(function(e){
      if (Math.abs(diff[e]) > EPS) grad = Math.max(grad, Number(e));
    });
    var k = [];
    for (var e2 = grad; e2 >= 0; e2--) k.push(Math.round((diff[e2] || 0) * 1e6) / 1e6);
    return k;
  }
  /** Hinweis, falls die Gleichung auf eine ANDERE Seite gehört ('' sonst).
      eigene: Art(en), die diese Seite selbst übernimmt. */
  function pgNichtHier(koeff, eigene){
    var art = pgArt(koeff);
    var meine = (Object.prototype.toString.call(eigene) === '[object Array]') ? eigene : [eigene];
    if (!art || meine.indexOf(art) >= 0) return '';
    var t = pgFalscheSeite(art, pgPolyText(koeff) + '=0');
    return t ? ('<br>' + t) : '';
  }
  /** Fertiger Hinweis samt Verweis auf die richtige Seite. */
  function pgFalscheSeite(art, glText){
    var e = PGSEITEN[art];
    if (!e) return '';
    return T('Das ist ', 'This is ') + T('eine ' + e[1], 'a ' + e[2]) + '. '
      + '<a href="' + e[0] + (glText ? ('?gl=' + encodeURIComponent(glText)) : '') + '" target="_blank" rel="noopener">'
      + T('auf der passenden Seite üben', 'practise it on the right page') + ' →</a>';
  }

  /* ── 8. Nach außen ─────────────────────────────────────────────────────── */
  window.pgZahl        = pgZahl;
  window.pgZahlText    = pgZahlText;
  window.pgKlammer     = pgKlammer;
  window.pgWurzel      = pgWurzel;
  window.pgWurzelGlatt = pgWurzelGlatt;
  window.pgWurzelRoh   = pgWurzelRoh;
  window.pgKrumm       = pgKrumm;
  window.pgGerundet    = pgGerundet;
  window.pgGenau       = pgGenau;
  window.pgLoesTol     = pgLoesTol;
  window.pgTerm        = pgTerm;
  window.pgPoly        = pgPoly;
  window.pgPolyText    = pgPolyText;
  window.pgLese        = pgLese;
  window.pgLesePolyTeil = pgLesePolyTeil;
  window.pgLeseGleichung = pgLeseGleichung;
  window.pgGleich      = pgGleich;
  window.pgBruch       = bruchVon;
  window.pgGanz        = ganz;
  window.pgGgT         = ggT;
  window.pgSkizze      = pgSkizze;
  window.pgBereich     = pgBereich;

  /* ── Lösungen eintragen, ohne die Anzahl zu verraten ───────────────────
     Man fügt so viele Zeilen hinzu, wie man Lösungen gefunden hat. Eine
     mehrfache Nullstelle darf einfach oder mehrfach dastehen - nach dem
     Lösen wird erklärt, dass sie mehrfach vorkommt.                      */
  function pgAntwortListe(host, opt){
    if (!host) return;
    opt = opt || {};
    var loes = (opt.loesungen || []).slice().sort(function(a, b){ return a - b; });
    var v = opt.variable || 'x';
    var vielfach = opt.vielfach || {};
    var maxZeilen = opt.maxZeilen || 8;
    var fertig = false, keine = false;

    host.innerHTML = '';
    host.classList.add('pg-antwort');

    var frage = document.createElement('div');
    frage.className = 'pg-frage';
    frage.innerHTML = opt.frage || T('Gib alle Lösungen an.', 'State all solutions.');
    host.appendChild(frage);

    var liste = document.createElement('div');
    liste.className = 'pg-liste';
    host.appendChild(liste);

    var steuer = document.createElement('div');
    steuer.className = 'pg-steuer';
    host.appendChild(steuer);

    var fb = document.createElement('div');
    fb.className = 'pg-fb';
    host.appendChild(fb);

    function melde(art, text){
      fb.className = 'pg-fb ' + (art || '');
      fb.innerHTML = text || '';
      if (window.MathJax && MathJax.typesetPromise)
        MathJax.typesetPromise([fb]).catch(function(){});
    }
    function zeilen(){ return [].slice.call(liste.querySelectorAll('.pg-feld')); }
    function nummerieren(){
      zeilen().forEach(function(z, i){
        z.querySelector('.pg-feld-name').innerHTML = v + '<sub>' + (i + 1) + '</sub>&nbsp;=';
        var weg = z.querySelector('.pg-weg');
        if (weg) weg.style.visibility = (zeilen().length > 1) ? '' : 'hidden';
      });
      mehr.disabled = zeilen().length >= maxZeilen;
      keinKnopfZeigen();
    }
    function zeileDazu(wert){
      if (zeilen().length >= maxZeilen) return null;
      var wrap = document.createElement('span');
      wrap.className = 'pg-feld';
      var lab = document.createElement('span');
      lab.className = 'pg-feld-name';
      var inp = document.createElement('input');
      inp.type = 'text'; inp.inputMode = 'text'; inp.autocomplete = 'off';
      inp.setAttribute('aria-label', v);
      if (wert != null) inp.value = wert;
      inp.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter'){ ev.preventDefault(); pruefe(); }
        /* Tab im letzten Feld legt das naechste an - so kommt man durch die
           ganze Liste, ohne zwischendurch zur Maus zu greifen. */
        if (ev.key === 'Tab' && !ev.shiftKey && !fertig
            && String(inp.value).trim() !== ''){
          var alle = zeilen();
          if (alle.length && alle[alle.length - 1].contains(inp)
              && alle.length < maxZeilen){
            ev.preventDefault();
            var f = zeileDazu('');
            if (f) f.focus();
          }
        }
      });
      inp.addEventListener('input', keinKnopfZeigen);
      var weg = document.createElement('button');
      weg.type = 'button'; weg.className = 'pg-weg';
      weg.title = T('Diese Zeile entfernen', 'Remove this row');
      weg.textContent = '✕';
      weg.addEventListener('click', function(){
        if (fertig || zeilen().length <= 1) return;
        wrap.remove(); nummerieren();
      });
      wrap.appendChild(lab); wrap.appendChild(inp); wrap.appendChild(weg);
      liste.appendChild(wrap);
      nummerieren();
      return inp;
    }

    var mehr = document.createElement('button');
    mehr.type = 'button'; mehr.className = 'pg-mehr';
    mehr.textContent = T('+ weitere Lösung', '+ another solution');
    mehr.addEventListener('click', function(){
      if (fertig) return;
      if (keine) keineSetzen(false);
      var f = zeileDazu('');
      if (f) f.focus();
    });
    steuer.appendChild(mehr);

    var kein = document.createElement('button');
    kein.type = 'button'; kein.className = 'pg-keine';
    kein.textContent = T('keine Lösung', 'no solution');
    kein.addEventListener('click', function(){ if (!fertig) keineSetzen(!keine); });
    steuer.appendChild(kein);

    var pruefKnopf = document.createElement('button');
    pruefKnopf.type = 'button'; pruefKnopf.className = 'pruef-knopf';
    pruefKnopf.textContent = T('✓ Prüfen', '✓ Check');
    pruefKnopf.addEventListener('click', function(){ pruefe(); });
    steuer.appendChild(pruefKnopf);

    function keineSetzen(an){
      keine = an;
      kein.classList.toggle('on', an);
      liste.style.display = an ? 'none' : '';
      mehr.style.display = an ? 'none' : '';
      melde('', '');
    }
    /* „keine Loesung" steht nur da, solange noch nichts eingetragen ist -
       sonst sieht es aus, als liesse sich beides zugleich sagen. */
    function keinKnopfZeigen(){
      if (fertig) return;
      var wasDrin = zeilen().some(function(z){
        return String(z.querySelector('input').value).trim() !== '';
      });
      kein.style.display = (wasDrin && !keine) ? 'none' : '';
    }

    /* ── prüfen ── */
    function pruefe(){
      if (fertig) return;
      var roh = keine ? [] : zeilen().map(function(z){ return z.querySelector('input').value; });
      var gefuellt = roh.filter(function(s){ return String(s).trim() !== ''; });
      if (!keine && !gefuellt.length){
        melde('warn', T('Trage eine Lösung ein – oder wähle „keine Lösung“.',
                        'Enter a solution – or choose “no solution”.'));
        return;
      }
      var zahlen = gefuellt.map(pgLese);
      if (zahlen.some(function(z){ return z === null; })){
        melde('err', T('Das konnte ich nicht lesen. Erlaubt sind z.&nbsp;B. <code>3</code>, <code>-1,5</code>, <code>3/4</code> oder <code>sqrt(5)</code>.',
                       'I could not read that. Allowed are e.g. <code>3</code>, <code>-1.5</code>, <code>3/4</code> or <code>sqrt(5)</code>.'));
        return;
      }
      /* doppelt eingetragene Werte zählen als eine Lösung */
      var eigen = [];
      zahlen.forEach(function(z){
        if (!eigen.some(function(y){ return pgGleich(y, z, gleichTol(y, z)); })) eigen.push(z);
      });
      var doppelt = zahlen.length - eigen.length;

      /* Felder einfärben */
      var felder = zeilen().map(function(z){ return z.querySelector('input'); });
      var gefunden = [];
      felder.forEach(function(e){
        var z = pgLese(e.value);
        if (String(e.value).trim() === ''){ e.classList.remove('ok', 'err'); return; }
        var ist = loes.some(function(l){ return pgGleich(z, l, pgLoesTol(l)); });
        e.classList.toggle('ok', ist);
        e.classList.toggle('err', !ist);
        if (ist && !gefunden.some(function(y){ return pgGleich(y, z, gleichTol(y, z)); })) gefunden.push(z);
      });
      var falsch = eigen.filter(function(z){
        return !loes.some(function(l){ return pgGleich(z, l, pgLoesTol(l)); });
      });
      var fehlt = loes.filter(function(l){
        return !eigen.some(function(z){ return pgGleich(z, l, pgLoesTol(l)); });
      });

      /* Wer einen Wert mehrfach eintraegt, meint die Vielfachheit - dann
         muss die Anzahl auch stimmen. Einmal eintragen bleibt richtig: die
         Vielfachheit ist eine Zusatzinformation, kein Pflichtteil. */
      var vielfachVon = function(z){
        var n = 1;
        Object.keys(vielfach || {}).forEach(function(k){
          if (pgGleich(parseFloat(k), z, pgLoesTol(parseFloat(k)))) n = vielfach[k] || 1;
        });
        return n;
      };
      var zuOft = eigen.filter(function(z){
        var n = zahlen.filter(function(y){ return pgGleich(y, z, gleichTol(y, z)); }).length;
        return n > 1 && n !== vielfachVon(z);
      });

      if (!falsch.length && !fehlt.length && !zuOft.length){
        fertig = true;
        var zusatz = pgVielfachText(loes, vielfach, v);
        if (doppelt && !zusatz)
          zusatz = T('Mehrfach eingetragene Werte zählen als eine Lösung.',
                     'A value entered more than once counts as one solution.');
        melde('ok', T('✓ Richtig!', '✓ Correct!')
          + (zusatz ? '<div class="pg-fb-sub">' + zusatz + '</div>' : ''));
        felder.forEach(function(e){ e.disabled = true; });
        [mehr, kein, pruefKnopf].forEach(function(b){ b.disabled = true; });
        /* Nach „Richtig" gibt es nichts mehr zu bedienen - auch nicht die
           Knoepfe, die die Seite selbst in den Steuerbereich gelegt hat. */
        [].forEach.call(steuer.querySelectorAll('button'), function(b){ b.disabled = true; });
        [].forEach.call(liste.querySelectorAll('.pg-weg'), function(b){ b.style.display = 'none'; });
        if (opt.onFertig) opt.onFertig(true);
        return;
      }
      /* Rückmeldung, ohne die Anzahl zu verraten */
      var text;
      if (zuOft.length){
        var z0 = zuOft[0], n0 = zahlen.filter(function(y){ return pgGleich(y, z0, gleichTol(y, z0)); }).length;
        var soll0 = vielfachVon(z0);
        text = (soll0 > 1)
          ? T('\\(' + v + ' = ' + pgZahl(z0) + '\\) steht ' + n0 + '-mal da, ist aber eine '
              + (soll0 === 2 ? 'doppelte' : soll0 === 3 ? 'dreifache' : (soll0 + '-fache'))
              + ' Nullstelle.',
              '\\(' + v + ' = ' + pgZahl(z0) + '\\) appears ' + n0 + ' times, but it is a '
              + (soll0 === 2 ? 'double' : soll0 === 3 ? 'triple' : (soll0 + '-fold')) + ' root.')
          : T('\\(' + v + ' = ' + pgZahl(z0) + '\\) steht mehrfach da, kommt hier aber nur einmal vor.',
              '\\(' + v + ' = ' + pgZahl(z0) + '\\) appears more than once, but here it occurs only once.');
      }
      else if (keine && loes.length)
        text = T('Es gibt mindestens eine Lösung – suche sie.',
                 'There is at least one solution – look for it.');
      else if (falsch.length)
        text = (falsch.length === 1)
          ? T('Ein Wert ist keine Lösung – er ist rot umrandet.',
              'One value is not a solution – it has a red border.')
          : T('Einige Werte sind keine Lösungen – sie sind rot umrandet.',
              'Some values are not solutions – they have a red border.');
      else if (!loes.length)
        text = T('Diese Gleichung hat gar keine Lösung.',
                 'This equation has no solution at all.');
      else
        text = T('Richtig so weit – es fehlt aber noch mindestens eine Lösung.',
                 'Right so far – but at least one solution is still missing.');
      var eigenHin = opt.hinweis ? opt.hinweis(eigen.length, eigen) : null;
      melde('err', text + (eigenHin ? '<div class="pg-fb-sub">' + eigenHin + '</div>' : ''));
      if (opt.onFertig) opt.onFertig(false);
    }

    zeileDazu('');
    if (opt.start === 'keine') keineSetzen(true);
    return { pruefe: pruefe, dazu: zeileDazu };
  }

  /** Satz über mehrfache Nullstellen – oder '' */
  function pgVielfachText(loes, vielfach, v){
    var teile = [];
    (loes || []).forEach(function(l){
      var n = null;
      Object.keys(vielfach || {}).forEach(function(k){
        if (Math.abs(parseFloat(k) - l) < 1e-9) n = vielfach[k];
      });
      if (n && n >= 2){
        var wort = (n === 2) ? T('doppelte', 'double')
                 : (n === 3) ? T('dreifache', 'triple')
                             : (n + T('-fache', '-fold'));
        teile.push(T('\\(' + v + ' = ' + pgZahl(l) + '\\) ist eine ' + wort + ' Nullstelle',
                     '\\(' + v + ' = ' + pgZahl(l) + '\\) is a ' + wort + ' root'));
      }
    });
    if (!teile.length) return '';
    return T('Hinweis: ', 'Note: ') + teile.join(T(', ', ', ')) + '.';
  }

  /* ── 9. Gleichungsseiten: Sperre und fester Platz ─────────────────────────
     Nur auf Seiten mit <body data-gleichungsseite>. */
  /** Sperrt den Eingabebereich - ist er schon fertig, bleibt es beim Sperren
      ohne Hinweis. */
  function pgEingabeSperren(host){
    if (!host || host.classList.contains('pg-gesperrt')) return;
    var offen = host.querySelectorAll('input:not(:disabled), button:not(:disabled), select:not(:disabled), textarea:not(:disabled)');
    host.classList.add('pg-gesperrt');
    [].forEach.call(offen, function(e){ e.disabled = true; });
    if (!offen.length) return;
    var n = document.createElement('div');
    n.className = 'pg-sperr-hinweis';
    n.innerHTML = T('Die Lösung ist eingeblendet – für diese Aufgabe ist die Eingabe gesperrt.',
                    'The answer is shown – input is locked for this task.');
    host.appendChild(n);
  }
  /** Platz für die Gleichung: was einmal gebraucht wurde, bleibt reserviert. */
  function pgGleichungsPlatz(t){
    if (!t || t._pgPlatz) return;
    t._pgPlatz = true;
    var hoechst = 0;
    var messen = function(){
      var h = 0;
      [].forEach.call(t.children, function(k){
        /* die umgestellte Zeile auf der Gleichungsart-Seite zählt nicht mit */
        if (k.classList.contains('null-form')) return;
        var cs = window.getComputedStyle(k);
        h += k.offsetHeight + (parseFloat(cs.marginTop) || 0) + (parseFloat(cs.marginBottom) || 0);
      });
      if (h > hoechst + 0.5){ hoechst = h; t.style.minHeight = Math.ceil(h) + 'px'; }
    };
    if (typeof ResizeObserver === 'function') new ResizeObserver(messen).observe(t);
    if (typeof MutationObserver === 'function')
      new MutationObserver(function(){ setTimeout(messen, 0); }).observe(t, { childList: true, subtree: true });
  }
  function pgGleichungsseite(){
    if (!document.body || !document.body.hasAttribute('data-gleichungsseite')) return;
    pgGleichungsPlatz(document.getElementById('task'));
    /* toggle steigt nicht auf - in der Einfangphase kommt es trotzdem an */
    document.addEventListener('toggle', function(ev){
      var d = ev.target;
      if (!d || d.id !== 'dLoesung' || !d.open) return;
      pgEingabeSperren(document.getElementById('antwortBereich'));
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pgGleichungsseite);
  else pgGleichungsseite();
  window.pgEingabeSperren = pgEingabeSperren;

  window.pgAntwort     = pgAntwort;
  window.pgAntwortListe = pgAntwortListe;
  window.pgQuizFolge = reihenfolge;
  window.pgQuiz        = pgQuiz;
  window.pgSchrittePQ  = pgSchrittePQ;
  window.pgSchritteEinsetzen = pgSchritteEinsetzen;
  window.pgSchritteMNF = pgSchritteMNF;
  window.pgSchrittePotenz = pgSchrittePotenz;
  window.pgZahlSchritt = zahlSchritt;
  window.pgStil        = pgStil;
  window.pgLoesungen   = pgLoesungen;
  window.pgSchrittNullForm = pgSchrittNullForm;
  window.pgGleichungFolge  = pgGleichungFolge;
  window.pgArt          = pgArt;
  window.pgFalscheSeite = pgFalscheSeite;
  window.pgKoeffAus     = pgKoeffAus;
  window.pgNichtHier    = pgNichtHier;
})();
