 function addClassActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentActive = window.location.pathname;
    for (const link of navLinks) {
        if (link.href.includes(currentActive)) {
            link.classList.add('active-page');
            break;
        }
    }
}
addClassActive()
