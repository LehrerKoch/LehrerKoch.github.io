// --------------------------------------------------------
// STATE
// --------------------------------------------------------
let deck = [], hand = [], timeline = [], score = 0;
let startcardsToPlay = 20, cardsToPlay = startcardsToPlay, activeFilters = [];
let currentGameMode = 'direct';
let gameOverShown = false;

// Guess-Mode state
let lobbySelectedMode = 'direct';
let guessDeck = [];
let guessCardShown = null;
const CURRENT_YEAR = new Date().getFullYear();

// --------------------------------------------------------
// TOUCH DRAG STATE
// --------------------------------------------------------
let touchDrag = null;   // { idx, isHand, sourceEl }
let draggingBlocked = false;  // true während Auswertungs-Leiste sichtbar
let ghostEl   = null;
let isDragging = false;
let toastTimer = null;
let furtherInfoHideTimer = null;

// --------------------------------------------------------
// HAND-AREA MIN-HÖHE
// Reserviert dauerhaft den Platz für genau 1 Karte, damit
// beim Ausspielen von Karten keine anderen Elemente springen.
// Wird bei Start und bei Größen-/Orientierungsänderungen neu
// berechnet und als CSS min-height festgeklemmt.
// --------------------------------------------------------
function updateHandAreaMinHeight() {
    const area = document.getElementById('hand-area');
    if (!area) return;

    // getPropertyValue('--card-h') liefert den rohen CSS-Text
    // (z.B. "clamp(80px, 38vw, 200px)") – parseFloat davon wäre NaN.
    // Stattdessen: ein unsichtbares Probe-Element mit denselben CSS-Regeln
    // wie eine echte Karte erzeugen; der Browser löst clamp() und dvh korrekt auf.
    const probe = document.createElement('div');
    probe.style.cssText =
        'position:absolute;visibility:hidden;pointer-events:none;' +
        'width:var(--card-w);height:var(--card-h);max-height:35dvh;' +
        'top:-9999px;left:-9999px;';
    document.body.appendChild(probe);
    const cardH = probe.getBoundingClientRect().height || 130;
    document.body.removeChild(probe);

    // Padding: clamp(4px,1dvh,12px) oben + clamp(5px,1.2dvh,14px) unten
    // Konservative Näherung: ~22 px (wird bei Resize neu berechnet)
    const paddingApprox = 22;
    const fixedH = Math.ceil(cardH + paddingApprox);

    // Sowohl height als auch minHeight festklemmen:
    // minHeight allein: height kann durch anderen Code überschrieben werden.
    // height allein: größere Karten würden area aufweiten.
    // Beide zusammen: Bereich bleibt immer exakt so groß wie 1 Karte.
    area.style.minHeight = fixedH + 'px';
    area.style.height    = fixedH + 'px';
    // Visuellen Hintergrund zurücksetzen – adjustHandZoom setzt ihn
    // danach auf den echten Wert (bis dahin: volle graue Fläche)
    area.style.removeProperty('--hand-visual-h');
}

// Resize / Orientierungswechsel: min-Höhe und Zoom neu berechnen.
// Debounce verhindert zu viele Aufrufe während des Resize-Ziehens.
let _resizeTimer = null;
function _onResize() {
    clearTimeout(_resizeTimer);
    // 180ms Debounce: fängt auch das Windows-Andocken ab, bei dem
    // mehrere Resize-Events in schneller Folge kommen und das Layout
    // erst nach Abschluss der Snap-Animation stabil ist.
    _resizeTimer = setTimeout(() => {
        updateHandAreaMinHeight();
        // Ergebnis-Leiste: min-height zurücksetzen damit sie sich bei neuer
        // Fenstergröße neu anpasst (wird beim nächsten showRoundResult neu gemessen)
        const bar = document.getElementById('round-result-bar');
        if (bar) bar.style.minHeight = '';
        adjustTimelineZoom();
        adjustHandZoom();
        requestAnimationFrame(() => {
            fitCardContents();
        });
    }, 180);
}
window.addEventListener('resize', _onResize);
// Orientierungswechsel: kurz warten bis der Browser das Layout
// abgeschlossen hat, dann neu messen
if (screen.orientation) {
    screen.orientation.addEventListener('change', () => setTimeout(_onResize, 150));
}

// --------------------------------------------------------
// ZOOM-ANPASSUNG
// --------------------------------------------------------
function adjustTimelineZoom() {
    const container = document.getElementById('timeline');
    const area      = document.getElementById('timeline-area');
    if (!container || !area) return;
    // Kein scale(1)-Reset nötig: scrollWidth ist layout-basiert und wird
    // von CSS-Transforms nicht beeinflusst – wir können direkt messen.
    requestAnimationFrame(() => {
        const totalW    = container.scrollWidth;
        const available = area.clientWidth - 20;
        const scale     = totalW > available ? Math.max(available / totalW, 0.15) : 1;
        container.style.transform = scale < 1 ? `scale(${scale})` : '';
    });
}

// function adjustHandZoom() {
//     const container = document.getElementById('hand');
//     const area      = document.getElementById('hand-area');
//     if (!container || !area) return;
//     container.style.transform = 'scale(1)';
//     requestAnimationFrame(() => {
//         const totalW    = container.scrollWidth;
//         const available = area.clientWidth - 20;
//         if (totalW > available) {
//             const scale = Math.max(available / totalW, 0.35);
//             container.style.transform = `scale(${scale})`;
//         }
//     });
// }
function adjustHandZoom() {
    const container = document.getElementById('hand');
    const area      = document.getElementById('hand-area');
    if (!container || !area) return;

    requestAnimationFrame(() => {
        const totalW    = container.scrollWidth;
        const available = area.clientWidth - 20;

        let scale = 1;
        if (totalW > available) {
            scale = Math.max(available / totalW, 0.35);
            container.style.transform = `scale(${scale})`;
        } else {
            container.style.transform = '';
        }

        // Sichtbare Höhe = skalierter Kartenbereich + Padding.
        // CSS ::after auf #hand-area nutzt diese Variable für den
        // grauen Hintergrund, der nur so groß wie die Karten ist.
        const visualH = Math.round(container.scrollHeight * scale + 22);
        area.style.setProperty('--hand-visual-h', visualH + 'px');
    });
}

