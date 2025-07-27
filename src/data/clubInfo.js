// src/data/clubInfo.js
export const clubInfo = {
  name: 'Cyclo Club de Bohars',
  shortName: 'CCB',
  founded: 1985,
  description: 'Fondé en 1985, le Cyclo Club de Bohars rassemble les passionnés de vélo de tous niveaux. Nous organisons des sorties régulières pour découvrir les magnifiques paysages du Finistère.',
  mission: 'Promouvoir le cyclotourisme et la découverte du patrimoine breton à vélo dans la convivialité.',
  
  contact: {
    email: 'contact@cycloclubbohars.org',
    address: {
      street: 'Mairie de Bohars',
      city: 'Bohars',
      postalCode: '29820',
      country: 'France'
    },
    meetingPoint: 'Devant la mairie de Bohars'
  },

  levels: [
    {
      name: 'Niveau A',
      distance: '40-50km',
      description: 'Débutants et cyclisme loisir',
      pace: 'Allure tranquille',
      target: 'Parfait pour débuter ou reprendre le vélo'
    },
    {
      name: 'Niveau B', 
      distance: '60-70km',
      description: 'Cyclistes confirmés',
      pace: 'Allure modérée',
      target: 'Pour les cyclistes réguliers'
    },
    {
      name: 'Niveau C',
      distance: '80km+',
      description: 'Sportifs et grands rouleurs',
      pace: 'Allure soutenue',
      target: 'Pour les passionnés de longues distances'
    }
  ],

  schedule: {
    saturday: {
      winter: '13h30',
      summer: '14h00',
      description: 'Sortie principale du club'
    },
    wednesday: {
      time: '13h30',
      description: 'Sortie optionnelle'
    }
  },

  membership: {
    annualFee: 45,
    includes: [
      'Participation à toutes les sorties',
      'Assurance cyclotourisme',
      'Accès aux événements du club',
      'Réductions chez les partenaires'
    ],
    requirements: [
      'Certificat médical obligatoire',
      'Casque obligatoire',
      'Vélo en bon état'
    ]
  },

  documents: [
    {
      name: 'Règlement intérieur',
      url: '/documents/reglement-interieur.pdf',
      description: 'Règles de fonctionnement du club'
    },
    {
      name: 'Formulaire d\'inscription',
      url: '/documents/formulaire-inscription.pdf',
      description: 'Bulletin d\'adhésion au club'
    },
    {
      name: 'Certificat médical',
      url: '/documents/certificat-medical.pdf',
      description: 'Modèle de certificat médical'
    }
  ],

  stats: {
    members: 85,
    averageAge: 58,
    totalKm2024: 12500,
    ridesPerYear: 104
  },

  partners: [
    {
      name: 'Cycles Bohars',
      type: 'Vélociste',
      discount: '10%'
    },
    {
      name: 'Office de Tourisme Brest',
      type: 'Institutionnel',
      description: 'Partenariat événements'
    }
  ]
};

export const getCurrentWeekInfo = () => {
  // Simulation des infos de la semaine courante
  const today = new Date();
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + (6 - today.getDay()));
  
  const isWinter = today.getMonth() >= 10 || today.getMonth() <= 2;
  const time = isWinter ? clubInfo.schedule.saturday.winter : clubInfo.schedule.saturday.summer;
  
  return {
    date: saturday.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    time: time,
    circuit: 'Circuit "Les Abers"',
    distance: '65km',
    level: 'Niveau B',
    leader: 'Jean Broudin',
    meetingPoint: clubInfo.contact.meetingPoint,
    weather: {
      condition: 'Partiellement nuageux',
      temperature: '22°C',
      icon: '⛅'
    }
  };
};