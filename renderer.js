class Renderer {
    constructor(ctx, entityManager, scoreManager, stateManager) {
        this.ctx = ctx;
        this.em = entityManager;
        this.scoreManager = scoreManager;
        this.stateManager = stateManager;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;

        // Preload wall image
        if (!Renderer.wallImg) {
            Renderer.wallImg = new window.Image();
            Renderer.wallImg.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/wall_1757872138812.png";
        }
    }
    render() {
        const ctx = this.ctx;
        ctx.clearRect(0,0,this.width,this.height);
        // Background
        this.drawSky();
        this.drawBuildings();
        this.drawWallBelowRoof(); // <-- replaced blue wall with image
        this.drawRoof();
        this.drawSidewalk();
        // Entities
        this.em.drawPedestrians(ctx);
        this.em.drawPolice(ctx);
        this.em.drawBalloons(ctx);
        this.em.drawPlayer(ctx);
    }
    drawSky() {
        const ctx = this.ctx;
        const grad = ctx.createLinearGradient(0,0,0,240);
        grad.addColorStop(0, "#b3e0fc");
        grad.addColorStop(1, "#e7f3fb");
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,this.width,240);

        // Animated clouds (procedural)
        for(let i=0;i<6;i++){
            const x = (Math.sin(Date.now()/1000 + i)*90 + this.width/2 + i*60)%this.width;
            const y = 38 + (i%2)*18;
            ctx.save();
            ctx.globalAlpha = 0.14 + 0.11*(i%3);
            ctx.beginPath();
            ctx.ellipse(x, y, 42+7*(i%3), 16+4*(i%4), 0, 0, Math.PI*2);
            ctx.fillStyle = "#fff";
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
        }
    }
    drawBuildings() {
        const ctx = this.ctx;
        ctx.save();
        for(let i=0;i<7;i++){
            const bx = 40 + i*60;
            const bh = 80 + (i%3)*40;
            ctx.globalAlpha = 0.10 + 0.12*(i%2);
            ctx.fillStyle = i%2===0 ? "#92a5b8" : "#7d95ad";
            ctx.fillRect(bx, 240-bh, 48, bh);
        }
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }
    drawWallBelowRoof() {
        // Draw the image wall between roof and sidewalk
        const ctx = this.ctx;
        ctx.save();
        // The blue wall was between y=260 and y=656 (sidewalkY)
        const wallY = 260;
        const wallH = this.height - 64 - wallY; // sidewalkY = this.height-64
        const wallImg = Renderer.wallImg;
        if (wallImg && wallImg.complete && wallImg.naturalWidth > 0) {
            // Stretch the image to fit the entire wall area (fit to image)
            ctx.drawImage(
                wallImg,
                0, 0, wallImg.naturalWidth, wallImg.naturalHeight,
                0, wallY, this.width, wallH
            );
        } else {
            // fallback: old blue wall
            ctx.fillStyle = "#3a5fae";
            ctx.fillRect(0, wallY, this.width, wallH);
        }
        ctx.restore();
    }
    drawRoof() {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0,240);
        ctx.lineTo(this.width,240);
        ctx.lineTo(this.width,260);
        ctx.lineTo(0,260);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0,240,0,260);
        grad.addColorStop(0, "#5a2e1a");
        grad.addColorStop(1, "#8d5a3a");
        ctx.fillStyle = grad;
        ctx.shadowColor = "#7d3b00";
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
    }
    drawSidewalk() {
        const ctx = this.ctx;
        ctx.save();
        const sidewalkY = this.height-64;
        ctx.fillStyle = "#e7e2d2";
        ctx.fillRect(0, sidewalkY, this.width, 44);
        // curb
        ctx.fillStyle = "#b8b0a2";
        ctx.fillRect(0, sidewalkY+44, this.width, 8);
        // lines
        ctx.strokeStyle = "#bfb9ab";
        ctx.lineWidth = 2;
        for(let x=0;x<this.width;x+=36) {
            ctx.beginPath();
            ctx.moveTo(x,sidewalkY+8);
            ctx.lineTo(x,sidewalkY+44-8);
            ctx.stroke();
        }
        ctx.restore();
    }
}
window.Renderer = Renderer;