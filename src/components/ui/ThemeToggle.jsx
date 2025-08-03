import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-14 h-7 rounded-full p-1 cursor-pointer
        bg-gradient-to-r from-primary to-secondary
        dark:from-accent/20 dark:to-primary/40
        border border-border dark:border-accent/30
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-accent/50
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        backgroundColor: isDark ? '#1B365D' : '#00D4FF',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Toggle Circle */}
      <motion.div
        className="
          w-5 h-5 rounded-full bg-white shadow-md
          flex items-center justify-center
          dark:bg-gray-800
        "
        animate={{
          x: isDark ? 0 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon with 3D rotation effect */}
        <motion.div
          animate={{ 
            rotateY: isDark ? 0 : 180,
            scale: isDark ? 1 : 0.9
          }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 200
          }}
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {isDark ? (
            <Icon 
              name="Moon" 
              size={14} 
              className="text-accent transition-colors duration-300" 
            />
          ) : (
            <Icon 
              name="Sun" 
              size={14} 
              className="text-primary transition-colors duration-300" 
            />
          )}
        </motion.div>
      </motion.div>
      {/* Background glow effect */}
      <div className="
        absolute inset-0 rounded-full opacity-20
        bg-gradient-to-r from-accent/30 to-primary/30
        dark:from-accent/10 dark:to-primary/20
        blur-sm scale-110
      " />
    </motion.button>
  );
};

export default ThemeToggle;