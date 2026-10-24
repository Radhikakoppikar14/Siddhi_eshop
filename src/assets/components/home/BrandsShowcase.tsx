import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  Cpu,
  Radio,
  Zap,
} from "lucide-react";

export const BrandsShowcase: React.FC = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);

  const brands = [
    {
      id: "lapp",
      name: "LAPP KABEL GERMANY",
      shortName: "LAPP KABEL",
      country: "Germany · Stuttgart",
      products: "ÖLFLEX® Power & Control Cables",
      desc: "European benchmark oil-resistant flexible control cables, screened UNITRONIC® data lines, and IP68 SKINTOP® nickel-plated brass cable glands.",
      link: "/catalog?brand=LAPP+KABEL",
      logo: "/images/logo-lapp.png",
      image: "/images/lappproducts-groupimg.jpg",
      accentBg: "bg-red-600 hover:bg-red-700 text-white",
      cardTheme: "from-white via-[#F6F9FE] to-[#E4EEFB]",
      glowColor: "bg-blue-400/10",
      borderColor: "border-red-200 border-t-4 border-t-red-600",
      activeTabStyle: "bg-red-600 text-white border-red-600 shadow-md",
      icon: Cpu,
    },
    {
      id: "eaton",
      name: "EATON MOELLER",
      shortName: "EATON - MOELLER",
      country: "Germany · Bonn",
      products: "PKZM0 Breakers & DILM Contactors",
      desc: "Switching capacity up to 150 kA, differential phase-failure sensitivity, and electronic wide-range coil technology for modern automated industrial panels.",
      link: "/catalog?brand=EATON+-+MOELLER",
      logo: "/images/logo-eaton.png",
      image: "/images/eatonproducts-groupimg.jpg",
      accentBg: "bg-sky-600 hover:bg-sky-700 text-white",
      cardTheme: "from-white via-[#F2F9FE] to-[#DCEFFC]",
      glowColor: "bg-sky-400/20",
      borderColor: "border-sky-200 border-t-4 border-t-sky-500",
      activeTabStyle: "bg-sky-600 text-white border-sky-600 shadow-md",
      icon: Zap,
    },
    {
      id: "partex",
      name: "PARTEX SWEDEN",
      shortName: "PARTEX",
      country: "Sweden · Gullspång",
      products: "Wire & Cable Marking Systems",
      desc: "Precision PA closed chevron sleeves, ProMark T-1000 300dpi thermal transfer marker printers, and AISI 316 acid-proof stainless steel tags.",
      link: "/catalog?brand=PARTEX+SWEDEN",
      logo: "/images/logo-partex.png",
      image: "/images/partexproducts-groupimg.jpg",
      accentBg: "bg-amber-600 hover:bg-amber-700 text-white",
      cardTheme: "from-white via-amber-50 to-yellow-100",
      glowColor: "bg-amber-400/20",
      borderColor: "border-amber-200 border-t-4 border-t-amber-400",
      activeTabStyle: "bg-amber-300 text-amber-950 border-amber-400 shadow-md",
      icon: Radio,
    },
    {
      id: "mennekes",
      name: "MENNEKES GERMANY",
      shortName: "MENNEKES",
      country: "Germany · Kirchhundem",
      products: "CEE Plugs IP67 & AMAXX® Units",
      desc: "World leader in heavy-duty CEE industrial plugs, PowerTOP® Xtra rubberized connectors, and modular AMAPLAST power distribution enclosures.",
      link: "/catalog?brand=MENNEKES",
      logo: "/images/logo-mennekes.png",
      image: "/images/mennekesproducts-groupimg.jpg",
      accentBg: "bg-slate-600 hover:bg-slate-700 text-white",
      cardTheme: "from-white via-[#F7F8FA] to-[#E6EAF0]",
      glowColor: "bg-slate-400/15",
      borderColor: "border-slate-200 border-t-4 border-t-slate-500",
      activeTabStyle: "bg-slate-600 text-white border-slate-600 shadow-md",
      icon: Cpu,
    },
  ];

  const current = brands[activeBrandIndex];

  // Auto-rotate hero slider every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBrandIndex((prev) => (prev + 1) % brands.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [brands.length]);

  return (
    <section
      className="py-8 bg-[#F3F7FC] border-b border-slate-300 select-none"
      id="brandsSection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Engineering Command Console Box */}
        <div
          className={`bg-gradient-to-br ${current.cardTheme} text-slate-800 rounded-[2.5rem] p-6 sm:p-9 shadow-xl border ${current.borderColor} relative overflow-hidden flex flex-col justify-between transition-all duration-700 animate-fade-in`}
        >
          {/* Ambient Animated Glow */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 ${current.glowColor} rounded-full blur-3xl pointer-events-none transition-all duration-700`}
          />

          {/* TOP INTEGRATED BRAND COMMAND DOCK */}
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-800 font-bold">
              CHECK PRODUCTS ON SALES
            </span>
          </div>

          {/* Brand Switcher Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {brands.map((b, idx) => {
              const isActive = activeBrandIndex === idx;
              return (
                <button
                  key={b.id}
                  onClick={() => setActiveBrandIndex(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                    isActive
                      ? b.activeTabStyle
                      : "bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-800"
                  }`}
                >
                  <span className="bg-white rounded-md px-1.5 py-0.5 flex items-center shrink-0">
                    <img
                      src={b.logo}
                      alt={b.shortName}
                      className="h-3.5 object-contain max-w-[55px]"
                    />
                  </span>
                  <span className="truncate">{b.shortName.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* TOP META STATUS BAR */}
          <div className="flex items-center justify-between gap-3 flex-wrap relative z-10 my-4">
            <span className="px-3.5 py-1.5 rounded-full bg-white text-red-600 font-mono text-[11px] font-bold uppercase tracking-wider border border-red-200 flex items-center gap-2">
              <Sparkles size={13} className="text-red-500 animate-spin" />
              BRAND SPECIFIC MESSAGE
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white text-blue-800 font-mono text-[11px] font-semibold border border-blue-200 flex items-center gap-1.5">
              <PackageCheck size={13} className="text-blue-600" />
              PAN-INDIA DISPATCH
            </span>
          </div>

          {/* MIDDLE MAIN CONTENT STAGE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 my-2">
            {/* Left Column: Brand Telemetry & Actions */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="h-10 px-3.5 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm">
                  <img
                    src={current.logo}
                    alt={current.name}
                    className="h-5 object-contain max-w-[90px]"
                  />
                </div>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {current.country}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E3A8A] tracking-tight leading-tight">
                {current.products}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans line-clamp-3">
                {current.desc}
              </p>

              {/* Action Button */}
              <div className="pt-2 flex flex-row items-center gap-3 flex-wrap">
                <Link
                  to={current.link}
                  className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg flex flex-row items-center gap-2 transition-transform hover:scale-102 cursor-pointer whitespace-nowrap shrink-0 ${current.accentBg}`}
                >
                  <span>EXPLORE {current.shortName}</span>
                  <ArrowRight size={14} className="shrink-0" />
                </Link>
              </div>

              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-500">
                <span className="text-red-600 font-bold flex items-center gap-1">
                  <ShieldCheck size={13} /> DIRECT FACTORY RATES
                </span>
                <span>·</span>
                <span> ReadyStock XMX-Bangalore</span>
              </div>
            </div>

            {/* Right Column: Floating Live Product Hologram Stage */}
            <div className="md:col-span-5">
              <div className="rounded-[2rem] bg-[#DCEBFA] p-3 border border-[#BFD7EE] shadow-lg">
                <div className="bg-white text-slate-900 rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-3 group">
                  <div className="w-full aspect-square bg-slate-50 rounded-2xl border border-slate-200 p-3 flex items-center justify-center overflow-hidden shadow-inner max-h-[180px]">
                    <img
                      src={current.image}
                      alt={current.products}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full flex items-center justify-between text-[11px] font-mono px-1">
                    <span className="text-blue-800 font-bold bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-300">
                      Authorized Stockist
                    </span>
                    <span className="text-slate-700 font-bold flex items-center gap-1">
                      <ShieldCheck size={12} className="text-blue-600" /> 100%
                      Genuine
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM TELEMETRY & SLIDER CONTROLS (NON-CLICKABLE INDICATORS) */}
          <div className="pt-5 mt-4 border-t border-slate-200 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              {brands.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    activeBrandIndex === i
                      ? "w-8 bg-red-600"
                      : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActiveBrandIndex((prev) =>
                    prev === 0 ? brands.length - 1 : prev - 1,
                  )
                }
                className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-800 transition-colors border border-slate-300 cursor-pointer shadow-sm"
                aria-label="Previous brand"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setActiveBrandIndex((prev) => (prev + 1) % brands.length)
                }
                className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-800 transition-colors border border-slate-300 cursor-pointer shadow-sm"
                aria-label="Next brand"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
