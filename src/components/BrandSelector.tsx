import React, { useState } from 'react';
import { BRANDS_DATA } from '../data/siddhiData';
import {
  ArrowUpRight,
  CheckCircle2,
  ZoomIn,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Zap,
  Building2,
  FileCheck2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BrandSelectorProps {
  onSelectBrand: (brandId: string) => void;
  onOpenRfq: (brandName?: string) => void;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelectBrand, onOpenRfq }) => {
  const [activeBrandId, setActiveBrandId] = useState<string>('lapp');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  const activeBrand = BRANDS_DATA.find((b) => b.id === activeBrandId) || BRANDS_DATA[0];

  return (
    <section id="brands" className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E8D5C4] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#E8D5C4]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#A67C63]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#6F5144] mb-2 px-3 py-1 rounded-full bg-[#E8D5C4]/35 border border-[#E8D5C4] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A67C63]" />
              <span>Direct Factory Partnerships</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#2D211B] font-editorial tracking-tight">
              Brands we deal with
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
            className="text-sm sm:text-base text-[#6F5144]/80 max-w-md font-light leading-relaxed"
          >
            Authorized distributors, dealers, and channel partners for global leaders in electrical cables, automation switchgear, and safety systems.
          </motion.p>
        </div>

        {/* Interactive Brand Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {BRANDS_DATA.map((brand) => {
            const isSelected = brand.id === activeBrandId;
            return (
              <motion.button
                key={brand.id}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveBrandId(brand.id);
                  onSelectBrand(brand.id);
                }}
                className={`relative p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border text-center cursor-pointer overflow-hidden group ${
                  isSelected
                    ? 'bg-white border-[#6F5144] shadow-md ring-2 ring-[#6F5144]/25'
                    : 'bg-white/80 hover:bg-white border-[#E8D5C4] hover:border-[#A67C63] shadow-2xs'
                }`}
              >
                {/* Active Brand Subtle Top Glow Strip */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6F5144] via-[#A67C63] to-[#6F5144]" />
                )}

                {/* Brand Logo with Gentle Hover Scale */}
                <div className="h-10 w-full flex items-center justify-center relative">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`max-h-8 max-w-[85%] object-contain transition-transform duration-300 ${
                      isSelected ? 'scale-105' : 'group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Brand Name & Live Pulse Indicator */}
                <div className="flex items-center gap-1.5 w-full justify-center">
                  {isSelected && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6F5144] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6F5144]" />
                    </span>
                  )}
                  <span className={`text-[11px] truncate ${
                    isSelected ? 'text-[#6F5144] font-semibold' : 'text-[#6F5144]/75 group-hover:text-[#2D211B]'
                  }`}>
                    {brand.name}
                  </span>
                </div>

                {/* Sliding indicator spring animation */}
                {isSelected && (
                  <motion.div
                    layoutId="activeBrandPill"
                    className="absolute -bottom-1 left-4 right-4 h-1 bg-[#6F5144] rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Brand Spotlight Card - Unified & Modern (No Flip Buttons) */}
        <div>
          <div className="relative bg-white rounded-3xl border border-[#E8D5C4] p-6 sm:p-10 shadow-xl overflow-hidden">
            {/* Smooth Shimmer / Sweep Effect on Brand Change */}
            <motion.div
              key={`shimmer-${activeBrand.id}`}
              initial={{ x: '-100%', opacity: 0.5 }}
              animate={{ x: '200%', opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#E8D5C4]/40 to-transparent pointer-events-none z-20 skew-x-12"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Column: Brand Details & Product Badges */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Logo and Partner Credentials */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8D5C4] inline-flex items-center justify-center shadow-xs"
                    >
                      <img
                        src={activeBrand.logo}
                        alt={activeBrand.name}
                        className="h-10 w-auto object-contain"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-normal text-[#2D211B] font-editorial">
                        {activeBrand.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#6F5144] pt-0.5">
                        <span className="font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#6F5144]" />
                          Authorized Channel Partner
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#6F5144] font-mono bg-[#E8D5C4]/35 px-2 py-0.5 rounded-md font-medium border border-[#E8D5C4]">
                          {activeBrand.productCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#2D211B]/85 leading-relaxed font-light">
                    {activeBrand.fullDesc}
                  </p>

                  {/* Portfolios Available */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6F5144] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#A67C63]" />
                      <span>Key Product Portfolios Available:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeBrand.categories.map((cat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.08 }}
                          whileHover={{ scale: 1.025, x: 4, backgroundColor: '#FAF7F2' }}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8D5C4] text-xs text-[#2D211B] shadow-2xs hover:border-[#A67C63] hover:shadow-sm transition-all cursor-default"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#6F5144] shrink-0" />
                          <span className="truncate font-medium">{cat}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Logistics Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D5C4] flex items-center gap-2 text-xs">
                      <PackageCheck className="w-4 h-4 text-[#6F5144] shrink-0" />
                      <span className="text-[#2D211B] font-medium text-[11px]">Bangalore Buffer Stock</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D5C4] flex items-center gap-2 text-xs">
                      <FileCheck2 className="w-4 h-4 text-[#6F5144] shrink-0" />
                      <span className="text-[#2D211B] font-medium text-[11px]">100% Genuine MTC</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D5C4] flex items-center gap-2 text-xs">
                      <Sparkles className="w-4 h-4 text-[#A67C63] shrink-0" />
                      <span className="text-[#2D211B] font-medium text-[11px]">Technical Assistance</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenRfq(activeBrand.name)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#6F5144] hover:bg-[#5C4337] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer group/inq"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Inquire for {activeBrand.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/inq:translate-x-0.5 group-hover/inq:-translate-y-0.5" />
                    </motion.button>
                    <Link
                      to="/products"
                      onClick={() => onSelectBrand(activeBrand.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium text-[#6F5144] hover:text-[#2D211B] hover:underline underline-offset-4 transition-colors"
                    >
                      <span>View catalog for this brand →</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: 3D Floating Product Showcase */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8D5C4] flex flex-col items-center justify-between text-center relative overflow-hidden group shadow-inner">
                  {/* Pulsing Aura Behind Product */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.35, 0.65, 0.35],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 m-auto w-44 h-44 bg-[#E8D5C4]/60 rounded-full blur-2xl pointer-events-none"
                  />

                  {/* Top In-Stock Live Badge */}
                  <div className="relative z-10 w-full flex items-center justify-between text-[11px] mb-3 pb-2 border-b border-[#E8D5C4]">
                    <span className="inline-flex items-center gap-1.5 font-medium text-[#2D211B] bg-[#E8D5C4]/40 px-2.5 py-0.5 rounded-full border border-[#E8D5C4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6F5144] animate-pulse" />
                      <span>Ready For Dispatch</span>
                    </span>
                    <span className="text-[#A67C63] font-mono text-[10px]">
                      Bangalore Buffer Stock
                    </span>
                  </div>

                  {/* Levitation Bobbing Product Image */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => setZoomImage({ src: activeBrand.featuredImg, title: `${activeBrand.name} Featured Product` })}
                    className="w-full h-56 flex items-center justify-center my-2 cursor-zoom-in relative group/prod"
                  >
                    <img
                      src={activeBrand.featuredImg}
                      alt={activeBrand.name}
                      className="max-h-48 max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover/prod:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#2D211B]/15 opacity-0 group-hover/prod:opacity-100 rounded-2xl transition-opacity flex items-center justify-center backdrop-blur-2xs">
                      <span className="px-3.5 py-1.5 bg-[#FAF7F2] rounded-full text-[11px] font-semibold text-[#2D211B] shadow-lg flex items-center gap-1.5 border border-[#E8D5C4]">
                        <ZoomIn className="w-3.5 h-3.5 text-[#6F5144]" />
                        <span>Click to Inspect High-Res</span>
                      </span>
                    </div>
                  </motion.div>

                  {/* Warehouse Footnote */}
                  <div className="relative z-10 pt-2 border-t border-[#E8D5C4] w-full flex items-center justify-center gap-1.5 text-xs text-[#6F5144]/80 font-light">
                    <Building2 className="w-3.5 h-3.5 text-[#6F5144] shrink-0" />
                    <span>Direct genuine stock available in Bangalore warehouse for fast dispatch.</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-50 bg-[#2D211B]/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#E8D5C4]"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8D5C4]">
                <h4 className="text-lg font-medium text-[#2D211B] font-editorial">
                  {zoomImage.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setZoomImage(null)}
                  className="p-2 rounded-full bg-[#E8D5C4]/40 hover:bg-[#E8D5C4] text-[#2D211B] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-white rounded-2xl flex items-center justify-center min-h-[300px] border border-[#E8D5C4]/60">
                <img
                  src={zoomImage.src}
                  alt={zoomImage.title}
                  className="max-h-72 max-w-full object-contain"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-[#6F5144]/80 font-light">
                  Factory genuine product line supplied by Siddhi Kabel
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const title = zoomImage.title;
                    setZoomImage(null);
                    onOpenRfq(title);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#6F5144] hover:bg-[#5C4337] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Price
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};