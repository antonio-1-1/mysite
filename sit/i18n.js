// ========== INTERNATIONALIZATION ==========
// Dictionnaire multilingue pour le hub social

const TRANSLATIONS = {
    fr: {
        // Meta tags
        metaDescription: 'Hub centralisé de tous mes réseaux sociaux. Retrouvez-moi sur TikTok, Instagram, YouTube et plus.',
        metaOgDescription: 'Hub centralisé de tous mes réseaux sociaux',
        metaTwitterDescription: 'Hub centralisé de tous mes réseaux sociaux',

        // UI Text
        shareButton: 'Partager ce site',
        themeToggleLabel: 'Activer/désactiver le mode sombre',
        copiedToClipboard: '✓ Lien copié dans le presse-papiers',
        copyError: 'Erreur lors de la copie',
        footerText: 'Tous droits réservés',
        liveText: 'EN DIRECT',
    },
    en: {
        // Meta tags
        metaDescription: 'Centralized hub for all my social networks. Find me on TikTok, Instagram, YouTube and more.',
        metaOgDescription: 'Centralized hub for all my social networks',
        metaTwitterDescription: 'Centralized hub for all my social networks',

        // UI Text
        shareButton: 'Share this site',
        themeToggleLabel: 'Toggle dark/light theme',
        copiedToClipboard: '✓ Link copied to clipboard',
        copyError: 'Error copying link',
        footerText: 'All rights reserved',
        liveText: 'LIVE',
    },
    es: {
        // Meta tags
        metaDescription: 'Centro centralizado para todas mis redes sociales. Encuéntrame en TikTok, Instagram, YouTube y más.',
        metaOgDescription: 'Centro centralizado para todas mis redes sociales',
        metaTwitterDescription: 'Centro centralizado para todas mis redes sociales',

        // UI Text
        shareButton: 'Compartir este sitio',
        themeToggleLabel: 'Alternar tema oscuro/claro',
        copiedToClipboard: '✓ Enlace copiado al portapapeles',
        copyError: 'Error al copiar el enlace',
        footerText: 'Todos los derechos reservados',
        liveText: 'EN DIRECTO',
    },
    de: {
        // Meta tags
        metaDescription: 'Zentraler Hub für alle meine sozialen Netzwerke. Finde mich auf TikTok, Instagram, YouTube und mehr.',
        metaOgDescription: 'Zentraler Hub für alle meine sozialen Netzwerke',
        metaTwitterDescription: 'Zentraler Hub für alle meine sozialen Netzwerke',

        // UI Text
        shareButton: 'Diese Website teilen',
        themeToggleLabel: 'Dunkles/helles Design umschalten',
        copiedToClipboard: '✓ Link in die Zwischenablage kopiert',
        copyError: 'Fehler beim Kopieren des Links',
        footerText: 'Alle Rechte vorbehalten',
        liveText: 'LIVE',
    },
    it: {
        // Meta tags
        metaDescription: 'Hub centralizzato per tutti i miei social network. Trovami su TikTok, Instagram, YouTube e altro.',
        metaOgDescription: 'Hub centralizzato per tutti i miei social network',
        metaTwitterDescription: 'Hub centralizzato per tutti i miei social network',

        // UI Text
        shareButton: 'Condividi questo sito',
        themeToggleLabel: 'Attiva/disattiva tema scuro',
        copiedToClipboard: '✓ Link copiato negli appunti',
        copyError: 'Errore durante la copia',
        footerText: 'Tutti i diritti riservati',
        liveText: 'IN DIRETTA',
    },
    pt: {
        // Meta tags
        metaDescription: 'Hub centralizado para todas as minhas redes sociais. Encontre-me no TikTok, Instagram, YouTube e muito mais.',
        metaOgDescription: 'Hub centralizado para todas as minhas redes sociais',
        metaTwitterDescription: 'Hub centralizado para todas as minhas redes sociais',

        // UI Text
        shareButton: 'Compartilhar este site',
        themeToggleLabel: 'Alternar tema escuro/claro',
        copiedToClipboard: '✓ Link copiado para a área de transferência',
        copyError: 'Erro ao copiar link',
        footerText: 'Todos os direitos reservados',
        liveText: 'AO VIVO',
    },
    ja: {
        // Meta tags
        metaDescription: 'すべてのソーシャルメディアの中央ハブ。TikTok、Instagram、YouTubeなどで私を見つけてください。',
        metaOgDescription: 'すべてのソーシャルメディアの中央ハブ',
        metaTwitterDescription: 'すべてのソーシャルメディアの中央ハブ',

        // UI Text
        shareButton: 'このサイトを共有',
        themeToggleLabel: 'ダーク/ライトモード切り替え',
        copiedToClipboard: '✓ リンクをクリップボードにコピーしました',
        copyError: 'リンクのコピーエラー',
        footerText: '著作権所有',
        liveText: 'ライブ',
    },
    zh: {
        // Meta tags
        metaDescription: '所有社交媒体的中央枢纽。在 TikTok、Instagram、YouTube 等找到我。',
        metaOgDescription: '所有社交媒体的中央枢纽',
        metaTwitterDescription: '所有社交媒体的中央枢纽',

        // UI Text
        shareButton: '分享本网站',
        themeToggleLabel: '切换深色/浅色主题',
        copiedToClipboard: '✓ 链接已复制到剪贴板',
        copyError: '复制链接出错',
        footerText: '版权所有',
        liveText: '直播',
    },
};

// ========== i18n Helper Class ==========
class i18n {
    constructor(defaultLang = 'en') {
        this.currentLang = defaultLang;
        this.loadLanguageFromStorage();
    }

    loadLanguageFromStorage() {
        try {
            const saved = localStorage.getItem('language');
            if (saved && TRANSLATIONS[saved]) {
                this.currentLang = saved;
            }
        } catch (e) {
            console.log('localStorage not available');
        }
    }

    setLanguage(lang) {
        if (TRANSLATIONS[lang]) {
            this.currentLang = lang;
            try {
                localStorage.setItem('language', lang);
            } catch (e) {
                console.log('localStorage not available');
            }
            return true;
        }
        return false;
    }

    getLanguage() {
        return this.currentLang;
    }

    t(key) {
        const translations = TRANSLATIONS[this.currentLang];
        return translations && translations[key] ? translations[key] : key;
    }

    getAvailableLanguages() {
        return Object.keys(TRANSLATIONS);
    }
}

// Global instance
const i18nInstance = new i18n(CONFIG.defaultLanguage);
