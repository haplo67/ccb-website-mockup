# 🚴‍♂️ Site Web du Cyclo Club de Bohars - Guide Complet

Ce guide vous explique **étape par étape** comment installer et utiliser le nouveau site web moderne du Cyclo Club de Bohars. Aucune connaissance technique avancée n'est requise !

## 🎯 Ce que vous allez obtenir

Un site web moderne qui remplace l'ancien site Joomla avec :
- ✅ **Design moderne** qui s'adapte aux mobiles et tablettes
- ✅ **Gestion simplifiée** via Nextcloud (plus de double saisie !)
- ✅ **Circuits interactifs** avec cartes et fichiers GPX
- ✅ **Agenda automatique** synchronisé avec le calendrier
- ✅ **Plus rapide** et plus facile à maintenir

---

## 📋 Avant de commencer - Ce dont vous avez besoin

### Sur votre ordinateur :
1. **Un ordinateur** avec Windows, Mac ou Linux
2. **Une connexion internet** stable
3. **Un navigateur récent** (Chrome, Firefox, Safari, Edge)
4. **Un compte GitHub** (gratuit) → [Créer un compte](https://github.com/join)

### Logiciels à installer (on vous explique comment) :
- **Node.js** (pour faire fonctionner le site)
- **Git** (pour gérer les versions du site)
- **Un éditeur de code** comme VS Code (gratuit et facile)

---

## 🛠️ Installation - Étape par Étape

### Étape 1 : Installer Node.js

**Node.js** est le "moteur" qui fait fonctionner votre site web moderne.

#### Sur Windows :
1. Allez sur [nodejs.org](https://nodejs.org)
2. Cliquez sur le bouton vert **"LTS"** (version recommandée)
3. Téléchargez le fichier `.msi`
4. Double-cliquez sur le fichier téléchargé
5. Suivez l'installation (cliquez "Suivant" partout)
6. **Important :** Cochez "Automatically install the necessary tools" si demandé

#### Sur Mac :
1. Allez sur [nodejs.org](https://nodejs.org)
2. Cliquez sur **"LTS"**
3. Téléchargez le fichier `.pkg`
4. Double-cliquez et suivez l'installation

#### Vérifier l'installation :
1. Ouvrez un **terminal** (on vous explique comment juste après)
2. Tapez : `node --version`
3. Vous devriez voir quelque chose comme `v18.17.0`

### Étape 2 : Ouvrir un terminal

Le **terminal** est une fenêtre où vous tapez des commandes en texte.

#### Sur Windows :
- Appuyez sur `Windows + R`
- Tapez `cmd` et appuyez sur Entrée
- **OU** Cliquez droit dans un dossier → "Ouvrir dans le terminal"

#### Sur Mac :
- Appuyez sur `Cmd + Espace`
- Tapez `terminal` et appuyez sur Entrée

#### Sur Linux :
- Appuyez sur `Ctrl + Alt + T`

### Étape 3 : Installer Git

**Git** permet de sauvegarder et partager votre site web.

#### Installation automatique :
Dans votre terminal, tapez cette commande :

**Windows :**
```bash
# Télécharger Git depuis le site officiel
# Allez sur https://git-scm.com/download/win
# Téléchargez et installez (gardez toutes les options par défaut)
```

**Mac :**
```bash
# Git est probablement déjà installé. Pour vérifier :
git --version
# Si ce n'est pas le cas, installez-le depuis https://git-scm.com/download/mac
```

**Linux (Ubuntu/Debian) :**
```bash
# Cette commande installe Git automatiquement
sudo apt update && sudo apt install git
```

### Étape 4 : Télécharger le code du site

Maintenant on va récupérer le code du site web. Dans votre terminal :

```bash
# 1. Aller dans le dossier où vous voulez créer le site
# Par exemple, sur le Bureau :
cd Desktop

# 2. Télécharger le code du site
git clone https://github.com/haplo67/ccb-website-mockup.git

# 3. Entrer dans le dossier du site
cd ccb-website-mockup
```

**Explication :** 
- `cd Desktop` = aller dans le dossier Bureau
- `git clone` = télécharger le code depuis GitHub
- `cd ccb-website-mockup` = entrer dans le dossier du site

### Étape 5 : Installer les dépendances du site

Le site a besoin de plusieurs "modules" pour fonctionner. On va les installer automatiquement :

```bash
# Cette commande lit le fichier package.json et installe tout ce qui est nécessaire
npm install
```

**Ce qui se passe :** L'ordinateur télécharge tous les outils nécessaires (ça peut prendre 1-2 minutes). Vous verrez défiler plein de texte, c'est normal !

---

## 🎨 Configuration - Personnaliser pour votre club

### Étape 6 : Ouvrir le projet dans un éditeur

Téléchargez **VS Code** (gratuit) : [code.visualstudio.com](https://code.visualstudio.com)

Une fois installé :
1. Ouvrez VS Code
2. Menu **Fichier** → **Ouvrir le dossier**
3. Sélectionnez le dossier `ccb-website-mockup`

### Étape 7 : Personnaliser les informations du club

#### Modifier les informations de base :
1. Dans VS Code, ouvrez le fichier `src/data/clubInfo.js`
2. Modifiez les informations :

```javascript
export const clubInfo = {
  name: 'Cyclo Club de Bohars',           // ← Changez le nom
  founded: 1985,                          // ← Année de création
  contact: {
    email: 'contact@cycloclubbohars.org', // ← Votre email
    address: {
      street: 'Mairie de Bohars',         // ← Votre adresse
      city: 'Bohars',                     // ← Votre ville
      postalCode: '29820'                 // ← Code postal
    }
  }
  // ... le reste des informations
};
```

#### Modifier les couleurs du site :
1. Ouvrez le fichier `src/style.css`
2. Cherchez les lignes avec `--color-primary` (vers le ligne 5)
3. Changez les couleurs :

```css
:root {
  --color-primary: #2c5530;      /* ← Couleur principale (vert foncé) */
  --color-secondary: #ff6b35;    /* ← Couleur accent (orange) */
  /* Vous pouvez utiliser des outils comme https://coolors.co pour choisir */
}
```

### Étape 8 : Ajouter votre logo

1. Créez un logo au format **SVG** ou **PNG**
2. Nommez-le `logo-ccb.svg`
3. Copiez-le dans le dossier `public/images/`
4. Si vous n'avez pas de logo, vous pouvez utiliser un émoji en attendant

---

## 🚀 Tester votre site en local

Avant de mettre le site en ligne, testons-le sur votre ordinateur :

```bash
# Dans votre terminal, dans le dossier du site :
npm run dev
```

**Ce qui se passe :**
- Le site se lance sur votre ordinateur
- Votre navigateur s'ouvre automatiquement
- L'adresse sera quelque chose comme `http://localhost:3000`
- Vous pouvez voir le site comme s'il était en ligne !

**Pour arrêter le site :** Dans le terminal, appuyez sur `Ctrl + C`

---

## 🌐 Mettre le site en ligne (Gratuit)

On va utiliser **GitHub Pages** qui héberge votre site gratuitement.

### Étape 9 : Créer un repository GitHub

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton vert **"New"** (ou **"Nouveau"**)
3. Nom du repository : `ccb-website` (ou le nom que vous voulez)
4. **Important :** Cochez **"Public"** (gratuit)
5. Cliquez **"Create repository"**

### Étape 10 : Configurer Git avec vos informations

Dans votre terminal :

```bash
# Dire à Git qui vous êtes (remplacez par vos vraies infos)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@gmail.com"
```

### Étape 11 : Envoyer votre site sur GitHub

```bash
# 1. Connecter votre site local à GitHub (remplacez "votre-nom" et "ccb-website")
git remote add origin https://github.com/votre-nom/ccb-website.git

# 2. Préparer tous les fichiers
git add .

# 3. Créer une "version" de votre site
git commit -m "Premier site CCB"

# 4. Envoyer sur GitHub
git push -u origin main
```

### Étape 12 : Activer GitHub Pages

1. Sur GitHub, allez dans votre repository
2. Cliquez sur **"Settings"** (en haut à droite)
3. Dans le menu de gauche, cliquez **"Pages"**
4. Source : Sélectionnez **"GitHub Actions"**
5. Attendez 2-3 minutes

**Votre site sera accessible à :** `https://votre-nom.github.io/ccb-website/`

---

## 📱 Utilisation quotidienne

### Pour modifier le contenu du site :

1. **Ouvrez VS Code** avec votre dossier
2. **Modifiez les fichiers** (textes, couleurs, etc.)
3. **Testez en local** : `npm run dev`
4. **Si c'est bon, publiez** :
   ```bash
   git add .
   git commit -m "Modification des horaires"
   git push
   ```
5. **Attendez 2 minutes** → Le site est automatiquement mis à jour !

### Fichiers importants à connaître :

| Fichier | Ce qu'il contient | Quand le modifier |
|---------|-------------------|-------------------|
| `src/data/clubInfo.js` | Infos du club, horaires, contact | Changement d'adresse, horaires |
| `src/data/events.js` | Liste des événements | Nouveaux événements |
| `src/data/circuits.js` | Liste des circuits | Nouveaux parcours |
| `src/style.css` | Couleurs, apparence | Changement de design |

---

## 🔧 Dépannage - Solutions aux problèmes courants

### ❌ "npm n'est pas reconnu"
**Problème :** Node.js n'est pas installé correctement.
**Solution :** 
1. Réinstallez Node.js depuis [nodejs.org](https://nodejs.org)
2. Redémarrez votre ordinateur
3. Rouvrez le terminal

### ❌ "Permission denied" (sur Mac/Linux)
**Problème :** Problème de droits d'accès.
**Solution :** 
```bash
# Ajoutez "sudo" devant la commande :
sudo npm install
```

### ❌ Le site affiche une page blanche
**Problème :** Erreur dans le nom du repository.
**Solution :**
1. Ouvrez `vite.config.js`
2. Vérifiez que le nom correspond à votre repository GitHub :
   ```javascript
   base: '/nom-exact-de-votre-repository/'
   ```

### ❌ "Git n'est pas reconnu"
**Problème :** Git n'est pas installé.
**Solution :**
- Windows : Téléchargez sur [git-scm.com](https://git-scm.com)
- Mac : Installez Xcode Command Line Tools
- Linux : `sudo apt install git`

### ❌ Erreur lors du `git push`
**Problème :** Première connexion à GitHub.
**Solution :**
1. GitHub vous demandera de vous connecter
2. Utilisez votre nom d'utilisateur et mot de passe GitHub
3. Ou configurez un token d'accès (GitHub vous guidera)

---

## 🔄 Ajouter Nextcloud (Étape suivante)

Une fois votre site en ligne et fonctionnel, vous pourrez connecter Nextcloud pour :
- Synchroniser automatiquement l'agenda
- Partager les circuits GPX
- Gérer les photos du club
- Remplacer WhatsApp par la messagerie intégrée

### Prérequis Nextcloud :
1. **Un serveur Nextcloud** (15-25€/mois chez un hébergeur)
2. **Un compte dédié** pour le site web
3. **Structure de dossiers** organisée

Nous vous fournirons un guide séparé pour cette étape.

---

## 📞 Aide et Support

### Si vous êtes bloqué :

1. **Consultez cette documentation** en détail
2. **Vérifiez les erreurs** dans le terminal (texte en rouge)
3. **Contactez l'équipe technique** :
   - 📧 Email : contact@cycloclubbohars.org
   - 💬 GitHub Issues : [Signaler un problème](https://github.com/haplo67/ccb-website-mockup/issues)

### Ressources utiles :

- **VS Code** : [Guide débutant](https://code.visualstudio.com/docs/introvideos/basics)
- **Git** : [Guide visuel](https://rogerdudler.github.io/git-guide/index.fr.html)
- **GitHub** : [Guide GitHub Pages](https://docs.github.com/fr/pages)
- **Couleurs** : [Générateur de palette](https://coolors.co)

---

## 🎓 Pour aller plus loin

### Une fois à l'aise avec les bases :

1. **Personnalisez le design** en modifiant le CSS
2. **Ajoutez de nouveaux événements** dans `events.js`
3. **Créez de nouveaux circuits** avec fichiers GPX
4. **Intégrez des photos** du club
5. **Connectez Nextcloud** pour la gestion automatique

### Évolution future du site :

- **Phase 1** ✅ : Site vitrine moderne (ce guide)
- **Phase 2** : Intégration Nextcloud pour la gestion
- **Phase 3** : Fonctionnalités avancées (réservations, paiements)
- **Phase 4** : Application mobile complémentaire

---

## 📊 Avantages de la nouvelle solution

| Ancien site (Joomla) | Nouveau site | Gain |
|-----------------------|--------------|------|
| Maintenance complexe | Fichiers texte simples | **90% de temps en moins** |
| Double saisie partout | Source unique (Nextcloud) | **Fini les erreurs** |
| Design dépassé | Modern et mobile | **Meilleure image** |
| Lent à charger | Très rapide | **Meilleure expérience** |
| Hébergement payant | GitHub Pages gratuit | **Économies** |

---

## 🏆 Félicitations !

Si vous êtes arrivé jusqu'ici et que votre site fonctionne, **bravo !** 🎉

Vous avez :
- ✅ Installé un environnement de développement moderne
- ✅ Personnalisé le site pour votre club
- ✅ Mis en ligne un site web professionnel
- ✅ Appris les bases de la gestion de code

Votre club dispose maintenant d'un site web moderne qui pourra évoluer avec vos besoins !

---

*Développé avec ❤️ pour le Cyclo Club de Bohars*

*Pédalons ensemble vers l'avenir numérique ! 🚴‍♂️*