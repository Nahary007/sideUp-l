import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: string;
  delay?: number;
}

const ServiceCard = ({
  title,
  description,
  icon,
  link,
  color = 'bg-primary-50',
  delay = 0,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="card group hover:-translate-y-2"
    >
      <div className="p-6">
        <div className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center text-primary-600 font-medium group-hover:text-primary-700"
        >
          En savoir plus
          <svg
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
    </motion.div>
  );
};

export default ServiceCard;