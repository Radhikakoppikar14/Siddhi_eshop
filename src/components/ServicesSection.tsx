import React, { useState } from 'react';
import { SERVICES_DATA, ServiceItem } from '../data/siddhiData';
import { Check, ArrowRight, ZoomIn, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesSectionProps {
  onOpenRfq: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenRfq }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#E8D5C4] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E8D5C4]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#A67C63]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#6F5144] mb-2 px-3 py-1 rounded-full bg-[#E8D5C4]/35 border border-[#E8D5C4]">
              <Sparkles className="w-3.5 h-3.5 text-[#A67C63]" />
              <span>Engineering Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#2D211B] font-editorial tracking-tight">
              Services For Industries
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
            className="text-sm sm:text-base text-[#6F5144]/80 max-w-md font-light leading-relaxed"
          >
            Get benefited with our unique industrial solutions specially designed for Indian industries to enhance electrical performance and safety compliance.
          </motion.p>
        </div>

        {/* 3 Core Services */}
        <div className="space-y-12">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-[#E8D5C4] hover:border-[#6F5144] overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Container */}
                  <div className={`p-8 lg:p-12 space-y-6 ${isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                    <div className="space-y-2">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6F5144] px-2.5 py-1 rounded-md bg-[#E8D5C4]/35 border border-[#E8D5C4]">
                        {service.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-normal text-[#2D211B] font-editorial leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#2D211B]/85 font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {service.features.map((feat, fIdx) => (
                        <motion.div
                          key={fIdx}
                          whileHover={{ x: 4 }}
                          className="flex items-start gap-2.5 text-xs text-[#2D211B] p-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                        >
                          <div className="mt-0.5 p-0.5 bg-[#E8D5C4]/50 text-[#6F5144] rounded-full shrink-0">
                            <Check className="w-3.5 h-3.5 text-[#6F5144]" />
                          </div>
                          <span>{feat}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOpenRfq(service.title)}
                        className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#6F5144] hover:bg-[#5C4337] rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <span>Inquire for {service.subtitle}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>

                      <button
                        onClick={() => setSelectedService(service)}
                        className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium text-[#2D211B] hover:text-[#6F5144] bg-[#FAF7F2] hover:bg-[#E8D5C4]/30 rounded-xl border border-[#E8D5C4] transition-colors cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-[#6F5144]" />
                        <span>View Work Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div
                    onClick={() => setSelectedService(service)}
                    className={`h-72 sm:h-88 lg:h-full min-h-[340px] relative overflow-hidden group cursor-zoom-in ${
                      isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'
                    }`}
                  >
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D211B]/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-xs text-[11px] font-medium text-[#2D211B] flex items-center gap-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-[#E8D5C4]">
                      <ZoomIn className="w-3 h-3 text-[#6F5144]" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Image Lightbox Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-50 bg-[#2D211B]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E8D5C4]"
            >
              <div className="relative bg-[#2D211B] max-h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="max-h-[60vh] w-full object-contain"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-[#2D211B]/80 hover:bg-[#2D211B] text-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label="Close image popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-3 bg-[#FAF7F2]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6F5144] uppercase tracking-wider">
                  <span className="px-2 py-0.5 rounded bg-[#E8D5C4]/35 border border-[#E8D5C4]">{selectedService.subtitle}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-[#2D211B] font-editorial">
                  {selectedService.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6F5144]/80 font-light leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8D5C4]">
                  <span className="text-xs text-[#A67C63] font-light">
                    Factory trained engineers &amp; certified testing equipment.
                  </span>
                  <button
                    onClick={() => {
                      const title = selectedService.title;
                      setSelectedService(null);
                      onOpenRfq(title);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6F5144] hover:bg-[#5C4337] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire About This Service</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};