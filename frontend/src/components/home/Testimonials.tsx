import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const testimonials = [
  {
    quote:
      "Le coaching avec Side-Up a complètement transformé ma vision de moi-même et de mes capacités. J'ai enfin pu dépasser mes blocages et avancer dans mes projets.",
    author: 'Sophie L.',
    role: 'Entrepreneure',
  },
  {
    quote:
      "Les séances de sophrologie m'ont permis de gérer mon stress au travail de façon incroyable. Je ressens plus de sérénité au quotidien et dors beaucoup mieux.",
    author: 'Thomas M.',
    role: 'Cadre en entreprise',
  },
  {
    quote:
      "L'approche pluridisciplinaire de Side-Up est exactement ce dont j'avais besoin. Le massage des 5 continents combiné au coaching m'a aidé à retrouver mon équilibre.",
    author: 'Claire D.',
    role: 'Sportive',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <SectionHeader
          title="Ce que disent nos clients"
          subtitle="Découvrez les témoignages de personnes qui ont transformé leur vie grâce à notre accompagnement."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <svg
                className="w-10 h-10 text-primary-200 mb-4"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-medium">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;