// --------------------------------------------------------
// TEXT-ANPASSUNG – Schriftgröße reduzieren bis Text passt
// --------------------------------------------------------
function fitEl(el, measure) {
    el.style.fontSize = '';
    const ref = measure(el);
    if (ref < 4) return;
    let fs = parseFloat(getComputedStyle(el).fontSize);
    let tries = 0;
    while (measure(el) < -1 && fs > 6 && tries < 40) {
        fs = Math.max(6, fs - 0.5);
        el.style.fontSize = fs + 'px';
        tries++;
    }
}

function fitCardContents(root = document) {
    // --- Überschriften: nur das längste Wort muss in die Breite passen ---
    root.querySelectorAll('.card-title').forEach(el => {
        el.style.fontSize  = '';
        el.style.transform = '';
        const wrapper = el.closest('.card-title-wrapper');
        if (!wrapper) return;
        const wW = wrapper.clientWidth;
        const wH = wrapper.clientHeight;
        if (wW < 4 || wH < 4) return;

        let fs = parseFloat(getComputedStyle(el).fontSize);
        const cs = getComputedStyle(el);

        // Hilfselement: misst ein einzelnes Wort ohne Umbruch
        const probe = document.createElement('span');
        probe.style.cssText =
            `visibility:hidden;position:absolute;white-space:nowrap;` +
            `font-family:${cs.fontFamily};font-weight:${cs.fontWeight};` +
            `font-size:${fs}px;`;
        document.body.appendChild(probe);

        const words = el.textContent.trim().split(/\s+/);
        let longestW = 0;
        words.forEach(w => {
            probe.textContent = w;
            longestW = Math.max(longestW, probe.scrollWidth);
        });
        document.body.removeChild(probe);

        // Breite: nur verkleinern wenn das längste Wort nicht passt
        if (longestW > wW) {
            fs = Math.floor(fs * (wW / longestW) * 0.97);
            el.style.fontSize = fs + 'px';
        }

        // Höhe: weiter verkleinern falls zu viele Zeilen entstehen
        let tries = 0;
        while (el.scrollHeight > wH+1 && fs > 3 && tries < 40) {
            fs = Math.max(3, fs - 0.5);
            el.style.fontSize = fs + 'px';
            tries++;
        }
    });

    // --- Fließtext: längtes Wort muss in Breite passen, dann Höhe ---
    root.querySelectorAll('.card-text').forEach(el => {
        el.style.fontSize = '';
        const maxH = el.offsetHeight;
        const maxW = el.clientWidth;
        if (maxH < 4 || maxW < 4) return;

        let fs = parseFloat(getComputedStyle(el).fontSize);
        const cs = getComputedStyle(el);

        const probe = document.createElement('span');
        probe.style.cssText =
            `visibility:hidden;position:absolute;white-space:nowrap;` +
            `font-family:${cs.fontFamily};font-weight:${cs.fontWeight};` +
            `font-size:${fs}px;`;
        document.body.appendChild(probe);
        let longestW = 0;
        el.textContent.trim().split(/\s+/).forEach(w => {
            probe.textContent = w;
            longestW = Math.max(longestW, probe.scrollWidth);
        });
        document.body.removeChild(probe);

        if (longestW > maxW) {
            fs = Math.floor(fs * (maxW / longestW) * 0.97);
            el.style.fontSize = fs + 'px';
        }

        let tries = 0;
        while (el.scrollHeight > maxH + 1 && fs > 3 && tries < 40) {
            fs = Math.max(3, fs - 0.5);
            el.style.fontSize = fs + 'px';
            tries++;
        }
    });

    // --- back-year: immer einzeilig (scrollWidth) ---
    root.querySelectorAll('.back-year').forEach(el => {
        el.style.fontSize = '';
        // Wenn ein Stern-Button im gleichen Wrap vorhanden ist (z.B. position:absolute),
        // dessen Breite von der verfügbaren Breite abziehen, damit kein Überlappen entsteht.
        const wrap = el.closest('.back-year-wrap') || el.parentElement;
        const starBtn = wrap ? wrap.querySelector('.range-star-icon') : null;
        const starW = starBtn ? starBtn.offsetWidth + 2 : 0;
        const maxW = el.offsetWidth - starW;
        if (maxW < 4) return;
        let fs = parseFloat(getComputedStyle(el).fontSize);
        let tries = 0;
        while (el.scrollWidth > maxW + 1 && fs > 4 && tries < 40) {
            fs = Math.max(4, fs - 0.5);
            el.style.fontSize = fs + 'px';
            tries++;
        }
    });
}

// --------------------------------------------------------
// FURTHER INFO TOOLTIP
// --------------------------------------------------------
function formatRange(start, end) {
    const fmt = v => v < 0 ? `${Math.abs(v)} v. Chr.` : `${v} n. Chr.`;
    return `${fmt(start)} – ${fmt(end)}`;
}

function showFurtherInfoTooltip(iconBtn, items, title = 'Weiterführende Infos') {
    clearTimeout(furtherInfoHideTimer);
    let tip = document.getElementById('further-info-tooltip');
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'further-info-tooltip';
        document.body.appendChild(tip);
        tip.addEventListener('mouseenter', () => clearTimeout(furtherInfoHideTimer));
        tip.addEventListener('mouseleave', () => {
            furtherInfoHideTimer = setTimeout(hideFurtherInfoTooltip, 250);
        });
    }
    tip._source = iconBtn;

    const itemsHTML = items.map(item =>
        `<div class="finfo-item">${item.startsWith('http') ? `<a href="${item}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${item}</a>` : item}</div>`
    ).join('');
    tip.innerHTML = `<div class="finfo-header">${title}</div>${itemsHTML}`;

    // tip.style.visibility = 'hidden';
    tip.style.display = 'block';

    requestAnimationFrame(() => {
        const rect   = iconBtn.getBoundingClientRect();
        const tipH   = tip.offsetHeight;
        const tipW   = tip.offsetWidth;
        let left = rect.right - tipW;
        let top  = rect.top - tipH - 6;
        if (left < 6) left = 6;
        if (left + tipW > window.innerWidth - 6) left = window.innerWidth - tipW - 6;
        if (top < 6) top = rect.bottom + 6;
        tip.style.left = left + 'px';
        tip.style.top  = top  + 'px';
        // tip.style.visibility = 'visible';
    });
}

function hideFurtherInfoTooltip() {
    const tip = document.getElementById('further-info-tooltip');
    if (tip) { tip.style.display = 'none'; tip._source = null; }
}

