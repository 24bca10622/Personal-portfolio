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

    // Search functionality
    document.getElementById('search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const content = section.textContent.toLowerCase();
                if (content.includes(searchTerm)) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    section.style.animation = 'highlight 2s';
                    setTimeout(() => {
                        section.style.animation = '';
                    }, 2000);
                }
            });
        }
    });
});