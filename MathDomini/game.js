let deck = [], hand = [], timeline = [], score = 0, startcardsToPlay = 20, cardsToPlay = startcardsToPlay, activeFilters = [];
let currentGameMode = 'direct';

function scaleToFit(el) {
    if (!el) return;
    el.style.transform = 'none';
    const wrapper = el.parentElement;
    if (!wrapper) return;

    requestAnimationFrame(() => {
        const availableW = wrapper.clientWidth;
        const availableH = wrapper.clientHeight;
        const naturalW = el.scrollWidth;
        const naturalH = el.scrollHeight;

        if (naturalW > availableW || naturalH > availableH) {
            const scale = Math.min(availableW / naturalW, availableH / naturalH) * 0.95;
            el.style.transform = `scale(${scale})`;
        }
    });
}

function updateAllScales() {
    document.querySelectorAll('.scale-el').forEach(scaleToFit);
}

// --------------------------------------------------------
// URL-SYNC & LOBBY LOGIK
// --------------------------------------------------------
function updateURL() {
    const mode = document.getElementById('mode-toggle').checked ? 'risk' : 'direct';
    const currentTags = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('mode', mode);
    
    if (currentTags.length > 0) {
        urlParams.set('tags', currentTags.join(','));
    } else {
        urlParams.delete('tags');
    }
    
    // Ersetzt den URL-String ohne die Seite neu zu laden
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}

function updateMode() {
    const isRisk = document.getElementById('mode-toggle').checked;
    const desc = document.getElementById('mode-description');

    if (isRisk) {
        desc.innerHTML = "<b>Risiko-Variante:</b> Hier ist echtes Expertenwissen gefragt! Du platzierst die Karten blind im Zeitstrahl und siehst die Jahreszahlen nicht. Erst wenn du auf 'Reihe werten' klickst, werden alle Karten auf einmal aufgedeckt. Ist die chronologische Reihenfolge fehlerfrei, winken dir exponentiell mehr Punkte. Aber Vorsicht: Schon ein einziger Fehler bringt dir null Punkte für die gesamte Reihe!";
    } else {
        desc.innerHTML = "<b>Direktes Aufdecken:</b> In diesem Modus bekommst du sofortiges Feedback. Sobald du eine Karte an eine Position im Zeitstrahl ziehst, wird sie umgedreht und ihr historisches Datum wird sichtbar. Stimmt die Position im Verhältnis zu den bereits liegenden Karten nicht, meldet das Spiel den Fehler und die Karte wird sofort aussortiert. Ideal zum Lernen und Herantasten an die Epochen.";
    }
    updateURL();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('mode', document.getElementById('mode-toggle').checked ? 'risk' : 'direct');
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}

function init() {
    // 1. Lese URL-Parameter aus
    const params = new URLSearchParams(window.location.search);
    const urlTags = params.get('tags') ? params.get('tags').split(',') : [];
    const urlMode = params.get('mode');

    // 2. Setze Modus-Switch basierend auf URL
    const modeToggle = document.getElementById('mode-toggle');
    if (urlMode === 'direct') {
        modeToggle.checked = false;
    } else {
        modeToggle.checked = true; // Standardmäßig 'risk'
    }
    updateMode(); // UI für den Switch initialisieren

    // 3. Generiere Tag-Filter und setze aktiven Status basierend auf URL
    const allTags = [...new Set(cardPool.flatMap(c => c.tags))];
    const container = document.getElementById('tag-filters');
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.innerText = tag;
        btn.className = 'tag-btn';
        if (urlTags.includes(tag)) {
            btn.classList.add('active');
        }
        btn.onclick = () => {
            btn.classList.toggle('active');
            updateURL(); // Bei Klick URL aktualisieren
        };
        container.appendChild(btn);
    });
}

function startNewGame() {
    currentGameMode = document.getElementById('mode-toggle').checked ? 'risk' : 'direct';
    activeFilters = [...document.querySelectorAll('.tag-btn.active')].map(b => b.innerText);
    
    score = 0; cardsToPlay = startcardsToPlay; timeline = []; hand = [];
    let pool = activeFilters.length > 0 ? cardPool.filter(c => c.tags.some(t => activeFilters.includes(t))) : cardPool;
    deck = JSON.parse(JSON.stringify(pool)).sort(() => Math.random() - 0.5);
    
    document.getElementById('lobby').classList.add('hidden');
    
    if (deck.length > 0) {
        let first = deck.pop();
        first.isFlipped = (currentGameMode === 'direct');
        timeline.push(first);
    }
    
    for (let i = 0; i < 5; i++) {cardsToPlay++;drawCard();}
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
    // document.getElementById('remaining').innerText = deck.length;
}