// Tooltip schließen bei Klick außerhalb
document.addEventListener('click', (e) => {
    const tip = document.getElementById('further-info-tooltip');
    if (tip && tip.style.display !== 'none'
            && !tip.contains(e.target)
            && !e.target.closest('.further-info-icon')) {
        hideFurtherInfoTooltip();
    }
});


function setLobbyMode(mode, skipURL = false) {
    lobbySelectedMode = mode;
    document.querySelectorAll('.seg-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.mode === mode);
    });
    updateMode(skipURL);
}

function updateURL() {
    const mode = lobbySelectedMode;
    const currentTags = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    const cards = document.getElementById('cards-slider')?.value || 10;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('mode', mode);
    urlParams.set('cards', cards);
    if (currentTags.length > 0) urlParams.set('tags', currentTags.join(','));
    else urlParams.delete('tags');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    updateLobbyCount();
}

function updateLobbyCount() {
    const activeTags = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    const pool = activeTags.length > 0
        ? cardPool.filter(c => c.tags.some(t => activeTags.includes(t)))
        : cardPool;
    const sliderVal = parseInt(document.getElementById('cards-slider')?.value || 10);
    let el = document.getElementById('lobby-card-count');
    if (!el) return;

    if (activeTags.length === 0) {
        el.textContent = `${pool.length} Karten verfügbar`;
        return;
    }

    // Wieviele Karten werden tatsächlich gespielt? – spiegelbildlich zu startNewGame()
    let gespielt;
    if (lobbySelectedMode === 'guess') {
        // Guess-Modus: alle Karten einzeln, keine Hand/Zeitstrahl-Aufteilung
        const N = Math.min(sliderVal, pool.length);
        gespielt = `${N} werden gespielt`;
    } else {
        // Direct / Risiko: Handkarten (5) + 1 Startkarte + restlicher Stapel
        const handSize = Math.min(5, pool.length - 1);
        const maxN     = Math.max(1, pool.length - handSize);
        const N        = Math.min(sliderVal, maxN);
        const deckRest = N - 1; // 1 Karte geht sofort auf den Zeitstrahl
        gespielt = `${handSize}+1` + (deckRest > 0 ? `+${deckRest}` : ``) + ` werden gespielt`;
    }

    el.textContent = `${pool.length} Karten verfügbar (${gespielt})`;
}

function updateMode(skipURL = false) {
    const desc = document.getElementById('mode-description');
    if (lobbySelectedMode === 'risk') {
        desc.innerHTML = "<b>Risiko-Variante:</b> Platziere die Karten blind im Zeitstrahl – die Jahreszahlen bleiben verborgen. Erst wenn du auf 'Reihe werten' klickst, werden alle Karten aufgedeckt. Ist die Reihe fehlerfrei, erhältst du Punkte. Ein einziger Fehler bringt dir null Punkte! Mehr Risiko, mehr Punkte, ideal für Fortgeschrittene!";
    } else if (lobbySelectedMode === 'guess') {
        desc.innerHTML = "<b>Jahr schätzen:</b> Eine Karte nach der anderen – tippe das Jahr des Ereignisses ein. Je genauer du liegst, desto mehr Punkte. Ältere Ereignisse verzeihen größere Abweichungen. Kein Drag & Drop, nur dein Zeitgefühl!";
    } else {
        desc.innerHTML = "<b>Direktes Aufdecken:</b> Sofortiges Feedback: Sobald du eine Karte an eine Position ziehst, wird sie umgedreht. Stimmt die Position nicht, wird die Karte entfernt. Ideal zum Lernen!";
    }
    if (!skipURL) updateURL();
}

function init() {
    const params  = new URLSearchParams(window.location.search);
    const urlTags = params.get('tags') ? params.get('tags').split(',') : [];
    const urlMode = params.get('mode');
    const urlCards = parseInt(params.get('cards') || 10);

    lobbySelectedMode = ['direct','risk','guess'].includes(urlMode) ? urlMode : 'direct';
    setLobbyMode(lobbySelectedMode, true);  // skipURL=true: URL während init() nicht überschreiben

    // Slider auf URL-Wert setzen
    const slider = document.getElementById('cards-slider');
    if (slider) {
        slider.value = Math.min(30, Math.max(1, urlCards));
        document.getElementById('slider-display').textContent = slider.value;
    }

    const allTags   = [...new Set(cardPool.flatMap(c => c.tags))].sort((a, b) => a.localeCompare(b, 'de'));
    const container = document.getElementById('tag-filters');
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.innerText = tag;
        btn.className = 'tag-btn';
        if (urlTags.includes(tag)) btn.classList.add('active');

        // Short click: toggle; Long press: diesen als einzigen aktivieren
        let pressTimer = null;
        let didLongPress = false;
        let touchStartY = 0;
        let touchMoved = false;

        const startPress = (e) => {
            didLongPress = false;
            touchMoved = false;
            if (e.touches) touchStartY = e.touches[0].clientY;
            pressTimer = setTimeout(() => {
                if (touchMoved) return;
                didLongPress = true;
                document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateURL();
            }, 500);
        };
        const onTouchMove = (e) => {
            if (Math.abs(e.touches[0].clientY - touchStartY) > 8) {
                touchMoved = true;
                clearTimeout(pressTimer);
            }
        };
        const cancelPress = () => clearTimeout(pressTimer);
        const endPress = (e) => {
            if (e.cancelable) e.preventDefault();
            clearTimeout(pressTimer);
            if (!didLongPress && !touchMoved) { btn.classList.toggle('active'); updateURL(); }
        };

        btn.addEventListener('mousedown',   startPress);
        btn.addEventListener('touchstart',  startPress,   { passive: true });
        btn.addEventListener('touchmove',   onTouchMove,  { passive: true });
        btn.addEventListener('mouseup',     endPress);
        btn.addEventListener('touchend',    endPress);
        btn.addEventListener('mouseleave',  cancelPress);
        btn.addEventListener('touchcancel', cancelPress);

        container.appendChild(btn);
    });
    // updateLobbyCount();
}

