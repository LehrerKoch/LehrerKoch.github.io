/* Formeln, die breiter sind als der Platz, werden verkleinert.
   Aufbau: <div class="scale-wrapper"><div class="scale-el"> … </div></div>

   Wichtig ist das Nachmessen: MathJax setzt die Formel erst nach und nach
   (Schriftarten, SVG-Aufbau), deshalb war die Breite beim ersten Messen oft
   noch zu klein und die fertige Formel lief dann über den Rand hinaus.
   Darum wird zweimal gemessen, nach dem Laden der Schriften erneut, und ein
   ResizeObserver rechnet nach, sobald sich die natürliche Breite noch ändert. */

function scaleToFit(el) {
    if (!el) return;
    const wrapper = el.parentElement;
    if (!wrapper) return;

    el.style.transformOrigin = 'top left';
    el.style.transform = 'none';
    wrapper.style.height = 'auto';

    // zwei Bilder warten: nach dem ersten steht das Layout, nach dem zweiten
    // auch die von MathJax nachgeladene Darstellung
    requestAnimationFrame(() => requestAnimationFrame(() => {
        const ws = getComputedStyle(wrapper);
        const available = wrapper.clientWidth - parseFloat(ws.paddingLeft) - parseFloat(ws.paddingRight);
        const natural   = el.scrollWidth;      // Layoutbreite, von transform unberührt

        el._skalaBreite = natural;             // für den ResizeObserver merken

        if (natural > available && available > 0) {
            const scale = available / natural;
            el.style.transform = `scale(${scale})`;
            wrapper.style.height = (el.scrollHeight * scale
                + parseFloat(ws.paddingTop) + parseFloat(ws.paddingBottom)) + 'px';
        }
        beobachte(el);
    }));
}

/* Nachmessen, wenn sich der Inhalt später noch ändert. Ein transform ändert die
   Layoutgröße nicht, deshalb meldet sich der Beobachter nur bei echten
   Änderungen – eine Schleife kann so nicht entstehen. */
let _skalaBeobachter = null;
function beobachte(el) {
    if (typeof ResizeObserver !== 'function') return;
    if (!_skalaBeobachter) {
        _skalaBeobachter = new ResizeObserver(eintraege => {
            eintraege.forEach(e => {
                const el = e.target;
                if (el.scrollWidth !== el._skalaBreite) scaleToFit(el);
            });
        });
    }
    if (!el._skalaBeobachtet) { el._skalaBeobachtet = true; _skalaBeobachter.observe(el); }
}

function scaleAllElements() {
    document.querySelectorAll('.scale-el').forEach(scaleToFit);
}

window.addEventListener('resize', scaleAllElements);

/* Sicherheitsnetz: sobald die Schriften geladen sind, noch einmal nachrechnen. */
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => scaleAllElements()).catch(() => {});
}
