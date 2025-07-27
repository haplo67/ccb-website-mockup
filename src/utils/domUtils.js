// src/utils/domUtils.js

export const createElement = (tag, className = '', content = '') => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;
  return element;
};

export const createCard = (className = 'card') => {
  return createElement('div', className);
};

export const createButton = (text, onClick, className = 'btn btn-primary') => {
  const button = createElement('button', className, text);
  if (onClick) button.addEventListener('click', onClick);
  return button;
};

export const smoothScrollTo = (targetId) => {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const setupSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScrollTo(targetId);
    });
  });
};

export const addScrollAnimation = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observer les cartes et sections
  document.querySelectorAll('.card, .section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
};

export const setActiveNavItem = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Retirer la classe active de tous les liens
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Ajouter la classe active au lien correspondant
        const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, {
    threshold: 0.5
  });

  sections.forEach(section => observer.observe(section));
};

export const showLoading = (container) => {
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>
  `;
};

export const hideLoading = (container) => {
  const spinner = container.querySelector('.loading-spinner');
  if (spinner) {
    spinner.remove();
  }
};

export const showError = (container, message = 'Une erreur est survenue') => {
  container.innerHTML = `
    <div class="error-message">
      <p>⚠️ ${message}</p>
    </div>
  `;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};