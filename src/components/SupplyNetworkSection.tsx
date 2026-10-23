import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  Building,
  Send,
  Zap,
  PackageCheck
} from 'lucide-react';

interface SupplyNetworkSectionProps {
  onOpenContact?: (brandOrDomain?: string) => void;
}

interface NetworkBrandDetail {
  id: string;
  name: string;
  tagline: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  accentText: string;
  domains: string[];
  capabilities: string[];
  partnerStatus: string;
}

const NETWORK_BRANDS: NetworkBrandDetail[] = [
  {
    id: 'lapp',
    name: 'LAPP',
    tagline: 'World Leader in Cables & Industrial Connection Technology',
    color: '#6F5144',
    badgeBg: 'bg-[#E8D5C4]/40',
    badgeBorder: 'border-[#E8D5C4]',
    accentText: 'text-[#6F5144]',
    domains: [
      'Comprehensive Range of Electrical Cables & Connectors',
      'Medium Voltage Switchgear & Low Voltage Control Systems',
    ],
    capabilities: [
      'OLFLEX® flexible control & power cables',
      'UNITRONIC® data & communication bus cables',
      'ETHERLINE® industrial ethernet systems',
      'SKINTOP® high-grade strain relief cable glands',
    ],
    partnerStatus: 'Factory Authorized Channel Partner since 2008',
  },
  {
    id: 'eaton',
    name: 'EATON',
    tagline: 'Intelligent Power Management & Industrial LED Solutions',
    color: '#6F5144',
    badgeBg: 'bg-[#E8D5C4]/40',
    badgeBorder: 'border-[#E8D5C4]',
    accentText: 'text-[#6F5144]',
    domains: [
      'Indoor LED Lighting Luminaires & Drivers',
      'Medium Voltage Switchgear & Power Distribution',
    ],
    capabilities: [
      'Energy-efficient industrial high-bay & cleanroom luminaires',
      'Surge protective devices & intelligent MCCBs',
      'Industrial motor control & automation switchgear',
      'Complete power distribution busway systems',
    ],
    partnerStatus: 'Authorized Value-Added Distributor',
  },
  {
    id: 'havells',
    name: 'HAVELLS',
    tagline: 'Heavy Industrial Switchgear, Plugs & Commercial Wiring',
    color: '#6F5144',
    badgeBg: 'bg-[#E8D5C4]/40',
    badgeBorder: 'border-[#E8D5C4]',
    accentText: 'text-[#6F5144]',
    domains: [
      'LV Switchboard Components & Enclosures',
      'Explosion-Proof Lighting Fixtures & Hazardous Gear',
      'Industrial Plugs, Sockets & Mechanical Interlocks',
    ],
    capabilities: [
      'Heavy-duty industrial plugs & mechanical interlocks',
      'Flameproof/explosion-proof lighting for hazardous zones',
      'Air Circuit Breakers (ACB) & modular switchgear',
      'Custom fabricated IP65/IP66 enclosure assemblies',
    ],
    partnerStatus: 'Authorized Industrial Channel Partner',
  },
  {
    id: 'hager',
    name: 'HAGER',
    tagline: 'Smart Electrical Distribution & Cable Management Systems',
    color: '#6F5144',
    badgeBg: 'bg-[#E8D5C4]/40',
    badgeBorder: 'border-[#E8D5C4]',
    accentText: 'text-[#6F5144]',
    domains: [
      'Modular Wiring Systems & Cable Management',
      'Industrial Wiring & Cable Distribution',
      'Cable Management Systems',
    ],
    capabilities: [
      'Tehalit cable trunking & underfloor ducting systems',
      'Modular consumer units & distribution boards',
      'Advanced circuit protection & automated energy metering',
      'Intelligent building automation & sensor control',
    ],
    partnerStatus: 'Authorized Distribution Specialist',
  },
  {
    id: 'luminis',
    name: 'LUMINIS',
    tagline: 'Engineered Cable Glands, Ties & Grounding Systems',
    color: '#6F5144',
    badgeBg: 'bg-[#E8D5C4]/40',
    badgeBorder: 'border-[#E8D5C4]',
    accentText: 'text-[#6F5144]',
    domains: [
      'Cable Glands, Ties & Accessories',
      'Earthing & Grounding Equipment',
    ],
    capabilities: [
      'High-spec brass, nickel-plated & SS cable glands',
      'UV-resistant nylon cable ties & metallic strapping',
      'Chemical copper-bonded grounding rods & earthing mats',
      'Heat shrinkable terminations & identification sleeves',
    ],
    partnerStatus: 'Certified Channel Partner',
  },
  {
    id: 'mennekes',
    name: 'MENNEKES',
    tagline: 'Industrial Plugs, Surge Protection & German CEE Systems',
    color: '#6F5144',
    badgeBg: 'bg-[#E8D5C4]/40',
    badgeBorder: 'border-[#E8D5C4]',
    accentText: 'text-[#6F5144]',
    domains: [
      'Lightning Protection & Surge Arresters',
      'Earthing & Grounding Equipment',
      'CEE Industrial Sockets & Multi-Contact Plugs',
    ],
    capabilities: [
      'German-engineered CEE plugs up to 125A and IP67 rating',
      'Type 1+2 surge arresters & lightning protection arrays',
      'Receptacle combination units for extreme plant environments',
      'Specialized e-mobility and marine shore-power connections',
    ],
    partnerStatus: 'Official Channel Partner',
  },
];

