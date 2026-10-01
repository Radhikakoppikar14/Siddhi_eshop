import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, Search, ShoppingCart, Check, X, Layers, Package, ShieldCheck, Eye, ArrowRight, LayoutGrid, List, ZoomIn } from "lucide-react";
import { LAPP_CATALOG } from "../../../data/lappCatalog";
import type { LappCategory, LappColumnKey, LappRow, LappSeries } from "../../../data/lappCatalog";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

interface LappCatalogBrowserProps {
  categoryId: string;
  seriesId: string | null;
  categoryFilter?: string[];
  onSelect: (categoryId: string, seriesId: string | null) => void;
  onCountChange?: (count: number) => void;
}

type ColumnKey = LappColumnKey | "series";

const COLUMN_LABELS: Record<ColumnKey, string> = {
  series: "Series",
  partNo: "Part No",
  description: "Description",
  core: "Core",
  pe: "PE",
  size: "Size",
  colour: "Colour",
  packSize: "Pack size",
  type: "Type",
};

interface FlatRow {
  series: LappSeries;
  row: LappRow;
}

const FALLBACK_IMG = "/images/card-cables.jpg";
const MAX_SEARCH_RESULTS = 200;

const inr = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const rowText = (r: LappRow, seriesName: string) =>
  [seriesName, r.partNo, r.description, r.core, r.pe, r.size, r.colour, r.packSize, r.type]
    .filter((v) => v !== undefined && v !== null)
    .join(" ")
    .toLowerCase();

const matchesAll = (text: string, terms: string[]) => terms.every((t) => text.includes(t));

const countRows = (cats: LappCategory[]) =>
  cats.reduce((n, c) => n + c.series.reduce((m, s) => m + s.rows.length, 0), 0);

