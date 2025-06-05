import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const About = () => {
  const benefits = [
    {
      title: 'Un Suivi Personnalisé',
      description:
        'Nous adaptons chaque séance à vos besoins et votre disponibilité pour un impact maximal.',
    },
    {
      title: 'Un Soutien Complet',
      description:
        'Grâce à la sophrologie et aux massages bien-être, vous gagnez en sérénité et renforcez votre capacité à gérer le quotidien.',
    },
    {
      title: 'Un Accompagnement Vers une Nouvelle Vision de Soi',
      description:
        `Nos experts vous guident pour retrouver équilibre, confiance et épanouissement, tant au travail qu'en privé.`,
    },
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              src="https://images.pexels.com/photos/3985332/pexels-photo-3985332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Side-up coaching et bien-être"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>

          <div>
            <SectionHeader
              title="Un Accompagnement Concret pour des Résultats Concrets"
              centered={false}
              maxWidth=""
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 mb-8"
            >
              Que vous cherchiez à réduire le stress, à améliorer votre bien-être mental
              ou à développer votre potentiel personnel, notre équipe dédiée est là pour
              vous guider à chaque étape. Découvrez une expérience unique où le corps
              et l'esprit s'unissent pour transformer votre quotidien.
            </motion.p>

            <h3 className="text-xl font-medium mb-6">
              Les Bénéfices de Notre Accompagnement :
            </h3>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex"
                >
                  <CheckCircle
                    className="text-primary-600 mr-3 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <h4 className="font-medium mb-1">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link to="/about" className="btn-primary">
                En savoir plus sur nous
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;