class Pedestrian {
    static preloadRightImages() {
        if (!Pedestrian.rightImgs) {
            Pedestrian.rightImgs = [
                new window.Image(),
                new window.Image(),
                new window.Image()
            ];
            // Use the provided URLs for right-walking pedestrians (runrighttttt frames)
            Pedestrian.rightImgs[0].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/runrighttttt_frame_1.png";
            Pedestrian.rightImgs[1].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/runrighttttt_frame_2.png";
            Pedestrian.rightImgs[2].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/runrighttttt_frame_3.png";
        }
    }
    static preloadLeftImages() {
        if (!Pedestrian.leftImgs) {
            Pedestrian.leftImgs = [
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image()
            ];
            // Use the provided URLs for left-walking pedestrians
            Pedestrian.leftImgs[0].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walk%20left_frame_1.png";
            Pedestrian.leftImgs[1].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walk_left_frame_1.png";
            Pedestrian.leftImgs[2].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walk_left_frame_2.png";
            Pedestrian.leftImgs[3].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walk_left_frame_3.png";
        }
    }
    constructor(x, y, dir) {
        Pedestrian.preloadRightImages();
        Pedestrian.preloadLeftImages();
        // --- SIDEWALK ALIGNMENT ---
        // Sidewalk: y = 720 - 64 = 656, height = 44
        // We want the feet to be on the sidewalk, not the curb.
        // To ensure the feet are visually on the sidewalk, set y so that the bottom of the sprite aligns with the top of the sidewalk.
        // The draw code draws from (this.x, this.y), with the image's feet at (this.height) below y.
        // Place y so that (this.y + this.height) = 656 + 44 - 4 (a few px up from bottom of sidewalk)
        // So y = 656 + 44 - 4 - this.height
        const sidewalkY = 720 - 64;
        const sidewalkHeight = 44;
        const feetOffset = 4; // how many px above the bottom of the sidewalk the feet should be
        this.width = 78; // was 54, previously 34
        this.height = 102; // was 70, previously 44
        this.x = x;
        this.y = sidewalkY + sidewalkHeight - feetOffset - this.height;
        this.dir = dir;
        this.speed = 52 + Math.random()*36;
        this.walkOffset = Math.random()*Math.PI*2;
        this.colorMain = ["#e67a2e","#60d978","#e7da4b","#e355c8","#85b7e6"][Math.floor(Math.random()*5)];
    }
    update(dt) { this.x += this.dir * this.speed * dt; }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Pedestrians moving right (dir > 0) use sprite animation
        if (this.dir > 0 && Pedestrian.rightImgs) {
            // Animation: cycle through 3 frames, about 8 fps
            const now = Date.now();
            const animSpeed = 120; // ms per frame (~8 fps)
            const frameIdx = Math.floor((now / animSpeed + this.walkOffset * 10) % 3);
            const img = Pedestrian.rightImgs[frameIdx];

            // Draw shadow (make larger)
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.beginPath();
            ctx.ellipse(0, this.height*0.97, 40, 18, 0, 0, Math.PI*2); // was 28,12, before 16,6
            ctx.fillStyle = "#333";
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();

            // Only draw image if loaded
            if (img && img.complete && img.naturalWidth > 0) {
                // Center horizontally, align feet to bottom
                // Make image even larger
                const drawW = 120; // was 84, before 48
                const drawH = 160; // was 112, before 64
                ctx.drawImage(img, -drawW/2, -drawH + this.height, drawW, drawH);
            } else {
                // fallback: simple colored ellipse (make larger)
                ctx.beginPath();
                ctx.ellipse(0, 30, 36, 50, 0, 0, Math.PI*2); // was 24,34 at 20, previously 14,20 at 12
                ctx.fillStyle = this.colorMain;
                ctx.shadowColor = this.colorMain;
                ctx.shadowBlur = 28; // was 18, before 10
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.arc(0, -6, 22, 0, Math.PI*2); // was 15 at -4, previously 9 at -2
                var grad = ctx.createRadialGradient(0, -6, 6, 0, -6, 22); // was 4,15, previously 2,9
                grad.addColorStop(0, "#ffeebb");
                grad.addColorStop(1, "#bba465");
                ctx.fillStyle = grad;
                ctx.fill();
            }
            ctx.restore();
            return;
        }

