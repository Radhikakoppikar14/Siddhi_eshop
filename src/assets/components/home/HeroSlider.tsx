import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";

type Accent = "amber" | "sky" | "emerald" | "purple";

const ACCENTS: Record<
  Accent,
  {
    dot: string;
    text: string;
    chip: string;
    solidBtn: string;
    glow: string;
    ring: string;
  }
> = {
  amber: {
    dot: "bg-rose-400",
    text: "text-rose-300",
    chip: "bg-rose-400/10 text-rose-300 border-rose-400/25",
    solidBtn: "bg-rose-400 hover:bg-rose-300 text-slate-800",
    glow: "from-rose-500/25 via-rose-500/10 to-transparent",
    ring: "ring-rose-400/40",
  },
  sky: {
    dot: "bg-sky-400",
    text: "text-sky-300",
    chip: "bg-sky-400/10 text-sky-300 border-sky-400/25",
    solidBtn: "bg-sky-400 hover:bg-sky-300 text-slate-800",
    glow: "from-sky-500/25 via-indigo-500/10 to-transparent",
    ring: "ring-sky-400/40",
  },
  emerald: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    chip: "bg-amber-400/10 text-amber-200 border-amber-400/25",
    solidBtn: "bg-amber-300 hover:bg-amber-200 text-amber-950",
    glow: "from-amber-400/25 via-yellow-400/10 to-transparent",
    ring: "ring-amber-300/40",
  },
  purple: {
    dot: "bg-slate-400",
    text: "text-slate-300",
    chip: "bg-slate-400/10 text-slate-300 border-slate-400/25",
    solidBtn: "bg-slate-400 hover:bg-slate-300 text-slate-800",
    glow: "from-slate-500/25 via-indigo-500/10 to-transparent",
    ring: "ring-slate-400/40",
  },
};

interface SlideData {
  id: string;
  tabLabel: string;
  tabSub: string;
  accent: Accent;
  brandTag: string;
  headline: string;
  description: string;
  exploreText: string;
  exploreLink: string;
  brandLogo: string;
  productImage: string;
  secondaryImage?: string;
  sampleItem: {
    id: string;
    name: string;
    partNo: string;
    brand: string;
    price: number;
    unit: string;
  };
}

