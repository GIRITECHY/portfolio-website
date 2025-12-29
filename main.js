// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(`${currentTheme}-theme`);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Fade In/Out Animation
const typingText = document.getElementById('typingText');
const words = ['Full Stack Developer in Progress', 'Tech Enthusiast', 'Future Developer'];
let wordIndex = 0;

function fadeAnimation() {
    // Fade out
    typingText.style.opacity = '0';
    typingText.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        // Change text
        typingText.textContent = words[wordIndex];

        // Fade in
        typingText.style.opacity = '1';

        // Move to next word
        wordIndex = (wordIndex + 1) % words.length;

        // Wait 3 seconds before next transition
        setTimeout(fadeAnimation, 3000);
    }, 500);
}

// Start animation after page load
setTimeout(() => {
    typingText.textContent = words[0];
    typingText.style.opacity = '1';
    wordIndex = 1;
    setTimeout(fadeAnimation, 3000);
}, 1000);

// GSAP Animations
// Animate sections on scroll
gsap.utils.toArray('section').forEach((section, index) => {
    const elements = section.querySelectorAll('.section-title, .section-subtitle, .about-content, .about-image, .project-card, .contact-card');

    elements.forEach((element, i) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
});

// Skill tags animation
gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: index * 0.05,
        ease: 'back.out(1.7)'
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for gradient orbs
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    gsap.to('.orb-1', {
        x: mouseX * 50,
        y: mouseY * 50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to('.orb-2', {
        x: mouseX * -30,
        y: mouseY * -30,
        duration: 1.2,
        ease: 'power2.out'
    });

    gsap.to('.orb-3', {
        x: mouseX * 40,
        y: mouseY * -40,
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        gsap.to(this.querySelector('.project-image'), {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function () {
        gsap.to(this.querySelector('.project-image'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.hero-text, .hero-btn, .about-content, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

console.log('Portfolio website loaded successfully! 🚀');
