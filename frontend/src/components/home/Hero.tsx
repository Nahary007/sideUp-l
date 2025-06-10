import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-16 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mb-6">
              Coaching • Sophrologie • Massage Bien-Être
            </span>
            <h1 className="mb-6 leading-tight">
              Transformez votre vie grâce à une approche globale de bien-être
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Bienvenue chez Side-up, votre espace dédié au bien-être holistique.
              Nous offrons une approche pluridisciplinaire unique, combinant coaching
              personnalisé, préparation mentale, sophrologie, et massage bien-être.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reservation" className="btn-primary">
                Réserver une séance
              </Link>
              <Link to="/services" className="btn-outline">
                Découvrir nos services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Séance de coaching bien-être"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;