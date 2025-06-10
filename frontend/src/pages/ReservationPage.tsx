import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import ReservationForm from '../components/forms/ReservationForm';

const ReservationPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Réserver une séance | Side-Up';
  }, []);

  const handleReservationSubmit = (data: any) => {
    console.log('Données de réservation reçues:', data);
    // Ici vous pourriez envoyer les données à votre backend
    // ou intégrer avec un système de réservation comme Calendly
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="mb-6">Réserver une séance</h1>
            <p className="text-xl text-gray-600">
              Prenez rendez-vous facilement avec nos experts pour commencer votre transformation personnelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reservation Form */}
            <div className="lg:col-span-2">
              <ReservationForm onSubmit={handleReservationSubmit} />
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-medium mb-4">Informations pratiques</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600 text-sm">Reims, France</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600 text-sm">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-gray-600 text-sm">
                        Lun-Ven: 9h-19h<br />
                        Sam: 9h-13h<br />
                        Dim: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-secondary-50 p-6 rounded-xl"
              >
                <h3 className="text-lg font-medium mb-4">Besoin d'aide ?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Vous avez des questions ou préférez réserver par téléphone ?
                </p>
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="block w-full btn-outline text-center text-sm"
                  >
                    Nous contacter
                  </Link>
                  <a
                    href="tel:+33123456789"
                    className="block w-full btn-secondary text-center text-sm"
                  >
                    Appeler maintenant
                  </a>
                </div>
              </motion.div>

              {/* Services Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-medium mb-4">Nos services</h3>
                <div className="space-y-2">
                  <Link
                    to="/services#coaching"
                    className="block text-sm text-primary-600 hover:text-primary-700"
                  >
                    → Coaching personnel & professionnel
                  </Link>
                  <Link
                    to="/services#sophrologie"
                    className="block text-sm text-primary-600 hover:text-primary-700"
                  >
                    → Sophrologie & relaxation
                  </Link>
                  <Link
                    to="/services#massage"
                    className="block text-sm text-primary-600 hover:text-primary-700"
                  >
                    → Massage des 5 Continents
                  </Link>
                  <Link
                    to="/services#preparation-mentale"
                    className="block text-sm text-primary-600 hover:text-primary-700"
                  >
                    → Préparation mentale
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link
                    to="/pricing"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Voir tous nos tarifs →
                  </Link>
                </div>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-accent-50 p-6 rounded-xl"
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-accent-400 mx-auto mb-3"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-sm text-gray-600 mb-3">
                    "Une expérience transformatrice ! L'équipe de Side-Up m'a aidé à retrouver confiance et sérénité."
                  </p>
                  <p className="text-xs font-medium text-gray-800">Marie L.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-medium text-center mb-8">Questions fréquentes</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-medium mb-2">Comment confirmer ma réservation ?</h3>
                <p className="text-gray-600 text-sm">
                  Après avoir soumis votre demande, nous vous contacterons dans les 24h par email ou téléphone pour confirmer votre rendez-vous et répondre à vos questions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-medium mb-2">Puis-je annuler ou reporter ma séance ?</h3>
                <p className="text-gray-600 text-sm">
                  Oui, vous pouvez annuler ou reporter votre séance jusqu'à 24h avant le rendez-vous sans frais. Au-delà, des frais d'annulation peuvent s'appliquer.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-medium mb-2">Quels sont les moyens de paiement acceptés ?</h3>
                <p className="text-gray-600 text-sm">
                  Nous acceptons les paiements en espèces, par virement bancaire et par chèque. Le paiement s'effectue à la fin de la séance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ReservationPage;