function renderStats() {
    document.getElementById('score').innerText = score;
    document.getElementById('remaining').innerText = cardsToPlay;
    document.getElementById('reveal-risk-btn').style.display = (currentGameMode === 'risk') ? 'block' : 'none';
}

function renderTimeline() {
    const timelineContainer = document.getElementById('timeline');
    timelineContainer.innerHTML = '';
    timeline.forEach((card, i) => timelineContainer.appendChild(createCardUI(card, false, i)));
    adjustTimelineZoom(); // Neu: Automatischer Zoom-Out nach dem Rendern
}

function renderHand() {
    const handContainer = document.getElementById('hand');
    handContainer.innerHTML = '';
    hand.forEach((card, i) => handContainer.appendChild(createCardUI(card, true, i)));
}

function triggerMathJax() {
    if (window.MathJax) {
        MathJax.typesetPromise().then(updateAllScales);
    } else {
        updateAllScales();
    }
}

function createCardUI(card, isHand, index, isZoom = false) {
    const cardEl = document.createElement('div');
    cardEl.className = `card ${card.isFlipped ? 'flipped' : ''}`;
    
    if (!isZoom && (isHand || (currentGameMode === 'risk' && !card.isFlipped))) {
        cardEl.draggable = true;
        cardEl.ondragstart = (e) => {
            e.dataTransfer.setData('idx', index);
            e.dataTransfer.setData('isHand', isHand);
            
            const rect = cardEl.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const wasFlipped = cardEl.classList.contains('flipped');
            cardEl.classList.remove('flipped');
            
            e.dataTransfer.setDragImage(cardEl, offsetX, offsetY);

            setTimeout(() => {
                if (wasFlipped) cardEl.classList.add('flipped'); 
                cardEl.classList.add('dragging'); 
            }, 0);
        };
        
        cardEl.ondragend = () => {
            cardEl.classList.remove('dragging');
            document.querySelectorAll('.placeholder').forEach(p => p.remove());
        };
    }

    if (!isZoom) {
        cardEl.onclick = () => showZoom(card, card.isFlipped);
    }

    const titleTooltip = card.title ? card.title.replace(/"/g, '&quot;') : "";

    // Dynamische Schriftgröße basierend auf Zeichenlänge
    const getFontSize = (text) => {
        if (text.length > 150) return '0.75rem';
        if (text.length > 80) return '0.85rem';
        return '1rem';
    };

    const frontFontSize = getFontSize(card.fronttext || "");
    const backFontSize = getFontSize(card.backtext || "");

    const linksHTML = (card.furtherInformation && card.furtherInformation.length > 0)
        ? `<div class="extra-info" style="position:absolute;bottom:5px;width:100%;font-size:0.6em;text-align:center;">
            Weitere Infos: ${card.furtherInformation.map((link, i) => `<a href="${link}" target="_blank" onclick="event.stopPropagation()">[${i+1}]</a>`).join(', ')}
           </div>`
        : '';

    cardEl.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <div class="card-title-wrapper">
                    <div class="card-title scale-el">${card.title}</div>
                </div>
                <div class="scale-wrapper" style="font-size: ${frontFontSize};">
                    <div class="scale-el">${card.fronttext}</div>
                </div>
            </div>
            <div class="card-back">
                <div class="card-title-wrapper">
                    <div class="card-title scale-el">${card.title}</div>
                </div>
                <div class="back-year">${card.valuetext}</div>
                <div class="scale-wrapper" style="font-size: ${backFontSize};">
                    <div class="scale-el">${card.backtext}</div>
                </div>
                ${linksHTML}
            </div>
        </div>
    `;
    return cardEl;
}

function adjustTimelineZoom() {
    const container = document.getElementById('timeline');
    const area = document.getElementById('timeline-area');
    if (!container || !area) return;

    // Reset scale to calculate true width
    container.style.transform = 'scale(1)';
    
    const totalWidth = container.scrollWidth;
    const availableWidth = area.clientWidth - 40; // minus Padding

    if (totalWidth > availableWidth) {
        const scale = availableWidth / totalWidth;
        // Wir begrenzen den Zoom-out auf minimal 0.5, damit es lesbar bleibt
        container.style.transform = `scale(${Math.max(scale, 0.5)})`;
    }
}

// In renderTimeline am Ende einfügen:
function renderTimeline() {
    const container = document.getElementById('timeline');
    container.innerHTML = '';
    timeline.forEach((card, i) => container.appendChild(createCardUI(card, false, i)));
    
    // Neu:
    setTimeout(adjustTimelineZoom, 50); 
}

// --------------------------------------------------------
// DRAG & DROP 
// --------------------------------------------------------
const timelineArea = document.getElementById('timeline-area');

timelineArea.ondragover = (e) => {
    e.preventDefault();
    const timelineEl = document.getElementById('timeline');
    const afterEl = getDragAfterElement(timelineEl, e.clientX);
    const placeholder = document.querySelector('.placeholder') || document.createElement('div');
    
    placeholder.className = 'placeholder';
    placeholder.style.width = '6px'; 
    placeholder.style.height = '230px'; 
    placeholder.style.background = '#3498db';
    placeholder.style.borderRadius = '3px';
    placeholder.style.flexShrink = '0'; 
    
    if (!afterEl) timelineEl.appendChild(placeholder);
    else timelineEl.insertBefore(placeholder, afterEl);
};

timelineArea.ondrop = (e) => {
    e.preventDefault();
    const timelineEl = document.getElementById('timeline');
    const idx = parseInt(e.dataTransfer.getData('idx'));
    const isHand = e.dataTransfer.getData('isHand') === 'true';
    const placeholder = document.querySelector('.placeholder');
    
    if (!placeholder) return;

    const targetIdx = [...timelineEl.children].indexOf(placeholder);
    placeholder.remove();

    if (isHand) {
        const card = hand.splice(idx, 1)[0];
        timeline.splice(targetIdx, 0, card);
        
        if (currentGameMode === 'direct') {
            checkAndFlip(card);
        }
        drawCard();
    } else {
        const card = timeline.splice(idx, 1)[0];
        const newIdx = (targetIdx > idx) ? targetIdx - 1 : targetIdx;
        timeline.splice(newIdx, 0, card);
    }
    updateUI();
};

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) return { offset, element: child };
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// --------------------------------------------------------
// SPIELLOGIK
// --------------------------------------------------------
function checkAndFlip(card) {
    setTimeout(() => {
        card.isFlipped = true;
        renderTimeline();
        triggerMathJax();
        
        setTimeout(() => {
            if (!isValidOrder()) {
                alert("Falsche Position!");
                timeline = timeline.filter(c => c !== card); 
                renderTimeline();
                triggerMathJax();
            }
        }, 800);
    }, 300);
}

function isValidOrder() {
    for (let i = 0; i < timeline.length - 1; i++) {
        // Die linke Karte (i) darf nicht NACH der rechten Karte (i+1) enden
        if (timeline[i].endvalue > timeline[i+1].startvalue) return false;
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
    timeline.forEach(c => c.isFlipped = true);
    renderTimeline();
    triggerMathJax();
    setTimeout(() => {
        if (isValidOrder()) {
            const p = Math.pow(2, timeline.length) - 1;
            score += p;
            alert(`Korrekt! +${p} Punkte.`);
        } else {
            alert("Die Reihe war leider falsch.");
        }
        timeline = [];
        if (deck.length > 0 && cardsToPlay > 0) {
            let next = deck.pop();
            next.isFlipped = (currentGameMode === 'direct');
            timeline.push(next);
            cardsToPlay--;
        } else {
            alert("Keine Karten mehr im Deck! Das Spiel wird neu gestartet.");
            startNewGame();
            return;
        }
        updateUI();
    }, 1200);
}

// --------------------------------------------------------
// ZOOM-MODAL
// --------------------------------------------------------
function showZoom(card, isCurrentlyFlipped) {
    const modal = document.getElementById('zoom-modal');
    const container = modal.querySelector('.zoom-container');
    container.innerHTML = '';
    
    const fCard = createCardUI(card, false, 0, true);
    fCard.classList.add('big'); 
    fCard.classList.remove('flipped');
    container.appendChild(fCard);
    
    if (isCurrentlyFlipped) {
        const bCard = createCardUI(card, false, 0, true);
        bCard.classList.add('big', 'flipped');
        container.appendChild(bCard);
    }
    
    modal.classList.remove('hidden');
    triggerMathJax();
}

function closeZoom() { document.getElementById('zoom-modal').classList.add('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('mode')) {
        urlParams.set('mode', 'direct');
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
    // Checkbox passend zum URL-Parameter setzen
    document.getElementById('mode-toggle').checked = (urlParams.get('mode') === 'risk');
});

window.onload = init;