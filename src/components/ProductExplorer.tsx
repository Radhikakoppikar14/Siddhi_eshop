import React, { useState, useMemo } from 'react';
import { Search, FileText, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { PRODUCTS_CATALOG, ProductItem, BRANDS_DATA } from '../data/siddhiData';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductExplorerProps {
  selectedBrandId?: string;
  onOpenSpecs: (product: ProductItem) => void;
  onOpenRfq: (productName: string) => void;
}

const CATEGORIES = [
  'All Categories',
  'Power & Control Cables',
  'Data & Bus Cables',
  'Cable Glands & Connectors',
  'Industrial Switchgear',
  'Industrial Sockets & Receptacles',
  'Grounding & Lightning Protection',
  'Energy Saving LED Solutions',
];

export const ProductExplorer: React.FC<ProductExplorerProps> = ({
  selectedBrandId,
  onOpenSpecs,
  onOpenRfq,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [activeBrandFilter, setActiveBrandFilter] = useState<string>(selectedBrandId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxProduct, setLightboxProduct] = useState<ProductItem | null>(null);

  React.useEffect(() => {
    if (selectedBrandId) {
      setActiveBrandFilter(selectedBrandId);
    }
  }, [selectedBrandId]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => {
      if (activeCategory !== 'All Categories' && p.category !== activeCategory) {
        return false;
      }
      if (activeBrandFilter !== 'all' && p.brandId !== activeBrandFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brandName.toLowerCase().includes(q);
        const matchDesc = p.shortDesc.toLowerCase().includes(q);
        const matchCode = p.code?.toLowerCase().includes(q) || false;
        return matchName || matchBrand || matchDesc || matchCode;
      }
      return true;
    });
  }, [activeCategory, activeBrandFilter, searchQuery]);

  return (
    <section id="products" className="py-20 lg:py-24 bg-[#F3EFFE] border-b border-[#E6DEFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-[#55516B] mb-2 px-3 py-1 rounded-full bg-[#F3EFFE] border border-[#E6DEFA] inline-block">
              Comprehensive Product Portfolio
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1E1B2E] font-editorial tracking-tight mt-2">
              Products Catalog
            </h2>
          </div>
          <p className="text-sm text-[#55516B]/80 max-w-md font-light">
            Engineered for high performance, electrical safety, continuous duty, and international compliance in harsh plant conditions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#E6DEFA] p-4 sm:p-5 mb-8 space-y-4 shadow-2xs">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D3FD6]" />
              <input
                type="text"
                placeholder="Search cables, part numbers, switchgears, earthing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] focus:ring-1 focus:ring-[#55516B] text-[#1E1B2E] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6D3FD6] hover:text-[#1E1B2E] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="w-full md:w-64">
              <select
                value={activeBrandFilter}
                onChange={(e) => setActiveBrandFilter(e.target.value)}
                aria-label="Filter by Brand"
                className="w-full px-3 py-2.5 text-xs bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] text-[#1E1B2E] cursor-pointer"
              >
                <option value="all">All Brands ({PRODUCTS_CATALOG.length} items)</option>
                {BRANDS_DATA.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#6D3FD6] text-[#FCFBFF] shadow-xs'
                      : 'bg-[#FCFBFF] text-[#1E1B2E] border border-[#E6DEFA] hover:bg-[#6D3FD6]/8'
                  }`}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E6DEFA] p-8">
            <p className="text-base font-medium text-[#1E1B2E]">No products match your search or filter.</p>
            <p className="text-xs text-[#6D3FD6] mt-1">Try clearing filters or search terms.</p>
            <button
              onClick={() => {
                setActiveCategory('All Categories');
                setActiveBrandFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#6D3FD6] text-[#FCFBFF] text-xs rounded-xl hover:bg-[#4F2AB0] transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    y: -7,
                    scale: 1.015,
                    transition: { type: 'spring', stiffness: 350, damping: 25 },
                  }}
                  whileTap={{ scale: 0.985 }}
                  className="group bg-white rounded-3xl border border-[#E6DEFA] hover:border-[#E6DEFA] shadow-xs hover:shadow-[0_16px_36px_-10px_rgba(85, 81, 107,0.18)] transition-colors duration-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle diagonal ambient light sheen on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#E6DEFA]/25 to-transparent pointer-events-none z-10 skew-x-12" />

                  {/* Top glowing accent bar that expands smoothly on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F3EFFE] via-[#6D3FD6] to-[#F3EFFE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Product Image Slot with Lightbox Trigger & Smooth Float */}
                    <motion.div
                      onClick={() => setLightboxProduct(product)}
                      whileHover={{ backgroundColor: '#F3EFFE' }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-48 bg-[#FCFBFF] rounded-2xl border border-[#E6DEFA] p-4 flex items-center justify-center mb-4 overflow-hidden cursor-zoom-in group/img"
                    >
                      <motion.img
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        src={product.image}
                        alt={product.name}
                        className="max-h-40 max-w-full object-contain filter drop-shadow-xs"
                        referrerPolicy="no-referrer"
                      />

                      {/* Zoom Overlay Pill */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="absolute top-2.5 right-2.5 opacity-0 group-hover/img:opacity-100 transition-all duration-200 bg-white/85 text-[#1E1B2E] px-2 py-1 rounded-lg text-xs backdrop-blur-xs flex items-center gap-1 shadow-sm border border-[#E6DEFA]/30"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#6D3FD6]" />
                        <span className="text-[10px] font-medium">Zoom</span>
                      </motion.div>

                      {product.code && (
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-white/95 backdrop-blur-xs border border-[#E6DEFA] rounded-md text-[10px] font-mono text-[#1E1B2E] shadow-2xs group-hover:border-[#E6DEFA] transition-colors">
                          {product.code}
                        </span>
                      )}
                    </motion.div>

                    {/* Brand & Category */}
                    <div className="flex items-center justify-between text-xs text-[#6D3FD6] mb-1.5">
                      <span className="font-semibold text-[#55516B] tracking-tight group-hover:text-[#3F3B57] transition-colors flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6D3FD6] opacity-75 group-hover:scale-125 transition-transform" />
                        {product.brandName}
                      </span>
                      <span className="text-[11px] truncate max-w-[150px] text-[#6D3FD6] font-light">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-base font-semibold text-[#1E1B2E] mb-2 leading-snug line-clamp-2 group-hover:text-[#55516B] transition-colors">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#55516B]/80 font-light leading-relaxed line-clamp-3 mb-4">
                      {product.shortDesc}
                    </p>

                    {/* Compliances */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.standards.slice(0, 3).map((std, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-0.5 text-[10px] font-medium bg-[#F3EFFE] text-[#55516B] rounded-md border border-[#E6DEFA] shadow-3xs cursor-default"
                        >
                          {std}
                        </motion.span>
                      ))}
                      {product.standards.length > 3 && (
                        <span className="text-[10px] text-[#6D3FD6] self-center">
                          +{product.standards.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#E6DEFA]/60 flex items-center justify-between gap-2">
                    <motion.button
                      whileHover={{ x: 2, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onOpenSpecs(product)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55516B] hover:text-[#1E1B2E] py-1 transition-colors cursor-pointer group/specs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#6D3FD6] group-hover/specs:text-[#55516B] transition-colors" />
                      <span>View Specs</span>
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 4px 14px rgba(85, 81, 107,0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onOpenRfq(product.name)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer group/inq"
                    >
                      <span>Inquire / RFQ</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover/inq:translate-x-0.5 group-hover/inq:-translate-y-0.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* High-Resolution Image Lightbox Popup */}
      <AnimatePresence>
        {lightboxProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#F3EFFE] backdrop-blur-sm backdrop-blur-md"
            onClick={() => setLightboxProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-[#FCFBFF] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E6DEFA] shadow-2xl text-[#1E1B2E]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E6DEFA]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#55516B]">
                    {lightboxProduct.brandName} · High-Resolution Preview
                  </span>
                  <h3 className="text-lg font-medium text-[#1E1B2E] mt-0.5">{lightboxProduct.name}</h3>
                </div>
                <button
                  onClick={() => setLightboxProduct(null)}
                  className="p-2 rounded-full hover:bg-[#F3EFFE] text-[#55516B] hover:text-[#1E1B2E] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image */}
              <div className="py-6 flex items-center justify-center bg-white rounded-2xl my-4 border border-[#E6DEFA]">
                <img
                  src={lightboxProduct.image}
                  alt={lightboxProduct.name}
                  className="max-h-72 max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              <p className="text-xs text-[#55516B]/80 font-light leading-relaxed mb-4">
                {lightboxProduct.shortDesc}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E6DEFA]">
                <button
                  onClick={() => {
                    const prod = lightboxProduct;
                    setLightboxProduct(null);
                    onOpenSpecs(prod);
                  }}
                  className="text-xs font-medium text-[#55516B] hover:underline cursor-pointer"
                >
                  View Full Technical Specs Table →
                </button>

                <button
                  onClick={() => {
                    const name = lightboxProduct.name;
                    setLightboxProduct(null);
                    onOpenRfq(name);
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Inquire / Contact Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
