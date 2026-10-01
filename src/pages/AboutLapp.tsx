import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileText,
  Award,
  Cpu,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const AboutLapp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("power");

  const lappCategories = [
    {
      id: "power",
      catId: "power",
      index: "01",
      code: "SERIES 01 // POWER AND CONTROL CABLES",
      title: "Power and control cables",
      shortTitle: "Power and control cables",
      desc: "ÖLFLEX® classic oil-resistant flexible control and power cables including SY steel wire braided and CY EMC screened variants for machinery and automated production lines.",
      specs:
        "VDE Reg. No. 7030 · PVC / PUR outer sheath · Flame retardant to IEC 60332-1-2 · -40°C to +80°C",
      products: [
        "ÖLFLEX® CLASSIC 110 (Numbered black cores + earth 0.5 to 35mm²)",
        "ÖLFLEX® CLASSIC 110 SY (Galvanised steel wire braid armour)",
        "ÖLFLEX® CLASSIC 110 CY (Tinned copper braided EMC screen)",
        "ÖLFLEX® 100 I (Flexible multi-core industrial control cable)",
      ],
      image: "/images/card-olflex.jpg",
    },
    {
      id: "data",
      catId: "data",
      index: "02",
      code: "SERIES 02 // DATA COMMUNICATION CABLES",
      title: "Data communication cables",
      shortTitle: "Data communication cables",
      desc: "UNITRONIC® high-speed sensor, instrumentation, and data communication cables including twisted-pair (TP) and overall copper braid screening for automated signal transmission.",
      specs:
        "Low capacitance · Optimum screening against electrical interference · Tinned copper braided shield",
      products: [
        "UNITRONIC® LiYCY (TP) (Twisted pair overall copper screened data cable)",
        "UNITRONIC® LiYY (TP) (Twisted pair unscreened instrumentation cable)",
        "UNITRONIC® LiYY (Fine-wire electronic control and signal cable)",
        "UNITRONIC® LiYCY (Overall copper braided instrumentation cable)",
      ],
      image: "/images/card-unitronic.jpg",
    },
    {
      id: "house",
      catId: "house",
      index: "03",
      code: "SERIES 03 // HOUSE WIRING CABLES",
      title: "Single core for domestic purpose / house wiring",
      shortTitle: "Single core for domestic purpose / house wiring",
      desc: "ÖLFLEX® INFRA FRLS single core building wires engineered for safe domestic and commercial building installations with high temperature withstand and low smoke properties.",
      specs:
        "FRLS insulation · Low smoke emission · High current carrying capacity · Multiple color options",
      products: [
        "ÖLFLEX® INFRA FRLS 1X1 (Black, Blue, Red, Yellow, Green, Grey)",
        "ÖLFLEX® INFRA FRLS 1X1.5 (High performance building wire)",
        "ÖLFLEX® INFRA FRLS 1X2.5 (Residential & commercial lighting circuit wire)",
        "ÖLFLEX® INFRA FRLS 1X4 & 1X6 (Heavy appliance power wiring)",
      ],
      image: "/images/card-cables.jpg",
    },
    {
      id: "cabinet",
      catId: "cabinet",
      index: "04",
      code: "SERIES 04 // CONTROL CABINET SINGLE CORES",
      title: "Control cabinet single cores",
      shortTitle: "Control cabinet single cores",
      desc: "ÖLFLEX® UNIPLUS FR and FRLS panel wiring single cores with bright annealed electrolytic copper and heat-resistant insulation for switchgear, control desks, and relays.",
      specs:
        "450/750V rating · IS:694 & HAR standard · Class 5 flexible copper · Full color-coded range",
      products: [
        "ÖLFLEX® UNIPLUS FR (Flame retardant panel wiring single core)",
        "ÖLFLEX® UNIPLUS FRLS (Low smoke flame retardant switchboard wire)",
        "Fine-stranded electrolytic copper conductor up to 240mm²",
        "Complete color coding (GNYE, BK, BU, BN, RD, WH, GY, YE, GN)",
      ],
      image: "/images/card-cables.jpg",
    },
    {
      id: "glands-metric-pg",
      catId: "glands-metric-pg",
      index: "05",
      code: "SERIES 05 // CABLE GLANDS (METRIC & PG)",
      title: "Cable glands in metric & PG size",
      shortTitle: "Cable glands in metric & PG size",
      desc: "SKINTOP® worldwide patented cable entry systems providing reliable IP68 strain relief, liquid tightness, and vibration-proof metric & PG locking for electrical enclosures.",
      specs:
        "Metric M12 to M63 & PG 7 to PG 48 · Nickel-plated Brass & Polyamide · IP68 10 Bar pressure tightness",
      products: [
        "SKINTOP® ST-M (Polyamide metric cable glands M12 to M63)",
        "SKINTOP® ST PG (Panzer-Gewinde PG 7 to PG 48 cable glands)",
        "Available in RAL 7001 Silver-Grey, RAL 9005 Black, and RAL 7035 Light Grey",
      ],
      image: "/images/card-skintop.jpg",
    },
    {
      id: "locknut-metric-pg",
      catId: "locknut-metric-pg",
      index: "06",
      code: "SERIES 06 // COUNTER NUTS (METRIC & PG)",
      title: "Cable counter nuts in metric & PG size",
      shortTitle: "Cable counter nuts in metric & PG size",
      desc: "SKINTOP® durable metric and PG lock nuts designed to secure cable entries and conduit fittings safely onto threaded switchboard knockouts and enclosures.",
      specs:
        "Metric M12-M63 & PG 7-PG 48 · Glass-fiber reinforced polyamide · Secure vibration-resistant grip",
      products: [
        "SKINTOP® GMP-GL-M (Polyamide metric lock nuts)",
        "SKINTOP® GMP-GL PG (Polyamide PG thread lock nuts)",
        "Standard colors: SGY Silver-Grey, BK Black, LGY Light Grey",
      ],
      image: "/images/card-skintop.jpg",
    },
    {
      id: "klick",
      catId: "klick",
      index: "07",
      code: "SERIES 07 // KLICK CONDUIT FITTINGS",
      title: "Klick for rills / conduits",
      shortTitle: "Klick for rills / conduits",
      desc: "SILVYN® KLICK quick-assembly snap-in conduit fittings providing robust mechanical connection for corrugated protective tubing.",
      specs:
        "Metric M12 to M63 connections · Quick assembly · IP67 system rating · Vibration resistant",
      products: [
        "SILVYN® KLICK M12 to M63 straight conduit connectors (Grey / Black)",
        "Secure quick-mounting snap-in locking mechanism for corrugated rills",
      ],
      image: "/images/card-cables.jpg",
    },
    {
      id: "rill",
      catId: "rill",
      index: "08",
      code: "SERIES 08 // PROTECTIVE CONDUITS",
      title: "Protective rills / conduits",
      shortTitle: "Protective rills / conduits",
      desc: "SILVYN® RILL PA6 flexible protective corrugated conduit tubing engineered to protect automation wiring against mechanical friction, chips, and fluids.",
      specs:
        "NW 10 to NW 54.5 sizes · High impact resistance · Halogen-free · Temperature -40°C to +115°C",
      products: [
        "SILVYN® RILL PA6 L (Standard wall flexible corrugated conduit)",
        "SILVYN® RILL PA6 L-B (Heavy duty corrugated conduit in Grey & Black)",
      ],
      image: "/images/card-cables.jpg",
    },
  ];

  const activeCategory =
    lappCategories.find((c) => c.id === activeSeriesId) || lappCategories[0];

  const handleNavigateToCatalog = (catId: string) => {
    navigate(`/catalog?brand=LAPP+KABEL&category=${catId}`);
  };

  return (
    <div className="pt-6 pb-24 bg-[#F3F7FC] text-slate-900 min-h-screen select-none relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
          <Link to="/" className="hover:text-slate-800 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link
            to="/#brandPortfolios"
            className="hover:text-slate-800 transition-colors"
          >
            Authorized Brands
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-bold">
            LAPP Kabel Germany · Bento Command Matrix
          </span>
        </nav>

        {/* LAPP BRAND HERO CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-red-100/70 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-lapp.png"
                    alt="Lapp Kabel Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-red-50 text-red-800 font-mono font-bold text-xs uppercase tracking-wider border border-red-200 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-red-700" />
                  Official Authorized Channel Partner
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/80 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇩🇪 Stuttgart · Bangalore Hub
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  LAPP India Private Limited — Integrated Cable & Connection
                  Systems
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Founded in Stuttgart, Germany by Oskar Lapp, LAPP is the
                  world's leading manufacturer of integrated cable and
                  connection systems. Siddhi Kabel Corporation is an authorized
                  channel partner providing warehouse drum stock of ÖLFLEX®,
                  UNITRONIC®, and SKINTOP® with direct factory test certificates
                  (EN 10204 3.1).
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 p-4 rounded-2xl bg-red-800 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-red-50 shadow-sm">
              <div className="flex items-center gap-2 text-red-50 font-bold">
                <Award size={15} />
                <span>VDE Reg. No. 7030 & ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-red-200 bg-gradient-to-br from-white via-rose-50 to-red-100/70 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-700 block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Need custom drum cutting or project pricing?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access direct commercial pricing schedules or submit your
                calibrated cable schedule.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <button
                type="button"
                onClick={() =>
                  setSelectedProduct("LAPP India Commercial Price List")
                }
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-white" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>
        </div>

        {/* BENTO SPOTLIGHT SPEC-MATRIX */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-slate-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-rose-800 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> LAPP ENGINEERING CONSOLE
              </span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Interactive Series Architecture Deck
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Click any category card below to inspect parameters & inventory
            </span>
          </div>

          {/* 8 Interactive Selector Cards with Full Category Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lappCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-rose-100 text-red-950 border-red-300 shadow-md ring-2 ring-red-200 translate-y-[-2px]"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-red-700" : "text-slate-500"}`}
                      >
                        SERIES {cat.index}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-red-200 text-red-900 font-bold rotate-90" : "bg-stone-100 text-slate-500"}`}
                      >
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4
                      className={`text-sm font-black leading-snug ${isSelected ? "text-red-950" : "text-slate-900"}`}
                    >
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div
                    className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-red-800 font-bold" : "text-slate-500"}`}
                  >
                    <Cpu
                      size={12}
                      className={isSelected ? "text-red-700 animate-pulse" : ""}
                    />
                    <span>
                      {isSelected ? "Active Console Node" : "Click to Inspect"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Asymmetric Spotlight Display Card */}
          <div
            className="bg-gradient-to-br from-white via-rose-50 to-red-100/60 text-slate-900 rounded-3xl border border-rose-200 p-6 sm:p-10 relative overflow-hidden shadow-lg animate-fade-in transition-all duration-500"
            key={activeCategory.id}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Spotlight Series Info & Image */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3
                    onClick={() =>
                      handleNavigateToCatalog(activeCategory.catId)
                    }
                    className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug hover:text-red-700 transition-colors cursor-pointer"
                    title="Go to category in catalog"
                  >
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                {/* Floating Preview Pedestal - Clickable to Catalog */}
                <div
                  onClick={() => handleNavigateToCatalog(activeCategory.catId)}
                  className="w-full h-48 rounded-2xl bg-white border border-rose-200 p-4 flex items-center justify-center shadow-inner overflow-hidden group cursor-pointer"
                  title="Click to view category products"
                >
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/card-olflex.jpg";
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigateToCatalog(activeCategory.catId)
                    }
                    className="w-full py-3.5 bg-white hover:bg-rose-50 text-red-800 border border-rose-300 font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider text-center flex items-center justify-center gap-2"
                  >
                    <span>View Category</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProduct(`LAPP ${activeCategory.title}`)
                    }
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl transition-all shadow-md hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                  >
                    Request Quotation
                  </button>
                </div>
              </div>

              {/* Right Column: Hardware Parameter Matrix & Part Lists */}
              <div className="lg:col-span-7 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-rose-200 shadow-sm">
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-slate-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#F3F7FC] border border-rose-300 font-mono shadow-inner font-bold">
                    {activeCategory.specs}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Available Stock Configurations & Part Numbers:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {activeCategory.products.map((p, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          handleNavigateToCatalog(activeCategory.catId)
                        }
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-rose-100 text-xs text-slate-700 font-medium shadow-sm hover:border-red-300 hover:bg-rose-50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        title="Click to view in catalog"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#4CACF0] shrink-0"
                        />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-900/40 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 text-[11px]">
                    Bangalore Central Hub Ready Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <RFQModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
