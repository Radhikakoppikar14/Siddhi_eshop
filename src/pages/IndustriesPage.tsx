import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MotionReveal } from '../components/MotionReveal';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const INDUSTRIES_ORIGINAL = [
  'OEM - Machine manufacturers',
  'Panel builders & System integrators',
  'Renewable Energy Solar & Wind',
  'Food & Beverage',
  'Oil, Gas, Chemical & Paint',
  'Steel & Cement',
  'Packaging machinery',
  'Pharmaceutical & Bio tech',
  'Research & Development',
  'Garment & Textile',
  'Construction industry',
  'Contractors & projects management',
  'Automobile & Rail transport',
  'Automation & Robotics',
  'Medical Equipment',
  'Mechanical & Plant Engineering',
  'Marine Engineering',
  'Defense',
];

export const IndustriesPage: React.FC = () => {
  return (
    <div className="bg-[#FCFBFF] text-[#1E1B2E]">
      <PageHeader
        title="Industries"
        breadcrumb="Industries"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/aistudio/demoo1.mp4"
      />

      <section className="py-16 sm:py-20 bg-[#FCFBFF] border-b border-[#E6DEFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <MotionReveal yOffset={20} duration={0.5}>
            <div className="max-w-3xl mb-12 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1E1B2E] font-editorial">
                Industries We Cater To
              </h2>
              <p className="text-sm sm:text-base text-[#55516B]/80 font-light leading-relaxed">
                As the industry is marching towards automation, Industry 4.0, IOT etc, It is important to take right step in selecting the products and solutions in the fast paced journey for a error free and effective future.
              </p>
              <p className="text-sm text-[#55516B]/80 font-light leading-relaxed">
                Siddhi helps varied industries in their march towards success. Below are some of the Industries we cater to:
              </p>
            </div>

            {/* Exact 18 Industries with Live Hover Elevation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INDUSTRIES_ORIGINAL.map((industry, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3, scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-5 rounded-2xl border border-[#E6DEFA] flex items-center gap-3 hover:border-[#E6DEFA] hover:bg-white hover:shadow-lg transition-all shadow-2xs group"
                >
                  <div className="p-1.5 rounded-xl bg-[#FCFBFF] border border-[#E6DEFA] text-[#55516B] shrink-0 group-hover:bg-[#6D3FD6] group-hover:text-[#FCFBFF] transition-colors duration-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#1E1B2E] group-hover:text-[#55516B] transition-colors">
                    {industry}
                  </span>
                </motion.div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
};