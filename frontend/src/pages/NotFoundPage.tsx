import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Page non trouvée | Side-Up';
  }, []);

  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-9xl font-bold text-primary-200 mb-6">404</h1>
          <h2 className="text-3xl font-medium mb-6">Page non trouvée</h2>
          <p className="text-xl text-gray-600 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFoundPage;