class Player {
    static preloadImages() {
        if (!Player.leftImg) {
            Player.leftImg = new window.Image();
            Player.leftImg.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/wolfileft_1757865946631.png";
        }
        if (!Player.rightImg) {
            Player.rightImg = new window.Image();
            Player.rightImg.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/wolfiright_1757865877792.png";
        }
    }
    constructor(x, y) {
        Player.preloadImages();
        this.x = x; this.y = y;
        this.width = 54; this.height = 44;
        this.speed = 260;
        this.lastDrop = 0;
        this.dropCooldown = 0.32;
        this.facing = "right"; // "left" or "right"
        this.lastInput = null;
    }
    update(dt, input, balloons) {
        let moved = false;
        if (input.left) {
            this.x -= this.speed * dt;
            this.facing = "left";
            moved = true;
        }
        if (input.right) {
            this.x += this.speed * dt;
            this.facing = "right";
            moved = true;
        }
        this.x = Math.max(25, Math.min(this.x, 480-25));
        this.lastDrop -= dt;
        if (input.drop && this.lastDrop <= 0) {
            // Drop balloon
            balloons.push(new window.Balloon(this.x, this.y+30));
            this.lastDrop = this.dropCooldown;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Draw shadow
        ctx.globalAlpha = 0.19;
        ctx.beginPath();
        ctx.ellipse(0, 30, 28, 12, 0, 0, Math.PI*2); // increased shadow size for larger player
        ctx.fillStyle = "#222";
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw player image based on facing direction
        let img = (this.facing === "left") ? Player.leftImg : Player.rightImg;
        // If image not loaded yet, fallback to original drawing
        if (img && img.complete && img.naturalWidth > 0) {
            // Center image horizontally, align bottom to feet
            // Make the image larger: increase drawW and drawH
            const drawW = 144; // was 96
            const drawH = 144; // was 96
            ctx.drawImage(
                img,
                -drawW/2, -drawH/2,
                drawW, drawH
            );
        } else {
            // Fallback: original drawing
            // Make the fallback drawing larger as well
            // Body
            ctx.beginPath();
            ctx.ellipse(0, 0, 48, 44, 0, 0, Math.PI*2); // was 32,29
            ctx.fillStyle = "#39a9f8";
            ctx.shadowColor = "#39a9f8";
            ctx.shadowBlur = 18;
            ctx.fill();
            ctx.shadowBlur = 0;
            // Head
            ctx.beginPath();
            ctx.arc(0, -30, 30, 0, Math.PI*2); // was 20 at -20
            var grad = ctx.createRadialGradient(0, -30, 12, 0, -30, 30);
            grad.addColorStop(0, "#ffe5a0");
            grad.addColorStop(1, "#c9a465");
            ctx.fillStyle = grad;
            ctx.fill();
            // Arms
            ctx.save();
            ctx.strokeStyle = "#ffe5a0";
            ctx.lineWidth = 15; // was 10
            ctx.beginPath();
            ctx.moveTo(-36, -5); // was -24,-3
            ctx.lineTo(-72, 24); // was -48,16
            ctx.moveTo(36, -5);
            ctx.lineTo(72, 24);
            ctx.stroke();
            ctx.restore();
            // Hands
            ctx.beginPath();
            ctx.arc(-72, 24, 10, 0, Math.PI*2); // was 7
            ctx.arc(72, 24, 10, 0, Math.PI*2);
            ctx.fillStyle = "#ffe5a0";
            ctx.fill();
            // Face
            ctx.save();
            ctx.beginPath();
            ctx.arc(-10, -34, 4.5, 0, Math.PI*2); // was -7,-23,3
            ctx.arc(10, -34, 4.5, 0, Math.PI*2);
            ctx.fillStyle = "#4b3214";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, -20, 10, 0, Math.PI); // was 0,-13,7
            ctx.strokeStyle = "#a47d4a";
            ctx.lineWidth = 3; // was 2
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
}
window.Player = Player;