import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroProps {
  onOpenRfq: (topic?: string) => void;
}

interface SlideItem {
  type: 'video' | 'image';
  src: string;
  tag: string;
  headline: string;
  subtext: string;
  badge: string;
  accent: string;
  rotatingWords: string[];
}

const SLIDES: SlideItem[] = [
  {
    type: 'video',
    src: '/assets/aistudio/demo1_97642c15.mp4',
    tag: 'Industrial Cable & Automation',
    headline: 'Precision Industrial Wiring, Assemblies & Patch Panels',
    subtext:
      'Authorised engineering solutions and direct distribution for Lapp, Eaton, Mennekes, and world-class industrial automation lines across India.',
    badge: 'AUTHORISED INDUSTRIAL DISTRIBUTOR',
    accent: '#E6E0F0',
    rotatingWords: ['Precision Harnessing', 'High-Speed Bus Lines', 'Zero Downtime', 'German Quality'],
  },
  {
    type: 'video',
    src: '/assets/aistudio/demo2_9522fcbe.mp4',
    tag: 'Warehouse & Logistics Hub',
    headline: 'High-Capacity Cable Drum Stock & Express Pan-India Dispatch',
    subtext:
      'Direct ex-stock availability of control, flexible, optical, and heavy-duty industrial cables with same-day dispatch from our central Bangalore warehouse.',
    badge: 'CENTRAL BANGALORE WAREHOUSE',
    accent: '#E5E4E2',
    rotatingWords: ['Ex-Stock Drums', 'Same-Day Dispatch', 'Banashankari Hub', '500+ Clients'],
  },
];

