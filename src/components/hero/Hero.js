// src/components/hero/Hero.js
import { smoothScrollTo } from '../../utils/domUtils.js';

export class Hero {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = document.createElement('section');
    this.element.className = 'hero';
    this.element.id = 'accueil';
    
    this.element.innerHTML = `
      <div class="hero-content">
        <h2 class="title-hero fade-in-up">Cyclo Club de Bohars</h2>
        <p class="subtitle fade-in-up-delay-1">Découvrez les plus beaux circuits du Finistère à vélo</p>
        <a href="#club" class="btn btn-primary cta-button fade-in-up-delay-2">Rejoignez-nous</a>
      </div>
      <div class="scroll-indicator">
        <span>↓</span>
      </div>
    `;

    this.setupEventListeners();
    this.addParallaxEffect();
    
    return this.element;
  }

  setupEventListeners() {
    // Bouton CTA
    const ctaButton = this.element.querySelector('.cta-button');
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('club');
    });

    // Indicateur de scroll
    const scrollIndicator = this.element.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
      const nextSection = this.element.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  addParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (this.element) {
        this.element.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Effet de typing pour le titre (optionnel)
  addTypingEffect() {
    const title = this.element.querySelector('.title-hero');
    const text = 'Cyclo Club de Bohars';
    title.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Démarrer l'effet après un délai
    setTimeout(typeWriter, 500);
  }

  // Animation des particules en arrière-plan (optionnel)
  addParticleAnimation() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    this.element.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = this.element.offsetWidth;
      canvas.height = this.element.offsetHeight;
    };
    
    // Créer les particules
    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    // Animer les particules
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);
  }

  // Méthode d'initialisation avec options
  init(options = {}) {
    if (options.typing) {
      this.addTypingEffect();
    }
    
    if (options.particles) {
      this.addParticleAnimation();
    }
  }
}