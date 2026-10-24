import React from 'react';
import { INDUSTRIES_SERVED } from '../data/siddhiData';
import { Cpu, Cog, Sun, Car, Shield, Box, Layers, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, MotionReveal } from './MotionReveal';

const iconMap: Record<string, React.ElementType> = {
  Cog,
  Cpu,
  Sun,
  Car,
  Shield,
  Box,
  Layers,
  Compass,
};

export const IndustriesSection: React.FC = () => {
  return (
    <section id="industries" className="py-20 lg:py-24 bg-[#F3EFFE] border-b border-[#E6DEFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <MotionReveal direction="up" yOffset={30}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#55516B] mb-2 px-3 py-1 rounded-full bg-[#F3EFFE] border border-[#E6DEFA] inline-block">
              Industry 4.0 &amp; Automation Readiness
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1E1B2E] font-editorial tracking-tight mt-2">
              Industries We Cater To
            </h2>
            <p className="text-sm text-[#55516B]/80 mt-3 font-light leading-relaxed">
              As industry marches towards high-speed automation, Industry 4.0, and smart IoT, Siddhi Kabel provides the exact certified cable, switchgear, and safety interconnects to ensure zero errors and continuous uptime.
            </p>
          </div>
        </MotionReveal>

        {/* Industries Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelta={0.1}>
          {INDUSTRIES_SERVED.map((ind, idx) => {
            const IconComp = iconMap[ind.icon] || Cpu;
            return (
              <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full bg-white rounded-3xl border border-[#E6DEFA] p-6 hover:border-[#E6DEFA] hover:shadow-xl transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-2xl group-hover:rotate-6 group-hover:scale-110 bg-[#FCFBFF] border border-[#E6DEFA] flex items-center justify-center text-[#55516B] mb-4 group-hover:bg-[#6D3FD6] group-hover:text-[#FCFBFF] transition-colors duration-300 shadow-2xs">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-[#1E1B2E] mb-2">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#55516B]/80 font-light leading-relaxed">
                  {ind.desc}
                </p>
              </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Additional Industry Tags */}
        <MotionReveal direction="zoom" delay={0.1}>
        <div className="mt-12 p-6 bg-white rounded-3xl border border-[#E6DEFA] text-center shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#55516B] block mb-3">
            Also Supporting These Industrial Sectors:
          </span>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-[#1E1B2E]">
            {[
              'Food & Beverage',
              'Oil, Gas & Chemical Plants',
              'Steel & Cement Plants',
              'Research & Development Labs',
              'Garment & Textile Mills',
              'Infrastructure Contractors & MEP',
              'Medical Equipment & Imaging',
              'Marine & Offshore Engineering',
            ].map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
                whileHover={{ y: -3, scale: 1.06 }}
                className="px-3 py-1 bg-[#FCFBFF] border border-[#E6DEFA] hover:border-[#E6DEFA] hover:text-[#55516B] rounded-xl font-light text-[#1E1B2E] shadow-2xs cursor-default transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        </MotionReveal>
      </div>
    </section>
  );
};