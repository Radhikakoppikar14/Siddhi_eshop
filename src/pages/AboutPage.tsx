import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ZoomIn,
  X,
  Sparkles,
  ArrowRight,
  Users,
  Building2,
  Target,
  Compass,
  CheckCircle2,
  Play
} from 'lucide-react';
import { WhyChooseUs } from '../components/WhyChooseUs';

interface AboutPageProps {
  onGoToContact?: (subject?: string) => void;
}

const AUTHORIZED_PARTNERS = [
  'LAPP INDIA PVT LTD',
  'EATON Power Quality Pvt Ltd',
  'PARTEX Marking Systems',
  'MENNEKES Electric India Pvt Ltd',
];

export const AboutPage: React.FC<AboutPageProps> = ({ onGoToContact }) => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const handleInquire = (topic: string) => {
    if (onGoToContact) {
      onGoToContact(topic);
    }
  };

  return (
    <div className="bg-[#FFFAF6] text-[#231815] overflow-hidden">
      {/* 1. Header Banner with Modern Industrial Image Background */}
      <section className="relative bg-[#FFFAF6] text-[#231815] py-10 sm:py-14 overflow-hidden border-b border-[#F1D9CA] select-none">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src="/assets/aistudio/demoo1.mp4"
            poster="/assets/aistudio/image_bf77cdd3.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            ref={(v) => { if (v) { v.muted = true; v.play().catch(() => {}); } }}
            className="no-zoom absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFAF6]/90 via-[#FFFAF6]/62 to-[#FFFAF6]/12" />
          
          {/* Floating Animated Ambient Glows */}
          <div className="absolute top-1/4 -right-16 w-96 h-96 bg-[#D2430F]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -left-16 w-80 h-80 bg-[#D2430F]/8 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-8 space-y-4"
            >
              {/* Clean Sleek Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#F1D9CA] text-[#231815] text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#5F524C]" />
                <span>Established 2008 · Bangalore, India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight font-editorial text-[#231815] uppercase drop-shadow-md">
                ABOUT SIDDHI KABEL
              </h1>

              <p className="text-sm sm:text-base text-[#231815]/90 font-light max-w-2xl leading-relaxed drop-shadow-sm">
                Dependable Electrical, Automation &amp; Safety Solutions for Indian Industry &amp; Multinationals.
              </p>

              {/* Breadcrumb: Home | About Us */}
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#5F524C]">
                <Link to="/" className="hover:text-[#231815] transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
                <span className="text-[#5F524C]/60">|</span>
                <span className="text-[#231815] font-semibold underline underline-offset-4 decoration-[#5F524C]">
                  About Us
                </span>
              </div>
            </motion.div>

            {/* Right Side: Live Floating Fast-Fact Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-4 hidden lg:flex flex-col gap-3"
            >
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#F1D9CA] shadow-lg flex items-center gap-3.5 hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F1D9CA]/70 border border-[#F1D9CA] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#5F524C]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231815] uppercase tracking-wider">Direct OEM Supply</h4>
                  <p className="text-[11px] text-[#5F524C] font-light">100% genuine factory certified products</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#F1D9CA] shadow-lg flex items-center gap-3.5 hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F1D9CA]/70 border border-[#F1D9CA] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#5F524C]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231815] uppercase tracking-wider">Bangalore Central Hub</h4>
                  <p className="text-[11px] text-[#5F524C] font-light">Same-day Karnataka dispatch &amp; buffer stock</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Main About Section */}
      <section className="py-14 sm:py-20 bg-[#FFFAF6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb bar on top of content area */}
          <div className="mb-8 flex items-center text-xs font-medium text-[#5F524C]">
            <span className="text-[#D2430F] mr-2">←</span>
            <Link to="/" className="hover:text-[#231815] transition-colors">Home</Link>
            <span className="mx-2 text-[#5F524C]">|</span>
            <span className="text-[#231815] font-semibold">About Us</span>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left Column: Opening narrative & Tree graphic */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-sm sm:text-base text-[#231815]/85 leading-relaxed font-normal"
            >
              <p className="text-justify">
                <span className="font-semibold text-[#231815]">Siddhi Kabel</span> was established in the year 2008 by professionals with experience of more than 15 years in providing solutions for various needs of high quality Industrial electrical, automation and safety products.
              </p>

              <p className="text-justify">
                Siddhi is one of the leading channel partners of world class, Indian and international manufacturers, offering wide range of products like LT &amp; HT Cables, Cable - Glands, Conduits, Connectors, Complete range of LED Lighting solutions for domestic, Commercial &amp; Industrial needs, Switchgears, Circuit breakers – MCB, MCCB, ELCB, RCCB, Distribution boards, Safety relays, Isolators, Maintenance free Chemical Electrical Grounding / earthing solutions, Lightning arrestors as per IS – IEC standards, Insulated Plugs &amp; Sockets and much more.
              </p>

              <p className="text-justify">
                For many customers Siddhi Kabel is more than a supplier, we combine superior product offerings with unparalleled technical support and supply chain services, Whether its providing products &amp; services for a Machine tool industries, Pharmaceutical, Process industry, automotive, Oil &amp; Gas, Chemical &amp; Paint industries, projects, or System integrators, we know our customers are looking for more than a supply of parts and pieces, we focus on addressing our customers larger business needs.
              </p>

              {/* The Tree Graphic */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative bg-white p-5 rounded-3xl border border-[#F1D9CA] shadow-xs group overflow-hidden mt-6"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F1D9CA]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D2430F] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#231815]">
                      Siddhi Kabel Core Strengths &amp; Pillars
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: '/images/resource/about.jpg',
                        alt: 'Siddhi Kabel Strengths Tree Infographic',
                        caption: 'Siddhi Kabel Value Proposition & Integrated Core Strengths',
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-[#5F524C] hover:text-[#231815] font-semibold transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#5F524C]" />
                    <span>Click to Zoom</span>
                  </button>
                </div>

                <div
                  className="relative cursor-pointer overflow-hidden rounded-2xl bg-[#FFFAF6] flex items-center justify-center p-2"
                  onClick={() =>
                    setLightboxImage({
                      src: '/images/resource/about.jpg',
                      alt: 'Siddhi Kabel Strengths Tree Infographic',
                      caption: 'Siddhi Kabel Value Proposition & Integrated Core Strengths',
                    })
                  }
                >
                  <img
                    src="/images/resource/about.jpg"
                    alt="Siddhi Kabel Core Strengths Tree Graphic"
                    className="w-full max-h-[460px] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-[#FFF1E8] transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white/90 text-[#231815] rounded-xl text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-[#F1D9CA]/30">
                      <ZoomIn className="w-3.5 h-3.5 text-[#D2430F]" /> Click to enlarge infographic
                    </span>
                  </div>
                </div>

                {/* Micro-pills for key tree branches */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F1D9CA] text-[11px] text-[#231815]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D2430F] shrink-0" />
                    <span>Reliable Solution Provider</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D2430F] shrink-0" />
                    <span>Ethical Business Compliance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D2430F] shrink-0" />
                    <span>Customized Inventory Buffer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D2430F] shrink-0" />
                    <span>Dedicated Technical Team</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-sm sm:text-base text-[#231815]/85 leading-relaxed font-normal flex flex-col justify-between h-full"
            >
              <p className="text-justify">
                We constantly monitor and adjust each program so that when our customers' needs change our solutions change with them, our expertise lies in understanding the customer requirements and careful analysis of applications to provide the best possible techno commercial solutions, our team strives hard in planning and managing best inventory apart from arranging and sourcing of materials from our large and reliable network to offer uninterrupted services to our valued customers.
              </p>

              {/* Authorized Distributors Section */}
              <div className="bg-white p-6 rounded-3xl border border-[#F1D9CA] space-y-4 shadow-2xs">
                <h3 className="text-base sm:text-lg font-semibold text-[#231815] leading-snug">
                  Siddhi is Authorized Distributors / Dealers / Channel partners / Importer with world class major manufacturing companies:
                </h3>

                <ul className="space-y-2.5 pt-1">
                  {AUTHORIZED_PARTNERS.map((partner, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#231815] group cursor-pointer"
                      onClick={() => handleInquire(`Authorized Line: ${partner}`)}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D2430F] shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="group-hover:text-[#5F524C] transition-colors">{partner}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="w-24 h-0.5 bg-[#D2430F] my-4" />
              </div>

              {/* Services Paragraph */}
              <p className="text-justify">
                On the services side we take up auditing &amp; installation of Electrical earth pits, Lightning arrestors, we take up supply and installation of all kinds of LED Light fittings for retrofit and new establishments, we offer customized electrical control equipment’s and wire harnessing to our valued customers.
              </p>

              {/* Motto & Continuous Improvement Paragraph */}
              <p className="text-justify">
                With customer centric approach and constant focus on continuous improvement has helped us to serve our customers better and achieve higher customer satisfaction, with quality as a focus would always be the priority in all our activities and delivering on time if not earlier would be our motto.
              </p>

              {/* Stats Box */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-[#F1D9CA] shadow-xs hover:shadow-xl transition-all p-6 grid grid-cols-3 divide-x divide-[#F1D9CA] text-center mt-4"
              >
                <div className="px-2">
                  <span className="block text-3xl sm:text-4xl font-normal text-[#5F524C] font-editorial tabular-nums">
                    15+
                  </span>
                  <span className="block text-xs sm:text-sm text-[#D2430F] font-medium mt-1">
                    Years Experience
                  </span>
                </div>

                <div className="px-2">
                  <span className="block text-3xl sm:text-4xl font-normal text-[#5F524C] font-editorial tabular-nums">
                    20+
                  </span>
                  <span className="block text-xs sm:text-sm text-[#D2430F] font-medium mt-1">
                    Industrial Segments
                  </span>
                </div>

                <div className="px-2">
                  <span className="block text-3xl sm:text-4xl font-normal text-[#5F524C] font-editorial tabular-nums">
                    300+
                  </span>
                  <span className="block text-xs sm:text-sm text-[#D2430F] font-medium mt-1">
                    Customers Served
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5. Corporate Video Feature: Precision Industrial Infrastructure in Action (YouTube e3a0qpri5NA) */}
      <section className="py-16 sm:py-24 bg-[#FFF1E8] border-y border-[#F1D9CA] relative overflow-hidden">
        {/* Subtle decorative ambient glows */}
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>Official Video Presentation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight">
              Siddhi Kabel Industrial Capability in Action
            </h2>
            <div className="w-16 h-0.5 bg-[#D2430F] mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-sm sm:text-base text-[#5F524C]/80 font-light max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive cable supply, specialized machine harness integration, and central Bangalore warehouse logistics.
            </p>
          </div>

          {/* 16:9 Video Embed Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA] bg-black relative group"
          >
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <iframe
                src="https://www.youtube-nocookie.com/embed/e3a0qpri5NA?rel=0&modestbranding=1"
                title="Siddhi Kabel Corporate Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>

            {/* Video footer bar */}
            <div className="p-4 sm:p-5 bg-[#FFF1E8] text-[#231815] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F1D9CA]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D2430F] flex items-center justify-center text-white shrink-0">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-[#231815] block">
                    Siddhi Kabel Corporate &amp; Engineering Reel
                  </span>
                  <span className="text-[11px] text-[#5F524C] font-light block">
                    Authorised Industrial Cables, Automation Switchgear &amp; Safety Systems
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInquire('Corporate Video Inquiry')}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-colors cursor-pointer shadow-md shrink-0 border border-[#F1D9CA]/30"
              >
                <span>Request Facility Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-16 sm:py-24 bg-[#FFF1E8] relative overflow-hidden text-[#231815] border-b border-[#F1D9CA]">
        {/* Ambient background glow */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#D2430F] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#D2430F]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5F524C] px-3 py-1 rounded-full bg-white border border-[#F1D9CA]/30">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-light font-editorial mt-3 text-[#231815]">
              Vision &amp; Mission of Siddhi Kabel
            </h2>
            <div className="w-16 h-0.5 bg-[#F1D9CA] mx-auto mt-3" />
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {/* Top-Left: Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFAF6] text-[#231815] p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative group border border-[#F1D9CA]"
            >
              <div className="p-3 bg-[#FFF1E8] rounded-2xl text-[#5F524C] mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-[#5F524C]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#231815] font-editorial">
                Vision
              </h3>
              <div className="w-14 h-0.5 bg-[#D2430F] my-4" />
              <p className="text-sm sm:text-base text-[#5F524C]/80 font-light leading-relaxed max-w-sm">
                To be a leading, preferred and respected solution partner to our valuable customers in the field of electrical products &amp; services.
              </p>
              <button
                onClick={() => handleInquire('Vision & Solutions Inquiry')}
                className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#5F524C] hover:text-[#231815] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Top-Right: Outdoor Team Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
                            transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-[#F1D9CA] group cursor-pointer min-h-[280px]"
              onClick={() =>
                setLightboxImage({
                  src: '/images/resource/about2.jpg',
                  alt: 'Siddhi Kabel Corporate Team Bangalore',
                  caption: 'Siddhi Kabel Executive Leadership & Operations Team',
                })
              }
            >
              <img
                decoding="async"
                loading="eager"
                src="/images/resource/about2.jpg"
                alt="Siddhi Kabel Team Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#231815] bg-white/80 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 border border-[#F1D9CA]/30">
                    <Users className="w-3.5 h-3.5 text-[#D2430F]" /> Leadership &amp; Engineering Team
                  </span>
                  <span className="p-1.5 rounded-full bg-white text-white group-hover:bg-[#D2430F] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom-Left: Indoor Laptop Meeting Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
                            transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-[#F1D9CA] group cursor-pointer min-h-[280px] order-last md:order-none"
              onClick={() =>
                setLightboxImage({
                  src: '/images/resource/about3.jpg',
                  alt: 'Siddhi Kabel Technical Consultation Team',
                  caption: 'Siddhi Kabel Technical Solution Analysis & Application Engineering',
                })
              }
            >
              <img
                decoding="async"
                loading="eager"
                src="/images/resource/about3.jpg"
                alt="Siddhi Kabel Team Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#231815] bg-white/80 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 border border-[#F1D9CA]/30">
                    <Target className="w-3.5 h-3.5 text-[#D2430F]" /> Technical Review &amp; Client Support
                  </span>
                  <span className="p-1.5 rounded-full bg-white text-white group-hover:bg-[#D2430F] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom-Right: Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFAF6] text-[#231815] p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative group border border-[#F1D9CA]"
            >
              <div className="p-3 bg-[#FFF1E8] rounded-2xl text-[#5F524C] mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-[#5F524C]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#231815] font-editorial">
                Mission
              </h3>
              <div className="w-14 h-0.5 bg-[#D2430F] my-4" />
              <p className="text-sm sm:text-base text-[#5F524C]/80 font-light leading-relaxed max-w-sm">
                Work towards continuous improvement, stay focused on achieving customer satisfaction.
              </p>
              <button
                onClick={() => handleInquire('Mission & Continuous Improvement')}
                className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#5F524C] hover:text-[#231815] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section with Interactive Animated Counters */}
      <WhyChooseUs />

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FFF1E8] backdrop-blur-sm backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#FFFAF6] rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA] p-4 text-[#231815]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-[#F1D9CA]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
                  <span className="text-xs sm:text-sm font-semibold">{lightboxImage.caption}</span>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full bg-[#FFF1E8] hover:bg-[#F1D9CA] text-[#231815] transition-colors cursor-pointer"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 overflow-auto max-h-[75vh] flex items-center justify-center bg-white rounded-2xl p-2 border border-[#F1D9CA]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-[#5F524C]/80">
                <span>Authorized Siddhi Kabel Corporate Archives</span>
                <button
                  onClick={() => {
                    setLightboxImage(null);
                    handleInquire(`Inquiry from image: ${lightboxImage.caption}`);
                  }}
                  className="px-4 py-2 bg-[#D2430F] hover:bg-[#A8340A] text-[#FFFAF6] rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Inquire About This Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};