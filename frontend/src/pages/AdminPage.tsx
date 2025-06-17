import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;