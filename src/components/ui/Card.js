// src/components/ui/Card.js

export class Card {
  constructor(options = {}) {
    this.options = {
      className: 'card',
      variant: 'default', // default, primary, secondary, highlight
      hoverable: true,
      clickable: false,
      ...options
    };
    this.element = null;
    this.onClick = options.onClick || null;
  }

  render(content = '') {
    this.element = document.createElement('div');
    this.element.className = this.getClasses();
    
    if (typeof content === 'string') {
      this.element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      this.element.appendChild(content);
    }

    this.setupEventListeners();
    this.addAnimations();
    
    return this.element;
  }

  getClasses() {
    let classes = [this.options.className];
    
    // Variantes
    switch (this.options.variant) {
      case 'primary':
        classes.push('card-primary');
        break;
      case 'secondary':
        classes.push('card-secondary');
        break;
      case 'highlight':
        classes.push('card-highlight');
        break;
    }
    
    // États
    if (this.options.hoverable) {
      classes.push('card-hoverable');
    }
    
    if (this.options.clickable || this.onClick) {
      classes.push('card-clickable');
    }

    return classes.join(' ');
  }

  setupEventListeners() {
    if (this.onClick) {
      this.element.addEventListener('click', this.onClick);
      this.element.style.cursor = 'pointer';
    }

    // Effets d'interaction
    if (this.options.hoverable) {
      this.element.addEventListener('mouseenter', () => {
        this.element.style.transform = 'translateY(-5px)';
      });

      this.element.addEventListener('mouseleave', () => {
        this.element.style.transform = 'translateY(0)';
      });
    }
  }

  addAnimations() {
    // Animation d'apparition au scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });

    // État initial
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(30px)';
    this.element.style.transition = 'all 0.6s ease';

    observer.observe(this.element);
  }

  // Méthodes utilitaires pour construire le contenu
  static createHeader(title, subtitle = '') {
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const titleEl = document.createElement('h4');
    titleEl.textContent = title;
    header.appendChild(titleEl);
    
    if (subtitle) {
      const subtitleEl = document.createElement('p');
      subtitleEl.className = 'card-subtitle';
      subtitleEl.textContent = subtitle;
      header.appendChild(subtitleEl);
    }
    
    return header;
  }

  static createBody(content) {
    const body = document.createElement('div');
    body.className = 'card-body';
    
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      body.appendChild(content);
    }
    
    return body;
  }

  static createFooter(content) {
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    
    if (typeof content === 'string') {
      footer.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      footer.appendChild(content);
    }
    
    return footer;
  }

  static createActions(buttons = []) {
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    
    buttons.forEach(buttonConfig => {
      const button = document.createElement('button');
      button.className = buttonConfig.className || 'btn btn-outline btn-small';
      button.textContent = buttonConfig.text;
      
      if (buttonConfig.onClick) {
        button.addEventListener('click', buttonConfig.onClick);
      }
      
      actions.appendChild(button);
    });
    
    return actions;
  }

  // Méthode de création rapide pour différents types de cartes
  static createEventCard(event) {
    const card = new Card({ variant: 'primary', hoverable: true });
    
    const header = Card.createHeader(event.title);
    const body = Card.createBody(`
      <p class="event-description">${event.description}</p>
      <div class="event-meta">
        <span class="event-date">${event.date}</span>
        ${event.location ? `<span class="event-location">${event.location}</span>` : ''}
      </div>
    `);
    
    const actions = Card.createActions([
      {
        text: '📅 Ajouter',
        className: 'btn btn-outline btn-small',
        onClick: () => console.log('Add to calendar:', event.id)
      }
    ]);

    const content = document.createElement('div');
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(actions);
    
    return card.render(content);
  }

  static createCircuitCard(circuit) {
    const card = new Card({ variant: 'default', hoverable: true });
    
    const content = `
      <div class="circuit-map" style="height: 200px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
        🗺️ Carte interactive
      </div>
      <div class="card-body">
        <h4>${circuit.name}</h4>
        <p>${circuit.description}</p>
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
            <div class="stat-value">${circuit.difficulty}</div>
            <div class="stat-label">Niveau</div>
          </div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-outline btn-small">🗺️ Voir</button>
        <button class="btn btn-primary btn-small">📥 GPX</button>
      </div>
    `;
    
    return card.render(content);
  }

  static createInfoCard(title, content, icon = '') {
    const card = new Card({ variant: 'highlight', hoverable: true });
    
    const cardContent = `
      <div class="card-header">
        ${icon ? `<div class="card-icon">${icon}</div>` : ''}
        <h4>${title}</h4>
      </div>
      <div class="card-body">
        ${content}
      </div>
    `;
    
    return card.render(cardContent);
  }

  // Méthodes d'instance pour modifier la carte après création
  updateContent(newContent) {
    if (this.element) {
      if (typeof newContent === 'string') {
        this.element.innerHTML = newContent;
      } else if (newContent instanceof HTMLElement) {
        this.element.innerHTML = '';
        this.element.appendChild(newContent);
      }
    }
  }

  addToDOM(parent) {
    if (parent && this.element) {
      parent.appendChild(this.element);
    }
  }

  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  show() {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  addClass(className) {
    if (this.element) {
      this.element.classList.add(className);
    }
  }

  removeClass(className) {
    if (this.element) {
      this.element.classList.remove(className);
    }
  }

  setVariant(variant) {
    if (this.element) {
      // Retirer l'ancienne variante
      this.element.classList.remove('card-primary', 'card-secondary', 'card-highlight');
      
      // Ajouter la nouvelle
      switch (variant) {
        case 'primary':
          this.element.classList.add('card-primary');
          break;
        case 'secondary':
          this.element.classList.add('card-secondary');
          break;
        case 'highlight':
          this.element.classList.add('card-highlight');
          break;
      }
    }
  }
}