document.addEventListener("DOMContentLoaded", () => {
  // ✅ Splash Screen
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = "0";
      setTimeout(() => splash.style.display = "none", 600);
    }, 800);
  }

  // ✅ Hero Slideshow (Home only)
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slide-arrow.prev');
    const nextBtn = document.querySelector('.slide-arrow.next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(ind => ind.classList.remove('active'));
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % totalSlides);
    }

    let slideInterval = setInterval(nextSlide, 5000);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide((currentSlide - 1 + totalSlides) % totalSlides);
        slideInterval = setInterval(nextSlide, 5000);
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // ✅ Fade-in Animations (Services)
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ✅ Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // ✅ Dynamic WhatsApp (Bookings Page)
  const serviceSelect = document.getElementById("service");
  const waLink = document.querySelector(".quick-book a");
  if (serviceSelect && waLink) {
    serviceSelect.addEventListener("change", () => {
      const service = serviceSelect.value;
      if (service) {
        waLink.href = `https://wa.me/27772449092?text=Hi!%20I%20want%20to%20book%20${encodeURIComponent(service)}.`;
      }
    });
  }

  // ✅ PERFUME LIGHTBOX — WITH HEADER HIDE/SHOW
  const perfumeCards = document.querySelectorAll('.perfume-card');
  const perfumeLightbox = document.getElementById('perfume-lightbox');
  const header = document.querySelector('.header'); // ← GET HEADER ONCE

  if (perfumeCards.length > 0 || perfumeLightbox) {
    if (perfumeCards.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, { threshold: 0.1 });

      perfumeCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        observer.observe(card);
      });
    }

    if (perfumeLightbox) {
      const perfumeImages = document.querySelectorAll('.perfume-card img');
      const lightboxImg = perfumeLightbox.querySelector('.lightbox-content');
      const closeBtn = perfumeLightbox.querySelector('.lightbox-close');

      if (lightboxImg) {
        perfumeImages.forEach(img => {
          img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            perfumeLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (header) header.style.display = 'none'; // ✅ HIDE
          });
        });
      }

      const closePerfumeLightbox = () => {
        perfumeLightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (header) header.style.display = ''; // ✅ RESTORE
      };

      if (closeBtn) {
        closeBtn.addEventListener('click', closePerfumeLightbox);
      }

      perfumeLightbox.addEventListener('click', (e) => {
        if (e.target === perfumeLightbox) closePerfumeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && perfumeLightbox.classList.contains('active')) {
          closePerfumeLightbox();
        }
      });
    }
  }

  // ✨ GALLERY LIGHTBOX — WITH HEADER HIDE/SHOW + NAV
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryLightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryCloseBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-arrow.prev');
  const nextBtn = document.querySelector('.lightbox-arrow.next');

  if (galleryItems.length > 0 && galleryLightbox) {
    const images = Array.from(galleryItems).map(item => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt
    }));
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentIndex = index;
        updateLightbox();
        galleryLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (header) header.style.display = 'none'; // ✅ HIDE
      });
    });

    function updateLightbox() {
      if (lightboxImg) {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
      });
    }

    const closeGalleryLightbox = () => {
      galleryLightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (header) header.style.display = ''; // ✅ RESTORE
    };

    if (galleryCloseBtn) {
      galleryCloseBtn.addEventListener('click', closeGalleryLightbox);
    }

    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeGalleryLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!galleryLightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeGalleryLightbox();
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
      }
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
      }
    });
  }

  // ✅ Scroll-Reveal (About)
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
      el.classList.remove('revealed');
      revealObserver.observe(el);
    });
  }

  // ✅ FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });
});