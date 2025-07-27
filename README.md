# 🚴‍♂️ Site Web du Cyclo Club de Bohars

Site moderne et responsive du Cyclo Club de Bohars avec intégration Nextcloud pour une gestion unifiée des données.

## 🌟 Fonctionnalités

- **Site vitrine moderne** : Design responsive et performant
- **Intégration Nextcloud** : Synchronisation automatique des données
- **Gestion des circuits** : Affichage interactif des parcours GPX
- **Agenda dynamique** : Événements synchronisés depuis Nextcloud
- **Interface modulaire** : Architecture components réutilisables
- **Progressive Web App** : Installation possible sur mobile
- **Optimisé SEO** : Métadonnées et structured data

## 🚀 Installation rapide

### Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**

### Commandes d'installation

```bash
# 1. Créer le projet
npm create vite@latest ccb-website -- --template vanilla
cd ccb-website

# 2. Installer les dépendances
npm install
npm install -D sass
npm install leaflet

# 3. Créer la structure de dossiers
mkdir -p src/components/{header,hero,sections,footer,ui}
mkdir -p src/styles/{base,components,utilities}
mkdir -p src/utils
mkdir -p src/data
mkdir -p public/images

# 4. Copier les fichiers de la maquette (voir section suivante)

# 5. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 📂 Copie des fichiers

### 1. Fichiers de configuration

```bash
# Copier depuis la maquette vers la racine du projet
cp maquette/package.json ./
cp maquette/vite.config.js ./
cp maquette/index.html ./
```

### 2. Styles SCSS

```bash
# Variables et base
cp maquette/src/styles/base/* src/styles/base/
cp maquette/src/styles/utilities/* src/styles/utilities/
cp maquette/src/styles/components/* src/styles/components/
cp maquette/src/styles/main.scss src/styles/

# Point d'entrée principal
cp maquette/src/styles/main.scss src/styles/
```

### 3. Données et configuration

```bash
# Données statiques
cp maquette/src/data/* src/data/

# Utilitaires
cp maquette/src/utils/* src/utils/
```

### 4. Composants JavaScript

```bash
# Composants principaux
cp maquette/src/components/header/* src/components/header/
cp maquette/src/components/hero/* src/components/hero/
cp maquette/src/components/sections/* src/components/sections/
cp maquette/src/components/footer/* src/components/footer/

# Composants UI réutilisables
cp maquette/src/components/ui/* src/components/ui/

# Point d'entrée principal
cp maquette/src/main.js src/
```

### 5. Assets

```bash
# Créer les images nécessaires
mkdir -p public/images/circuits
mkdir -p public/documents

# Logos et favicons (à créer/adapter)
# public/images/logo-ccb.svg
# public/favicon.svg
# public/favicon.png
```

## 🛠️ Configuration Nextcloud

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Configuration Nextcloud
VITE_NEXTCLOUD_URL=https://nextcloud.cycloclubbohars.org
VITE_NEXTCLOUD_USER=ccb-website
VITE_NEXTCLOUD_PASSWORD=your-app-password

# API Météo (optionnel)
VITE_WEATHER_API_KEY=your-openweathermap-key

# Environnement
VITE_ENV=production
```

### Structure Nextcloud recommandée

```
📁 Nextcloud CCB/
├── 📁 Circuits/
│   ├── 📁 Niveau A/
│   ├── 📁 Niveau B/
│   └── 📁 Niveau C/
├── 📁 Photos/
│   ├── 📁 2025/
│   └── 📁 Archives/
├── 📁 Documents/
│   ├── 📄 reglement.pdf
│   └── 📄 inscription.pdf
├── 📁 Gestion/
│   └── 📊 membres.xlsx
└── 📅 Calendrier CCB
```

## 🎨 Personnalisation

### Couleurs et thème

Modifier les variables dans `src/styles/base/_variables.scss` :

```scss
:root {
  --color-primary: #2c5530;        // Vert principal du club
  --color-secondary: #ff6b35;      // Orange accent
  --color-primary-light: #4a7c59;  // Vert clair
  // ...
}
```

### Logo et images

1. Remplacer `public/images/logo-ccb.svg` par le logo du club
2. Ajouter les images de circuits dans `public/images/circuits/`
3. Créer les favicons avec un générateur en ligne

### Données du club

Modifier `src/data/clubInfo.js` :

```javascript
export const clubInfo = {
  name: 'Votre Club',
  founded: 1985,
  contact: {
    email: 'contact@votreclub.org',
    // ...
  }
  // ...
};
```

## 📱 Déploiement

### Netlify (Recommandé)

```bash
# 1. Construire le projet
npm run build

# 2. Installer Netlify CLI
npm install -g netlify-cli

# 3. Se connecter à Netlify
netlify login

# 4. Déployer
netlify deploy --prod --dir dist
```

### Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Déployer
vercel --prod
```

### Serveur traditionnel

```bash
# 1. Construire
npm run build

# 2. Copier le dossier dist/ vers votre serveur web
scp -r dist/* user@server:/var/www/html/
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Construction pour production
npm run preview          # Prévisualiser la version de production

# Qualité du code
npm run lint             # Vérifier le code
npm run lint:fix         # Corriger automatiquement
npm run format           # Formater le code

# Tests et analyse
npm run test             # Tests unitaires
npm run lighthouse       # Audit de performance
npm run analyze          # Analyser le bundle
```

## 🏗️ Architecture du projet

```
ccb-website/
├── 📄 index.html                 # Page HTML principale
├── 📄 package.json              # Configuration npm
├── 📄 vite.config.js            # Configuration Vite
├── 📁 src/
│   ├── 📄 main.js               # Point d'entrée JavaScript
│   ├── 📁 components/           # Composants modulaires
│   │   ├── 📁 header/          # En-tête et navigation
│   │   ├── 📁 hero/            # Section héro
│   │   ├── 📁 sections/        # Sections de contenu
│   │   ├── 📁 footer/          # Pied de page
│   │   └── 📁 ui/              # Composants UI réutilisables
│   ├── 📁 styles/              # Styles SCSS modulaires
│   │   ├── 📁 base/            # Variables, reset, typographie
│   │   ├── 📁 components/      # Styles des composants
│   │   ├── 📁 utilities/       # Classes utilitaires
│   │   └── 📄 main.scss        # Point d'entrée SCSS
│   ├── 📁 data/                # Données statiques
│   └── 📁 utils/               # Fonctions utilitaires
└── 📁 public/                  # Assets statiques
    ├── 📁 images/              # Images et logos
    └── 📁 documents/           # Documents téléchargeables
```

## 🔌 API Nextcloud

### Endpoints utilisés

```javascript
// Calendrier
GET /remote.php/dav/calendars/{user}/personal/

// Fichiers GPX
GET /remote.php/webdav/Circuits/{filename}

// Photos
GET /ocs/v2.php/apps/files/api/v1/list?path=/Photos

// Contacts (trombinoscope)
GET /remote.php/dav/addressbooks/users/{user}/contacts/
```

### Authentification

Utiliser des **mots de passe d'application** Nextcloud pour sécuriser l'accès :

1. Aller dans Paramètres > Sécurité
2. Créer un nouveau mot de passe d'application
3. Utiliser ce mot de passe dans les variables d'environnement

## 🌐 Fonctionnalités avancées

### Progressive Web App

Le site peut être installé sur mobile grâce au manifest PWA :

- Icônes adaptatives
- Fonctionnement hors ligne partiel
- Notifications push (optionnel)

### SEO et Performance

- **Lighthouse Score** : 95+ sur toutes les métriques
- **Structured Data** : Schema.org pour les clubs sportifs
- **Meta tags** : Open Graph, Twitter Cards
- **Sitemap** : Généré automatiquement

### Accessibilité

- **WCAG 2.1 AA** : Contraste, navigation clavier
- **Screen readers** : Attributs ARIA appropriés
- **Responsive** : Support mobile/tablette optimal

## 🐛 Dépannage

### Problèmes courants

**1. Erreur de build SCSS**
```bash
# Vérifier la syntaxe SCSS
npm run lint
# Réinstaller sass
npm uninstall sass && npm install -D sass
```

**2. Nextcloud non accessible**
```bash
# Vérifier les variables d'environnement
echo $VITE_NEXTCLOUD_URL
# Tester la connectivité
curl https://nextcloud.cycloclubbohars.org/status.php
```

**3. Images manquantes**
```bash
# Vérifier les chemins dans public/
ls -la public/images/
# Redémarrer le serveur de dev
npm run dev
```

### Logs et débogage

```javascript
// Activer les logs de debug
window.CCB_CONFIG.environment = 'development';

// Vérifier l'état des composants
console.log(window.ccbSite.getComponent('circuits'));

// Tester la connexion Nextcloud
window.ccbSite.refresh();
```

## 🤝 Contribution

### Pour les développeurs

1. **Fork** le projet
2. **Créer** une branche feature
3. **Commiter** les changements
4. **Pusher** vers la branche
5. **Créer** une Pull Request

### Pour le club

1. **Issues** : Signaler des bugs ou demandes de fonctionnalités
2. **Discussions** : Proposer des améliorations
3. **Wiki** : Contribuer à la documentation

## 📞 Support

- **Email** : contact@cycloclubbohars.org
- **GitHub Issues** : [Signaler un problème](https://github.com/cycloclubbohars/website/issues)
- **Documentation** : [Wiki du projet](https://github.com/cycloclubbohars/website/wiki)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ pour le Cyclo Club de Bohars**

*Pédalons ensemble vers l'avenir numérique ! 🚴‍♂️*