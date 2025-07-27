// src/components/sections/WeekInfo.js
import { getCurrentWeekInfo } from '../../data/clubInfo.js';
import { weatherAPI } from '../../utils/api.js';
import { formatDateWithWeekday } from '../../utils/dateUtils.js';

export class WeekInfo {
  constructor() {
    this.element = null;
    this.weekData = null;
  }

  async render() {
    this.element = document.createElement('section');
    this.element.className = 'section';
    this.element.innerHTML = `
      <h3 class="title">Cette semaine</h3>
      <div id="week-content">
        <div class="loading-spinner">Chargement des informations...</div>
      </div>
    `;

    await this.loadWeekData();
    this.renderWeekContent();
    
    return this.element;
  }

  async loadWeekData() {
    try {
      // Récupérer les infos de la semaine
      this.weekData = getCurrentWeekInfo();
      
      // Récupérer la météo
      const weather = await weatherAPI.getCurrentWeather();
      this.weekData.weather = weather;
      
    } catch (error) {
      console.error('Error loading week data:', error);
      this.weekData = this.getDefaultWeekData();
    }
  }

  renderWeekContent() {
    const container = this.element.querySelector('#week-content');
    
    if (!this.weekData) {
      container.innerHTML = `
        <div class="error-message">
          <p>⚠️ Impossible de charger les informations de la semaine</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="week-info">
        <div class="week-header">
          <div class="week-icon">📅</div>
          <div>
            <h4>Sortie du ${this.weekData.date}</h4>
            <p>${this.weekData.circuit} - ${this.weekData.distance} - ${this.weekData.level}</p>
          </div>
        </div>
        
        <div class="week-details">
          <p><strong>Rendez-vous :</strong> ${this.weekData.time} à ${this.weekData.meetingPoint}</p>
          <p><strong>Responsable :</strong> ${this.weekData.leader}</p>
        </div>
        
        <div class="weather-widget">
          <div class="weather-info">
            <strong>Météo prévue</strong><br>
            ${this.weekData.weather.condition}, ${this.weekData.weather.temperature}°C
          </div>
          <div class="weather-icon">${this.weekData.weather.icon}</div>
        </div>
        
        <div class="week-actions">
          <button class="btn btn-outline btn-small" onclick="this.shareRide()">
            📢 Partager
          </button>
          <button class="btn btn-outline btn-small" onclick="this.addToCalendar()">
            📅 Ajouter au calendrier
          </button>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Bouton partager
    const shareBtn = this.element.querySelector('[onclick="this.shareRide()"]');
    if (shareBtn) {
      shareBtn.onclick = () => this.shareRide();
    }

    // Bouton calendrier
    const calendarBtn = this.element.querySelector('[onclick="this.addToCalendar()"]');
    if (calendarBtn) {
      calendarBtn.onclick = () => this.addToCalendar();
    }

    // Mise à jour météo toutes les heures
    setInterval(() => {
      this.updateWeather();
    }, 3600000); // 1 heure
  }

  async updateWeather() {
    try {
      const weather = await weatherAPI.getCurrentWeather();
      const weatherInfo = this.element.querySelector('.weather-info');
      const weatherIcon = this.element.querySelector('.weather-icon');
      
      if (weatherInfo && weatherIcon) {
        weatherInfo.innerHTML = `
          <strong>Météo prévue</strong><br>
          ${weather.condition}, ${weather.temperature}°C
        `;
        weatherIcon.textContent = weather.icon;
      }
    } catch (error) {
      console.error('Error updating weather:', error);
    }
  }

  shareRide() {
    if (navigator.share) {
      navigator.share({
        title: 'Sortie CCB',
        text: `Sortie vélo ${this.weekData.circuit} le ${this.weekData.date} à ${this.weekData.time}`,
        url: window.location.href
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      const text = `Sortie vélo ${this.weekData.circuit} le ${this.weekData.date} à ${this.weekData.time} - ${window.location.href}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showNotification('Lien copié dans le presse-papiers !');
      });
    }
  }

  addToCalendar() {
    const startDate = new Date(this.weekData.date + ' ' + this.weekData.time);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // +4h
    
    const event = {
      title: `CCB - ${this.weekData.circuit}`,
      start: startDate.toISOString().replace(/[:\-]|\.\d\d\d/g, ''),
      end: endDate.toISOString().replace(/[:\-]|\.\d\d\d/g, ''),
      description: `Sortie vélo du Cyclo Club de Bohars\\n${this.weekData.distance} - ${this.weekData.level}\\nResponsable: ${this.weekData.leader}`,
      location: this.weekData.meetingPoint
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-secondary);
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  getDefaultWeekData() {
    return {
      date: 'samedi 29 juillet 2025',
      time: '13h30',
      circuit: 'Circuit "Les Abers"',
      distance: '65km',
      level: 'Niveau B',
      leader: 'Jean Broudin',
      meetingPoint: 'Mairie de Bohars',
      weather: {
        condition: 'Partiellement nuageux',
        temperature: 22,
        icon: '⛅'
      }
    };
  }

  // Méthode pour forcer la mise à jour
  async refresh() {
    await this.loadWeekData();
    this.renderWeekContent();
  }
}