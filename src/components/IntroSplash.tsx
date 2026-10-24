import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSplashProps {
  onFinish?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Quick, elegant 2.0-second reveal that automatically transitions into home
    const timer = setTimeout(() => {
      handleComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onFinish?.();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleComplete}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F3EFFE] overflow-hidden select-none cursor-pointer"
        >
          {/* Subtle warm ambient lighting tailored to the soft brown background */}
          <div className="absolute w-[500px] h-[500px] bg-[#F3EFFE] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-[#6D3FD6]/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Centered Typed Brand Presentation - Seamless with background, no white card box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl"
          >
            {/* Modern Industrial Dual Lightning / Cable Emblem */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 relative"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white via-white to-[#F3EFFE] border border-[#E6DEFA] shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-md group">
                {/* Ambient glow inside emblem */}
                <div className="absolute inset-0 bg-radial from-[#6D3FD6]/10 via-transparent to-transparent pointer-events-none" />
                
                {/* Refined Geometric Energy / Industrial Cable Bolt SVG */}
                <svg className="w-9 h-9 sm:w-11 sm:h-11 relative z-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M26 4L8 26H22L18 44L40 20H26L32 4H26Z"
                    fill="url(#siddhiBoltGrad)"
                    stroke="#4F2AB0"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="siddhiBoltGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6D3FD6" />
                      <stop offset="0.5" stopColor="#A98BF5" />
                      <stop offset="1" stopColor="#F5B83D" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Subtle sheen sweep across emblem */}
                <motion.div
                  initial={{ x: '-150%' }}
                  animate={{ x: '180%' }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FCFBFF]/30 to-transparent skew-x-12 pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Typed Brand Title - Beautifully styled to suit the Soft Brown background */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight font-editorial text-[#1E1B2E]">
                Siddhi <span className="text-[#6D3FD6] font-medium">Kabel</span>
              </h1>

              {/* Refined Warm Beige / Mocha Hairline Gradient Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="w-32 sm:w-44 h-[1px] bg-gradient-to-r from-transparent via-[#E6DEFA]/60 to-transparent mx-auto"
              />

              <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#55516B] font-medium">
                Corporation Private Limited
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
