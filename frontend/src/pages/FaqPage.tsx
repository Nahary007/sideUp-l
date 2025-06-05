import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import FaqItem from '../components/ui/FaqItem';

const FaqPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'FAQ | Side-Up';
  }, []);

  const generalFaqs = [
    {
      question: 'Pourquoi choisir Side-up ?',
      answer: `Notre accompagnement repose sur une approche unique pour des résultats concrets :
        • Un accompagnement sur mesure : Adapté à vos objectifs personnels ou professionnels.
        • Des pratiques complémentaires : Coaching, sophrologie et massage bien-être pour un équilibre complet.
        • Un impact durable : Des solutions concrètes pour améliorer votre quotidien sur le long terme.`,
    },
    {
      question: 'Comment se déroulent les séances ?',
      answer: 'Chaque séance est adaptée à vos besoins spécifiques. Généralement, une première séance permet de faire le point sur votre situation et de définir des objectifs. Les séances suivantes sont structurées autour de ces objectifs, avec des exercices pratiques et des temps d\'échange. Nous pouvons réaliser les séances dans nos locaux, à votre domicile, sur votre lieu de travail ou en visio-conférence (sauf pour le massage bien-être).',
    },
    {
      question: 'Quelle est la durée d\'un accompagnement ?',
      answer: 'La durée varie selon vos besoins et objectifs. Certaines personnes trouvent des bénéfices après seulement quelques séances, tandis que d\'autres préfèrent un accompagnement plus long. Nous proposons différentes formules, de la séance unique aux forfaits de 5 ou 10 séances, pour s\'adapter à votre situation.',
    },
  ];

  const coachingFaqs = [
    {
      question: 'Quels sont les avantages du coaching ?',
      answer: `Le coaching offre de nombreux bénéfices :
        1. Clarté des objectifs : Le coaching aide à définir des objectifs personnels ou professionnels clairs.
        2. Motivation accrue : Un coach soutient et encourage, boostant la motivation et aidant à surmonter les obstacles.
        3. Développement des compétences : Il permet d'acquérir de nouvelles compétences et d'améliorer celles existantes.
        4. Prise de décision : Le coaching aide à clarifier les choix et à prendre des décisions éclairées.
        5. Confiance en soi : À travers des exercices pratiques et des retours constructifs, le coaching renforce la confiance en soi.`,
    },
    {
      question: 'Quelle est la différence entre un coach et un thérapeute ?',
      answer: 'Un coach se concentre sur le présent et l\'avenir, aidant à définir et atteindre des objectifs concrets. Il accompagne le développement de compétences et de stratégies pour surmonter les obstacles. Un thérapeute, quant à lui, travaille souvent sur les problèmes du passé et les traumatismes, avec une approche plus orientée vers la guérison émotionnelle et psychologique. Le coaching est plus axé sur l\'action et les résultats, tandis que la thérapie explore davantage les causes profondes des comportements.',
    },
    {
      question: 'Combien de séances de coaching sont nécessaires ?',
      answer: 'Le nombre de séances varie selon vos objectifs et votre situation. Pour des objectifs simples et spécifiques, 5 à 8 séances peuvent suffire. Pour des changements plus profonds ou des objectifs complexes, un programme de 10 à 12 séances est souvent recommandé. Après une première séance, nous pourrons évaluer ensemble le nombre de séances qui vous conviendrait le mieux.',
    },
  ];

  const sophrologieFaqs = [
    {
      question: 'Quels sont les bienfaits de la Sophrologie ?',
      answer: `La sophrologie offre de nombreux bienfaits :
        1. Relaxation profonde : Elle permet d'atteindre un état de relaxation profonde, réduisant le stress et l'anxiété.
        2. Amélioration du sommeil : Les techniques de sophrologie favorisent un meilleur sommeil.
        3. Gestion des émotions : Elle apprend à identifier et à gérer ses émotions, développant une meilleure résilience.
        4. Concentration et focus : Les exercices améliorent la concentration et la clarté mentale.
        5. Renforcement de la confiance en soi : La pratique régulière renforce l'estime de soi.
        6. Préparation mentale : Elle aide à se préparer mentalement à des événements stressants.`,
    },
    {
      question: 'La sophrologie convient-elle à tout le monde ?',
      answer: 'La sophrologie est adaptable et convient à la plupart des personnes, quels que soient leur âge ou leur condition physique. Les exercices peuvent être ajustés selon les besoins et les capacités de chacun. Elle est particulièrement bénéfique pour les personnes souffrant de stress, d\'anxiété, de troubles du sommeil ou cherchant à améliorer leur bien-être général. Cependant, elle ne remplace pas un traitement médical et doit être vue comme une approche complémentaire.',
    },
    {
      question: 'Comment pratiquer la sophrologie au quotidien ?',
      answer: 'Après avoir appris les techniques de base avec un sophrologue, vous pouvez intégrer des exercices simples dans votre routine quotidienne. Par exemple, pratiquer des exercices de respiration consciente pendant 5-10 minutes le matin ou le soir, faire une pause relaxation au milieu de la journée, ou utiliser des techniques de visualisation positive avant une situation stressante. Votre sophrologue vous guidera vers les pratiques les plus adaptées à vos besoins et vous aidera à les intégrer progressivement.',
    },
  ];

  const massageFaqs = [
    {
      question: 'Quels sont les bienfaits du Massage Bien-Être',
      answer: `Le massage bien-être offre de nombreux bienfaits :
        1. Détente musculaire : Il réduit les tensions musculaires et favorise une relaxation profonde.
        2. Amélioration de la circulation : Il stimule la circulation sanguine et l'élimination des toxines.
        3. Réduction du stress : Les massages favorisent la libération d'endorphines, réduisant stress et anxiété.
        4. Amélioration du sommeil : En induisant un état de relaxation, il contribue à un meilleur sommeil.
        5. Sensation de bien-être : Le contact physique procure une sensation de bien-être et de sérénité.
        6. Équilibre émotionnel : Le massage aide à reconnecter le corps et l'esprit.`,
    },
    {
      question: 'En quoi le Massage des 5 Continents est-il différent des autres massages ?',
      answer: 'Le Massage des 5 Continents (M5C) se distingue par son approche holistique qui combine différentes traditions de massage du monde entier. Il intègre à la fois des techniques manuelles (comme le massage californien, suédois, lomi-lomi) et des aspects énergétiques. Il utilise également des huiles essentielles spécifiques pour les phases de désintoxication et de revitalisation. Le M5C vise non seulement la détente physique, mais aussi le rééquilibrage énergétique et la libération des blocages émotionnels, offrant ainsi une expérience plus complète que les massages traditionnels.',
    },
    {
      question: 'À quelle fréquence peut-on recevoir un massage bien-être ?',
      answer: 'La fréquence idéale dépend de vos besoins et de votre style de vie. Pour un entretien régulier du bien-être, une séance mensuelle est souvent recommandée. En période de stress intense ou pour traiter des tensions spécifiques, une fréquence plus rapprochée (toutes les 2-3 semaines) peut être bénéfique. Pour une détente ponctuelle, vous pouvez simplement réserver une séance quand vous en ressentez le besoin. Votre praticien pourra vous conseiller sur la fréquence la plus adaptée à votre situation personnelle.',
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
            <h1 className="mb-6">Foire Aux Questions</h1>
            <p className="text-xl text-gray-600">
              Retrouvez les réponses aux questions les plus fréquemment posées sur nos services et notre approche.
            </p>
          </motion.div>
        </div>
      </section>

      {/* General FAQ */}
      <section className="py-16">
        <div className="container">
          <SectionHeader
            title="Questions générales"
            subtitle="Tout ce que vous devez savoir sur Side-Up et notre approche"
          />

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              {generalFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coaching FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Coaching"
            subtitle="Questions fréquentes sur notre approche de coaching"
          />

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              {coachingFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sophrologie FAQ */}
      <section className="py-16">
        <div className="container">
          <SectionHeader
            title="Sophrologie"
            subtitle="Tout ce que vous souhaitez savoir sur la sophrologie"
          />

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              {sophrologieFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massage FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Massage Bien-Être"
            subtitle="Questions sur notre approche de massage bien-être"
          />

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              {massageFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
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
            <h2 className="mb-6 text-white">Vous avez d'autres questions ?</h2>
            <p className="text-xl text-primary-100 mb-8">
              N'hésitez pas à nous contacter pour toute question supplémentaire ou pour prendre rendez-vous avec l'un de nos experts.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50">
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;