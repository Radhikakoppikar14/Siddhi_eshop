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

export const AboutEaton: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("pkzm0");

  const eatonCategories = [
    {
      id: "pkzm0",
      index: "01",
      code: "SERIES 01 // MOTOR PROTECTION",
      title: "PKZM0® Motor-Protective Circuit-Breakers",
      shortTitle: "PKZM0 Starters",
      desc: "Manual motor starters with thermal overload and magnetic short-circuit releases up to 150 kA breaking capacity. Safe phase failure sensitivity for 3-phase AC motors.",
      specs:
        "0.16A to 32A ratings · 150 kA at 400V · IEC/EN 60947-4-1 · UL 508 / CSA approved",
      products: [
        "PKZM0-0.16 (0.10A - 0.16A Rotary Motor Protector)",
        "PKZM0-1.6 (1.0A - 1.6A Thermal-Magnetic Release)",
        "PKZM0-4 (2.5A - 4.0A Standard Control Switch)",
        "PKZM0-10 (6.3A - 10A Heavy Duty Starter)",
        "PKZM0-16 (10A - 16A High Capacity Protection)",
        "PKZM0-32 (20A - 32A Maximum Ampere Unit)",
        "PKZM01 Pushbutton Starter for machinery enclosures",
        "PKE Electronic Wide Range Motor Starter with communication",
      ],
      image: "/images/eaton-pkzm0.jpg",
    },
    {
      id: "dilm",
      index: "02",
      code: "SERIES 02 // POWER SWITCHING",
      title: "DILM® Power Contactors & Overload Relays",
      shortTitle: "DILM Contactors",
      desc: "World-class power contactors engineered for heavy AC-3 motor starting, capacitive switching, and industrial automation with SmartWire-DT connectivity.",
      specs:
        "3-Pole 7A to 1000A · Electronic AC/DC coils · Low holding power consumption · 10 million operations",
      products: [
        "DILM7 (7A AC-3 3-Pole Compact Contactor)",
        "DILM9 (9A Standard Automation Contactor)",
        "DILM12 (12A Motor Control Switching Unit)",
        "DILM17 (17A Frame 2 Industrial Contactor)",
        "DILM25 (25A Heavy Duty Switching Module)",
        "DILM32 (32A AC/DC Electronic Coil Contactor)",
        "DILM40 (40A Frame 3 High Power Contactor)",
        "DILM80 (80A Substation Feeder Contactor)",
      ],
      image: "/images/eaton-dilm.jpg",
    },
    {
      id: "nzm",
      index: "03",
      code: "SERIES 03 // DISTRIBUTION MCCB",
      title: "NZM® Molded Case Circuit Breakers (MCCB)",
      shortTitle: "NZM MCCB Range",
      desc: "Compact circuit breakers up to 1600 A with state-of-the-art microprocessor releases, energy monitoring, and comprehensive selectivity for distribution panels.",
      specs:
        "NZM1 to NZM4 · 20A to 1600A · Breaking capacity 25kA to 150kA · Worldwide market approvals",
      products: [
        "NZMN1-A40 (40A Thermal-Magnetic MCCB)",
        "NZMN1-A100 (100A Panel Distribution Breaker)",
        "NZMN1-A160 (160A Standard Sub-Feeder MCCB)",
        "NZMN2-A250 (250A Electronic Trip Unit)",
        "NZMN3-AE400 (400A High Capacity Feeder Breaker)",
        "NZMN3-AE630 (630A Substation Protection Unit)",
        "NZMN4-VE1000 (1000A Microprocessor Release MCCB)",
        "NZMN4-VE1600 (1600A Maximum Diagnostic Switch)",
      ],
      image: "/images/eaton-nzm.jpg",
    },
    {
      id: "rmq",
      index: "04",
      code: "SERIES 04 // CONTROL STATIONS",
      title: "RMQ-TITAN® Pilot Devices & Control Stations",
      shortTitle: "RMQ Pilot Devices",
      desc: "Heavy-duty 22.5mm modular pushbuttons, emergency stop palm buttons, selector switches, and multi-chip LED indicator lights with IP67/IP69K washdown ratings.",
      specs:
        "M22 Series · IP67/IP69K washdown · Titanium front bezel · 5 million operations · Toolless clip contact",
      products: [
        "M22-D-R (Flush Red Pushbutton Actuator)",
        "M22-D-G (Flush Green Start Pushbutton)",
        "M22-PV (Emergency Stop Mushroom Palm - ISO 13850)",
        "M22-W (2-Position Rotary Selector Switch)",
        "M22-WLK (Illuminated 3-Position Selector)",
        "M22-L-W (Multi-Chip High Luminance White Indicator)",
        "M22-KC10 (Single Screw Terminal Contact Block NC/NO)",
        "M22-IY1 (Surface Mounting Enclosure Single Station)",
      ],
      image: "/images/eaton-rmq.jpg",
    },
    {
      id: "dila",
      index: "05",
      code: "SERIES 05 // CONTROL RELAYS",
      title: "DILA® Auxiliary Relays & Timing Modules",
      shortTitle: "DILA Relays",
      desc: "High-reliability auxiliary contact relays and electronic timing modules designed for control logic and interlocking control circuits.",
      specs:
        "4-pole & 8-pole configurations · AC/DC coil options · Mirror contacts per IEC/EN 60947-5-1",
      products: [
        "DILA-40 (4-Pole Control Relay 40-Series)",
        "DILA-31 (3 NO + 1 NC Auxiliary Relay)",
        "DILET Timer Module (On-delay / Off-delay electronic timer)",
        "DILA-XHI22 Front Mounting Auxiliary Contact Block",
        "ETR4 Electronic Timing Relay Multi-Functional",
        "Suppressor Diode & RC Varistor Surge Suppression Units",
        "Mechanical Interlock Element for Reversing Contactors",
        "Busbar Terminal Shroud and Phase Barrier Plates",
      ],
      image: "/images/eaton-dilm.jpg",
    },
    {
      id: "mfd",
      index: "06",
      code: "SERIES 06 // INDUSTRIAL CONTROLLERS",
      title: "easyE4® Micro PLCs & Smart Relays",
      shortTitle: "easyE4 Controllers",
      desc: "Compact programmable logic controllers with Ethernet connectivity, color display, and expansion modules for intelligent automation tasks.",
      specs:
        "12/24V DC & 100-240V AC versions · 16 I/O onboard · Web server visualization",
      products: [
        "easyE4 Base Controller with Display (12/24V DC)",
        "easyE4 Digital Expansion I/O Module (4 In / 4 Out)",
        "easyE4 Analog Input & Temperature Expansion Module",
        "easySoft 7 Professional Programming Software Suite",
        "MFD-CP4 Multi-Function Display Operator Terminal",
        "SmartWire-DT Gateway Master Module for easyE4",
        "Plug-in Ethernet Patch Cable for Programming (2m)",
        "24V DC DIN Rail Switchmode Power Supply Unit",
      ],
      image: "/images/eaton-pkzm0.jpg",
    },
    {
      id: "fds",
      index: "07",
      code: "SERIES 07 // VARIABLE SPEED DRIVES",
      title: "DE1 & DA1 Variable Frequency AC Drives",
      shortTitle: "Frequency Drives",
      desc: "Compact frequency inverters engineered for pump, fan, and conveyor applications with intuitive parameterization and robust overload capabilities.",
      specs:
        "0.25 kW to 250 kW ratings · IP20 & IP66 enclosure variants · Built-in EMC filter",
      products: [
        "DE1 Variable Speed Starter 0.75kW (IP20 Enclosure)",
        "DA1 Advanced Machinery Inverter 2.2kW 3-Phase",
        "DE11-34005N-N Compact Inverter for HVAC pumps",
        "External Brake Resistor Unit for DA1 Drives",
        "Remote Keypad Display Unit with RJ45 Cable",
        "Modbus RTU & CANopen Communication Card Module",
        "Shielded Motor Cable EMC Gland Clamping Kit",
        "IP66 Weatherproof Wall Enclosure for DA1 Drives",
      ],
      image: "/images/eaton-nzm.jpg",
    },
    {
      id: "swd",
      index: "08",
      code: "SERIES 08 // SMARTWIRE-DT",
      title: "SmartWire-DT® Industrial Communication",
      shortTitle: "SmartWire-DT",
      desc: "Revolutionary connection technology replacing traditional control wiring in switchgear cabinets with a single flat ribbon cable and intelligent nodes.",
      specs:
        "Up to 99 connected nodes · 600m total bus length · Drastic reduction in wiring time",
      products: [
        "SmartWire-DT Gateway Module for Profibus / CANopen",
        "8-Pole Flat Ribbon Cable Roll (100 meters)",
        "SWD Blade Terminal Connector for Control Cabinet",
        "EU5C-SWD-CKX Power Feed Module",
        "DIL-SWD Contactor Plug-In Communication Module",
        "M22-SWD LED Element and Pushbutton Base Node",
        "SWD Diagnostic and Commissioning Handheld Tool",
        "IP67 Field Bus Junction Box for SmartWire-DT",
      ],
      image: "/images/eaton-rmq.jpg",
    },
  ];

  const activeCategory =
    eatonCategories.find((c) => c.id === activeSeriesId) || eatonCategories[0];

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
            EATON MOELLER Germany · Bento Command Matrix
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-100/70 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-eaton.png"
                    alt="Eaton Moeller Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-900 font-mono font-bold text-xs uppercase tracking-wider border border-sky-200 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-sky-700" />
                  Official Authorized Stockist
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/80 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇩🇪 Bonn · 🇺🇸 Cleveland
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  EATON Moeller — Industrial Motor Control & Power Distribution
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Eaton Moeller is an international technology leader in
                  electrical systems for power quality, distribution, and motor
                  control automation. Siddhi Kabel Corporation maintains ready
                  warehouse stocks of PKZM0 motor-protective circuit breakers,
                  DILM contactors, and NZM MCCBs with direct manufacturer
                  warranties.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 p-4 rounded-2xl bg-blue-900 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-blue-50 shadow-sm">
              <div className="flex items-center gap-2 text-sky-100 font-bold">
                <Award size={15} />
                <span>IEC/EN 60947 & UL 508 Worldwide Approvals</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-sky-200 bg-gradient-to-br from-white via-sky-50 to-blue-100/70 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-800 block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to dispatch switchgear packages?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access direct commercial pricing schedules or submit your
                automated panel Bill of Materials.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <button
                type="button"
                onClick={() =>
                  setSelectedProduct("EATON Moeller Switchgear Price List")
                }
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-sky-200" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-slate-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-700 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> EATON ENGINEERING CONSOLE
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
            {eatonCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-sky-100 text-sky-950 border-sky-300 shadow-md ring-2 ring-sky-200 translate-y-[-2px]"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-sky-800" : "text-slate-500"}`}
                      >
                        SERIES {cat.index}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-sky-200 text-sky-900 font-bold rotate-90" : "bg-stone-100 text-slate-500"}`}
                      >
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4
                      className={`text-sm font-black ${isSelected ? "text-sky-950" : "text-slate-900"}`}
                    >
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div
                    className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-sky-800 font-bold" : "text-slate-500"}`}
                  >
                    <Cpu
                      size={12}
                      className={isSelected ? "text-sky-700 animate-pulse" : ""}
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
            className="bg-gradient-to-br from-white via-sky-50 to-blue-100/60 text-slate-900 rounded-3xl border border-sky-200 p-6 sm:p-10 relative overflow-hidden shadow-lg animate-fade-in transition-all duration-500"
            key={activeCategory.id}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-900 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                <div className="w-full h-48 rounded-2xl bg-white border border-sky-200 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/eaton-pkzm0.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProduct(`EATON ${activeCategory.title}`)
                  }
                  className="w-full py-4 bg-[#0073E6] hover:bg-[#0B80C9] text-white font-black text-xs rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-sky-200 shadow-sm">
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-sky-800 text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-slate-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#F3F7FC] border border-sky-300 font-mono shadow-inner font-bold">
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
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-sky-100 text-xs text-slate-700 font-medium shadow-sm hover:border-sky-300 hover:bg-sky-50 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-sky-700 shrink-0"
                        />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-900/40 flex items-center justify-between text-xs">
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
