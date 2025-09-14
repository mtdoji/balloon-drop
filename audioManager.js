class AudioManager {
    constructor() {
        this.ctx = null;
        this.hitData = null;
        this.gameoverData = null;
        // Background music
        this.music = null;
        this.musicMuted = false;
        this.musicReady = false;
        this.musicVolume = 0.45;
        this._init();
    }
    _init() {
        if (!window.AudioContext) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Setup background music
        this.music = new window.Audio("https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/audio-assets/93109b07-1312-49d8-9dca-94c977c78702/snoop-drop-it-like-its-hot_segment.wav");
        this.music.loop = true;
        this.music.volume = this.musicVolume;
        this.music.preload = "auto";
        this.music.addEventListener("canplaythrough", () => {
            this.musicReady = true;
        });
        // Prevent music from playing multiple times
        this.music.addEventListener("ended", () => {
            if (!this.musicMuted) this.music.play();
        });
    }
    playMusic() {
        if (!this.music) return;
        if (this.musicMuted) return;
        if (this.music.paused) {
            // Required for Chrome: resume context on user gesture
            if (this.ctx && this.ctx.state === "suspended") {
                this.ctx.resume();
            }
            this.music.currentTime = 0;
            this.music.volume = this.musicVolume;
            this.music.play().catch(()=>{});
        }
    }
    stopMusic() {
        if (this.music && !this.music.paused) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }
    muteMusic() {
        this.musicMuted = true;
        if (this.music) {
            this.music.pause();
        }
    }
    unmuteMusic() {
        this.musicMuted = false;
        if (this.music) {
            this.music.volume = this.musicVolume;
            if (this.music.paused) {
                this.music.play().catch(()=>{});
            }
        }
    }
    toggleMuteMusic() {
        if (this.musicMuted) {
            this.unmuteMusic();
        } else {
            this.muteMusic();
        }
    }
    isMusicMuted() {
        return this.musicMuted;
    }
    playHit() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = 520;
        g.gain.value = 0.18;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.13);
        g.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        o.stop(ctx.currentTime + 0.15);
    }
    playGameOver() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.value = 350;
        g.gain.value = 0.20;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.42);
        g.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        o.stop(ctx.currentTime + 0.46);
    }
}
window.AudioManager = AudioManager;