        // Pedestrians moving left (dir < 0) use left sprite animation
        if (this.dir < 0 && Pedestrian.leftImgs) {
            // Animation: cycle through 4 frames, about 8 fps
            const now = Date.now();
            const animSpeed = 120; // ms per frame (~8 fps)
            const frameIdx = Math.floor((now / animSpeed + this.walkOffset * 10) % 4);
            const img = Pedestrian.leftImgs[frameIdx];

            // Draw shadow (make larger)
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.beginPath();
            ctx.ellipse(0, this.height*0.97, 40, 18, 0, 0, Math.PI*2); // was 28,12, before 16,6
            ctx.fillStyle = "#333";
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();

            // Only draw image if loaded
            if (img && img.complete && img.naturalWidth > 0) {
                // Center horizontally, align feet to bottom
                // Make image even larger
                const drawW = 120; // was 84, before 48
                const drawH = 160; // was 112, before 64
                ctx.drawImage(img, -drawW/2, -drawH + this.height, drawW, drawH);
            } else {
                // fallback: simple colored ellipse (make larger)
                ctx.beginPath();
                ctx.ellipse(0, 30, 36, 50, 0, 0, Math.PI*2); // was 24,34 at 20, previously 14,20 at 12
                ctx.fillStyle = this.colorMain;
                ctx.shadowColor = this.colorMain;
                ctx.shadowBlur = 28; // was 18, before 10
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.arc(0, -6, 22, 0, Math.PI*2); // was 15 at -4, previously 9 at -2
                var grad = ctx.createRadialGradient(0, -6, 6, 0, -6, 22); // was 4,15, previously 2,9
                grad.addColorStop(0, "#ffeebb");
                grad.addColorStop(1, "#bba465");
                ctx.fillStyle = grad;
                ctx.fill();
            }
            ctx.restore();
            return;
        }

        // (Should not reach here, but fallback)
        // Shadow (make larger)
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.ellipse(0, this.height*0.97, 40, 18, 0, 0, Math.PI*2); // was 28,12, before 16,6
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.globalAlpha = 1.0;
        // Body (make larger)
        ctx.beginPath();
        ctx.ellipse(0, 30, 36, 50, 0, 0, Math.PI*2); // was 24,34 at 20, previously 14,20 at 12
        ctx.fillStyle = this.colorMain;
        ctx.shadowColor = this.colorMain;
        ctx.shadowBlur = 28; // was 18, before 10
        ctx.fill();
        ctx.shadowBlur = 0;
        // Head (make larger)
        ctx.beginPath();
        ctx.arc(0, -6, 22, 0, Math.PI*2); // was 15 at -4, previously 9 at -2
        var grad = ctx.createRadialGradient(0, -6, 6, 0, -6, 22); // was 4,15, previously 2,9
        grad.addColorStop(0, "#ffeebb");
        grad.addColorStop(1, "#bba465");
        ctx.fillStyle = grad;
        ctx.fill();
        // Legs (walking animation, make longer)
        ctx.save();
        ctx.strokeStyle = "#3b2724";
        ctx.lineWidth = 10; // was 6, before 4
        let walk = Math.sin(Date.now()/240 + this.walkOffset);
        ctx.beginPath();
        ctx.moveTo(-18, 82); // was -10,54, before -6,34
        ctx.lineTo(-18, 60 + walk*20); // was -10,38+walk*10, before -6,24+walk*5
        ctx.moveTo(18, 82);
        ctx.lineTo(18, 60 - walk*20);
        ctx.stroke();
        ctx.restore();
        ctx.restore();
    }
}
window.Pedestrian = Pedestrian;