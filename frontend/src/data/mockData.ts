import { Reservation, Service, Message, Stats } from '../types/admin';

export const mockReservations: Reservation[] = [
  {
    id: '1',
    clientName: 'Marie Dubois',
    clientEmail: 'marie.dubois@email.com',
    clientPhone: '06 12 34 56 78',
    service: 'coaching',
    date: '2025-06-15',
    time: '10:00',
    duration: 60,
    status: 'pending',
    notes: 'Coaching Découverte - première séance',
    price: 50,
    createdAt: '2025-06-12T08:30:00Z'
  },
  {
    id: '2',
    clientName: 'Jean Martin',
    clientEmail: 'j.martin@email.com',
    clientPhone: '06 98 76 54 32',
    service: 'massage',
    date: '2025-06-14',
    time: '14:30',
    duration: 75,
    status: 'confirmed',
    notes: 'Massage des 5 Continents',
    price: 95,
    createdAt: '2025-06-11T15:20:00Z'
  },
  {
    id: '3',
    clientName: 'Sophie Leroy',
    clientEmail: 'sophie.leroy@email.com',
    clientPhone: '06 45 67 89 01',
    service: 'sophrologie',
    date: '2025-06-13',
    time: '16:00',
    duration: 60,
    status: 'completed',
    notes: 'Séance Découverte sophrologie',
    price: 60,
    createdAt: '2025-06-10T11:45:00Z'
  },
  {
    id: '4',
    clientName: 'Pierre Moreau',
    clientEmail: 'p.moreau@email.com',
    clientPhone: '06 23 45 67 89',
    service: 'coaching',
    date: '2025-06-16',
    time: '09:00',
    duration: 90,
    status: 'confirmed',
    notes: 'Séance du package Coaching Intensif',
    price: 100,
    createdAt: '2025-06-12T09:15:00Z'
  },
  {
    id: '5',
    clientName: 'Camille Durand',
    clientEmail: 'camille.durand@email.com',
    clientPhone: '06 11 22 33 44',
    service: 'formule',
    date: '2025-06-17',
    time: '11:00',
    duration: 90,
    status: 'confirmed',
    notes: 'Séance Équilibre & Performance - coaching + sophrologie',
    price: 150,
    createdAt: '2025-06-13T10:30:00Z'
  }
];

