import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Euro, 
  MessageSquare, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/adminPage' },
    { id: 'reservations', label: 'Réservations', icon: Calendar, path: '/adminPage/reservations' },
    { id: 'pricing', label: 'Tarifs', icon: Euro, path: '/adminPage/pricing' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/adminPage/messages' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/adminPage/clients' },
    { id: 'settings', label: 'Paramètres', icon: Settings, path: '/adminPage/settings' }
  ];

  const isActive = (path: string) => {
    if (path === '/adminPage') {
      return location.pathname === '/adminPage' || location.pathname === '/adminPage/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Side-Up</h1>
            <p className="text-sm text-gray-500">Administration</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive(item.path)
                      ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;