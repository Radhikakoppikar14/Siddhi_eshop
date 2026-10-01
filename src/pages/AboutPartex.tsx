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

export const AboutPartex: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("sleeves");

  const partexCategories = [
    {
      id: "sleeves",
      index: "01",
      code: "SERIES 01 // WIRE & CABLE MARKING",
      title: "PA / PK Cable & Wire Marking Sleeves",
      shortTitle: "Marking Sleeves",
      desc: "Chevron-cut interlocking closed sleeves and expandable profile markers designed for rapid wire identification in high-vibration control cabinets.",
      specs:
        "Halogen-free material · Operating temp -30°C to +100°C · Resistant to oils, fuels and UV",
      products: [
        "PA-02 (Closed chevron sleeve for 0.5 - 1.5mm² wire)",
        "PA-10 (Standard electrical control wire marker sleeve)",
        "PK-20 (Expandable profile marker for thick cables)",
        "PO-06 (Oval grip wire marker for loose wires)",
        "PZ-20 (Snap-on pre-terminated cable marker)",
        "PP+ (Heavy duty yellow cable marker ring)",
        "PT+ (Transparent pocket carrier strip marker)",
        "PHA (Self-laminating cable marker tag label)",
      ],
      image: "/images/partex-pc.jpg",
    },
    {
      id: "printers",
      index: "02",
      code: "SERIES 02 // THERMAL TRANSFER SYSTEMS",
      title: "ProMark T-1000 & MK10 Thermal Printers",
      shortTitle: "ProMark Printers",
      desc: "High-speed thermal transfer marker printers engineered to print indelible legends directly onto heat shrink tubing, plastic tags, and self-adhesive labels.",
      specs:
        "300 dpi resolution · Automatic cutting and half-cutting · Windows software integration",
      products: [
        "ProMark T-1000 (300dpi high speed thermal marker printer)",
        "MK10 Portable Desktop Cable Marking Machine",
        "T-Marker Pro Software Suite for automated legend generation",
        "Thermal Transfer Black Ribbon Cartridge (100m)",
        "Replacement Cutter Blade Assembly for T-1000",
        "Cleaning Roller Kit for Thermal Printheads",
        "External Reel Holder for Bulk Marker Rolls",
        "USB Interface & Ethernet Network Print Server Module",
      ],
      image: "/images/partex-pa.jpg",
    },
    {
      id: "stainless",
      index: "03",
      code: "SERIES 03 // STAINLESS STEEL TAGS",
      title: "AISI 316 Acid-Proof Stainless Steel Markers",
      shortTitle: "Stainless Steel Tags",
      desc: "Extreme-duty acid-proof stainless steel plates and embossing systems designed for offshore oil rigs, marine vessels, and heavy chemical processing plants.",
      specs:
        "AISI 316L marine grade steel · Extreme corrosion & fire resistance · Secured with stainless ties",
      products: [
        "ST-10 (Embossed stainless steel cable tag plate)",
        "PA-SS (Stainless steel carrier strip profile system)",
        "PKB Stainless Steel Cable Ties (4.6mm x 200mm)",
        "PTX-EMB Manual Steel Embossing Hand Press Tool",
        "Laser Markable Stainless Steel Identification Plate",
        "A4 Grade Stainless Steel Fixing Screws & Mounts",
        "Round Stainless Steel Valve & Pipe Marker Disc",
        "High Temperature Ceramic Infused Marker Ink",
      ],
      image: "/images/partex-pc.jpg",
    },
    {
      id: "tags",
      index: "04",
      code: "SERIES 04 // ENCLOSURE & TERMINAL TAGS",
      title: "Terminal Block Markers & Cable Tie Tags",
      shortTitle: "Terminal Tags",
      desc: "Customizable multi-card terminal markers compatible with Wago, Phoenix Contact, and ABB terminal blocks, plus robust cable tie tags for large bundle identification.",
      specs:
        "Polyamide PA66 V0 fire retardant · Snap-in mounting · Laser printable cards",
      products: [
        "MP-5 (Multi-card snap-in terminal block marker)",
        "TF-ZB (Universal flat terminal strip marker)",
        "PKT-40 (Cable tie plastic identification tag 40x10mm)",
        "PKT-60 (Large format cable bundle warning tag)",
        "FL-10 (Flexible legend plate for pushbuttons)",
        "CAB-01 (Cabinet door legend holder strip)",
        "PP-CLIP (Snappable marker carrier for DIN rails)",
        "Self-Adhesive PVC Warning and Caution Label Roll",
      ],
      image: "/images/partex-pks.jpg",
    },
    {
      id: "shrink",
      index: "05",
      code: "SERIES 05 // HEAT SHRINK TUBING",
      title: "Heat Shrinkable Marker Tubing Systems",
      shortTitle: "Heat Shrink Sleeves",
      desc: "High-grade polyolefin heat shrink tubing designed for permanent, flame-retardant wire identification across demanding electrical enclosures.",
      specs:
        "3:1 and 2:1 shrink ratios · MIL-STD cross-linked polyolefin · RoHS compliant",
      products: [
        "PHS-30 (3:1 Heat shrink marker sleeve yellow/white)",
        "PHS-20 (2:1 Continuous thermal transfer printable shrink tube)",
        "LEDR Shrink Tubing Reel Dispenser Box",
        "PWF Pre-Flattened Heat Shrink Wire Marker Card",
        "Low Smoke Zero Halogen (LSZH) Railway Grade Shrink Tubing",
        "Dual Wall Adhesive Lined Waterproof Shrink Tube",
        "Heavy Duty Professional Hot Air Shrink Gun Tool",
        "Handheld Thermal Heat Shrink Marking Station Kit",
      ],
      image: "/images/partex-po.jpg",
    },
    {
      id: "engraving",
      index: "06",
      code: "SERIES 06 // GRAVIQ ENGRAVED PLATES",
      title: "GRAVIQ Multi-Layer Engraved Legend Plates",
      shortTitle: "Engraved Plates",
      desc: "Custom-engraved Traffolyte and acrylic legend plates for pushbuttons, switches, panel instrumentation, and emergency disconnects.",
      specs:
        "UV resistant acrylic laminate · Self-adhesive or screw mounting · Custom CAD engraving",
      products: [
        "GRAVIQ Pushbutton Legend Plate (22mm center hole)",
        "Emergency Stop Yellow Circular Background Plate",
        "Multi-Line Danger & Warning Panel Engraved Sign",
        "Custom Terminal Box Identification Nameplate Tag",
        "Double-Sided Industrial Grade Adhesive Foam Backing Tape",
        "Brass Screw Fixings for Engraved Panel Plates",
        "Stainless Steel Engraved Rating Plate Custom Made",
        "Portable Mechanical Rotary Engraving Hand Stylus Kit",
      ],
      image: "/images/partex-ties.jpg",
    },
    {
      id: "wiremarkers",
      index: "07",
      code: "SERIES 07 // CLIP-ON WIRE MARKERS",
      title: "PO & PZ Snap-On Wire Marking Rings",
      shortTitle: "Clip-On Markers",
      desc: "Spring-action snap-on wire markers that lock securely onto pre-terminated cables without requiring disconnection.",
      specs:
        "Rigid PVC material · Interlocking profile · High resistance to mechanical torsion",
      products: [
        "PO-01 Clip-On Wire Marker Ring (Size 0.5 to 2.0mm²)",
        "PO-02 Clip-On Wire Marker Ring (Size 2.5 to 4.0mm²)",
        "PZ-03 Spring Action Wire Marker for Heavy Power Cables",
        "PK-H Carrier Strip Wand Loaded with Snap-On Markers",
        "Numbered Color-Coded Marker Assortment Kit (0-9, A-Z)",
        "Special Symbol & Earth Ground Marker Ring Set",
        "Manual Marker Applicator Pliers Tool",
        "Refill Cartridge Pack for Snap-On Marker Wands",
      ],
      image: "/images/partex-promark.jpg",
    },
    {
      id: "safety",
      index: "08",
      code: "SERIES 08 // HAZARD & SAFETY LABELS",
      title: "Industrial Safety & Arc Flash Warning Labels",
      shortTitle: "Safety Labels",
      desc: "High-visibility safety signs, arc flash hazard stickers, and lockout/tagout identification markers for industrial compliance.",
      specs:
        "BS 5378 & ANSI Z535 compliant · Reflective & heavy-duty vinyl · Industrial adhesive",
      products: [
        "Arc Flash Hazard Warning Label (415V / 440V Panel)",
        "High Voltage Electrical Danger Triangle Warning Sticker",
        "Earth Bonding Point Identification Marker Decal",
        "Lockout / Tagout (LOTO) Authorized Personnel Tag Set",
        "Solar PV DC Disconnect Warning Placard",
        "Phase Red / Yellow / Blue Busbar Identification Label",
        "Confined Space Entry Caution Adhesive Sign",
        "Roll of 500 Self-Adhesive Calibration Inspection Labels",
      ],
      image: "/images/partex-po.jpg",
    },
  ];

  const activeCategory =
    partexCategories.find((c) => c.id === activeSeriesId) ||
    partexCategories[0];

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
            PARTEX Sweden · Bento Command Matrix
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-yellow-100/70 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-partex.png"
                    alt="Partex Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 font-mono font-bold text-xs uppercase tracking-wider border border-amber-300 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-amber-800" />
                  Official Authorized Stockist
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/80 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇸🇪 Gullspång Sweden
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  PARTEX Sweden — Precision Wire & Cable Marking Systems
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Partex is the world specialist in industrial identification
                  systems. Siddhi Kabel Corporation stocks ProMark printers,
                  chevron sleeves, and stainless steel tags in Bangalore.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 p-4 rounded-2xl bg-amber-800 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-amber-50 shadow-sm">
              <div className="flex items-center gap-2 text-amber-50 font-bold">
                <Award size={15} />
                <span>ISO 9001 & Halogen-Free Compliance</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-amber-200 bg-gradient-to-br from-white via-amber-50 to-yellow-100/70 text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to dispatch marking systems?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access direct commercial pricing schedules or submit your
                automated panel tag requirements.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <button
                type="button"
                onClick={() =>
                  setSelectedProduct("PARTEX Marking Systems Price List")
                }
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-amber-950" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-slate-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> PARTEX ENGINEERING CONSOLE
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
            {partexCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-amber-100 text-amber-950 border-amber-300 shadow-md ring-2 ring-amber-200 translate-y-[-2px]"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-amber-800" : "text-slate-500"}`}
                      >
                        SERIES {cat.index}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-amber-200 text-amber-950 font-bold rotate-90" : "bg-stone-100 text-slate-500"}`}
                      >
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4
                      className={`text-sm font-black ${isSelected ? "text-amber-950" : "text-slate-900"}`}
                    >
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div
                    className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-amber-800 font-bold" : "text-slate-500"}`}
                  >
                    <Cpu
                      size={12}
                      className={
                        isSelected ? "text-amber-700 animate-pulse" : ""
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
            className="bg-gradient-to-br from-white via-amber-50 to-yellow-100/60 text-slate-900 rounded-3xl border border-amber-200 p-6 sm:p-10 relative overflow-hidden shadow-lg animate-fade-in transition-all duration-500"
            key={activeCategory.id}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                <div className="w-full h-48 rounded-2xl bg-white border border-amber-200 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/partex-sleeves.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProduct(`PARTEX ${activeCategory.title}`)
                  }
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs rounded-xl transition-all shadow-md hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-sm">
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-slate-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#F3F7FC] border border-blue-300 font-mono shadow-inner font-bold">
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
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-amber-100 text-xs text-slate-700 font-medium shadow-sm hover:border-amber-300 hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-amber-700 shrink-0"
                        />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-900/40 flex items-center justify-between text-xs">
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
