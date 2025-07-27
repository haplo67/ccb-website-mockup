// src/components/header/Header.js
import { smoothScrollTo } from '../../utils/domUtils.js';

export class Header {
  constructor() {
    this.element = null;
    this.isScrolled = false;
  }

  render() {
    this.element = document.createElement('header');
    this.element.className = 'header';
    this.element.innerHTML = `
      <div class="nav-container">
        <div class="logo">
          <img src="/images/logo-ccb.svg" alt="CCB Logo" />
          <h1>CCB</h1>
        </div>
        <nav>
          <ul class="nav-menu">
            <li><a href="#accueil" data-section="accueil">Accueil</a></li>
            <li><a href="#agenda" data-section="agenda">Agenda</a></li>
            <li><a href="#circuits" data-section="circuits">Circuits</a></li>
            <li><a href="#club" data-section="club">Le Club</a></li>
            <li><a href="#contact" data-section="contact">Contact</a></li>
          </ul>
        </nav>
        <button class="mobile-menu-toggle" aria-label="Menu mobile">
          ☰
        </button>
      </div>
    `;

    this.setupEventListeners();
    this.setupScrollEffect();
    
    return this.element;
  }

  setupEventListeners() {
    // Navigation douce
    const navLinks = this.element.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
        
        // Mise à jour de l'état actif
        this.setActiveLink(link);
      });
    });

    // Menu mobile (pour plus tard)
    const mobileToggle = this.element.querySelector('.mobile-menu-toggle');
    mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
  }

  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 50;
      
      if (scrolled !== this.isScrolled) {
        this.isScrolled = scrolled;
        
        if (scrolled) {
          this.element.style.background = 'rgba(44, 85, 48, 0.95)';
          this.element.style.backdropFilter = 'blur(10px)';
        } else {
          this.element.style.background = 'var(--gradient-primary)';
          this.element.style.backdropFilter = 'none';
        }
      }
    });
  }

  setActiveLink(activeLink) {
    // Retirer active de tous les liens
    const allLinks = this.element.querySelectorAll('.nav-menu a');
    allLinks.forEach(link => link.classList.remove('active'));
    
    // Ajouter active au lien cliqué
    activeLink.classList.add('active');
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = this.element.querySelectorAll('.nav-menu a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Mettre à jour la navigation
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-80px 0px -80px 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  toggleMobileMenu() {
    const navMenu = this.element.querySelector('.nav-menu');
    const isOpen = navMenu.classList.contains('mobile-open');
    
    if (isOpen) {
      navMenu.classList.remove('mobile-open');
      navMenu.style.display = 'none';
    } else {
      navMenu.classList.add('mobile-open');
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'var(--color-primary)';
      navMenu.style.padding = 'var(--spacing-md)';
      navMenu.style.boxShadow = 'var(--shadow-lg)';
    }
  }

  init() {
    // Initialiser après que le DOM soit prêt
    setTimeout(() => {
      this.updateActiveSection();
    }, 100);
  }
}