import React, { useState } from 'react';
import { Target, Shield, Award, Users, Warehouse, FileCheck, HeartHandshake, CheckCircle2, Sparkles, ZoomIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
}> = ({ target, suffix, label, subLabel }) => {
  const [count, setCount] = useState(0);

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
      className="relative p-5 sm:p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8D5C4] shadow-xs hover:border-[#6F5144] hover:shadow-xl transition-all duration-300 cursor-default group overflow-hidden"
    >
      {/* Top glowing accent border shimmer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6F5144] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Ambient background hover flare */}
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#E8D5C4]/60 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-light font-editorial text-[#6F5144] tabular-nums tracking-tight">
              {count}
            </span>
            <span className="text-2xl sm:text-3xl font-light text-[#A67C63] font-editorial ml-0.5">
              {suffix}
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#6F5144] shadow-sm shadow-[#6F5144]/40 group-hover:scale-125 transition-transform" />
        </div>
        <span className="text-xs sm:text-sm text-[#2D211B] font-semibold mt-2.5 block tracking-tight">
          {label}
        </span>
        {subLabel && (
          <span className="text-[11px] text-[#A67C63] font-light block mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const WhyChooseUs: React.FC = () => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  return (
    <section id="about" className="py-8 sm:py-12 bg-[#FAF7F2] border-b border-[#E8D5C4] relative overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#E8D5C4]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#A67C63]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Story & Background Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#6F5144] px-3.5 py-1.5 rounded-full bg-[#E8D5C4]/35 border border-[#E8D5C4]">
              <Sparkles className="w-3.5 h-3.5 text-[#A67C63]" />
              <span>We Are Siddhi Kabel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#2D211B] font-editorial tracking-tight leading-[1.15]">
              Transforming Indian Industry <br className="hidden sm:inline" />
              With Innovative Products
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#2D211B]/85 font-light leading-relaxed">
              <p>
                Siddhi Kabel Corporation Private Limited is one of the leading and reliable suppliers of world class Industrial Electrical, Automation &amp; Safety Products.
              </p>
              <p>
                We at Siddhi Kabel specialize in providing solutions for High quality industrial products, Our primary focus is to service the needs of our customers for high quality products and services, with more than 15 years of experience in industrial Electrical field and association with leading national and multinational customers &amp; Suppliers, Siddhi Kabel offers superior quality products coupled with best technical support.
              </p>
            </div>

            {/* Quick Badges with Live Animated Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8D5C4]">
              <AnimatedCounterCard
                target={15}
                suffix="+"
                label="Years Experience"
                subLabel="Since 2008 in Karnataka"
              />
              <AnimatedCounterCard
                target={25}
                suffix="+"
                label="Industrial segments"
                subLabel="Pharma, Solar, OEM & Power"
              />
              <AnimatedCounterCard
                target={500}
                suffix="+"
                label="Customers served"
                subLabel="Pan-India Corporate Clients"
              />
            </div>
          </motion.div>

          {/* Image with 3D Float Angle & Click to Zoom */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative group"
          >
            <div
              onClick={() => setIsImageZoomed(true)}
              className="relative rounded-3xl overflow-hidden border border-[#E8D5C4] shadow-xl hover:shadow-2xl transition-all duration-500 bg-[#2D211B] cursor-zoom-in group/img"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="/images/resource/why-choose-us.jpg"
                alt="Siddhi Kabel Industrial Electrical Excellence"
                className="w-full h-88 sm:h-96 object-cover opacity-90 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D211B] via-[#2D211B]/40 to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs text-[11px] font-medium text-[#2D211B] flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity border border-[#E8D5C4]">
                <ZoomIn className="w-3 h-3 text-[#6F5144]" />
                <span>Zoom</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E8D5C4] font-semibold block">
                  Quality Commitment
                </span>
                <p className="text-sm font-light text-[#FAF7F2]/90 leading-snug">
                  "Delivering on time if not earlier, with quality as our first priority in all activities."
                </p>
              </div>
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
              className="inline-block text-xs font-semibold tracking-widest uppercase text-[#6F5144] px-3.5 py-1 rounded-full bg-[#E8D5C4]/35 border border-[#E8D5C4]"
            >
              The Siddhi Kabel Advantage
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-normal text-[#2D211B] font-editorial tracking-tight"
            >
              Why Choose Us
            </motion.h3>
            <div className="w-12 h-0.5 bg-[#6F5144] mx-auto mt-2 rounded-full" />
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
                  className="relative bg-white rounded-2xl p-4 border border-[#E8D5C4] hover:border-[#6F5144] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden cursor-default"
                >
                  {/* Subtle top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#6F5144] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  <div>
                    {/* Compact Icon + Index Row */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#E8D5C4] flex items-center justify-center text-[#6F5144] group-hover:bg-[#6F5144] group-hover:text-[#FAF7F2] transition-colors duration-200 shadow-2xs">
                        <IconComp className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#A67C63] tabular-nums">
                        {r.num}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-[#2D211B] group-hover:text-[#6F5144] transition-colors leading-snug">
                      {r.title}
                    </h4>

                    <p className="text-xs text-[#6F5144]/80 font-light leading-relaxed mt-1">
                      {r.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox for why-choose-us image */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
            className="fixed inset-0 z-50 bg-[#2D211B]/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E8D5C4]"
            >
              <div className="relative">
                <img
                  src="/images/resource/why-choose-us.jpg"
                  alt="Quality Commitment"
                  className="w-full max-h-[70vh] object-cover"
                />
                <button
                  onClick={() => setIsImageZoomed(false)}
                  className="absolute top-4 right-4 p-2 bg-[#2D211B]/80 hover:bg-[#2D211B] text-[#FAF7F2] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-[#FAF7F2] space-y-1">
                <h4 className="text-lg font-medium text-[#2D211B] font-editorial">
                  Siddhi Kabel Quality Commitment
                </h4>
                <p className="text-xs text-[#6F5144]/80 font-light">
                  Delivering on time if not earlier, with quality as our first priority in all activities.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};