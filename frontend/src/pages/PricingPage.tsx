import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import PricingCard from '../components/ui/PricingCard';

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('coaching');

  // Update page title
  useEffect(() => {
    document.title = 'Tarifs & Formules | Side-Up';
  }, []);

  const coachingPackages = [
    {
      title: 'Coaching Découverte',
      price: '50 €',
      description: 'Une séance d\'1h pour faire le point sur votre situation et identifier vos objectifs.',
      features: [
        'Entretien de découverte (30 min offertes)',
        'Identification des objectifs à court terme',
        'Recommandations personnalisées'
      ],
      isPopular: false,
      delay: 0
    },
    {
      title: 'Coaching Intensif',
      price: '500 €',
      description: '5 séances d\'1h pour travailler sur des problématiques spécifiques.',
      features: [
        '5 séances personnalisées',
        '1 séance par semaine',
        'Outils et stratégies spécifiques',
        'Suivi entre les séances'
      ],
      isPopular: true,
      delay: 1
    },
    {
      title: 'Coaching Premium',
      price: '900 €',
      description: '10 séances d\'1h pour un accompagnement complet sur le moyen/long terme.',
      features: [
        '10 séances personnalisées',
        '1 séance toutes les deux semaines',
        'Plan d\'action détaillé',
        'Accès à des ressources supplémentaires',
        'Suivi personnalisé entre les séances'
      ],
      isPopular: false,
      delay: 2
    }
  ];

  const sophrologiePackages = [
    {
      title: 'Séance Découverte',
      price: '60 €',
      description: 'Une séance d\'1h pour vous initier à la sophrologie et ses bienfaits.',
      features: [
        'Présentation de la sophrologie',
        'Séance de relaxation dynamique',
        'Moment d\'échange pour clarifier vos attentes'
      ],
      isPopular: false,
      delay: 0
    },
    {
      title: 'Programme de Relaxation',
      price: '360 €',
      description: '6 séances d\'1h pour apprendre à gérer le stress et améliorer votre concentration.',
      features: [
        '6 séances de relaxation dynamique',
        'Exercices respiratoires et visualisation',
        'Suivi personnalisé',
        'Recommandations pratiques quotidiennes'
      ],
      isPopular: true,
      delay: 1
    },
    {
      title: 'Coaching Sophrologique Intensif',
      price: '550 €',
      description: '10 séances d\'1h pour un accompagnement profond sur des problématiques spécifiques.',
      features: [
        '10 séances adaptées à vos objectifs',
        'Techniques avancées de sophrologie',
        'Gestion émotionnelle renforcée',
        'Suivi personnalisé entre les séances'
      ],
      isPopular: false,
      delay: 2
    }
  ];

  const massagePackages = [
    {
      title: 'Massage des 5 Continents',
      price: '95 €',
      description: 'Une séance de 1h15 pour harmoniser le corps, l\'esprit et l\'énergie.',
      features: [
        'Libération des tensions physiques',
        'Rééquilibrage énergétique',
        'Détente profonde',
        'Huiles essentielles spécifiques'
      ],
      isPopular: true,
      delay: 0
    }
  ];

  const combinedPackages = [
    {
      title: 'Équilibre & Performance',
      price: '750 €',
      description: '5 séances de 1h30 alliant sophrologie et coaching pour un accompagnement holistique.',
      features: [
        'Sophrologie pour la gestion du stress',
        'Coaching pour atteindre vos objectifs',
        'Plan d\'action personnalisé',
        'Suivi entre les séances',
        'Techniques de relaxation et visualisation'
      ],
      isPopular: true,
      delay: 0
    },
    {
      title: 'Coaching + Sophrologie Intensif',
      price: '1500 €',
      description: '10 séances de 1h30 pour un accompagnement complet sur le long terme.',
      features: [
        'Sophrologie régulière pour le bien-être',
        'Coaching intensif sur des projets spécifiques',
        'Gestion des émotions complexes',
        'Outils pratiques et exercices adaptés',
        'Suivi personnalisé approfondi'
      ],
      isPopular: false,
      delay: 1
    }
  ];

  const renderPackages = () => {
    switch (activeTab) {
      case 'coaching':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coachingPackages.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
                delay={pkg.delay}
              />
            ))}
          </div>
        );
      case 'sophrologie':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sophrologiePackages.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
                delay={pkg.delay}
              />
            ))}
          </div>
        );
      case 'massage':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {massagePackages.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
                delay={pkg.delay}
              />
            ))}
          </div>
        );
      case 'formules':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {combinedPackages.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
                delay={pkg.delay}
              />
            ))}
          </div>
        );
      default:
        return null;
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
            <h1 className="mb-6">Tarifs & Formules</h1>
            <p className="text-xl text-gray-600">
              Découvrez nos différentes formules d'accompagnement et choisissez celle qui correspond le mieux à vos besoins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'coaching'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('coaching')}
            >
              Coaching
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'sophrologie'
                  ? 'bg-secondary-100 text-secondary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('sophrologie')}
            >
              Sophrologie
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'massage'
                  ? 'bg-accent-100 text-accent-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('massage')}
            >
              Massage Bien-Être
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'formules'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('formules')}
            >
              Formules Combinées
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container">
          <SectionHeader
            title={
              activeTab === 'coaching'
                ? 'Nos formules de coaching'
                : activeTab === 'sophrologie'
                ? 'Nos formules de sophrologie'
                : activeTab === 'massage'
                ? 'Massage Bien-Être'
                : 'Nos formules combinées'
            }
            subtitle={
              activeTab === 'coaching'
                ? 'Un accompagnement personnalisé pour atteindre vos objectifs'
                : activeTab === 'sophrologie'
                ? 'Harmonisez votre corps et votre esprit pour un bien-être durable'
                : activeTab === 'massage'
                ? 'Le Massage des 5 Continents pour une détente profonde'
                : 'Une approche globale pour un équilibre optimal'
            }
          />

          {renderPackages()}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Les prestations peuvent être réalisées dans nos locaux, à domicile, sur vos lieux de travail ou en visio-conférence (hormis le massage bien-être).
            </p>
            <p className="text-gray-600 mb-8">
              Paiement possible en espèces ou par virement bancaire. Possibilité de paiement en plusieurs fois sur demande.
            </p>
            <Link to="/contact" className="btn-primary">
              Réserver maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Solutions pour entreprises"
            subtitle="À vos côtés pour construire un programme de coaching professionnel sur-mesure"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto"
          >
            <p className="text-gray-600 mb-6">
              Prenez un moment avec nos consultants pour partager vos besoins et questionnements et 
              nous construirons une offre personnalisée.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong className="font-medium">Coaching professionnel :</strong> Améliorez vos compétences, développez votre leadership
                  et gérez vos défis de carrière.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong className="font-medium">Sophrologie en entreprise :</strong> Apprenez à mieux gérer le stress au travail, à renforcer 
                  la concentration et à améliorer le bien-être général de vos collaborateurs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong className="font-medium">Conseil en image en entreprise :</strong> Optimisez votre image et gagnez en assurance,
                  donnez une image cohérente de votre équipe.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>
                  <strong className="font-medium">Coaching sportif :</strong> Optimisez vos performances sportives, gérez la pression et 
                  renforcez votre motivation.
                </span>
              </li>
            </ul>
            <div className="text-center">
              <Link to="/contact" className="btn-primary">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ateliers & Formations */}
      <section className="py-16">
        <div className="container">
          <SectionHeader
            title="Ateliers & Formations"
            subtitle="Découvrez nos ateliers et formations dédiés au bien-être, conçus pour répondre à vos besoins spécifiques."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-medium mb-3">Gestion du stress et équilibre émotionnel</h3>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Identifier les sources de stress et apprendre à les gérer</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Développer des outils pratiques pour retrouver le calme</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Apprendre à mieux gérer ses émotions</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-medium mb-3">Confiance en soi et estime de soi</h3>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Travailler sur l'image de soi et les croyances limitantes</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Renforcer la confiance en soi grâce à la visualisation positive</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Préparer mentalement des situations stressantes</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-6">
              Les ateliers se font avec un minimum de 3 personnes. Conçus pour faciliter le cheminement personnel, 
              ils s'appuient sur des exercices pratiques et les échanges entre les participants sur diverses thématiques.
            </p>
            <Link to="/contact" className="btn-primary">
              Demander plus d'informations
            </Link>
          </div>
        </div>
      </section>

      {/* Location de bureau */}
      <section className="py-16 bg-primary-50">
        <div className="container">
          <SectionHeader
            title="Location de bureau à la carte"
            subtitle="Vous recherchez un espace pour exercer votre activité et êtes intéressé par la location de bureaux à Reims ?"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto"
          >
            <p className="text-gray-600 mb-6">
              La location de bureaux chez Side-up s'adresse à tous les professionnels du bien-être: consultants, 
              formateurs, thérapeutes, praticiens massage bien-être, sophrologues, etc. L'objectif est de créer un espace de travail 
              collaboratif et polyvalent.
            </p>
            <h3 className="text-xl font-medium mb-4">Nos formules de location</h3>
            <p className="text-gray-600 mb-4">
              Si vous préférez une solution sans engagement, optez pour la location d'un espace de 12 m² à la carte :
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>15 euros l'heure</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>50 euros la demi-journée</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>100 euros la journée</span>
              </li>
            </ul>
            <div className="text-center">
              <Link to="/contact" className="btn-primary">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;