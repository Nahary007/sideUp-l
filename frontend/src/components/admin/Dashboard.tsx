import React from 'react';
import { Calendar, Euro, MessageSquare, CheckCircle, Clock, TrendingUp, Package } from 'lucide-react';
import { mockStats, mockReservations } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const stats = mockStats;
  const recentReservations = mockReservations.slice(0, 5);

  const statCards = [
    {
      title: 'Réservations totales',
      value: stats.totalReservations,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'En attente',
      value: stats.pendingReservations,
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Revenus du jour',
      value: `${stats.todayRevenue}€`,
      icon: Euro,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Revenus mensuels',
      value: `${stats.monthlyRevenue}€`,
      icon: TrendingUp,
      color: 'bg-teal-500',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      title: 'Nouveaux messages',
      value: stats.newMessages,
      icon: MessageSquare,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Séances complétées',
      value: stats.completedSessions,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'completed':
        return 'Complétée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const getServiceLabel = (service: string) => {
    switch (service) {
      case 'coaching':
        return 'Coaching';
      case 'sophrologie':
        return 'Sophrologie';
      case 'massage':
        return 'Massage';
      case 'formule':
        return 'Formule Combinée';
      default:
        return service;
    }
  };

  const getServiceIcon = (service: string) => {
    if (service === 'formule') {
      return <Package className="w-4 h-4 text-teal-600 ml-1" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Side-Up</h1>
        <p className="text-gray-600">Vue d'ensemble de votre activité bien-être</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Réservations récentes</h2>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{reservation.clientName}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{getServiceLabel(reservation.service)}</span>
                    {getServiceIcon(reservation.service)}
                    <span className="mx-1">•</span>
                    <span>{reservation.date} à {reservation.time}</span>
                  </div>
                  <p className="text-sm text-teal-600 font-medium">{reservation.price}€</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors group">
              <Calendar className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
              <span className="font-medium text-teal-700 group-hover:text-teal-800">Nouvelle réservation</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
              <MessageSquare className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
              <span className="font-medium text-blue-700 group-hover:text-blue-800">Répondre aux messages</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
              <Euro className="w-5 h-5 text-green-600 group-hover:text-green-700" />
              <span className="font-medium text-green-700 group-hover:text-green-800">Mettre à jour les tarifs</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
              <Package className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
              <span className="font-medium text-purple-700 group-hover:text-purple-800">Gérer les formules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aperçu des services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-blue-700 mb-1">Coaching</h3>
            <p className="text-2xl font-bold text-blue-900">12</p>
            <p className="text-xs text-blue-600">séances ce mois</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-purple-700 mb-1">Sophrologie</h3>
            <p className="text-2xl font-bold text-purple-900">8</p>
            <p className="text-xs text-purple-600">séances ce mois</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-green-700 mb-1">Massage</h3>
            <p className="text-2xl font-bold text-green-900">6</p>
            <p className="text-xs text-green-600">séances ce mois</p>
          </div>
          <div className="bg-teal-50 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-teal-700 mb-1">Formules</h3>
            <p className="text-2xl font-bold text-teal-900">5</p>
            <p className="text-xs text-teal-600">packages actifs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;