function startNewGame() {
    const sliderVal = parseInt(document.getElementById('cards-slider')?.value || 10);
    startcardsToPlay = sliderVal;
    currentGameMode = lobbySelectedMode;
    activeFilters   = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    gameOverShown   = false;
    updateURL(); // URL vor Spielstart sichern (wird nach reload wiederhergestellt)

    score = 0; cardsToPlay = startcardsToPlay; timeline = []; hand = [];
    let pool = activeFilters.length > 0
        ? cardPool.filter(c => c.tags.some(t => activeFilters.includes(t)))
        : cardPool;
    
    // ── Guess-Modus: eigener Spielfluss ──
    if (currentGameMode === 'guess') {
        const N = Math.min(startcardsToPlay, pool.length);
        startcardsToPlay = N;
        guessDeck = JSON.parse(JSON.stringify(pool))
            .sort(() => Math.random() - 0.5)
            .slice(0, N)
            .map((card, i) => ({ ...card, _uid: i }));
        document.getElementById('lobby').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        startGuessGame();
        return;
    }

    const poolSize = pool.length;
    // Handkarten immer 5 (separat, zählen NICHT gegen N)
    const handSize = Math.min(5, poolSize - 1); // mind. 1 Karte für Mitte/Stapel
    const maxN = Math.max(1, poolSize - handSize);
    const N = Math.min(startcardsToPlay, maxN);
    startcardsToPlay = N;

    const shuffled = JSON.parse(JSON.stringify(pool))
        .sort(() => Math.random() - 0.5)
        .map((c, i) => ({ ...c, _uid: i }));

    // Ersten N Karten → Spielstapel; nächste handSize → initiale Hand
    deck = shuffled.slice(0, N);
    hand = shuffled.slice(N, N + handSize);

    document.getElementById('lobby').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');

    // Min-Höhe des Handbereichs für 1 Karte festlegen (verhindert
    // Layout-Sprünge wenn Karten ausgespielt werden)
    updateHandAreaMinHeight();

    // 1 Karte aus Stapel in die Mitte
    if (deck.length > 0) {
        const first = deck.pop();
        first.isFlipped = (currentGameMode === 'direct');
        timeline.push(first);
    }
    if (currentGameMode === 'direct') score = 1;
    updateUI();
}

// --------------------------------------------------------
// UI UPDATES
// --------------------------------------------------------
function updateUI() {
    renderStats();
    renderTimeline();
    renderHand();
    triggerMathJax();


}

function renderStats() {
    document.getElementById('score').innerText = score;
    document.getElementById('remaining').innerText = deck.length;

    const riskBtn = document.getElementById('reveal-risk-btn');
    riskBtn.style.display = (currentGameMode === 'risk') ? 'block' : 'none';

    const potEl = document.getElementById('potential-points');
    if (potEl) {
        if (currentGameMode === 'risk') {
            const n   = timeline.length;
            const pot = n * (n + 1) / 2;
            potEl.textContent = `(+${pot})`;
            potEl.style.display = 'inline';
        } else {
            potEl.style.display = 'none';
        }
    }
}

function renderTimeline() {
    const container = document.getElementById('timeline');
    container.innerHTML = '';
    timeline.forEach((card, i) => container.appendChild(createCardUI(card, false, i)));
}

function renderHand() {
    const container = document.getElementById('hand');
    container.innerHTML = '';
    hand.forEach((card, i) => container.appendChild(createCardUI(card, true, i)));
}

function triggerMathJax() {
    // Kein Verstecken mehr nötig: adjustTimelineZoom/adjustHandZoom setzen
    // keinen scale(1)-Reset → kein Flacker-Frame. fitCardContents läuft
    // nach dem Zoom-RAF (RAF-A und RAF-B vor RAF-C durch FIFO-Reihenfolge).
    const reveal = () => {
        adjustTimelineZoom();  // queued RAF-A
        adjustHandZoom();      // queued RAF-B
        requestAnimationFrame(() => fitCardContents()); // RAF-C, nach RAF-A+B
    };

    if (window.MathJax) {
        MathJax.typesetPromise().then(() => requestAnimationFrame(reveal));
    } else {
        requestAnimationFrame(reveal);
    }
}

// --------------------------------------------------------
// KARTE ERSTELLEN
// --------------------------------------------------------
function createCardUI(card, isHand, index, isZoom = false) {
    const cardEl = document.createElement('div');
    cardEl.className = `card ${card.isFlipped ? 'flipped' : ''}`;
    if (card._uid !== undefined) cardEl.dataset.uid = card._uid;

    // Zoom per Klick / Tap (außer im Zoom selbst)
    if (!isZoom) {
        cardEl.addEventListener('click', (e) => {
            if (isDragging) return;
            showZoom(card, card.isFlipped);
        });
    }

    const draggable = !isZoom && (isHand || (currentGameMode === 'risk' && !card.isFlipped));

    if (draggable) {
        // --- Desktop Drag & Drop ---
        cardEl.draggable = true;
        cardEl.ondragstart = (e) => {
            if (draggingBlocked) { e.preventDefault(); return; }
            e.dataTransfer.setData('idx',    index);
            e.dataTransfer.setData('isHand', isHand);
            // Drag-Image: kurz Rotation aufheben, dann Snapshot nehmen
            const wasFlipped = cardEl.classList.contains('flipped');
            cardEl.style.transition = 'none';
            cardEl.style.transform  = 'perspective(800px) rotateY(0deg)';
            const rect = cardEl.getBoundingClientRect();
            e.dataTransfer.setDragImage(cardEl, e.clientX - rect.left, e.clientY - rect.top);
            setTimeout(() => {
                cardEl.style.transition = '';
                cardEl.style.transform  = '';
                if (wasFlipped) cardEl.classList.add('flipped');
                cardEl.classList.add('dragging');
            }, 0);
        };
        cardEl.ondragend = () => {
            cardEl.classList.remove('dragging');
            document.querySelectorAll('.placeholder').forEach(p => p.remove());
        };

        // --- Touch Drag & Drop ---
        setupTouchDrag(cardEl, index, isHand);
    }

    const hasLinks = card.furtherInformation && card.furtherInformation.length > 0;
    const infoIconHTML = hasLinks
        ? `<button class="further-info-icon" title="Weiterführende Infos">🔗</button>`
        : '';

    const hasRange = card.startvalue !== card.endvalue;
    const rangeStarHTML = hasRange
        ? `<button class="range-star-icon" title="Akzeptierter Zeitraum">✱</button>`
        : '';

    cardEl.innerHTML = `
        <div class="card-front">
            <div class="card-title-wrapper">
                <div class="card-title">${card.title}</div>
            </div>
            <div class="card-text">${card.fronttext}</div>
        </div>
        <div class="card-back">
            <div class="card-title-wrapper">
                <div class="card-title">${card.title}</div>
            </div>
            <div class="back-year-wrap">
                <div class="back-year">${card.valuetext}</div>${rangeStarHTML}
            </div>
            <div class="card-text back-text">${card.backtext}</div>
            ${infoIconHTML}
        </div>
    `;

    // Range-Stern Tooltip
    if (hasRange) {
        const starBtn = cardEl.querySelector('.range-star-icon');
        const rangeLinks = [formatRange(card.startvalue, card.endvalue)];
        starBtn.addEventListener('pointerenter', (e) => {
            if (e.pointerType !== 'mouse') return;
            clearTimeout(furtherInfoHideTimer);
            showFurtherInfoTooltip(starBtn, rangeLinks, 'Akzeptierter Zeitraum');
        });
        starBtn.addEventListener('pointerleave', (e) => {
            if (e.pointerType !== 'mouse') return;
            furtherInfoHideTimer = setTimeout(hideFurtherInfoTooltip, 250);
        });
        starBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tip = document.getElementById('further-info-tooltip');
            if (tip && tip._source === starBtn && tip.style.display !== 'none') {
                hideFurtherInfoTooltip();
            } else {
                clearTimeout(furtherInfoHideTimer);
                showFurtherInfoTooltip(starBtn, rangeLinks, 'Akzeptierter Zeitraum');
            }
        });
    }

    if (hasLinks) {
        const iconBtn = cardEl.querySelector('.further-info-icon');
        iconBtn.addEventListener('pointerenter', (e) => {
            if (e.pointerType !== 'mouse') return;
            clearTimeout(furtherInfoHideTimer);
            showFurtherInfoTooltip(iconBtn, card.furtherInformation, 'Weiterführende Infos');
        });
        iconBtn.addEventListener('pointerleave', (e) => {
            if (e.pointerType !== 'mouse') return;
            furtherInfoHideTimer = setTimeout(hideFurtherInfoTooltip, 250);
        });
        iconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tip = document.getElementById('further-info-tooltip');
            if (tip && tip._source === iconBtn && tip.style.display !== 'none') {
                hideFurtherInfoTooltip();
            } else {
                clearTimeout(furtherInfoHideTimer);
                showFurtherInfoTooltip(iconBtn, card.furtherInformation, 'Weiterführende Infos');
            }
        });
    }

    return cardEl;
}

