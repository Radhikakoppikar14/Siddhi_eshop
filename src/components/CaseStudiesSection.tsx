import React, { useState, useEffect } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/siddhiData';
import {
  CheckCircle2,
  Building2,
  ArrowUpRight,
  ZoomIn,
  X,
  Send,
  Sparkles,
  Zap,
  FileCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudiesSectionProps {
  onOpenRfq?: (projectName?: string) => void;
}

interface ProjectTechSpecs {
  primaryMetric: { label: string; value: string };
  specs: { label: string; value: string }[];
  standards: string[];
  scope: string;
}

const PROJECT_TECH_SPECS: Record<string, ProjectTechSpecs> = {
  'cs-grounding': {
    primaryMetric: { label: 'Earth Resistance', value: '< 1.0 Ω (Sub-Ohm)' },
    specs: [
      { label: 'Electrode Tech', value: 'Carbon Loresco + 250μm Cu-Bonded Steel' },
      { label: 'Soil Condition', value: 'High-resistivity dry rocky terrain' },
      { label: 'Maintenance', value: '100% Maintenance-free (Zero water recharge)' },
      { label: 'Service Life', value: '25-Year Manufacturer Performance Warranty' },
    ],
    standards: ['IEEE 80', 'IS 3043:2018', 'IEC 62561-7', 'CE'],
    scope: 'Soil resistivity survey, specialized deep bore drilling, exothermic welding, and Megger Earth testing certification.',
  },
  'cs-led': {
    primaryMetric: { label: 'Energy Reduction', value: '64% Continuous kWh Cut' },
    specs: [
      { label: 'Illuminance Target', value: '450 - 550 Lux on CNC machine planes' },
      { label: 'Luminous Efficacy', value: '> 140 Lumens / Watt (Class A)' },
      { label: 'Protection Rating', value: 'IP66 Waterproof & IK08 High-Impact' },
      { label: 'Driver Inbuilt Surge', value: '10 kV transient suppression (THD < 10%)' },
    ],
    standards: ['BIS Certified', 'IS 10322', 'IEC 60598', 'RoHS'],
    scope: 'Full DIALux lux simulation, scheduled weekend shutdown retrofit, zero production pause, and electrical inspectorate sign-off.',
  },
  'cs-lightning': {
    primaryMetric: { label: 'Protection Radius', value: '120m Umbrella (Level 1)' },
    specs: [
      { label: 'Triggering Time', value: '60 μs Early Streamer Emission advance' },
      { label: 'Discharge Capacity', value: '200 kA (10/350 μs waveform withstand)' },
      { label: 'Terminal Material', value: 'Marine Grade 316L Stainless Steel' },
      { label: 'CNC Protection', value: 'Class I+II DIN-rail secondary surge arrays' },
    ],
    standards: ['NFC 17-102:2011', 'IEC 62305', 'CE', 'IS/IEC 62305'],
    scope: 'Computational lightning risk audit, structural roof mast rigging, copper down-conductors, and test-joint lightning counter installation.',
  },
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenRfq }) => {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slider smoothly every 6s when not hovering/interacting
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 bg-[#FFF1E8] border-b border-[#F1D9CA] relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-2 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>Proven Industrial Field Projects</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight">
              Recent Projects
            </h2>
          </motion.div>

          {/* Carousel Controls & Project Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4"
          >
            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#F1D9CA]">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === i ? 'w-6 bg-[#D2430F]' : 'w-2 bg-[#F1D9CA] hover:bg-[#D2430F]'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Slide Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white border border-[#F1D9CA] flex items-center justify-center text-[#5F524C] hover:bg-[#D2430F] hover:text-[#FFFAF6] hover:border-[#F1D9CA] shadow-xs transition-all cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white border border-[#F1D9CA] flex items-center justify-center text-[#5F524C] hover:bg-[#D2430F] hover:text-[#FFFAF6] hover:border-[#F1D9CA] shadow-xs transition-all cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Moving Card Slider Track (Shows all 3 projects on desktop, with active highlight & smooth animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CASE_STUDIES.map((project, idx) => {
            const isFlipped = !!flippedCards[project.id];
            const tech = PROJECT_TECH_SPECS[project.id] || PROJECT_TECH_SPECS['cs-grounding'];
            const isActive = activeSlide === idx;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                animate={{
                  scale: isActive ? 1.015 : 0.99,
                  opacity: isActive ? 1 : 0.88,
                }}
                className="perspective-[1200px] h-[580px] w-full"
              >
                {/* 3D Container - Flips naturally on card click without buttons */}
                <div
                  onClick={() => toggleCardFlip(project.id)}
                  title="Click card to flip between Overview and Technical Datasheet"
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer rounded-3xl ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* ================= FRONT SIDE ================= */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white rounded-3xl border border-[#F1D9CA] hover:border-[#F1D9CA] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Project Photography */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="h-48 w-full relative overflow-hidden bg-[#D2430F]/8 cursor-zoom-in group/img"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFAF6]/70 via-transparent to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />

                        {/* Category Badge */}
                        <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/90 backdrop-blur-xs text-[#231815] text-xs font-medium rounded-full shadow-sm border border-[#F1D9CA]/30">
                          {project.category}
                        </div>

                        {/* Primary Key Metric Pill */}
                        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[#5F524C] text-[11px] font-mono font-bold rounded-full shadow-sm border border-[#F1D9CA]">
                          {tech.primaryMetric.value}
                        </div>

                        {/* Zoom Indicator */}
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#FFFAF6]/90 backdrop-blur-xs text-[#231815] text-[11px] font-medium rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center gap-1 shadow-sm border border-[#F1D9CA]">
                          <ZoomIn className="w-3 h-3 text-[#5F524C]" />
                          <span>Inspect</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-lg font-normal text-[#231815] font-editorial leading-snug">
                          {project.title}
                        </h3>

                        {/* Clients Involved */}
                        <div className="p-2.5 bg-[#FFFAF6] rounded-xl border border-[#F1D9CA]">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5F524C] mb-0.5">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>Clients:</span>
                          </div>
                          <p className="text-xs font-medium text-[#231815] leading-relaxed line-clamp-1">
                            {project.clients}
                          </p>
                        </div>

                        <p className="text-xs text-[#5F524C]/80 font-light leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-1.5 pt-1 border-t border-[#F1D9CA]/60">
                          {project.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-[#231815]/85">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#5F524C] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Area (No flip buttons) */}
                    <div className="p-5 pt-0 space-y-2">
                      <div className="text-[11px] text-[#D2430F] text-center font-light">
                        Click card anytime to flip datasheet
                      </div>

                      {onOpenRfq && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenRfq(`Project Consultation: ${project.title}`);
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <span>Consult on Similar Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ================= BACK SIDE (TECHNICAL SPECS) ================= */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-[#FFF1E8] text-[#231815] border border-[#F1D9CA] overflow-hidden flex flex-col justify-between p-6 shadow-2xl relative">
                    {/* Decorative ambient background glows */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFF1E8] rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D2430F]/8 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 space-y-3.5">
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#F1D9CA]/20">
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D2430F]/8 border border-[#F1D9CA]/30 text-[11px] font-semibold uppercase tracking-wider text-[#5F524C]">
                          <Zap className="w-3 h-3 text-[#D2430F]" />
                          <span>Engineering Datasheet</span>
                        </div>
                        <span className="text-[11px] text-[#5F524C] font-light">
                          Click to flip back
                        </span>
                      </div>

                      {/* Title & Primary KPI Banner */}
                      <div>
                        <h4 className="text-base font-normal text-[#231815] font-editorial leading-snug">
                          {project.title}
                        </h4>
                        <div className="mt-2 p-2 rounded-xl bg-[#FFFAF6]/10 border border-[#F1D9CA]/30 flex items-center justify-between">
                          <span className="text-[11px] text-[#5F524C] uppercase tracking-wider font-medium">
                            {tech.primaryMetric.label}
                          </span>
                          <span className="text-xs font-bold text-[#FFFAF6] font-mono bg-[#D2430F] px-2 py-0.5 rounded-md border border-[#F1D9CA]/40">
                            {tech.primaryMetric.value}
                          </span>
                        </div>
                      </div>

                      {/* Technical Specs List */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#5F524C] block">
                          Technical Parameters:
                        </span>
                        <div className="space-y-1">
                          {tech.specs.map((s, sIdx) => (
                            <div key={sIdx} className="p-1.5 rounded-lg bg-white/[0.04] border border-[#F1D9CA] flex items-center justify-between text-[11px]">
                              <span className="text-[#5F524C] font-light">{s.label}:</span>
                              <span className="text-[#231815] font-medium text-right max-w-[60%] truncate">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Standards Compliance Chips */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#5F524C] block mb-1">
                          Standards:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {tech.standards.map((std, stdIdx) => (
                            <span key={stdIdx} className="px-2 py-0.5 rounded bg-[#FFFAF6]/10 border border-[#F1D9CA]/30 text-[10px] text-[#231815] font-mono">
                              {std}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Execution Scope */}
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-[#F1D9CA] text-[11px] text-[#5F524C] font-light leading-relaxed">
                        <strong className="text-[#231815] font-medium block mb-0.5 flex items-center gap-1 text-[10px]">
                          <FileCheck className="w-3 h-3 text-[#D2430F]" />
                          Scope Executed:
                        </strong>
                        <p className="line-clamp-2">{tech.scope}</p>
                      </div>
                    </div>

                    {/* Bottom Actions on Back Face */}
                    <div className="relative z-10 pt-2 border-t border-[#F1D9CA]/20 space-y-1.5">
                      {onOpenRfq && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenRfq(`Engineering Datasheet Consultation: ${project.title}`);
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#D2430F] hover:bg-[#A8340A] text-[#FFFAF6] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md border border-[#F1D9CA]/30"
                        >
                          <Send className="w-3 h-3" />
                          <span>Request Quotation</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Image Lightbox Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-[#FFF1E8] backdrop-blur-sm backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#FFFAF6] rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA]"
            >
              {/* Image Preview with Close Button */}
              <div className="relative bg-[#FFF1E8] max-h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-h-[60vh] w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#231815] transition-colors cursor-pointer"
                  aria-label="Close image popup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D2430F] text-[#FFFAF6] text-xs font-semibold tracking-wider uppercase border border-[#F1D9CA]/30">
                  {selectedProject.category}
                </div>
              </div>

              {/* Details & Inquire Bar */}
              <div className="p-6 sm:p-8 space-y-4 bg-[#FFFAF6]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#231815] font-editorial mb-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-[#5F524C] font-medium">
                    Clients: {selectedProject.clients}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#5F524C]/80 font-light leading-relaxed">
                  {selectedProject.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F1D9CA]">
                  <span className="text-xs text-[#D2430F] font-light">
                    Siddhi Kabel engineering &amp; factory-certified materials supply.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const projTitle = selectedProject.title;
                      setSelectedProject(null);
                      onOpenRfq?.(`Project Consultation: ${projTitle}`);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D2430F] hover:bg-[#A8340A] text-[#FFFAF6] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire About This Implementation</span>
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