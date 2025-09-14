class ScoreManager {
    constructor() {
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.previousScore = null; // Store previous score
    }
    addScore(pts) { this.score += pts; }
    loadHighScore() {
        let hs = 0;
        try {
            hs = parseInt(localStorage.getItem("rtbd_highscore") || "0", 10);
        } catch (e) {}
        if (isNaN(hs)) hs = 0;
        return hs;
    }
    saveHighScore() {
        try {
            localStorage.setItem("rtbd_highscore", String(this.highScore));
        } catch (e) {}
    }
    checkAndUpdateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
    }
    setPreviousScore(score) {
        this.previousScore = score;
    }
    renderScore(overlayElem, countdown) {
        let scoreText = "Score: " + this.score;
        if (typeof countdown === "number") {
            let time = Math.ceil(countdown);
            if (time < 0) time = 0;
            scoreText += " | Time: " + time + "s";
        }
        let lines = [scoreText];

        // Only show high score if it exists (>0)
        if (this.highScore > 0) {
            lines.push("High Score: " + this.highScore);
        }
        // REMOVE previous score display

        overlayElem.innerText = lines.join("\n");
    }
}
window.ScoreManager = ScoreManager;