// --------------------------------------------------------
// TOUCH DRAG & DROP
// --------------------------------------------------------
function setupTouchDrag(cardEl, index, isHand) {
    let startX = 0, startY = 0, localDragging = false;

    cardEl.addEventListener('touchstart', (e) => {
        if (draggingBlocked) return;
        // Ändert --card-h für das gesamte Projekt
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        localDragging = false;
        touchDrag = { idx: index, isHand, cardEl };
    }, { passive: true });

    cardEl.addEventListener('touchmove', (e) => {
        if (!touchDrag || touchDrag.cardEl !== cardEl) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        if (!localDragging && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            localDragging = true;
            isDragging    = true;
            createTouchGhost(cardEl, startX, startY);
            cardEl.classList.add('dragging');
        }
        if (localDragging && ghostEl) {
            e.preventDefault();
            const t = e.touches[0];
            ghostEl.style.left = (t.clientX - ghostEl._ox) + 'px';
            ghostEl.style.top  = (t.clientY - ghostEl._oy) + 'px';
            updateTouchPlaceholder(t.clientX, t.clientY);
        }
    }, { passive: false });

    cardEl.addEventListener('touchend', () => {
        if (localDragging && touchDrag) performTouchDrop();
        cleanupTouchDrag(cardEl);
        localDragging = false;
    });

    cardEl.addEventListener('touchcancel', () => {
        cleanupTouchDrag(cardEl);
        localDragging = false;
    });
}

function createTouchGhost(sourceEl, touchX, touchY) {
    if (ghostEl) { ghostEl.remove(); ghostEl = null; }
    ghostEl = sourceEl.cloneNode(true);
    // Ghost zeigt immer Vorderseite (kein 'flipped')
    ghostEl.classList.remove('flipped');
    ghostEl.classList.add('touch-ghost');
    const rect = sourceEl.getBoundingClientRect();
    ghostEl.style.width  = rect.width  + 'px';
    ghostEl.style.height = rect.height + 'px';
    ghostEl._ox = touchX - rect.left;
    ghostEl._oy = touchY - rect.top;
    ghostEl.style.left = (touchX - ghostEl._ox) + 'px';
    ghostEl.style.top  = (touchY - ghostEl._oy) + 'px';
    document.body.appendChild(ghostEl);
}

function cleanupTouchDrag(cardEl) {
    if (ghostEl) { ghostEl.remove(); ghostEl = null; }
    cardEl.classList.remove('dragging');
    document.querySelectorAll('.placeholder').forEach(p => p.remove());
    touchDrag = null;
    setTimeout(() => { isDragging = false; }, 60);
}

function updateTouchPlaceholder(clientX, clientY) {
    // Wenn Finger im Handbereich → Placeholder entfernen
    const handArea = document.getElementById('hand-area');
    const handRect = handArea ? handArea.getBoundingClientRect() : null;
    if (handRect && clientY >= handRect.top) {
        document.querySelectorAll('.placeholder').forEach(p => p.remove());
        return;
    }

    const timelineEl = document.getElementById('timeline');
    const afterEl    = getDragAfterElement(timelineEl, clientX);

    let ph = document.querySelector('.placeholder');
    if (!ph) {
        ph = document.createElement('div');
        ph.className = 'placeholder';
    }
    if (!afterEl) timelineEl.appendChild(ph);
    else          timelineEl.insertBefore(ph, afterEl);
}

function performTouchDrop() {
    if (draggingBlocked) { document.querySelectorAll('.placeholder').forEach(p => p.remove()); return; }
    const timelineEl = document.getElementById('timeline');
    const ph = document.querySelector('.placeholder');
    if (!ph || !touchDrag) return;

    const { idx, isHand } = touchDrag;
    const targetIdx = [...timelineEl.children].indexOf(ph);
    ph.remove();

    if (isHand) {
        const card = hand.splice(idx, 1)[0];
        timeline.splice(targetIdx, 0, card);
        if (currentGameMode === 'direct') checkAndFlip(card);
        drawCard();
    } else {
        const card  = timeline.splice(idx, 1)[0];
        const newIdx = (targetIdx > idx) ? targetIdx - 1 : targetIdx;
        timeline.splice(newIdx, 0, card);
    }
    updateUI();
}

