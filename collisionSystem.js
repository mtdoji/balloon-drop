class CollisionSystem {
    // Balloons and pedestrians (and police) collision
    static checkBalloonCollisions(balloons, pedestrians, police, onPedestrianHit, onPoliceHit) {
        for (let i = balloons.length - 1; i >= 0; i--) {
            const b = balloons[i];
            // Pedestrians
            for (let j = pedestrians.length - 1; j >= 0; j--) {
                const p = pedestrians[j];
                if (CollisionSystem.circleRect(b.x, b.y, b.radius, p.x, p.y, p.width, p.height)) {
                    onPedestrianHit(i, j);
                    break; // balloon removed, skip
                }
            }
            // Police
            for (let k = police.length - 1; k >= 0; k--) {
                const cop = police[k];
                if (CollisionSystem.circleRect(b.x, b.y, b.radius, cop.x, cop.y, cop.width, cop.height)) {
                    onPoliceHit(i, k);
                    break;
                }
            }
        }
    }
    // Circle-Rect collision
    static circleRect(cx, cy, cr, rx, ry, rw, rh) {
        // Find closest point to circle center inside rectangle
        let closestX = Math.max(rx, Math.min(cx, rx + rw));
        let closestY = Math.max(ry, Math.min(cy, ry + rh));
        let dx = cx - closestX;
        let dy = cy - closestY;
        return (dx * dx + dy * dy) <= cr * cr;
    }
}
window.CollisionSystem = CollisionSystem;