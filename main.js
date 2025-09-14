window.addEventListener('DOMContentLoaded', function() {
    const GameStateManager = window.GameStateManager;
    const Renderer = window.Renderer;
    const InputHandler = window.InputHandler;
    const EntityManager = window.EntityManager;
    const AudioManager = window.AudioManager;
    const ScoreManager = window.ScoreManager;

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const uiOverlay = document.getElementById('ui-overlay');
    const instructions = document.getElementById('instructions');
    const gameoverOverlay = document.getElementById('gameover-overlay');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const finalScore = document.getElementById('final-score');

    let renderer, inputHandler, entityManager, scoreManager, audioManager, stateManager, loopId;
    let countdown, countdownActive;

    // Store previous score between games
    let previousScore = null;

    // Store the highest score ever achieved across all sessions
    let globalHighScore = null;

    function startGame() {
        // Hide overlays
        instructions.style.display = "none";
        gameoverOverlay.style.display = "none";
        // Init managers
        audioManager = new AudioManager();
        stateManager = new GameStateManager();
        scoreManager = new ScoreManager();
        // Set previous score for display in overlay
        scoreManager.setPreviousScore(previousScore);
        entityManager = new EntityManager(scoreManager, audioManager, stateManager);
        inputHandler = new InputHandler(entityManager.getPlayer());
        renderer = new Renderer(ctx, entityManager, scoreManager, stateManager);

        // Countdown timer
        countdown = 30.0;
        countdownActive = true;

        // Main loop
        let lastTime = performance.now();
        function gameLoop(now) {
            const delta = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;
            if (stateManager.isPlaying()) {
                if (countdownActive) {
                    countdown -= delta;
                    if (countdown <= 0) {
                        countdown = 0;
                        countdownActive = false;
                        stateManager.setGameOver();
                    }
                }
                entityManager.update(delta, inputHandler);
                renderer.render();
                scoreManager.renderScore(uiOverlay, countdown);
                loopId = requestAnimationFrame(gameLoop);
            } else if (stateManager.isGameOver()) {
                onGameOver();
            }
        }
        renderer.render(); // draw initial frame
        scoreManager.renderScore(uiOverlay, countdown);
        stateManager.setPlaying();
        loopId = requestAnimationFrame(gameLoop);
    }

    function onGameOver() {
        cancelAnimationFrame(loopId);
        // Update and save high score if needed
        scoreManager.checkAndUpdateHighScore();

        // Update globalHighScore from localStorage if needed
        if (globalHighScore === null) {
            // On first game over, load from localStorage
            try {
                globalHighScore = parseInt(localStorage.getItem("rtbd_highscore") || "0", 10);
            } catch (e) {
                globalHighScore = 0;
            }
            if (isNaN(globalHighScore)) globalHighScore = 0;
        }
        // If new high score achieved, update globalHighScore
        if (scoreManager.score > globalHighScore) {
            globalHighScore = scoreManager.score;
        } else {
            // Always reload from localStorage in case another tab updated it
            try {
                let hs = parseInt(localStorage.getItem("rtbd_highscore") || "0", 10);
                if (!isNaN(hs) && hs > globalHighScore) globalHighScore = hs;
            } catch (e) {}
        }

        // Display both score and high score in the game over screen
        // Ensure high score is always the highest ever, not previous score
        finalScore.innerText = "Your Score: " + scoreManager.score + "\nHigh Score: " + globalHighScore;
        gameoverOverlay.style.display = "block";
        uiOverlay.innerText = '';
        audioManager.playGameOver();
        // Store the score as previousScore for next game
        previousScore = scoreManager.score;
    }

    // Button events
    startBtn.onclick = () => startGame();
    restartBtn.onclick = () => startGame();

    // Keyboard restart if gameover
    window.addEventListener('keydown', function(e){
        if (gameoverOverlay.style.display !== "none" && (e.key === " " || e.key === "Enter")) {
            startGame();
        }
    });

    // Show instructions at load
    instructions.style.display = "block";
});

// Expose main.js (not a class, but for completeness)
window.Main = true;