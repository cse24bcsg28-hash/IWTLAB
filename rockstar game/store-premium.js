document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Reveal (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.premium-card').forEach((card, index) => {
        // Staggered delay based on flex/grid position
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // 2. Ultra-Smooth 3D Card Tilt Effect
    const cards = document.querySelectorAll('.premium-card-inner');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt amount (adjust 15 for more/less tilt)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            // Snap back transition
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s';
        });
    });

    // 3. Parallax Hero Background Scroll
    const heroBg = document.querySelector('.store-hero-bg');
    if(heroBg) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if(scroll < window.innerHeight) {
                heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
            }
        });
    }

    // 4. Button Ripple Micro-Interaction
    const buttons = document.querySelectorAll('.btn-premium');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
