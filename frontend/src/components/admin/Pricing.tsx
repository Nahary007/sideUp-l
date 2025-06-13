import React, { useState } from 'react';
import { Plus, Edit2, ToggleLeft as Toggle, Save, X, Package } from 'lucide-react';
import { mockServices } from '../../data/mockData';
import type { Service } from '../../types/admin';

const Pricing: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    type: 'coaching',
    duration: 60,
    price: 0,
    description: '',
    isActive: true,
    isPackage: false
  });

  const toggleServiceStatus = (id: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, isActive: !service.isActive } : service
      )
    );
  };

  const updateService = (updatedService: Service) => {
    setServices(prev =>
      prev.map(service =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setEditingService(null);
  };

  const addService = () => {
    if (newService.name && newService.type && newService.duration && newService.price) {
      const service: Service = {
        id: Math.random().toString(36).substr(2, 9),
        name: newService.name,
        type: newService.type as 'coaching' | 'sophrologie' | 'massage' | 'formule',
        duration: newService.duration,
        price: newService.price,
        description: newService.description || '',
        isActive: true,
        isPackage: newService.isPackage || false,
        packageDetails: newService.isPackage ? {
          sessions: newService.packageDetails?.sessions || 1,
          pricePerSession: Math.round(newService.price / (newService.packageDetails?.sessions || 1))
        } : undefined
      };
      setServices(prev => [...prev, service]);
      setNewService({
        name: '',
        type: 'coaching',
        duration: 60,
        price: 0,
        description: '',
        isActive: true,
        isPackage: false
      });
      setIsAddingService(false);
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'coaching':
        return 'Coaching';
      case 'sophrologie':
        return 'Sophrologie';
      case 'massage':
        return 'Massage';
      case 'formule':
        return 'Formule Combinée';
      default:
        return type;
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'coaching':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sophrologie':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'massage':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'formule':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredServices = services.filter(service => 
    serviceTypeFilter === 'all' || service.type === serviceTypeFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des tarifs Side-Up</h1>
          <p className="text-gray-600">Gérez tous vos services, packages et formules</p>
        </div>
        <button
          onClick={() => setIsAddingService(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau service</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtrer par type:</span>
          <select
            value={serviceTypeFilter}
            onChange={(e) => setServiceTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="all">Tous les services</option>
            <option value="coaching">Coaching</option>
            <option value="sophrologie">Sophrologie</option>
            <option value="massage">Massage</option>
            <option value="formule">Formules Combinées</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  {service.isPackage && (
                    <span title="Package/Formule">
                      <Package className="w-4 h-4 text-teal-600" />
                    </span>
                    // <Package className="w-4 h-4 text-teal-600" title="Package/Formule" />
                  )}
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getServiceTypeColor(service.type)}`}>
                  {getServiceTypeLabel(service.type)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`transition-colors ${
                    service.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <Toggle className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Durée:</span>
                  <p className="font-medium">{service.duration} min</p>
                </div>
                <div>
                  <span className="text-gray-500">Prix:</span>
                  <p className="font-bold text-lg text-teal-600">{service.price}€</p>
                </div>
              </div>

              {service.isPackage && service.packageDetails && (
                <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-teal-700 font-medium">Séances:</span>
                      <p className="text-teal-900">{service.packageDetails.sessions}</p>
                    </div>
                    <div>
                      <span className="text-teal-700 font-medium">Prix/séance:</span>
                      <p className="text-teal-900">{service.packageDetails.pricePerSession}€</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {service.isActive ? 'Actif' : 'Inactif'}
              </span>
              {service.isPackage && (
                <span className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800">
                  Package
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Modifier le service</h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du service</label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editingService.type}
                  onChange={(e) => setEditingService({ ...editingService, type: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="coaching">Coaching</option>
                  <option value="sophrologie">Sophrologie</option>
                  <option value="massage">Massage</option>
                  <option value="formule">Formule Combinée</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée (min)</label>
                  <input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingService.isPackage || false}
                    onChange={(e) => setEditingService({ 
                      ...editingService, 
                      isPackage: e.target.checked,
                      packageDetails: e.target.checked ? {
                        sessions: editingService.packageDetails?.sessions || 1,
                        pricePerSession: Math.round(editingService.price / (editingService.packageDetails?.sessions || 1))
                      } : undefined
                    })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-gray-700">C'est un package/formule</span>
                </label>
              </div>

              {editingService.isPackage && (
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-teal-700 mb-1">Nombre de séances</label>
                      <input
                        type="number"
                        value={editingService.packageDetails?.sessions || 1}
                        onChange={(e) => {
                          const sessions = parseInt(e.target.value) || 1;
                          setEditingService({ 
                            ...editingService, 
                            packageDetails: {
                              sessions,
                              pricePerSession: Math.round(editingService.price / sessions)
                            }
                          });
                        }}
                        className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-teal-700 mb-1">Prix par séance</label>
                      <input
                        type="text"
                        value={`${editingService.packageDetails?.pricePerSession || 0}€`}
                        readOnly
                        className="w-full border border-teal-300 rounded-lg px-3 py-2 bg-teal-100 text-teal-800"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => updateService(editingService)}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={() => setEditingService(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Nouveau service</h3>
              <button
                onClick={() => {
                  setIsAddingService(false);
                  setNewService({
                    name: '',
                    type: 'coaching',
                    duration: 60,
                    price: 0,
                    description: '',
                    isActive: true,
                    isPackage: false
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du service</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: Coaching Découverte"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newService.type}
                  onChange={(e) => setNewService({ ...newService, type: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="coaching">Coaching</option>
                  <option value="sophrologie">Sophrologie</option>
                  <option value="massage">Massage</option>
                  <option value="formule">Formule Combinée</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée (min)</label>
                  <input
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newService.isPackage || false}
                    onChange={(e) => setNewService({ 
                      ...newService, 
                      isPackage: e.target.checked,
                      packageDetails: e.target.checked ? {
                        sessions: 1,
                        pricePerSession: newService.price || 0
                      } : undefined
                    })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-gray-700">C'est un package/formule</span>
                </label>
              </div>

              {newService.isPackage && (
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Nombre de séances</label>
                    <input
                      type="number"
                      value={newService.packageDetails?.sessions || 1}
                      onChange={(e) => {
                        const sessions = parseInt(e.target.value) || 1;
                        setNewService({ 
                          ...newService, 
                          packageDetails: {
                            sessions,
                            pricePerSession: Math.round((newService.price || 0) / sessions)
                          }
                        });
                      }}
                      className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      min="1"
                      placeholder="5"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows={3}
                  placeholder="Décrivez ce service..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={addService}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
                <button
                  onClick={() => {
                    setIsAddingService(false);
                    setNewService({
                      name: '',
                      type: 'coaching',
                      duration: 60,
                      price: 0,
                      description: '',
                      isActive: true,
                      isPackage: false
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;