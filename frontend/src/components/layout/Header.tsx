import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-md ${
      isActive
        ? 'text-primary-700 bg-primary-50'
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={navLinkClasses} end>
            Accueil
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            À propos
          </NavLink>
          <NavLink to="/services" className={navLinkClasses}>
            Prestations
          </NavLink>
          <NavLink to="/pricing" className={navLinkClasses}>
            Tarifs
          </NavLink>
          <NavLink to="/blog" className={navLinkClasses}>
            Blog
          </NavLink>
          <NavLink to="/faq" className={navLinkClasses}>
            FAQ
          </NavLink>
          <NavLink to="/contact" className={navLinkClasses}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="btn-primary">
            Réserver
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <nav className="container py-5 flex flex-col space-y-2">
            <NavLink
              to="/"
              className={navLinkClasses}
              onClick={closeMenu}
              end
            >
              Accueil
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              À propos
            </NavLink>
            <NavLink
              to="/services"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              Prestations
            </NavLink>
            <NavLink
              to="/pricing"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              Tarifs
            </NavLink>
            <NavLink
              to="/blog"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              Blog
            </NavLink>
            <NavLink
              to="/faq"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              FAQ
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClasses}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
            <Link
              to="/contact"
              className="btn-primary mt-4 text-center"
              onClick={closeMenu}
            >
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;