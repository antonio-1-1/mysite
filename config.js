// ========== CONFIGURATION GÉNÉRALE ==========
// Modifiez ces valeurs pour personnaliser votre hub
const CONFIG = {
    pseudo: 'ANTONIO MONTANA',
    tagline: 'Content Creator',
    bio: 'Streamer gaming & content créateur.\nRejoint ma communauté pour des lives quotidiens et du contenu exclusif.',
    avatarEmoji: '🎮', // ou URL d'image
    year: new Date().getFullYear(),
    defaultLanguage: 'fr', // 'fr', 'en', 'es', etc.
    adminKey: 'admin123', // Clé secrète pour le mode admin (change-la !)

    networks: [
        {
            name: 'TikTok',
            url: 'https://www.tiktok.com/@antonnio.10',
            color: '#000000',
            icon: 'tiktok',
            subscribers: '125K',
            live: true,
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/housny__/',
            color: '#E4405F',
            icon: 'instagram',
            subscribers: '85K',
            live: false,
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@housny10',
            color: '#FF0000',
            icon: 'youtube',
            subscribers: '250K',
            live: false,
        },
        {
            name: 'Twitch',
            url: 'https://www.twitch.tv/housny10',
            color: '#9146FF',
            icon: 'twitch',
            subscribers: '45K',
            live: true, // Mettre à true si vous streamez actuellement
        },
        {
            name: 'Twitter / X',
            url: 'https://x.com/housny__10',
            color: '#000000',
            icon: 'twitter',
            subscribers: '32K',
            live: false,
        },
        {
            name: 'Telegram',
            url: 'https://t.me/yourhandle',
            color: '#0088cc',
            icon: 'telegram',
            subscribers: '18K',
            live: false,
        },
        {
            name: 'Kick',
            url: 'https://kick.com/housnyy10',
            color: '#00D084',
            icon: 'kick',
            subscribers: '12K',
            live: false,
        },
    ],
};
