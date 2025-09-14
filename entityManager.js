class EntityManager {
    constructor(scoreManager, audioManager, stateManager) {
        const Player = window.Player, Balloon = window.Balloon, Pedestrian = window.Pedestrian, Police = window.Police;
        this.player = new Player(240, 224);
        this.balloons = [];
        this.pedestrians = [];
        this.police = [];
        this.scoreManager = scoreManager;
        this.audioManager = audioManager;
        this.stateManager = stateManager;
        this.spawnTimer = 0;
        this.spawnInterval = 1.0;
        this.policeChance = 0.22;
        this.time = 0;
    }
    update(dt, inputHandler) {
        if (this.stateManager && !this.stateManager.isPlaying()) return;
        this.time += dt;
        // Player movement/input
        this.player.update(dt, inputHandler, this.balloons);
        // Balloons
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            this.balloons[i].update(dt);
            if (this.balloons[i].y > 700) this.balloons.splice(i, 1);
        }
        // Pedestrians & police
        for (let i = this.pedestrians.length - 1; i >= 0; i--) {
            this.pedestrians[i].update(dt);
            if (this.pedestrians[i].x < -60 || this.pedestrians[i].x > 540) this.pedestrians.splice(i, 1);
        }
        for (let i = this.police.length - 1; i >= 0; i--) {
            this.police[i].update(dt);
            if (this.police[i].x < -60 || this.police[i].x > 540) this.police.splice(i, 1);
        }
        // Spawning
        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0) {
            this.spawnPedestrianOrPolice();
            this.spawnTimer = this.spawnInterval * (0.6 + Math.random()*0.7);
        }
        // Collisions
        const CollisionSystem = window.CollisionSystem;
        CollisionSystem.checkBalloonCollisions(
            this.balloons,
            this.pedestrians,
            this.police,
            // On Pedestrian Hit
            (balloonIdx, pedIdx) => {
                this.balloons.splice(balloonIdx, 1);
                this.pedestrians.splice(pedIdx, 1);
                this.scoreManager.addScore(1);
                this.audioManager.playHit();
            },
            // On Police Hit
            (balloonIdx, policeIdx) => {
                this.balloons.splice(balloonIdx, 1);
                this.stateManager.setGameOver();
            }
        );
    }
    spawnPedestrianOrPolice() {
        // --- SIDEWALK SPAWN LOGIC ---
        // Sidewalk: y = height-64 = 656, sidewalk height = 44px
        // To align the feet of the sprite to the sidewalk, we now let the Pedestrian/Police constructor handle y
        // So we pass only x, dir, and a placeholder y (not used)
        const fromLeft = Math.random() < 0.5;
        let spawnX = fromLeft ? -40 : 480+40;
        let dir = fromLeft ? 1 : -1;
        // y argument is ignored in Pedestrian/Police, but pass 0 for clarity
        if (Math.random() < this.policeChance) {
            this.police.push(new window.Police(spawnX, 0, dir));
        } else {
            this.pedestrians.push(new window.Pedestrian(spawnX, 0, dir));
        }
    }
    drawPlayer(ctx) { this.player.draw(ctx); }
    drawBalloons(ctx) { for (let b of this.balloons) b.draw(ctx); }
    drawPedestrians(ctx) { for (let p of this.pedestrians) p.draw(ctx); }
    drawPolice(ctx) { for (let c of this.police) c.draw(ctx); }
    getPlayer() { return this.player; }
}
window.EntityManager = EntityManager;