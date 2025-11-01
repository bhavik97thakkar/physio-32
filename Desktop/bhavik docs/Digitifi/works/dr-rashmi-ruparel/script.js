// Initialize Lucide icons
lucide.createIcons();

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Toggle hamburger/close icon
  const icon = navToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.setAttribute('data-lucide', 'x');
  } else {
    icon.setAttribute('data-lucide', 'menu');
  }
  lucide.createIcons();
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced Testimonials slider with smooth transitions
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.dot');
    this.autoplayInterval = null;
    this.isTransitioning = false;
    
    this.init();
  }
  
  init() {
    this.showSlide(0);
    this.addEventListeners();
    this.startAutoplay();
  }
  
  addEventListeners() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (!this.isTransitioning) {
          this.showSlide(index);
          this.resetAutoplay();
        }
      });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }
  
  showSlide(index) {
    this.isTransitioning = true;
    
    // Hide all slides
    this.slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        setTimeout(() => {
          slide.classList.add('active');
          this.isTransitioning = false;
        }, 100);
      }
    });
    
    this.dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    this.dots[index].classList.add('active');
    
    this.currentSlide = index;
  }
  
  nextSlide() {
    if (!this.isTransitioning) {
      const nextIndex = (this.currentSlide + 1) % this.slides.length;
      this.showSlide(nextIndex);
    }
  }

  prevSlide() {
    if (!this.isTransitioning) {
      const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.showSlide(prevIndex);
    }
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

// Initialize testimonials slider
new TestimonialSlider();

// Enhanced Gallery lightbox with keyboard navigation
class GalleryLightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxClose = document.querySelector('.lightbox-close');
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.currentIndex = 0;
    this.images = [];
    
    this.init();
  }
  
  init() {
    // Store all image sources
    this.galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      this.images.push({
        src: img.src,
        alt: img.alt
      });
    });

    this.addEventListeners();
  }
  
  addEventListeners() {
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.currentIndex = index;
        this.openLightbox(this.images[index].src, this.images[index].alt);
      });
    });
    
    this.lightboxClose.addEventListener('click', () => {
      this.closeLightbox();
    });
    
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (this.lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          this.closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          this.prevImage();
        } else if (e.key === 'ArrowRight') {
          this.nextImage();
        }
      }
    });
  }

  openLightbox(src, alt) {
    this.lightboxImg.src = src;
    this.lightboxImg.alt = alt;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.lightboxImg.src = this.images[this.currentIndex].src;
    this.lightboxImg.alt = this.images[this.currentIndex].alt;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.lightboxImg.src = this.images[this.currentIndex].src;
    this.lightboxImg.alt = this.images[this.currentIndex].alt;
  }
}

// Initialize gallery lightbox
new GalleryLightbox();

// Enhanced scroll animations with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add special animations for specific elements
      if (entry.target.classList.contains('service-card')) {
        entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
      }
    }
  });
}, observerOptions);

// Add scroll animation class to elements
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.service-card, .feature-card, .gallery-item, .contact-item, .qualification-item'
  );
  
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
});

// Enhanced parallax effect for hero section
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage && scrolled < window.innerHeight) {
    const rate = scrolled * -0.2;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Enhanced hover effects for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  // Add staggered entrance animation
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-15px) scale(1.02)';
    card.style.boxShadow = 'var(--shadow-xl)';
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(0, 184, 148, 0.1);
      transform: translate(-50%, -50%);
      transition: all 0.5s ease;
      pointer-events: none;
      z-index: 0;
    `;
    card.appendChild(ripple);
    
    setTimeout(() => {
      ripple.style.width = '200px';
      ripple.style.height = '200px';
    }, 10);
    
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = 'var(--shadow-sm)';
  });
});

// Enhanced feature cards with magnetic effect
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Contact form submission handler (placeholder for future use)
function handleContactForm() {
  console.log('Contact form handler ready for integration');
}

// Loading animation for images with fade-in effect
document.querySelectorAll('img').forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  
  if (img.complete) {
    img.style.opacity = '1';
  }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Initialize all icons after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Add entrance animations to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
      if (section.getBoundingClientRect().top < window.innerHeight) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    }, index * 100);
  });
});

// Enhanced smooth reveal animations for sections
const revealSections = () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > sectionTop - windowHeight + sectionHeight / 3) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Add click tracking for analytics (placeholder)
document.querySelectorAll('a[href^="tel:"], .btn').forEach(element => {
  element.addEventListener('click', (e) => {
    // Add smooth click animation
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 150);
    
    // Analytics tracking can be added here
    console.log('Button clicked:', element.textContent.trim());
  });
});

// Add floating animation to heart-pulse icons
document.querySelectorAll('[data-lucide="heart-pulse"]').forEach(icon => {
  icon.style.animation = 'pulse 2s infinite';
});

// Enhanced scroll indicator functionality
document.querySelector('.scroll-indicator').addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth'
  });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//   const heroTitle = document.querySelector('.hero-title');
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 50);
// });
