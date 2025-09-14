class InputHandler {
    constructor(player) {
        this.left = false;
        this.right = false;
        this.drop = false;
        this.player = player;
        this.setupEvents();
    }
    setupEvents() {
        window.addEventListener('keydown', this.keyDownHandler.bind(this));
        window.addEventListener('keyup', this.keyUpHandler.bind(this));
    }
    keyDownHandler(e) {
        if (e.repeat) return;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.right = true;
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 's' || e.key === 'S') this.drop = true;
    }
    keyUpHandler(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.left = false;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.right = false;
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 's' || e.key === 'S') this.drop = false;
    }
}
window.InputHandler = InputHandler;