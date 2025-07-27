// src/data/events.js
export const events = [
  {
    id: 'sortie-debutants',
    date: '2025-08-03',
    title: 'Sortie découverte débutants',
    description: 'Circuit facile de 30km autour de Bohars. Parfait pour débuter ou reprendre le cyclisme en douceur.',
    type: 'sortie',
    level: 'A',
    meetingPoint: 'Mairie de Bohars',
    meetingTime: '13h30',
    leader: 'Marie Dupont'
  },
  {
    id: 'tour-brest',
    date: '2025-08-10',
    title: 'Randonnée "Tour de Brest"',
    description: 'Grande randonnée de 85km avec passage par les plus beaux points de vue de la rade de Brest.',
    type: 'randonnee',
    level: 'C',
    meetingPoint: 'Mairie de Bohars',
    meetingTime: '13h00',
    leader: 'Jean Broudin'
  },
  {
    id: 'repas-club',
    date: '2025-08-15',
    title: 'Repas du club',
    description: 'Repas annuel du club au restaurant "Les Embruns" à Plougonvelin. Inscription obligatoire.',
    type: 'social',
    location: 'Restaurant Les Embruns, Plougonvelin',
    time: '19h30',
    registrationRequired: true
  },
  {
    id: 'maintenance',
    date: '2025-08-17',
    title: 'Atelier mécanique vélo',
    description: 'Apprenez les bases de la mécanique vélo : réglages, réparations courantes, entretien.',
    type: 'formation',
    meetingPoint: 'Garage de Paul, Bohars',
    meetingTime: '14h00',
    leader: 'Paul Martin'
  },
  {
    id: 'sortie-feminine',
    date: '2025-08-24',
    title: 'Sortie 100% féminine',
    description: 'Sortie réservée aux femmes du club, dans une ambiance conviviale et détendue.',
    type: 'sortie',
    level: 'B',
    meetingPoint: 'Mairie de Bohars',
    meetingTime: '14h00',
    leader: 'Sophie Moreau'
  },
  {
    id: 'brevet-100',
    date: '2025-09-07',
    title: 'Brevet 100km',
    description: 'Participez au brevet départemental de 100km. Défi personnel et convivialité assurés.',
    type: 'competition',
    level: 'C',
    meetingPoint: 'Brest',
    meetingTime: '7h00',
    registrationRequired: true
  }
];

export const weeklyRides = {
  saturday: {
    winter: { time: '13h30', description: 'Sortie hebdomadaire (horaire hiver)' },
    summer: { time: '14h00', description: 'Sortie hebdomadaire (horaire été)' }
  },
  wednesday: {
    time: '13h30',
    description: 'Sortie optionnelle du mercredi'
  }
};

export const getUpcomingEvents = (limit = 3) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit);
};

export const getEventsByType = (type) => {
  return events.filter(event => event.type === type);
};

export const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};