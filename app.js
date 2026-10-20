// ========== MAIN APPLICATION SCRIPT ==========
// Gestion de l'interface et des interactions

// ========== ADMIN MODE ==========
let isAdminMode = false;

function checkAdminMode() {
    const params = new URLSearchParams(window.location.search);
    const providedKey = params.get('admin');

    if (providedKey && providedKey === CONFIG.adminKey) {
        isAdminMode = true;
        try {
            localStorage.setItem('adminMode', 'true');
        } catch (e) {
            console.log('localStorage not available');
        }
        // Remove the ?admin= from the URL for cleaner appearance
        window.history.replaceState({}, document.title, window.location.pathname);
        showToast('✓ Mode admin activé');
        return true;
    }

    // Check if admin mode was previously set
    try {
        const savedAdmin = localStorage.getItem('adminMode');
        if (savedAdmin === 'true') {
            isAdminMode = true;
            return true;
        }
    } catch (e) {
        console.log('localStorage not available');
    }

    return false;
}

function disableAdminMode() {
    isAdminMode = false;
    try {
        localStorage.removeItem('adminMode');
    } catch (e) {
        console.log('localStorage not available');
    }
    renderSocialLinks();
    showToast('Mode admin désactivé');
}

function updateAdminUI() {
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.style.display = isAdminMode ? 'flex' : 'none';
    }

    const liveButtons = document.querySelectorAll('.live-toggle-btn');
    liveButtons.forEach(btn => {
        btn.style.display = isAdminMode ? 'flex' : 'none';
    });
}

// ========== INITIALISATION ==========
function init() {
    // Vérifier le mode admin
    checkAdminMode();

    // Mise à jour du profil
    document.getElementById('pseudo').textContent = CONFIG.pseudo;
    document.getElementById('tagline').textContent = CONFIG.tagline;
    document.getElementById('bio').textContent = CONFIG.bio;
    document.getElementById('year').textContent = CONFIG.year;
    document.getElementById('footer').innerHTML = `&copy; <span id="year">${CONFIG.year}</span> ${CONFIG.pseudo} • ${i18nInstance.t('footerText')}`;

    // Avatar
    const avatar = document.getElementById('avatar');
    if (CONFIG.avatarEmoji.startsWith('http')) {
        avatar.innerHTML = `<img src="${CONFIG.avatarEmoji}" alt="${CONFIG.pseudo}">`;
    } else {
        avatar.textContent = CONFIG.avatarEmoji;
    }

    // Génération des liens sociaux
    renderSocialLinks();

    // Event listeners
    document.getElementById('shareBtn').addEventListener('click', shareWebsite);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('langToggle').addEventListener('click', toggleLanguageMenu);

    // Admin button
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', disableAdminMode);
    }

    // Créer les boutons de langue
    renderLanguageButtons();

    // Charger le thème sauvegardé
    loadTheme();

    // Charger les états LIVE sauvegardés
    loadLiveStates();

    // Mettre à jour les meta tags
    updateMetaTags();

    // Mettre à jour la visibilité des contrôles admin
    updateAdminUI();
}

function renderSocialLinks() {
    const grid = document.getElementById('socialGrid');
    grid.innerHTML = '';

    CONFIG.networks.forEach((network) => {
        const link = document.createElement('a');
        link.href = network.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'social-link';

        // Check if this network is marked as live
        const isLive = isNetworkLive(network.name);

        let badgeHTML = '';
        if (isLive) {
            badgeHTML = `<span class="badge"><span class="badge-dot"></span>${i18nInstance.t('liveText')}</span>`;
        }

        let toggleBtnHTML = '';
        if (isAdminMode) {
            toggleBtnHTML = `<button class="live-toggle-btn" data-network="${network.name}" title="Toggle live status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"></circle>
                </svg>
            </button>`;
        }

        link.innerHTML = `
            <div class="social-icon">${ICONS[network.icon] || ''}</div>
            <div class="social-link-text">
                <span class="social-link-name">${network.name}</span>
                ${badgeHTML}
            </div>
            ${toggleBtnHTML}
        `;

        const toggleBtn = link.querySelector('.live-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleNetworkLive(network.name);
            });
        }

        grid.appendChild(link);
    });
}

