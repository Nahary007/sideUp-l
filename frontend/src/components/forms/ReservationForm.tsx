import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

type ReservationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  message?: string;
  acceptTerms: boolean;
};

interface ReservationFormProps {
  onSubmit?: (data: ReservationFormData) => void;
  className?: string;
}

const ReservationForm = ({ onSubmit, className = '' }: ReservationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ReservationFormData>();

  const selectedService = watch('service');

  const services = [
    { value: 'coaching', label: 'Coaching', duration: '60 min', price: '80€' },
    { value: 'sophrologie', label: 'Sophrologie', duration: '60 min', price: '70€' },
    { value: 'massage', label: 'Massage des 5 Continents', duration: '75 min', price: '95€' },
    { value: 'preparation-mentale', label: 'Préparation Mentale', duration: '60 min', price: '75€' },
    { value: 'coaching-sophrologie', label: 'Coaching + Sophrologie', duration: '90 min', price: '120€' },
    { value: 'decouverte', label: 'Séance Découverte', duration: '30 min', price: '50€' },
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  const locations = [
    { value: 'cabinet', label: 'Dans nos locaux (Reims)' },
    { value: 'domicile', label: 'À domicile (+20€)' },
    { value: 'entreprise', label: 'En entreprise (sur devis)' },
    { value: 'visio', label: 'En visioconférence (coaching/sophrologie uniquement)' },
  ];

  const handleFormSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(data);
      } else {
        console.log('Données de réservation:', data);
      }
      
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // Get selected service details
  const selectedServiceDetails = services.find(s => s.value === selectedService);

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-green-800 mb-2">Réservation confirmée !</h3>
        <p className="text-green-700 mb-4">
          Votre demande de réservation a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais pour confirmer votre rendez-vous.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="btn-primary"
        >
          Nouvelle réservation
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-2">Réserver une séance</h2>
        <p className="text-gray-600">
          Remplissez ce formulaire pour réserver votre séance. Nous vous contacterons pour confirmer votre rendez-vous.
        </p>
      </div>

      {/* Service Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">
          <MessageSquare className="inline mr-2" size={18} />
          Service souhaité <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service) => (
            <label
              key={service.value}
              className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedService === service.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                value={service.value}
                className="sr-only"
                {...register('service', { required: 'Veuillez sélectionner un service' })}
              />
              <div className="flex-grow">
                <div className="font-medium">{service.label}</div>
                <div className="text-sm text-gray-500">
                  {service.duration} • {service.price}
                </div>
              </div>
              {selectedService === service.value && (
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </label>
          ))}
        </div>
        {errors.service && (
          <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
        )}
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
            <User className="inline mr-2" size={18} />
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Votre prénom"
            {...register('firstName', { required: 'Le prénom est requis' })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Votre nom"
            {...register('lastName', { required: 'Le nom est requis' })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            <Mail className="inline mr-2" size={18} />
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="votre@email.com"
            {...register('email', {
              required: 'L\'email est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Adresse email invalide',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            <Phone className="inline mr-2" size={18} />
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="06 12 34 56 78"
            {...register('phone', { required: 'Le téléphone est requis' })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            <Calendar className="inline mr-2" size={18} />
            Date souhaitée <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            min={today}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('date', { required: 'La date est requise' })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
            <Clock className="inline mr-2" size={18} />
            Heure souhaitée <span className="text-red-500">*</span>
          </label>
          <select
            id="time"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.time ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('time', { required: 'L\'heure est requise' })}
          >
            <option value="">Sélectionnez une heure</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">
          Lieu de la séance <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {locations.map((location) => (
            <label
              key={location.value}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                value={location.value}
                className="mr-3 text-primary-600 focus:ring-primary-500"
                {...register('location', { required: 'Veuillez sélectionner un lieu' })}
              />
              <span>{location.label}</span>
            </label>
          ))}
        </div>
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          placeholder="Précisez vos attentes, objectifs ou toute information utile..."
          {...register('message')}
        ></textarea>
      </div>

      {/* Service Summary */}
      {selectedServiceDetails && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h4 className="font-medium text-primary-800 mb-2">Récapitulatif de votre réservation</h4>
          <div className="text-sm text-primary-700">
            <p><strong>Service :</strong> {selectedServiceDetails.label}</p>
            <p><strong>Durée :</strong> {selectedServiceDetails.duration}</p>
            <p><strong>Tarif :</strong> {selectedServiceDetails.price}</p>
          </div>
        </div>
      )}

      {/* Terms */}
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            className="mt-1 mr-3 text-primary-600 focus:ring-primary-500"
            {...register('acceptTerms', { required: 'Vous devez accepter les conditions' })}
          />
          <span className="text-sm text-gray-600">
            J'accepte les{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 underline">
              conditions générales
            </a>{' '}
            et la{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 underline">
              politique de confidentialité
            </a>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.acceptTerms.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full btn-primary ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Envoi en cours...
          </div>
        ) : (
          'Réserver ma séance'
        )}
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Votre réservation sera confirmée par email ou téléphone dans les 24h.
      </p>
    </motion.form>
  );
};

export default ReservationForm;