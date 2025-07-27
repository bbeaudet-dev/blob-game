const audioCache: { [key: string]: HTMLAudioElement } = {};
let backgroundMusic: HTMLAudioElement | null = null;
let currentMusicTheme: string | null = null;

export const SOUNDS = {
    blobClick: "/assets/sfx/click-2.wav",
    uiClick: "/assets/sfx/click-1.wav",
    evolve: "/assets/sfx/evolve.wav",
    gameStart: "/assets/sfx/game-start.mp3",
    cashRegister: "/assets/sfx/cash-register.mp3",
};

export const BACKGROUND_MUSIC = {
    menuTheme: "/assets/music/menu-theme.mp3",
    earlyTheme: "/assets/music/early-theme.mp3",
    midgameTheme: "/assets/music/midgame-theme.mp3",
    finalTheme: "/assets/music/final-level-theme.mp3",
};

export const initSounds = () => {
    // Initialize sound effects
    for (const key in SOUNDS) {
        if (Object.prototype.hasOwnProperty.call(SOUNDS, key)) {
            const soundFile = SOUNDS[key as keyof typeof SOUNDS];
            const audio = new Audio(soundFile);
            audio.load();
            audioCache[key] = audio;
        }
    }

    // Initialize background music with menu theme by default
    backgroundMusic = new Audio(BACKGROUND_MUSIC.menuTheme);
    backgroundMusic.loop = true; // Enable looping
    backgroundMusic.volume = 0.24; // Reduced by 20% from 0.3 to 0.24
    backgroundMusic.load();
    currentMusicTheme = 'menuTheme';
    
    // Don't auto-start music - wait for user interaction
};

export const playSound = (soundKey: keyof typeof SOUNDS, volume = 0.5) => {
    const audio = audioCache[soundKey];
    if (audio) {
        // Create a new audio instance for each sound effect to allow overlapping
        const soundInstance = new Audio(audio.src);
        soundInstance.volume = volume;
        soundInstance.currentTime = 0;
        soundInstance.play().catch(error => console.error(`Error playing sound: ${soundKey}`, error));
    } else {
        console.error(`Sound not initialized: ${soundKey}`);
    }
};

// Background music controls
export const playBackgroundMusic = (volume = 0.24) => {
    if (backgroundMusic) {
        backgroundMusic.volume = volume;
        backgroundMusic.play().catch(error => console.error('Error playing background music:', error));
    } else {
        console.error('Background music not initialized');
    }
};

export const pauseBackgroundMusic = () => {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
};

export const stopBackgroundMusic = () => {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
};

export const setBackgroundMusicVolume = (volume: number) => {
    if (backgroundMusic) {
        backgroundMusic.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    }
};

export const isBackgroundMusicPlaying = (): boolean => {
    return backgroundMusic ? !backgroundMusic.paused : false;
};

// New functions for theme switching
export const switchMusicTheme = (themeKey: keyof typeof BACKGROUND_MUSIC, volume = 0.24) => {
    if (currentMusicTheme === themeKey) return; // Already playing this theme
    
    const newTheme = BACKGROUND_MUSIC[themeKey];
    if (!newTheme) {
        console.error(`Music theme not found: ${themeKey}`);
        return;
    }

    // Create new audio element for the theme
    const newMusic = new Audio(newTheme);
    newMusic.loop = true;
    newMusic.volume = volume;
    newMusic.load();

    // Fade out current music and fade in new music
    if (backgroundMusic && !backgroundMusic.paused) {
        const fadeOutDuration = 1000; // 1 second fade
        const fadeOutSteps = 20;
        const volumeStep = backgroundMusic.volume / fadeOutSteps;
        
        const fadeOutInterval = setInterval(() => {
            if (backgroundMusic && backgroundMusic.volume > volumeStep) {
                backgroundMusic.volume -= volumeStep;
            } else {
                clearInterval(fadeOutInterval);
                backgroundMusic?.pause();
                
                // Start new music
                backgroundMusic = newMusic;
                currentMusicTheme = themeKey;
                backgroundMusic.play().catch(error => console.error('Error playing new background music:', error));
            }
        }, fadeOutDuration / fadeOutSteps);
    } else {
        // No current music playing, just start new theme
        backgroundMusic = newMusic;
        currentMusicTheme = themeKey;
        backgroundMusic.play().catch(error => console.error('Error playing new background music:', error));
    }
};

export const getCurrentMusicTheme = (): string | null => {
    return currentMusicTheme;
}; 