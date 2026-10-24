import React, { useState } from "react";
import {
  ArrowRight,
  ShoppingCart,
  Sparkles,
  Zap,
  Gauge,
  Ruler,
  Package,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";

export const HeroBanner: React.FC = () => {
  const { addCustomItem } = useCart();
  const { showToast } = useToast();

  const [activeItem, setActiveItem] = useState<"lapp" | "eaton" | "partex" | "mennekes">("lapp");

  // Interactive configurator state for cable inspector
  const [cores, setCores] = useState(4);
  const [size, setSize] = useState(1.5);
  const [drumLength, setDrumLength] = useState(100);

  // Dynamic calculations for Lapp cable interactive display
  const calculatedWeight = Math.round((cores * size * 11.2 + 25) * (drumLength / 100));
  const estimatedUnitPrice = Math.max(
    32,
    Math.round(28 * Math.pow(cores, 0.45) * Math.pow(size, 0.72) + 14)
  );
  const estimatedLineTotal = estimatedUnitPrice * drumLength;

  const handleAddConfiguredCable = () => {
    const configName = `ÖLFLEX® CLASSIC 110 ${cores} Core x ${size} sq mm (${drumLength}m Drum)`;
    addCustomItem(
      {
        id: `hero-lapp-${cores}x${size}-${drumLength}m`,
        name: configName,
        partNo: `LAPP-111920${cores}`,
        brand: "LAPP KABEL",
        price: estimatedUnitPrice,
        unit: "meter",
      },
      drumLength
    );
    showToast(`Added ${drumLength}m of ${configName} to RFQ Cart!`);
  };

  const handleAddPresetItem = (partNo: string, name: string, brand: string, price: number, unit: string) => {
    addCustomItem(
      {
        id: `hero-${partNo}`,
        name,
        partNo,
        brand,
        price,
        unit,
      },
      1
    );
    showToast(`Added ${name} to RFQ Cart!`);
  };

  const brandTabs = [
    { id: "lapp", label: "LAPP", dot: "bg-rose-400", active: "bg-white text-slate-800" },
    { id: "eaton", label: "EATON", dot: "bg-sky-400", active: "bg-white text-slate-800" },
    { id: "partex", label: "PARTEX", dot: "bg-blue-400", active: "bg-white text-slate-800" },
    { id: "mennekes", label: "MENNEKES", dot: "bg-slate-400", active: "bg-white text-slate-800" },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#144586] py-20 lg:py-28 select-none">
      {/* Ambient engineering-grid backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-rose-500/20 via-rose-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[34rem] w-[34rem] rounded-full bg-gradient-to-tl from-sky-500/15 via-indigo-500/5 to-transparent blur-3xl" />
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Editorial headline + commercial context */}
          <div className="lg:col-span-6 space-y-7">

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 motion-reduce:animate-none animate-pulse" />
                Bangalore central supply hub
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 text-[11px] font-medium">
                Under 24h pan-India dispatch
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.06] text-white">
              Industrial electrical infrastructure,
              <span className="block mt-1.5 bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-rose-300 to-rose-300">
                sourced direct from Europe
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Authorised channel partners for <span className="text-white font-medium">Lapp Kabel Germany</span>, <span className="text-white font-medium">Eaton Moeller</span>, <span className="text-white font-medium">Partex Sweden</span>, and <span className="text-white font-medium">Mennekes</span> — zero grey imports, ready warehouse drum stock, fast B2B quotations.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#rfqSection"
                className="group px-6 py-3.5 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-300 hover:to-rose-400 text-slate-800 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-rose-500/20 hover:scale-[1.02]"
              >
                <span>Request project RFQ</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#productsSection"
                className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 border border-white/10 hover:scale-[1.02]"
              >
                <Zap size={15} className="text-rose-300" />
                <span>Browse inventory catalog</span>
              </a>
            </div>

            {/* Brand strip - quiet, textual rather than four repeated boxes */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 border-t border-white/10 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Lapp Kabel</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Eaton Moeller</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Partex Sweden</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Mennekes</span>
              <span className="ml-auto flex items-center gap-4 font-mono text-[11px] text-slate-500">
                <span><strong className="text-white font-semibold">4</strong> OEMs</span>
                <span><strong className="text-blue-300 font-semibold">100%</strong> certified</span>
                <span><strong className="text-sky-300 font-semibold">18%</strong> GST ITC</span>
              </span>
            </div>

          </div>

          {/* Right Column: Live Spec Terminal — the actual centerpiece */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 sm:px-7 pt-6 pb-4 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <Gauge size={15} className="text-rose-300" />
                  <span className="text-xs font-medium text-slate-300">Live spec inspector</span>
                </div>
                <span className="text-[10px] uppercase font-semibold text-rose-300/90 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 tracking-wide flex items-center gap-1.5">
                  <Sparkles size={11} />
                  configure &amp; quote
                </span>
              </div>

              {/* Brand Selector */}
              <div className="grid grid-cols-4 gap-1.5 p-1.5 mx-6 sm:mx-7 mt-5 bg-white/10 rounded-2xl border border-white/10 relative z-10">
                {brandTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveItem(tab.id)}
                    className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeItem === tab.id
                        ? `${tab.active} shadow-md`
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Content Panel */}
              <div className="p-6 sm:p-7 relative z-10">
                {activeItem === "lapp" && (
                  <div className="space-y-4 animate-fade-in">

                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                      <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <img
                          src="/images/cable-olflex-angle.png"
                          alt="LAPP Cable"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/card-olflex.jpg";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-rose-300 font-semibold block">
                          LAPP Kabel Germany · Oil resistant
                        </span>
                        <h3 className="text-sm font-semibold text-white truncate">
                          ÖLFLEX® CLASSIC 110 Control Cable
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          VDE Reg. 7030 · PVC sheath · −40°C to +80°C
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5 text-slate-400">
                          <span className="flex items-center gap-1.5"><Package size={12} /> Cores</span>
                          <span className="font-mono text-white font-semibold">{cores}C</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 text-xs">
                          {[2, 3, 4, 5, 7].map((c) => (
                            <button
                              key={c}
                              onClick={() => setCores(c)}
                              className={`py-1.5 rounded-lg text-center transition-all cursor-pointer font-mono ${
                                cores === c
                                  ? "bg-rose-300 text-slate-800 font-semibold"
                                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/5"
                              }`}
                            >
                              {c}C
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5 text-slate-400">
                          <span className="flex items-center gap-1.5"><Ruler size={12} /> Cross section</span>
                          <span className="font-mono text-white font-semibold">{size} mm²</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 text-xs">
                          {[0.5, 0.75, 1.0, 1.5, 2.5].map((s) => (
                            <button
                              key={s}
                              onClick={() => setSize(s)}
                              className={`py-1.5 rounded-lg text-center transition-all cursor-pointer font-mono ${
                                size === s
                                  ? "bg-sky-300 text-slate-800 font-semibold"
                                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/5"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1 text-slate-400">
                          <span>Drum length</span>
                          <span className="font-mono text-rose-300 font-semibold">{drumLength} m</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="1000"
                          step="50"
                          value={drumLength}
                          onChange={(e) => setDrumLength(parseInt(e.target.value))}
                          className="w-full accent-rose-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                          <span>50m ring</span>
                          <span>500m standard</span>
                          <span>1000m master reel</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-slate-400">
                          Estimated total ({drumLength}m)
                        </div>
                        <div className="text-lg font-bold font-mono text-white">
                          ₹{estimatedLineTotal.toLocaleString("en-IN")}
                          <span className="text-xs text-slate-400 font-normal ml-1.5">
                            (₹{estimatedUnitPrice}/m)
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Approx weight: ~{calculatedWeight} kg
                        </div>
                      </div>

                      <button
                        onClick={handleAddConfiguredCable}
                        className="py-3 px-5 bg-white text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer hover:scale-[1.02]"
                      >
                        <ShoppingCart size={15} />
                        <span>Add to RFQ</span>
                      </button>
                    </div>

                  </div>
                )}

                {activeItem === "eaton" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                      <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <img src="/images/eaton-pkzm0.jpg" alt="EATON PKZM0" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-sky-300 font-semibold block">
                          Eaton Moeller Germany · Motor protection
                        </span>
                        <h3 className="text-sm font-semibold text-white truncate">
                          PKZM0-16 Motor-Protective Circuit-Breaker
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          10–16A setting range · 150 kA breaking · Phase failure sensitive
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/10 text-slate-400">
                        <span>Rated operational voltage</span>
                        <span className="font-mono text-white font-semibold">690V AC</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10 text-slate-400">
                        <span>Short-circuit breaking capacity</span>
                        <span className="font-mono text-white font-semibold">150 kA @ 400V</span>
                      </div>
                      <div className="flex justify-between py-1 text-slate-400">
                        <span>Standards compliance</span>
                        <span className="font-mono text-white font-semibold">IEC/EN 60947-4-1</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-slate-400">Base list price</div>
                        <div className="text-lg font-bold font-mono text-white">
                          ₹3,250.00
                          <span className="text-xs text-slate-400 font-normal ml-1">/ unit</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddPresetItem("EATON-PKZM0-16", "PKZM0-16 Motor Starter", "EATON - MOELLER", 3250, "unit")}
                        className="py-3 px-5 bg-white text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer hover:scale-[1.02]"
                      >
                        <ShoppingCart size={15} />
                        <span>Add to RFQ</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeItem === "partex" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                      <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <img src="/images/partex-pa.jpg" alt="Partex PA" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-blue-300 font-semibold block">
                          Partex Sweden · Wire identification
                        </span>
                        <h3 className="text-sm font-semibold text-white truncate">
                          PA-1 Closed Chevron Cut Wire Markers
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Interlocking chevron profile · 0.75–4.0 mm² · Cadmium-free PVC
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/10 text-slate-400">
                        <span>Wire diameter compatibility</span>
                        <span className="font-mono text-white font-semibold">2.5–5.0 mm</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10 text-slate-400">
                        <span>Flammability rating</span>
                        <span className="font-mono text-white font-semibold">UL94-V0</span>
                      </div>
                      <div className="flex justify-between py-1 text-slate-400">
                        <span>Packaging</span>
                        <span className="font-mono text-white font-semibold">1,000 / reel</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-slate-400">Base list price (1000 pack)</div>
                        <div className="text-lg font-bold font-mono text-white">
                          ₹480.00
                          <span className="text-xs text-slate-400 font-normal ml-1">/ pack</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddPresetItem("PARTEX-PA1-SET", "PA-1 Wire Markers (1000 Pack)", "PARTEX SWEDEN", 480, "pack")}
                        className="py-3 px-5 bg-white text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer hover:scale-[1.02]"
                      >
                        <ShoppingCart size={15} />
                        <span>Add to RFQ</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeItem === "mennekes" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                      <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <img src="/images/menn-powertop.jpg" alt="Mennekes PowerTOP" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-300 font-semibold block">
                          Mennekes Germany · CEE plugs &amp; sockets
                        </span>
                        <h3 className="text-sm font-semibold text-white truncate">
                          PowerTOP® Xtra 32A 5P Heavy Duty Plug
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          IP67 watertight · SafeCONTACT · 400V red
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/10 text-slate-400">
                        <span>Poles &amp; voltage</span>
                        <span className="font-mono text-white font-semibold">5P (3P+N+E) 400V</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10 text-slate-400">
                        <span>Ingress protection</span>
                        <span className="font-mono text-white font-semibold">IP67</span>
                      </div>
                      <div className="flex justify-between py-1 text-slate-400">
                        <span>Terminal style</span>
                        <span className="font-mono text-white font-semibold">Screwless SafeCONTACT</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-slate-400">Base list price</div>
                        <div className="text-lg font-bold font-mono text-white">
                          ₹2,840.00
                          <span className="text-xs text-slate-400 font-normal ml-1">/ unit</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddPresetItem("MENN-PT-32A5P", "PowerTOP Xtra 32A 5P Plug", "MENNEKES", 2840, "unit")}
                        className="py-3 px-5 bg-white text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer hover:scale-[1.02]"
                      >
                        <ShoppingCart size={15} />
                        <span>Add to RFQ</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
