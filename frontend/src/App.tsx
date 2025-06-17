import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import ReservationPage from './pages/ReservationPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import Reservations from './components/admin/Reservations';
import Pricing from './components/admin/Pricing';
import Messages from './components/admin/Messages';
import Clients from './components/admin/Clients';

function App() {
  return (
    <Routes>
      {/* Page de login sans layout */}
      <Route path="/admin" element={<LoginPage />} />

      {/* Pages Admin PROTÉGÉES avec routes imbriquées */}
      <Route
        path="/adminPage"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      >
        {/* Route index - affiche directement le Dashboard */}
        <Route index element={<Dashboard />} />
        {/* Routes admin protégées */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="messages" element={<Messages />} />
        <Route path="clients" element={<Clients />} />
        <Route path="settings" element={
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Paramètres</h2>
            <p className="text-gray-600">Cette section sera développée prochainement.</p>
          </div>
        } />
      </Route>

      {/* Les autres pages avec layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="reservation" element={<ReservationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;