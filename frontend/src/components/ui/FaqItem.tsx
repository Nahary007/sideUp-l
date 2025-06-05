import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

const FaqItem = ({ question, answer, isOpen = false }: FaqItemProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-5 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-medium pr-8">{question}</h3>
        {isExpanded ? (
          <ChevronUp className="flex-shrink-0 text-gray-500" size={20} />
        ) : (
          <ChevronDown className="flex-shrink-0 text-gray-500" size={20} />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;