// script.js - Advanced Animations and Effects

document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll Implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-In Animation with Scale Effect Using Intersection Observer API
    const fadeIns = document.querySelectorAll('.fade-in');
    const slideIns = document.querySelectorAll('.slide-in');
    const parallaxElements = document.querySelectorAll('.parallax');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    fadeIns.forEach(fadeIn => {
        appearOnScroll.observe(fadeIn);
    });

    slideIns.forEach(slideIn => {
        appearOnScroll.observe(slideIn);
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(parallax => {
            const speed = parallax.getAttribute('data-speed');
            const offset = window.pageYOffset;
            parallax.style.transform = `translateY(${offset * speed}px)`;
        });
    });

    // Lazy Loading Images
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('show');
    });

    // Dark Mode Toggle
    const toggleBtn = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');
    const body = document.body;

    function updateLogo() {
        const isDark = body.classList.contains('dark-mode');
        logo.src = isDark ? 'images/allthatbrand-logo-white.svg' : 'images/allthatbrand-logo-dark.svg';
        toggleBtn.textContent = isDark ? 'Light' : 'Dark';
    }

    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        let isDark;
    
        if (savedTheme === 'dark' || savedTheme === 'light') {
            isDark = savedTheme === 'dark';
        } else {
            // Use system preference if no theme is saved
            isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    
        body.classList.toggle('dark-mode', isDark);
        updateLogo();
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateLogo();
    });

    setInitialTheme();

    // Hover Animations
    const hoverables = document.querySelectorAll('.hoverable');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovered');
        });
    });

});
