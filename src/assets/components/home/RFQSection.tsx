import React, { useState } from "react";
import { ArrowRight, Layers, ShieldCheck, Tag, Zap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const RfqSection: React.FC = () => {
  const { openRfq } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("lapp");

  const handleLaunchRfq = () => {
    openRfq(`Bulk Procurement - ${selectedCategory.toUpperCase()}`);
  };

  return (
    <section
      className="py-14 lg:py-20 bg-[#F3F7FC] border-b border-slate-300 select-none"
      id="rfqSection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EXECUTIVE B2B COMMERCIAL PROCUREMENT STUDIO BOX */}
        <div className="bg-gradient-to-br from-[#F2F8FE] via-white to-[#FFF9E8] text-slate-800 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-200 relative overflow-hidden flex flex-col justify-between">
          {/* Ambient Glow Orbs */}
          {/* Top Header & Right Button Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left Content */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span>EXECUTIVE B2B COMMERCIAL PROCUREMENT STUDIO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Request a Bulk Project Quotation{" "}
                <span className="text-blue-700">(RFQ)</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Configure your procurement parameters or upload a Bill of
                Materials (BOM). Our Bangalore engineering desk generates
                official GST quotations with guaranteed compliance certificates.
              </p>
            </div>

            {/* Right Side Action Button */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={handleLaunchRfq}
                className="px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-3 transition-transform hover:scale-102 cursor-pointer border border-red-400/40"
              >
                <span>RFQ Application</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* PROCUREMENT CATEGORY SELECTORS (4 BRAND CHANNELS WITH UNIQUE COLORS) */}
          <div className="mt-8 pt-6 border-t border-slate-200 relative z-10 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-800 font-bold block">
              SELECT AUTHORIZED BRAND CHANNEL:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* LAPP: red */}
              <button
                type="button"
                onClick={() => setSelectedCategory("lapp")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "lapp"
                    ? "bg-red-600 text-white border-red-700 shadow-md font-bold scale-[1.02]"
                    : "bg-red-50 text-red-900 border-red-200 hover:bg-red-100"
                }`}
              >
                <Layers
                  size={18}
                  className={
                    selectedCategory === "lapp" ? "text-white" : "text-red-700"
                  }
                />
                <div>
                  <span className="text-xs font-black block">
                    Flexible Cables & Wires
                  </span>
                  <span
                    className={`text-[10px] font-mono block ${selectedCategory === "lapp" ? "text-red-50 font-semibold" : "text-red-700"}`}
                  >
                    LAPP ÖLFLEX® & UNITRONIC®
                  </span>
                </div>
              </button>

              {/* Eaton: light blue */}
              <button
                type="button"
                onClick={() => setSelectedCategory("eaton")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "eaton"
                    ? "bg-sky-200 text-sky-950 border-sky-300 shadow-md font-bold scale-[1.02]"
                    : "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100"
                }`}
              >
                <ShieldCheck size={18} className="text-sky-700" />
                <div>
                  <span className="text-xs font-black block">
                    Industrial Switchgear
                  </span>
                  <span
                    className={`text-[10px] font-mono block ${selectedCategory === "eaton" ? "text-sky-900 font-semibold" : "text-sky-700"}`}
                  >
                    EATON Moeller PKZM0
                  </span>
                </div>
              </button>

              {/* Partex: light yellow */}
              <button
                type="button"
                onClick={() => setSelectedCategory("partex")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "partex"
                    ? "bg-amber-200 text-amber-950 border-amber-300 shadow-md font-bold scale-[1.02]"
                    : "bg-amber-50 text-amber-950 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <Tag
                  size={18}
                  className={
                    selectedCategory === "partex"
                      ? "text-amber-900"
                      : "text-amber-700"
                  }
                />
                <div>
                  <span className="text-xs font-black block">
                    Wire Marking Systems
                  </span>
                  <span
                    className={`text-[10px] font-mono block ${selectedCategory === "partex" ? "text-amber-900 font-semibold" : "text-amber-800"}`}
                  >
                    PARTEX Cable Tagging
                  </span>
                </div>
              </button>

              {/* Mennekes: warm yellow */}
              <button
                type="button"
                onClick={() => setSelectedCategory("mennekes")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "mennekes"
                    ? "bg-amber-200 text-amber-950 border-amber-300 shadow-md font-bold scale-[1.02]"
                    : "bg-amber-50 text-amber-950 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <Zap size={18} className="text-amber-700" />
                <div>
                  <span className="text-xs font-black block">
                    Industrial Plugs & Sockets
                  </span>
                  <span
                    className={`text-[10px] font-mono block ${selectedCategory === "mennekes" ? "text-amber-900 font-semibold" : "text-amber-800"}`}
                  >
                    MENNEKES Heavy-Duty
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