// --------------------------------------------------------
// DESKTOP DRAG & DROP
// --------------------------------------------------------
function getDragAfterElement(container, clientX) {
    const cards = [...container.querySelectorAll('.card:not(.dragging)')];
    return cards.reduce((closest, child) => {
        const box    = child.getBoundingClientRect();
        const offset = clientX - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) return { offset, element: child };
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

(function _setupDragDrop() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _setupDragDrop);
        return;
    }
    const timelineArea = document.getElementById('timeline-area');

    timelineArea.ondragover = (e) => {
        e.preventDefault();
        const timelineEl = document.getElementById('timeline');
        const afterEl    = getDragAfterElement(timelineEl, e.clientX);
        let ph = document.querySelector('.placeholder');
        if (!ph) { ph = document.createElement('div'); ph.className = 'placeholder'; }
        if (!afterEl) timelineEl.appendChild(ph);
        else          timelineEl.insertBefore(ph, afterEl);
    };

    timelineArea.ondrop = (e) => {
        e.preventDefault();
        if (draggingBlocked) { document.querySelectorAll('.placeholder').forEach(p => p.remove()); return; }
        const timelineEl = document.getElementById('timeline');
        const idx     = parseInt(e.dataTransfer.getData('idx'));
        const isHand  = e.dataTransfer.getData('isHand') === 'true';
        const ph      = document.querySelector('.placeholder');
        if (!ph) return;
        const targetIdx = [...timelineEl.children].indexOf(ph);
        ph.remove();

        if (isHand) {
            const card = hand.splice(idx, 1)[0];
            timeline.splice(targetIdx, 0, card);
            if (currentGameMode === 'direct') checkAndFlip(card);
            drawCard();
        } else {
            const card  = timeline.splice(idx, 1)[0];
            const newIdx = (targetIdx > idx) ? targetIdx - 1 : targetIdx;
            timeline.splice(newIdx, 0, card);
        }
        updateUI();
    };

    // Placeholder entfernen wenn Karte in den Handbereich zurückgezogen wird
    const handArea = document.getElementById('hand-area');
    handArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        document.querySelectorAll('.placeholder').forEach(p => p.remove());
    });

    
    // resize wird ausschließlich über _onResize (debounced) behandelt

    // Leertaste / Enter löst "Weiter"-Button aus (egal wo Fokus liegt)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            const btn = document.getElementById('round-result-btn');
            const bar = document.getElementById('round-result-bar');
            if (btn && bar && (bar.classList.contains('correct') || bar.classList.contains('wrong'))) {
                e.preventDefault();
                btn.click();
            }
        }
    });
}());

// --------------------------------------------------------
// SPIELLOGIK
// --------------------------------------------------------
function checkAndFlip(card) {
    flipPending = true;
    setTimeout(() => {
        const el = document.querySelector(`#timeline [data-uid="${card._uid}"]`);
        if (el) el.classList.add('flipped');
        card.isFlipped = true;
        triggerMathJax();

        setTimeout(() => {
            flipPending = false;
            if (!isValidOrder()) {
                showRoundResult('✗ Falsche Position! Du kannst die Karte noch anklicken, um die Rückseite zu lesen.', false, () => {
                    timeline = timeline.filter(c => c !== card);
                    renderTimeline();
                    triggerMathJax();
                    checkDirectGameOver();
                });
            } else {
                score = timeline.filter(c => c.isFlipped).length;
                renderStats();
                checkDirectGameOver();
            }
        }, 750);
    }, 300);
}

function checkDirectGameOver() {
    if (!gameOverShown && currentGameMode === 'direct' && hand.length === 0 && deck.length === 0) {
        gameOverShown = true;
        setTimeout(showGameOver, 800);
    }
}

function isValidOrder() {
    for (let i = 0; i < timeline.length - 1; i++) {
        // Korrekt wenn sich die Zeiträume überlappen ODER strikt geordnet sind
        // Überlappung: endvalue[i] >= startvalue[i+1] ist FALSCH nur wenn
        // der gesamte Bereich von i vollständig nach i+1 liegt
        if (timeline[i].endvalue < timeline[i].startvalue) continue; // Datenfehler ignorieren
        if (timeline[i + 1].endvalue < timeline[i + 1].startvalue) continue;
        // Keine Überlappung wenn i vollständig rechts von i+1 liegt
        if (timeline[i].startvalue > timeline[i + 1].endvalue) return false;
    }
    return true;
}

function drawCard() {
    if (deck.length > 0 && hand.length < 5) {
        hand.push(deck.pop());
    }
}

function revealRisk() {
    // Alle Karten nacheinander animiert umdrehen
    timeline.forEach((card, i) => {
        setTimeout(() => {
            const el = document.querySelector(`#timeline [data-uid="${card._uid}"]`);
            if (el) el.classList.add('flipped');
            card.isFlipped = true;
        }, i * 120);
    });

    const totalDelay = timeline.length * 120 + 650;
    setTimeout(() => {
        const correct = isValidOrder();
        const n      = timeline.length;
        const points  = correct ? n * (n + 1) / 2 : 0;
        if (correct) score += points;

        const msg = correct
            ? `✓ Richtig! Du erhältst <strong>+${points} Punkte</strong>.`
            : `✗ Leider falsch – die Reihenfolge stimmt nicht.`;

        showRoundResult(msg, correct, () => {
            timeline = [];
            // Risiko: nach Wertung → Spiel vorbei wenn kein Nachziehstapel mehr
            if (deck.length === 0) {
                showGameOver();
                return;
            }
            const next = deck.pop();
            next.isFlipped = false; // Risikovariante: verdeckt starten
            timeline.push(next);
            drawCard();
            updateUI();
        });
    }, totalDelay);
}

