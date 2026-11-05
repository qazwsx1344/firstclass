/* MENU page interactions */
(() => {
    const tabs = Array.from(document.querySelectorAll('.menu-tab'));
    const panels = Array.from(document.querySelectorAll('.menu-panel'));

    // 링크 목적지가 아직 정해지지 않은 임시 # 링크는 페이지 상단으로 이동하지 않게 합니다.
    // 실제 주소가 정해진 링크는 href에 주소를 넣으면 기본 이동이 작동합니다.
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href="#"]');
        if (link) event.preventDefault();
    });

    function activateTab(selectedTab, moveFocus = false) {
        const targetPanelId = selectedTab.getAttribute('aria-controls');

        tabs.forEach((tab) => {
            const isSelected = tab === selectedTab;
            tab.classList.toggle('is-active', isSelected);
            tab.setAttribute('aria-selected', String(isSelected));
            tab.tabIndex = isSelected ? 0 : -1;
        });

        panels.forEach((panel) => {
            const isActive = panel.id === targetPanelId;
            panel.hidden = !isActive;
            panel.classList.toggle('is-active', isActive);
        });

        if (moveFocus) selectedTab.focus();
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
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isExpanded));
            menuButton.setAttribute('aria-label', isExpanded ? '메뉴 열기' : '메뉴 닫기');
            navigation.classList.toggle('is-open', !isExpanded);
        });

        const navItems = Array.from(document.querySelectorAll('.nav-item'));

        navItems.forEach((item) => {
            const link = item.querySelector(':scope > a');
            const submenu = item.querySelector('.nav-submenu');
            if (!link || !submenu) return;

            link.addEventListener('click', (event) => {
                if (!window.matchMedia('(max-width: 1024px)').matches) return;

                event.preventDefault();
                const isExpanded = link.getAttribute('aria-expanded') === 'true';

                navItems.forEach((otherItem) => {
                    const otherLink = otherItem.querySelector(':scope > a');
                    if (!otherLink) return;
                    otherLink.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('is-expanded');
                });

                link.setAttribute('aria-expanded', String(!isExpanded));
                item.classList.toggle('is-expanded', !isExpanded);
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