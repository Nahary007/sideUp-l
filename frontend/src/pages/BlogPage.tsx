import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';

const BlogPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Blog | Side-Up';
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'Les 5 techniques de sophrologie pour gérer son stress au quotidien',
      excerpt:
        'Découvrez des exercices simples de sophrologie que vous pouvez pratiquer en quelques minutes pour retrouver calme et sérénité.',
      image:
        'https://images.pexels.com/photos/3759660/pexels-photo-3759660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Sophrologie',
      date: '15 juin 2023',
      delay: 0,
    },
    {
      id: 2,
      title: 'Comment le coaching peut transformer votre vie professionnelle',
      excerpt:
        'Le coaching professionnel peut être un puissant levier de changement. Voici comment il peut vous aider à atteindre vos objectifs de carrière.',
      image:
        'https://images.pexels.com/photos/7176030/pexels-photo-7176030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Coaching',
      date: '28 mai 2023',
      delay: 1,
    },
    {
      id: 3,
      title: 'Les bienfaits du massage : bien plus qu\'une simple détente',
      excerpt:
        'Le massage n\'est pas seulement agréable, il apporte de nombreux bienfaits physiologiques et psychologiques. Découvrez-les dans cet article.',
      image:
        'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Massage',
      date: '12 avril 2023',
      delay: 2,
    },
    {
      id: 4,
      title: 'Préparation mentale : comment les athlètes optimisent leurs performances',
      excerpt:
        'Les techniques de préparation mentale utilisées par les sportifs de haut niveau peuvent vous aider à améliorer vos propres performances.',
      image:
        'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Préparation Mentale',
      date: '3 mars 2023',
      delay: 3,
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
            <h1 className="mb-6">Blog & Ressources</h1>
            <p className="text-xl text-gray-600">
              Explorez nos articles, guides et ressources pour approfondir vos connaissances sur le bien-être, le développement personnel et professionnel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: post.delay * 0.1 }}
                className="card overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-primary-600">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    Lire la suite
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-8">
              Cette page est en construction. De nouveaux articles seront ajoutés prochainement.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Ressources Gratuites"
            subtitle="Téléchargez nos guides et fiches pratiques pour approfondir vos connaissances"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="bg-primary-50 rounded-lg p-4 mb-4 text-center">
                <svg
                  className="w-12 h-12 text-primary-600 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">
                Guide de méditation pour débutants
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Apprenez les bases de la méditation avec notre guide simple en 5 étapes.
              </p>
              <div className="text-center">
                <a
                  href="#"
                  className="btn-outline inline-block text-sm"
                >
                  Télécharger le PDF
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="bg-secondary-50 rounded-lg p-4 mb-4 text-center">
                <svg
                  className="w-12 h-12 text-secondary-600 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">
                10 exercices de sophrologie
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Des exercices simples à pratiquer quotidiennement pour réduire le stress.
              </p>
              <div className="text-center">
                <a
                  href="#"
                  className="btn-outline inline-block text-sm"
                >
                  Télécharger le PDF
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="bg-accent-50 rounded-lg p-4 mb-4 text-center">
                <svg
                  className="w-12 h-12 text-accent-600 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">
                Vidéos de relaxation guidée
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Une série de vidéos pour vous accompagner dans votre pratique de relaxation.
              </p>
              <div className="text-center">
                <a
                  href="#"
                  className="btn-outline inline-block text-sm"
                >
                  Accéder aux vidéos
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-primary-50 p-8 rounded-xl shadow-sm text-center"
          >
            <h2 className="text-2xl font-medium mb-4">Restez informé</h2>
            <p className="text-gray-600 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers articles, conseils et ressources.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                S'inscrire
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pouvez vous désinscrire à tout moment.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;