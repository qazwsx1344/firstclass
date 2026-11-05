/* 렌즈미 메뉴 탭 + 기존 Header 모바일 메뉴 동작 */
(() => {
    const tabs = Array.from(document.querySelectorAll('.menu-tab'));
    const panels = Array.from(document.querySelectorAll('.menu-panel'));

    function activateTab(tab, moveFocus = false) {
        const targetId = tab.getAttribute('aria-controls');
        tabs.forEach((item) => {
            const active = item === tab;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-selected', String(active));
            item.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel) => {
            const active = panel.id === targetId;
            panel.hidden = !active;
            panel.classList.toggle('is-active', active);
        });
        if (moveFocus) tab.focus();
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', (event) => {
            let nextIndex = index;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === 'Home') nextIndex = 0;
            else if (event.key === 'End') nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            activateTab(tabs[nextIndex], true);
        });
    });

    const menuButton = document.querySelector('.mobile-menu-button');
    const navigation = document.querySelector('.primary-navigation');
    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const expanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!expanded));
            navigation.classList.toggle('is-open', !expanded);
        });

        const navItems = Array.from(document.querySelectorAll('.nav-item'));
        navItems.forEach((item) => {
            const link = item.querySelector(':scope > a');
            const submenu = item.querySelector('.nav-submenu');
            if (!link || !submenu) return;
            link.addEventListener('click', (event) => {
                if (!window.matchMedia('(max-width: 1024px)').matches) return;
                event.preventDefault();
                const expanded = link.getAttribute('aria-expanded') === 'true';
                navItems.forEach((other) => {
                    const otherLink = other.querySelector(':scope > a');
                    if (otherLink && other.querySelector('.nav-submenu')) {
                        otherLink.setAttribute('aria-expanded', 'false');
                        other.classList.remove('is-expanded');
                    }
                });
                link.setAttribute('aria-expanded', String(!expanded));
                item.classList.toggle('is-expanded', !expanded);
            });
        });
        window.addEventListener('resize', () => {
            if (window.matchMedia('(min-width: 1025px)').matches) {
                navItems.forEach((item) => {
                    item.classList.remove('is-expanded');
                    const link = item.querySelector(':scope > a');
                    if (link) link.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }
})();
