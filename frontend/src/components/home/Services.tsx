import { Link } from 'react-router-dom';
import { Brain, HeartHandshake, Sparkles, Activity } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';
import SectionHeader from '../ui/SectionHeader';

const Services = () => {
  const services = [
    {
      title: 'Coaching',
      description:
        'Un accompagnement personnalisé pour vous aider à atteindre vos objectifs personnels et professionnels.',
      icon: <HeartHandshake className="text-primary-600" size={28} />,
      link: '/services#coaching',
      color: 'bg-primary-50',
      delay: 0,
    },
    {
      title: 'Sophrologie',
      description:
        'Des techniques de relaxation et de respiration pour harmoniser corps et esprit, réduire le stress et améliorer votre bien-être.',
      icon: <Sparkles className="text-secondary-600\" size={28} />,
      link: '/services#sophrologie',
      color: 'bg-secondary-50',
      delay: 1,
    },
    {
      title: 'Massage Bien-Être',
      description:
        'Le Massage des 5 Continents pour une détente profonde, la libération des tensions et un rééquilibrage énergétique.',
      icon: <Activity className="text-accent-500" size={28} />,
      link: '/services#massage',
      color: 'bg-accent-50',
      delay: 2,
    },
    {
      title: 'Préparation Mentale',
      description:
        'Des techniques pour développer vos compétences psychologiques et émotionnelles afin d\'optimiser vos performances.',
      icon: <Brain className="text-purple-600\" size={28} />,
      link: '/services#preparation-mentale',
      color: 'bg-purple-50',
      delay: 3,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <SectionHeader
          title="Nos Prestations"
          subtitle="Découvrez notre approche unique combinant différentes disciplines pour un accompagnement complet et personnalisé."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              color={service.color}
              delay={service.delay}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary">
            Voir toutes nos prestations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;