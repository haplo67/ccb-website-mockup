// src/components/sections/Agenda.js
import { getUpcomingEvents, formatEventDate } from '../../data/events.js';
import { calendarAPI } from '../../utils/api.js';
import { formatDate, getRelativeTime } from '../../utils/dateUtils.js';
import { Card } from '../ui/Card.js';

export class Agenda {
  constructor() {
    this.element = null;
    this.events = [];
  }

  async render() {
    this.element = document.createElement('section');
    this.element.className = 'section';
    this.element.id = 'agenda';
    
    this.element.innerHTML = `
      <h3 class="title">Prochains événements</h3>
      <div id="events-container">
        <div class="loading-spinner">Chargement des événements...</div>
      </div>
      <div class="agenda-actions mt-lg text-center">
        <button id="load-more" class="btn btn-outline" style="display: none;">
          Voir plus d'événements
        </button>
        <a href="#contact" class="btn btn-primary ml-md">
          Nous rejoindre
        </a>
      </div>
    `;

    await this.loadEvents();
    this.renderEvents();
    this.setupEventListeners();
    
    return this.element;
  }

  async loadEvents() {
    try {
      // Essayer de récupérer depuis Nextcloud
      const nextcloudEvents = await calendarAPI.getEvents();
      
      // Combiner avec les événements locaux
      const localEvents = getUpcomingEvents(6);
      
      // Fusionner et dédupliquer
      this.events = this.mergeEvents(nextcloudEvents, localEvents);
      
    } catch (error) {
      console.error('Error loading events:', error);
      // Fallback sur les données locales
      this.events = getUpcomingEvents(6);
    }
  }

  mergeEvents(nextcloudEvents, localEvents) {
    // Simple merge pour le moment, en production il faudra une logique plus sophistiquée
    return localEvents;
  }

  renderEvents() {
    const container = this.element.querySelector('#events-container');
    
    if (!this.events || this.events.length === 0) {
      container.innerHTML = `
        <div class="no-events text-center p-xl">
          <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">📅</div>
          <h4>Aucun événement prévu</h4>
          <p class="text-light">Les prochains événements seront bientôt annoncés.</p>
        </div>
      `;
      return;
    }

    const eventsHTML = this.events.map((event, index) => 
      this.createEventCard(event, index)
    ).join('');

    container.innerHTML = `
      <div class="grid grid-auto-fit-lg">
        ${eventsHTML}
      </div>
    `;

    // Ajouter les animations d'apparition
    this.addScrollAnimations();
  }

