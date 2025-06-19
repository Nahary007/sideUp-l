import React, { useState, useEffect } from 'react';
import { Plus, Edit2, ToggleLeft as Toggle, Save, X, Package, Trash2, AlertCircle } from 'lucide-react';
import axios from 'axios';

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

interface NewService {
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
}

const API_BASE_URL = 'http://localhost:8000';

const Pricing: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newService, setNewService] = useState<NewService>({
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
    try {
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
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `Erreur HTTP: ${response.status}` };
        }
        
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }
      
      // Vérifier si la réponse a du contenu
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return null; // Pour les réponses sans contenu (comme DELETE)
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  };

  // Charger les services
  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest('/services');
      
      if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des services';
      setError(errorMessage);
      console.error('Erreur lors du chargement des services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger les services au montage
  useEffect(() => {
    const initializeData = async () => {
      await getCsrfToken();
      await loadServices();
    };
    
    initializeData();
  }, []);

  // Fonction pour afficher les messages de succès
  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  // Fonction pour afficher les erreurs
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  // Basculer le statut d'un service
  const toggleServiceStatus = async (id: string) => {
    try {
      setLoading(true);
      
      const service = services.find(s => s.id === id);
      if (!service) return;

      // Récupérer le token CSRF
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
      
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const xsrfToken = getCookie('XSRF-TOKEN');

      const response = await axios.patch(`http://localhost:8000/services/${id}`, {
        is_active: !service.is_active
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
        },
        withCredentials: true,
      });

      // Met à jour l'état local après modification
      setServices(prev =>
        prev.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s)
      );
      
      showSuccess(`Service ${!service.is_active ? 'activé' : 'désactivé'} avec succès`);
      console.log('Statut du service mis à jour avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      if (error.response?.data?.message) {
        showError(`Erreur: ${error.response.data.message}`);
      } else {
        showError('Échec de la mise à jour du statut du service');
      }
    } finally {
      setLoading(false);
    }
  };

// Mettre à jour un service
const updateService = async (updatedService: Service) => {
  try {
    setLoading(true);
    
    // Récupérer le token CSRF
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
    
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    const xsrfToken = getCookie('XSRF-TOKEN');

    const serviceData = {
      name: updatedService.name,
      type: updatedService.type,
      duration: Number(updatedService.duration),
      price: Number(updatedService.price),
      description: updatedService.description || '',
      is_active: updatedService.is_active,
      is_package: updatedService.is_package,
      package_details: updatedService.is_package ? updatedService.package_details : null
    };

    const response = await axios.patch(`http://localhost:8000/services/${updatedService.id}`, serviceData, {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
      },
      withCredentials: true,
    });

    // Met à jour l'état local après modification
    setServices(prev =>
      prev.map(service =>
        service.id === updatedService.id ? { ...updatedService, ...response.data } : service
      )
    );
    
    setEditingService(null);
    showSuccess('Service mis à jour avec succès');
    console.log('Service mis à jour avec succès');
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du service:', error);
    if (error.response?.data?.message) {
      showError(`Erreur: ${error.response.data.message}`);
    } else {
      showError('Échec de la mise à jour du service');
    }
  } finally {
    setLoading(false);
  }
};

// Ajouter un service avec la même logique CSRF que les réservations
const addService = async () => {
  if (!newService.name.trim() || !newService.type || !newService.duration || !newService.price) {
    showError('Veuillez remplir tous les champs obligatoires');
    return;
  }

  if (newService.duration <= 0) {
    showError('La durée doit être supérieure à 0');
    return;
  }

  if (newService.price <= 0) {
    showError('Le prix doit être supérieur à 0');
    return;
  }

  try {
    setLoading(true);

    // Récupération du token CSRF (même logique que pour les réservations)
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

    // Récupère le token CSRF du cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    const xsrfToken = getCookie('XSRF-TOKEN');

    const serviceData = {
      name: newService.name.trim(),
      type: newService.type,
      duration: Number(newService.duration),
      price: Number(newService.price),
      description: newService.description.trim() || '',
      is_active: true,
      is_package: newService.is_package || false,
      package_details: newService.is_package && newService.package_details ? {
        sessions: Number(newService.package_details.sessions) || 1,
        pricePerSession: Math.round(Number(newService.price) / (Number(newService.package_details.sessions) || 1))
      } : null
    };

    // Envoi avec axios (même logique que pour les réservations)
    const response = await axios.post('http://localhost:8000/services', serviceData, {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
      },
      withCredentials: true,
    });

    console.log('Service ajouté avec succès :', response.data);
    setServices(prev => [...prev, response.data]);
    
    // Reset du formulaire
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
    showSuccess('Service ajouté avec succès');

  } catch (error: any) {
    console.error('Erreur lors de l\'ajout du service :', error);
    
    // Gérer les différents types d'erreurs (même logique que pour les réservations)
    if (error.response?.status === 422) {
      // Erreur de validation
      showError('Données invalides. Veuillez vérifier vos informations.');
    } else if (error.response?.status === 409) {
      // Conflit (service déjà existant par exemple)
      showError('Ce service existe déjà ou il y a un conflit.');
    } else if (error.response?.data?.message) {
      // Autre erreur avec message du serveur
      showError(error.response.data.message);
    } else {
      // Erreur générique
      showError("Erreur lors de l'ajout du service. Veuillez réessayer.");
    }
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
      showSuccess('Service supprimé avec succès');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du service';
      showError(errorMessage);
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

  // Fonction pour fermer les modales
  const closeModals = () => {
    setEditingService(null);
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
  };

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

      {/* Alertes */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
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

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-800 text-sm">{success}</span>
          </div>
          <button
            onClick={() => setSuccess(null)}
            className="text-green-600 hover:text-green-800"
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
                  title="Modifier"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`transition-colors ${
                    service.is_active ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                  }`}
                  disabled={loading}
                  title={service.is_active ? 'Désactiver' : 'Activer'}
                >
                  <Toggle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  disabled={loading}
                  title="Supprimer"
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

      {filteredServices.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun service trouvé.</p>
        </div>
      )}

      {/* Modal d'édition */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Modifier le service</h3>
              <button
                onClick={closeModals}
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
                    min="1"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) || 0 })}
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
                        min="1"
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
                  onClick={closeModals}
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
                onClick={closeModals}
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
                    min="1"
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
                    min="0"
                    step="0.01"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) || 0 })}
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
                      min="1"
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
                  onClick={closeModals}
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