function shareWebsite() {
    const url = window.location.href;

    // Essayer l'API Share si disponible
    if (navigator.share) {
        navigator.share({
            title: CONFIG.pseudo,
            text: CONFIG.bio,
            url: url,
        }).catch(err => console.log('Share error:', err));
    } else {
        // Copier dans le presse-papiers
        navigator.clipboard.writeText(url).then(() => {
            showToast(i18nInstance.t('copiedToClipboard'));
        }).catch(() => {
            showToast(i18nInstance.t('copyError'));
        });
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    try {
        localStorage.setItem('theme', newTheme);
    } catch (e) {
        console.log('localStorage not available');
    }
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (theme === 'light') {
        // Sun icon
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        // Moon icon
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

function loadTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }
    } catch (e) {
        console.log('localStorage not available');
    }
}

function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('hidden');
}

function renderLanguageButtons() {
    const menu = document.getElementById('languageMenu');
    const languages = i18nInstance.getAvailableLanguages();
    const currentLang = i18nInstance.getLanguage();

    menu.innerHTML = '';
    languages.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = `lang-btn ${lang === currentLang ? 'active' : ''}`;
        btn.textContent = lang.toUpperCase();
        btn.addEventListener('click', () => changeLanguage(lang));
        menu.appendChild(btn);
    });
}

function changeLanguage(lang) {
    if (i18nInstance.setLanguage(lang)) {
        renderSocialLinks();
        updateMetaTags();
        document.getElementById('shareBtn').textContent = i18nInstance.t('shareButton');

        // Mettre à jour footer
        document.getElementById('footer').innerHTML = `&copy; <span id="year">${CONFIG.year}</span> ${CONFIG.pseudo} • ${i18nInstance.t('footerText')}`;

        // Mettre à jour le badge LIVE si présent
        const liveBadges = document.querySelectorAll('.badge');
        liveBadges.forEach(badge => {
            const dot = badge.querySelector('.badge-dot');
            if (dot) {
                badge.innerHTML = `<span class="badge-dot"></span>${i18nInstance.t('liveText')}`;
            }
        });

        // Fermer le menu
        document.getElementById('languageMenu').classList.add('hidden');

        // Mettre à jour le bouton actif
        renderLanguageButtons();
    }
}

function updateMetaTags() {
    const lang = i18nInstance.getLanguage();
    document.documentElement.lang = lang;

    const meta = {
        description: document.querySelector('meta[name="description"]'),
        ogTitle: document.querySelector('meta[property="og:title"]'),
        ogDescription: document.querySelector('meta[property="og:description"]'),
        twitterTitle: document.querySelector('meta[name="twitter:title"]'),
        twitterDescription: document.querySelector('meta[name="twitter:description"]'),
    };

    if (meta.description) meta.description.content = i18nInstance.t('metaDescription');
    if (meta.ogTitle) meta.ogTitle.content = CONFIG.pseudo;
    if (meta.ogDescription) meta.ogDescription.content = i18nInstance.t('metaOgDescription');
    if (meta.twitterTitle) meta.twitterTitle.content = CONFIG.pseudo;
    if (meta.twitterDescription) meta.twitterDescription.content = i18nInstance.t('metaTwitterDescription');
}

// ========== LIVE STATUS MANAGEMENT ==========
function isNetworkLive(networkName) {
    try {
        const liveStates = JSON.parse(localStorage.getItem('liveStates') || '{}');
        // If override exists in localStorage, use it; otherwise use config
        if (networkName in liveStates) {
            return liveStates[networkName];
        }
        // Fallback to config.js
        const network = CONFIG.networks.find(n => n.name === networkName);
        return network ? network.live : false;
    } catch (e) {
        // Fallback to config if localStorage fails
        const network = CONFIG.networks.find(n => n.name === networkName);
        return network ? network.live : false;
    }
}

function toggleNetworkLive(networkName) {
    try {
        let liveStates = JSON.parse(localStorage.getItem('liveStates') || '{}');
        const currentState = isNetworkLive(networkName);
        liveStates[networkName] = !currentState;
        localStorage.setItem('liveStates', JSON.stringify(liveStates));

        // Re-render social links to show/hide badge
        renderSocialLinks();

        // Show toast feedback
        const newState = liveStates[networkName];
        showToast(`${networkName} ${newState ? '🔴 LIVE' : '⚪ Offline'}`);
    } catch (e) {
        console.log('localStorage not available');
        showToast('Erreur: impossible de sauvegarder');
    }
}

function loadLiveStates() {
    try {
        const liveStates = JSON.parse(localStorage.getItem('liveStates') || '{}');
        // This just loads them; they're checked on render
    } catch (e) {
        console.log('localStorage not available for live states');
    }
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', init);

// Fallback si DOMContentLoaded est déjà passé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Fermer le menu de langue en cliquant ailleurs
document.addEventListener('click', (e) => {
    const menu = document.getElementById('languageMenu');
    const btn = document.getElementById('langToggle');
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
    }
});
