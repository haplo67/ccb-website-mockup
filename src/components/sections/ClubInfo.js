// src/components/sections/ClubInfo.js
import { clubInfo } from '../../data/clubInfo.js';

export class ClubInfo {
  constructor() {
    this.element = null;
    this.info = clubInfo;
  }

  render() {
    this.element = document.createElement('section');
    this.element.className = 'section section-bg';
    this.element.id = 'club';
    
    this.element.innerHTML = `
      <h3 class="title">Le Cyclo Club de Bohars</h3>
      
      <div class="club-content grid grid-2">
        <div class="club-description">
          <h4 class="text-primary mb-md">Notre passion : le cyclotourisme</h4>
          <p class="mb-md">${this.info.description}</p>
          <p class="mb-md"><strong>Mission :</strong> ${this.info.mission}</p>
          
          <div class="club-stats mb-lg">
            <h5 class="text-primary mb-sm">Quelques chiffres</h5>
            <div class="stats-grid grid grid-2">
              <div class="stat-item">
                <div class="stat-number">${this.info.stats.members}</div>
                <div class="stat-label">Membres actifs</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${this.info.stats.totalKm2024.toLocaleString()}</div>
                <div class="stat-label">km parcourus en 2024</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${this.info.stats.ridesPerYear}</div>
                <div class="stat-label">Sorties par an</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${this.info.founded}</div>
                <div class="stat-label">Année de création</div>
              </div>
            </div>
          </div>
          
          <a href="#contact" class="btn btn-primary">Nous rejoindre</a>
        </div>
        
        <div class="club-visual">
          <div class="club-photo">
            <div class="photo-placeholder">
              <div class="photo-icon">🚴‍♂️</div>
              <h4 class="text-primary">Photo de groupe</h4>
              <p class="text-light">Dernière sortie collective<br>Juillet 2025</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="club-levels mt-xl">
        <h4 class="text-primary text-center mb-lg">Nos 3 groupes de niveau</h4>
        <div class="levels-grid grid grid-3">
          ${this.info.levels.map(level => this.createLevelCard(level)).join('')}
        </div>
      </div>
      
      <div class="club-details mt-xl">
        <div class="grid grid-2">
          <div class="schedule-info">
            <h4 class="text-primary mb-md">Horaires des sorties</h4>
            <div class="schedule-item">
              <strong>🗓️ Samedi :</strong>
              <span>${this.info.schedule.saturday.winter} (hiver) / ${this.info.schedule.saturday.summer} (été)</span>
              <div class="schedule-desc">${this.info.schedule.saturday.description}</div>
            </div>
            <div class="schedule-item">
              <strong>🗓️ Mercredi :</strong>
              <span>${this.info.schedule.wednesday.time}</span>
              <div class="schedule-desc">${this.info.schedule.wednesday.description}</div>
            </div>
            <div class="meeting-point mt-md">
              <strong>📍 Rendez-vous :</strong> ${this.info.contact.meetingPoint}
            </div>
          </div>
          
          <div class="membership-info">
            <h4 class="text-primary mb-md">Adhésion</h4>
            <div class="membership-fee">
              <span class="fee-amount">${this.info.membership.annualFee}€</span>
              <span class="fee-period">par an</span>
            </div>
            
            <div class="membership-includes mt-md">
              <h5>Inclus dans l'adhésion :</h5>
              <ul>
                ${this.info.membership.includes.map(item => `<li>✓ ${item}</li>`).join('')}
              </ul>
            </div>
            
            <div class="membership-requirements mt-md">
              <h5>Prérequis :</h5>
              <ul>
                ${this.info.membership.requirements.map(req => `<li>• ${req}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="club-documents mt-xl">
        <h4 class="text-primary text-center mb-lg">Documents utiles</h4>
        <div class="documents-grid grid grid-3">
          ${this.info.documents.map(doc => this.createDocumentCard(doc)).join('')}
        </div>
      </div>
      
      ${this.info.partners.length > 0 ? `
        <div class="club-partners mt-xl">
          <h4 class="text-primary text-center mb-lg">Nos partenaires</h4>
          <div class="partners-grid grid grid-auto-fit">
            ${this.info.partners.map(partner => this.createPartnerCard(partner)).join('')}
          </div>
        </div>
      ` : ''}
    `;

    this.setupEventListeners();
    this.addAnimations();
    
    return this.element;
  }

  createLevelCard(level) {
    const levelClass = level.name.includes('A') ? 'level-easy' :
                      level.name.includes('B') ? 'level-medium' : 'level-hard';
    
    const levelColor = level.name.includes('A') ? '#4CAF50' :
                      level.name.includes('B') ? '#FF9800' : '#F44336';
    
    return `
      <div class="level-card card ${levelClass}">
        <div class="level-header" style="border-left: 4px solid ${levelColor};">
          <h5 class="level-name" style="color: ${levelColor};">${level.name}</h5>
          <div class="level-distance">${level.distance}</div>
        </div>
        <div class="level-content">
          <p class="level-description">${level.description}</p>
          <div class="level-details mt-sm">
            <div><strong>Allure :</strong> ${level.pace}</div>
            <div><strong>Public :</strong> ${level.target}</div>
          </div>
        </div>
      </div>
    `;
  }

  createDocumentCard(document) {
    const iconMap = {
      'Règlement': '📋',
      'Formulaire': '📝',
      'Certificat': '🏥'
    };
    
    const icon = Object.keys(iconMap).find(key => document.name.includes(key)) 
      ? iconMap[Object.keys(iconMap).find(key => document.name.includes(key))]
      : '📄';
    
    return `
      <div class="document-card card">
        <div class="document-icon">${icon}</div>
        <h5 class="document-name">${document.name}</h5>
        <p class="document-description">${document.description}</p>
        <a href="${document.url}" class="btn btn-small btn-outline" target="_blank">
          📥 Télécharger
        </a>
      </div>
    `;
  }

  createPartnerCard(partner) {
    return `
      <div class="partner-card card">
        <h5 class="partner-name">${partner.name}</h5>
        <div class="partner-type">${partner.type}</div>
        ${partner.discount ? `
          <div class="partner-benefit">
            <span class="discount-badge">${partner.discount} de réduction</span>
          </div>
        ` : ''}
        ${partner.description ? `
          <p class="partner-description">${partner.description}</p>
        ` : ''}
      </div>
    `;
  }

  setupEventListeners() {
    // Smooth scroll pour le bouton "Nous rejoindre"
    const joinBtn = this.element.querySelector('a[href="#contact"]');
    if (joinBtn) {
      joinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Animation des statistiques au scroll
    this.setupStatsAnimation();
    
    // Liens vers les documents
    this.setupDocumentLinks();
  }

  setupStatsAnimation() {
    const statNumbers = this.element.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          this.animateNumber(entry.target);
          entry.target.dataset.animated = 'true';
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  animateNumber(element) {
    const finalValue = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(finalValue * easeOut);
      
      if (element.textContent.includes('.')) {
        element.textContent = currentValue.toLocaleString();
      } else {
        element.textContent = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Restaurer la valeur finale avec formatage
        element.textContent = finalValue.toLocaleString();
      }
    };
    
    requestAnimationFrame(animate);
  }

  setupDocumentLinks() {
    const documentLinks = this.element.querySelectorAll('.document-card a');
    
    documentLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Si le document n'existe pas encore, afficher un message
        if (href.startsWith('/documents/')) {
          e.preventDefault();
          this.showNotification(
            'Document en cours de préparation. Contactez le club pour plus d\'informations.',
            'info'
          );
        }
      });
    });
  }

  addAnimations() {
    // Animation d'apparition des cartes
    const cards = this.element.querySelectorAll('.card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    // Animation spéciale pour la photo de groupe
    const photoPlaceholder = this.element.querySelector('.photo-placeholder');
    if (photoPlaceholder) {
      photoPlaceholder.addEventListener('mouseenter', () => {
        photoPlaceholder.style.transform = 'scale(1.05)';
      });
      
      photoPlaceholder.addEventListener('mouseleave', () => {
        photoPlaceholder.style.transform = 'scale(1)';
      });
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const bgColor = type === 'error' ? '#F44336' : 
                   type === 'success' ? '#4CAF50' : '#2196F3';
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Méthode pour mettre à jour les informations du club
  updateClubInfo(newInfo) {
    this.info = { ...this.info, ...newInfo };
    // Re-render si nécessaire
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  // Méthode pour calculer l'âge du club
  getClubAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.info.founded;
  }
}