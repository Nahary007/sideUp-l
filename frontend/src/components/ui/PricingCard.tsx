import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popularLabel?: string;
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
  delay?: number;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  popularLabel = 'Populaire',
  isPopular = false,
  ctaText = 'Réserver',
  ctaLink = '/contact',
  delay = 0,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`card ${
        isPopular ? 'border-2 border-primary-500 relative' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          {popularLabel}
        </div>
      )}
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check
                className="text-primary-600 mr-2 mt-1 flex-shrink-0"
                size={16}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to={ctaLink}
          className={`w-full btn ${
            isPopular ? 'btn-primary' : 'btn-outline'
          } text-center`}
        >
          {ctaText}
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingCard;