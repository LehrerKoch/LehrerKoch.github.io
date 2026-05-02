// --------------------------------------------------------
// STATE
// --------------------------------------------------------
let deck = [], hand = [], timeline = [], score = 0;
let startcardsToPlay = 20, cardsToPlay = startcardsToPlay, activeFilters = [];
let currentGameMode = 'direct';
let gameOverShown = false;

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
// ZOOM-ANPASSUNG
// --------------------------------------------------------
function adjustTimelineZoom() {
    const container = document.getElementById('timeline');
    const area      = document.getElementById('timeline-area');
    if (!container || !area) return;
    container.style.transform = 'scale(1)';
    requestAnimationFrame(() => {
        const totalW     = container.scrollWidth;
        const available  = area.clientWidth - 20;
        if (totalW > available) {
            const scale = Math.max(available / totalW, 0.28);
            container.style.transform = `scale(${scale})`;
        }
    });
}

function adjustHandZoom() {
    const container = document.getElementById('hand');
    const area      = document.getElementById('hand-area');
    if (!container || !area) return;
    container.style.transform = 'scale(1)';
    requestAnimationFrame(() => {
        const totalW    = container.scrollWidth;
        const available = area.clientWidth - 20;
        if (totalW > available) {
            const scale = Math.max(available / totalW, 0.35);
            container.style.transform = `scale(${scale})`;
        }
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
        while (el.scrollHeight > wH + 1 && fs > 6 && tries < 40) {
            fs = Math.max(6, fs - 0.5);
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
        while (el.scrollHeight > maxH + 1 && fs > 6 && tries < 40) {
            fs = Math.max(6, fs - 0.5);
            el.style.fontSize = fs + 'px';
            tries++;
        }
    });

    // --- back-year: immer einzeilig (scrollWidth) ---
    root.querySelectorAll('.back-year').forEach(el => {
        el.style.fontSize = '';
        const maxW = el.offsetWidth;
        if (maxW < 4) return;
        let fs = parseFloat(getComputedStyle(el).fontSize);
        let tries = 0;
        while (el.scrollWidth > maxW + 1 && fs > 8 && tries < 40) {
            fs = Math.max(8, fs - 0.5);
            el.style.fontSize = fs + 'px';
            tries++;
        }
    });
}

// --------------------------------------------------------
// FURTHER INFO TOOLTIP
// --------------------------------------------------------
function showFurtherInfoTooltip(iconBtn, links) {
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

    const itemsHTML = links.map(item =>
        `<div class="finfo-item">${item.startsWith('http') ? `<a href="${item}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${item}</a>` : item}</div>`
    ).join('');
    tip.innerHTML = `<div class="finfo-header">Weiterführende Infos</div>${itemsHTML}`;

    tip.style.visibility = 'hidden';
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
        tip.style.visibility = 'visible';
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


function updateURL() {
    const mode = document.getElementById('mode-toggle').checked ? 'risk' : 'direct';
    const currentTags = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    const cards = document.getElementById('cards-slider')?.value || 20;
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
    const sliderVal = parseInt(document.getElementById('cards-slider')?.value || 20);
    const playable  = Math.min(sliderVal, pool.length);
    let el = document.getElementById('lobby-card-count');
    if (!el) return;
    el.textContent = activeTags.length > 0
        ? `${pool.length} Karten verfügbar (${playable} werden gespielt)`
        : `${pool.length} Karten verfügbar`;
}

function updateMode() {
    const isRisk = document.getElementById('mode-toggle').checked;
    const desc   = document.getElementById('mode-description');
    if (isRisk) {
        desc.innerHTML = "<b>Risiko-Variante:</b> Platziere die Karten blind im Zeitstrahl – die Jahreszahlen bleiben verborgen. Erst wenn du auf 'Reihe werten' klickst, werden alle Karten aufgedeckt. Ist die Reihenfolge fehlerfrei, erhältst du quadratisch steigende Punkte: bei n Karten n·(n+1)/2. Ein einziger Fehler bringt dir null Punkte für die gesamte Reihe!";
    } else {
        desc.innerHTML = "<b>Direktes Aufdecken:</b> Sofortiges Feedback: Sobald du eine Karte an eine Position ziehst, wird sie umgedreht. Stimmt die Position nicht, wird die Karte entfernt. Ideal zum Lernen!";
    }
    updateURL();
}

function init() {
    const params  = new URLSearchParams(window.location.search);
    const urlTags = params.get('tags') ? params.get('tags').split(',') : [];
    const urlMode = params.get('mode');
    const urlCards = parseInt(params.get('cards') || 20);

    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.checked = (urlMode === 'risk');
    updateMode();

    // Slider auf URL-Wert setzen
    const slider = document.getElementById('cards-slider');
    if (slider) {
        slider.value = Math.min(30, Math.max(1, urlCards));
        document.getElementById('slider-display').textContent = slider.value;
    }

    const allTags   = [...new Set(cardPool.flatMap(c => c.tags))];
    const container = document.getElementById('tag-filters');
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.innerText = tag;
        btn.className = 'tag-btn';
        if (urlTags.includes(tag)) btn.classList.add('active');

        // Short click: toggle; Long press: diesen als einzigen aktivieren
        let pressTimer = null;
        let didLongPress = false;

        const startPress = () => {
            didLongPress = false;
            pressTimer = setTimeout(() => {
                didLongPress = true;
                document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateURL();
            }, 500);
        };
        const cancelPress = () => clearTimeout(pressTimer);
        const endPress = () => {
            clearTimeout(pressTimer);
            if (!didLongPress) { btn.classList.toggle('active'); updateURL(); }
        };

        btn.addEventListener('mousedown',  startPress);
        btn.addEventListener('touchstart', startPress, { passive: true });
        btn.addEventListener('mouseup',    endPress);
        btn.addEventListener('touchend',   endPress);
        btn.addEventListener('mouseleave', cancelPress);
        btn.addEventListener('touchcancel', cancelPress);

        container.appendChild(btn);
    });
    updateLobbyCount();
}

function startNewGame() {
    const sliderVal = parseInt(document.getElementById('cards-slider')?.value || 20);
    startcardsToPlay = sliderVal;
    currentGameMode = document.getElementById('mode-toggle').checked ? 'risk' : 'direct';
    activeFilters   = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    gameOverShown   = false;
    updateURL(); // URL vor Spielstart sichern (wird nach reload wiederhergestellt)

    score = 0; cardsToPlay = startcardsToPlay; timeline = []; hand = [];
    let pool = activeFilters.length > 0
        ? cardPool.filter(c => c.tags.some(t => activeFilters.includes(t)))
        : cardPool;
    // Anzahl auf verfügbare Karten begrenzen
    if (cardsToPlay > pool.length) cardsToPlay = pool.length;
    startcardsToPlay = cardsToPlay;
    deck = JSON.parse(JSON.stringify(pool))
        .sort(() => Math.random() - 0.5)
        .map((c, i) => ({ ...c, _uid: i }));

    document.getElementById('lobby').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');

    if (deck.length > 0 && cardsToPlay > 0) {
        let first = deck.pop();
        first.isFlipped = (currentGameMode === 'direct');
        timeline.push(first);
        cardsToPlay--;
    }
    // Im Direct-Modus zählt die erste (aufgedeckte) Startkarte bereits als Punkt
    if (currentGameMode === 'direct') score = 1;
    // Initiale Hand: kostenlos (cardsToPlay++ kompensiert drawCard's decrement)
    for (let i = 0; i < 5; i++) { cardsToPlay++; drawCard(); }
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
    setTimeout(adjustTimelineZoom, 50);
}

function renderHand() {
    const container = document.getElementById('hand');
    container.innerHTML = '';
    hand.forEach((card, i) => container.appendChild(createCardUI(card, true, i)));
    setTimeout(adjustHandZoom, 50);
}

function triggerMathJax() {
    if (window.MathJax) {
        MathJax.typesetPromise().then(() => {
            setTimeout(adjustTimelineZoom, 30);
            setTimeout(adjustHandZoom,     30);
            setTimeout(fitCardContents,       30);
        });
    } else {
        setTimeout(adjustTimelineZoom, 30);
        setTimeout(adjustHandZoom,     30);
        setTimeout(fitCardContents,       30);
    }
}

// --------------------------------------------------------
// KARTE ERSTELLEN
// --------------------------------------------------------
function createCardUI(card, isHand, index, isZoom = false) {
    const cardEl = document.createElement('div');
    cardEl.className = `card ${card.isFlipped ? 'flipped' : ''}`;
    if (card._uid !== undefined) cardEl.dataset.uid = card._uid;

    // Zoom per Klick / Tap (auch auf umgedrehten Timeline-Karten)
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
            <div class="back-year">${card.valuetext}</div>
            <div class="card-text back-text">${card.backtext}</div>
            ${infoIconHTML}
        </div>
    `;

    if (hasLinks) {
        const iconBtn = cardEl.querySelector('.further-info-icon');
        iconBtn.addEventListener('mouseenter', () => {
            clearTimeout(furtherInfoHideTimer);
            showFurtherInfoTooltip(iconBtn, card.furtherInformation);
        });
        iconBtn.addEventListener('mouseleave', () => {
            furtherInfoHideTimer = setTimeout(hideFurtherInfoTooltip, 250);
        });
        iconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tip = document.getElementById('further-info-tooltip');
            if (tip && tip._source === iconBtn && tip.style.display !== 'none') {
                hideFurtherInfoTooltip();
            } else {
                clearTimeout(furtherInfoHideTimer);
                showFurtherInfoTooltip(iconBtn, card.furtherInformation);
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

document.addEventListener('DOMContentLoaded', () => {
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

    // URL-Default
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('mode')) {
        urlParams.set('mode', 'direct');
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
    document.getElementById('mode-toggle').checked = (urlParams.get('mode') === 'risk');

    window.addEventListener('resize', () => {
        adjustTimelineZoom();
        adjustHandZoom();
        fitCardContents();
    });

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
});

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
    if (deck.length > 0 && hand.length < 5 && cardsToPlay > 0) {
        hand.push(deck.pop());
        cardsToPlay--;
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
            if (deck.length > 0 && cardsToPlay > 0) {
                const next = deck.pop();
                next.isFlipped = (currentGameMode === 'direct');
                timeline.push(next);
                cardsToPlay--;
                updateUI();
            } else {
                showGameOver();
            }
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

    msgEl.innerHTML = msg;
    bar.className   = `round-result-bar ${correct ? 'correct' : 'wrong'}`;

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

// --------------------------------------------------------
// KEYBOARD SHORTCUTS
// --------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        const bar = document.getElementById('round-result-bar');
        if (bar && (bar.classList.contains('correct') || bar.classList.contains('wrong'))) {
            e.preventDefault();
            document.getElementById('round-result-btn')?.click();
        }
    }
});

// --------------------------------------------------------
// START
// --------------------------------------------------------
window.onload = init;
