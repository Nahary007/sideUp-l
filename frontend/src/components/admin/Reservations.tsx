import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X, Calendar, Phone, Mail, Clock, Package } from 'lucide-react';
import { mockReservations } from '../../data/mockData';
import type { Reservation } from '../../types/admin';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesService = serviceFilter === 'all' || reservation.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const updateReservationStatus = (id: string, newStatus: Reservation['status']) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'coaching':
        return 'bg-blue-50 text-blue-700';
      case 'sophrologie':
        return 'bg-purple-50 text-purple-700';
      case 'massage':
        return 'bg-green-50 text-green-700';
      case 'formule':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des réservations</h1>
        <p className="text-gray-600">Gérez toutes les réservations de vos clients Side-Up</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="completed">Complétées</option>
              <option value="cancelled">Annulées</option>
            </select>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">Tous les services</option>
              <option value="coaching">Coaching</option>
              <option value="sophrologie">Sophrologie</option>
              <option value="massage">Massage</option>
              <option value="formule">Formules</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.clientName}</div>
                      <div className="text-sm text-gray-500">{reservation.clientEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getServiceColor(reservation.service)}`}>
                        {getServiceLabel(reservation.service)}
                      </span>
                      {reservation.service === 'formule' && (
                      <span title="Formule combinée">
                        <Package className="w-4 h-4 text-teal-600" />
                      </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{reservation.duration} min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {reservation.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {reservation.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold text-teal-600">{reservation.price}€</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedReservation(reservation)}
                      className="text-teal-600 hover:text-teal-900 transition-colors"
                      title="Voir les détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Confirmer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Annuler"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Détails de la réservation</h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{selectedReservation.clientName}</h4>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Mail className="w-4 h-4 mr-1" />
                  {selectedReservation.clientEmail}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Phone className="w-4 h-4 mr-1" />
                  {selectedReservation.clientPhone}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p><strong>Service:</strong> {getServiceLabel(selectedReservation.service)}</p>
                  {selectedReservation.service === 'formule' && (

                    <span title="Formule combinée">
                      <Package className="w-4 h-4 text-teal-600" />
                    </span>
                  )}
                </div>
                <p><strong>Date:</strong> {selectedReservation.date}</p>
                <p><strong>Heure:</strong> {selectedReservation.time}</p>
                <p><strong>Durée:</strong> {selectedReservation.duration} minutes</p>
                <p><strong>Prix:</strong> <span className="text-teal-600 font-semibold">{selectedReservation.price}€</span></p>
                <p><strong>Statut:</strong> 
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedReservation.status)}`}>
                    {getStatusText(selectedReservation.status)}
                  </span>
                </p>
              </div>
              
              {selectedReservation.notes && (
                <div className="border-t pt-4">
                  <p><strong>Notes:</strong></p>
                  <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded-lg">{selectedReservation.notes}</p>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                {selectedReservation.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'confirmed');
                        setSelectedReservation(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'cancelled');
                        setSelectedReservation(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Annuler
                    </button>
                  </>
                )}
                {selectedReservation.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      updateReservationStatus(selectedReservation.id, 'completed');
                      setSelectedReservation(null);
                    }}
                    className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Marquer comme complété
                  </button>
                )}
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;