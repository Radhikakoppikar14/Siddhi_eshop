import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export const AboutMennekes: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("plugs");

  const mennekesCategories = [
    {
      id: "plugs",
      index: "01",
      code: "SERIES 01 // CEE INDUSTRIAL PLUGS",
      title: "PowerTOP® Xtra CEE Plugs & Connectors",
      shortTitle: "CEE Plugs",
      desc: "Heavy-duty industrial plugs and connector sockets featuring ergonomic rubberized grip, screwless connection technology, and IP67 waterproof ratings.",
      specs:
        "16A to 125A ratings · 3P+N+E voltages · IP67 watertight · IEC 60309 compliant",
      products: [
        "PowerTOP Xtra 16A 3P+E+N 415V IP67 Plug",
        "PowerTOP Xtra 32A 3P+E Industrial Watertight Connector",
        "PowerTOP Xtra 63A Heavy Duty Straight Plug",
        "AM-TOP Standard Panel Mounted Straight Socket 16A",
        "DUO-IS Switchable Interlocked Socket Outlet 32A",
        "AMAXX Combination Distribution Enclosure Unit",
        "Rubber Wall Socket Outlet Box IP44 / IP67",
        "CEE Phase Inverter Plug 32A 4-Pin",
      ],
      image: "/images/menn-duo.jpg",
    },
    {
      id: "amaxx",
      index: "02",
      code: "SERIES 02 // COMBINATION DISTRIBUTION",
      title: "AMAXX® Modular Wall-Mounted Combination Units",
      shortTitle: "AMAXX Enclosures",
      desc: "Pre-wired modular power distribution units combining CEE sockets, SCHUKO domestic outlets, and miniature circuit breakers in a robust impact-resistant enclosure.",
      specs:
        "IP44 & IP67 protection · Pre-wired with DIN rail MCBs and RCDs · Robust Amaplast housing",
      products: [
        "AMAXX Basic Wall Distribution Unit (2x 16A CEE + 2x Schuko)",
        "AMAXX Industrial Unit with RCD Protection & MCB Window",
        "AMAXX Construction Site Power Distribution Box",
        "AMAXX Data Center Rack Power Feed Enclosure",
        "Amaplast Empty Modular Enclosure Housing Size 1",
        "Amaplast Empty Modular Enclosure Housing Size 2",
        "Hinged Transparent Inspection Window Kit",
        "DIN Rail Terminal Block Assembly Module for AMAXX",
      ],
      image: "/images/menn-panel.jpg",
    },
    {
      id: "ev",
      index: "03",
      code: "SERIES 03 // EV CHARGING INFRASTRUCTURE",
      title: "AMTRON® Electric Vehicle Charging Stations",
      shortTitle: "EV Charging",
      desc: "Smart AC charging stations engineered for residential, commercial, and public EV fleets with backend billing integration, RFID authorization, and Type 2 sockets.",
      specs:
        "3.7 kW to 22 kW charging capacity · Type 2 cable / socket · OCPP 1.6j network ready",
      products: [
        "AMTRON Compact 3.7kW/11kW Home EV Wallbox Charger",
        "AMTRON Professional 22kW Commercial Charging Station",
        "AMTRON Premium with RFID Reader & Energy Meter",
        "Type 2 to Type 2 EV Charging Cable 32A 5-Meter",
        "Mode 3 EV Charging Controller Board Assembly",
        "Pedestal Mounting Post for AMTRON Stations",
        "DC Residual Current Fault Detector Module (RCD Type B)",
        "Ethernet / 4G Communication Modem Upgrade Kit",
      ],
      image: "/images/menn-phase.jpg",
    },
    {
      id: "interlocked",
      index: "04",
      code: "SERIES 04 // INTERLOCKED SWITCHED SOCKETS",
      title: "Switchable & Mechanically Interlocked Sockets",
      shortTitle: "Interlocked Sockets",
      desc: "Safety interlocked socket outlets preventing insertion or removal of plugs under load, ensuring absolute operator safety in heavy manufacturing plants.",
      specs:
        "AC-3 load breaking capacity · Padlockable rotary switch handle · Enclosure IP67",
      products: [
        "MENNEKES Switchable Interlocked Socket 16A 3P+E",
        "MENNEKES Switchable Interlocked Socket 32A 3P+N+E",
        "Heavy Duty Wall Mounted Interlocked Outlet 63A",
        "Compact Switch-Socket Combination Box 16A",
        "Auxiliary Switch Contact Module for Interlock Status",
        "Padlock Locking Hasp Accessory for Switch Handle",
        "Weatherproof Protective Spring Lid Assembly Kit",
        "Stainless Steel Mounting Bracket for Interlocked Sockets",
      ],
      image: "/images/menn-powertop.jpg",
    },
    {
      id: "reels",
      index: "05",
      code: "SERIES 05 // CABLE REELS & EXTENSIONS",
      title: "AIRPORT & Industrial Heavy Duty Cable Reels",
      shortTitle: "Cable Reels",
      desc: "Rugged spring-driven and manual cable reels designed for workshops, aircraft hangars, and assembly workstations.",
      specs:
        "H07RN-F rubber cables · Thermal overload protection · Swivel mounting bracket",
      products: [
        "AIRPORT Mobile Heavy Duty Cable Reel 25m",
        "Spring-Driven Retractable Workshop Cable Reel 15m",
        "Hand-Operated Tubular Steel Extension Reel 50m",
        "Thermal Overload Circuit Breaker Reset Switch Button",
        "Swivel Wall Mounting Bracket for Spring Reels",
        "Rubberized CEE Extension Cord with Watertight Coupler",
        "Replacement H07RN-F Heavy Duty Flexible Cable Drum Roll",
        "Industrial Slip Ring Assembly Kit for Rotary Reels",
      ],
      image: "/images/menn-duo.jpg",
    },
    {
      id: "camping",
      index: "06",
      code: "SERIES 06 // MARINA & CAMPING OUTLETS",
      title: "CAMPING & MARINA Power Pillar Distribution",
      shortTitle: "Marina Pillars",
      desc: "Weatherproof aluminum and stainless steel power distribution bollards designed for marinas, caravan parks, and outdoor events.",
      specs:
        "IP44 / IP67 waterproof bollards · Energy meter integration · LED illumination",
      products: [
        "Marina Power Bollard Pillar with 4x CEE Sockets & Water Tap",
        "Caravan Site Distribution Pillar with kWh Energy Meters",
        "Stainless Steel Compact Marina Outlet Enclosure",
        "LED Night Illumination Cap for Power Pillar",
        "Coin / Token Operated Power Dispenser Module",
        "Lockable Protective Access Door Panel for Bollard",
        "Internal Circuit Breaker Mounting DIN Rail Assembly",
        "Heavy Duty Floor Anchor Base Plate Kit for Pillars",
      ],
      image: "/images/menn-phase-raw.png",
    },
    {
      id: "containers",
      index: "07",
      code: "SERIES 07 // REFRIGERATED CONTAINER SOCKETS",
      title: "Reefer Container Sockets & Plugs (Reeferline)",
      shortTitle: "Reefer Sockets",
      desc: "Specialized 32A and 63A 3-phase high-integrity plugs and sockets engineered specifically for refrigerated transport containers (Reefer units) at ports and logistics terminals.",
      specs:
        "3P+E 32A 440V 3-hour earth contact · Nickel-plated contacts · High salt-mist resistance",
      products: [
        "Reeferline Panel Mounted Interlocked Socket 32A 3P+E",
        "Reefer Container Heavy Duty Watertight Plug 32A",
        "Reeferline Angled Adapter Socket Housing 63A",
        "Corrosion-Resistant Stainless Steel Mounting Box",
        "Pilot Contact Auxiliary Pin Set for Reefer Plugs",
        "Heavy Duty Rubber Strain Relief Cable Sleeve Gland",
        "Replacement Insulating Interior Block for 32A Reefer Socket",
        "Weatherproof Spring-Loaded Protective Cover Lid Assembly",
      ],
      image: "/images/menn-duo.jpg",
    },
    {
      id: "adapters",
      index: "08",
      code: "SERIES 08 // ADAPTERS & ACCESSORIES",
      title: "CEE Industrial Adapters & Enclosure Spares",
      shortTitle: "Adapters & Spares",
      desc: "Essential accessories, phase changers, wall brackets, and portable adapter blocks for universal CEE site connectivity.",
      specs:
        "High impact Amaplast housing · VDE approved · Factory tested components",
      products: [
        "Portable CEE Phase Inverter Adapter Block 16A",
        "CEE to Schuko Domestic Converter Adapter Plug",
        "Replacement Rubber Sealing Gasket Ring for IP67 Plugs",
        "Hinged Inspection Window Kit for Distribution Boxes",
        "Wall Mounting Foot Bracket Set for AMAXX Enclosures",
        "Replacement Pilot Lamp LED Indicator Module 230V",
        "Padlock Security Hasp Lockout Accessory for CEE Sockets",
        "High-Grade Cable Gland M25 x 1.5 Watertight Nut",
      ],
      image: "/images/menn-panel.jpg",
    },
  ];

  const activeCategory =
    mennekesCategories.find((c) => c.id === activeSeriesId) ||
    mennekesCategories[0];

  return (
    <div className="pt-6 pb-24 bg-[#F3F7FC] text-slate-900 min-h-screen select-none relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            MENNEKES Germany · Bento Command Matrix
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-slate-300 bg-gradient-to-br from-slate-50 via-white to-slate-200/80 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-mennekes.png"
                    alt="Mennekes Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs uppercase tracking-wider border border-slate-300 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-slate-700" />
                  Official Authorized Stockist
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/80 text-slate-700 font-mono text-xs font-semibold border border-slate-300">
                  🇩🇪 Kirchhundem Germany
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  MENNEKES Germany — World Standard for CEE Plugs & EV Charging
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  MENNEKES is the inventor of the worldwide standard Type 2 EV
                  connector and industrial CEE plugs. Siddhi Kabel Corporation
                  stocks PowerTOP plugs, AMAXX enclosures, and AMTRON chargers
                  in Bangalore.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 p-4 rounded-2xl bg-slate-700 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-slate-100 shadow-sm">
              <div className="flex items-center gap-2 text-slate-100 font-bold">
                <Award size={15} />
                <span>IEC 60309 & VDE Certified Safety</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-slate-300 bg-gradient-to-br from-white via-slate-50 to-slate-200/80 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-700 block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to dispatch CEE plugs & EV boxes?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access direct commercial pricing schedules or submit your
                industrial distribution panel requirements.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <button
                type="button"
                onClick={() =>
                  setSelectedProduct("MENNEKES CEE Plugs & EV Price List")
                }
                className="w-full py-3.5 bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-slate-200" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-slate-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-700 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> MENNEKES ENGINEERING CONSOLE
              </span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Interactive Series Architecture Deck
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Click any series card below to load live hardware parameters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mennekesCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-slate-200 text-slate-950 border-slate-300 shadow-md ring-2 ring-slate-300 translate-y-[-2px]"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-slate-700" : "text-slate-500"}`}
                      >
                        SERIES {cat.index}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-slate-300 text-slate-900 font-bold rotate-90" : "bg-stone-100 text-slate-500"}`}
                      >
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4
                      className={`text-sm font-black ${isSelected ? "text-slate-950" : "text-slate-900"}`}
                    >
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div
                    className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-slate-700 font-bold" : "text-slate-500"}`}
                  >
                    <Cpu
                      size={12}
                      className={
                        isSelected ? "text-slate-700 animate-pulse" : ""
                      }
                    />
                    <span>
                      {isSelected ? "Active Console Node" : "Click to Inspect"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="bg-gradient-to-br from-white via-slate-50 to-slate-200/70 text-slate-900 rounded-3xl border border-slate-300 p-6 sm:p-10 relative overflow-hidden shadow-lg animate-fade-in transition-all duration-500"
            key={activeCategory.id}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-300 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                <div className="w-full h-48 rounded-2xl bg-white border border-slate-300 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/mennekes-plugs.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProduct(`MENNEKES ${activeCategory.title}`)
                  }
                  className="w-full py-4 bg-slate-600 hover:bg-slate-700 text-white font-black text-xs rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm">
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-slate-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#F3F7FC] border border-slate-300 font-mono shadow-inner font-bold">
                    {activeCategory.specs}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Available Stock Configurations & Part Numbers (8 Standard
                    Items):
                  </span>
                  <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {activeCategory.products.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium shadow-sm hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-slate-700 shrink-0"
                        />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900/40 flex items-center justify-between text-xs">
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
