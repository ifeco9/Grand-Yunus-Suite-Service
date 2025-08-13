document.addEventListener('DOMContentLoaded', function() {
  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: 5000,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Enhanced Intersection Observer for multiple animation types
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the animation class from data attribute or default to fade-in
        const animationClass = entry.target.dataset.animation || 'fade-in';
        entry.target.classList.add(animationClass);
        // Unobserve after animation is applied
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with the 'animate' class
  document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navBar = document.querySelector('.nav-bar');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navBar.classList.toggle('active');
      // Toggle between menu and close icons
      const isOpen = navBar.classList.contains('active');
      mobileMenuBtn.innerHTML = isOpen ? 
        '<span class="material-symbols-outlined">close</span>' : 
        '<span class="material-symbols-outlined">menu</span>';
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navBar && navBar.classList.contains('active')) {
          navBar.classList.remove('active');
          mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        }
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroSection && heroContent) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < heroSection.offsetHeight) {
        // Move content up slightly as user scrolls down
        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        // Increase opacity of a potential overlay to darken the image
        const overlay = heroSection.querySelector('.hero-overlay');
        if (overlay) {
          const opacity = 0.3 + (scrollPosition / heroSection.offsetHeight) * 0.4;
          overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        }
      }
    });
  }
  
  // Image hover effect for room cards
  document.querySelectorAll('.room-card').forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
      });
      
      card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    }
  });
});