import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Users, 
  Settings 
} from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, path: '/adminPage/dashboard' },
    { name: 'Réservations', icon: Calendar, path: '/adminPage/reservations' },
    { name: 'Tarifs', icon: DollarSign, path: '/adminPage/pricing' },
    { name: 'Messages', icon: MessageSquare, path: '/adminPage/messages' },
    { name: 'Clients', icon: Users, path: '/adminPage/clients' },
    { name: 'Paramètres', icon: Settings, path: '/adminPage/settings' },
  ];

  const isActive = (path: string) => {
    // Gestion spéciale pour le dashboard qui peut être /adminPage ou /adminPage/dashboard
    if (path === '/adminPage/dashboard') {
      return location.pathname === '/adminPage' || location.pathname === '/adminPage/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Administration</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive(item.path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;