class Balloon {
    static preloadCoinFrames() {
        if (!Balloon.coinFrames) {
            const urls = [
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_1.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_2.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_3.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_4.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_5.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_6.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_7.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_8.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_9.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_10.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_11.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_12.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_13.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_14.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_15.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_16.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_17.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_18.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_19.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_20.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_21.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_22.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_23.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_24.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_25.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_26.png",
                "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/93109b07-1312-49d8-9dca-94c977c78702/library/frames/coin_frame_27.png"
            ];
            Balloon.coinFrames = urls.map(url => {
                const img = new window.Image();
                img.src = url;
                return img;
            });
        }
    }
    constructor(x, y) {
        Balloon.preloadCoinFrames();
        this.x = x; this.y = y;
        this.radius = 15 + Math.random()*2;
        this.vy = 290 + Math.random()*28;
        this.ay = 200 + Math.random()*50;
        this.tilt = (Math.random()-0.5)*0.12;
        this.tiltSpeed = (Math.random()-0.5)*0.06;
        this.rotation = 0;
        this.animStart = Date.now() + Math.floor(Math.random()*200); // randomize animation phase
    }
    update(dt) {
        this.vy += this.ay * dt;
        this.y += this.vy * dt;
        this.rotation += this.tiltSpeed * dt;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.tilt + this.rotation);

        // Drop shadow
        ctx.globalAlpha = 0.21;
        ctx.beginPath();
        ctx.ellipse(0, this.radius+8, this.radius*0.7, 7, 0, 0, Math.PI*2);
        ctx.fillStyle = "#234";
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw animated coin sprite
        const frames = Balloon.coinFrames;
        if (frames && frames.length > 0) {
            // 27 frames, animate at ~20fps
            const frameCount = frames.length;
            const animSpeed = 1000/20; // ms per frame
            const now = Date.now();
            const frameIdx = Math.floor(((now - this.animStart) / animSpeed) % frameCount);
            const img = frames[frameIdx];

            // Only draw image if loaded
            if (img && img.complete && img.naturalWidth > 0) {
                // Center image, scale to balloon size
                const drawW = this.radius * 2.2;
                const drawH = this.radius * 2.2;
                ctx.drawImage(img, -drawW/2, -drawH/2, drawW, drawH);
                ctx.restore();
                return;
            }
        }

        // Fallback: if images not loaded, draw original balloon
        let grad = ctx.createRadialGradient(0,0,4,0,0,this.radius);
        grad.addColorStop(0, "#5ed3fc");
        grad.addColorStop(0.7, "#19a3da");
        grad.addColorStop(1, "#116bb7");
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius*1.18, 0, 0, Math.PI*2);
        ctx.shadowColor = "#66e7ff";
        ctx.shadowBlur = 18;
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Tie
        ctx.beginPath();
        ctx.moveTo(0, this.radius*1.18);
        ctx.lineTo(0, this.radius*1.18+8);
        ctx.strokeStyle = "#0a4d7a";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Highlight
        ctx.beginPath();
        ctx.ellipse(-this.radius*0.33, -this.radius*0.33, 4, 7, 0, 0, Math.PI*2);
        ctx.globalAlpha = 0.43;
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }
}
window.Balloon = Balloon;