  createEventCard(event, index) {
    const relativeDate = getRelativeTime(event.date);
    const fullDate = formatDate(event.date, { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
    
    const typeIcon = this.getEventTypeIcon(event.type);
    const typeClass = this.getEventTypeClass(event.type);
    
    return `
      <div class="event-card ${typeClass}" data-event-id="${event.id}" style="animation-delay: ${index * 0.1}s">
        <div class="event-date">
          ${relativeDate}
        </div>
        
        <div class="event-content">
          <div class="event-header">
            <span class="event-type-icon">${typeIcon}</span>
            <h4>${event.title}</h4>
          </div>
          
          <p class="event-description">${event.description}</p>
          
          <div class="event-details mt-md">
            <div class="event-detail">
              <strong>📅</strong> ${fullDate}
            </div>
            
            ${event.meetingTime ? `
              <div class="event-detail">
                <strong>🕐</strong> ${event.meetingTime}
              </div>
            ` : ''}
            
            ${event.meetingPoint ? `
              <div class="event-detail">
                <strong>📍</strong> ${event.meetingPoint}
              </div>
            ` : ''}
            
            ${event.location ? `
              <div class="event-detail">
                <strong>📍</strong> ${event.location}
              </div>
            ` : ''}
            
            ${event.leader ? `
              <div class="event-detail">
                <strong>👤</strong> ${event.leader}
              </div>
            ` : ''}
            
            ${event.level ? `
              <div class="event-detail">
                <strong>⚡</strong> ${event.level}
              </div>
            ` : ''}
          </div>
          
          ${event.registrationRequired ? `
            <div class="event-registration mt-md">
              <span class="registration-badge">✋ Inscription obligatoire</span>
            </div>
          ` : ''}
        </div>
        
        <div class="event-actions">
          <button class="btn btn-small btn-outline" onclick="this.addEventToCalendar('${event.id}')">
            📅 Ajouter
          </button>
          ${event.registrationRequired ? `
            <button class="btn btn-small btn-primary" onclick="this.registerForEvent('${event.id}')">
              ✋ S'inscrire
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  getEventTypeIcon(type) {
    const icons = {
      'sortie': '🚴‍♂️',
      'randonnee': '🏔️',
      'social': '🍽️',
      'formation': '🔧',
      'competition': '🏆',
      'default': '📅'
    };
    return icons[type] || icons.default;
  }

  getEventTypeClass(type) {
    const classes = {
      'sortie': 'event-card-ride',
      'randonnee': 'event-card-tour',
      'social': 'event-card-social',
      'formation': 'event-card-training',
      'competition': 'event-card-competition'
    };
    return classes[type] || '';
  }

  setupEventListeners() {
    // Bouton "Voir plus"
    const loadMoreBtn = this.element.querySelector('#load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreEvents();
      });
    }

    // Délégation d'événements pour les cartes
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('event-card') || e.target.closest('.event-card')) {
        const card = e.target.closest('.event-card');
        const eventId = card.dataset.eventId;
        this.showEventDetails(eventId);
      }
    });

    // Mise en place des actions des événements
    this.setupEventActions();
  }

  setupEventActions() {
    // Ajouter au calendrier
    window.addEventToCalendar = (eventId) => {
      const event = this.events.find(e => e.id === eventId);
      if (event) {
        this.addToCalendar(event);
      }
    };

    // S'inscrire à un événement
    window.registerForEvent = (eventId) => {
      const event = this.events.find(e => e.id === eventId);
      if (event) {
        this.registerForEvent(event);
      }
    };
  }

  addToCalendar(event) {
    const startDate = new Date(event.date);
    if (event.meetingTime) {
      const [hours, minutes] = event.meetingTime.split('h');
      startDate.setHours(parseInt(hours), parseInt(minutes) || 0);
    }
    
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // +4h par défaut

    const calendarEvent = {
      title: `CCB - ${event.title}`,
      start: startDate.toISOString().replace(/[:\-]|\.\d\d\d/g, ''),
      end: endDate.toISOString().replace(/[:\-]|\.\d\d\d/g, ''),
      description: event.description + (event.leader ? `\\nResponsable: ${event.leader}` : ''),
      location: event.meetingPoint || event.location || ''
    };

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.start}/${calendarEvent.end}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`;
    
    window.open(googleUrl, '_blank');
  }

  registerForEvent(event) {
    // Simuler l'ouverture d'un formulaire d'inscription
    const modal = this.createRegistrationModal(event);
    document.body.appendChild(modal);
  }

  createRegistrationModal(event) {
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
    `;

    modal.innerHTML = `
      <div class="modal-content" style="
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--border-radius-md);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      ">
        <h3>Inscription - ${event.title}</h3>
        <p class="mb-lg">${event.description}</p>
        
        <div class="form-group mb-md">
          <label for="participant-name">Nom et prénom *</label>
          <input type="text" id="participant-name" class="form-control" required>
        </div>
        
        <div class="form-group mb-md">
          <label for="participant-email">Email *</label>
          <input type="email" id="participant-email" class="form-control" required>
        </div>
        
        <div class="form-group mb-md">
          <label for="participant-phone">Téléphone</label>
          <input type="tel" id="participant-phone" class="form-control">
        </div>
        
        <div class="form-actions flex-between">
          <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">
            Annuler
          </button>
          <button class="btn btn-primary" onclick="this.submitRegistration('${event.id}')">
            Confirmer l'inscription
          </button>
        </div>
      </div>
    `;

    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  addScrollAnimations() {
    const cards = this.element.querySelectorAll('.event-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }

  async loadMoreEvents() {
    // Simuler le chargement d'événements supplémentaires
    const loadMoreBtn = this.element.querySelector('#load-more');
    loadMoreBtn.textContent = 'Chargement...';
    loadMoreBtn.disabled = true;

    // Simuler un délai
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Ici on chargerait plus d'événements
    loadMoreBtn.style.display = 'none';
  }

  showEventDetails(eventId) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    // Pour le moment, scroll vers le contact pour s'inscrire
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Méthode pour rafraîchir les événements
  async refresh() {
    await this.loadEvents();
    this.renderEvents();
  }
}