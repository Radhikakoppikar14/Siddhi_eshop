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
  FileText,
} from "lucide-react";

type CapabilityTab = "engineering" | "logistics" | "commercials";

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CapabilityTab>("engineering");

  const capabilities = {
    engineering: {
      title: "Industrial Engineering Expertise",
      subtitle: "20+ Years Field Experience & Application Engineering",
      desc: "Specialized technical assistance helping panel builders, automation engineers, and machine tool manufacturers select exact cable cross-sections, breaking capacities, and IP ratings.",
      badge: "TECHNICAL CONSULTING",
      themeColor: "text-rose-700 bg-rose-50 border-rose-200",
      accentBorder: "border-l-4 border-l-rose-500",
      highlights: [
        "Cable Sizing & Ampacity Engineering",
        "EMC Screening & Shielding Guidance",
        "Breaking Capacity & Selectivity Audits",
      ],
      icon: <Cpu size={22} className="text-rose-600" />,
    },
    logistics: {
      title: "Warehouse & Custom Cut Infrastructure",
      subtitle: "Bangalore Logistics Hub · Same-Day Dispatch",
      desc: "Equipped with motorized cable decoilers, heavy drum cranes, and laser measuring stations to supply exact required cut lengths without charging for unnecessary scrap.",
      badge: "READY WAREHOUSE DRUM",
      themeColor: "text-sky-700 bg-sky-50 border-sky-200",
      accentBorder: "border-l-4 border-l-sky-500",
      highlights: [
        "Exact Meter Cut Delivery on Demand",
        "Heavy Drum Unspooling & Stacking",
        "Same-Day Dispatch & Plant Pickups",
      ],
      icon: <Truck size={22} className="text-sky-600" />,
    },
    commercials: {
      title: "Transparent & Structured Commercials",
      subtitle: "100% Tax Compliant · ITC Pass-Through",
      desc: "Full 18% GST Input Tax Credit (ITC) invoicing, price-firm corporate annual contracting, and certified EN 10204 3.1 manufacturer test reports with every industrial consignment.",
      badge: "GET ITC COMPLIANT",
      themeColor: "text-blue-700 bg-blue-50 border-blue-200",
      accentBorder: "border-l-4 border-l-blue-500",
      highlights: [
        "EN 10204 3.1 Mill Test Certifications",
        "Direct Factory Batch Pricing Tiers",
        "Corporate Credit & Ledger Facilities",
      ],
      icon: <FileCheck2 size={22} className="text-blue-600" />,
    },
  };

  const current = capabilities[activeTab];

  return (
    <section className="py-14 lg:py-20 hybrid-light-bg border-b border-[#E2E8F0] select-none" id="aboutSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header & Corporate Assurance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Company Intro */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9262E] animate-pulse" />
              <span className="text-[#D9262E] font-bold uppercase tracking-wider">COMPANY PROFILE </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1956A6] tracking-tight">
              Siddhi Kabel Corporation
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans max-w-3xl">
              Established as South India’s premier authorized industrial distributor for high-reliability electrical automation components, flexible power cables, and motor control switchgear. Headquartered in Bangalore's trade corridor, we bridge European engineering excellence with immediate on-the-ground warehouse inventory.
            </p>
          </div>

          {/* Corporate Assurance Badge Box */}
          <div className="lg:col-span-4">
            <div className="bg-[#15478A] text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9262E]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#D9262E] font-bold uppercase tracking-wider">CORPORATE ASSURANCE</span>
                <ShieldCheck size={18} className="text-[#D9262E]" />
              </div>
              <h4 className="text-base font-black tracking-tight text-white">
                100% Genuine Products
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
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

        {/* Brand Channels Marquee / Bar */}
        <div className="bg-white rounded-3xl p-6 border border-[#CBD5E1] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#64748B]">
              <Sparkles size={14} className="text-[#D9262E]" />
              <span>DIRECT AUTHORIZED OEM BRAND CHANNELS:</span>
            </div>
            <span className="text-[11px] font-mono text-[#059669] font-semibold">
              100% Genuine Warranty & Factory Traceability
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center pt-2">
            {[
              { name: "LAPP KABEL", origin: "Germany", logo: "/images/logo-lapp.png" },
              { name: "EATON - MOELLER", origin: "Germany / USA", logo: "/images/logo-eaton.png" },
              { name: "PARTEX", origin: "Sweden", logo: "/images/logo-partex.png" },
              { name: "MENNEKES", origin: "Germany", logo: "/images/logo-mennekes.png" },
            ].map((brand, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between shadow-2xs hover-card-lift">
                <img src={brand.logo} alt={brand.name} className="h-5 object-contain max-w-[90px]" />
                <span className="text-[10px] font-mono text-[#64748B] font-semibold">{brand.origin}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE CAPABILITY MATRIX */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-[#CBD5E1] shadow-xl space-y-8">
          
          {/* Interactive Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(
              [
                { id: "engineering", label: "Engineering Expertise", icon: <Cpu size={16} /> },
                { id: "logistics", label: "Warehouse & Custom Cut", icon: <Truck size={16} /> },
                { id: "commercials", label: "Transparent Commercials", icon: <Award size={16} /> },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl text-left font-mono font-bold text-xs transition-all duration-300 flex items-center gap-3 cursor-pointer border hover-card-lift ${
                    isActive
                      ? "bg-[#15478A] text-white border-[#15478A] shadow-lg scale-[1.01]"
                      : "bg-slate-50 text-[#1956A6] border-[#CBD5E1] hover:border-[#475569]"
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isActive ? "bg-blue-700 text-[#D9262E]" : "bg-white text-slate-700 border border-slate-200"}`}>
                    {tab.icon}
                  </div>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Capability Display Box */}
          <div className={`rounded-3xl p-6 sm:p-8 bg-slate-50 border border-[#CBD5E1] shadow-inner transition-all duration-500 animate-fade-in ${current.accentBorder}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white border border-[#CBD5E1] shadow-xs">
                    {current.icon}
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${current.themeColor} mb-1`}>
                      {current.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1956A6] tracking-tight">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">
                  {current.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {current.highlights.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-[#CBD5E1] text-xs font-mono text-[#1956A6] flex items-center gap-2 shadow-2xs">
                      <CheckCircle2 size={14} className="text-[#059669] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Warehouse & Quality Guarantees Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#CBD5E1] shadow-sm space-y-3.5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1956A6] pb-2.5 border-b border-slate-100">
                  <ShieldCheck size={16} className="text-[#D9262E]" />
                  <span>Warehouse & Quality Guarantees</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] text-slate-700">
                  <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>Ready drum stock with custom cut-to-length meters</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <FileText size={14} className="text-slate-600 shrink-0 mt-0.5" />
                    <span>EN 10204 3.1 Mill Test Certificates with every shipment</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Building2 size={14} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>Central Depot: Peenya Industrial Area, Bangalore 560058</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Truck size={14} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>Same-day dispatch for all ex-stock orders received by 2 PM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};