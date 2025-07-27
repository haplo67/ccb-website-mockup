// src/components/footer/Footer.js
import { clubInfo } from '../../data/clubInfo.js';

export class Footer {
  constructor() {
    this.element = null;
    this.info = clubInfo;
  }

  render() {
    this.element = document.createElement('footer');
    this.element.className = 'footer';
    this.element.id = 'contact';
    
    this.element.innerHTML = `
      <div class="footer-content">
        <div class="footer-section">
          <h4>Contact</h4>
          <div class="contact-info">
            <p class="contact-item">
              <span class="contact-icon">📧</span>
              <a href="mailto:${this.info.contact.email}">${this.info.contact.email}</a>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📍</span>
              <span>
                ${this.info.contact.address.street}<br>
                ${this.info.contact.address.postalCode} ${this.info.contact.address.city}
              </span>
            </p>
            <p class="contact-item">
              <span class="contact-icon">🚴‍♂️</span>
              <span>Rendez-vous : ${this.info.contact.meetingPoint}</span>
            </p>
          </div>
          
          <div class="social-actions mt-md">
            <button class="btn btn-small btn-ghost" onclick="this.openEmailClient()">
              ✉️ Nous écrire
            </button>
          </div>
        </div>

        <div class="footer-section">
          <h4>Informations</h4>
          <div class="footer-links">
            ${this.info.documents.map(doc => `
              <a href="${doc.url}" target="_blank">${doc.name}</a>
            `).join('')}
            <a href="#club">Présentation du club</a>
            <a href="#circuits">Nos circuits</a>
          </div>
          
          <div class="club-stats-footer mt-md">
            <small class="text-light">
              Club fondé en ${this.info.founded} • ${this.info.stats.members} membres
            </small>
          </div>
        </div>

        <div class="footer-section">
          <h4>Horaires des sorties</h4>
          <div class="schedule-footer">
            <div class="schedule-day">
              <strong>Samedi :</strong>
              <span>${this.info.schedule.saturday.winter} (hiver) / ${this.info.schedule.saturday.summer} (été)</span>
            </div>
            <div class="schedule-day">
              <strong>Mercredi :</strong>
              <span>${this.info.schedule.wednesday.time}</span>
            </div>
            <div class="schedule-note mt-sm">
              <small>Rendez-vous ${this.info.contact.meetingPoint}</small>
            </div>
          </div>
          
          <div class="quick-contact mt-md">
            <button class="btn btn-small btn-ghost" onclick="this.showContactForm()">
              📞 Contact rapide
            </button>
          </div>
        </div>

        <div class="footer-section">
          <h4>Rejoignez-nous</h4>
          <div class="join-info">
            <div class="membership-price">
              <span class="price">${this.info.membership.annualFee}€</span>
              <span class="period">par an</span>
            </div>
            <p class="join-description">
              Découvrez le cyclotourisme dans une ambiance conviviale
            </p>
            
            <div class="join-actions">
              <button class="btn btn-primary btn-small" onclick="this.showJoinForm()">
                ✋ Adhérer
              </button>
              <button class="btn btn-outline btn-small" onclick="this.downloadMembershipForm()">
                📄 Formulaire
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; ${new Date().getFullYear()} ${this.info.name} - Site modernisé avec intégration Nextcloud</p>
          <div class="footer-meta">
            <span>Dernière mise à jour : ${this.getLastUpdateDate()}</span>
            ${this.isNextcloudConnected() ? 
              '<span class="status-indicator">🟢 Nextcloud connecté</span>' : 
              '<span class="status-indicator">🟡 Mode hors ligne</span>'
            }
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.addInteractiveElements();
    
    return this.element;
  }

  setupEventListeners() {
    // Actions des boutons
    this.setupButtonActions();
    
    // Liens internes avec smooth scroll
    this.setupSmoothScrolling();
    
    // Animation des éléments au survol
    this.setupHoverEffects();
  }

  setupButtonActions() {
    // Ouvrir client email
    window.openEmailClient = () => {
      const subject = encodeURIComponent('Demande d\'information - CCB');
      const body = encodeURIComponent('Bonjour,\n\nJe souhaite obtenir des informations concernant le Cyclo Club de Bohars.\n\nCordialement,');
      window.location.href = `mailto:${this.info.contact.email}?subject=${subject}&body=${body}`;
    };

    // Afficher formulaire de contact
    window.showContactForm = () => {
      this.createContactModal();
    };

    // Afficher formulaire d'adhésion
    window.showJoinForm = () => {
      this.createJoinModal();
    };

    // Télécharger formulaire d'adhésion
    window.downloadMembershipForm = () => {
      const membershipDoc = this.info.documents.find(doc => 
        doc.name.includes('inscription') || doc.name.includes('Formulaire')
      );
      
      if (membershipDoc) {
        window.open(membershipDoc.url, '_blank');
      } else {
        this.showNotification('Formulaire en cours de préparation', 'info');
      }
    };
  }

  setupSmoothScrolling() {
    const internalLinks = this.element.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  setupHoverEffects() {
    // Effet sur les liens de contact
    const contactItems = this.element.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
        item.style.transition = 'transform 0.3s ease';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
      });
    });
  }

  createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: var(--spacing-lg);
    `;

    modal.innerHTML = `
      <div class="modal-content" style="
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--border-radius-md);
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
      ">
        <div class="modal-header mb-lg">
          <h3>Contactez-nous</h3>
          <button class="btn-close" style="
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          ">&times;</button>
        </div>
        
        <form class="contact-form" onsubmit="this.submitContactForm(event)">
          <div class="form-group mb-md">
            <label for="contact-name">Nom et prénom *</label>
            <input type="text" id="contact-name" class="form-control" required>
          </div>
          
          <div class="form-group mb-md">
            <label for="contact-email">Email *</label>
            <input type="email" id="contact-email" class="form-control" required>
          </div>
          
          <div class="form-group mb-md">
            <label for="contact-phone">Téléphone</label>
            <input type="tel" id="contact-phone" class="form-control">
          </div>
          
          <div class="form-group mb-md">
            <label for="contact-subject">Sujet</label>
            <select id="contact-subject" class="form-control">
              <option value="info">Demande d'information</option>
              <option value="join">Adhésion au club</option>
              <option value="circuit">Question sur un circuit</option>
              <option value="event">Question sur un événement</option>
              <option value="other">Autre</option>
            </select>
          </div>
          
          <div class="form-group mb-lg">
            <label for="contact-message">Message *</label>
            <textarea id="contact-message" class="form-control" rows="4" required 
                      placeholder="Votre message..."></textarea>
          </div>
          
          <div class="form-actions flex-between">
            <button type="button" class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">
              Annuler
            </button>
            <button type="submit" class="btn btn-primary">
              📧 Envoyer
            </button>
          </div>
        </form>
      </div>
    `;

    // Event listeners
    const closeBtn = modal.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    // Soumission du formulaire
    const form = modal.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitContactForm(form);
    });

    document.body.appendChild(modal);
  }

  createJoinModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: var(--spacing-lg);
    `;

    modal.innerHTML = `
      <div class="modal-content" style="
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--border-radius-md);
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
      ">
        <div class="modal-header mb-lg">
          <h3>Adhérer au CCB</h3>
          <button class="btn-close" style="
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          ">&times;</button>
        </div>
        
        <div class="join-info mb-lg">
          <div class="membership-summary p-md" style="
            background: var(--color-gray-light);
            border-radius: var(--border-radius-md);
            border-left: 4px solid var(--color-secondary);
          ">
            <h4>Cotisation annuelle : ${this.info.membership.annualFee}€</h4>
            <ul class="mt-sm">
              ${this.info.membership.includes.map(item => `<li>✓ ${item}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="join-options">
          <h4 class="mb-md">Comment adhérer ?</h4>
          
          <div class="option-card mb-md p-md" style="
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius-md);
          ">
            <h5>📧 Par email</h5>
            <p>Contactez-nous pour recevoir le formulaire d'adhésion</p>
            <button class="btn btn-primary btn-small mt-sm" onclick="this.contactByEmail()">
              Nous contacter
            </button>
          </div>
          
          <div class="option-card mb-md p-md" style="
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius-md);
          ">
            <h5>📄 Télécharger le formulaire</h5>
            <p>Imprimez et remplissez le bulletin d'adhésion</p>
            <button class="btn btn-outline btn-small mt-sm" onclick="this.downloadForm()">
              Télécharger PDF
            </button>
          </div>
          
          <div class="option-card p-md" style="
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius-md);
          ">
            <h5>🚴‍♂️ Venir nous voir</h5>
            <p>Rejoignez-nous lors d'une sortie samedi</p>
            <div class="meeting-info mt-sm">
              <strong>Rendez-vous :</strong> ${this.info.contact.meetingPoint}<br>
              <strong>Horaire :</strong> ${this.getCurrentSchedule()}
            </div>
          </div>
        </div>
        
        <div class="modal-actions mt-lg text-center">
          <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">
            Fermer
          </button>
        </div>
      </div>
    `;

    // Event listeners
    const closeBtn = modal.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
  }

  submitContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simuler l'envoi
    this.showNotification('Message envoyé ! Nous vous répondrons rapidement.', 'success');
    
    // Fermer la modal
    form.closest('.modal-overlay').remove();
    
    // En réalité, ici on enverrait les données vers Nextcloud ou un service d'email
  }

  addInteractiveElements() {
    // Indicateur de statut Nextcloud cliquable
    const statusIndicator = this.element.querySelector('.status-indicator');
    if (statusIndicator) {
      statusIndicator.style.cursor = 'pointer';
      statusIndicator.addEventListener('click', () => {
        this.showSystemStatus();
      });
    }
  }

  showSystemStatus() {
    const status = {
      nextcloud: this.isNextcloudConnected(),
      lastUpdate: this.getLastUpdateDate(),
      version: '1.0.0'
    };
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 400px;">
        <h3>État du système</h3>
        <div class="status-list mt-md">
          <div class="status-item">
            <strong>Nextcloud :</strong> 
            ${status.nextcloud ? '🟢 Connecté' : '🟡 Hors ligne'}
          </div>
          <div class="status-item">
            <strong>Dernière MAJ :</strong> ${status.lastUpdate}
          </div>
          <div class="status-item">
            <strong>Version :</strong> ${status.version}
          </div>
        </div>
        <button class="btn btn-primary mt-lg" onclick="this.closest('.modal-overlay').remove()">
          Fermer
        </button>
      </div>
    `;
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    
    document.body.appendChild(modal);
  }

  getCurrentSchedule() {
    const now = new Date();
    const isWinter = now.getMonth() >= 10 || now.getMonth() <= 2;
    return isWinter ? this.info.schedule.saturday.winter : this.info.schedule.saturday.summer;
  }

  getLastUpdateDate() {
    return new Date().toLocaleDateString('fr-FR');
  }

  isNextcloudConnected() {
    // Vérifier la connexion Nextcloud
    return false; // Simulé pour la démo
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
}