import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart, Check, ArrowRight } from "lucide-react";
import type { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import {
  getShortProductName,
  getProductCores,
  getProductSize,
  getProductColor,
} from "../../../utils/formatters";

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected = false,
  onSelect,
}) => {
  const { addToCart } = useCart();
  const { openQuickView } = useAuth();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const [selectedCores, setSelectedCores] = useState<string>(
    getProductCores(product) || "3 Cores",
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    getProductSize(product) || "1.5 mm²",
  );
  const [selectedSheath, setSelectedSheath] =
    useState<string>("Standard Sheath");

  const calculateDynamicPrice = () => {
    let basePrice = product.price || 145.0;

    if (selectedSize.includes("2.5")) basePrice *= 1.35;
    else if (selectedSize.includes("4.0")) basePrice *= 1.75;
    else if (selectedSize.includes("6.0") || selectedSize.includes("10"))
      basePrice *= 2.15;

    if (selectedCores.includes("4")) basePrice *= 1.1;
    else if (selectedCores.includes("5") || selectedCores.includes("6"))
      basePrice *= 1.25;

    if (selectedSheath.includes("Teal Green") || selectedSheath.includes("PUR"))
      basePrice += 15;

    return basePrice;
  };

  const dynamicPrice = calculateDynamicPrice();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    showToast(`Added ${product.name} to RFQ Cart!`);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleClickCard = () => {
    openQuickView(product);
    if (onSelect) {
      onSelect(product);
    }
  };

  const getBrandTheme = () => {
    const b = product.brand.toLowerCase();
    if (b.includes("lapp")) {
      return {
        badge: "bg-rose-100 text-rose-900 border-rose-300",
        selectedBorder: "border-2 border-rose-500 ring-4 ring-rose-100",
        defaultBorder: "border-slate-300 hover:border-rose-400 hover:shadow-xl",
        btnColor: "bg-[#4CACF0] hover:bg-[#42A7F0] text-slate-800 font-black",
      };
    }
    if (b.includes("eaton")) {
      return {
        badge: "bg-sky-100 text-sky-900 border-sky-300",
        selectedBorder: "border-2 border-sky-500 ring-4 ring-sky-100",
        defaultBorder: "border-slate-300 hover:border-sky-400 hover:shadow-xl",
        btnColor: "bg-[#0073E6] hover:bg-[#005BB5] text-white font-black",
      };
    }
    if (b.includes("partex")) {
      return {
        badge: "bg-amber-100 text-amber-950 border-amber-300",
        selectedBorder: "border-2 border-amber-500 ring-4 ring-amber-100",
        defaultBorder:
          "border-slate-300 hover:border-amber-400 hover:shadow-xl",
        btnColor: "bg-amber-500 hover:bg-amber-600 text-amber-950 font-black",
      };
    }
    if (b.includes("menn")) {
      return {
        badge: "bg-slate-100 text-slate-900 border-slate-300",
        selectedBorder: "border-2 border-slate-500 ring-4 ring-slate-100",
        defaultBorder:
          "border-slate-300 hover:border-slate-400 hover:shadow-xl",
        btnColor: "bg-[#274386] hover:bg-[#1D54C1] text-white font-black",
      };
    }
    return {
      badge: "bg-stone-100 text-slate-800 border-slate-300",
      selectedBorder: "border-2 border-slate-900 ring-4 ring-slate-200",
      defaultBorder: "border-slate-300 hover:border-slate-400",
      btnColor: "bg-blue-900 hover:bg-blue-700 text-white font-bold",
    };
  };

  const theme = getBrandTheme();
  const colorInfo = getProductColor(product);

  return (
    <div
      onClick={handleClickCard}
      className={`bg-white text-slate-900 rounded-3xl p-5 shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
        isSelected ? theme.selectedBorder : `border ${theme.defaultBorder}`
      } hover:-translate-y-1`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div>
        <div className="h-44 w-full rounded-2xl bg-stone-50 p-4 mb-4 flex items-center justify-center relative overflow-hidden border border-slate-200 group-hover:bg-white transition-colors shadow-inner">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/card-cables.jpg";
            }}
          />

          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleQuickView}
              className="p-1.5 rounded-xl bg-white text-slate-700 hover:text-slate-800 border border-slate-300 shadow-xs transition-colors cursor-pointer"
              title="Quick inspection modal"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${theme.badge}`}
          >
            {product.brand.split(" ")[0]}
          </span>
          <span className="text-slate-500 font-semibold truncate font-mono">
            {product.partNo}
          </span>
        </div>

        <h3
          className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-rose-700 transition-colors line-clamp-1 leading-snug"
          title={product.name}
        >
          {getShortProductName(product.name)}
        </h3>

        <p className="text-[11px] text-slate-600 mt-1 line-clamp-1 font-mono leading-relaxed">
          {product.application || product.specs[0]}
        </p>

        <div
          className="mt-2.5 p-2.5 bg-stone-50 rounded-xl border border-slate-200 text-[10px] font-mono space-y-2 shadow-inner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[9px] uppercase font-sans font-semibold mb-0.5">
                Cores
              </span>
              <select
                value={selectedCores}
                onChange={(e) => setSelectedCores(e.target.value)}
                className="font-bold text-slate-900 bg-transparent text-[10px] w-full outline-none cursor-pointer"
              >
                <option value="3 Cores">3 Cores</option>
                <option value="4 Cores">4 Cores</option>
                <option value="5 Cores">5 Cores</option>
              </select>
            </div>
            <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[9px] uppercase font-sans font-semibold mb-0.5">
                Size
              </span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="font-bold text-sky-800 bg-transparent text-[10px] w-full outline-none cursor-pointer"
              >
                <option value="1.5 mm²">1.5 mm²</option>
                <option value="2.5 mm²">2.5 mm²</option>
                <option value="4.0 mm²">4.0 mm²</option>
                <option value="6.0 mm²">6.0 mm²</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3.5 border-t border-slate-200">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">
              Calculated Rate
            </span>
            <div className="text-base font-black font-mono text-blue-700">
              ₹{dynamicPrice.toFixed(2)}
              <span className="text-[11px] font-normal text-slate-500 ml-1">
                / {product.unit}
              </span>
            </div>
          </div>

          <span className="text-[10px] text-blue-800 font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Ready Stock</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-102 cursor-pointer ${
              added ? "bg-blue-600 text-white font-bold" : theme.btnColor
            }`}
          >
            {added ? (
              <>
                <Check size={13} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                <span>+ Add to RFQ</span>
              </>
            )}
          </button>

          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl transition-colors border border-slate-300 cursor-pointer"
            title="Full specifications"
          >
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