interface HeroSliderProps {
  onSelectBrand?: (brandId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectBrand }) => {
  const { addCustomItem } = useCart();
  const { showToast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides: SlideData[] = [
    {
      id: "lapp",
      tabLabel: "LAPP",
      tabSub: "ÖLFLEX® Cables & Glands",
      accent: "amber",
      brandTag: "Lapp Kabel · Stuttgart, Germany",
      headline: "ÖLFLEX® Power & Control Cables",
      description:
        "European benchmark in oil-resistant flexible control cables, screened UNITRONIC® data lines, and IP68 SKINTOP® nickel-plated brass cable glands.",
      exploreText: "Explore Lapp cables",
      exploreLink: "/about-lapp",
      brandLogo: "/images/logo-lapp.png",
      productImage: "/images/cable-olflex-angle.png",
      secondaryImage: "/images/card-olflex.jpg",
      sampleItem: {
        id: "hero-olflex-110",
        name: "ÖLFLEX® CLASSIC 110 Control Cable 4G 1.5 sq mm",
        partNo: "1119304",
        brand: "LAPP KABEL",
        price: 98,
        unit: "meter",
      },
    },
    {
      id: "eaton",
      tabLabel: "EATON",
      tabSub: "Motor Starters & Switchgear",
      accent: "sky",
      brandTag: "Eaton - Moeller · Germany / USA",
      headline: "PKZM0 Breakers & DILM Contactors",
      description:
        "Switching capacity up to 150 kA, differential phase-failure sensitivity, and electronic wide-range coil technology for modern automated industrial panels.",
      exploreText: "Explore Eaton switchgear",
      exploreLink: "/about-eaton",
      brandLogo: "/images/logo-eaton.png",
      productImage: "/images/eaton-pkzm0.jpg",
      secondaryImage: "/images/eaton-dilm.jpg",
      sampleItem: {
        id: "hero-pkzm0-16",
        name: "PKZM0-16 Motor Protective Circuit Breaker (10-16A)",
        partNo: "PKZM0-16",
        brand: "EATON - MOELLER",
        price: 3450,
        unit: "pc",
      },
    },
    {
      id: "partex",
      tabLabel: "PARTEX",
      tabSub: "Wire Marking & Printers",
      accent: "emerald",
      brandTag: "Partex Sweden · Gullspång, Sweden",
      headline: "ProMark T-1000 & Chevron Markers",
      description:
        "Precision closed chevron wire sleeves, snap-on markers, and portable 300 dpi thermal transfer printers for industrial electrical panel identification.",
      exploreText: "Explore Partex marking",
      exploreLink: "/about-partex",
      brandLogo: "/images/logo-partex.png",
      productImage: "/images/partex-promark.jpg",
      secondaryImage: "/images/partex-pa.jpg",
      sampleItem: {
        id: "hero-promark-t1000",
        name: "ProMark T-1000 Thermal Transfer Marking Machine",
        partNo: "PROMARK-T1000",
        brand: "PARTEX SWEDEN",
        price: 68500,
        unit: "set",
      },
    },
    {
      id: "mennekes",
      tabLabel: "MENNEKES",
      tabSub: "CEE Plugs IP67 & AMAXX",
      accent: "purple",
      brandTag: "Mennekes · Kirchhundem, Germany",
      headline: "PowerTOP® Xtra Plugs & AMAXX® Enclosures",
      description:
        "Industry-defining standard in heavy-duty 16A-125A industrial CEE plugs, switched interlocked sockets, and drop-proof EverGUM® rubber power distributors.",
      exploreText: "Explore Mennekes plugs",
      exploreLink: "/about-mennekes",
      brandLogo: "/images/logo-mennekes.png",
      productImage: "/images/menn-powertop.jpg",
      secondaryImage: "/images/menn-amaxx.jpg",
      sampleItem: {
        id: "hero-powertop-32a",
        name: "PowerTOP® Xtra 32A 5P IP67 Industrial Plug",
        partNo: "13512",
        brand: "MENNEKES",
        price: 2840,
        unit: "pc",
      },
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const slide = slides[currentSlide];
  const a = ACCENTS[slide.accent];

  const handleQuickAdd = () => {
    addCustomItem(
      slide.sampleItem,
      slide.sampleItem.unit === "meter" ? 100 : 1,
    );
    showToast(`Added ${slide.sampleItem.name} to RFQ Cart!`);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#144586] py-16 sm:py-20 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient backdrop, tinted to the active brand */}
      <div className="pointer-events-none absolute inset-0 transition-colors duration-700">
        <div
          className={`absolute -top-32 left-1/3 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br ${a.glow} blur-3xl transition-all duration-700`}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Active slide content */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${a.chip}`}
              >
                <ShieldCheck size={12} />
                Authorised OEM channel partner
              </span>
              <span className="hidden sm:inline-flex text-[11px] text-slate-400">
                Pan-India warehouse dispatch
              </span>
            </div>

            <div className="px-6 sm:px-8 py-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 px-3 bg-white rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                      <img
                        src={slide.brandLogo}
                        alt={slide.tabLabel}
                        className="h-4 w-auto object-contain max-w-[70px]"
                      />
                    </div>
                    <span className={`text-xs font-medium ${a.text}`}>
                      {slide.brandTag}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-black text-white tracking-tight leading-[1.15]">
                    {slide.headline}
                  </h1>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {onSelectBrand ? (
                      <button
                        type="button"
                        onClick={() => onSelectBrand(slide.id)}
                        className={`px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] ${a.solidBtn}`}
                      >
                        <span>{slide.exploreText}</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      <Link
                        to={slide.exploreLink}
                        className={`px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] ${a.solidBtn}`}
                      >
                        <span>{slide.exploreText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleQuickAdd}
                      className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 text-sm font-medium transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                    >
                      <FileText size={14} className={a.text} />
                      <span>Quick add to RFQ</span>
                    </button>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xl">
                    <div className="h-36 w-full bg-white rounded-xl flex items-center justify-center gap-2 overflow-hidden">
                      <img
                        src={slide.productImage}
                        alt={slide.headline}
                        className="max-h-full max-w-[48%] object-contain"
                      />
                      {slide.secondaryImage && (
                        <img
                          src={slide.secondaryImage}
                          alt={slide.headline}
                          className="max-h-full max-w-[48%] object-contain"
                        />
                      )}
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-800">
                        Authorized stockist
                      </span>
                      <span className="font-medium text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <CheckCircle2 size={10} /> 100% genuine
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      currentSlide === idx
                        ? `w-8 ${ACCENTS[s.accent].dot}`
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                  aria-label="Next slide"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Brand list */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {slides.map((tab, idx) => {
              const isActive = currentSlide === idx;
              const ta = ACCENTS[tab.accent];
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 py-3.5 px-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3.5 group cursor-pointer border ${
                    isActive
                      ? `bg-white/[0.06] border-white/15 ring-1 ${ta.ring}`
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                  }`}
                  aria-label={`Select ${tab.tabLabel} portfolio`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={tab.brandLogo}
                      alt={tab.tabLabel}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${ta.dot}`} />
                      <span
                        className={`text-[11px] font-medium truncate ${isActive ? ta.text : "text-slate-500"}`}
                      >
                        {tab.tabLabel}
                      </span>
                    </div>
                    <h4
                      className={`text-xs sm:text-sm font-semibold tracking-tight leading-tight truncate ${isActive ? "text-white" : "text-slate-300"}`}
                    >
                      {tab.tabSub}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