/* ------------------------------------------------------------------ */
/* Interactive Grid Card View with Thumbnails & Zoom                  */
/* ------------------------------------------------------------------ */
const LappGridCard: React.FC<{ series: LappSeries; row: LappRow }> = ({ series, row }) => {
  const navigate = useNavigate();
  const { addCustomItem } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const productImages = [
    series.image || FALLBACK_IMG,
    "/images/cable1.png",
    "/images/cable2.png",
  ].filter(Boolean);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addCustomItem(
      {
        id: `lapp-${row.partNo}`,
        name: row.description,
        partNo: row.partNo,
        brand: "LAPP KABEL",
        price: row.price,
        unit: series.unit,
      },
      1
    );
    setAdded(true);
    showToast(`Added ${row.description} to RFQ Cart!`);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onClick={() => navigate(`/product/lapp-${row.partNo}`)}
      className="bg-gradient-to-br from-white via-stone-50/60 to-rose-50/20 rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-rose-500/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-100 text-rose-950 border border-rose-300">
            LAPP KABEL
          </span>
          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Ready Stock
          </span>
        </div>

        {/* Main Zoomable Image Box */}
        <div
          className="w-full h-32 rounded-2xl bg-white border border-slate-100 p-2 flex items-center justify-center overflow-hidden mb-3 relative group/zoom shadow-2xs"
          onMouseMove={isZoomed ? handleMouseMove : undefined}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          <img
            src={productImages[selectedImgIndex]}
            alt={row.description}
            className={`max-h-full max-w-full object-contain transition-transform duration-200 ${
              isZoomed ? "scale-175 pointer-events-none" : "scale-100 group-hover/zoom:scale-110"
            }`}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : undefined
            }
          />
          <div className="absolute bottom-1.5 right-1.5 bg-blue-950/40 backdrop-blur-md text-white text-[9px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 opacity-70 group-hover/zoom:opacity-100 transition-opacity">
            <ZoomIn size={10} />
            <span>{isZoomed ? "Zoom Out" : "Zoom"}</span>
          </div>
        </div>

        {/* Thumbnail Selector Options */}
        {productImages.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
            {productImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImgIndex(idx);
                  setIsZoomed(false);
                }}
                className={`w-9 h-9 rounded-lg bg-white border p-0.5 overflow-hidden transition-all cursor-pointer flex items-center justify-center ${
                  selectedImgIndex === idx
                    ? "border-rose-600 ring-2 ring-rose-500/20 scale-105"
                    : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        )}

        <span className="text-[10px] font-mono text-rose-600 block mb-1 font-bold">{series.name}</span>
        <h4 className="font-bold text-xs text-slate-800 line-clamp-2 mb-2 group-hover:text-rose-700 transition-colors" title={row.description}>
          {row.description}
        </h4>

        <div className="p-2.5 bg-white/80 rounded-2xl border border-slate-200/60 text-[10px] font-mono grid grid-cols-2 gap-1.5 mb-3 shadow-2xs">
          <div><span className="text-slate-400">Part No:</span> <strong className="text-slate-800">{row.partNo}</strong></div>
          {row.size !== undefined && <div><span className="text-slate-400">Size:</span> <strong className="text-slate-800">{row.size}</strong></div>}
          {row.core !== undefined && <div><span className="text-slate-400">Cores:</span> <strong className="text-slate-800">{row.core}</strong></div>}
          {row.colour !== undefined && <div><span className="text-slate-400">Color:</span> <strong className="text-slate-800">{row.colour}</strong></div>}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-slate-400 block uppercase font-mono">Rate</span>
          <span className="text-sm font-black font-mono text-blue-700">
            ₹{inr(row.price)}
            <span className="text-[10px] font-normal text-slate-400 ml-1">/{series.unit}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-2xs cursor-pointer text-white hover:scale-105 ${
            added ? "bg-blue-600 ring-2 ring-blue-300" : "bg-blue-900 hover:bg-rose-600"
          }`}
        >
          {added ? <Check size={12} /> : <ShoppingCart size={12} />}
          <span>{added ? "Added" : "+ RFQ"}</span>
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Table Row View                                                    */
/* ------------------------------------------------------------------ */
const LappRowLine: React.FC<{ series: LappSeries; row: LappRow; columns: ColumnKey[] }> = ({
  series,
  row,
  columns,
}) => {
  const navigate = useNavigate();
  const { addCustomItem } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const q = Math.max(1, Math.floor(qty) || 1);
    addCustomItem(
      {
        id: `lapp-${row.partNo}`,
        name: row.description,
        partNo: row.partNo,
        brand: "LAPP KABEL",
        price: row.price,
        unit: series.unit,
      },
      q
    );
    setAdded(true);
    showToast(`Added ${q} ${series.unit}(s) of ${row.description} to RFQ Cart!`);
    setTimeout(() => setAdded(false), 1600);
  };

  const renderCell = (key: ColumnKey) => {
    switch (key) {
      case "series":
        return <span className="text-[11px] text-slate-600 font-mono">{series.name}</span>;
      case "partNo":
        return (
          <span className="font-mono text-xs font-semibold text-slate-800 bg-stone-100 px-2 py-1 rounded-md border border-slate-300">
            {row.partNo}
          </span>
        );
      case "description":
        return <span className="font-bold text-slate-900 text-xs hover:text-rose-600 transition-colors">{row.description}</span>;
      default: {
        const v = row[key];
        return (
          <span className="font-mono text-xs text-slate-700">
            {v === undefined || v === null || v === "" ? "—" : String(v)}
          </span>
        );
      }
    }
  };

  return (
    <tr
      onClick={() => navigate(`/product/lapp-${row.partNo}`)}
      className="border-b border-slate-200 hover:bg-rose-50/40 transition-colors cursor-pointer whitespace-nowrap"
    >
      {columns.map((c) => (
        <td key={c} className="py-3 px-3 align-middle">
          {renderCell(c)}
        </td>
      ))}

      {/* Fixed Price & Discount Rendering using row properties directly */}
      <td className="py-3 px-3 align-middle">
        <div className="font-mono font-black text-blue-700 text-xs sm:text-sm">
          ₹{inr(row.price)}
          <span className="text-[10px] text-slate-400 font-normal ml-1">/{series.unit}</span>
        </div>
        {row.listPrice && row.listPrice > row.price ? (
          <span className="text-[10px] text-slate-400 font-mono block">
            <span className="line-through">₹{inr(row.listPrice)}</span>{" "}
            <span className="text-rose-700 font-semibold">
              -{Math.round((1 - row.price / row.listPrice) * 100)}%
            </span>
          </span>
        ) : (
          <span className="text-[9px] text-slate-400 font-mono block">Excl. 18% GST</span>
        )}
      </td>

      <td className="py-3 px-3 align-middle" onClick={(e) => e.stopPropagation()}>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-2 py-1 rounded-lg border border-slate-300 bg-white text-center text-xs font-mono font-bold text-slate-900 outline-none focus:border-rose-500 shadow-2xs"
          aria-label={`Quantity in ${series.unit}s`}
        />
      </td>

      <td className="py-3 px-3 align-middle text-right">
        <button
          type="button"
          onClick={handleAdd}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 inline-flex items-center gap-1.5 shadow-2xs cursor-pointer text-white hover:scale-105 ${
            added ? "bg-blue-600 ring-2 ring-blue-300" : "bg-blue-900 hover:bg-rose-600"
          }`}
        >
          {added ? <Check size={12} /> : <ShoppingCart size={12} />}
          <span>{added ? "Added" : "+ RFQ"}</span>
        </button>
      </td>
    </tr>
  );
};

/* ------------------------------------------------------------------ */
/* Table View Container                                               */
/* ------------------------------------------------------------------ */
const LappTable: React.FC<{ items: FlatRow[]; columns: ColumnKey[] }> = ({ items, columns }) => (
  <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-x-auto">
    <table className="w-full text-left border-collapse text-xs">
      <thead>
        <tr className="bg-stone-100 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider whitespace-nowrap">
          {columns.map((c) => (
            <th key={c} className="py-3.5 px-3 font-bold">
              {COLUMN_LABELS[c]}
            </th>
          ))}
          <th className="py-3.5 px-3 font-bold">Rate</th>
          <th className="py-3.5 px-3 font-bold">Qty</th>
          <th className="py-3.5 px-3 font-bold text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ series, row }) => (
          <LappRowLine key={`${series.id}-${row.partNo}`} series={series} row={row} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

/* ------------------------------------------------------------------ */
/* Main browser component                                             */
/* ------------------------------------------------------------------ */
export const LappCatalogBrowser: React.FC<LappCatalogBrowserProps> = ({
  categoryId,
  seriesId,
  categoryFilter,
  onSelect,
  onCountChange,
}) => {
  const { searchQuery } = useAuth();
  const [localQuery, setLocalQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "details">("details");
  const [searchParams] = useSearchParams();

  // Sync category AND series from the URL whenever the URL changes
  // (fixes: clicking another series in the same category from BrandPortfolio did not update)
  useEffect(() => {
    const urlCat = searchParams.get("category");
    const urlSeries = searchParams.get("series");
    if (urlCat && (urlCat !== categoryId || (urlSeries ?? null) !== seriesId)) {
      onSelect(urlCat, urlSeries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const scopeCategories = useMemo(() => {
    let cats = LAPP_CATALOG;
    if (categoryFilter && categoryFilter.length > 0) {
      cats = cats.filter((c) => categoryFilter.includes(c.id));
    }
    if (categoryId !== "all") {
      cats = cats.filter((c) => c.id === categoryId);
    }
    return cats;
  }, [categoryId, categoryFilter]);

  const category = useMemo(
    () => (categoryId === "all" ? null : LAPP_CATALOG.find((c) => c.id === categoryId) ?? null),
    [categoryId]
  );

  const activeSeries = useMemo(() => {
    if (!category) return null;
    if (seriesId) return category.series.find((s) => s.id === seriesId) ?? null;
    return category.series.length === 1 ? category.series[0] : null;
  }, [category, seriesId]);

  useEffect(() => {
    setLocalQuery("");
  }, [categoryId, seriesId]);

  const terms = useMemo(
    () =>
      `${searchQuery || ""} ${localQuery}`
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [searchQuery, localQuery]
  );
  const isSearching = terms.length > 0;

  const seriesRows = useMemo<FlatRow[]>(() => {
    if (!activeSeries) return [];
    return activeSeries.rows
      .filter((r) => !isSearching || matchesAll(rowText(r, activeSeries.name), terms))
      .map((row) => ({ series: activeSeries, row }));
  }, [activeSeries, terms, isSearching]);

  const searchResults = useMemo<FlatRow[]>(() => {
    if (activeSeries || !isSearching) return [];
    const out: FlatRow[] = [];
    for (const c of scopeCategories) {
      for (const s of c.series) {
        for (const r of s.rows) {
          if (matchesAll(rowText(r, s.name), terms)) out.push({ series: s, row: r });
        }
      }
    }
    return out;
  }, [activeSeries, isSearching, terms, scopeCategories]);

  const visibleCount = activeSeries
    ? seriesRows.length
    : isSearching
    ? searchResults.length
    : countRows(scopeCategories);

  useEffect(() => {
    onCountChange?.(visibleCount);
  }, [visibleCount, onCountChange]);


  if (activeSeries && category) {
    return (
      <div className="animate-fade-in space-y-6">

        {/* Structured 2x2 / Responsive Grid Sub-Category Selector Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {category.series.length > 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono w-full">
              {category.series.map((s) => {
                const isSelected = s.id === activeSeries.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onSelect(category.id, s.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer font-mono shadow-sm flex flex-col justify-between hover:scale-[1.01] ${
                      isSelected
                        ? "bg-blue-900 text-white font-black border-slate-950 shadow-md ring-2 ring-rose-500/30"
                        : "bg-white hover:bg-stone-50 text-slate-800 border-slate-200/80 font-bold"
                    }`}
                  >
                    <span className="text-xs font-bold leading-snug whitespace-normal break-words">{s.name}</span>
                    <span className={`text-[10px] mt-2 font-mono ${isSelected ? "text-rose-400 font-semibold" : "text-slate-400"}`}>
                      {s.rows.length} verified products
                    </span>
                  </button>
                );
              })}
            </div>
          ) : <div />}

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
            {/* Grid / Details Switcher */}
            <div className="flex items-center p-1 bg-blue-800 border border-slate-800 rounded-2xl shadow-md shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid" ? "bg-rose-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("details")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "details" ? "bg-rose-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                <List size={14} />
                <span>Details</span>
              </button>
            </div>

            {/* Compact Search Box */}
            <div className="relative w-full sm:w-52">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Filter part no, size..."
                className="w-full pl-8 pr-7 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono text-slate-900 placeholder:text-slate-400 outline-none focus:border-rose-500 shadow-2xs transition-all"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => setLocalQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label="Clear filter"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-800">{activeSeries.name}</h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {seriesRows.length} of {activeSeries.rows.length} products available · rates per {activeSeries.unit}, ex-GST
          </p>
        </div>

        {seriesRows.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {seriesRows.map(({ series, row }) => (
                <LappGridCard key={`${series.id}-${row.partNo}`} series={series} row={row} />
              ))}
            </div>
          ) : (
            <LappTable items={seriesRows} columns={activeSeries.columns} />
          )
        ) : (
          <div className="bg-white rounded-3xl border border-slate-300 p-12 text-center text-xs text-slate-500 shadow-sm">
            No products in {activeSeries.name} match your search.
          </div>
        )}
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-800">Search results</h3>
          <span className="text-xs text-slate-500 font-mono">
            {searchResults.length} match{searchResults.length === 1 ? "" : "es"}
          </span>
        </div>
        {searchResults.length > 0 ? (
          <LappTable
            items={searchResults.slice(0, MAX_SEARCH_RESULTS)}
            columns={["series", "partNo", "description", "size"]}
          />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-300 p-12 text-center text-xs text-slate-500">
            No Lapp products match your search.
          </div>
        )}
      </div>
    );
  }

  if (category) {
    return (
      <div className="animate-fade-in space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-800">{category.name}</h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Select a sub-category range · {category.series.length} options available
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {category.series.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                onSelect(category.id, s.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-left bg-gradient-to-br from-white via-stone-50/60 to-rose-50/20 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-rose-500/60 hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-32 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-rose-50/30 transition-colors shadow-2xs">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-115 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                </div>
                <div className="font-black text-sm text-slate-800 group-hover:text-rose-700 transition-colors">
                  {s.name}
                </div>
                <div className="mt-1 text-xs font-mono text-slate-500">{s.rows.length} verified products</div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:text-rose-700">
                <span>Explore range</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scopeCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              if (c.series.length === 1) {
                onSelect(c.id, c.series[0].id);
              } else {
                onSelect(c.id, null);
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-left bg-gradient-to-br from-white via-stone-50/60 to-rose-50/20 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-rose-500/60 hover:-translate-y-1 transition-all duration-300 p-6 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                  {c.series.length > 1 ? <Layers size={20} /> : <Package size={20} />}
                </div>
                <div className="font-black text-base text-slate-800 group-hover:text-rose-700 transition-colors leading-snug">
                  {c.name}
                </div>
              </div>
              <div className="text-xs font-mono text-slate-500 mb-4">
                {c.series.length > 1 ? `${c.series.length} sub-categories · ` : ""}
                {countRows([c])} products available
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60">
              {c.series.map((s) => (
                <span
                  key={s.id}
                  className="px-2.5 py-1 rounded-xl bg-white hover:bg-rose-50 transition-colors border border-slate-200 text-[10px] font-mono font-bold text-slate-700 shadow-2xs"
                >
                  {s.name} ({s.rows.length})
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};