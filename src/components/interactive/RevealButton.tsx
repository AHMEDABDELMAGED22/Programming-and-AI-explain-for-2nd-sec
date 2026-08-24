'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface RevealButtonProps {
  label: string;
  icon?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'warm' | 'violet';
  onReveal?: () => void;
  isRevealed?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  accent: 'bg-accent-600 hover:bg-accent-700 text-white',
  warm: 'bg-warm-500 hover:bg-warm-600 text-white',
  violet: 'bg-violet-600 hover:bg-violet-700 text-white',
};

export default function RevealButton({
  label,
  icon,
  children,
  variant = 'primary',
  onReveal,
  isRevealed: controlledRevealed,
  className = '',
}: RevealButtonProps) {
  const [internalRevealed, setInternalRevealed] = useState(false);
  const isRevealed = controlledRevealed ?? internalRevealed;

  const handleClick = () => {
    if (!isRevealed) {
      setInternalRevealed(true);
      onReveal?.();
    }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.button
            key="button"
            onClick={handleClick}
            className={`touch-target px-8 py-4 rounded-2xl font-semibold text-lg
              shadow-md active:scale-95 transition-transform
              ${variantStyles[variant]} cursor-pointer`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
