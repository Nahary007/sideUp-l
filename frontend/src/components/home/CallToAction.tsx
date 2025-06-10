import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary-700 text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
            Prêt(e) à Transformer Votre Vie ?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Que vous soyez un particulier, un professionnel ou un chef d'entreprise,
            notre accompagnement intégrant coaching, sophrologie et massage bien-être
            est pensé pour répondre à vos attentes spécifiques. Découvrez comment équilibrer
            votre vie, revitaliser votre esprit, et avancer sereinement vers votre avenir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservation"
              className="btn bg-white text-primary-700 hover:bg-primary-50"
            >
              Prenez rendez-vous avec un expert
            </Link>
            <Link
              to="/services"
              className="btn border border-white text-white hover:bg-primary-600"
            >
              Découvrez nos services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;