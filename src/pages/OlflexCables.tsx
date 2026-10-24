import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  RotateCcw,
  Download,
  ShoppingCart,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { OLFLEX_110_PRODUCTS, ALL_OLFLEX_PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import type { OlflexProduct } from "../types";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const OlflexCables: React.FC = () => {
  const [subgroup, setSubgroup] = useState<"all" | "110" | "110sy" | "110cy" | "100">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCore, setSelectedCore] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { addCustomItem } = useCart();
  const { showToast } = useToast();

  const handleQtyChange = (partNo: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [partNo]: isValidPositiveNumber(val) ? Math.floor(val) : 100,
    }));
  };

  const filteredProducts = useMemo(() => {
    let list: OlflexProduct[] =
      ALL_OLFLEX_PRODUCTS && ALL_OLFLEX_PRODUCTS.length > 0
        ? ALL_OLFLEX_PRODUCTS
        : OLFLEX_110_PRODUCTS;

    if (subgroup === "110") {
      list = list.filter(
        (p) =>
          !p.name.includes("SY") &&
          !p.name.includes("CY") &&
          !p.name.includes("100")
      );
    } else if (subgroup === "110sy") {
      list = list.filter((p) => p.name.includes("SY"));
    } else if (subgroup === "110cy") {
      list = list.filter((p) => p.name.includes("CY"));
    } else if (subgroup === "100") {
      list = list.filter((p) => p.name.includes("100"));
    }

    if (selectedCore !== "all") {
      list = list.filter((p) => p.core.toString() === selectedCore);
    }

    if (selectedSize !== "all") {
      list = list.filter((p) => p.size.toString() === selectedSize);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.partNo.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          (p.desc && p.desc.toLowerCase().includes(q))
      );
    }

    return list;
  }, [subgroup, selectedCore, selectedSize, searchTerm]);

  const handleAddToCart = (product: OlflexProduct) => {
    const qty = quantities[product.partNo] || 100;
    addCustomItem(
      {
        id: `lapp-${product.partNo}`,
        name: product.name,
        partNo: product.partNo,
        brand: "LAPP KABEL",
        price: product.price,
        unit: "meter",
      },
      qty
    );
    showToast(`Added ${qty}m of ${product.name} to RFQ Cart!`);
  };

  const handleExportCSV = () => {
    const headers = [
      "Part No",
      "Product Name",
      "Cores",
      "Size (sq mm)",
      "Basic Price (INR)",
      "GST (INR)",
      "MRP (INR)",
    ];
    const rows = filteredProducts.map((p) => [
      p.partNo,
      `"${p.name}"`,
      p.core,
      p.size,
      p.price,
      p.gst,
      p.mrp,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Siddhi_Lapp_Olflex_Catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported catalog CSV successfully!");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCore("all");
    setSelectedSize("all");
    setSubgroup("all");
  };

  return (
    <div className="py-8 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-mono">
          <Link to="/" className="hover:text-slate-800 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link to="/about-lapp" className="hover:text-slate-800 transition-colors">
            LAPP India
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">
            ÖLFLEX® Technical Tables
          </span>
        </nav>

        {/* Hero Card Banner */}
        <div className="bg-blue-900 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider border border-slate-700">
                  LAPP Germany Engineering Standard
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Series 110 / 110 SY / 110 CY / 100 I
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                ÖLFLEX® Power & Control Cables Master Sheet
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Comprehensive technical data sheet with exact core configurations, conductor cross-sections (0.5 to 35 sq mm), outer diameters, copper index (kg/km), standard MRPs, and discounted net industrial basic prices.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-800 hover:bg-blue-700 border border-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <Download size={14} className="text-slate-400" />
                <span>Export Filtered Table (CSV)</span>
              </button>

              <button
                onClick={() => setSelectedProduct("ÖLFLEX Master Range Inquiry")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-zinc-200 text-slate-800 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <span>Bulk Drum RFQ Quotation</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Subgroup Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl mb-6 shadow-2xs">
          {[
            { id: "all", label: "All ÖLFLEX Cables" },
            { id: "110", label: "CLASSIC 110 (Standard)" },
            { id: "110sy", label: "110 SY (Steel Braided)" },
            { id: "110cy", label: "110 CY (Screened EMC)" },
            { id: "100", label: "ÖLFLEX 100 I (IS:694)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubgroup(tab.id as any)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                subgroup === tab.id
                  ? "bg-blue-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Part No., Cores, Size or Description..."
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-slate-900 bg-zinc-50"
              />
              <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            </div>

            {/* Core selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="font-semibold text-slate-500 font-mono">Cores:</span>
              <select
                value={selectedCore}
                onChange={(e) => setSelectedCore(e.target.value)}
                className="h-10 px-3 rounded-xl border border-slate-200 text-xs bg-zinc-50 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Cores</option>
                <option value="2">2 Core</option>
                <option value="3">3 Core</option>
                <option value="4">4 Core</option>
                <option value="5">5 Core</option>
                <option value="7">7 Core</option>
                <option value="12">12 Core</option>
                <option value="18">18 Core</option>
                <option value="25">25 Core</option>
              </select>
            </div>

            {/* Size selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="font-semibold text-slate-500 font-mono">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="h-10 px-3 rounded-xl border border-slate-200 text-xs bg-zinc-50 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Sizes</option>
                <option value="0.5">0.5 sq mm</option>
                <option value="0.75">0.75 sq mm</option>
                <option value="1">1.0 sq mm</option>
                <option value="1.5">1.5 sq mm</option>
                <option value="2.5">2.5 sq mm</option>
                <option value="4">4.0 sq mm</option>
                <option value="6">6.0 sq mm</option>
                <option value="10">10 sq mm</option>
              </select>
            </div>

            {(searchTerm || selectedCore !== "all" || selectedSize !== "all" || subgroup !== "all") && (
              <button
                onClick={resetFilters}
                className="h-10 px-3 bg-zinc-100 hover:bg-zinc-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Reset filters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono tabular-nums">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> specifications
          </div>
        </div>

        {/* Technical Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-blue-900 text-white font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Part Number</th>
                  <th className="py-3.5 px-4 font-semibold">Product Description</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Cores</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Size (mm²)</th>
                  <th className="py-3.5 px-3 font-semibold text-right">Outer Ø</th>
                  <th className="py-3.5 px-3 font-semibold text-right">Cu Index</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Basic Price / m</th>
                  <th className="py-3.5 px-4 font-semibold text-right">MRP / m</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Order Qty</th>
                  <th className="py-3.5 px-4 font-semibold text-center">RFQ Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredProducts.map((p, idx) => (
                  <tr
                    key={p.partNo}
                    className={`hover:bg-zinc-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-zinc-50/40"
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-slate-800">
                      <Link
                        to={`/product/${p.partNo}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {p.partNo}
                      </Link>
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-800">
                      {p.name}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600 tabular-nums">
                      {p.core}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600 tabular-nums">
                      {p.size}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500 tabular-nums">
                      {p.outerDia ? `${p.outerDia} mm` : "—"}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500 tabular-nums">
                      {p.copperIndex ? `${p.copperIndex} kg` : "—"}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-800 tabular-nums">
                      ₹{p.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-400 line-through tabular-nums text-[11px]">
                      ₹{p.mrp ? p.mrp.toFixed(2) : (p.price * 1.8).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="10"
                        step="10"
                        value={quantities[p.partNo] || 100}
                        onChange={(e) => handleQtyChange(p.partNo, parseInt(e.target.value))}
                        className="w-16 h-8 text-center bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="px-3 py-1.5 bg-blue-900 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                        title="Add meters to RFQ Cart"
                      >
                        <ShoppingCart size={12} />
                        <span>Add</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
