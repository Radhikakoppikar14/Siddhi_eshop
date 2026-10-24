import React, { useState } from "react";
import {
  X,
  ShoppingCart,
  Check,
  ArrowRight,
  ShieldCheck,
  FileText,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  PackageCheck,
  BadgeCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared product view — used by BOTH the Quick View popup and the    */
/* /product/:id page, so the two always look and behave the same.     */
/* Put this file next to LappCatalogBrowser.tsx                        */
/* (src/assets/components/products/ProductView.tsx)                    */
/* ------------------------------------------------------------------ */

const FALLBACK_IMG = "/images/card-cables.jpg";

export const CORE_OPTIONS = ["3 Cores (with Earth)", "4 Cores (with Earth)", "5 Cores (with Earth)"];
export const SIZE_OPTIONS = ["1.5 mm²", "2.5 mm²", "4.0 mm²", "6.0 mm²"];
export const COLOR_OPTIONS = [
  { value: "Silver-Grey RAL 7001", name: "Silver-Grey", note: "RAL 7001", hex: "#9CA3AF" },
  { value: "Black Sheath", name: "Black", note: "Standard", hex: "#164D95" },
  { value: "Teal Green RAL 6018", name: "Teal Green", note: "RAL 6018", hex: "#0F766E" },
];

// ---------------------------------------------------------------
// PICTURE FOR EACH OPTION — the main picture changes when a
// core / size / colour option is clicked (LAPP products).
// Replace these paths with your real photos (one per option).
// ---------------------------------------------------------------
const CORE_IMAGES: Record<string, string> = {
  "3 Cores (with Earth)": "/images/cable1.png",
  "4 Cores (with Earth)": "/images/cable2.png",
  "5 Cores (with Earth)": "/images/cable3.png",
};
const SIZE_IMAGES: Record<string, string> = {
  "1.5 mm²": "/images/cable4.png",
  "2.5 mm²": "/images/cable5.png",
  "4.0 mm²": "/images/cable7.png",
  "6.0 mm²": "/images/cable10.png",
};
const COLOR_IMAGES: Record<string, string> = {
  "Silver-Grey RAL 7001": "/images/cable14.png",
  "Black Sheath": "/images/cable12.png",
  "Teal Green RAL 6018": "/images/cable13.png",
};

export interface ProductSelection {
  core: string;
  size: string;
  color: string;
}
export interface ProductConfig extends ProductSelection {
  qty: number;
  rate: number;
}

interface ProductViewProps {
  brand: string;
  partNo: string;
  title: string;
  unit: string;
  stock?: string;
  isLapp?: boolean;
  images: string[];
  specs?: string[];
  application?: string;
  initial?: Partial<ProductSelection>;
  getRate: (sel: ProductSelection) => number;
  onAddToQuote: (cfg: ProductConfig) => void;
  onFormalQuote: (cfg: ProductConfig) => void;
  onDatasheet?: () => void;
  onClose?: () => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  brand,
  partNo,
  title,
  unit,
  stock,
  isLapp = false,
  images,
  specs = [],
  application,
  initial,
  getRate,
  onAddToQuote,
  onFormalQuote,
  onDatasheet,
  onClose,
}) => {
  // Map whatever the catalog gives us onto one of the available options
  const pick = (raw: string | undefined, options: string[], fallback: string) => {
    if (!raw) return fallback;
    return options.find((o) => o === raw || o.toLowerCase().startsWith(raw.toLowerCase().split(" ")[0])) ?? fallback;
  };

  const [core, setCore] = useState(pick(initial?.core, CORE_OPTIONS, "4 Cores (with Earth)"));
  const [size, setSize] = useState(pick(initial?.size, SIZE_OPTIONS, "2.5 mm²"));
  const [color, setColor] = useState(
    pick(initial?.color, COLOR_OPTIONS.map((c) => c.value), "Black Sheath")
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Gallery + zoom
  const gallery = images.length ? images : [FALLBACK_IMG];
  const [imgIdx, setImgIdx] = useState(0);
  const [variantImg, setVariantImg] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const shownImg = variantImg ?? gallery[imgIdx] ?? FALLBACK_IMG;

  const changeZoom = (d: number) => setZoom((z) => Math.min(3, Math.max(1, Number((z + d).toFixed(1)))));
  const onZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const choose = (setter: (v: string) => void, value: string, img?: string) => {
    setter(value);
    if (img) setVariantImg(img);
    setZoom(1);
    setZoomPos({ x: 50, y: 50 });
  };
  const imgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMG;
  };

  // Text that follows the selection (LAPP)
  const coreCount = core.split(" ")[0];
  const earthNote = core.match(/\(([^)]+)\)/)?.[1] ?? "";
  const sizeNum = size.replace(/\s*mm²/, "");
  const summary = `${coreCount} Cores × ${sizeNum} mm² · ${color}`;
  const displaySpecs = isLapp
    ? [
        `${coreCount} Cores x ${sizeNum} sq mm${earthNote ? ` (${earthNote})` : ""}`,
        `Sheath Colour: ${color}`,
        ...specs.filter((s) => !/core/i.test(s) && !/colou?r/i.test(s)),
      ]
    : specs;

  const rate = getRate({ core, size, color });
  const total = (rate * qty).toFixed(2);
  const inr = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const cfg: ProductConfig = { core, size, color, qty, rate };

  const handleAdd = () => {
    onAddToQuote(cfg);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const label = "text-[11px] font-bold uppercase tracking-wider text-slate-500";

  return (
    <div className="relative bg-white rounded-[2rem] border border-white/80 overflow-hidden shadow-[-24px_28px_80px_-24px_rgba(251,113,133,0.50),24px_28px_80px_-24px_rgba(36,91,219,0.50)]">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-sm transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ============ LEFT: gallery + specifications ============ */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col gap-6 bg-gradient-to-br from-rose-50 via-white to-sky-50">
          <div className="flex flex-col-reverse sm:flex-row gap-4 flex-1">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 shrink-0 justify-center sm:justify-start">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setImgIdx(i);
                    setVariantImg(null);
                    setZoom(1);
                  }}
                  aria-label={`Show image ${i + 1}`}
                  className={`w-16 h-16 rounded-2xl bg-white border p-1.5 flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                    !variantImg && imgIdx === i
                      ? "border-sky-500 ring-2 ring-sky-400/30 shadow-md"
                      : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
                  }`}
                >
                  <img src={img} alt={`${title} view ${i + 1}`} className="max-h-full max-w-full object-contain" onError={imgError} />
                </button>
              ))}
            </div>

            {/* Image stage */}
            <div
              className={`relative flex-1 min-h-[20rem] rounded-3xl bg-white border border-slate-200 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.18)] overflow-hidden ${
                zoom > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => {
                setZoom((z) => (z > 1 ? 1 : 2));
                setZoomPos({ x: 50, y: 50 });
              }}
              onMouseMove={onZoomMove}
              onMouseLeave={() => zoom > 1 && setZoomPos({ x: 50, y: 50 })}
            >
              <img
                key={shownImg}
                src={shownImg}
                alt={title}
                draggable={false}
                onError={imgError}
                className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-md transition-transform duration-200 ease-out select-none pointer-events-none animate-fade-in"
                style={{ transform: `scale(${zoom})`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
              />

              {stock && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-emerald-200 text-emerald-800 text-[11px] font-semibold font-mono shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {stock}
                </span>
              )}

              <div
                className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur border border-slate-200 rounded-xl p-1 shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <button type="button" onClick={() => changeZoom(-0.5)} disabled={zoom <= 1} aria-label="Zoom out" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                  <ZoomOut size={14} />
                </button>
                <span className="w-10 text-center text-[10px] font-mono font-bold text-slate-700">{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={() => changeZoom(0.5)} disabled={zoom >= 3} aria-label="Zoom in" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {displaySpecs.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-1">
                <BadgeCheck size={16} className="text-sky-500" />
                Technical Specifications
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {displaySpecs.map((sp, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-2.5 border-b border-slate-200/80 text-xs text-slate-700">
                    <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span className="leading-snug break-words">{sp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ============ RIGHT: details, options, price ============ */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col gap-6 lg:border-l border-slate-200/70">
          {/* Header */}
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 border border-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                {brand}
              </span>
              <span className="text-[11px] font-mono text-slate-500">Part No: <b className="text-slate-800">{partNo}</b></span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-800 leading-tight pr-10">{title}</h2>
            {isLapp && (
              <p key={summary} className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-900 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                {summary}
              </p>
            )}
          </div>

          {/* Options */}
          {isLapp ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className={label}>Cores</span>
                  <span className="text-[11px] font-mono text-slate-500">{earthNote}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100">
                  {CORE_OPTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => choose(setCore, c, CORE_IMAGES[c])}
                      className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        core === c ? "bg-white text-slate-800 shadow-md ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {c.split(" ")[0]} Cores
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className={label}>Conductor size</span>
                  <span className="text-[11px] font-mono text-slate-500">cross-section</span>
                </div>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-100">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => choose(setSize, s, SIZE_IMAGES[s])}
                      className={`py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        size === s ? "bg-sky-400 text-slate-800 shadow-md" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className={label}>Sheath colour</span>
                  <span className="text-[11px] font-mono text-slate-500">{color}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => choose(setColor, o.value, COLOR_IMAGES[o.value])}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                        color === o.value
                          ? "border-slate-900 bg-slate-50 ring-2 ring-sky-400/40"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-inner" style={{ background: o.hex }} />
                      <span className="text-[11px] font-bold leading-tight text-slate-900">
                        {o.name}
                        <span className="block text-[9px] font-mono font-normal text-slate-400">{o.note}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <FileText size={13} className="text-sky-600" /> Application
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{application || title}</p>
            </div>
          )}

          {/* Price + actions */}
          <div className="space-y-4">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-rose-50 via-white to-sky-50 border border-slate-200/80 shadow-sm">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <span className={label}>Rate (ex-GST)</span>
                  <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums leading-tight">
                    ₹{inr(rate)}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">Total for {qty} {unit}{qty > 1 ? "s" : ""}</span>
                  <span className="text-sm font-black font-mono text-slate-900">₹{inr(Number(total))}</span>
                </div>
              </div>
            </div>

            <div className="flex items-stretch gap-3">
              <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-sm">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold font-mono text-slate-900">{qty}</span>
                <button type="button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer">
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-slate-800 shadow-sky-500/25"
                }`}
              >
                {added ? <Check size={15} /> : <ShoppingCart size={15} />}
                <span>{added ? "Added to Quote" : "Add to Quote"}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onFormalQuote(cfg)}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText size={15} className="text-sky-600" />
              <span>Request Formal Quotation</span>
              <ArrowRight size={14} className="text-slate-400" />
            </button>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { icon: <ShieldCheck size={16} className="text-emerald-600" />, text: "100% Genuine Factory Stock" },
                { icon: <FileText size={16} className="text-sky-600" />, text: "GST Tax Invoice (18%)" },
                { icon: <PackageCheck size={16} className="text-sky-600" />, text: "Bangalore Warehouse Stock" },
              ].map((t) => (
                <div key={t.text} className="flex flex-col items-center gap-1.5 text-center text-[10px] font-mono text-slate-500 leading-snug">
                  <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>

            {onDatasheet && (
              <div className="text-center">
                <button type="button" onClick={onDatasheet} className="text-[11px] font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors cursor-pointer">
                  <span>View Full Technical Data Sheet & Approvals</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};