import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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

  // Update page title
  useEffect(() => {
    document.title = 'Contact | Side-Up';
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the form data to your server or a service like Formspree
    alert('Merci pour votre message ! Nous vous contacterons très prochainement.');
    reset();
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
                onSubmit={handleSubmit(onSubmit)}
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

                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Envoyer
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

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