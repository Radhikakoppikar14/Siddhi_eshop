import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const PromoCards: React.FC = () => {
  const brandCards = [
    {
      brand: "LAPP KABEL",
      origin: "Germany · Stuttgart",
      title: "Cables & Connection Systems",
      desc: "ÖLFLEX® control cables, UNITRONIC® data lines, SKINTOP® cable glands, and high-temp industrial wiring.",
      image: "/images/card-olflex.jpg",
      link: "/about-lapp",
      catalogCount: "4,500+ SKUs",
      highlights: ["ÖLFLEX CLASSIC 110", "UNITRONIC LiYCY", "SKINTOP MS-M"],
      theme: {
        cardBg: "bg-white hover:bg-rose-50/20",
        border: "border-rose-200/90 hover:border-rose-300",
        badge: "bg-rose-50 text-rose-700 border border-rose-200",
        accent: "text-rose-600",
      },
    },
    {
      brand: "EATON - MOELLER",
      origin: "Germany · Bonn",
      title: "Motor Control & Switchgear",
      desc: "PKZM0 motor protective circuit breakers, DILM power contactors, and NZM molded case circuit breakers.",
      image: "/images/eaton-dilm.jpg",
      link: "/about-eaton",
      catalogCount: "3,200+ SKUs",
      highlights: ["PKZM0 Motor Starters", "DILM Contactors", "RMQ-Titan Pushbuttons"],
      theme: {
        cardBg: "bg-white hover:bg-sky-50/20",
        border: "border-sky-200/90 hover:border-sky-300",
        badge: "bg-sky-50 text-sky-700 border border-sky-200",
        accent: "text-sky-600",
      },
    },
    {
      brand: "PARTEX SWEDEN",
      origin: "Sweden · Gullspång",
      title: "Industrial Identification",
      desc: "PA closed chevron wire markers, PC open clip-on markers, and ProMark T-1000 high-speed thermal printers.",
      image: "/images/partex-promark.jpg",
      link: "/about-partex",
      catalogCount: "1,800+ SKUs",
      highlights: ["PA Chevron Markers", "ProMark T-1000 Printer", "PKS SS316 Acid Proof"],
      theme: {
        cardBg: "bg-white hover:bg-rose-50/20",
        border: "border-rose-200/90 hover:border-rose-300",
        badge: "bg-rose-50 text-rose-700 border border-rose-200",
        accent: "text-rose-600",
      },
    },
    {
      brand: "MENNEKES",
      origin: "Germany · Kirchhundem",
      title: "CEE Plugs & Enclosures",
      desc: "PowerTOP® Xtra industrial plugs, AMAXX® modular distribution panels, and EverGUM® rubber field distributors.",
      image: "/images/menn-amaxx.jpg",
      link: "/about-mennekes",
      catalogCount: "1,200+ SKUs",
      highlights: ["PowerTOP Xtra 16A-125A", "AMAXX Enclosures", "EverGUM Solid Rubber"],
      theme: {
        cardBg: "bg-white hover:bg-slate-50/20",
        border: "border-slate-200/90 hover:border-slate-300",
        badge: "bg-slate-50 text-slate-700 border border-slate-200",
        accent: "text-slate-600",
      },
    },
  ];

  return (
    <section className="py-12 lg:py-16 select-none bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                STRATEGIC OEM ALLIANCES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Four Tier-1 European Engineering Alliances
            </h2>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-medium">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>Direct Manufacturer Warranty · Zero Grey Market</span>
          </div>
        </div>

        {/* 4 Bento Cards with Clean Light Minimalist Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {brandCards.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className={`${card.theme.cardBg} rounded-3xl border ${card.theme.border} p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover-card-lift`}
            >
              <div>
                {/* Image Stage on Clean White Pedestal */}
                <div className="h-40 w-full rounded-2xl bg-slate-50/70 p-3 mb-4 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:bg-white transition-colors">
                  <img
                    src={card.image}
                    alt={card.brand}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${card.theme.badge}`}>
                    {card.origin}
                  </span>
                  <span className="text-slate-500 font-semibold">{card.catalogCount}</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors mt-1">
                  {card.brand}
                </h3>
                <h4 className="text-xs font-semibold text-slate-600 mt-0.5">
                  {card.title}
                </h4>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                  {card.desc}
                </p>

                {/* Highlights */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  {card.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle2 size={12} className={`${card.theme.accent} shrink-0`} />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bottom */}
              <div className={`mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${card.theme.accent} transition-colors`}>
                <span>View Make Sheet</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
