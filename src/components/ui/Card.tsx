import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, selected = false, onClick, className = '' }) => {
  const isClickable = !!onClick;

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        rounded-2xl p-6 transition-all duration-200
        bg-white dark:bg-gray-800
        border-2
        ${selected 
          ? 'border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/20' 
          : 'border-gray-200 dark:border-gray-700'
        }
        ${isClickable ? 'cursor-pointer hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
