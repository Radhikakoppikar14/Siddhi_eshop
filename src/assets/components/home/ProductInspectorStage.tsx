import React, { useState } from "react";
import {
  CheckCircle2,
  ShoppingCart,
  FileText,
  Copy,
  Check,
  ExternalLink,
  Award,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";

interface ProductInspectorStageProps {
  product: Product;
}

export const ProductInspectorStage: React.FC<ProductInspectorStageProps> = ({
  product,
}) => {
  const { addCustomItem } = useCart();
  const { openQuickView } = useAuth();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(product.unit === "meter" ? 100 : 1);
  const [copiedPart, setCopiedPart] = useState(false);
  const [added, setAdded] = useState(false);

  // Dynamic interactive options based on category
  const [selectedCore, setSelectedCore] = useState(4);
  const [selectedSize, setSelectedSize] = useState(1.5);
  const [selectedCoil, setSelectedCoil] = useState("230V AC");

  const isCable =
    product.category === "cables" ||
    product.brand.toLowerCase().includes("lapp");
  const isSwitchgear =
    product.category === "switchgear" ||
    product.brand.toLowerCase().includes("eaton");

  // Dynamic calculations
  const unitPrice = isCable
    ? Math.max(
        35,
        Math.round(
          product.price *
            (selectedCore / 4) *
            Math.pow(selectedSize / 1.5, 0.6),
        ),
      )
    : product.price;

  const lineTotal = unitPrice * quantity;
  const gstAmount = Math.round(lineTotal * 0.18);
  const totalWithGst = lineTotal + gstAmount;
  const calculatedWeight = isCable
    ? Math.round((selectedCore * selectedSize * 11.5 + 24) * (quantity / 100))
    : 0;

  const handleCopyPart = () => {
    navigator.clipboard?.writeText(product.partNo);
    setCopiedPart(true);
    showToast(`Copied Part No: ${product.partNo}`);
    setTimeout(() => setCopiedPart(false), 2000);
  };

  const handleAddToCart = () => {
    const configuredName = isCable
      ? `${product.name} ${selectedCore}C x ${selectedSize} sq mm`
      : isSwitchgear
        ? `${product.name} (${selectedCoil})`
        : product.name;

    addCustomItem(
      {
        id: `inspector-${product.id}-${Date.now()}`,
        name: configuredName,
        partNo: product.partNo,
        brand: product.brand,
        price: unitPrice,
        unit: product.unit,
      },
      quantity,
    );

    setAdded(true);
    showToast(
      `Added ${quantity} ${product.unit} of ${configuredName} to RFQ Cart!`,
    );
    setTimeout(() => setAdded(false), 2000);
  };

  const handleProjectQuote = () => {
    const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
    if (notes) {
      notes.value = `Official Project RFQ Inquiry:\nProduct: ${product.name}\nPart No: ${product.partNo}\nBrand: ${product.brand}\nRequested Volume: ${quantity} ${product.unit}\n\nPlease share commercial contract quotation with EN 10204 3.1 test certificates and freight to site.`;
      notes.focus();
    }
    document
      .getElementById("rfqSection")
      ?.scrollIntoView({ behavior: "smooth" });
    showToast("Project details loaded into RFQ quotation form!");
  };

  const getBrandStyling = () => {
    const b = product.brand.toLowerCase();
    if (b.includes("lapp")) {
      return {
        pill: "bg-rose-400/20 text-rose-300 border-rose-400/40",
        badge: "bg-rose-100 text-rose-900 border-rose-300",
        highlight: "from-rose-400 via-rose-400 to-rose-200",
        accent: "text-rose-400",
        btnGradient:
          "from-rose-500 to-rose-500 hover:from-rose-400 hover:to-rose-400 text-slate-800 font-black",
        logo: "/images/logo-lapp.png",
        origin: "Stuttgart, Germany",
      };
    }
    if (b.includes("eaton")) {
      return {
        pill: "bg-sky-400/20 text-sky-300 border-sky-400/40",
        badge: "bg-sky-100 text-sky-900 border-sky-300",
        highlight: "from-sky-400 via-indigo-400 to-sky-200",
        accent: "text-sky-400",
        btnGradient:
          "from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold",
        logo: "/images/logo-eaton.png",
        origin: "Germany / USA",
      };
    }
    if (b.includes("partex")) {
      return {
        pill: "bg-amber-400/20 text-amber-200 border-amber-400/40",
        badge: "bg-amber-100 text-amber-950 border-amber-300",
        highlight: "from-amber-300 via-yellow-300 to-amber-100",
        accent: "text-amber-300",
        btnGradient:
          "from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 font-black",
        logo: "/images/logo-partex.png",
        origin: "Gullspång, Sweden",
      };
    }
    if (b.includes("menn")) {
      return {
        pill: "bg-slate-400/20 text-slate-300 border-slate-400/40",
        badge: "bg-slate-100 text-slate-900 border-slate-300",
        highlight: "from-slate-400 via-rose-400 to-slate-200",
        accent: "text-slate-400",
        btnGradient:
          "from-slate-600 to-rose-600 hover:from-slate-500 hover:to-rose-500 text-white font-bold",
        logo: "/images/logo-mennekes.png",
        origin: "Kirchhundem, Germany",
      };
    }
    return {
      pill: "bg-slate-700 text-slate-300 border-slate-600",
      badge: "bg-slate-100 text-slate-900 border-slate-300",
      highlight: "from-slate-200 to-slate-400",
      accent: "text-slate-300",
      btnGradient: "from-blue-700 to-blue-900 text-white font-bold",
      logo: "/images/siddhi-kabel-logo.png",
      origin: "Bangalore, India",
    };
  };

  const style = getBrandStyling();

  return (
    <div
      id="productInspectorStage"
      className="mt-8 sm:mt-10 bg-[#15498C] text-white rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden animate-fade-in"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/90 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            21ST CENTURY SPEC_INSPECTOR // ACTIVE COMPONENT
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${style.pill} flex items-center gap-1.5`}
          >
            <Sparkles size={11} />
            {product.brand} · {style.origin}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-semibold">
            EN 10204 3.1 CERTIFIED
          </span>
        </div>
      </div>

      {/* 3-Column Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 relative z-10 items-stretch">
        {/* Column 1: Image Stage & Brand Provenance (Col 1-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          {/* Main Photo Pedestal with Zoom on Hover */}
          <div className="h-64 sm:h-72 w-full bg-white rounded-3xl p-5 flex items-center justify-center relative overflow-hidden border border-slate-700 shadow-xl group">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/card-cables.jpg";
              }}
            />

            {/* Quick Inspect Trigger */}
            <button
              type="button"
              onClick={() => openQuickView(product)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-blue-900/80 text-white hover:bg-blue-800 border border-slate-700 shadow-md text-xs font-semibold flex items-center gap-1.5 opacity-90 hover:opacity-100"
              title="Open full dialog view"
            >
              <ExternalLink size={13} />
              <span>Full Spec</span>
            </button>
          </div>

          {/* Provenance Box */}
          <div className="p-4 rounded-2xl bg-blue-800/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-6 px-2 bg-white rounded-md flex items-center justify-center">
                  <img
                    src={style.logo}
                    alt={product.brand}
                    className="h-3.5 w-auto object-contain max-w-[65px]"
                  />
                </div>
                <span className="font-semibold text-slate-300">
                  Authorized Stockist
                </span>
              </div>
              <span className="text-[10px] text-blue-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 size={12} />
                100% Genuine OEM
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <MapPin size={12} className="text-rose-400 shrink-0" />
              <span>Bangalore Central Hub Stock: &lt;24h Dispatch</span>
            </div>
          </div>
        </div>

        {/* Column 2: Technical Specifications & Live Configurator (Col 5-8) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title & SKU */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono text-slate-400">SKU:</span>
                <button
                  type="button"
                  onClick={handleCopyPart}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-700 hover:bg-slate-700 text-sky-400 text-xs font-mono font-bold transition-colors"
                  title="Click to copy part number"
                >
                  <span>{product.partNo}</span>
                  {copiedPart ? (
                    <Check size={11} className="text-blue-400" />
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
              </div>

              <h2
                className={`text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${style.highlight} leading-tight`}
              >
                {product.name}
              </h2>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {(product as any).description || product.application}
              </p>
            </div>

            {/* Interactive Live Parameters */}
            {isCable && (
              <div className="p-4 rounded-2xl bg-blue-800/80 border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono uppercase font-bold text-rose-400 tracking-wider block">
                  Interactive Cable Spec Configurator
                </span>

                {/* Cores Selector */}
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    Number of Cores:{" "}
                    <strong className="text-white">{selectedCore}C</strong>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[2, 3, 4, 5, 7].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCore(c)}
                        className={`py-1 px-3 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedCore === c
                            ? "bg-rose-400 text-slate-800 shadow-sm"
                            : "bg-blue-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {c}C
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    Cross Section:{" "}
                    <strong className="text-white">{selectedSize} sq mm</strong>
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[0.75, 1.0, 1.5, 2.5, 4.0].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`py-1 px-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedSize === s
                            ? "bg-sky-400 text-slate-800 shadow-sm"
                            : "bg-blue-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {s} mm²
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated weight preview */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <span>Approx Net Drum Weight:</span>
                  <span className="text-white font-bold">
                    {calculatedWeight} kg
                  </span>
                </div>
              </div>
            )}

            {isSwitchgear && (
              <div className="p-4 rounded-2xl bg-blue-800/80 border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono uppercase font-bold text-sky-400 tracking-wider block">
                  Switchgear Voltage & Aux Configuration
                </span>
                <div className="flex items-center gap-2">
                  {["230V AC", "415V AC", "24V DC"].map((coil) => (
                    <button
                      key={coil}
                      type="button"
                      onClick={() => setSelectedCoil(coil)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                        selectedCoil === coil
                          ? "bg-sky-400 text-slate-800"
                          : "bg-blue-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      {coil}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Breaking Capacity:{" "}
                  <strong className="text-white">150 kA @ 400V</strong> ·
                  Phase-Failure Sensitivity
                </div>
              </div>
            )}

            {/* Technical Bullet Spec Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {product.specs.slice(0, 4).map((spec, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-blue-800/70 border border-slate-800/80 text-slate-300"
                >
                  <span className="text-[10px] text-slate-500 block">
                    SPEC_0{idx + 1}
                  </span>
                  <span className="text-[11px] font-medium leading-tight truncate block">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <Award size={13} className="text-rose-400 shrink-0" />
            <span>
              EN 10204 3.1 Mill Test Certificates available upon order dispatch.
            </span>
          </div>
        </div>

        {/* Column 3: Commercial Calculation & Action Engine (Col 9-12) */}
        <div className="lg:col-span-3 bg-blue-800/90 rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block border-b border-slate-800 pb-2">
              COMMERCIAL COMPUTATION
            </span>

            {/* Quantity Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">
                  Order Quantity:
                </span>
                <span className="font-mono text-white font-bold">
                  {quantity} {product.unit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  step={product.unit === "meter" ? 25 : 1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-full h-10 px-3 rounded-xl bg-blue-900 border border-slate-700 text-white font-mono text-sm outline-none focus:border-sky-400"
                />
              </div>
              {product.unit === "meter" && (
                <div className="flex items-center gap-1.5 mt-2">
                  {[50, 100, 200, 500].map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => setQuantity(len)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        quantity === len
                          ? "bg-rose-400 text-slate-800 font-bold"
                          : "bg-blue-700 text-slate-400"
                      }`}
                    >
                      {len}m
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rates & GST Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Base Rate ({product.unit}):</span>
                <span className="text-white font-bold">
                  ₹{unitPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>
                  Subtotal ({quantity} {product.unit}):
                </span>
                <span className="text-white font-bold">
                  ₹{lineTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>GST (18% ITC):</span>
                <span className="text-blue-400 font-bold">
                  +₹{gstAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-800 text-sm font-black">
                <span className="text-slate-200">Total Inc. GST:</span>
                <span className="text-blue-400 text-base">
                  ₹{totalWithGst.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-102 bg-gradient-to-r ${style.btnGradient}`}
            >
              {added ? (
                <>
                  <Check size={15} />
                  <span>Added to RFQ Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  <span>+ Add to RFQ Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleProjectQuote}
              className="w-full py-3 px-4 rounded-2xl bg-blue-700 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <FileText size={14} className="text-rose-400" />
              <span>Project Quote In RFQ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
