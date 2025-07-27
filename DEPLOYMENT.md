# 🚀 Guide de déploiement - Site CCB

Ce guide vous accompagne pour déployer le site du Cyclo Club de Bohars en production.

## ⚡ Déploiement rapide (5 minutes)

### Option 1 : Netlify (Recommandé)

```bash
# 1. Construire le projet
npm run build

# 2. Déployer sur Netlify
npx netlify-cli deploy --prod --dir dist

# 3. Configurer les variables d'environnement sur Netlify
# Site Settings > Environment variables
```

### Option 2 : Vercel

```bash
# 1. Déployer directement
npx vercel --prod

# 2. Les variables d'environnement seront demandées interactivement
```

## 📋 Checklist de déploiement

### Avant le déploiement

- [ ] **Variables d'environnement** configurées
- [ ] **Logo CCB** ajouté dans `public/images/logo-ccb.svg`
- [ ] **Informations du club** mises à jour dans `src/data/clubInfo.js`
- [ ] **Couleurs** personnalisées dans `src/styles/base/_variables.scss`
- [ ] **Tests** passés avec `npm run test`
- [ ] **Build** fonctionnel avec `npm run build`
- [ ] **Nextcloud** accessible et configuré

### Configuration Nextcloud

1. **Créer un utilisateur dédié** : `ccb-website`
2. **Générer un mot de passe d'application**
3. **Créer la structure de dossiers** :
   ```
   📁 Circuits/
   ├── 📁 Niveau A/
   ├── 📁 Niveau B/
   └── 📁 Niveau C/
   📁 Photos/
   📁 Documents/
   📅 Calendrier CCB
   ```
4. **Tester l'API** : `curl https://nextcloud.domain.com/status.php`

## 🌐 Options de déploiement

### 1. Netlify (Gratuit, recommandé)

**Avantages :**
- Déploiement automatique depuis Git
- CDN global inclus
- HTTPS automatique
- Fonctions serverless disponibles

**Configuration :**
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Vercel (Gratuit)

**Avantages :**
- Performance optimale
- Edge functions
- Déploiement Git automatique
- Analytics intégrés

**Configuration :**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### 3. GitHub Pages (Gratuit)

**Configuration :** Fichier `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Serveur dédié

**Pour un serveur Apache/Nginx :**
```bash
# 1. Construire
npm run build

# 2. Copier vers le serveur
rsync -avz dist/ user@server:/var/www/html/

# 3. Configuration Nginx
server {
    listen 80;
    server_name cycloclubbohars.org;
    
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }
    
    # Cache des assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Configuration post-déploiement

### 1. DNS et domaine

```bash
# Enregistrements DNS recommandés
A    @    123.456.789.0    # IP du serveur
CNAME www  your-site.netlify.app
```

### 2. SSL/HTTPS

- **Netlify/Vercel** : Automatique
- **Serveur dédié** : Let's Encrypt avec Certbot

### 3. Monitoring

**Pingdom/UptimeRobot :**
- Surveiller la disponibilité
- Alertes par email/SMS

**Google Analytics (optionnel) :**
```javascript
// Dans .env
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 4. Sauvegardes

**Automatique :**
```bash
# Script de sauvegarde daily
#!/bin/bash
DATE=$(date +%Y%m%d)
rsync -avz /var/www/html/ /backup/ccb-website-$DATE/
```

## 🔄 Mise à jour du site

### Déploiement continu

1. **Push vers main** → Déploiement automatique
2. **Variables modifiées** → Redéploiement nécessaire
3. **Assets changés** → Clear du cache CDN

### Mise à jour manuelle

```bash
# 1. Récupérer les dernières modifications
git pull origin main

# 2. Installer les nouvelles dépendances
npm install

# 3. Construire
npm run build

# 4. Déployer
npm run deploy
```

## 🧪 Tests de production

### Checklist finale

- [ ] **Homepage** se charge correctement
- [ ] **Navigation** fonctionne (liens smooth scroll)
- [ ] **Agenda** affiche les événements
- [ ] **Circuits** chargent les cartes
- [ ] **Formulaires** envoient correctement
- [ ] **Mobile** responsive
- [ ] **Performance** Lighthouse > 90
- [ ] **SEO** Meta tags présentes
- [ ] **PWA** Installable sur mobile

### Tests automatisés

```bash
# Performance
npm run lighthouse

# Tests unitaires
npm run test

# Build réussi
npm run build
```

## 🆘 Résolution de problèmes

### Erreurs courantes

**1. "Failed to fetch from Nextcloud"**
```bash
# Vérifier les variables d'environnement
echo $VITE_NEXTCLOUD_URL

# Tester la connectivité
curl $VITE_NEXTCLOUD_URL/status.php
```

**2. "Build failed - SCSS error"**
```bash
# Réinstaller sass
npm uninstall sass && npm install -D sass

# Vérifier la syntaxe
npm run lint
```

**3. "Images not loading"**
```bash
# Vérifier les chemins
ls -la public/images/

# Vérifier la configuration Vite
cat vite.config.js
```

### Rollback rapide

```bash
# Netlify
netlify sites:list
netlify api listSiteDeploys --site-id=SITE_ID
netlify api restoreSiteDeploy --site-id=SITE_ID --deploy-id=DEPLOY_ID

# Vercel
vercel list
vercel rollback URL
```

## 📊 Monitoring et analytics

### Métriques à surveiller

- **Uptime** : > 99.9%
- **Performance** : Core Web Vitals
- **Erreurs** : Taux d'erreur < 1%
- **Traffic** : Visiteurs uniques/mois

### Outils recommandés

- **Performance** : Google PageSpeed Insights
- **Monitoring** : UptimeRobot (gratuit)
- **Analytics** : Google Analytics ou Plausible
- **Erreurs** : Sentry (optionnel)

## 📞 Support technique

### Contacts

- **Technique** : contact@cycloclubbohars.org
- **Hébergement** : support@netlify.com
- **Urgences** : +33 X XX XX XX XX

### Documentation

- **Site officiel** : https://www.cycloclubbohars.org
- **Repo GitHub** : https://github.com/cycloclubbohars/website
- **Nextcloud** : https://nextcloud.cycloclubbohars.org

---

🎉 **Félicitations !** Votre site CCB est maintenant en ligne.

*N'oubliez pas de partager l'URL avec tous les membres du club !*