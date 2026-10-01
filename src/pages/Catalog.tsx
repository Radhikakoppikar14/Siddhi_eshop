import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { CatalogGrid } from "../assets/components/home/CatalogGrid";
import { ShieldCheck, Zap, PackageCheck, Layers } from "lucide-react";

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawBrandParam = searchParams.get("brand") || "all";

  // When the user arrives from the Brand Portfolio section, it passes
  // { fromPortfolio: true } in router state. In that case we hide the hero banner.
  const location = useLocation();
  const fromPortfolio =
    (location.state as { fromPortfolio?: boolean } | null)?.fromPortfolio === true;

  // true when a category is selected on the plain /catalog page (CatalogGrid tells us)
  const [compact, setCompact] = useState(false);

  const getMappedBrand = (b: string) => {
    if (!b || b === "all") return "all";
    const lower = b.toLowerCase();
    if (lower.includes("lapp")) return "LAPP KABEL";
    if (lower.includes("eaton")) return "EATON - MOELLER";
    if (lower.includes("partex")) return "PARTEX SWEDEN";
    if (lower.includes("menn")) return "MENNEKES";
    return b;
  };

  const brandParam = getMappedBrand(rawBrandParam);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBrandChange = (newBrand: string) => {
    if (newBrand === "all") {
      searchParams.delete("brand");
    } else {
      let shortName = "lapp";
      const upper = newBrand.toUpperCase();
      if (upper.includes("EATON")) shortName = "eaton";
      else if (upper.includes("PARTEX")) shortName = "partex";
      else if (upper.includes("MENNEKES")) shortName = "mennekes";
      
      searchParams.set("brand", shortName);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <main className={`min-h-screen bg-[#F3F7FC] ${fromPortfolio || compact ? "py-3 sm:py-5" : "py-6 sm:py-10"}`}>
      {/* Top Breadcrumb & Hero Header */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${fromPortfolio || compact ? "" : "mb-6"}`}>
        

        {/* Catalog Page Hero Banner — hidden when arriving from the Brand Portfolio section */}
        {!fromPortfolio && !compact && (
          <div className="bg-gradient-to-br from-[#F8FAFD] via-[#E5EDF8] to-[#CDDDF1] text-slate-900 rounded-3xl p-6 sm:p-10 border border-[#B0C8E8] shadow-[0_16px_40px_-12px_rgba(43,157,238,0.12),0_2px_8px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Subtle Ambient Radial Golden Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

            {/* Ultra-Soft Warm Champagne Drafting Grid */}
            <div 
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #1779CF 1px, transparent 1px), linear-gradient(to bottom, #1779CF 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Title and Description */}
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-300/90 text-sky-950 font-mono text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
                  <Layers size={13} className="text-sky-800" />
                  <span>Full Products Library</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                  Industrial Products Catalog
                </h1>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  Browse our complete catalog of certified industrial cables, flexible control wires, motor switchgear, wire marking systems, and CEE industrial plugs. Direct authorized distribution from Bangalore Central Warehouse.
                </p>
              </div>

              {/* Right Column: 3 Metric Pills aligned to the right corner */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-2.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-emerald-900 border border-emerald-300/80 font-medium shadow-2xs">
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span>100% Genuine Products Factory Stock</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-sky-950 border border-sky-300/80 font-medium shadow-2xs">
                  <Zap size={14} className="text-sky-600 shrink-0" />
                  <span>GST Tax Credit (18%) Pass-Through</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-sky-950 border border-sky-300/80 font-medium shadow-2xs">
                  <PackageCheck size={14} className="text-sky-600 shrink-0" />
                  <span>Bangalore Warehouse Ready Stock</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Complete Catalog Grid in Full Page Mode */}
      <CatalogGrid
        selectedBrand={brandParam}
        onBrandChange={handleBrandChange}
        isFullPage={true}
        onCompactChange={setCompact}
      />
    </main>
  );
};