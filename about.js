document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.parallax-scene');

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        scenes.forEach(scene => {
            const bg = scene.querySelector('.parallax-bg');
            // Move the background up at a slower rate than the scroll
            const speed = 0.3;
            const offset = scene.offsetTop;
            const yPos = -(scrollY - offset) * speed;
            bg.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Animate story boxes on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the scene is visible
    });

    scenes.forEach(scene => {
        observer.observe(scene);
    });
});