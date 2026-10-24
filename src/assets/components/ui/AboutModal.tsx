import React, { useEffect } from "react";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Building2,
  ArrowRight,
  X,
  HelpCircle,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";

interface AboutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const brandPartnerships = [
    {
      name: "LAPP Kabel",
      location: "Stuttgart, Germany",
      desc: "ÖLFLEX® control cables, UNITRONIC® data lines, SKINTOP® glands",
      hoverStyle: "hover:bg-rose-500 hover:text-slate-800 hover:border-rose-500 hover:shadow-lg",
      badgeStyle: "bg-rose-100 text-rose-900 border-rose-300",
      dotColor: "bg-rose-500",
    },
    {
      name: "EATON Moeller",
      location: "Bonn, Germany",
      desc: "PKZM0 motor protectors, DILM contactors, NZM circuit breakers",
      hoverStyle: "hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] hover:shadow-lg",
      badgeStyle: "bg-sky-100 text-sky-900 border-sky-300",
      dotColor: "bg-sky-500",
    },
    {
      name: "PARTEX Sweden",
      location: "Gullspång, Sweden",
      desc: "PA chevron markers, ProMark T-1000 printers, PKS stainless tags",
      hoverStyle: "hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-lg",
      badgeStyle: "bg-rose-100 text-rose-900 border-rose-300",
      dotColor: "bg-rose-500",
    },
    {
      name: "MENNEKES",
      location: "Kirchhundem, Germany",
      desc: "PowerTOP® Xtra industrial plugs, AMAXX® modular distribution",
      hoverStyle: "hover:bg-slate-700 hover:text-white hover:border-slate-700 hover:shadow-lg",
      badgeStyle: "bg-slate-100 text-slate-900 border-slate-300",
      dotColor: "bg-slate-500",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#F3F7FC] via-[#F4F7FC] to-[#D5E2F3] rounded-[2.5rem] w-full max-w-4xl max-h-[88vh] flex flex-col border border-[#C4D6EE] shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* STICKY MODAL HEADER */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#C4D6EE] bg-[#F4F7FC]/95 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-600 text-white shadow-md">
              <Building2 size={20} />
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">CORPORATE PROFILE</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold border border-blue-300">
                EST. 1998
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* SCROLLABLE BODY CONTAINER */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto flex-1 z-10">
          
          <h2 className="text-2xl sm:text-3xl font-black text-[#1956A6] tracking-tight">
            About Siddhi Kabel Corporation
          </h2>

          {/* INTRO BOX */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#15478A] text-white shadow-xl relative overflow-hidden space-y-2.5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-400" /> AUTHORISED DIRECT CHANNEL PARTNER
              </span>
              <span className="text-slate-400">Bangalore Hub</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              Siddhi Kabel Corporation Private Limited is a premier Indian B2B industrial infrastructure distributor headquartered in Bangalore. We specialize in genuine OEM supply chains, delivering heavy-duty cables, motor switchgear, wire marking, and industrial plugs directly to manufacturing plants, OEMs, switchboard builders, and EPC contractors.
            </p>
          </div>

          {/* TELEMETRY METRICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { val: "40K+", label: "Sq.ft Warehouse" },
              { val: "<24h", label: "Ready Dispatch" },
              { val: "100%", label: "Original OEM" },
              { val: "10,000+", label: "Active SKUs" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/90 border border-[#C4D6EE] text-center space-y-0.5 shadow-sm">
                <div className="text-lg sm:text-xl font-black font-mono text-slate-800">{stat.val}</div>
                <div className="text-[11px] font-mono text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* BRAND PARTNERSHIPS SECTION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#64748B]">
              <Sparkles size={14} className="text-rose-600" />
              <span>DIRECT AUTHORISED BRAND PARTNERSHIPS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {brandPartnerships.map((brand, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer bg-white/90 border-[#C4D6EE] shadow-xs ${brand.hoverStyle}`}
                >
                  <div className="space-y-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${brand.dotColor}`} />
                      <h4 className="text-sm font-black group-hover:text-inherit">{brand.name}</h4>
                      <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${brand.badgeStyle}`}>
                        {brand.location}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 group-hover:text-white/90 font-sans truncate">
                      {brand.desc}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-white text-slate-900 shadow-2xs shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WAREHOUSE & QUALITY GUARANTEES (PROFESSIONAL ONE-BY-ONE LAYOUT) */}
          <div className="p-5 rounded-2xl bg-white/90 border border-[#C4D6EE] space-y-3.5 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 pb-2.5 border-b border-slate-100">
              <ShieldCheck size={16} className="text-rose-600" />
              <span>Warehouse & Quality Guarantees</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] text-slate-700">
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                <span>Ready drum stock with custom cut-to-length meters</span>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FileText size={14} className="text-slate-600 shrink-0 mt-0.5" />
                <span>EN 10204 3.1 Mill Test Certificates with every shipment</span>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Building2 size={14} className="text-rose-600 shrink-0 mt-0.5" />
                <span>Central Depot: Peenya Industrial Area, Bangalore 560058</span>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Truck size={14} className="text-rose-600 shrink-0 mt-0.5" />
                <span>Same-day dispatch for all ex-stock orders received by 2 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* STICKY MODAL FOOTER */}
        <div className="px-6 sm:px-10 py-4 border-t border-[#C4D6EE] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F4F7FC]/95 backdrop-blur-md z-20 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <HelpCircle size={14} />
            <span>Open Helpdesk & Support</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
            >
              <FileText size={14} />
              <span>Browse Catalog</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#15478A] hover:bg-blue-800 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <span>Request Quote</span>
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};