// --------------------------------------------------------
// BENACHRICHTIGUNGEN (kein alert!)
// --------------------------------------------------------
function showToast(msg, type = 'info', duration = 2800) {
    const toast = document.getElementById('game-toast');
    if (!toast) return;
    toast.innerHTML   = msg;
    toast.className   = `game-toast ${type} show`;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

function showRoundResult(msg, correct, onContinue) {
    const bar   = document.getElementById('round-result-bar');
    const msgEl = document.getElementById('round-result-msg');
    const btn   = document.getElementById('round-result-btn');
    if (!bar) return;

    // Min-Height zurücksetzen damit die Leiste auf ihre natürliche Höhe wächst
    bar.style.minHeight = '';
    msgEl.innerHTML = msg;
    bar.className   = `round-result-bar ${correct ? 'correct' : 'wrong'}`;
    // Nach dem Paint die tatsächliche Höhe messen und als min-height einfrieren.
    // Dadurch bleibt das Layout beim Ausblenden stabil (Leiste schrumpft nicht).
    requestAnimationFrame(() => {
        const h = bar.offsetHeight;
        if (h > 0) bar.style.minHeight = h + 'px';
    });

    draggingBlocked = true;
    // Risiko-Button verstecken (visibility: hidden reserviert Platz – kein Layout-Shift)
    document.getElementById('reveal-risk-btn').style.visibility = 'hidden';

    btn.onclick = () => {
        bar.className = 'round-result-bar result-bar-placeholder';
        document.getElementById('reveal-risk-btn').style.visibility = '';
        draggingBlocked = false;
        onContinue();
    };
}

function showGameOver() {
    const el = document.getElementById('game-over');
    if (!el) return;
    document.getElementById('final-score-value').textContent = score;
    const bar = document.getElementById('round-result-bar');
    if (bar) bar.className = 'round-result-bar result-bar-placeholder';
    el.classList.remove('hidden');
}

// --------------------------------------------------------
// ZOOM MODAL
// --------------------------------------------------------
function showZoom(card, isCurrentlyFlipped) {
    const modal     = document.getElementById('zoom-modal');
    const container = modal.querySelector('.zoom-container');
    container.innerHTML = '';

    // Vorderseite
    const fCard = createCardUI(card, false, 0, true);
    fCard.classList.add('big');
    fCard.classList.remove('flipped');
    container.appendChild(fCard);

    // Rückseite (nur wenn Karte bereits aufgedeckt)
    if (isCurrentlyFlipped) {
        const bCard = createCardUI(card, false, 0, true);
        bCard.classList.add('big', 'flipped');
        container.appendChild(bCard);
    }

    // Inhalt unsichtbar bis Skalierung abgeschlossen
    container.style.opacity = '0';
    modal.classList.remove('hidden');

    const reveal = () => {
        fitCardContents(modal);
        container.style.transition = 'opacity 0.15s';
        container.style.opacity    = '1';
    };

    if (window.MathJax) {
        MathJax.typesetPromise([container]).then(() => requestAnimationFrame(reveal));
    } else {
        requestAnimationFrame(reveal);
    }
}

function closeZoom() {
    const modal = document.getElementById('zoom-modal');
    modal.classList.add('hidden');
    const container = modal.querySelector('.zoom-container');
    if (container) { container.style.transition = ''; container.style.opacity = '0'; }
}


// ================================================================
// GUESS-MODUS
// ================================================================

function startGuessGame() {
    score = 0;
    document.getElementById('timeline-area').classList.add('hidden');
    document.getElementById('hand-area').classList.add('hidden');
    document.getElementById('guess-area').classList.remove('hidden');
    document.getElementById('reveal-risk-btn').style.display = 'none';
    showNextGuessCard();
}

function showNextGuessCard() {
    if (guessDeck.length === 0) {
        document.getElementById('guess-area').classList.add('hidden');
        showGameOver();
        return;
    }

    guessCardShown = guessDeck.pop();

    // Karte rendern (Vorderseite, nicht aufgedeckt, kein Drag)
    const container = document.getElementById('guess-card-container');
    container.innerHTML = '';
    const cardEl = createCardUI(guessCardShown, false, 0, false);
    cardEl.classList.add('big');
    container.appendChild(cardEl);

    // Stats aktualisieren
    document.getElementById('remaining').innerText = guessDeck.length;
    document.getElementById('score').textContent = score;

    // Eingabe zurücksetzen und freigeben
    const input = document.getElementById('guess-input');
    input.value = '';
    input.disabled = false;
    input.removeAttribute('data-submitted');
    document.getElementById('guess-submit-btn').disabled = false;
    document.getElementById('guess-input-area').style.display = '';

    // MathJax + Textanpassung
    if (window.MathJax) {
        MathJax.typesetPromise([container]).then(() => {
            fitCardContents(container);
            document.querySelectorAll('#guess-card-container .card-front, #guess-card-container .card-back').forEach(el => {
                el.style.visibility = '';
            });
        });
    } else {
        fitCardContents(container);
    }

    // Fokus auf Eingabefeld
    setTimeout(() => input.focus(), 80);
}

// ── Toleranz-Formel für "Jahr schätzen" ──────────────────────────────────────
//
// Punktzahl:  pts = round(100 × max(0, (1 − diff/D_zero))^k)
//   D_zero  = ratio × D_fifty      (ratio = 3 für AD, 5 für BC)
//   k       = ln(0.5)/ln(1−1/ratio) → 50 Pkt exakt bei diff = D_fifty
//
// Kurvenform: konvex – anfangs steil, dann flach (unabhängig vom Intervall).
//
// ── AD-Ankerpunkte (year > 0) ─────────────────────────────────────────────
//   Jahr 2010  (age ≈  16):  Boden greift  → rot ab  10 J, 0 Pkt ab  30 J
//   Jahr 1600  (age ≈ 426):  D_fifty = 30  → rot ab  30 J, 0 Pkt ab  90 J
//   Jahr ~100  (age ≈ 1926): D_fifty = 65  → rot ab  65 J, 0 Pkt ab 195 J
//   Formel: D_fifty = max(10, _AD_C × age^_AD_ALPHA)
//           Koeffizienten passen exakt durch (age=426 → 30) und (age=1926 → 65)
//
// ── BC-Ankerpunkte (year ≤ 0) ─────────────────────────────────────────────
//   Jahr   0  (age = CURRENT_YEAR): stetig an AD anschließend
//   3000 v.Chr. (age ≈ 5026):      D_fifty = 200 → rot ab 200 J, 0 Pkt ab 1000 J
//   Formel: D_fifty = _BC_C × age^_BC_ALPHA   (kein Boden nötig)
//           α_BC > α_AD → deutlich schnelleres Wachstum ab Jahr 0
//
// Informatik: factor = 0.5 halbiert alle Toleranzen (Boden sinkt auf 5 J).

// AD: Fit durch (age=426 → D_fifty=30) und (age=1926 → D_fifty=65)
const _AD_ALPHA = Math.log(65 / 30) / Math.log(1926 / 426);   // ≈ 0.512
const _AD_C     = 30 / Math.pow(426, _AD_ALPHA);               // ≈ 1.348
const _AD_FLOOR = 10;
const _AD_RATIO = 3;   // D_zero = 3 × D_fifty  →  k = ln(2)/ln(3/2) ≈ 1.71

// BC: stetig anschließend bei Jahr 0; Ankerpunkt 3000 v.Chr. → D_fifty = 200
const _BC_AGE0    = CURRENT_YEAR;   // Alter bei Jahr 0
const _BC_D50_AT0 = Math.max(_AD_FLOOR, _AD_C * Math.pow(_BC_AGE0, _AD_ALPHA));
const _BC_AGE_ANC = CURRENT_YEAR + 3000;   // Alter bei 3000 v.Chr.
const _BC_ALPHA   = Math.log(200 / _BC_D50_AT0) / Math.log(_BC_AGE_ANC / _BC_AGE0); // ≈ 1.21
const _BC_C       = _BC_D50_AT0 / Math.pow(_BC_AGE0, _BC_ALPHA);
const _BC_RATIO   = 5;   // D_zero = 5 × D_fifty  →  k = ln(2)/ln(5/4) ≈ 3.11

function _guessTolerances(age, midYear) {
    const factor = (typeof window !== 'undefined' && window.SUBJECT === 'informatik') ? 0.5 : 1.0;
    let D_fifty, D_zero;

    if (midYear <= 0) {
        // BC-Formel: stärkeres Wachstum, weiteres Intervall (Verhältnis 1:5)
        D_fifty = _BC_C * Math.pow(age, _BC_ALPHA);
        D_zero  = _BC_RATIO * D_fifty;
    } else {
        // AD-Formel: Verhältnis 1:3
        D_fifty = Math.max(_AD_FLOOR, _AD_C * Math.pow(Math.max(age, 0.1), _AD_ALPHA));
        D_zero  = _AD_RATIO * D_fifty;
    }

    return { zero: D_zero * factor, fifty: D_fifty * factor };
}

function calcGuessPoints(guessYear, card) {
    const lo = Math.min(card.startvalue, card.endvalue);
    const hi = Math.max(card.startvalue, card.endvalue);
    const bestYear = Math.max(lo, Math.min(hi, guessYear));
    const diff = Math.abs(guessYear - bestYear);
    if (diff === 0) return 100;

    const midYear = (lo + hi) / 2;
    const age = Math.abs(CURRENT_YEAR - midYear);
    const { zero: D_zero, fifty: D_fifty } = _guessTolerances(age, midYear);

    if (diff >= D_zero) return 0;

    // k aus der 50-Punkte-Bedingung ableiten
    const r = Math.min(Math.max(D_fifty / D_zero, 0.01), 0.99);
    const k = Math.log(0.5) / Math.log(1 - r);
    return Math.max(0, Math.round(100 * Math.pow(1 - diff / D_zero, k)));
}

function submitGuess() {
    const input = document.getElementById('guess-input');
    if (input.disabled || input.dataset.submitted) return;

    const raw = input.value.trim();
    if (raw === '') {
        showToast('Bitte eine Jahreszahl eingeben!', 'wrong', 1500);
        input.focus();
        return;
    }
    const guessYear = parseInt(raw, 10);
    if (isNaN(guessYear)) {
        showToast('Ungültige Eingabe – bitte eine Zahl tippen.', 'wrong', 1500);
        input.focus();
        return;
    }

    input.disabled = true;
    input.dataset.submitted = '1';
    document.getElementById('guess-submit-btn').disabled = true;

    const card = guessCardShown;
    const lo   = Math.min(card.startvalue, card.endvalue);
    const hi   = Math.max(card.startvalue, card.endvalue);
    const bestYear = Math.max(lo, Math.min(hi, guessYear));
    const diff     = Math.abs(guessYear - bestYear);
    const pts      = calcGuessPoints(guessYear, card);
    score += pts;

    // Karte umdrehen
    const cardEl = document.querySelector('#guess-card-container .card');
    if (cardEl) {
        setTimeout(() => {
            cardEl.classList.add('flipped');
            card.isFlipped = true;
            if (window.MathJax) {
                MathJax.typesetPromise([cardEl]).then(() => fitCardContents(cardEl));
            }
        }, 180);
    }

    // Ergebnis-Nachricht aufbauen
    const fmtYear = y => y < 0 ? `${Math.abs(y)} v. Chr.` : `${y}`;
    const guessDisplay  = fmtYear(guessYear);
    const answerDisplay = card.valuetext;
    let diffNote = '';
    if (diff > 0) {
        const diffDisplay = diff === 1 ? '1 Jahr' : `${diff} Jahre`;
        diffNote = ` &nbsp;·&nbsp; Abweichung: ${diffDisplay}`;
    }

    const msg = diff === 0
        ? `🎯 Perfekt! <strong>${guessDisplay}</strong> – korrekt! &nbsp;<strong>+${pts} Punkte</strong>`
        : `Schätzung: <strong>${guessDisplay}</strong> &nbsp;·&nbsp; Richtig: <strong>${answerDisplay}</strong>${diffNote} &nbsp;→&nbsp; <strong>+${pts} Punkte</strong>`;

    const isGood = pts >= 50;

    setTimeout(() => {
        document.getElementById('score').textContent = score;
        showRoundResult(msg, isGood, () => {
            showNextGuessCard();
        });
    }, 750);
}

// --------------------------------------------------------
// KEYBOARD SHORTCUTS
// --------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        const bar = document.getElementById('round-result-bar');
        if (bar && (bar.classList.contains('correct') || bar.classList.contains('wrong'))) {
            e.preventDefault();
            document.getElementById('round-result-btn')?.click();
            return;
        }
        // Im Guess-Modus: Enter/Leertaste löst Eingabe aus, außer Fokus liegt im Inputfeld.
        // Nur wenn tatsächlich ein Wert eingetragen ist – sonst keine Warnung, nur Fokus setzen.
        if (currentGameMode === 'guess' && document.activeElement?.id !== 'guess-input') {
            const inputEl = document.getElementById('guess-input');
            if (inputEl && !inputEl.disabled && inputEl.value.trim() !== '') {
                e.preventDefault();
                submitGuess();
            } else if (inputEl && !inputEl.disabled) {
                e.preventDefault();
                inputEl.focus();
            }
        }
    }
});

// --------------------------------------------------------
// START
// --------------------------------------------------------
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