// Live Typewriter Effect Component
const TypewriterText: React.FC<{ words: string[] }> = ({ words }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 60);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  const currentWord = words[wordIndex % words.length];
  const displayed = currentWord.substring(0, charIndex);

  return (
    <span className="inline-flex items-center text-[#E6E0F0] font-semibold tracking-wide">
      <span>{displayed}</span>
      <span className="inline-block w-0.5 h-4 bg-[#E6E0F0] ml-1 animate-pulse" />
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenRfq }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // 10-second interval timer per user specification (2 demo videos)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  // Sync video play state on slide switch
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentSlide) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide]);

  // Ensure active video keeps playing and resumes if tab focus or scroll returns
  useEffect(() => {
    const playCurrentVideo = () => {
      const activeVideo = videoRefs.current[currentSlide];
      if (activeVideo && activeVideo.paused) {
        activeVideo.play().catch(() => {});
      }
    };
    playCurrentVideo();
    window.addEventListener('focus', playCurrentVideo);
    window.addEventListener('scroll', playCurrentVideo, { passive: true });
    return () => {
      window.removeEventListener('focus', playCurrentVideo);
      window.removeEventListener('scroll', playCurrentVideo);
    };
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative bg-[#2D211B] text-[#FAF7F2] overflow-hidden select-none">
      {/* Background Media Slider with Smooth Transitions */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {s.type === 'video' ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={s.src}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                  className="w-full h-full object-cover transform scale-105 transition-transform duration-5000 ease-out"
                />
              ) : (
                <motion.img
                  src={s.src}
                  alt={s.headline}
                  animate={isActive ? { scale: [1, 1.05] } : { scale: 1 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Lighter Scrim Overlay: allows background video to be clearly visible while maintaining contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2D211B]/65 via-[#2D211B]/45 to-[#1F1612]/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D211B]/65 via-transparent to-[#2D211B]/25" />
            </div>
          );
        })}
      </div>

      {/* Floating Animated Geometric / Glowing Particle Accents */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -right-16 w-96 h-96 bg-[#A67C63]/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.20, 0.12],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -left-16 w-80 h-80 bg-[#E8D5C4]/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6 lg:pt-12 lg:pb-6 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4"
          >
            {/* Live Kicker & Rotating Typewriter Tag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-[#FAF7F2] py-1 px-3 rounded-full bg-[#6F5144]/90 border border-[#A67C63]/50 shadow-sm backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-[#E8D5C4]" />
                <span>{slide.badge}</span>
              </span>

              <div className="inline-flex items-center gap-2 text-xs text-[#FAF7F2] py-1 px-3 rounded-full bg-[#2D211B]/80 border border-[#E8D5C4]/30 backdrop-blur-md shadow-xs">
                <span className="text-[#E8D5C4] font-medium">{slide.tag}</span>
                <span className="text-white/40">|</span>
                <TypewriterText words={slide.rotatingWords} />
              </div>
            </div>

            {/* Headline with Live Fade & Scale */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-[#FAF7F2] font-editorial drop-shadow-[0_2px_12px_rgba(20,14,11,0.9)]"
              style={{ textWrap: 'balance' }}
            >
              {slide.headline}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="text-sm sm:text-base lg:text-lg text-[#FAF7F2] max-w-2xl font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(20,14,11,0.85)]"
            >
              {slide.subtext}
            </motion.p>

            {/* Live Action Row - Inquire and Catalog */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 25px rgba(166, 124, 99, 0.5)',
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenRfq(slide.headline)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#6F5144] hover:bg-[#5C4337] rounded-xl transition-all shadow-lg border border-[#A67C63]/50 group cursor-pointer"
              >
                <span>Inquire / Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <Link
                to="/products"
                className="inline-flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-md transition-all hover:scale-102 shadow-sm"
              >
                Browse Catalog
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Modern Enterprise Capability Highlights Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 py-4 mt-6 border-t border-[#E8D5C4]/20">
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#2D211B]/60 backdrop-blur-md border border-[#E8D5C4]/20 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#6F5144]/80 flex items-center justify-center text-[#E8D5C4] shrink-0 border border-[#A67C63]/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#FAF7F2] tracking-tight">15+ Years Experience</span>
              <span className="block text-[10px] text-[#E8D5C4]/80 truncate">Since 2008 in Karnataka</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#2D211B]/60 backdrop-blur-md border border-[#E8D5C4]/20 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#6F5144]/80 flex items-center justify-center text-[#E8D5C4] shrink-0 border border-[#A67C63]/40">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#FAF7F2] tracking-tight">8 Global OEM Brands</span>
              <span className="block text-[10px] text-[#E8D5C4]/80 truncate">Lapp, Eaton, Havells, Hager</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#2D211B]/60 backdrop-blur-md border border-[#E8D5C4]/20 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#6F5144]/80 flex items-center justify-center text-[#E8D5C4] shrink-0 border border-[#A67C63]/40">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#FAF7F2] tracking-tight">Central Bangalore Hub</span>
              <span className="block text-[10px] text-[#E8D5C4]/80 truncate">Banashankari Ex-Stock Drums</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#2D211B]/60 backdrop-blur-md border border-[#E8D5C4]/20 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#6F5144]/80 flex items-center justify-center text-[#E8D5C4] shrink-0 border border-[#A67C63]/40">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-[#FAF7F2] tracking-tight">Statutory Compliant</span>
              <span className="block text-[10px] text-[#E8D5C4]/80 truncate">IS & IEC Certified Supply</span>
            </div>
          </div>
        </div>

        {/* Live Slide Controls with 10-Second Linear Progress Bars */}
        <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#E8D5C4]/20">
          {/* Slider Indicators */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((s, i) => {
              const isActive = i === currentSlide;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-16 bg-white/30' : 'w-5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${i + 1} - ${s.tag}`}
                >
                  {isActive && isPlaying && (
                    <motion.div
                      key={`progress-${currentSlide}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 10, ease: 'linear' }}
                      className="h-full bg-[#E8D5C4] rounded-full shadow-xs"
                    />
                  )}
                  {isActive && !isPlaying && (
                    <div className="h-full w-full bg-[#E8D5C4] rounded-full" />
                  )}
                </button>
              );
            })}

            <span className="text-[11px] font-mono text-[#E8D5C4]/90 ml-2">
              0{currentSlide + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Navigation Controls: Prev & Next */}
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};