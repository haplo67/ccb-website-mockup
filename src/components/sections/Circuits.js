// src/components/sections/Circuits.js
import { circuits, getCircuitsByLevel } from '../../data/circuits.js';
import { filesAPI } from '../../utils/api.js';

export class Circuits {
  constructor() {
    this.element = null;
    this.circuits = [];
    this.selectedLevel = 'all';
    this.mapInstances = new Map();
  }

  async render() {
    this.element = document.createElement('section');
    this.element.className = 'section';
    this.element.id = 'circuits';
    
    this.element.innerHTML = `
      <h3 class="title">Nos circuits</h3>
      
      <div class="circuits-filters mb-lg">
        <div class="filter-buttons flex-center flex-gap">
          <button class="btn btn-outline filter-btn active" data-level="all">
            Tous les circuits
          </button>
          <button class="btn btn-outline filter-btn" data-level="A">
            Niveau A
          </button>
          <button class="btn btn-outline filter-btn" data-level="B">
            Niveau B
          </button>
          <button class="btn btn-outline filter-btn" data-level="C">
            Niveau C
          </button>
        </div>
      </div>
      
      <div id="circuits-container">
        <div class="loading-spinner">Chargement des circuits...</div>
      </div>
      
      <div class="circuits-actions text-center mt-xl">
        <p class="text-light mb-md">
          Tous nos circuits sont au format GPX et compatibles avec votre GPS vélo
        </p>
        <button id="download-all" class="btn btn-outline">
          📥 Télécharger tous les circuits
        </button>
      </div>
    `;

    await this.loadCircuits();
    this.renderCircuits();
    this.setupEventListeners();
    
    return this.element;
  }

  async loadCircuits() {
    try {
      // Essayer de récupérer depuis Nextcloud
      const nextcloudCircuits = await filesAPI.getCircuits();
      
      // Combiner avec les circuits locaux
      this.circuits = this.mergeCircuits(nextcloudCircuits, circuits);
      
    } catch (error) {
      console.error('Error loading circuits:', error);
      // Fallback sur les données locales
      this.circuits = circuits;
    }
  }

  mergeCircuits(nextcloudCircuits, localCircuits) {
    // Simple fallback pour le moment
    return localCircuits;
  }

  renderCircuits() {
    const container = this.element.querySelector('#circuits-container');
    
    let circuitsToShow = this.circuits;
    if (this.selectedLevel !== 'all') {
      circuitsToShow = getCircuitsByLevel(this.selectedLevel);
    }

    if (!circuitsToShow || circuitsToShow.length === 0) {
      container.innerHTML = `
        <div class="no-circuits text-center p-xl">
          <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">🗺️</div>
          <h4>Aucun circuit trouvé</h4>
          <p class="text-light">Aucun circuit ne correspond à votre sélection.</p>
        </div>
      `;
      return;
    }

    const circuitsHTML = circuitsToShow.map((circuit, index) => 
      this.createCircuitCard(circuit, index)
    ).join('');

    container.innerHTML = `
      <div class="grid circuits-grid">
        ${circuitsHTML}
      </div>
    `;

    // Initialiser les cartes après rendu
    this.initializeCircuitMaps();
    this.addScrollAnimations();
  }

