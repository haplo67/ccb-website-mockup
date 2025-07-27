// src/data/circuits.js
export const circuits = [
  {
    id: 'abers',
    name: 'Circuit des Abers',
    description: 'Magnifique parcours le long des abers du Nord Finistère avec vues imprenables sur l\'océan.',
    distance: '65km',
    elevation: '450m',
    difficulty: 'Niveau B',
    gpxFile: '/circuits/abers.gpx',
    image: '/images/circuits/abers.jpg',
    highlights: [
      'Aber Wrac\'h',
      'Phare de l\'île Vierge',
      'Côte sauvage'
    ]
  },
  {
    id: 'plougastel',
    name: 'Boucle de Plougastel',
    description: 'Circuit vallonné traversant la presqu\'île de Plougastel-Daoulas et ses vergers de fraises.',
    distance: '42km',
    elevation: '320m',
    difficulty: 'Niveau A',
    gpxFile: '/circuits/plougastel.gpx',
    image: '/images/circuits/plougastel.jpg',
    highlights: [
      'Vergers de fraises',
      'Pont de l\'Iroise',
      'Village de Plougastel'
    ]
  },
  {
    id: 'tour-rade',
    name: 'Tour de Rade',
    description: 'Grand tour de la rade de Brest avec passage par le pont de l\'Iroise et retour par la corniche.',
    distance: '85km',
    elevation: '680m',
    difficulty: 'Niveau C',
    gpxFile: '/circuits/tour-rade.gpx',
    image: '/images/circuits/tour-rade.jpg',
    highlights: [
      'Rade de Brest',
      'Pont de l\'Iroise',
      'Corniche'
    ]
  },
  {
    id: 'menez-hom',
    name: 'Montée du Menez-Hom',
    description: 'Défi sportif avec ascension du célèbre Menez-Hom et panorama exceptionnel.',
    distance: '68km',
    elevation: '890m',
    difficulty: 'Niveau C',
    gpxFile: '/circuits/menez-hom.gpx',
    image: '/images/circuits/menez-hom.jpg',
    highlights: [
      'Sommet du Menez-Hom',
      'Panorama 360°',
      'Presqu\'île de Crozon'
    ]
  },
  {
    id: 'debutant',
    name: 'Circuit Découverte',
    description: 'Parfait pour débuter, ce circuit facile fait découvrir les environs immédiats de Bohars.',
    distance: '28km',
    elevation: '180m',
    difficulty: 'Niveau A',
    gpxFile: '/circuits/debutant.gpx',
    image: '/images/circuits/debutant.jpg',
    highlights: [
      'Forêt du Cranou',
      'Vallée de l\'Elorn',
      'Patrimoine local'
    ]
  }
];

export const getCircuitsByLevel = (level) => {
  return circuits.filter(circuit => circuit.difficulty.includes(level));
};

export const getCircuitById = (id) => {
  return circuits.find(circuit => circuit.id === id);
};