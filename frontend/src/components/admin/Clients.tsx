import React, { useState } from 'react';
import { Search, User, Mail, Phone, Calendar, History } from 'lucide-react';
import { mockReservations } from '../../data/mockData';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalReservations: number;
  totalSpent: number;
  lastVisit: string;
  preferredService: string;
}

const Clients: React.FC = () => {
  // Generate clients from reservations
  const clients: Client[] = Array.from(
    mockReservations.reduce((acc, reservation) => {
      const existingClient = acc.get(reservation.clientEmail);
      if (existingClient) {
        existingClient.totalReservations += 1;
        existingClient.totalSpent += reservation.price;
        if (new Date(reservation.date) > new Date(existingClient.lastVisit)) {
          existingClient.lastVisit = reservation.date;
        }
      } else {
        acc.set(reservation.clientEmail, {
          id: reservation.clientEmail,
          name: reservation.clientName,
          email: reservation.clientEmail,
          phone: reservation.clientPhone,
          joinDate: reservation.createdAt.split('T')[0],
          totalReservations: 1,
          totalSpent: reservation.price,
          lastVisit: reservation.date,
          preferredService: reservation.service
        });
      }
      return acc;
    }, new Map())
  ).map(([_, client]) => client);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientReservations = (clientEmail: string) => {
    return mockReservations.filter(reservation => reservation.clientEmail === clientEmail);
  };

  const getServiceLabel = (service: string) => {
    switch (service) {
      case 'coaching':
        return 'Coaching';
      case 'sophrologie':
        return 'Sophrologie';
      case 'massage':
        return 'Massage';
      default:
        return service;
    }
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des clients</h1>
        <p className="text-gray-600">Consultez et gérez vos clients Side-Up</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un client par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">Client depuis {new Date(client.joinDate).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {client.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {client.phone}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-teal-600">{client.totalReservations}</p>
                <p className="text-xs text-gray-500">Réservations</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-green-600">{client.totalSpent}€</p>
                <p className="text-xs text-gray-500">Dépensé</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Service préféré: <span className="font-medium">{getServiceLabel(client.preferredService)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Dernière visite: <span className="font-medium">{new Date(client.lastVisit).toLocaleDateString('fr-FR')}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedClient.name}</h3>
                    <p className="text-sm text-gray-600">Profil client</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Mail className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Informations de contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Client depuis le {new Date(selectedClient.joinDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Statistiques</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-teal-600">{selectedClient.totalReservations}</p>
                      <p className="text-sm text-gray-600">Réservations totales</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedClient.totalSpent}€</p>
                      <p className="text-sm text-gray-600">Total dépensé</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Service préféré</p>
                    <p className="font-medium text-gray-900">{getServiceLabel(selectedClient.preferredService)}</p>
                  </div>
                </div>
              </div>
              
              {/* Reservation History */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <History className="w-5 h-5 text-gray-400" />
                  <h4 className="font-semibold text-gray-900">Historique des réservations</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {getClientReservations(selectedClient.email).map((reservation) => (
                        <tr key={reservation.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {getServiceLabel(reservation.service)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {reservation.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {reservation.time}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                              {getStatusText(reservation.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {reservation.price}€
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;