  createCircuitCard(circuit, index) {
    const difficultyClass = this.getDifficultyClass(circuit.difficulty);
    const difficultyColor = this.getDifficultyColor(circuit.difficulty);
    
    return `
      <div class="circuit-card ${difficultyClass}" data-circuit-id="${circuit.id}" style="animation-delay: ${index * 0.1}s">
        <div class="circuit-map" id="map-${circuit.id}">
          <div class="map-placeholder">
            <div class="map-icon">🗺️</div>
            <p>Carte interactive</p>
            <small>Cliquez pour voir le tracé</small>
          </div>
        </div>
        
        <div class="circuit-info">
          <div class="circuit-header">
            <h4>${circuit.name}</h4>
            <span class="difficulty-badge" style="background: ${difficultyColor}">
              ${circuit.difficulty}
            </span>
          </div>
          
          <p class="circuit-description">${circuit.description}</p>
          
          ${circuit.highlights ? `
            <div class="circuit-highlights mt-sm">
              <strong>Points d'intérêt :</strong>
              <ul class="highlights-list">
                ${circuit.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div class="circuit-stats">
            <div class="stat">
              <div class="stat-value">${circuit.distance}</div>
              <div class="stat-label">Distance</div>
            </div>
            <div class="stat">
              <div class="stat-value">${circuit.elevation}</div>
              <div class="stat-label">Dénivelé</div>
            </div>
            <div class="stat">
              <div class="stat-value">${circuit.difficulty.split(' ')[1]}</div>
              <div class="stat-label">Niveau</div>
            </div>
          </div>
          
          <div class="circuit-actions">
            <button class="btn btn-small btn-outline" onclick="this.viewCircuitOnMap('${circuit.id}')">
              🗺️ Voir la carte
            </button>
            <button class="btn btn-small btn-primary" onclick="this.downloadGPX('${circuit.id}')">
              📥 Télécharger GPX
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getDifficultyClass(difficulty) {
    if (difficulty.includes('A')) return 'circuit-easy';
    if (difficulty.includes('B')) return 'circuit-medium';
    if (difficulty.includes('C')) return 'circuit-hard';
    return '';
  }

  getDifficultyColor(difficulty) {
    if (difficulty.includes('A')) return '#4CAF50'; // Vert
    if (difficulty.includes('B')) return '#FF9800'; // Orange
    if (difficulty.includes('C')) return '#F44336'; // Rouge
    return '#9E9E9E';
  }

  setupEventListeners() {
    // Filtres
    const filterBtns = this.element.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Retirer active de tous les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Ajouter active au bouton cliqué
        e.target.classList.add('active');
        
        // Changer le niveau sélectionné
        this.selectedLevel = e.target.dataset.level;
        
        // Re-render les circuits
        this.renderCircuits();
      });
    });

    // Télécharger tous les circuits
    const downloadAllBtn = this.element.querySelector('#download-all');
    downloadAllBtn.addEventListener('click', () => {
      this.downloadAllCircuits();
    });

    // Setup des actions de circuit
    this.setupCircuitActions();
  }

  setupCircuitActions() {
    // Voir sur la carte
    window.viewCircuitOnMap = (circuitId) => {
      this.viewCircuitOnMap(circuitId);
    };

    // Télécharger GPX
    window.downloadGPX = (circuitId) => {
      this.downloadGPX(circuitId);
    };
  }

  initializeCircuitMaps() {
    // Initialiser les cartes interactives pour chaque circuit
    this.circuits.forEach(circuit => {
      const mapContainer = this.element.querySelector(`#map-${circuit.id}`);
      if (mapContainer && !this.mapInstances.has(circuit.id)) {
        this.initializeMap(circuit, mapContainer);
      }
    });
  }

  initializeMap(circuit, container) {
    // Simuler une carte interactive simple
    container.addEventListener('click', () => {
      this.showFullMap(circuit);
    });

    // Ajouter un effet hover
    container.style.cursor = 'pointer';
    container.addEventListener('mouseenter', () => {
      container.style.transform = 'scale(1.02)';
      container.style.transition = 'transform 0.3s ease';
    });

    container.addEventListener('mouseleave', () => {
      container.style.transform = 'scale(1)';
    });

    this.mapInstances.set(circuit.id, { container, circuit });
  }

  showFullMap(circuit) {
    // Créer une modal avec la carte complète
    const modal = this.createMapModal(circuit);
    document.body.appendChild(modal);
  }

  createMapModal(circuit) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: var(--spacing-lg);
    `;

    modal.innerHTML = `
      <div class="map-modal" style="
        background: white;
        border-radius: var(--border-radius-md);
        width: 100%;
        max-width: 900px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
      ">
        <div class="map-modal-header" style="
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h3>${circuit.name}</h3>
          <button class="btn-close" style="
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          ">&times;</button>
        </div>
        
        <div class="map-modal-body" style="
          flex: 1;
          padding: var(--spacing-lg);
          overflow: auto;
        ">
          <div class="circuit-info-detail mb-lg">
            <div class="circuit-stats-detail flex-between">
              <div><strong>Distance:</strong> ${circuit.distance}</div>
              <div><strong>Dénivelé:</strong> ${circuit.elevation}</div>
              <div><strong>Niveau:</strong> ${circuit.difficulty}</div>
            </div>
            <p class="mt-md">${circuit.description}</p>
          </div>
          
          <div class="map-container" style="
            height: 400px;
            background: linear-gradient(45deg, var(--color-primary), var(--color-primary-light));
            border-radius: var(--border-radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
          ">
            <div class="text-center">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
              <p>Carte interactive du circuit</p>
              <small>Intégration Leaflet + GPX en cours</small>
            </div>
          </div>
          
          <div class="map-actions mt-lg flex-center flex-gap">
            <button class="btn btn-outline" onclick="this.downloadGPX('${circuit.id}')">
              📥 Télécharger GPX
            </button>
            <button class="btn btn-primary" onclick="this.shareCircuit('${circuit.id}')">
              📤 Partager
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const closeBtn = modal.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    // Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    return modal;
  }

  viewCircuitOnMap(circuitId) {
    const circuit = this.circuits.find(c => c.id === circuitId);
    if (circuit) {
      this.showFullMap(circuit);
    }
  }

  async downloadGPX(circuitId) {
    const circuit = this.circuits.find(c => c.id === circuitId);
    if (!circuit) return;

    try {
      // Essayer de récupérer le fichier GPX depuis Nextcloud
      const gpxData = await filesAPI.getGPXFile(circuit.gpxFile);
      
      if (gpxData) {
        this.downloadFile(gpxData, `${circuit.name}.gpx`, 'application/gpx+xml');
      } else {
        // Fallback : générer un GPX simple
        const mockGPX = this.generateMockGPX(circuit);
        this.downloadFile(mockGPX, `${circuit.name}.gpx`, 'application/gpx+xml');
      }
    } catch (error) {
      console.error('Error downloading GPX:', error);
      this.showNotification('Erreur lors du téléchargement du fichier GPX', 'error');
    }
  }

  generateMockGPX(circuit) {
    // Générer un fichier GPX basique pour la démo
    return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Cyclo Club de Bohars">
  <metadata>
    <name>${circuit.name}</name>
    <desc>${circuit.description}</desc>
  </metadata>
  <trk>
    <name>${circuit.name}</name>
    <trkseg>
      <trkpt lat="48.4062" lon="-4.5292">
        <ele>50</ele>
      </trkpt>
      <!-- Points du tracé GPX ici -->
    </trkseg>
  </trk>
</gpx>`;
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    this.showNotification(`${filename} téléchargé avec succès !`);
  }

  async downloadAllCircuits() {
    this.showNotification('Préparation du téléchargement...', 'info');
    
    // Simuler la création d'un zip avec tous les circuits
    setTimeout(() => {
      const allGPX = this.circuits.map(circuit => 
        this.generateMockGPX(circuit)
      ).join('\n\n');
      
      this.downloadFile(allGPX, 'circuits-ccb-tous.gpx', 'application/gpx+xml');
    }, 1000);
  }

  addScrollAnimations() {
    const cards = this.element.querySelectorAll('.circuit-card');
    
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

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const bgColor = type === 'error' ? '#F44336' : 
                   type === 'info' ? '#2196F3' : '#4CAF50';
    
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
    }, 3000);
  }

  // Méthode pour rafraîchir les circuits
  async refresh() {
    await this.loadCircuits();
    this.renderCircuits();
  }
}