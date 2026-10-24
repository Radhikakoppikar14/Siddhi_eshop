import React, { useState } from 'react';
import { Target, Shield, Award, Users, Warehouse, FileCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const STAT_THEMES = [
  {
    card: 'bg-gradient-to-br from-[#FFF7F0] to-[#FDE5D3] border-[#F1CDB3]',
    num: 'text-[#1E293B]',
    suffix: 'text-[#D2430F]',
    label: 'text-[#1E293B]',
    sub: 'text-[#475569]',
    dot: 'bg-[#D2430F]',
  },
  {
    card: 'bg-gradient-to-br from-[#FFF7F0] to-[#FDE5D3] border-[#F1CDB3]',
    num: 'text-[#1E293B]',
    suffix: 'text-[#D2430F]',
    label: 'text-[#1E293B]',
    sub: 'text-[#475569]',
    dot: 'bg-[#D2430F]',
  },
  {
    card: 'bg-gradient-to-br from-[#FFF7F0] to-[#FDE5D3] border-[#F1CDB3]',
    num: 'text-[#1E293B]',
    suffix: 'text-[#D2430F]',
    label: 'text-[#1E293B]',
    sub: 'text-[#475569]',
    dot: 'bg-[#D2430F]',
  },
];

const CARD_TINTS = ['bg-[#FFF1E8]', 'bg-[#FFF4D6]', 'bg-[#FDE3D3]', 'bg-[#F6EBDD]'];

const REASONS = [
  {
    num: '01',
    icon: Target,
    title: 'One Trusted Single Source',
    desc: 'Complete solution in Electrical, Safety, Energy, and Automation products & Services.',
  },
  {
    num: '02',
    icon: Shield,
    title: 'Multiple World-Class Brands',
    desc: 'Multiple brands with huge range of world class products.',
  },
  {
    num: '03',
    icon: Award,
    title: 'Wide Range of Products',
    desc: 'Wide range of products for Industrial, Commercial and Domestic applications.',
  },
  {
    num: '04',
    icon: Users,
    title: 'Dedicated Skilled Team',
    desc: 'Technically, commercially skilled dedicated team.',
  },
  {
    num: '05',
    icon: Award,
    title: '25 Years Vertical Presence',
    desc: '25 years of presence across industry verticals.',
  },
  {
    num: '06',
    icon: Warehouse,
    title: 'Planned Inventory & Large Network',
    desc: 'Customer specific and well-planned inventory added with reliable large network for better service.',
  },
  {
    num: '07',
    icon: FileCheck,
    title: 'Complete Statutory Compliance',
    desc: 'Complete statutory compliance for hassle free transaction.',
  },
  {
    num: '08',
    icon: HeartHandshake,
    title: 'Ethical Business Practice',
    desc: 'Ethical business practice with quality as our first priority.',
  },
];

const AnimatedCounterCard: React.FC<{
  target: number;
  suffix: string;
  label: string;
  subLabel?: string;
  theme?: number;
}> = ({ target, suffix, label, subLabel, theme = 0 }) => {
  const [count, setCount] = useState(0);
  const t = STAT_THEMES[theme % STAT_THEMES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      onViewportEnter={() => {
        setCount(0);
        let start = 0;
        const duration = 1200;
        const steps = 30;
        const stepTime = duration / steps;
        const increment = target / steps;
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }}
      whileHover={{ y: -7, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative p-5 sm:p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group overflow-hidden ${t.card}`}
    >
      {/* Top glowing accent border shimmer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Ambient background hover flare */}
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className={`text-3xl sm:text-4xl lg:text-5xl font-light font-editorial ${t.num} tabular-nums tracking-tight`}>
              {count}
            </span>
            <span className={`text-2xl sm:text-3xl font-light ${t.suffix} font-editorial ml-0.5`}>
              {suffix}
            </span>
          </div>
          <span className={`w-2.5 h-2.5 rounded-full ${t.dot} group-hover:scale-125 transition-transform`} />
        </div>
        <span className={`text-xs sm:text-sm ${t.label} font-semibold mt-2.5 block tracking-tight`}>
          {label}
        </span>
        {subLabel && (
          <span className={`text-[11px] ${t.sub} font-light block mt-0.5`}>
            {subLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-8 sm:py-12 bg-white border-b border-[#F1D9CA] relative overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Story & Background Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-12 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>We Are Siddhi Kabel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight leading-[1.15]">
              Transforming Indian Industry <br className="hidden sm:inline" />
              With Innovative Products
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#231815]/85 font-light leading-relaxed">
              <p>
                Siddhi Kabel Corporation Private Limited is one of the leading and reliable suppliers of world class Industrial Electrical, Automation &amp; Safety Products.
              </p>
              <p>
                We at Siddhi Kabel specialize in providing solutions for High quality industrial products, Our primary focus is to service the needs of our customers for high quality products and services, with more than 15 years of experience in industrial Electrical field and association with leading national and multinational customers &amp; Suppliers, Siddhi Kabel offers superior quality products coupled with best technical support.
              </p>
            </div>

            {/* Quick Badges with Live Animated Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F1D9CA]">
              <AnimatedCounterCard
                target={15}
                suffix="+"
                theme={0}
                label="Years Experience"
                subLabel="Since 2008 in Karnataka"
              />
              <AnimatedCounterCard
                target={25}
                suffix="+"
                theme={1}
                label="Industrial segments"
                subLabel="Pharma, Solar, OEM & Power"
              />
              <AnimatedCounterCard
                target={500}
                suffix="+"
                theme={2}
                label="Customers served"
                subLabel="Pan-India Corporate Clients"
              />
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Grid - Redesigned to be space-efficient & compact */}
        <div className="pt-2 sm:pt-4">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]"
            >
              The Siddhi Kabel Advantage
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight"
            >
              Why Choose Us
            </motion.h3>
            <div className="w-12 h-0.5 bg-[#D2430F] mx-auto mt-2 rounded-full" />
          </div>

          {/* 8 Items in Compact Architectural Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {REASONS.map((r, index) => {
              const IconComp = r.icon;
              return (
                <motion.div
                  key={r.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className={`relative ${CARD_TINTS[index % CARD_TINTS.length]} rounded-2xl p-4 border border-[#F1D9CA] hover:border-[#D2430F]/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden cursor-default`}
                >
                  {/* Subtle top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#D2430F] opacity-70 group-hover:opacity-100 transition-opacity duration-200" />

                  <div className="relative z-10">
                    {/* Compact Icon + Index Row */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FFFAF6] border border-[#F1D9CA] flex items-center justify-center text-[#5F524C] group-hover:bg-[#D2430F] group-hover:text-[#FFFAF6] transition-colors duration-200 shadow-2xs">
                        <IconComp className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#D2430F] tabular-nums">
                        {r.num}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-[#231815] group-hover:text-[#5F524C] transition-colors leading-snug">
                      {r.title}
                    </h4>

                    <p className="text-xs text-[#5F524C]/80 font-light leading-relaxed mt-1">
                      {r.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};