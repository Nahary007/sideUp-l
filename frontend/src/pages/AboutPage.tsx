import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import TeamMember from '../components/ui/TeamMember';

const AboutPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'À propos | Side-Up';
  }, []);

  const teamMembers = [
    {
      name: 'Nom Prénom',
      role: 'Fondateur & Coach',
      image: 'https://images.pexels.com/photos/5792639/pexels-photo-5792639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Expert en coaching et développement personnel avec plus de 10 ans d\'expérience. Spécialisé dans l\'accompagnement des professionnels et entrepreneurs.',
    },
    {
      name: 'Nom Prénom',
      role: 'Sophrologue',
      image: 'https://images.pexels.com/photos/8434878/pexels-photo-8434878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Sophrologue certifiée avec une approche personnalisée pour accompagner chacun vers un mieux-être durable et une gestion efficace du stress.',
    },
  ];

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
            <h1 className="mb-6">À propos de Side-Up</h1>
            <p className="text-xl text-gray-600">
              Découvrez notre histoire, notre mission et les valeurs qui guident notre approche du bien-être holistique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6">Notre histoire</h2>
              <p className="text-gray-600 mb-4">
                Side-up est né d'une vision claire et ambitieuse : accompagner chaque personne dans sa quête de
                croissance, d'équilibre et de réalisation personnelle ou professionnelle. Fondé avec la
                conviction que le bien-être et la performance naissent de l'harmonie entre le corps, l'esprit et les
                émotions, Side-up s'est rapidement imposé comme un acteur innovant dans le domaine du
                coaching et de la préparation mentale.
              </p>
              <p className="text-gray-600 mb-4">
                Depuis ses débuts, Side-up a évolué grâce à la coopération et l'expertise de divers
                professionnels certifiés, issus de domaines complémentaires tels que le coaching, la
                sophrologie, la préparation mentale et le massage bien-être. Cette collaboration
                pluridisciplinaire a permis de bâtir une approche unique et complète, capable de répondre aux
                besoins spécifiques de chaque individu ou organisation.
              </p>
              <p className="text-gray-600">
                Aujourd'hui, Side-up continue de grandir avec la même énergie et la même passion, guidé par
                une conviction forte : chaque défi est une opportunité de transformation. Nous restons 
                déterminés à offrir des solutions innovantes et personnalisées, en nous appuyant sur les 
                valeurs fondatrices d'écoute, de bienveillance et d'excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="L'histoire de Side-Up"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Notre mission et nos valeurs"
            subtitle="Une vision globale pour un bien-être durable"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-medium mb-4">Notre mission</h3>
              <p className="text-gray-600 mb-4">
                Notre mission est de vous accompagner vers un équilibre harmonieux entre le corps et 
                l'esprit, en combinant coaching personnalisé, préparation mentale, sophrologie et 
                massage bien-être.
              </p>
              <p className="text-gray-600">
                Qu'il s'agisse de développement personnel, d'amélioration de votre bien-être, de gestion de 
                carrière, ou de préparation d'événements, notre accompagnement offre des leviers puissants 
                pour votre évolution. Nous vous aidons à vous recentrer sur votre situation actuelle et sur les 
                actions que vous êtes prêt(e) à entreprendre pour construire votre futur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-medium mb-4">Nos valeurs</h3>
              <p className="text-gray-600 mb-4">
                Les membres de notre équipe sont guidés par des valeurs fortes et partagées, qui façonnent 
                notre approche et nourrissent notre mission commune :
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Empathie :</strong> Chaque personne est unique, et nous avons à cœur de comprendre 
                    profondément les besoins, les aspirations et les défis de ceux que nous accompagnons.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Bienveillance :</strong> Nous croyons en une approche humaine et positive. Nos interventions
                    sont toujours empreintes de respect, de soutien et d'un véritable engagement.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    <strong className="font-medium">Confidentialité :</strong> Nous considérons la confidentialité comme une priorité absolue. 
                    Nos échanges sont protégés par un cadre éthique rigoureux.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <SectionHeader
            title="Notre équipe"
            subtitle="Rencontrez les experts qui vous accompagneront dans votre transformation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                delay={index}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card bg-primary-50 border border-primary-100 flex flex-col items-center justify-center text-center p-8"
            >
              <h3 className="text-xl font-medium mb-3">Rejoignez notre équipe</h3>
              <p className="text-gray-600 mb-6">
                Vous êtes coach, sophrologue ou praticien en massage bien-être ? Vous partagez nos valeurs et notre vision ? Rejoignez notre équipe !
              </p>
              <Link to="/contact" className="btn-primary">
                Postuler
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">Une vision globale pour un bien-être durable</h2>
            <p className="text-xl text-gray-600 mb-8">
              Chez Side-up, nous croyons que la vie est le plus grand terrain d'entraînement. Chaque défi, 
              qu'il soit personnel ou professionnel, est une opportunité de croissance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Prenez rendez-vous avec un expert
              </Link>
              <Link to="/services" className="btn-outline">
                Découvrez nos services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;