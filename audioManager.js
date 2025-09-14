class AudioManager {
    constructor() {
        this.ctx = null;
        this.hitData = null;
        this.gameoverData = null;
        // Pre-generate simple sounds with Web Audio API
        this._init();
    }
    _init() {
        if (!window.AudioContext) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
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