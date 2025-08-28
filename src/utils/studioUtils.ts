export const generateUniqueId = (): string => {
    return `flower-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
};

export const createSparkleEffect = (x: number, y: number): void => {
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = x + (Math.random() - 0.5) * 40 + 'px';
        sparkle.style.top = y + (Math.random() - 0.5) * 40 + 'px';

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
};