// script.js - Advanced Animations and Effects

document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scroll Implementation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Lazy Loading Images
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("show");
  });

  // Carousel Implementation
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const testimonials = document.querySelectorAll(".testimonial-card");
  let mobile = window.matchMedia("(max-width: 768px)").matches;
  let currentIndex = 0;

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    testimonials.forEach((testimonial) => {
      let testimonialsGap = parseInt(getComputedStyle(document.querySelector(".testimonials-grid")).gap);
      let testimonialWidth = parseInt(getComputedStyle(testimonial).width);
      let translateValue = testimonialWidth + testimonialsGap;
      testimonial.style.transform = `translateX(-${currentIndex * translateValue}px)`;
    });
  });

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    mobile = window.matchMedia("(max-width: 768px)").matches;
    if (mobile) {
      if (currentIndex > 3) {
        currentIndex = 3;
      }
    } else {
      if (currentIndex > 1) {
        currentIndex = 1;
      }
    }
    testimonials.forEach((testimonial) => {
      let testimonialsGap = parseInt(getComputedStyle(document.querySelector(".testimonials-grid")).gap);
      let testimonialWidth = parseInt(getComputedStyle(testimonial).width);
      let translateValue = testimonialWidth + testimonialsGap;
      testimonial.style.transform = `translateX(-${currentIndex * translateValue}px)`;
    });
  });

  // Dark Mode Toggle
  const toggleBtn = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");
  const clientLogos = document.querySelectorAll(".client-logos .logo");
  const seoX = document.querySelectorAll(".client-logos .logo")[4];
  const body = document.body;

  function updateLogo() {
    const isDark = body.classList.contains("dark-mode");
    if (isDark) {
      clientLogos[0].style.filter = "invert(1)";
      clientLogos[2].style.filter = "invert(1)";
      seoX.src = "images/seox-logo-inverted.svg";
    } else {
      clientLogos[0].style.filter = "invert(0)";
      clientLogos[2].style.filter = "invert(0)";
      seoX.src = "images/seox-logo-dark.svg";
    }
    logo.src = isDark ? "images/allthatbrand-logo-white.svg" : "images/allthatbrand-logo-dark.svg";
    toggleBtn.textContent = isDark ? "Light" : "Dark";
  }

  function setInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    let isDark;

    if (savedTheme === "dark" || savedTheme === "light") {
      isDark = savedTheme === "dark";
    } else {
      // Use system preference if no theme is saved
      isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    body.classList.toggle("dark-mode", isDark);
    updateLogo();
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateLogo();
  });

  setInitialTheme();
});
