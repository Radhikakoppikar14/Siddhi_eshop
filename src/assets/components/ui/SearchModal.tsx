import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, ShoppingCart, Check, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import { PRODUCTS_DATA } from "../../../data/products";
import type { Product } from "../../../types";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openQuickView } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [query, setQuery] = useState("");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  const popularSearches = [
    "ÖLFLEX CLASSIC 110",
    "EATON PKZMO",
    "Mennekes 32A Plug",
    "Partex PA-1",
    "GST Proforma Quote",
  ];

  const searchResults = useMemo(() => {
    let list = PRODUCTS_DATA;
    if (!query.trim()) {
      return [];
    }
    const q = query.toLowerCase().trim();
    return list
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)) ||
          p.application.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [query]);

  const handleSelectProduct = (product: Product) => {
    closeSearch();
    openQuickView(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product.id, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    showToast(`Added ${product.name} to RFQ Cart!`);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getBrandBadge = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes("lapp")) return "bg-sky-100 text-sky-900 border-sky-300";
    if (b.includes("eaton")) return "bg-sky-100 text-sky-900 border-sky-300";
    if (b.includes("partex")) return "bg-rose-100 text-rose-900 border-rose-300";
    if (b.includes("menn")) return "bg-indigo-100 text-indigo-900 border-indigo-300";
    return "bg-emerald-100 text-emerald-900 border-emerald-300";
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/50 backdrop-blur-sm animate-fade-in select-none"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl bg-gradient-to-br from-[#F3F7FC] via-[#F4F7FC] to-[#D5E2F3] rounded-[2.5rem] shadow-2xl border border-[#C4D6EE] overflow-hidden text-slate-900 transition-all flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title & Close */}
        <div className="p-6 pb-3 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white border border-[#C4D6EE] flex items-center justify-center text-rose-600 shadow-2xs">
              <Search size={17} />
            </div>
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Search Industrial Parts & Cables
            </h3>
          </div>
          <button
            onClick={closeSearch}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input & Button Bar */}
        <div className="px-6 pb-4 flex items-center gap-3 relative z-10">
          <div className="flex-1 flex items-center px-4 py-3 rounded-2xl border-2 border-[#C4D6EE] bg-white/90 backdrop-blur-md shadow-2xs focus-within:border-rose-500 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Products..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
          <button
            type="button"
            className="px-6 py-3.5 rounded-2xl bg-[#15478A] hover:bg-blue-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform hover:scale-105 cursor-pointer shrink-0"
          >
            Search
          </button>
        </div>

        {/* Popular Quick Searches Row */}
        <div className="px-6 pb-5 space-y-2 border-b border-[#C4D6EE] relative z-10">
          <span className="text-[10px] font-mono uppercase font-bold text-[#64748B] tracking-wider flex items-center gap-1">
            <Sparkles size={11} className="text-sky-600" />
            Popular Quick Searches:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-mono border border-[#C4D6EE] transition-colors shadow-2xs cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results List Container (Shows when typing query) */}
        {query.trim() && (
          <div className="max-h-[45vh] overflow-y-auto p-6 space-y-3 relative z-10 bg-[#F4F7FC]/60">
            {searchResults.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs space-y-1">
                <p className="font-bold text-slate-800">No products matching "{query}"</p>
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3.5 bg-white/90 hover:bg-white rounded-2xl cursor-pointer flex items-center justify-between gap-3 group transition-all border border-[#C4D6EE] shadow-2xs hover:shadow-md"
                >
                  <div className="min-w-0 space-y-0.5 pl-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border font-mono ${getBrandBadge(
                          product.brand
                        )}`}
                      >
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {product.partNo}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-slate-800 truncate group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h4>

                    <p className="text-[11px] text-slate-600 font-mono truncate">
                      {product.specs.slice(0, 2).join(" · ")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black font-mono text-slate-800 block">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        /{product.unit}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        addedIds[product.id]
                          ? "bg-emerald-600 text-white"
                          : "bg-[#15478A] hover:bg-blue-800 text-white hover:scale-105"
                      }`}
                      title="Add to RFQ Cart"
                    >
                      {addedIds[product.id] ? <Check size={15} /> : <ShoppingCart size={15} />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-[#F4F7FC]/90 border-t border-[#C4D6EE] flex items-center justify-between text-xs text-slate-600 relative z-10">
          <span className="font-mono text-[11px]">
            Press <strong className="text-slate-800">ESC</strong> to exit
          </span>

          <a
            href="#rfqSection"
            onClick={closeSearch}
            className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
          >
            <span>Can't find a part? Submit custom RFQ</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};