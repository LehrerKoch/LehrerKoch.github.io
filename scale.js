function scaleToFit(el) {
    if (!el) return;
    el.style.transform = 'none';
    el.style.transformOrigin = 'top left';

    const wrapper = el.parentElement;
    if (!wrapper) return;
    wrapper.style.height = 'auto';

    requestAnimationFrame(() => {
        const available = wrapper.clientWidth - parseFloat(getComputedStyle(wrapper).paddingLeft) - parseFloat(getComputedStyle(wrapper).paddingRight);
        const natural   = el.scrollWidth;

        if (natural > available && available > 0) {
            const scale = available / natural;
            el.style.transform = `scale(${scale})`;
            wrapper.style.height = (el.scrollHeight * scale + parseFloat(getComputedStyle(wrapper).paddingTop) + parseFloat(getComputedStyle(wrapper).paddingBottom)) + 'px';
        }
    });
}

function scaleAllElements() {
    document.querySelectorAll('.scale-el').forEach(scaleToFit);
}

window.addEventListener('resize', scaleAllElements);
