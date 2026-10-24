import React, { useState } from 'react';
import { CLIENTS_LIST } from '../data/siddhiData';
import { motion } from 'framer-motion';
import { Building2, Pause, Play, LayoutGrid } from 'lucide-react';

export const ClientsWall: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');

  // Split into two balanced rows for dual-direction infinite continuous marquee
  const half = Math.ceil(CLIENTS_LIST.length / 2);
  const row1 = CLIENTS_LIST.slice(0, half);
  const row2 = CLIENTS_LIST.slice(half);

  // Triple arrays to ensure seamless continuous looping
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-20 lg:py-28 bg-[#FFF6E0] border-b border-[#E6DEFA] relative overflow-hidden select-none">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F3EFFE] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 mb-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#55516B] px-3.5 py-1 rounded-full bg-[#F3EFFE] border border-[#E6DEFA] mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#6D3FD6]" />
            <span>Enterprise Client Roster</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#1E1B2E] font-editorial tracking-tight">
            We trusted by
          </h2>
          <div className="w-16 h-0.5 bg-[#6D3FD6] mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-[#55516B]/80 font-light max-w-xl mx-auto">
            We are committed to provide safe industrial solutions to India's foremost engineering, automotive, defense, and manufacturing leaders.
          </p>

        </div>
      </div>

      {/* CONTINUOUS MOVING MARQUEE MODE */}
      {viewMode === 'marquee' ? (
        <div className="relative w-full overflow-hidden space-y-5">
          {/* Left and Right Fade Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FCFBFF] via-[#FCFBFF]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FCFBFF] via-[#FCFBFF]/80 to-transparent z-20" />

          {/* ROW 1: Moving Smoothly to the Left */}
          <motion.div
            animate={
              isPaused
                ? { x: undefined }
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-5 w-max"
          >
            {marqueeRow1.map((client, idx) => (
              <div
                key={`row1-${client.name}-${idx}`}
                className="group relative bg-white rounded-2xl border border-[#E6DEFA] hover:border-[#55516B] hover:bg-white hover:shadow-xl p-5 w-52 sm:w-60 h-28 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shrink-0 cursor-pointer"
              >
                <div className="h-10 w-full flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-9 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-75 group-hover:opacity-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="block text-xs font-semibold text-[#1E1B2E] truncate max-w-[180px]">
                    {client.name}
                  </span>
                  <span className="block text-[10px] text-[#6D3FD6] font-light truncate">
                    {client.industry}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ROW 2: Moving Smoothly to the Right */}
          <motion.div
            animate={
              isPaused
                ? { x: undefined }
                : {
                    x: ['-50%', '0%'],
                  }
            }
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-5 w-max"
          >
            {marqueeRow2.map((client, idx) => (
              <div
                key={`row2-${client.name}-${idx}`}
                className="group relative bg-white rounded-2xl border border-[#E6DEFA] hover:border-[#55516B] hover:bg-white hover:shadow-xl p-5 w-52 sm:w-60 h-28 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shrink-0 cursor-pointer"
              >
                <div className="h-10 w-full flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-9 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-75 group-hover:opacity-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="block text-xs font-semibold text-[#1E1B2E] truncate max-w-[180px]">
                    {client.name}
                  </span>
                  <span className="block text-[10px] text-[#6D3FD6] font-light truncate">
                    {client.industry}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        /* STATIC GRID FALLBACK */
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CLIENTS_LIST.map((client) => (
              <motion.div
                key={client.name}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl border border-[#E6DEFA] hover:border-[#55516B] hover:bg-white hover:shadow-lg p-5 flex flex-col items-center justify-between min-h-[120px] transition-all duration-300"
              >
                <div className="h-12 w-full flex items-center justify-center my-auto">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-10 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full text-center pt-2 border-t border-[#E6DEFA]/50">
                  <h4 className="text-xs font-semibold text-[#1E1B2E] truncate">
                    {client.name}
                  </h4>
                  <span className="text-[10px] text-[#6D3FD6] block truncate">
                    {client.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};