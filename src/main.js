// src/main.js - Version simplifiée
import './style.css'

// Configuration de base
console.log('🚴‍♂️ Cyclo Club de Bohars - Site en cours de développement');

// Fonction pour créer le contenu de base
function createBasicSite() {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Element #app non trouvé');
    return;
  }

  app.innerHTML = `
    <!-- Header -->
    <header class="header">
      <div class="nav-container">
        <div class="logo">
          <div style="width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🚴‍♂️</div>
          <h1>CCB</h1>
        </div>
        <nav>
          <ul class="nav-menu">
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#agenda">Agenda</a></li>
            <li><a href="#circuits">Circuits</a></li>
            <li><a href="#club">Le Club</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero" id="accueil">
      <div class="hero-content">
        <h2 class="title-hero fade-in-up">Cyclo Club de Bohars</h2>
        <p class="fade-in-up-delay-1">Découvrez les plus beaux circuits du Finistère à vélo</p>
        <a href="#club" class="btn btn-primary fade-in-up-delay-2">Rejoignez-nous</a>
      </div>
    </section>

    <!-- Section Infos -->
    <section class="section">
      <h3 class="title">Cette semaine</h3>
      <div class="card card-primary">
        <div class="card-body">
          <h4>Sortie du samedi 30 novembre 2024</h4>
          <p><strong>Circuit :</strong> Les Abers - 65km - Niveau B</p>
          <p><strong>Rendez-vous :</strong> 13h30 devant la mairie de Bohars</p>
          <p><strong>Responsable :</strong> Jean Broudin</p>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
            <strong>Météo prévue :</strong> Partiellement nuageux, 12°C ⛅
          </div>
        </div>
      </div>
    </section>

    <!-- Section Agenda -->
    <section class="section" id="agenda">
      <h3 class="title">Prochains événements</h3>
      <div class="grid grid-auto-fit">
        <div class="card card-primary">
          <div class="card-body">
            <div style="background: #2c5530; color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-bottom: 1rem;">
              7 décembre 2024
            </div>
            <h4>Sortie découverte débutants</h4>
            <p>Circuit facile de 30km autour de Bohars. Parfait pour débuter ou reprendre le cyclisme en douceur.</p>
          </div>
        </div>
        
        <div class="card card-primary">
          <div class="card-body">
            <div style="background: #2c5530; color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-bottom: 1rem;">
              14 décembre 2024
            </div>
            <h4>Randonnée "Tour de Brest"</h4>
            <p>Grande randonnée de 85km avec passage par les plus beaux points de vue de la rade de Brest.</p>
          </div>
        </div>
        
        <div class="card card-primary">
          <div class="card-body">
            <div style="background: #2c5530; color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-bottom: 1rem;">
              21 décembre 2024
            </div>
            <h4>Repas de fin d'année</h4>
            <p>Repas convivial du club au restaurant "Les Embruns" à Plougonvelin. Inscription obligatoire.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Circuits -->
    <section class="section" id="circuits">
      <h3 class="title">Nos circuits</h3>
      <div class="grid grid-auto-fit">
        <div class="card">
          <div style="height: 200px; background: linear-gradient(45deg, #2c5530, #4a7c59); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
            🗺️ Carte interactive
          </div>
          <div class="card-body">
            <h4>Circuit des Abers</h4>
            <p>Magnifique parcours le long des abers du Nord Finistère avec vues imprenables sur l'océan.</p>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem; color: #666;">
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #2c5530; font-size: 1.1rem;">65km</div>
                <div>Distance</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #2c5530; font-size: 1.1rem;">450m</div>
                <div>Dénivelé</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #2c5530; font-size: 1.1rem;">Niveau B</div>
                <div>Difficulté</div>
              </div>
            </div>
            <div style="margin-top: 1rem;">
              <button class="btn btn-small btn-outline">🗺️ Voir</button>
              <button class="btn btn-small btn-primary" style="margin-left: 0.5rem;">📥 GPX</button>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div style="height: 200px; background: linear-gradient(45deg, #2c5530, #4a7c59); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
            🗺️ Carte interactive
          </div>
          <div class="card-body">
            <h4>Boucle de Plougastel</h4>
            <p>Circuit vallonné traversant la presqu'île de Plougastel-Daoulas et ses vergers de fraises.</p>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem; color: #666;">
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #2c5530; font-size: 1.1rem;">42km</div>
                <div>Distance</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #2c5530; font-size: 1.1rem;">320m</div>
                <div>Dénivelé</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #2c5530; font-size: 1.1rem;">Niveau A</div>
                <div>Difficulté</div>
              </div>
            </div>
            <div style="margin-top: 1rem;">
              <button class="btn btn-small btn-outline">🗺️ Voir</button>
              <button class="btn btn-small btn-primary" style="margin-left: 0.5rem;">📥 GPX</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Club -->
    <section class="section" id="club" style="background: #f8f9fa; margin: 2rem; border-radius: 20px; padding: 3rem;">
      <h3 class="title">Le Cyclo Club de Bohars</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
        <div>
          <h4 style="color: #2c5530; margin-bottom: 1rem;">Notre passion : le cyclotourisme</h4>
          <p style="margin-bottom: 1rem;">Fondé en 1985, le Cyclo Club de Bohars rassemble les passionnés de vélo de tous niveaux. Nous organisons des sorties régulières pour découvrir les magnifiques paysages du Finistère.</p>
          <p style="margin-bottom: 1rem;"><strong>3 groupes de niveau :</strong></p>
          <ul style="margin-left: 2rem; margin-bottom: 2rem;">
            <li><strong>Niveau A :</strong> 40-50km, débutants et cyclisme loisir</li>
            <li><strong>Niveau B :</strong> 60-70km, cyclistes confirmés</li>
            <li><strong>Niveau C :</strong> 80km+, sportifs et grands rouleurs</li>
          </ul>
          <a href="#contact" class="btn btn-primary">Nous rejoindre</a>
        </div>
        <div style="text-align: center;">
          <div style="background: white; border-radius: 15px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🚴‍♂️</div>
            <h4 style="color: #2c5530;">Photo de groupe</h4>
            <p style="color: #666; margin-top: 0.5rem;">Dernière sortie collective<br>Novembre 2024</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer" id="contact">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Contact</h4>
          <p>📧 contact@cycloclubbohars.org</p>
          <p>📍 Mairie de Bohars<br>29820 Bohars</p>
        </div>
        <div class="footer-section">
          <h4>Informations</h4>
          <p><a href="#">Règlement intérieur</a></p>
          <p><a href="#">Formulaire d'inscription</a></p>
          <p><a href="#">Certificat médical</a></p>
        </div>
        <div class="footer-section">
          <h4>Horaires des sorties</h4>
          <p><strong>Samedi :</strong> 13h30 (hiver) / 14h00 (été)</p>
          <p><strong>Mercredi :</strong> 13h30</p>
          <p>Rendez-vous devant la mairie</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Cyclo Club de Bohars - Site moderne et responsive</p>
      </div>
    </footer>
  `;

  // Ajouter la navigation douce
  setupSmoothScrolling();
}

// Navigation douce
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  createBasicSite();
  console.log('✅ Site CCB initialisé avec succès');
});

// Afficher un message de bienvenue
window.addEventListener('load', () => {
  console.log(`
🚴‍♂️ Bienvenue sur le site du Cyclo Club de Bohars !

📧 Contact: contact@cycloclubbohars.org
🌐 Site: https://www.cycloclubbohars.org
📍 Rendez-vous: Mairie de Bohars, samedi 13h30

Version simplifiée - Architecture modulaire en cours de développement
  `);
});