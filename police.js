class Police {
    static preloadLeftImages() {
        if (!Police.leftImgs) {
            Police.leftImgs = [
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image()
            ];
            // Use the provided URLs for left-walking police (REPLACED with new 5 frames)
            Police.leftImgs[0].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/cop_left_frame_4.png";
            Police.leftImgs[1].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/cop_left_frame_5.png";
            Police.leftImgs[2].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/cop_left_frame_6.png";
            Police.leftImgs[3].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/cop_left_frame_7.png";
            Police.leftImgs[4].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/cop_left_frame_8.png";
        }
    }
    static preloadRightImages() {
        if (!Police.rightImgs) {
            // Use the provided URLs for right-walking police (walking_righ_cop_frame_*.png)
            Police.rightImgs = [
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image(),
                new window.Image()
            ];
            Police.rightImgs[0].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking%20righ%20cop_frame_1.png";
            Police.rightImgs[1].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_1.png";
            Police.rightImgs[2].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_2.png";
            Police.rightImgs[3].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_3.png";
            Police.rightImgs[4].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_4.png";
            Police.rightImgs[5].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_5.png";
            Police.rightImgs[6].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_6.png";
            Police.rightImgs[7].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_7.png";
            Police.rightImgs[8].src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/walking_righ_cop_frame_8.png";
        }
    }
    constructor(x, y, dir) {
        Police.preloadLeftImages();
        Police.preloadRightImages();
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

        // Set police size to match pedestrian size
        this.width = 78; // Pedestrian: 78
        this.height = 102; // Pedestrian: 102

        this.x = x;
        this.y = sidewalkY + sidewalkHeight - feetOffset - this.height;
        this.dir = dir;
        this.speed = 56 + Math.random()*18;
        this.walkOffset = Math.random()*Math.PI*2;
    }
    update(dt) { this.x += this.dir * this.speed * dt; }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Police moving left (dir < 0) use left sprite animation
        if (this.dir < 0 && Police.leftImgs) {
            // Animation: cycle through 5 frames, about 8 fps
            const now = Date.now();
            const animSpeed = 120; // ms per frame (~8 fps)
            const frameIdx = Math.floor((now / animSpeed + this.walkOffset * 10) % 5);
            const img = Police.leftImgs[frameIdx];

            // Draw shadow (match pedestrian)
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.beginPath();
            ctx.ellipse(0, this.height*0.97, 40, 18, 0, 0, Math.PI*2);
            ctx.fillStyle = "#233";
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();

            // Only draw image if loaded
            if (img && img.complete && img.naturalWidth > 0) {
                // Center horizontally, align feet to bottom
                // Match pedestrian image size
                const drawW = 120; // pedestrian: 120
                const drawH = 160; // pedestrian: 160
                ctx.drawImage(img, -drawW/2, -drawH + this.height, drawW, drawH);
            } else {
                // fallback: original drawing (match pedestrian proportions)
                // Body
                ctx.beginPath();
                ctx.ellipse(0, 30, 36, 50, 0, 0, Math.PI*2);
                ctx.fillStyle = "#234b9d";
                ctx.shadowColor = "#9eb8ff";
                ctx.shadowBlur = 28;
                ctx.fill();
                ctx.shadowBlur = 0;
                // Head
                ctx.beginPath();
                ctx.arc(0, -6, 22, 0, Math.PI*2);
                var grad = ctx.createRadialGradient(0, -6, 6, 0, -6, 22);
                grad.addColorStop(0, "#f7e3a6");
                grad.addColorStop(1, "#cda16c");
                ctx.fillStyle = grad;
                ctx.fill();
                // Police hat
                ctx.save();
                ctx.beginPath();
                ctx.ellipse(0, -24, 28, 12, 0, 0, Math.PI*2);
                ctx.fillStyle = "#18368a";
                ctx.shadowColor = "#223c7c";
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.shadowBlur = 0;
                // Badge
                ctx.beginPath();
                ctx.arc(0, -24, 5, 0, Math.PI*2);
                ctx.fillStyle = "#ffe08d";
                ctx.fill();
                ctx.restore();
                // Arms
                ctx.save();
                ctx.strokeStyle = "#ffe08d";
                ctx.lineWidth = 10;
                let walk = Math.sin(Date.now()/200 + this.walkOffset);
                ctx.beginPath();
                ctx.moveTo(-28, 8);
                ctx.lineTo(-52, 46 + walk*12);
                ctx.moveTo(28, 8);
                ctx.lineTo(52, 46 - walk*12);
                ctx.stroke();
                ctx.restore();
            }
            ctx.restore();
            return;
        }

        // Police moving right (dir > 0) use right sprite animation (NEW: 9 frames)
        if (this.dir > 0 && Police.rightImgs) {
            // Animation: cycle through 9 frames, about 12 fps
            const now = Date.now();
            const animSpeed = 83; // ms per frame (~12 fps)
            const frameIdx = Math.floor((now / animSpeed + this.walkOffset * 10) % 9);
            const img = Police.rightImgs[frameIdx];

            // Draw shadow (match pedestrian)
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.beginPath();
            ctx.ellipse(0, this.height*0.97, 40, 18, 0, 0, Math.PI*2);
            ctx.fillStyle = "#233";
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();

            // Only draw image if loaded
            if (img && img.complete && img.naturalWidth > 0) {
                // Center horizontally, align feet to bottom
                // Match pedestrian image size
                const drawW = 120;
                const drawH = 160;
                ctx.drawImage(img, -drawW/2, -drawH + this.height, drawW, drawH);
            } else {
                // fallback: original drawing (right-facing, match pedestrian proportions)
                // Body
                ctx.beginPath();
                ctx.ellipse(0, 30, 36, 50, 0, 0, Math.PI*2);
                ctx.fillStyle = "#234b9d";
                ctx.shadowColor = "#9eb8ff";
                ctx.shadowBlur = 28;
                ctx.fill();
                ctx.shadowBlur = 0;
                // Head
                ctx.beginPath();
                ctx.arc(0, -6, 22, 0, Math.PI*2);
                var grad = ctx.createRadialGradient(0, -6, 6, 0, -6, 22);
                grad.addColorStop(0, "#f7e3a6");
                grad.addColorStop(1, "#cda16c");
                ctx.fillStyle = grad;
                ctx.fill();
                // Police hat
                ctx.save();
                ctx.beginPath();
                ctx.ellipse(0, -24, 28, 12, 0, 0, Math.PI*2);
                ctx.fillStyle = "#18368a";
                ctx.shadowColor = "#223c7c";
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.shadowBlur = 0;
                // Badge
                ctx.beginPath();
                ctx.arc(0, -24, 5, 0, Math.PI*2);
                ctx.fillStyle = "#ffe08d";
                ctx.fill();
                ctx.restore();
                // Arms
                ctx.save();
                ctx.strokeStyle = "#ffe08d";
                ctx.lineWidth = 10;
                let walk = Math.sin(Date.now()/200 + this.walkOffset);
                ctx.beginPath();
                ctx.moveTo(-28, 8);
                ctx.lineTo(-52, 46 + walk*12);
                ctx.moveTo(28, 8);
                ctx.lineTo(52, 46 - walk*12);
                ctx.stroke();
                ctx.restore();
            }
            ctx.restore();
            return;
        }

        // Default/original drawing for police (fallback)
        // Shadow (match pedestrian)
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.ellipse(0, this.height*0.97, 40, 18, 0, 0, Math.PI*2);
        ctx.fillStyle = "#233";
        ctx.fill();
        ctx.globalAlpha = 1.0;
        // Body (match pedestrian)
        ctx.beginPath();
        ctx.ellipse(0, 30, 36, 50, 0, 0, Math.PI*2);
        ctx.fillStyle = "#234b9d";
        ctx.shadowColor = "#9eb8ff";
        ctx.shadowBlur = 28;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Head (match pedestrian)
        ctx.beginPath();
        ctx.arc(0, -6, 22, 0, Math.PI*2);
        var grad = ctx.createRadialGradient(0, -6, 6, 0, -6, 22);
        grad.addColorStop(0, "#f7e3a6");
        grad.addColorStop(1, "#cda16c");
        ctx.fillStyle = grad;
        ctx.fill();
        // Police hat (match pedestrian proportions)
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, -24, 28, 12, 0, 0, Math.PI*2);
        ctx.fillStyle = "#18368a";
        ctx.shadowColor = "#223c7c";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Badge (match pedestrian proportions)
        ctx.beginPath();
        ctx.arc(0, -24, 5, 0, Math.PI*2);
        ctx.fillStyle = "#ffe08d";
        ctx.fill();
        ctx.restore();
        // Arms (match pedestrian)
        ctx.save();
        ctx.strokeStyle = "#ffe08d";
        ctx.lineWidth = 10;
        let walk = Math.sin(Date.now()/200 + this.walkOffset);
        ctx.beginPath();
        ctx.moveTo(-28, 8);
        ctx.lineTo(-52, 46 + walk*12);
        ctx.moveTo(28, 8);
        ctx.lineTo(52, 46 - walk*12);
        ctx.stroke();
        ctx.restore();
        ctx.restore();
    }
}
window.Police = Police;