export const SupplyNetworkSection: React.FC<SupplyNetworkSectionProps> = ({ onOpenContact }) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('lapp');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const activeBrand = NETWORK_BRANDS.find((b) => b.id === selectedBrandId) || NETWORK_BRANDS[0];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E8D5C4] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#E8D5C4]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#A67C63]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D5C4]/35 border border-[#E8D5C4] text-xs font-semibold tracking-wider uppercase text-[#6F5144] mb-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A67C63]" />
              <span>Multi-Brand Integration</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#2D211B] font-editorial tracking-tight"
            >
              Authorized Integrated Product Supply Network
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#6F5144]/80 font-light max-w-md leading-relaxed"
          >
            Siddhi Kabel unites 6 global industry leaders under one factory-certified supply chain for integrated industrial projects.
          </motion.p>
        </div>

        {/* 2 Parties Layout: Left (Diagram Showcase) & Right (Interactive Brand Navigator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Party 1: LEFT SIDE - Diagram Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 bg-white rounded-2xl border border-[#E8D5C4] p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8D5C4]">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6F5144] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6F5144]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D211B]">
                  Architecture Matrix
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#6F5144] bg-[#FAF7F2] hover:bg-[#E8D5C4]/30 border border-[#E8D5C4] rounded-lg transition-all cursor-pointer hover:scale-105"
                title="Zoom into high-resolution diagram"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom Full HD</span>
              </button>
            </div>

            {/* Clickable Image Box */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-white p-2 border border-[#E8D5C4] cursor-zoom-in group/img flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[300px]"
            >
              <img
                src="/assets/aistudio/image_b3c5bf39.png"
                alt="Authorized Multi-Brand Integrated Supply Network"
                className="max-h-[290px] w-auto object-contain drop-shadow transition-transform duration-500 group-hover/img:scale-[1.03]"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-[#2D211B]/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                <span className="px-3 py-1.5 bg-[#FAF7F2] text-[#2D211B] rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 border border-[#E8D5C4]">
                  <ZoomIn className="w-3.5 h-3.5 text-[#6F5144]" />
                  <span>Click to Expand</span>
                </span>
              </div>
            </div>

            {/* Bottom 3 Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#E8D5C4] text-center">
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8D5C4]">
                <Layers className="w-3.5 h-3.5 text-[#6F5144] mx-auto mb-1" />
                <span className="text-[10px] font-semibold text-[#2D211B] block uppercase">6 Alliances</span>
                <span className="text-[9px] text-[#A67C63] block">Unified Supply</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8D5C4]">
                <PackageCheck className="w-3.5 h-3.5 text-[#6F5144] mx-auto mb-1" />
                <span className="text-[10px] font-semibold text-[#2D211B] block uppercase">Single PO</span>
                <span className="text-[9px] text-[#A67C63] block">Consolidated</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8D5C4]">
                <Building className="w-3.5 h-3.5 text-[#6F5144] mx-auto mb-1" />
                <span className="text-[10px] font-semibold text-[#2D211B] block uppercase">Bangalore</span>
                <span className="text-[9px] text-[#A67C63] block">Ready Stock</span>
              </div>
            </div>
          </motion.div>

          {/* Party 2: RIGHT SIDE - Interactive Brand Domain Navigator */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-[#E8D5C4] p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8D5C4]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F5144] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#A67C63]" />
                  <span>Select OEM Brand Alliance</span>
                </span>
                <span className="text-[11px] text-[#A67C63] font-light">
                  Click to inspect domains
                </span>
              </div>

              {/* Brand Selector Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {NETWORK_BRANDS.map((b) => {
                  const isSelected = b.id === selectedBrandId;
                  return (
                    <motion.button
                      key={b.id}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedBrandId(b.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-[#E8D5C4]/40 border-[#6F5144] shadow-xs ring-1 ring-[#6F5144]/30'
                          : 'bg-white hover:bg-[#FAF7F2] border-[#E8D5C4]'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? 'text-[#6F5144]' : 'text-[#2D211B]'}`}>
                        {b.name}
                      </span>
                      {isSelected && (
                        <motion.div
                          layoutId="compactBrandLine"
                          className="w-4 h-0.5 bg-[#6F5144] rounded-full mt-1"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Brand Dynamic Details Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 p-3.5 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-white border border-[#E8D5C4]"
                >
                  {/* Brand Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg font-bold font-editorial text-[#2D211B]">
                      {activeBrand.name}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${activeBrand.badgeBg} ${activeBrand.badgeBorder} ${activeBrand.accentText}`}>
                      {activeBrand.partnerStatus}
                    </span>
                  </div>

                  <p className="text-xs text-[#2D211B]/80 font-light leading-relaxed">
                    {activeBrand.tagline}
                  </p>

                  {/* Domains */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F5144] block">
                      Supply Network Roles:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeBrand.domains.map((dom, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 p-2 rounded-lg bg-white border border-[#E8D5C4] text-[11px] font-medium text-[#2D211B]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6F5144] shrink-0 mt-0.5" />
                          <span className="leading-tight">{dom}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities / Products */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A67C63] block mb-1.5">
                      Supplied Lines &amp; Families:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeBrand.capabilities.map((cap, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white border border-[#E8D5C4] text-[10px] text-[#2D211B]/80 font-light"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Inquire CTA Bar */}
            <div className="mt-4 pt-3 border-t border-[#E8D5C4] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="text-xs font-semibold text-[#2D211B] block">
                  Need {activeBrand.name} stock or pricing?
                </span>
                <span className="text-[10px] text-[#A67C63]">
                  Direct dispatch from Bangalore central facility.
                </span>
              </div>
              <button
                onClick={() => onOpenContact?.(`${activeBrand.name} - Supply Network Inquiry`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#6F5144] hover:bg-[#5C4337] rounded-xl transition-all shadow-xs cursor-pointer hover:scale-105"
              >
                <Send className="w-3 h-3" />
                <span>Inquire {activeBrand.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Lightbox Modal for Full HD Diagram */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-[#2D211B]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#FAF7F2] rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl border border-[#E8D5C4]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8D5C4]">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-[#2D211B] font-editorial">
                    Authorized Multi-Brand Integrated Product Supply Network
                  </h3>
                  <p className="text-xs text-[#A67C63] font-light">
                    Complete Industrial Portfolio &amp; Direct Factory Partnerships
                  </p>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1.5 rounded-full bg-[#E8D5C4]/40 hover:bg-[#E8D5C4] text-[#2D211B] transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-Res Image Preview */}
              <div className="bg-white rounded-2xl p-2 sm:p-4 border border-[#E8D5C4] flex items-center justify-center max-h-[70vh] overflow-auto">
                <img
                  src="/assets/aistudio/image_b3c5bf39.png"
                  alt="Multi-Brand Supply Network Diagram Full View"
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 mt-3 border-t border-[#E8D5C4] text-xs">
                <span className="text-[#6F5144]/80 font-light">
                  Covering Lapp, Eaton, Havells, Hager, Luminis, and Mennekes.
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="/assets/aistudio/image_b3c5bf39.png"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8D5C4] text-[#2D211B] hover:bg-white font-medium"
                  >
                    <span>Open Raw File</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      setIsLightboxOpen(false);
                      onOpenContact?.('Complete Supply Network Inquiry');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#6F5144] hover:bg-[#5C4337] text-[#FAF7F2] font-semibold transition-colors cursor-pointer"
                  >
                    <span>Inquire for Entire Portfolio</span>
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