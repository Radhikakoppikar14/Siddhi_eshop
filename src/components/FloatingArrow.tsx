import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingArrow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group"
        >
          {/* Live pulsing ambient ring */}
          <div className="absolute inset-0 rounded-full bg-[#D2430F] opacity-40 blur-md pointer-events-none" />

          {/* Floating object button with continuous bobbing animation */}
          <motion.button
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 8px 24px -2px rgba(95, 82, 76, 0.5), 0 0 16px rgba(210, 67, 15, 0.4)',
            }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#D2430F] hover:bg-[#A8340A] text-[#FFFAF6] flex items-center justify-center shadow-lg border border-[#F1D9CA]/40 backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-[#5F524C] cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#231815] transition-transform duration-200 group-hover:-translate-y-0.5" />

            {/* Micro Tooltip */}
            <span className="absolute -top-9 right-1/2 translate-x-1/2 px-2.5 py-1 text-[10px] font-medium text-[#231815] bg-[#FFF1E8] border border-[#F1D9CA] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
              Back to top
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
