class GameStateManager {
    constructor() {
        this.state = "playing";
    }
    isPlaying() { return this.state === "playing"; }
    isGameOver() { return this.state === "gameover"; }
    setGameOver() { this.state = "gameover"; }
    setPlaying() { this.state = "playing"; }
}
window.GameStateManager = GameStateManager;