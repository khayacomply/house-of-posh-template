/* ================================
   HOUSE OF POSH — MASTER SCRIPT
   ✔ No crashes
   ✔ Safe on all pages
   ✔ Hamburger works everywhere
   ✔ Slider safe
   ✔ Lightbox safe
   ✔ Fade animations safe
   ================================ */


/* ======================================
   1. SPLASH SCREEN (safe)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = "0";
      setTimeout(() => splash.style.display = "none", 600);
    }, 800);
  }
});


/* ======================================
   2. HERO SLIDER (safe)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");

  if (slides.length > 0) {
    let currentSlide = 0;

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4500);
  }
});


/* ======================================
   3. LIGHTBOX — GALLERY PAGE ONLY (safe)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".masonry-gallery img");
  const lightbox = document.getElementById("lightbox");

  if (galleryImages.length > 0 && lightbox) {
    const lightboxImg = document.querySelector(".lightbox-content");
    const closeBtn = document.querySelector(".close");

    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
});


/* ======================================
   4. FADE-IN ANIMATIONS (safe)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in, .fade-up, .fade-left, .fade-right");

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => observer.observe(el));
  }
});


/* ======================================
   5. HAMBURGER MENU (always safe)
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
  }
});
