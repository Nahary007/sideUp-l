import { useEffect, useState } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -50, scale: 0.9 }}
    className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between`}
  >
    <div className="flex items-center">
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
    <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 transition-colors">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();


  useEffect(() => {
    document.title = 'Contact | Side-Up';
  }, []);

  // const onSubmit = (data: FormData) => {
  //   console.log(data);
  //   alert('Merci pour votre message ! Nous vous contacterons très prochainement.');
  //   reset();
  // };
  // ...dans ton composant ContactPage...
const [isSubmitting, setIsSubmitting] = useState(false);
const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

const showToast = (message: string, type: 'success' | 'error') => {
  setToast({ message, type });
  setTimeout(() => setToast(null), 5000);
};

const handleContactSubmit = async (data: any) => {
  setIsSubmitting(true);
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    const xsrfToken = getCookie('XSRF-TOKEN');

    await axios.post('http://localhost:8000/contact', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
      },
      withCredentials: true,
    });

    showToast('Message envoyé ! Nous vous répondrons rapidement.', 'success');
    reset(); // si tu utilises react-hook-form

  } catch (error: any) {
    if (error.response?.data?.message) {
      showToast(error.response.data.message, 'error');
    } else {
      showToast("Erreur lors de l'envoi du message. Veuillez réessayer.", 'error');
    }
  } finally {
    setIsSubmitting(false);
  }
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
            <h1 className="mb-6">Contactez-nous</h1>
            <p className="text-xl text-gray-600">
              Vous avez des questions ou souhaitez prendre rendez-vous ? N'hésitez pas à nous contacter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-8">Nos coordonnées</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Adresse</h3>
                    <p className="text-gray-600">Reims, France</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Phone className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a
                        href="tel:+33123456789"
                        className="hover:text-primary-600 transition-colors"
                      >
                        +33 1 23 45 67 89
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:contact@side-up.fr"
                        className="hover:text-primary-600 transition-colors"
                      >
                        contact@side-up.fr
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Clock className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi: 9h - 19h
                      <br />
                      Samedi: 9h - 13h
                      <br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="text-gray-600 hover:text-primary-600" size={20} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="text-gray-600 hover:text-primary-600" size={20} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="text-gray-600 hover:text-primary-600" size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="mb-8">Envoyez-nous un message</h2>

              <form
                onSubmit={handleSubmit(handleContactSubmit)}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre nom"
                    {...register('name', { required: 'Ce champ est requis' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre email"
                    {...register('email', {
                      required: 'Ce champ est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Adresse email invalide',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    placeholder="Votre numéro de téléphone"
                    {...register('phone')}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="service"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.service ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('service', { required: 'Ce champ est requis' })}
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="coaching">Coaching</option>
                    <option value="sophrologie">Sophrologie</option>
                    <option value="massage">Massage Bien-Être</option>
                    <option value="preparation-mentale">
                      Préparation Mentale
                    </option>
                    <option value="formule-combinee">Formule Combinée</option>
                    <option value="entreprise">Solution pour Entreprise</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre message"
                    {...register('message', {
                      required: 'Ce champ est requis',
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full btn-primary">
                  {isSubmitting ? 'Envoi...' : 'Envoyer'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Booking Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <SectionHeader
            title="Planifiez un appel découverte"
            subtitle="C'est gratuit et sans engagement !"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md text-center"
          >
            <p className="text-gray-600 mb-6">
              Vous préférez discuter directement avec l'un de nos experts ? Réservez un appel découverte de 30 minutes
              pour nous parler de vos besoins et découvrir comment nous pouvons vous aider.
            </p>
            <a
              href="#"
              className="btn-primary inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Réserver un appel découverte
            </a>
            <p className="text-sm text-gray-500 mt-4">
              En cliquant sur ce bouton, vous serez redirigé vers notre outil de prise de rendez-vous.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;