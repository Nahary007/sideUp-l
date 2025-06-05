import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  maxWidth?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  centered = true,
  maxWidth = 'max-w-3xl',
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center mx-auto' : ''} ${maxWidth}`}
    >
      <h2 className="mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;