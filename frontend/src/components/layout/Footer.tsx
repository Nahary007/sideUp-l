import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo isLight />
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Transformez votre vie grâce à notre approche globale de bien-être,
              combinant coaching personnalisé, préparation mentale, sophrologie
              et massage bien-être.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium text-lg mb-4">
              Nos prestations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services#coaching"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Coaching
                </Link>
              </li>
              <li>
                <Link
                  to="/services#sophrologie"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sophrologie
                </Link>
              </li>
              <li>
                <Link
                  to="/services#massage"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Massage bien-être
                </Link>
              </li>
              <li>
                <Link
                  to="/services#preparation-mentale"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Préparation mentale
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tarifs & Formules
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-lg mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog & Ressources
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Reims, France</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="hover:text-white transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="mailto:contact@side-up.fr"
                  className="hover:text-white transition-colors"
                >
                  contact@side-up.fr
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/reservation" className="btn-primary text-sm">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center text-gray-500">
          <p>
            &copy; {currentYear} Side-Up. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;