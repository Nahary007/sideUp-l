export interface Reservation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: 'coaching' | 'sophrologie' | 'massage' | 'formule';
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  price: number;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  type: 'coaching' | 'sophrologie' | 'massage' | 'formule';
  duration: number;
  price: number;
  description: string;
  isActive: boolean;
  isPackage?: boolean;
  packageDetails?: {
    sessions: number;
    pricePerSession: number;
  };
}

export interface Message {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

export interface Stats {
  totalReservations: number;
  pendingReservations: number;
  todayRevenue: number;
  monthlyRevenue: number;
  newMessages: number;
  completedSessions: number;
}