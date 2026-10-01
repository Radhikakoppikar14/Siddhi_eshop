import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  Truck,
  FileCheck2,
  Cpu,
  Sparkles,
  CheckCircle2,
  Building2,
  ArrowRight,
  Activity,
} from "lucide-react";

type CapabilityTab = "engineering" | "logistics" | "commercials";

export const CompanyProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CapabilityTab>("engineering");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const capabilities = {
    engineering: {
      id: "engineering",
      code: "MODULE 01 // TECHNICAL CONSULTING",
      title: "Industrial Engineering Expertise",
      subtitle: "20+ Years Field Experience & Application Engineering",
      desc: "Specialized technical assistance helping panel builders, automation engineers, and machine tool manufacturers select exact cable cross-sections, breaking capacities, and IP ratings.",
      badge: "ACTIVE ENGINEERING DESK",
      themeColor: "text-rose-800 bg-rose-100/70 border-rose-300",
      accentBorder: "border-l-4 border-l-rose-500",
      activeBg:
        "bg-rose-600 text-white border-rose-600 font-black shadow-xl scale-[1.01]",
      hoverClass: "hover:border-rose-400 hover:bg-rose-50/50",
      highlights: [
        "Cable Sizing & Ampacity Engineering",
        "EMC Screening & Shielding Guidance",
        "Breaking Capacity & Selectivity Audits",
      ],
      icon: <Cpu size={22} className="text-rose-600" />,
      metric: "100% VDE / IEC Compliant",
    },
    logistics: {
      id: "logistics",
      code: "MODULE 02 // WAREHOUSE DISPATCH",
      title: "Warehouse & Custom Cut Infrastructure",
      subtitle: "Bangalore Logistics Hub · Same-Day Dispatch",
      desc: "Equipped with motorized cable decoilers, heavy drum cranes, and laser measuring stations to supply exact required cut lengths without charging for unnecessary scrap.",
      badge: "READY DRUM INVENTORY",
      themeColor: "text-emerald-900 bg-emerald-100/70 border-emerald-300",
      accentBorder: "border-l-4 border-l-emerald-500",
      activeBg:
        "bg-emerald-300 text-emerald-950 border-emerald-400 font-black shadow-xl scale-[1.01]",
      hoverClass: "hover:border-emerald-400 hover:bg-emerald-50/70",
      highlights: [
        "Exact Meter Cut Delivery on Demand",
        "Heavy Drum Unspooling & Stacking",
        "Same-Day Dispatch & Plant Pickups",
      ],
      icon: <Truck size={22} className="text-emerald-700" />,
      metric: "Peenya Central Hub",
    },
    commercials: {
      id: "commercials",
      code: "MODULE 03 // COMMERCIAL COMPLIANCE",
      title: "Transparent & Structured Commercials",
      subtitle: "100% Tax Compliant · ITC Pass-Through",
      desc: "Full 18% GST Input Tax Credit (ITC) invoicing, price-firm corporate annual contracting, and certified EN 10204 3.1 manufacturer test reports with every industrial consignment.",
      badge: "ITC PASS-THROUGH",
      themeColor: "text-blue-900 bg-blue-100/70 border-blue-300",
      accentBorder: "border-l-4 border-l-blue-600",
      activeBg:
        "bg-blue-600 text-white border-blue-600 font-black shadow-xl scale-[1.01]",
      hoverClass: "hover:border-blue-400 hover:bg-blue-50/50",
      highlights: [
        "EN 10204 3.1 Mill Test Certifications",
        "Direct Factory Batch Pricing Tiers",
        "Corporate Credit & Ledger Facilities",
      ],
      icon: <FileCheck2 size={22} className="text-blue-600" />,
      metric: "Certified 3.1 MTC",
    },
  };

  const current = capabilities[activeTab];

  const brandChannels = [
    {
      name: "LAPP KABEL",
      origin: "Germany",
      logo: "/images/logo-lapp.png",
      desc: "Global pioneer in integrated cable technology & ÖLFLEX® inventor.",
      hoverStyle:
        "hover:bg-rose-500 hover:text-slate-800 hover:border-rose-500 hover:shadow-lg hover:scale-[1.02]",
      badgeStyle: "bg-rose-100 text-rose-900 border-rose-300",
    },
    {
      name: "EATON - MOELLER",
      origin: "Germany / USA",
      logo: "/images/logo-eaton.png",
      desc: "Leader in industrial switchgear, motor protection & automation.",
      hoverStyle:
        "hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] hover:shadow-lg hover:scale-[1.02]",
      badgeStyle: "bg-sky-100 text-sky-900 border-sky-300",
    },
    {
      name: "PARTEX",
      origin: "Sweden",
      logo: "/images/logo-partex.png",
      desc: "Precision wire, cable and component marking systems since 1948.",
      hoverStyle:
        "hover:bg-amber-200 hover:text-amber-950 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02]",
      badgeStyle: "bg-amber-100 text-amber-950 border-amber-300",
    },
    {
      name: "MENNEKES",
      origin: "Germany",
      logo: "/images/logo-mennekes.png",
      desc: "Industry standard in CEE industrial plugs & AMAXX distribution units.",
      hoverStyle:
        "hover:bg-slate-700 hover:text-white hover:border-slate-700 hover:shadow-lg hover:scale-[1.02]",
      badgeStyle: "bg-slate-100 text-slate-900 border-slate-300",
    },
  ];

  return (
    <section
      className="py-14 lg:py-20 bg-transparent border-b border-[#E2E8F0] select-none"
      id="companyProfile"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header & Corporate Assurance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 border border-[#CBD5E1] shadow-xl">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9262E] animate-pulse" />
              <span className="text-[#D9262E] font-extrabold uppercase tracking-widest">
                COMPANY PROFILE{" "}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1956A6] tracking-tight">
              Siddhi Kabel Corporation
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans max-w-3xl">
              Established as South India’s premier authorized industrial
              distributor for high-reliability electrical automation components,
              flexible power cables, and motor control switchgear. Headquartered
              in Bangalore's trade corridor, we bridge European engineering
              excellence with immediate on-the-ground warehouse inventory.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#15478A] text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9262E]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-sky-300 font-extrabold uppercase tracking-wider">
                  CORPORATE ASSURANCE
                </span>
                <ShieldCheck size={18} className="text-sky-300" />
              </div>
              <h4 className="text-base font-black tracking-tight text-white">
                100% Genuine Products
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                  <span>Direct Factory Batch Test Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                  <span>GST Invoicing with Input Tax Credit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                  <span>Bangalore Central Stocking Depots</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* INTERACTIVE BRAND CHANNELS BAR WITH CURSOR-ONLY HOVER */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#64748B]">
              <Sparkles size={14} className="text-rose-600" />
              <span>DIRECT AUTHORIZED OEM BRAND CHANNELS:</span>
            </div>
            <span className="text-[11px] font-mono text-[#059669] font-semibold">
              100% Genuine Warranty & Factory Traceability
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center pt-2">
            {brandChannels.map((brand, idx) => {
              const isHovered = hoveredBrand === brand.name;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBrand(brand.name)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border shadow-2xs flex flex-col justify-between space-y-3 bg-slate-50 text-[#1956A6] border-[#CBD5E1] ${brand.hoverStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`h-5 object-contain max-w-[90px] ${isHovered && brand.name !== "EATON - MOELLER" && brand.name !== "PARTEX" ? "brightness-200" : ""}`}
                    />
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border transition-colors ${isHovered && brand.name !== "PARTEX" ? "bg-white/20 text-white border-white/40" : brand.badgeStyle}`}
                    >
                      {brand.origin}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] font-sans leading-tight transition-colors ${isHovered ? (brand.name === "PARTEX" ? "text-amber-950" : "text-white") : "text-slate-600"}`}
                  >
                    {brand.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE CAPABILITY COMMAND CENTER */}
        <div className="rounded-[2.5rem] p-6 sm:p-10 border relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-[#F3F7FC] via-[#F4F7FC] to-[#D5E2F3] text-[#1956A6] border-[#C4D6EE] shadow-xl space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C4D6EE] relative z-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] font-bold block">
                OPERATIONAL CAPABILITY MATRIX
              </span>
              <h3 className="text-xl font-black text-[#1956A6] tracking-tight mt-0.5">
                Select Operational Pillar to Inspect
              </h3>
            </div>
            <span className="text-xs font-mono text-blue-800 font-semibold flex items-center gap-1.5 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-300 backdrop-blur-md">
              <Activity size={13} /> Bangalore Hub Operational
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 relative z-10">
            {(
              [
                {
                  id: "engineering",
                  label: "Engineering Expertise",
                  icon: <Cpu size={16} />,
                },
                {
                  id: "logistics",
                  label: "Warehouse & Custom Cut",
                  icon: <Truck size={16} />,
                },
                {
                  id: "commercials",
                  label: "Transparent Commercials",
                  icon: <Award size={16} />,
                },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              const tabCfg = capabilities[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl text-left font-mono font-bold text-xs transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? tabCfg.activeBg
                      : `bg-white/90 text-slate-800 border-[#C4D6EE] ${tabCfg.hoverClass} shadow-xs backdrop-blur-sm`
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${isActive ? "bg-white/20 text-white" : tab.id === "engineering" ? "bg-rose-100 text-rose-700" : tab.id === "logistics" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {tab.icon}
                    </div>
                    <span className="truncate">{tab.label}</span>
                  </div>
                  <ArrowRight
                    size={14}
                    className={
                      isActive
                        ? "text-white shrink-0"
                        : "text-slate-400 shrink-0"
                    }
                  />
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-md text-slate-900 border border-[#C4D6EE] shadow-2xl transition-all duration-500 animate-fade-in relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-2xl shadow-xs ${current.themeColor} border`}
                  >
                    {current.icon}
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${current.themeColor} mb-1`}
                    >
                      {current.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {current.code}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    {current.title}
                  </h3>
                  <span
                    className={`text-xs font-mono font-bold inline-block mt-0.5 px-3 py-1 rounded-md border ${current.themeColor}`}
                  >
                    {current.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {current.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {current.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-[#C4D6EE] text-xs font-mono text-slate-900 flex items-center gap-2 shadow-2xs"
                    >
                      <CheckCircle2
                        size={14}
                        className={
                          activeTab === "engineering"
                            ? "text-rose-600 shrink-0"
                            : activeTab === "logistics"
                              ? "text-rose-600 shrink-0"
                              : "text-blue-600 shrink-0"
                        }
                      />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-[#C4D6EE] shadow-sm space-y-4 text-center">
                <Building2 size={32} className="text-slate-800 mx-auto" />
                <div>
                  <h4 className="text-sm font-black text-slate-800">
                    Bangalore Operations
                  </h4>
                  <span
                    className={`text-xs font-mono font-bold inline-block px-3 py-1.5 rounded-full mt-2 border ${current.themeColor}`}
                  >
                    {current.metric}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
                  Direct factory stock dispatch ready for all major industrial
                  corridors across South India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
