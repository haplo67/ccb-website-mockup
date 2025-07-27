// src/main.js
import './styles/main.scss';

// Import des composants
import { Header } from './components/header/Header.js';
import { Hero } from './components/hero/Hero.js';
import { WeekInfo } from './components/sections/WeekInfo.js';
import { Agenda } from './components/sections/Agenda.js';
import { Circuits } from './components/sections/Circuits.js';
import { ClubInfo } from './components/sections/ClubInfo.js';
import { Footer } from './components/footer/Footer.js';

// Import des utilitaires
import { setupSmoothScrolling, addScrollAnimation, setActiveNavItem } from './utils/domUtils.js';
import { testNextcloudConnection } from './utils/api.js';

class CCBWebsite {
  constructor() {
    this.components = {};
    this.isLoaded = false;
  }

  async init() {
    console.log('🚴‍♂️ Initialisation du site CCB...');
    
    try {
      // Tester la connexion Nextcloud
      const nextcloudConnected = await this.testConnections();
      
      // Créer et insérer les composants
      await this.createComponents();
      
      // Configuration générale
      this.setupGlobalFeatures();
      
      // Marquer comme chargé
      this.isLoaded = true;
      
      console.log('✅ Site CCB initialisé avec succès');
      
      // Déclencher un événement personnalisé
      this.dispatchLoadedEvent();
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
      this.showErrorMessage();
    }
  }

  async testConnections() {
    try {
      const nextcloudConnected = await testNextcloudConnection();
      console.log('Nextcloud connecté:', nextcloudConnected ? '✅' : '❌');
      return nextcloudConnected;
    } catch (error) {
      console.warn('Impossible de tester la connexion Nextcloud:', error);
      return false;
    }
  }

  async createComponents() {
    const app = document.getElementById('app');
    
    if (!app) {
      throw new Error('Element #app non trouvé dans le DOM');
    }

    // Créer et insérer chaque composant
    console.log('📦 Création des composants...');

    // Header
    this.components.header = new Header();
    const headerElement = this.components.header.render();
    app.appendChild(headerElement);

    // Hero
    this.components.hero = new Hero();
    const heroElement = this.components.hero.render();
    app.appendChild(heroElement);

    // Main content wrapper
    const main = document.createElement('main');
    main.className = 'main-content';

    // WeekInfo
    this.components.weekInfo = new WeekInfo();
    const weekInfoElement = await this.components.weekInfo.render();
    main.appendChild(weekInfoElement);

    // Agenda
    this.components.agenda = new Agenda();
    const agendaElement = await this.components.agenda.render();
    main.appendChild(agendaElement);

    // Circuits
    this.components.circuits = new Circuits();
    const circuitsElement = await this.components.circuits.render();
    main.appendChild(circuitsElement);

    // ClubInfo
    this.components.clubInfo = new ClubInfo();
    const clubInfoElement = this.components.clubInfo.render();
    main.appendChild(clubInfoElement);

    app.appendChild(main);

    // Footer
    this.components.footer = new Footer();
    const footerElement = this.components.footer.render();
    app.appendChild(footerElement);

    console.log('✅ Tous les composants créés');
  }

  setupGlobalFeatures() {
    console.log('⚙️ Configuration des fonctionnalités globales...');

    // Navigation fluide
    setupSmoothScrolling();

    // Animations au scroll
    addScrollAnimation();

    // Navigation active
    setActiveNavItem();

    // Initialiser les composants
    this.initializeComponents();

    // Gestion du redimensionnement
    this.setupResizeHandler();

    // Gestion de l'offline/online
    this.setupNetworkHandlers();

    // Raccourcis clavier
    this.setupKeyboardShortcuts();

    // Performance monitoring
    this.setupPerformanceMonitoring();

    console.log('✅ Fonctionnalités globales configurées');
  }

  initializeComponents() {
    // Initialiser les composants qui ont besoin d'une initialisation post-render
    if (this.components.header && this.components.header.init) {
      this.components.header.init();
    }

    if (this.components.hero && this.components.hero.init) {
      this.components.hero.init({
        particles: false, // Désactiver les particules pour de meilleures performances
        typing: false     // Désactiver l'effet typing pour un chargement plus rapide
      });
    }
  }

  setupResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }

  handleResize() {
    // Réajuster les éléments qui dépendent de la taille de l'écran
    const isMobile = window.innerWidth <= 768;
    
    // Ajuster la navigation mobile si nécessaire
    if (this.components.header) {
      // Logic pour la navigation mobile
    }

    // Réajuster les cartes circuits si nécessaire
    if (this.components.circuits) {
      // Logic pour les cartes responsive
    }
  }

  setupNetworkHandlers() {
    window.addEventListener('online', () => {
      console.log('🌐 Connexion rétablie');
      this.showNetworkStatus('Connexion rétablie', 'success');
      this.refreshDataFromNextcloud();
    });

    window.addEventListener('offline', () => {
      console.log('📴 Connexion perdue');
      this.showNetworkStatus('Mode hors ligne', 'warning');
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Escape pour fermer les modales
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => modal.remove());
      }

      // Ctrl/Cmd + K pour recherche rapide
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openQuickSearch();
      }

      // Touches de navigation rapide
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '2':
            e.preventDefault();
            document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '3':
            e.preventDefault();
            document.getElementById('circuits')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '4':
            e.preventDefault();
            document.getElementById('club')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '5':
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
        }
      }
    });
  }

  setupPerformanceMonitoring() {
    // Mesurer les performances de chargement
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`⚡ Site chargé en ${Math.round(loadTime)}ms`);
      
      // Envoyer les métriques (en production)
      if (loadTime > 3000) {
        console.warn('⚠️ Temps de chargement élevé:', loadTime);
      }
    });

    // Surveiller les erreurs JavaScript
    window.addEventListener('error', (e) => {
      console.error('❌ Erreur JavaScript:', e.error);
      // En production, envoyer à un service de monitoring
    });
  }

  async refreshDataFromNextcloud() {
    try {
      console.log('🔄 Actualisation des données...');
      
      // Rafraîchir les composants qui dépendent de Nextcloud
      if (this.components.weekInfo) {
        await this.components.weekInfo.refresh();
      }
      
      if (this.components.agenda) {
        await this.components.agenda.refresh();
      }
      
      if (this.components.circuits) {
        await this.components.circuits.refresh();
      }
      
      console.log('✅ Données actualisées');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'actualisation:', error);
    }
  }

  openQuickSearch() {
    // Créer une recherche rapide simple
    const searchModal = document.createElement('div');
    searchModal.className = 'modal-overlay';
    searchModal.innerHTML = `
      <div class="search-modal" style="
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--border-radius-md);
        max-width: 500px;
        width: 90%;
      ">
        <h3>Recherche rapide</h3>
        <input type="text" placeholder="Rechercher un circuit, événement..." 
               class="search-input" style="
                 width: 100%;
                 padding: var(--spacing-sm);
                 border: 2px solid var(--color-border);
                 border-radius: var(--border-radius-md);
                 margin: var(--spacing-md) 0;
                 font-size: var(--font-size-md);
               ">
        <div class="search-results"></div>
        <button class="btn btn-outline mt-md" onclick="this.closest('.modal-overlay').remove()">
          Fermer
        </button>
      </div>
    `;

    document.body.appendChild(searchModal);
    
    const searchInput = searchModal.querySelector('.search-input');
    searchInput.focus();
    
    // Fermer en cliquant à l'extérieur
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.remove();
      }
    });

    // Implémenter la logique de recherche
    searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value, searchModal.querySelector('.search-results'));
    });
  }

  performSearch(query, resultsContainer) {
    if (!query.trim()) {
      resultsContainer.innerHTML = '';
      return;
    }

    // Recherche simple dans les données existantes
    const results = [];
    
    // Rechercher dans les circuits
    if (this.components.circuits && this.components.circuits.circuits) {
      this.components.circuits.circuits.forEach(circuit => {
        if (circuit.name.toLowerCase().includes(query.toLowerCase()) ||
            circuit.description.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'circuit',
            title: circuit.name,
            description: circuit.description,
            action: () => document.getElementById('circuits')?.scrollIntoView({ behavior: 'smooth' })
          });
        }
      });
    }

    // Rechercher dans les événements
    if (this.components.agenda && this.components.agenda.events) {
      this.components.agenda.events.forEach(event => {
        if (event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'event',
            title: event.title,
            description: event.description,
            action: () => document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' })
          });
        }
      });
    }

    // Afficher les résultats
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p class="text-light">Aucun résultat trouvé</p>';
    } else {
      resultsContainer.innerHTML = results.map(result => `
        <div class="search-result" style="
          padding: var(--spacing-sm);
          border-bottom: 1px solid var(--color-border);
          cursor: pointer;
        " onclick="this.performAction()">
          <strong>${result.title}</strong>
          <p class="text-light text-small">${result.description.substring(0, 100)}...</p>
        </div>
      `).join('');
    }
  }

  showNetworkStatus(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const bgColor = type === 'error' ? '#F44336' : 
                   type === 'success' ? '#4CAF50' : 
                   type === 'warning' ? '#FF9800' : '#2196F3';
    
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
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  showErrorMessage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="error-page" style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--spacing-lg);
      ">
        <div>
          <h1 style="color: var(--color-primary); margin-bottom: var(--spacing-md);">
            ⚠️ Erreur de chargement
          </h1>
          <p style="margin-bottom: var(--spacing-lg);">
            Une erreur est survenue lors du chargement du site.
          </p>
          <button class="btn btn-primary" onclick="window.location.reload()">
            🔄 Recharger la page
          </button>
        </div>
      </div>
    `;
  }

  dispatchLoadedEvent() {
    const event = new CustomEvent('ccbSiteLoaded', {
      detail: {
        components: this.components,
        loadTime: performance.now()
      }
    });
    
    document.dispatchEvent(event);
  }

  // Méthodes publiques pour interagir avec le site
  getComponent(name) {
    return this.components[name];
  }

  async refresh() {
    await this.refreshDataFromNextcloud();
  }

  isReady() {
    return this.isLoaded;
  }
}

// Initialiser le site quand le DOM est prêt
let ccbSite;

document.addEventListener('DOMContentLoaded', async () => {
  ccbSite = new CCBWebsite();
  await ccbSite.init();
});

// Exposer l'instance globalement pour le débogage
window.ccbSite = ccbSite;

// Export pour les tests
export default CCBWebsite;