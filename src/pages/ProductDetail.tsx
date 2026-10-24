import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCTS_DATA } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal";
import { ProductView } from "../assets/components/products/ProductView";
import type { ProductConfig, ProductSelection } from "../assets/components/products/ProductView";

const FALLBACK_IMG = "/images/card-cables.jpg";
// The 2 extra images shown after the main image.
// Override per product by adding `extraImages: string[]` to the product data.
const EXTRA_IMAGES = ["/images/cable1.png", "/images/cable2.png"];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addCustomItem, addToCart } = useCart();
  const { showToast } = useToast();
  const [rfqProduct, setRfqProduct] = React.useState<string | null>(null);

  const catalogProduct = useMemo(() => {
    return PRODUCTS_DATA.find(
      (p) =>
        p.id === id ||
        p.partNo.toLowerCase() === id?.toLowerCase() ||
        p.name.toLowerCase().includes(id?.toLowerCase() || "")
    );
  }, [id]);

  const brandName = catalogProduct?.brand || "LAPP KABEL";
  const productName = catalogProduct?.name || "ÖLFLEX® FD 855 CP High Flex Chain";
  const partNumber = catalogProduct?.partNo || (id ? `LAPP-${id}` : "LAPP-1119203");
  const unit = catalogProduct?.unit || "meter";
  const specs = catalogProduct?.specs || [
    "VDE 0295 Class 6 Extra Fine Wire Conductor",
    "PUR Outer Sheath · Highly Oil Resistant",
    "Temperature Range: -40°C to +80°C",
    "Flame retardant according to IEC 60332-1-2",
  ];

  const images = useMemo(() => {
    const extras: string[] = (catalogProduct as any)?.extraImages?.length
      ? (catalogProduct as any).extraImages
      : EXTRA_IMAGES;
    return [catalogProduct?.image || FALLBACK_IMG, ...extras.slice(0, 2)];
  }, [catalogProduct]);

  // Dynamic price based on size, core count and sheath
  const getRate = ({ core, size, color }: ProductSelection) => {
    let rate = catalogProduct?.price || 145.0;

    if (size.includes("2.5")) rate *= 1.35;
    else if (size.includes("4.0")) rate *= 1.75;
    else if (size.includes("6.0")) rate *= 2.15;

    if (core.includes("3")) rate *= 0.85;
    else if (core.includes("4")) rate *= 0.95;

    if (color.includes("Teal Green")) rate += 15;

    return Number(rate.toFixed(2));
  };

  const handleAdd = (cfg: ProductConfig) => {
    if (!isValidPositiveNumber(cfg.qty)) return;
    const configName = `${productName} [${cfg.core}, ${cfg.size}, ${cfg.color}]`;

    if (catalogProduct) {
      addToCart(catalogProduct.id, cfg.qty);
    } else {
      addCustomItem(
        { id: partNumber, name: configName, partNo: partNumber, brand: brandName, price: cfg.rate, unit },
        cfg.qty
      );
    }
    showToast(`Added ${cfg.qty} ${unit}(s) of configured cable to Quote Cart!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-rose-100 via-[#FBFCFE] to-sky-100">
      <div className="w-full max-w-6xl">
        <ProductView
          key={id}
          brand={brandName}
          partNo={partNumber}
          title={productName}
          unit={unit}
          stock="In Stock (5,000m+)"
          isLapp
          images={images}
          specs={specs}
          initial={{ core: "5 Cores (with Earth)", size: "6.0 mm²", color: "Teal Green RAL 6018" }}
          getRate={getRate}
          onAddToQuote={handleAdd}
          onFormalQuote={(cfg) =>
            setRfqProduct(`${productName} [${cfg.core}, ${cfg.size}, ${cfg.color}] (${partNumber})`)
          }
          onClose={() => navigate("/")}
        />
      </div>

      {rfqProduct && <RFQModal product={rfqProduct} onClose={() => setRfqProduct(null)} />}
    </div>
  );
};