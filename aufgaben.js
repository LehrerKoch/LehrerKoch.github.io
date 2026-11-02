/* ═══════════════════════════════════════════════════════════════════════════
   aufgaben.js – kleine Zugaben für die Aufgabengeneratoren
   ───────────────────────────────────────────────────────────────────────────
   Gehört zu aufgaben.css und wird genauso eingebunden:

       <script src="aufgaben.js" defer></script>

   Die Datei ist nicht nötig, damit eine Seite funktioniert. Alle Schalter sind
   gewöhnliche Radio- bzw. Kontrollkästchen; fehlt diese Datei, bleibt nur der
   gleitende Hintergrund des Schalters aus - die gewählte Stufe wird dann vom
   Stylesheet selbst eingefärbt (Regel „.seg-switch:not(.has-glider)“).

   Angeboten werden:
     abGliderAlle()                     alle Schalter neu ausmessen
     abGlider(schalter)                 einen Schalter neu ausmessen
     abKopiere(text, knopf, meldung)    Text in die Zwischenablage, mit Rückmeldung
     abEinstellungenOeffnen(details)    Einstellungen aufklappen und hervorheben
     abKacheln(host, arten, danach)     Kacheln mit Aufklappmenü (siehe unten)
     abKachelnMalen(host)               Kacheln neu beschriften und einfärben
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /** Setzt den gleitenden Hintergrund eines Schalters auf die gewählte Stufe. */
  function abGlider(host){
    if (!host || !host.classList || !host.classList.contains('seg-switch')) return;
    var g = host.querySelector(':scope > .seg-glider');
    if (!g){
      g = document.createElement('span');
      g.className = 'seg-glider';
      host.appendChild(g);
    }
    var r = host.querySelector('input:checked');
    var l = r ? host.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(r.id) : r.id) + '"]') : null;
    if (!l && r) l = r.nextElementSibling;              /* ohne id: das Etikett dahinter */
    if (!l){ host.classList.remove('has-glider'); return; }
    /* über die Bounding-Rechtecke, damit auch ein waagerecht scrollender
       Schalter richtig getroffen wird */
    var a = l.getBoundingClientRect(), b = host.getBoundingClientRect();
    var breite = a.width || l.offsetWidth;
    if (!breite){ host.classList.remove('has-glider'); return; }  /* noch unsichtbar */
    g.style.left  = (a.left - b.left + host.scrollLeft) + 'px';
    g.style.width = breite + 'px';
    host.classList.add('has-glider');
    host.classList.remove('no-glider');
  }

  /** Alle Schalter der Seite neu ausmessen. */
  function abGliderAlle(){
    var liste = document.querySelectorAll('.seg-switch');
    for (var i = 0; i < liste.length; i++) abGlider(liste[i]);
  }

  /* Ein Klick auf das Etikett muss den Schalter auch dann umlegen, wenn der
     Zeiger auf dem Gleiter landet - sonst passiert bei einem Treffer genau auf
     der Kante nichts. */
  /* Welcher Auswahlpunkt gehoert zu diesem Etikett? Je nach Schalterstil
     steckt er im Etikett (.seg, .mini-seg) oder davor (.seg-switch).      */
  function punktZu(l){
    var r = l.querySelector('input');
    if (!r && l.getAttribute('for')) r = document.getElementById(l.getAttribute('for'));
    if (!r) r = l.previousElementSibling;
    return (r && r.tagName === 'INPUT') ? r : null;
  }

  function klick(ev){
    /* Steckt der Auswahlpunkt im Etikett, schickt der Browser nach dem Klick
       auf das Etikett noch einen zweiten Klick an den Punkt selbst. Den muss
       man übergehen - sonst legt die Regel weiter unten den gerade gewählten
       Punkt sofort wieder um. */
    if (ev.target && ev.target.tagName === 'INPUT') return;
    var l = ev.target.closest ? ev.target.closest('label') : null;
    if (!l) return;
    var host = l.closest('.seg-switch, .seg, .mini-seg');
    if (!host) return;
    var r = punktZu(l);
    if (!r || r.type !== 'radio') return;
    if (!r.checked){
      if (host.classList.contains('seg-switch')){
        r.checked = true;
        r.dispatchEvent(new Event('change', { bubbles: true }));
      }
      /* bei .seg und .mini-seg steckt der Punkt im Etikett - das erledigt
         der Browser von selbst. */
    } else {
      /* Schon gewaehlt: hat der Schalter genau zwei Moeglichkeiten, legt ihn
         ein Druck irgendwo darauf um. So wechselt er bei jedem Klick, ohne
         dass man genau das andere Feld treffen muss. */
      var alle = host.querySelectorAll('input[type="radio"]');
      if (alle.length === 2){
        var andere = (alle[0] === r) ? alle[1] : alle[0];
        /* Ohne das Folgende wuerde der Browser danach noch die angeklickte
           Seite auswaehlen und die Umlegung sofort wieder aufheben. */
        ev.preventDefault();
        andere.checked = true;
        andere.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    if (host.classList.contains('seg-switch')) setTimeout(function(){ abGlider(host); }, 0);
  }

  function wechsel(ev){
    var host = ev.target.closest ? ev.target.closest('.seg-switch') : null;
    if (!host) return;
    abGlider(host);
    setTimeout(function(){ abGlider(host); }, 0);   /* nach der Arbeit der Seite */
  }

  /* Mit Finger oder Stift bedient behält das getroffene Element sonst den
     Fokus und bleibt hervorgehoben - das sieht nach dem Loslassen seltsam aus.
     Mit der Tastatur bediente Klicks (ev.detail === 0) bleiben unberührt,
     dort braucht man den Fokus. Eingabefelder behalten ihn ebenfalls. */
  function fokusLoesen(ev){
    if (!ev.detail) return;
    var n = document.activeElement;
    if (!n || n === document.body || !n.blur) return;
    if (/^(TEXTAREA|SELECT)$/.test(n.tagName)) return;
    if (n.tagName === 'INPUT' && !/^(radio|checkbox|button|submit)$/.test(n.type)) return;
    if (!n.closest('button, label, summary, .tile, .pill, .seg-switch, .seg, .mini-seg, .pop')) return;
    n.blur();
  }
  document.addEventListener('click', fokusLoesen);

  /** Text in die Zwischenablage legen und am Knopf kurz zurückmelden. */
  function abKopiere(text, knopf, meldung){
    var fertig = function(){
      if (!knopf) return;
      var alt = knopf.innerHTML;
      knopf.innerHTML = meldung || '✓';
      knopf.classList.add('copied');
      setTimeout(function(){ knopf.innerHTML = alt; knopf.classList.remove('copied'); }, 1600);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(fertig, function(){ ersatz(text, fertig); });
        return;
      }
    } catch (e) {}
    ersatz(text, fertig);
  }
  function ersatz(text, fertig){
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      fertig();
    } catch (e) {}
  }

  /** Einstellungen aufklappen, hinscrollen und die Blöcke kurz hervorheben. */
  function abEinstellungenOeffnen(ziel){
    var d = (typeof ziel === 'string') ? document.querySelector(ziel) : ziel;
    if (!d) d = document.querySelector('details.einst');
    if (!d) return;
    d.open = true;
    var bl = [].slice.call(d.querySelectorAll('.form-block')).slice(0, 6);
    bl.forEach(function(b){ b.classList.remove('hint'); });
    setTimeout(function(){
      if (d.scrollIntoView) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
      bl.forEach(function(b){ b.classList.add('hint'); });
      setTimeout(function(){ bl.forEach(function(b){ b.classList.remove('hint'); }); }, 2400);
    }, 60);
  }

  /* ═══ Kacheln mit Aufklappmenü ═════════════════════════════════════════════
     Vorbild: die Aufgabentypen in ebenen_grundlagen.html. Eine Kachel schaltet
     eine Aufgabenart ein oder aus; langes Drücken (oder der Pfeil ▼) öffnet ein
     kleines Menü mit den Unterpunkten und einem Knopf „alle / keine“.

     Die Kacheln bedienen die Kontrollkästchen im Einstellungsbereich - dort
     steht jede Einstellung weiterhin einzeln und ist auch ohne diese Datei
     erreichbar. Beschriftet werden sie aus eben diesen Kästchen, damit beim
     Sprachwechsel nichts doppelt gepflegt werden muss.

         abKacheln(host, [
           { haupt:'useSin', subs:['sinGeg','sinHyp','sinWin'],
             titel:'Gesuchtes Element:', vorsatz:'Gesucht: ' },
           { haupt:'usePyth', subs:['pythKath','pythHyp'], hinweis:'…' }
         ], () => neueAufgabe());

     titel   steht als Überschrift über den Unterpunkten im Menü,
     vorsatz steht vor der Aufzählung unter dem Kachelnamen (jeweils mit
     titelEn / vorsatzEn für Englisch). Die Kurzform eines Unterpunktes
     steht am Kästchen selbst: data-kurz / data-kurz-en.

     Eine Art ohne subs wird eine einfache Kachel ohne Menü.
     Fehlt haupt, ist die Kachel eine reine Gruppe: ein Druck schaltet alle
     Unterpunkte zusammen ein oder aus, beschriftet wird sie aus name/nameEn.
     Ab sieben Unterpunkten zählt die Kachel („4 von 10“) statt aufzuzählen.
     ══════════════════════════════════════════════════════════════════════════ */
  var LANGDRUCK = 450;

  function de(){ try { return localStorage.getItem('matheToolsLang') !== 'en'; } catch (e) { return true; } }
  function TX(d, e){ return de() ? d : e; }
  function kasten(id){ return document.getElementById(id); }
  /** Beschriftung eines Kästchens: der Text seines Etiketts ohne die Erklärung. */
  function beschriftung(id){
    var c = kasten(id);
    if (!c) return id;
    var l = c.closest('label');
    if (!l) return id;
    var k = l.cloneNode(true);
    /* Die Sterne gehören zur Beschriftung im Einstellungsbereich; wo sie an
       der Kachel gebraucht werden, setzt sie sterne() eigens. */
    k.querySelectorAll('.d, .sterne, input').forEach(function(n){ n.remove(); });
    /* innerHTML, damit Hochzahlen (<sup>) auch Hochzahlen bleiben */
    return (k.innerHTML || '').replace(/\s+/g, ' ').trim();
  }
  /** Kurzform eines Kästchens für die Zeile unter dem Kachelnamen.
      Sie steht am Kästchen selbst: data-kurz / data-kurz-en. Fehlt sie,
      nimmt die Kachel die gewöhnliche Beschriftung. */
  function beschriftungKurz(id){
    var c = kasten(id);
    if (c && c.dataset && c.dataset.kurz){
      return de() ? c.dataset.kurz : (c.dataset.kurzEn || c.dataset.kurz);
    }
    return beschriftung(id);
  }
  /** Die Erklärung unter einem Kästchen (span.d), falls vorhanden. */
  function beschreibung(id){
    var c = kasten(id);
    if (!c) return '';
    var l = c.closest('label');
    var d = l && l.querySelector('.d');
    /* Steht das Kaestchen in einer kombinierten Regler-Zeile, gehoert die
       Erklaerung zur Zeile und nicht zum Etikett. */
    if (!d){
      var r = c.closest('.opt-regler');
      d = r && r.querySelector('.d');
    }
    return d ? (d.innerHTML || '').replace(/\s+/g, ' ').trim() : '';
  }
  function an(id){ var c = kasten(id); return !!(c && c.checked); }
  /** Schwierigkeit eines (Unter-)Aufgabentyps als kleine Sterne.
      Sie steht am Kästchen selbst: data-stufe="1".."4". Ohne Angabe: nichts. */
  /* Aufgabentypen mit Unterpunkten: die Schwierigkeit steht an den
     Unterpunkten, der Oberpunkt bleibt ohne Sterne. */
  var ELTERN = {};
  function elternMerken(arten){
    (arten || []).forEach(function(a){
      if (!a || !a.haupt || !a.subs || !a.subs.length) return;
      /* nur wenn die Unterpunkte selbst eine Schwierigkeit tragen - sonst
         gehört der Stern weiterhin an den Oberpunkt */
      var mitStufe = a.subs.some(function(s){
        var c = kasten(s);
        return !!(c && c.dataset && c.dataset.stufe);
      });
      if (mitStufe) ELTERN[a.haupt] = 1;
    });
    /* Sterne, die vorher schon an einem Oberpunkt standen, wieder entfernen. */
    Object.keys(ELTERN).forEach(function(id){
      var c = kasten(id), l = (c && c.closest) ? c.closest('label') : null;
      var s = l && l.querySelector('.sterne');
      if (s && s.parentNode) s.parentNode.removeChild(s);
    });
  }
  function sterne(id){
    if (ELTERN[id]) return '';
    var c = kasten(id);
    var n = (c && c.dataset) ? parseInt(c.dataset.stufe || '0', 10) : 0;
    if (!(n > 0)) return '';
    n = Math.max(1, Math.min(4, n));
    var t = TX('Schwierigkeit ', 'difficulty ') + n + TX(' von 4', ' of 4');
    return '<span class="sterne" title="' + t + '">' + new Array(n + 1).join('\u2605') + '</span>';
  }
  /* Setzt ein Kaestchen, OHNE ein change-Ereignis auszuloesen: die Seite
     erfaehrt vom Umschalten einmal ueber danach() - sonst liefe alles doppelt. */
  function setze(id, wert){
    var c = kasten(id);
    if (c) c.checked = !!wert;
  }

  var POPBESITZER = null, POPGRADZU = false;

  var ZUSATZ = null;        /* { el, eltern, danach } - geliehenes Bedienfeld */
  function zusatzZurueck(){
    if (!ZUSATZ) return;
    if (ZUSATZ.danach) ZUSATZ.eltern.insertBefore(ZUSATZ.el, ZUSATZ.danach);
    else ZUSATZ.eltern.appendChild(ZUSATZ.el);
    ZUSATZ = null;
  }
  function popZu(){
    zusatzZurueck();
    /* Nur das von hier geoeffnete Menue - andere Seiten nutzen .pop auch
       fuer eigene Einblendungen, die stehen bleiben muessen. */
    var p = document.querySelector('body > .pop');
    if (p) p.remove();
    POPBESITZER = null;
  }

  /* Zwei Stile derselben Leiste:
       'tile' - groesse Kacheln mit Beschreibung (Aufgabenstile)
       'pill' - kleine Ovale, nur der Name (Faelle, Restterme, …)
     Beides schaltet Kaestchen in den Einstellungen; Unterpunkte oeffnen sich
     per langem Druck, Rechtsklick oder Pfeil. */
  function abKacheln(host, arten, danach){ leisteBauen(host, arten, danach, 'tile'); }
  function abPillen(host, arten, danach){ leisteBauen(host, arten, danach, 'pill'); }
  function leisteBauen(host, arten, danach, stil){
    if (!host) return;
    host.innerHTML = '';
    elternMerken(arten);
    host._arten = arten;
    host._stil = (stil === 'pill') ? 'pill' : 'tile';
    host._danach = danach || function(){};
    arten.forEach(function(art, nr){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = host._stil;
      b.dataset.t = art.haupt || ('gruppe' + nr);
      b._art = art;
      var pfeil = (((art.subs && art.subs.length) || art.zusatzId) ? '<span class="arr">▼</span>' : '');
      b.innerHTML = (host._stil === 'pill')
        ? '<span class="pname"></span><span class="pzahl"></span>' + pfeil
        : ('<span class="tk">\u2713</span>'
          + '<span class="ttext">'
          +   '<span class="tname"></span><span class="tzaehler"></span>'
          +   '<span class="tsub"></span>'
          + '</span>' + pfeil);
      host.appendChild(b);

      var timer = null, langGedrueckt = false;
      /* Kacheln ohne Unterpunkte koennen stattdessen "nur diese" anbieten:
         langes Druecken schaltet alle anderen der Leiste aus. */
      var nurDieser = function(){
        langGedrueckt = true;
        (host._arten || []).forEach(function(a){
          if (a.haupt) setze(a.haupt, a.haupt === art.haupt);
        });
        abKachelnMalen(host);
        host._danach();
      };
      var menuAuf = function(){
        if (art.nurDieser && !(art.subs && art.subs.length)){ nurDieser(); return; }
        langGedrueckt = true; kachelMenu(b, art, host);
      };
      var langMoeglich = function(){
        return (art.subs && art.subs.length) || art.zusatzId || art.nurDieser;
      };
      b.addEventListener('pointerdown', function(ev){
        if (ev.button != null && ev.button !== 0) return;
        langGedrueckt = false;
        if (POPGRADZU) return;
        if (!langMoeglich()) return;
        if (ev.target.classList.contains('arr')) return;
        timer = setTimeout(menuAuf, LANGDRUCK);
      });
      ['pointerup','pointerleave','pointercancel'].forEach(function(e){
        b.addEventListener(e, function(){ clearTimeout(timer); });
      });
      b.addEventListener('contextmenu', function(ev){
        if (!langMoeglich()) return;
        ev.preventDefault(); clearTimeout(timer); menuAuf();
      });
      b.addEventListener('click', function(ev){
        clearTimeout(timer);
        if (langGedrueckt){ langGedrueckt = false; return; }
        if (POPGRADZU){ POPGRADZU = false; return; }
        if (ev.target.classList.contains('arr')){ kachelMenu(b, art, host); return; }
        /* Eine Gruppe, die sich nur im Menue fuellen laesst (oder noch leer ist),
           oeffnet schon beim kurzen Druck ihr Menue. */
        if (art.menue || (art.zusatzId && !(art.subs || []).length)){
          kachelMenu(b, art, host); return;
        }
        if (art.haupt){
          setze(art.haupt, !an(art.haupt));
        } else {
          /* Eine Gruppe ohne eigenes Hauptkaestchen: der Druck schaltet alle
             Unterpunkte zusammen ein oder aus. */
          var subs = art.subs || [];
          var allesAus = !subs.some(an);
          subs.forEach(function(id){ setze(id, allesAus); });
        }
        abKachelnMalen(host);
        host._danach();
      });
    });
    abKachelnMalen(host);
  }

  /** Markiert, aus welcher Kachel die gerade gestellte Aufgabe stammt.
      Gibt es Unterpunkte, wird die Kachel gestrichelt umrandet und der
      Unterpunkt im Menü durchgezogen. Ohne Angabe wird die Markierung
      aufgehoben. */
  /* nurSub: die Oberkachel bleibt ohne Rahmen - auf Seiten, wo schon die
     Aufgabenart (z. B. Sinus) die Lösung verraten würde. Der Unterpunkt im
     Menü wird trotzdem markiert. */
  function abKachelAktuell(host, id, nurSub){
    if (!host) return;
    if (nurSub !== undefined) host._nurSub = !!nurSub;
    /* Eine Aufgabe kann aus mehreren Arten bestehen - dann kommt eine Liste. */
    var liste = (id == null || id === '') ? []
              : (Object.prototype.toString.call(id) === '[object Array]' ? id.slice() : [id]);
    host._aktuell = liste.length ? liste : null;
    /* Die Kacheln entstehen erst, wenn das Dokument geladen ist. Kommt die
       Aufgabe vorher, merkt sich die Leiste die Markierung und zeichnet sie
       beim Aufbau mit. */
    if (!host._arten) return;
    host._arten.forEach(function(art, nr){
      var b = host.querySelector('.' + (host._stil === 'pill' ? 'pill' : 'tile')
        + '[data-t="' + (art.haupt || ('gruppe' + nr)) + '"]');
      if (!b) return;
      var subs = art.subs || [];
      var selbst = !!art.haupt && liste.indexOf(art.haupt) >= 0;
      var drin   = subs.some(function(s){ return liste.indexOf(s) >= 0; });
      /* Wer die Art inzwischen abgewählt hat, soll sie nicht mehr grün
         hervorgehoben sehen - sie kommt ja nicht wieder dran. */
      var kommtNoch = (!art.haupt || an(art.haupt)) && (!subs.length || subs.some(an));
      b.classList.toggle('aktuell', !host._nurSub && selbst && !subs.length && kommtNoch);
      b.classList.toggle('aktuell-gruppe', !host._nurSub && kommtNoch
        && (drin || (selbst && subs.length > 0)));
    });
    /* Nur das von hier geoeffnete Menue - andere Seiten nutzen .pop auch
       fuer eigene Einblendungen, die stehen bleiben muessen. */
    var p = document.querySelector('body > .pop');
    if (p) p.querySelectorAll('label').forEach(function(l){
      var cb = l.querySelector('input[data-s]');
      l.classList.toggle('aktuell', !!(cb && liste.indexOf(cb.dataset.s) >= 0));
    });
  }

  /** Kacheln neu beschriften und einfärben (auch nach einem Sprachwechsel). */
  function abKachelnMalen(host){
    if (!host || !host._arten) return;
    var pill = host._stil === 'pill';
    host._arten.forEach(function(art, nr){
      var b = host.querySelector('.' + (pill ? 'pill' : 'tile') + '[data-t="' + (art.haupt || ('gruppe' + nr)) + '"]');
      if (!b) return;
      var subs = art.subs || [];
      var aktiv = subs.filter(an);
      var hauptAn = art.haupt ? an(art.haupt) : aktiv.length > 0;
      var ein = hauptAn && (subs.length === 0 || aktiv.length > 0);
      b.classList.toggle('on', ein);
      b.classList.toggle('empty', hauptAn && subs.length > 0 && aktiv.length === 0);
      /* Gestrichelt ist nur, was unvollständig ist: sind alle Unterformen
         eingeschaltet oder ist der Block ganz aus, steckt nichts Halbes
         dahinter. */
      b.classList.toggle('hatunter', ein && subs.length > 0 && aktiv.length < subs.length);
      if (pill){
        /* Sterne stehen über dem Namen (siehe .pname in aufgaben.css) - sonst
           schiebt sich die Beschriftung bei jeder Stufe anders weit nach rechts. */
        b.querySelector('.pname').innerHTML = (art.haupt ? (sterne(art.haupt) + beschriftung(art.haupt))
          : TX(art.name || '', art.nameEn || art.name || ''));
        var pz = b.querySelector('.pzahl');
        /* Ist das Oval aus, zählt die innere Auswahl nicht - dann steht da 0/5
           und nicht 3/5, auch wenn drei Haken gesetzt geblieben sind. */
        if (pz) pz.textContent = subs.length ? ('(' + (ein ? aktiv.length : 0) + '/' + subs.length + ')') : '';
        return;
      }
      b.querySelector('.tname').innerHTML = (art.haupt ? beschriftung(art.haupt)
        : TX(art.name || '', art.nameEn || art.name || ''))
        + (art.haupt ? sterne(art.haupt) : '');
      var u = b.querySelector('.tsub');
      if (!subs.length){
        u.innerHTML = art.hinweis ? TX(art.hinweis, art.hinweisEn || art.hinweis) : beschreibung(art.haupt);
        return;
      }
      if (aktiv.length === 0){ u.innerHTML = TX('nichts ausgewählt', 'nothing selected'); return; }
      /* Es stehen immer die Kurzformen der eingeschalteten Unterpunkte da -
         bei sehr vielen bricht die Liste nach fünf ab. */
      var kurz = aktiv.map(beschriftungKurz);
      if (kurz.length > 6) kurz = kurz.slice(0, 5).concat(['…']);
      u.innerHTML = (art.vorsatz ? TX(art.vorsatz, art.vorsatzEn || art.vorsatz) : '')
        + kurz.join(' · ');
    });
    if (!pill) zaehlerMalen(host);
    if (host._aktuell) abKachelAktuell(host, host._aktuell);
  }

  /** Richtig-Zähler je Kachel: { useType1:{ok:2,n:3}, … }.
      Eine Kachel ohne Eintrag (oder ohne Versuch) zeigt nichts - „0/0" sagt
      nichts und lenkt nur ab. */
  function zaehlerMalen(host){
    if (!host || !host._arten) return;
    var z = host._zaehler || {};
    host._arten.forEach(function(art, nr){
      var b = host.querySelector('.tile[data-t="' + (art.haupt || ('gruppe' + nr)) + '"]');
      if (!b) return;
      var e = b.querySelector('.tzaehler');
      if (!e) return;
      var w = art.haupt ? z[art.haupt] : null;
      e.textContent = (w && w.n > 0) ? ('(' + w.ok + '/' + w.n + ')') : '';
    });
  }
  function abKachelZaehler(host, werte){
    if (!host) return;
    host._zaehler = werte || {};
    zaehlerMalen(host);
  }

  function kachelMenu(anker, art, host){
    popZu();
    POPBESITZER = anker;
    var subs = art.subs || [];
    var allesAn = subs.every(an);
    var pop = document.createElement('div');
    pop.className = 'pop';
    var h = '<h4><span>' + (art.haupt ? beschriftung(art.haupt)
      : TX(art.name || '', art.nameEn || art.name || '')) + '</span>'
      + '<button class="allbtn btn-secondary" type="button" data-all="1">'
      + (allesAn ? TX('keine', 'none') : TX('alle', 'all')) + '</button></h4>';
    if (art.kurz) pop.classList.add('kurz');
    /* spalten:2 - die Unterpunkte stehen nebeneinander. Dazu passen Gruppen:
       je ein kleiner Knopf ueber einer Spalte, der genau sie auswaehlt. */
    if (art.spalten > 1) pop.classList.add('sp' + art.spalten);
    if (art.titel) h += '<p class="poptitel">' + TX(art.titel, art.titelEn || art.titel) + '</p>';
    if (art.gruppen && art.gruppen.length){
      h += '<div class="popgruppen">';
      art.gruppen.forEach(function(g, i){
        h += '<button class="btn-secondary popgruppe" type="button" data-g="' + i + '">'
          + TX(g.name || '', g.nameEn || g.name || '') + '</button>';
      });
      h += '</div>';
    }
    h += '<div class="popliste">';
    subs.forEach(function(id){
      var d = beschreibung(id);
      /* kurz:true - im Menue steht die Kurzform (z. B. 3⁴ statt „34") */
      var text = art.kurz ? beschriftungKurz(id) : beschriftung(id);
      h += '<label><input type="checkbox" data-s="' + id + '"' + (an(id) ? ' checked' : '') + '>'
        + '<span>' + text + sterne(id) + (d ? '<span class="d">' + d + '</span>' : '') + '</span></label>';
    });
    h += '</div>';
    h += '<p class="pophint">' + (art.hinweis ? TX(art.hinweis, art.hinweisEn || art.hinweis)
      : TX('Diese Auswahl steht auch in den Einstellungen.',
           'This selection is also available in the settings.')) + '</p>';
    pop.innerHTML = h;
    /* Ein Bedienfeld aus dem Einstellungsbereich (z. B. „eigene Potenz anlegen")
       wird für die Dauer des Menüs hierher geliehen - so gibt es es nur einmal. */
    if (art.zusatzId){
      var z = document.getElementById(art.zusatzId);
      if (z){
        ZUSATZ = { el: z, eltern: z.parentNode, danach: z.nextSibling };
        var kasten = document.createElement('div');
        kasten.className = 'popzusatz';
        kasten.appendChild(z);
        pop.insertBefore(kasten, pop.querySelector('.pophint'));
      }
    }
    document.body.appendChild(pop);
    if (host && host._aktuell) abKachelAktuell(host, host._aktuell);
    var r = anker.getBoundingClientRect();
    pop.style.top = (window.scrollY + r.bottom + 5) + 'px';
    pop.style.left = Math.max(6, Math.min(window.scrollX + r.left,
      window.scrollX + document.documentElement.clientWidth - pop.offsetWidth - 8)) + 'px';

    /* Ein Gruppenknopf schaltet nur seine eigene Spalte um: sind noch nicht
       alle ihre Unterpunkte an, gehen alle an; waren sie schon alle an, gehen
       sie aus. Die andere Spalte bleibt unberuehrt. */
    pop.addEventListener('click', function(ev){
      var g = ev.target.closest('[data-g]');
      if (!g) return;
      var ids = ((art.gruppen || [])[parseInt(g.dataset.g, 10)] || {}).ids || [];
      if (!ids.length) return;
      var v = !ids.every(function(id){ return an(id); });
      ids.forEach(function(id){ setze(id, v); });
      if (v && art.haupt) setze(art.haupt, true);
      pop.querySelectorAll('input[data-s]').forEach(function(i){
        if (ids.indexOf(i.dataset.s) >= 0) i.checked = v;
      });
      var ab = pop.querySelector('[data-all]');
      if (ab) ab.textContent = subs.every(an) ? TX('keine', 'none') : TX('alle', 'all');
      abKachelnMalen(host);
      host._danach();
    });
    pop.addEventListener('click', function(ev){
      var alle = ev.target.closest('[data-all]');
      if (!alle) return;
      var v = !subs.every(an);
      subs.forEach(function(id){ setze(id, v); });
      if (v && art.haupt) setze(art.haupt, true);
      pop.querySelectorAll('input[data-s]').forEach(function(i){ i.checked = v; });
      alle.textContent = v ? TX('keine', 'none') : TX('alle', 'all');
      abKachelnMalen(host);
      host._danach();
    });
    pop.addEventListener('change', function(ev){
      var cb = ev.target.closest('input[data-s]');
      if (!cb) return;
      setze(cb.dataset.s, cb.checked);
      if (cb.checked && art.haupt) setze(art.haupt, true);
      abKachelnMalen(host);
      host._danach();
    });
  }

  /* Ein Druck neben das Menü schließt es; der Druck selbst wirkt normal weiter. */
  document.addEventListener('pointerdown', function(ev){
    /* Nur das von hier geoeffnete Menue - andere Seiten nutzen .pop auch
       fuer eigene Einblendungen, die stehen bleiben muessen. */
    var p = document.querySelector('body > .pop');
    if (!p || p.contains(ev.target)) return;
    var eigene = POPBESITZER && ev.target.closest && ev.target.closest('.tile, .pill') === POPBESITZER;
    popZu();
    POPGRADZU = !!eigene;
    if (eigene) setTimeout(function(){ POPGRADZU = false; }, 400);
  }, true);
  document.addEventListener('keydown', function(ev){ if (ev.key === 'Escape') popZu(); });

  /** Die Sterne auch im Einstellungsbereich anzeigen: jedes Kaestchen mit
      data-stufe bekommt sie einmal an seine Beschriftung gehaengt. Ohne diese
      Datei stehen dort einfach die Namen ohne Sterne. */
  function abSterneSetzen(wurzel){
    var w = wurzel || document;
    w.querySelectorAll('input[data-stufe]').forEach(function(c){
      var l = c.closest('label');
      if (!l || l.querySelector('.sterne')) return;
      var h = sterne(c.id);
      if (!h) return;
      /* Der Titel steht im ersten Element neben dem Kaestchen; eine
         Beschreibung (.d) bleibt darunter, die Sterne gehoeren an den Titel. */
      var ziel = l, k = l.children;
      for (var i = 0; i < k.length; i++){
        if (k[i] === c || k[i].classList.contains('d')) continue;
        ziel = k[i]; break;
      }
      if (ziel !== l){
        var inner = ziel.children;
        for (var j = 0; j < inner.length; j++){
          if (!inner[j].classList.contains('d')){ ziel = inner[j]; break; }
        }
      }
      /* Die Sterne gehoeren in den Namen hinein - daneben wuerden sie je nach
         Aufbau der Zeile weit nach rechts rutschen. Beim Sprachwechsel wird
         der Name neu gefuellt; die Sterne kommen danach wieder dazu. */
      var s = document.createElement('span');
      s.innerHTML = h;
      ziel.appendChild(s.firstChild);
    });
  }
  window.abSterneSetzen = abSterneSetzen;

  /* Jede Seite nennt ihre Erzeugung neueAufgabe(); hier wird sie so umhüllt,
     dass vor jeder Aufgabe der Seed greift - ohne dass die Seiten selbst
     etwas davon wissen müssen. */
  function seedVerdrahten(){
    if (typeof window.neueAufgabe !== 'function' || window.neueAufgabe._seed) return;
    var echt = window.neueAufgabe;
    var huelle = function(){ abSeedNaechste(); return echt.apply(this, arguments); };
    huelle._seed = true;
    window.neueAufgabe = huelle;
    /* Seed, Kästchen und Würfelknopf verdrahten */
    var c = document.getElementById('seedAn'), f2 = abSeedFeld();
    var neu2 = document.getElementById('seedNeu');
    if (c) c.addEventListener('change', function(){
      abSeedZurueck();
      if (c.checked && f2 && !String(f2.value).trim()) f2.value = String(Math.floor(Math.random() * 90000) + 10000);
      window.neueAufgabe();
    });
    if (f2) f2.addEventListener('change', function(){ abSeedZurueck(); if (abSeedAn()) window.neueAufgabe(); });
    if (neu2) neu2.addEventListener('click', function(){
      if (f2) f2.value = String(Math.floor(Math.random() * 90000) + 10000);
      if (c) c.checked = true;
      abSeedZurueck();
      window.neueAufgabe();
    });
  }

  function start(){
    seedVerdrahten();
    document.addEventListener('change', wechsel, true);
    document.addEventListener('click', klick, true);
    abSterneSetzen();
    abGliderAlle();
    setTimeout(abGliderAlle, 120);
    setTimeout(abGliderAlle, 600);
  }

  window.abGlider = abGlider;
  window.abGliderAlle = abGliderAlle;
  window.abKopiere = abKopiere;
  window.abEinstellungenOeffnen = abEinstellungenOeffnen;
  /** Das Menü einer Kachel von außen öffnen (z. B. nachdem sich die
      Unterpunkte geändert haben). */
  function abMenuOeffnen(host, nr){
    if (!host) return;
    var b = host.querySelectorAll('.tile')[nr];
    if (b && b._art) kachelMenu(b, b._art, host);
  }
  window.abMenuOeffnen = abMenuOeffnen;
  window.abKacheln = abKacheln;
  window.abKachelZaehler = abKachelZaehler;
  window.abKachelnMalen = abKachelnMalen;
  window.abKachelAktuell = abKachelAktuell;

  /* ── Automatische Aufgabe ─────────────────────────────────────────────
     Taugt der Spielmodus zum reinen Anklicken, kommt nach einer richtigen
     Antwort von selbst die nächste Aufgabe. Langes Drücken auf „Neue Aufgabe"
     schaltet das um; der Knopf zeigt mit einem drehenden Kreis und einem
     umlaufenden Rahmen, dass es an ist.

         abAutoStart({ an:true, naechste:neueAufgabe, moeglich:nurKlicken })
         abAutoAn()         läuft die Automatik gerade?
         abAutoBald()       nach einer richtigen Antwort: gleich weiter
         abAutoStopp()      einen laufenden Sprung abbrechen
         abAutoMalen()      Knopf neu beschriften (z. B. nach Sprachwechsel)
         abBlitz(richtig)   kurzes grünes bzw. rotes Aufleuchten des Bildes   */
  var AUTO = { an:false, zeit:null, naechste:null, pause:1400, gestartet:false,
               moeglich:function(){ return true; }, gemerkt:null,
               wahl:'#genRow button, #genRow2 button' };

  function autoKnoepfe(){
    return [].slice.call(document.querySelectorAll(AUTO.wahl))
      .filter(function(b){
        /* Nebenknöpfe (Punktestand, Zurücksetzen, Teilen) gehören nicht dazu. */
        return !b.closest('.punkte') && !b.classList.contains('share-btn')
            && !b.classList.contains('zb-reset') && !b.classList.contains('sb-reset');
      });
  }
  function abAutoAn(){ return !!(AUTO.an && AUTO.moeglich()); }
  function abAutoStopp(){ if (AUTO.zeit){ clearTimeout(AUTO.zeit); AUTO.zeit = null; } }
  function abAutoBald(ms){
    if (!abAutoAn()) return;
    abAutoStopp();
    AUTO.zeit = setTimeout(function(){ AUTO.zeit = null; AUTO.naechste(); },
                           ms || AUTO.pause);
  }
  function abAutoMalen(){
    /* Seiten, die ihre Automatik selbst führen (z. B. zahlbereiche), rufen
       abAutoStart nicht - dort darf diese Datei die Knöpfe nicht anfassen. */
    if (!AUTO.gestartet) return;
    var an = abAutoAn(), moeglich = AUTO.moeglich();
    autoKnoepfe().forEach(function(b){
      b.classList.toggle('auto-an', an);
      b.classList.toggle('auto-aus', !an && moeglich);
      b.title = !moeglich
        ? TX('In diesem Spielmodus gibt es keine automatische Aufgabe.',
             'This game mode has no automatic next task.')
        : an
        ? TX('Automatische Aufgabe ist an: nach einer richtigen Antwort kommt die nächste von selbst. Langes Drücken schaltet sie ab.',
             'Automatic next task is on: after a correct answer the next one follows by itself. A long press switches it off.')
        : TX('Automatische Aufgabe ist aus. Langes Drücken schaltet sie ein.',
             'Automatic next task is off. A long press switches it on.');
    });
  }
  function abAutoUmschalten(){
    if (!AUTO.moeglich()) return;
    AUTO.an = !AUTO.an;
    if (!AUTO.an) abAutoStopp();
    abAutoMalen();
    if (AUTO.gemerkt) AUTO.gemerkt(AUTO.an);
  }
  function autoVerdrahten(){
    autoKnoepfe().forEach(function(b){
      if (b._abAuto) return;
      b._abAuto = true;
      var t = null, lang = false;
      b.addEventListener('pointerdown', function(ev){
        if (ev.button != null && ev.button !== 0) return;
        lang = false;
        t = setTimeout(function(){ lang = true; abAutoUmschalten(); }, 550);
      });
      ['pointerup','pointerleave','pointercancel'].forEach(function(e){
        b.addEventListener(e, function(){ clearTimeout(t); });
      });
      b.addEventListener('contextmenu', function(ev){
        ev.preventDefault(); clearTimeout(t); lang = true; abAutoUmschalten();
      });
      b.addEventListener('click', function(ev){
        clearTimeout(t);
        if (lang){ lang = false; ev.preventDefault(); ev.stopImmediatePropagation(); }
      }, true);
    });
  }
  /* Baut eine Seite ihre Knöpfe neu, melden sie sich hiermit wieder an. */
  function abAutoNeu(){
    if (!AUTO.gestartet) return;
    autoVerdrahten();
    abAutoMalen();
  }
  function abAutoStart(o){
    o = o || {};
    AUTO.gestartet = true;
    if (o.knoepfe) AUTO.wahl = o.knoepfe;
    AUTO.an = !!o.an;
    if (o.naechste) AUTO.naechste = o.naechste;
    if (o.moeglich) AUTO.moeglich = o.moeglich;
    if (o.gemerkt)  AUTO.gemerkt  = o.gemerkt;
    if (o.pause)    AUTO.pause    = o.pause;
    autoVerdrahten();
    abAutoMalen();
  }

  /* Kurzes Aufleuchten des ganzen Bildes - grün bei richtig, rot bei falsch.
     Im Dunkelmodus kräftige dunkle Töne, sonst wirkt es wie ein weißer Blitz. */
  function abBlitz(richtig){
    var ov = document.getElementById('abBlitz');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'abBlitz';
      document.body.appendChild(ov);
    }
    var dunkel = document.documentElement.classList.contains('dark');
    ov.style.transition = 'none';
    /* Im Hellmodus ein kräftiges Grün bzw. Rot: das blasse Grün von früher
       verschwand auf weissem Grund fast ganz. */
    ov.style.background = dunkel ? (richtig ? '#1e4a22' : '#4a2020')
                                 : (richtig ? '#4caf50' : '#e04b4b');
    ov.style.opacity = dunkel ? '.6' : '.42';
    setTimeout(function(){ ov.style.transition = 'opacity .9s'; ov.style.opacity = '0'; }, 60);
  }

  window.abAutoStart = abAutoStart;
  window.abAutoNeu = abAutoNeu;
  window.abAutoAn = abAutoAn;
  window.abAutoBald = abAutoBald;
  window.abAutoStopp = abAutoStopp;
  window.abAutoMalen = abAutoMalen;
  window.abBlitz = abBlitz;

  /* ── Fälle mit Häufigkeit ──────────────────────────────────────────────────
     Viele Seiten haben Fälle, die einzeln an- und ausgeschaltet werden können
     (Kästchen) und deren Häufigkeit versteckt in den Einstellungen über einen
     Schieberegler geregelt wird. Der Regler heißt wie das Kästchen mit „w“
     davor: zu „fallZwei“ gehört „wfallZwei“ (1 = selten … 10 = oft).         */

  /** Gewicht eines Falls (1 … 10, Standard 5). */
  function abGewicht(id){
    var e = document.getElementById('w' + id);
    var v = e ? parseInt(e.value, 10) : 5;
    return (isFinite(v) && v > 0) ? Math.min(10, v) : 5;
  }
  /** Zieht einen der angekreuzten Fälle - nach den eingestellten Häufigkeiten. */
  function abZiehe(ids){
    var akt = ids.filter(function(id){
      var e = document.getElementById(id);
      return e && e.checked;
    });
    if (!akt.length) return null;
    var gew = akt.map(abGewicht);
    var summe = gew.reduce(function(a, b){ return a + b; }, 0);
    var x = Math.random() * summe;
    for (var i = 0; i < akt.length; i++){ x -= gew[i]; if (x < 0) return akt[i]; }
    return akt[akt.length - 1];
  }
  /** Ein Regler ist nur bedienbar, wenn sein Fall angekreuzt ist. */
  function abReglerAbgleichen(){
    document.querySelectorAll('.slider-row[data-fuer]').forEach(function(r){
      var id = r.getAttribute('data-fuer');
      var k = document.getElementById(id);
      var an = !!(k && k.checked);
      r.classList.toggle('aus', !an);
      var sl = r.querySelector('input[type="range"]');
      if (sl) sl.disabled = !an;
    });
  }
  /** Setzt die Regler auf feste Werte, z. B. aus einer Schwierigkeitsstufe. */
  function abReglerSetzen(werte){
    Object.keys(werte || {}).forEach(function(id){
      var e = document.getElementById('w' + id);
      if (!e) return;
      /* Ein Fall, den die Stufe ausschaltet, braucht keine Häufigkeit. Stünde
         sein Regler danach ganz links, käme er nach dem Einschalten von Hand
         so gut wie nie - genau das Gegenteil dessen, was der Haken bezweckt.
         Darum behält er den Standardwert der Seite. */
      var k = document.getElementById(id);
      if (k && k.type === 'checkbox' && !k.checked){
        var std = e.getAttribute('value');
        if (std != null) e.value = std;
        return;
      }
      e.value = werte[id];
    });
    abReglerAbgleichen();
  }
  window.abPillen = abPillen;

  /* ══ Fester Zufalls-Seed ══════════════════════════════════════════════════
     Mit einem Seed würfelt die Seite bei allen dieselben Aufgaben - praktisch,
     wenn eine Klasse dieselbe Übung bekommen soll. Der Seed steht im Link.

     Wie es funktioniert: Vor JEDER Aufgabe wird der Zufallsgenerator neu aus
     Seed und laufender Nummer gesetzt. So ist Aufgabe 3 bei allen dieselbe,
     auch wenn zwischendurch irgendwo sonst eine Zufallszahl gezogen wurde.  */
  var seedStand = 0, seedNr = 0, seedEcht = null;

  function seedHash(text){
    var h = 2166136261;
    text = String(text);
    for (var i = 0; i < text.length; i++){
      h ^= text.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h >>> 0;
  }
  /* mulberry32: klein, schnell und überall gleich */
  function seedZahl(){
    seedStand = (seedStand + 0x6D2B79F5) >>> 0;
    var t = seedStand;
    t = Math.imul(t ^ (t >>> 15), t | 1) >>> 0;
    t = (t ^ (t + Math.imul(t ^ (t >>> 7), t | 61))) >>> 0;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function abSeedFeld(){ return document.getElementById('seedWert'); }
  function abSeedAn(){
    var c = document.getElementById('seedAn');
    var f2 = abSeedFeld();
    return !!(c && c.checked && f2 && String(f2.value).trim());
  }
  function abSeedWert(){
    var f2 = abSeedFeld();
    return f2 ? String(f2.value).trim() : '';
  }
  /** Vor jeder neuen Aufgabe aufrufen: setzt den Generator neu. */
  function abSeedNaechste(){
    if (!abSeedAn()){
      if (seedEcht){ Math.random = seedEcht; seedEcht = null; }
      return;
    }
    if (!seedEcht) seedEcht = Math.random;
    seedNr++;
    seedStand = seedHash(abSeedWert() + '#' + seedNr);
    Math.random = seedZahl;
  }
  /** Zählung zurücksetzen - z. B. wenn der Seed geändert wurde. */
  function abSeedZurueck(){ seedNr = 0; }
  /** Hängt den Seed an einen Link an, wenn er eingeschaltet ist. */
  function abSeedAnhaengen(url){
    if (!abSeedAn()) return url;
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'seed=' + encodeURIComponent(abSeedWert());
  }
  /** Seed aus der Adresszeile übernehmen (beim Laden). */
  function abSeedAusURL(){
    var v = null;
    try { v = new URLSearchParams(location.search).get('seed'); } catch (e) {}
    if (!v) return false;
    var c = document.getElementById('seedAn'), f2 = abSeedFeld();
    if (!c || !f2) return false;
    f2.value = v; c.checked = true;
    abSeedZurueck();
    return true;
  }
  window.abSeedNaechste  = abSeedNaechste;
  window.abSeedAnhaengen = abSeedAnhaengen;
  window.abSeedAusURL    = abSeedAusURL;
  window.abSeedZurueck   = abSeedZurueck;
  window.abSeedAn        = abSeedAn;


  /* ══ Formeln, die zu breit sind ═══════════════════════════════════════════
     MathJax setzt eine Formel in ihrer natuerlichen Breite. Auf schmalen
     Bildschirmen ragt sie dann heraus oder bekommt eigene Rollbalken. Darum
     wird sie so weit verkleinert, dass sie in ihren Platz passt - wie
     scale.js es fuer die Aufgabe selbst tut.                              */
  function formelPassend(c, box){
    if (!c || !box) return;
    c.style.transform = 'none';
    c.style.transformOrigin = 'top left';
    /* Eine eigene Anzeigeart aus einem frueheren Lauf wieder weg - sonst
       misst der naechste Lauf die schon verkleinerte Formel. */
    c.style.display = '';
    box.style.height = '';
    box.style.overflow = '';
    /* Die wahre Breite der Formel. Bei einem Container, der die ganze Zeile
       einnimmt (display="true"), ist getBoundingClientRect die Kastenbreite -
       nicht die der Formel; und scrollWidth zaehlt bei zentriertem Inhalt nur
       den Ueberhang nach rechts. Darum zusaetzlich das innere Element messen. */
    var innen = c.firstElementChild;
    var breit = Math.max(c.scrollWidth || 0, Math.ceil(c.getBoundingClientRect().width),
                         innen ? Math.ceil(innen.getBoundingClientRect().width) : 0);
    var platz = box.clientWidth;
    if (!platz || !breit || breit <= platz + 1) return;
    var k = Math.max(0.4, platz / breit);
    /* Auf ein Element im Textfluss (display:inline) wirkt kein transform -
       MathJax setzt seine Behaelter fuer \( ... \) genau so. Dann half das
       Verkleinern gar nichts und die Formel lief weiter ueber den Rand. */
    if (getComputedStyle(c).display === 'inline') c.style.display = 'inline-block';
    /* Steht die Formel mittig und haengt links wie rechts heraus, muss auch
       von der Mitte aus verkleinert werden - sonst rutscht sie nach links. */
    var bl = box.getBoundingClientRect().left, cl = c.getBoundingClientRect().left;
    c.style.transformOrigin = (cl < bl - 1) ? 'top center' : 'top left';
    /* Luft nach oben und unten: MathJax rechnet die Kastenhoehe knapp, ein
       Exponent oder ein Bruchstrich ragt ein paar Pixel darueber hinaus.
       Ohne diese Reserve schneidet „overflow: hidden" sie ab. */
    var gross = parseFloat(getComputedStyle(box).fontSize) || 16;
    var luft = Math.max(5, Math.round(gross * 0.4));
    c.style.transform = 'translateY(' + luft + 'px) scale(' + k + ')';
    var hoehe = Math.ceil(c.getBoundingClientRect().height) + 2 * luft;
    box.style.height = hoehe + 'px';
    /* Verkleinert passt die Formel - ein Rollbalken waere jetzt nur noch ein
       Artefakt der unveraenderten Layoutbreite. Beide Richtungen setzen:
       eine einzelne Richtung auf „hidden" macht die andere zu „auto". */
    box.style.overflow = 'hidden';
  }
  function abFormelnPassen(wurzel){
    var w = wurzel || document;
    if (!w.querySelectorAll) return;
    try {
      /* Formeln sind keine Bedienelemente: beim Durchtabben soll der Fokus
         von einem Eingabefeld zum naechsten springen, nicht auf eine Formel. */
      w.querySelectorAll('mjx-container[tabindex="0"]').forEach(function(c){
        c.setAttribute('tabindex', '-1');
      });
      w.querySelectorAll('mjx-container[display="true"]').forEach(function(c){
        /* Verkleinert wird der Inhalt, nicht der Kasten - sonst ruecken die
           Formeln aus der Mitte und werden schmaler als ihr Platz. */
        formelPassend(c.firstElementChild || c, c);
      });
      w.querySelectorAll('.pg-schritt-gl, .pg-kette-teil').forEach(function(b){
        var c = b.querySelector('mjx-container');
        if (c) formelPassend(c, b);
      });
    } catch (e) {}
  }
  window.abFormelnPassen = abFormelnPassen;
  var skalTimer = null;
  window.addEventListener('resize', function(){
    clearTimeout(skalTimer);
    skalTimer = setTimeout(function(){ abFormelnPassen(document); }, 120);
  });
  window.addEventListener('tl-sprache', function(){ setTimeout(function(){ abFormelnPassen(document); }, 60); });
  /* Ein aufklappender Bereich aendert die Breite - dann wird nachgerechnet.
     „toggle" steigt nicht auf, deshalb in der Einfangphase. */
  document.addEventListener('toggle', function(ev){
    if (!ev.target || ev.target.tagName !== 'DETAILS') return;
    clearTimeout(skalTimer);
    skalTimer = setTimeout(function(){ abFormelnPassen(document); }, 60);
  }, true);
  try {
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(function(){ setTimeout(function(){ abFormelnPassen(document); }, 60); });
  } catch (e) {}

  window.abGewicht = abGewicht;
  window.abZiehe = abZiehe;
  window.abReglerAbgleichen = abReglerAbgleichen;
  window.abReglerSetzen = abReglerSetzen;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  window.addEventListener('load', abGliderAlle);
  window.addEventListener('resize', abGliderAlle);
  window.addEventListener('tl-sprache', function(){
    setTimeout(abGliderAlle, 0);
    setTimeout(abAutoMalen, 0);
    /* Die Namen wurden neu gesetzt - die Sterne gehoeren wieder dazu. */
    setTimeout(abSterneSetzen, 0);
    /* Kacheln holen ihre Beschriftung aus den Kaestchen - die sind beim
       Sprachwechsel schon umgestellt, also nur neu malen. */
    setTimeout(function(){
      document.querySelectorAll('.tiles, .pills').forEach(function(h){ abKachelnMalen(h); });
    }, 0);
  });
  window.addEventListener('tl-theme', function(){ setTimeout(abGliderAlle, 0); });
  try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(abGliderAlle); } catch (e) {}
})();
