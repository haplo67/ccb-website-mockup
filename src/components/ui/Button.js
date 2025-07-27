// src/components/ui/Button.js

export class Button {
  constructor(options = {}) {
    this.options = {
      text: 'Button',
      variant: 'primary', // primary, outline, ghost, secondary
      size: 'normal', // small, normal, large
      icon: null,
      iconPosition: 'left', // left, right
      disabled: false,
      loading: false,
      block: false, // full width
      ...options
    };
    this.element = null;
    this.onClick = options.onClick || null;
    this.originalText = this.options.text;
  }

  render() {
    this.element = document.createElement('button');
    this.element.className = this.getClasses();
    this.element.innerHTML = this.getContent();
    
    if (this.options.disabled) {
      this.element.disabled = true;
    }

    this.setupEventListeners();
    this.addInteractionEffects();
    
    return this.element;
  }

  getClasses() {
    let classes = ['btn'];
    
    // Variantes
    switch (this.options.variant) {
      case 'primary':
        classes.push('btn-primary');
        break;
      case 'outline':
        classes.push('btn-outline');
        break;
      case 'ghost':
        classes.push('btn-ghost');
        break;
      case 'secondary':
        classes.push('btn-secondary');
        break;
    }
    
    // Tailles
    switch (this.options.size) {
      case 'small':
        classes.push('btn-small');
        break;
      case 'large':
        classes.push('btn-large');
        break;
    }
    
    // États et options
    if (this.options.block) {
      classes.push('btn-block');
    }
    
    if (this.options.loading) {
      classes.push('btn-loading');
    }

    return classes.join(' ');
  }

  getContent() {
    const icon = this.options.loading ? '⏳' : this.options.icon;
    const text = this.options.loading ? 'Chargement...' : this.options.text;
    
    if (!icon) {
      return text;
    }
    
    if (this.options.iconPosition === 'right') {
      return `${text} <span class="btn-icon">${icon}</span>`;
    } else {
      return `<span class="btn-icon">${icon}</span> ${text}`;
    }
  }

  setupEventListeners() {
    if (this.onClick) {
      this.element.addEventListener('click', (e) => {
        if (!this.options.disabled && !this.options.loading) {
          this.onClick(e);
        }
      });
    }

    // Prévenir les clics multiples
    this.element.addEventListener('click', (e) => {
      if (this.options.loading) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  addInteractionEffects() {
    // Effet de ripple au clic
    this.element.addEventListener('click', (e) => {
      if (this.options.disabled || this.options.loading) return;
      
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      
      const rect = this.element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.element.style.position = 'relative';
      this.element.style.overflow = 'hidden';
      this.element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Effet au focus
    this.element.addEventListener('focus', () => {
      this.element.style.outline = '2px solid var(--color-secondary)';
      this.element.style.outlineOffset = '2px';
    });

    this.element.addEventListener('blur', () => {
      this.element.style.outline = 'none';
    });
  }

  // Méthodes publiques pour contrôler l'état du bouton
  setLoading(loading = true) {
    this.options.loading = loading;
    this.element.disabled = loading;
    this.element.innerHTML = this.getContent();
    
    if (loading) {
      this.element.classList.add('btn-loading');
    } else {
      this.element.classList.remove('btn-loading');
    }
  }

  setDisabled(disabled = true) {
    this.options.disabled = disabled;
    this.element.disabled = disabled;
    
    if (disabled) {
      this.element.classList.add('btn-disabled');
    } else {
      this.element.classList.remove('btn-disabled');
    }
  }

  setText(newText) {
    this.options.text = newText;
    this.originalText = newText;
    this.element.innerHTML = this.getContent();
  }

  setIcon(newIcon) {
    this.options.icon = newIcon;
    this.element.innerHTML = this.getContent();
  }

  setVariant(variant) {
    // Retirer toutes les variantes existantes
    this.element.classList.remove('btn-primary', 'btn-outline', 'btn-ghost', 'btn-secondary');
    
    // Ajouter la nouvelle variante
    this.options.variant = variant;
    switch (variant) {
      case 'primary':
        this.element.classList.add('btn-primary');
        break;
      case 'outline':
        this.element.classList.add('btn-outline');
        break;
      case 'ghost':
        this.element.classList.add('btn-ghost');
        break;
      case 'secondary':
        this.element.classList.add('btn-secondary');
        break;
    }
  }

  // Animation de succès temporaire
  showSuccess(duration = 2000) {
    const originalVariant = this.options.variant;
    const originalText = this.options.text;
    const originalIcon = this.options.icon;
    
    this.setVariant('primary');
    this.setText('Succès !');
    this.setIcon('✓');
    this.element.style.background = '#4CAF50';
    
    setTimeout(() => {
      this.setVariant(originalVariant);
      this.setText(originalText);
      this.setIcon(originalIcon);
      this.element.style.background = '';
    }, duration);
  }

  // Animation d'erreur temporaire
  showError(duration = 2000) {
    const originalVariant = this.options.variant;
    const originalText = this.options.text;
    const originalIcon = this.options.icon;
    
    this.setVariant('primary');
    this.setText('Erreur');
    this.setIcon('⚠️');
    this.element.style.background = '#F44336';
    
    setTimeout(() => {
      this.setVariant(originalVariant);
      this.setText(originalText);
      this.setIcon(originalIcon);
      this.element.style.background = '';
    }, duration);
  }

  // Méthodes statiques pour créer des boutons courants
  static createPrimary(text, onClick) {
    return new Button({
      text,
      variant: 'primary',
      onClick
    }).render();
  }

  static createOutline(text, onClick) {
    return new Button({
      text,
      variant: 'outline',
      onClick
    }).render();
  }

  static createIcon(icon, onClick, options = {}) {
    return new Button({
      text: '',
      icon,
      variant: 'outline',
      onClick,
      ...options
    }).render();
  }

  static createDownload(text, downloadUrl, fileName) {
    const button = new Button({
      text,
      icon: '📥',
      variant: 'outline',
      onClick: () => {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName || 'download';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
    
    return button.render();
  }

  static createShare(text, shareData) {
    const button = new Button({
      text,
      icon: '📤',
      variant: 'outline',
      onClick: async () => {
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log('Partage annulé');
          }
        } else {
          // Fallback pour les navigateurs qui ne supportent pas l'API Share
          if (shareData.url) {
            navigator.clipboard.writeText(shareData.url);
            // Afficher une notification
            button.showSuccess(1500);
          }
        }
      }
    });
    
    return button.render();
  }

  static createCopy(text, textToCopy) {
    const button = new Button({
      text,
      icon: '📋',
      variant: 'outline',
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(textToCopy);
          button.showSuccess(1500);
        } catch (err) {
          button.showError(1500);
        }
      }
    });
    
    return button.render();
  }

  // Groupe de boutons
  static createButtonGroup(buttons, options = {}) {
    const group = document.createElement('div');
    group.className = 'btn-group';
    
    if (options.vertical) {
      group.classList.add('btn-group-vertical');
    }
    
    buttons.forEach(buttonConfig => {
      const button = new Button(buttonConfig).render();
      group.appendChild(button);
    });
    
    return group;
  }

  // Utilitaire pour ajouter des styles CSS pour les animations
  static addStyles() {
    if (document.getElementById('button-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'button-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .btn-loading {
        pointer-events: none;
        opacity: 0.7;
      }
      
      .btn-group {
        display: flex;
        gap: var(--spacing-xs);
      }
      
      .btn-group-vertical {
        flex-direction: column;
      }
      
      .btn-block {
        width: 100%;
        display: block;
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Ajouter les styles au chargement
Button.addStyles();