export const mockServices: Service[] = [
  // Coaching Services
  {
    id: '1',
    name: 'Coaching Découverte',
    type: 'coaching',
    duration: 60,
    price: 50,
    description: 'Une séance d\'1h pour faire le point sur votre situation et identifier vos objectifs. Entretien de découverte (30 min offertes).',
    isActive: true,
    isPackage: false
  },
  {
    id: '2',
    name: 'Coaching Intensif',
    type: 'coaching',
    duration: 60,
    price: 500,
    description: '5 séances d\'1h pour travailler sur des problématiques spécifiques. 1 séance par semaine avec suivi personnalisé.',
    isActive: true,
    isPackage: true,
    packageDetails: {
      sessions: 5,
      pricePerSession: 100
    }
  },
  {
    id: '3',
    name: 'Coaching Premium',
    type: 'coaching',
    duration: 60,
    price: 900,
    description: '10 séances d\'1h pour un accompagnement complet sur le moyen/long terme. Plan d\'action détaillé inclus.',
    isActive: true,
    isPackage: true,
    packageDetails: {
      sessions: 10,
      pricePerSession: 90
    }
  },
  
  // Sophrologie Services
  {
    id: '4',
    name: 'Séance Découverte Sophrologie',
    type: 'sophrologie',
    duration: 60,
    price: 60,
    description: 'Une séance d\'1h pour vous initier à la sophrologie et ses bienfaits. Présentation complète de la méthode.',
    isActive: true,
    isPackage: false
  },
  {
    id: '5',
    name: 'Programme de Relaxation',
    type: 'sophrologie',
    duration: 60,
    price: 360,
    description: '6 séances d\'1h pour apprendre à gérer le stress et améliorer votre concentration. Exercices respiratoires inclus.',
    isActive: true,
    isPackage: true,
    packageDetails: {
      sessions: 6,
      pricePerSession: 60
    }
  },
  {
    id: '6',
    name: 'Coaching Sophrologique Intensif',
    type: 'sophrologie',
    duration: 60,
    price: 550,
    description: '10 séances d\'1h pour un accompagnement profond. Techniques avancées et gestion émotionnelle renforcée.',
    isActive: true,
    isPackage: true,
    packageDetails: {
      sessions: 10,
      pricePerSession: 55
    }
  },
  
  // Massage Services
  {
    id: '7',
    name: 'Massage des 5 Continents',
    type: 'massage',
    duration: 75,
    price: 95,
    description: 'Une séance de 1h15 pour harmoniser le corps, l\'esprit et l\'énergie. Libération des tensions avec huiles essentielles.',
    isActive: true,
    isPackage: false
  },
  
  // Formules Combinées
  {
    id: '8',
    name: 'Équilibre & Performance',
    type: 'formule',
    duration: 90,
    price: 750,
    description: '5 séances de 1h30 alliant sophrologie et coaching pour un accompagnement holistique complet.',
    isActive: true,
    isPackage: true,
    packageDetails: {
      sessions: 5,
      pricePerSession: 150
    }
  },
  {
    id: '9',
    name: 'Coaching + Sophrologie Intensif',
    type: 'formule',
    duration: 90,
    price: 1500,
    description: '10 séances de 1h30 pour un accompagnement complet sur le long terme. Gestion des émotions complexes incluse.',
    isActive: true,
    isPackage: true,
    packageDetails: {
      sessions: 10,
      pricePerSession: 150
    }
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    clientName: 'Emma Rousseau',
    clientEmail: 'emma.rousseau@email.com',
    subject: 'Question sur les formules combinées',
    message: 'Bonjour, je souhaiterais en savoir plus sur la formule "Équilibre & Performance". Est-ce que les séances alternent entre coaching et sophrologie ou les deux sont-elles combinées dans chaque séance ?',
    status: 'new',
    createdAt: '2025-06-12T14:20:00Z'
  },
  {
    id: '2',
    clientName: 'Thomas Vidal',
    clientEmail: 'thomas.vidal@email.com',
    subject: 'Annulation package Coaching Intensif',
    message: 'Bonjour, je dois malheureusement annuler ma 3ème séance du package Coaching Intensif prévue demain à 15h. Serait-il possible de la reporter à la semaine prochaine ?',
    status: 'read',
    createdAt: '2025-06-12T10:45:00Z'
  },
  {
    id: '3',
    clientName: 'Lisa Bonnet',
    clientEmail: 'lisa.bonnet@email.com',
    subject: 'Remerciements séance découverte',
    message: 'Je tenais à vous remercier pour la séance découverte de sophrologie d\'hier. C\'était exactement ce dont j\'avais besoin ! Je souhaiterais m\'inscrire au Programme de Relaxation. Quelles sont les modalités ?',
    status: 'replied',
    createdAt: '2025-06-11T16:30:00Z',
    reply: 'Bonjour Lisa, je suis ravie que la séance vous ait plu ! Pour le Programme de Relaxation (6 séances), nous pouvons planifier une séance par semaine. Je vous propose plusieurs créneaux. Contactez-moi au 06 12 34 56 78 pour organiser votre planning.',
    repliedAt: '2025-06-11T18:00:00Z'
  },
  {
    id: '4',
    clientName: 'Marc Lefebvre',
    clientEmail: 'marc.lefebvre@email.com',
    subject: 'Massage des 5 Continents - Questions',
    message: 'Bonjour, j\'aimerais réserver un massage des 5 Continents. Pouvez-vous me dire quelles huiles essentielles sont utilisées ? J\'ai quelques allergies à certaines huiles.',
    status: 'new',
    createdAt: '2025-06-13T09:15:00Z'
  }
];

export const mockStats: Stats = {
  totalReservations: 15,
  pendingReservations: 2,
  confirmedReservations: 6,
  newMessages: 2,
  completedSessions: 1,
  activeFormulas: 5,
};