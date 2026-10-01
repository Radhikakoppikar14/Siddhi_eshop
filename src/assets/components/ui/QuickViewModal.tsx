import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import { getShortProductName, getProductCores, getProductSize, getProductColor } from "../../../utils/formatters";
import { ProductView } from "../products/ProductView";
import type { ProductConfig, ProductSelection } from "../products/ProductView";

const FALLBACK_IMG = "/images/card-cables.jpg";
// The 2 extra images shown after the main image.
// Override per product by adding `extraImages: string[]` to your product data.
const EXTRA_IMAGES = ["/images/cable1.png", "/images/cable2.png"];

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const p = quickViewProduct;
  const isLapp = p.brand.toLowerCase().includes("lapp");

  const extras: string[] = (p as any).extraImages?.length ? (p as any).extraImages : EXTRA_IMAGES;
  const images = [p.image || FALLBACK_IMG, ...extras.slice(0, 2)];

  // Real-time price based on the selected core, size and sheath
  const getRate = ({ core, size, color }: ProductSelection) => {
    let rate = p.price || 145.0;
    if (size.includes("1.5")) rate = 145.0;
    else if (size.includes("2.5")) rate = 185.0;
    else if (size.includes("4.0")) rate = 215.0;
    else if (size.includes("6.0")) rate = 245.0;

    if (core.includes("3")) rate *= 0.85;
    else if (core.includes("4")) rate *= 0.95;

    if (color.includes("Teal Green")) rate += 15;
    else if (color.includes("Silver-Grey")) rate -= 10;

    return Number(rate.toFixed(2));
  };

  const handleAdd = (cfg: ProductConfig) => {
    addToCart(p.id, cfg.qty);
    const details = isLapp ? ` [${cfg.core}, ${cfg.size}, ${cfg.color}]` : "";
    showToast(`Added ${cfg.qty} ${p.unit} of ${p.name}${details} to RFQ Cart!`);
  };

  const handleFormalQuote = (cfg: ProductConfig) => {
    const summary = isLapp ? `\nConfigurations: ${cfg.core} · ${cfg.size} · ${cfg.color}` : "";
    const part = p.partNo;
    const name = p.name;
    closeQuickView();

    const fillNotes = () => {
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Commercial RFQ Inquiry for:\nProduct: ${name}\nPart No: ${part}${summary}\n\nPlease share price list for project volume with freight to site and delivery lead times.`;
        notes.focus();
      }
    };

    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
      setTimeout(fillNotes, 300);
    } else {
      document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(fillNotes, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-blue-900/60 backdrop-blur-xs flex p-3 sm:p-6 animate-fade-in select-none">
      <div className="m-auto w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <ProductView
          key={p.id}
          brand={p.brand}
          partNo={p.partNo}
          title={getShortProductName(p.name)}
          unit={p.unit}
          stock={p.stock || "Ready Stock"}
          isLapp={isLapp}
          images={images}
          specs={(p as any).specs ?? []}
          application={p.application}
          initial={{
            core: getProductCores(p),
            size: getProductSize(p),
            color: getProductColor(p).label.split("(")[0].trim(),
          }}
          getRate={getRate}
          onAddToQuote={handleAdd}
          onFormalQuote={handleFormalQuote}
          onDatasheet={() => {
            const id = p.id;
            closeQuickView();
            navigate(`/product/${id}`);
          }}
          onClose={closeQuickView}
        />
      </div>
    </div>
  );
};