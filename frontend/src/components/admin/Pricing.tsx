import React, { useState, useEffect } from 'react';
import { Plus, Edit2, ToggleLeft as Toggle, Save, X, Package, Trash2 } from 'lucide-react';

// Interface Service adaptée au backend Laravel
interface Service {
  id: string;
  name: string;
  type: 'coaching' | 'sophrologie' | 'massage' | 'formule';
  duration: number;
  price: number;
  description: string;
  is_active: boolean;
  is_package: boolean;
  package_details?: {
    sessions: number;
    pricePerSession: number;
  };
  created_at?: string;
  updated_at?: string;
}

const API_BASE_URL = 'http://localhost:8000';

const Pricing: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    type: 'coaching',
    duration: 60,
    price: 0,
    description: '',
    is_active: true,
    is_package: false
  });

  // Fonction pour obtenir le token CSRF
  const getCsrfToken = async () => {
    try {
      await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: 'include'
      });
    } catch (err) {
      console.error('Erreur lors de la récupération du token CSRF:', err);
    }
  };

  // Fonction pour faire des requêtes API avec authentification
  const apiRequest = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');
    
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    return response.json();
  };

  // Charger les services
  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest('/services');
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des services');
      console.error('Erreur lors du chargement des services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger les services au montage
  useEffect(() => {
    getCsrfToken().then(() => {
      loadServices();
    });
  }, []);

  // Basculer le statut d'un service
  const toggleServiceStatus = async (id: string) => {
    try {
      const service = services.find(s => s.id === id);
      if (!service) return;

      const updatedService = await apiRequest(`/services/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          is_active: !service.is_active
        })
      });

      setServices(prev =>
        prev.map(s => s.id === id ? updatedService : s)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour du statut');
      console.error('Erreur lors de la mise à jour du statut:', err);
    }
  };

  // Mettre à jour un service
  const updateService = async (updatedService: Service) => {
    try {
      setLoading(true);
      const response = await apiRequest(`/services/${updatedService.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: updatedService.name,
          type: updatedService.type,
          duration: updatedService.duration,
          price: updatedService.price,
          description: updatedService.description,
          is_active: updatedService.is_active,
          is_package: updatedService.is_package,
          package_details: updatedService.package_details
        })
      });

      setServices(prev =>
        prev.map(service =>
          service.id === updatedService.id ? response : service
        )
      );
      setEditingService(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour du service');
      console.error('Erreur lors de la mise à jour du service:', err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un service
  const addService = async () => {
    if (!newService.name || !newService.type || !newService.duration || !newService.price) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);

    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' });


      const serviceData = {
        name: newService.name,
        type: newService.type,
        duration: newService.duration,
        price: newService.price,
        description: newService.description || '',
        is_active: true,
        is_package: newService.is_package || false,
        package_details: newService.is_package ? {
          sessions: newService.package_details?.sessions || 1,
          pricePerSession: Math.round((newService.price || 0) / (newService.package_details?.sessions || 1))
        } : null
      };

      const response = await apiRequest('/services', {
        method: 'POST',
        body: JSON.stringify(serviceData)
      });

      setServices(prev => [...prev, response]);
      setNewService({
        name: '',
        type: 'coaching',
        duration: 60,
        price: 0,
        description: '',
        is_active: true,
        is_package: false
      });
      setIsAddingService(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout du service');
      console.error('Erreur lors de l\'ajout du service:', err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un service
  const deleteService = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      return;
    }

    try {
      setLoading(true);
      await apiRequest(`/services/${id}`, {
        method: 'DELETE'
      });

      setServices(prev => prev.filter(service => service.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression du service');
      console.error('Erreur lors de la suppression du service:', err);
    } finally {
      setLoading(false);
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

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des tarifs Side-Up</h1>
          <p className="text-gray-600">Gérez tous vos services, packages et formules</p>
        </div>
        <button
          onClick={() => setIsAddingService(true)}
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau service</span>
        </button>
      </div>

      {/* Alerte d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-800 text-sm">{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filtre */}
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

      {/* Grille des services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  {service.is_package && (
                    <span title="Package/Formule">
                      <Package className="w-4 h-4 text-teal-600" />
                    </span>
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
                  disabled={loading}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`transition-colors ${
                    service.is_active ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                  }`}
                  disabled={loading}
                >
                  <Toggle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4" />
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

              {service.is_package && service.package_details && (
                <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-teal-700 font-medium">Séances:</span>
                      <p className="text-teal-900">{service.package_details.sessions}</p>
                    </div>
                    <div>
                      <span className="text-teal-700 font-medium">Prix/séance:</span>
                      <p className="text-teal-900">{service.package_details.pricePerSession}€</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {service.is_active ? 'Actif' : 'Inactif'}
              </span>
              {service.is_package && (
                <span className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800">
                  Package
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
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
                    checked={editingService.is_package || false}
                    onChange={(e) => setEditingService({ 
                      ...editingService, 
                      is_package: e.target.checked,
                      package_details: e.target.checked ? {
                        sessions: editingService.package_details?.sessions || 1,
                        pricePerSession: Math.round(editingService.price / (editingService.package_details?.sessions || 1))
                      } : undefined
                    })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-gray-700">C'est un package/formule</span>
                </label>
              </div>

              {editingService.is_package && (
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-teal-700 mb-1">Nombre de séances</label>
                      <input
                        type="number"
                        value={editingService.package_details?.sessions || 1}
                        onChange={(e) => {
                          const sessions = parseInt(e.target.value) || 1;
                          setEditingService({ 
                            ...editingService, 
                            package_details: {
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
                        value={`${editingService.package_details?.pricePerSession || 0}€`}
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
                  disabled={loading}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
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

      {/* Modal d'ajout */}
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
                    is_active: true,
                    is_package: false
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
                    checked={newService.is_package || false}
                    onChange={(e) => setNewService({ 
                      ...newService, 
                      is_package: e.target.checked,
                      package_details: e.target.checked ? {
                        sessions: 1,
                        pricePerSession: newService.price || 0
                      } : undefined
                    })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-gray-700">C'est un package/formule</span>
                </label>
              </div>

              {newService.is_package && (
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Nombre de séances</label>
                    <input
                      type="number"
                      value={newService.package_details?.sessions || 1}
                      onChange={(e) => {
                        const sessions = parseInt(e.target.value) || 1;
                        setNewService({ 
                          ...newService, 
                          package_details: {
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
                  disabled={loading}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
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
                      is_active: true,
                      is_package: false
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