document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navbar.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (navbar.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Animation for skill bars
    const skillBars = document.querySelectorAll('.skills-content .progress .bar span');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const width = bar.parentElement.previousElementSibling.querySelector('span').textContent;
        bar.style.width = width;
      });
    }
    
    // Trigger animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateSkillBars();
        observer.unobserve(skillsSection);
      }
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);

    // Update the slider functionality in script.js
document.addEventListener('DOMContentLoaded', function() {
  // ... (keep all existing code before the slider section)
  
  // Enhanced Slider Functionality
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;
  let slideInterval;
  
  // Create dots
  slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if(index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
          showSlide(index);
          resetInterval();
      });
      dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
      showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
      showSlide(currentSlide - 1);
  }
  
  function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
  });
  
  nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
  });
  
  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  const slider = document.querySelector('.slider');
  
  slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
          nextSlide(); // Swipe left
      }
      if (touchEndX > touchStartX + 50) {
          prevSlide(); // Swipe right
      }
      resetInterval();
  }
  
  // Start auto-sliding
  resetInterval();
  
  // Pause on hover (for desktop)
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
      resetInterval();
  });
  
  // ... (keep all existing code after the slider section)
});
