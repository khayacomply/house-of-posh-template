document.addEventListener("DOMContentLoaded", () => {
  // Splash Screen
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = "0";
      setTimeout(() => splash.style.display = "none", 600);
    }, 800);
  }

  // Modern Hero Slideshow (Home only)
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.slide-arrow.prev');
  const nextBtn = document.querySelector('.slide-arrow.next');

  if (slides.length > 0) {
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

    nextBtn?.addEventListener('click', () => {
      clearInterval(slideInterval);
      nextSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });

    prevBtn?.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide((currentSlide - 1 + totalSlides) % totalSlides);
      slideInterval = setInterval(nextSlide, 5000);
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // Fade-in Animations (Services)
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Dynamic WhatsApp (Bookings Page)
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

  // Perfume Gallery: Scroll Animation + Lightbox
  const perfumeCards = document.querySelectorAll('.perfume-card');
  const perfumeLightbox = document.getElementById('perfume-lightbox');
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

    perfumeImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        perfumeLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn?.addEventListener('click', () => {
      perfumeLightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    perfumeLightbox.addEventListener('click', (e) => {
      if (e.target === perfumeLightbox) {
        perfumeLightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && perfumeLightbox.classList.contains('active')) {
        perfumeLightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ✨ PAGE-FLIP GALLERY LIGHTBOX (Gallery Page Only) ✨
  const galleryImgs = document.querySelectorAll('.masonry-gallery img');
  const pageFlipLightbox = document.getElementById('page-flip-lightbox');
  
  if (galleryImgs.length > 0 && pageFlipLightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const nextPreview = document.getElementById('next-preview');
    const prevBtn = pageFlipLightbox.querySelector('.prev-btn');
    const nextBtn = pageFlipLightbox.querySelector('.next-btn');
    const closeBtn = pageFlipLightbox.querySelector('.close-btn');
    let currentIndex = 0;
    const images = [];

    // Build image array
    galleryImgs.forEach(img => {
      images.push({
        src: img.src,
        alt: img.alt
      });
    });

    // Open lightbox
    galleryImgs.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        updateLightbox();
        pageFlipLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function updateLightbox() {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      const nextIndex = (currentIndex + 1) % images.length;
      nextPreview.src = images[nextIndex].src;
    }

    // Next (flip animation)
    nextBtn?.addEventListener('click', () => {
      const flipper = pageFlipLightbox.querySelector('.flipper');
      flipper.classList.add('flipped');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
        flipper.classList.remove('flipped');
      }, 800);
    });

    // Prev (instant)
    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    });

    // Close
    closeBtn?.addEventListener('click', () => {
      pageFlipLightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
      if (!pageFlipLightbox.classList.contains('active')) return;
      
      if (e.key === 'ArrowRight') {
        const flipper = pageFlipLightbox.querySelector('.flipper');
        flipper.classList.add('flipped');
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % images.length;
          updateLightbox();
          flipper.classList.remove('flipped');
        }, 800);
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
      } else if (e.key === 'Escape') {
        pageFlipLightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ✅ SCROLL-REVEAL FOR ABOUT PAGE
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

  // ✅ FAQ ACCORDION (ADDED HERE)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
});