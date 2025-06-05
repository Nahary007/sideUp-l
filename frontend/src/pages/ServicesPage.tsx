import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Brain, HeartHandshake, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const ServicesPage = () => {
  const location = useLocation();
  const coachingRef = useRef<HTMLDivElement>(null);
  const sophrologieRef = useRef<HTMLDivElement>(null);
  const massageRef = useRef<HTMLDivElement>(null);
  const preparationMentaleRef = useRef<HTMLDivElement>(null);

  // Update page title
  useEffect(() => {
    document.title = 'Nos Prestations | Side-Up';
  }, []);

  // Scroll to the appropriate section when the hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

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
            <h1 className="mb-6">Nos Prestations</h1>
            <p className="text-xl text-gray-600">
              Que vous soyez un particulier, un professionnel ou un athlète, Side-up propose une 
              approche personnalisée pour répondre à vos objectifs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#coaching"
              className="px-4 py-2 rounded-md bg-primary-50 text-primary-700 font-medium hover:bg-primary-100 transition-colors"
            >
              Coaching
            </a>
            <a
              href="#sophrologie"
              className="px-4 py-2 rounded-md bg-secondary-50 text-secondary-700 font-medium hover:bg-secondary-100 transition-colors"
            >
              Sophrologie
            </a>
            <a
              href="#massage"
              className="px-4 py-2 rounded-md bg-accent-50 text-accent-700 font-medium hover:bg-accent-100 transition-colors"
            >
              Massage Bien-Être
            </a>
            <a
              href="#preparation-mentale"
              className="px-4 py-2 rounded-md bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 transition-colors"
            >
              Préparation Mentale
            </a>
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section id="coaching" ref={coachingRef} className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-700 rounded-lg mb-6">
                <HeartHandshake size={32} />
              </div>
              <h2 className="mb-6">Coaching</h2>
              <p className="text-gray-600 mb-4">
                Le coaching est un processus d'accompagnement personnalisé qui vise à aider une personne 
                ou un groupe à atteindre des objectifs spécifiques, à surmonter des obstacles ou à développer 
                des compétences et des ressources. Ce processus repose sur une relation de confiance entre le 
                coach et le coaché.
              </p>
              <h3 className="text-xl font-medium mb-4">Types de coaching</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Coaching de vie :</strong> axé sur le développement personnel, le bien-être, la gestion du stress, des 
                    relations, l'équilibre entre vie professionnelle et vie personnelle.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Coaching professionnel :</strong> concentré sur le développement et gestion de carrière, l'amélioration
                    des compétences en leadership, la gestion du temps.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Coaching d'affaires :</strong> destiné aux entrepreneurs et aux chefs d'entreprise pour les aider à développer leur 
                    entreprise et à relever les défis spécifiques.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Coaching sportif :</strong> orienté vers l'amélioration des performances sportives, renforcer la 
                    motivation, la gestion de la pression.
                  </span>
                </li>
              </ul>
              <Link to="/pricing" className="btn-primary">
                Voir nos formules
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/7176030/pexels-photo-7176030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Séance de coaching"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sophrologie Section */}
      <section id="sophrologie" ref={sophrologieRef} className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.pexels.com/photos/3759660/pexels-photo-3759660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Séance de sophrologie"
                className="rounded-xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 text-secondary-700 rounded-lg mb-6">
                <Sparkles size={32} />
              </div>
              <h2 className="mb-6">Sophrologie</h2>
              <p className="text-gray-600 mb-4">
                La sophrologie est une méthode psychocorporelle qui vise à harmoniser le corps et l'esprit 
                pour favoriser le bien-être, réduire le stress et améliorer la qualité de vie. Elle combine des 
                techniques de relaxation, de respiration, de concentration et de visualisation positive.
              </p>
              <h3 className="text-xl font-medium mb-4">Applications de la sophrologie</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">L'amélioration du quotidien :</strong> gestion du stress, des angoisses, amélioration du sommeil, 
                    concentration, confiance en soi.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">La préparation d'un événement :</strong> examen, prise de parole en public, compétition sportive, 
                    accouchement, intervention médicale.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">L'accompagnement d'un traitement médical :</strong> pour mieux gérer la douleur et favoriser 
                    l'amélioration de votre état.
                  </span>
                </li>
              </ul>
              <Link to="/pricing" className="btn-secondary">
                Voir nos formules
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Massage Section */}
      <section id="massage" ref={massageRef} className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 text-accent-700 rounded-lg mb-6">
                <Activity size={32} />
              </div>
              <h2 className="mb-6">Massage Bien-Être</h2>
              <p className="text-gray-600 mb-4">
                Le Massage des 5 Continents (M5C) est une technique de massage holistique qui combine 
                différentes traditions et approches de massage venues des cinq continents. Il vise à harmoniser
                le corps, l'esprit et l'énergie, tout en apportant une profonde relaxation et un rééquilibrage 
                global.
              </p>
              <h3 className="text-xl font-medium mb-4">Les bienfaits du Massage des 5 Continents</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Physiques :</strong> relâchement des tensions musculaires, stimulation de la circulation, 
                    amélioration de l'élimination des toxines.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Émotionnels :</strong> libération des émotions bloquées, réduction du stress, de l'anxiété et des 
                    insomnies.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Énergétiques :</strong> rééquilibrage des chakras et des flux énergétiques, renforcement de 
                    l'énergie vitale.
                  </span>
                </li>
              </ul>
              <Link to="/pricing" className="btn-accent">
                Voir nos formules
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Massage bien-être"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Préparation Mentale Section */}
      <section id="preparation-mentale" ref={preparationMentaleRef} className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Préparation mentale"
                className="rounded-xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-700 rounded-lg mb-6">
                <Brain size={32} />
              </div>
              <h2 className="mb-6">Préparation Mentale</h2>
              <p className="text-gray-600 mb-4">
                La préparation mentale est un ensemble de techniques et d'approches utilisées pour 
                développer les compétences psychologiques et émotionnelles d'un individu, afin d'optimiser 
                ses performances dans des situations spécifiques, souvent exigeantes.
              </p>
              <h3 className="text-xl font-medium mb-4">Dans quels domaines utilise-t-on la préparation mentale ?</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Sport :</strong> endurance psychologique, concentration, gestion du stress, motivation pour exceller
                    pendant les compétitions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Éducation :</strong> gestion du stress des examens, amélioration de la mémoire et de la 
                    concentration.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Entreprise :</strong> optimisation de la gestion du stress, prise de décision, communication dans 
                    des environnements exigeants.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Art et spectacle :</strong> surmonter le trac ou les blocages créatifs.
                  </span>
                </li>
              </ul>
              <Link to="/pricing" className="btn btn-outline border-purple-300 text-purple-700 hover:bg-purple-50">
                Voir nos formules
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6 text-white">Prêt à transformer votre quotidien ?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Nos coachs et praticiens certifiés vous proposent des solutions sur mesure, adaptées à vos 
              besoins personnels et professionnels, pour atteindre vos objectifs de performance et de 
              développement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Prenez rendez-vous avec un expert
              </Link>
              <Link to="/pricing" className="btn border border-white text-white hover:bg-primary-600">
                Voir nos tarifs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;