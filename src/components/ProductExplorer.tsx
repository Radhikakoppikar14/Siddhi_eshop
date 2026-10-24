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
    <section id="products" className="py-20 lg:py-24 bg-[#FFF1E8] border-b border-[#F1D9CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-2 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA] inline-block">
              Comprehensive Product Portfolio
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight mt-2">
              Products Catalog
            </h2>
          </div>
          <p className="text-sm text-[#5F524C]/80 max-w-md font-light">
            Engineered for high performance, electrical safety, continuous duty, and international compliance in harsh plant conditions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#F1D9CA] p-4 sm:p-5 mb-8 space-y-4 shadow-2xs">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D2430F]" />
              <input
                type="text"
                placeholder="Search cables, part numbers, switchgears, earthing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FFFAF6] border border-[#F1D9CA] rounded-xl focus:outline-hidden focus:border-[#F1D9CA] focus:ring-1 focus:ring-[#5F524C] text-[#231815] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#D2430F] hover:text-[#231815] cursor-pointer"
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
                className="w-full px-3 py-2.5 text-xs bg-[#FFFAF6] border border-[#F1D9CA] rounded-xl focus:outline-hidden focus:border-[#F1D9CA] text-[#231815] cursor-pointer"
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
                      ? 'bg-[#D2430F] text-[#FFFAF6] shadow-xs'
                      : 'bg-[#FFFAF6] text-[#231815] border border-[#F1D9CA] hover:bg-[#D2430F]/8'
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
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#F1D9CA] p-8">
            <p className="text-base font-medium text-[#231815]">No products match your search or filter.</p>
            <p className="text-xs text-[#D2430F] mt-1">Try clearing filters or search terms.</p>
            <button
              onClick={() => {
                setActiveCategory('All Categories');
                setActiveBrandFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#D2430F] text-[#FFFAF6] text-xs rounded-xl hover:bg-[#A8340A] transition-colors cursor-pointer"
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
                  className="group bg-white rounded-3xl border border-[#F1D9CA] hover:border-[#F1D9CA] shadow-xs hover:shadow-[0_16px_36px_-10px_rgba(95, 82, 76,0.18)] transition-colors duration-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle diagonal ambient light sheen on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#F1D9CA]/25 to-transparent pointer-events-none z-10 skew-x-12" />

                  {/* Top glowing accent bar that expands smoothly on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFF1E8] via-[#D2430F] to-[#FFF1E8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Product Image Slot with Lightbox Trigger & Smooth Float */}
                    <motion.div
                      onClick={() => setLightboxProduct(product)}
                      whileHover={{ backgroundColor: '#FFF1E8' }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-48 bg-[#FFFAF6] rounded-2xl border border-[#F1D9CA] p-4 flex items-center justify-center mb-4 overflow-hidden cursor-zoom-in group/img"
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
                        className="absolute top-2.5 right-2.5 opacity-0 group-hover/img:opacity-100 transition-all duration-200 bg-white/85 text-[#231815] px-2 py-1 rounded-lg text-xs backdrop-blur-xs flex items-center gap-1 shadow-sm border border-[#F1D9CA]/30"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#D2430F]" />
                        <span className="text-[10px] font-medium">Zoom</span>
                      </motion.div>

                      {product.code && (
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-white/95 backdrop-blur-xs border border-[#F1D9CA] rounded-md text-[10px] font-mono text-[#231815] shadow-2xs group-hover:border-[#F1D9CA] transition-colors">
                          {product.code}
                        </span>
                      )}
                    </motion.div>

                    {/* Brand & Category */}
                    <div className="flex items-center justify-between text-xs text-[#D2430F] mb-1.5">
                      <span className="font-semibold text-[#5F524C] tracking-tight group-hover:text-[#43362F] transition-colors flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D2430F] opacity-75 group-hover:scale-125 transition-transform" />
                        {product.brandName}
                      </span>
                      <span className="text-[11px] truncate max-w-[150px] text-[#D2430F] font-light">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-base font-semibold text-[#231815] mb-2 leading-snug line-clamp-2 group-hover:text-[#5F524C] transition-colors">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#5F524C]/80 font-light leading-relaxed line-clamp-3 mb-4">
                      {product.shortDesc}
                    </p>

                    {/* Compliances */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.standards.slice(0, 3).map((std, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-0.5 text-[10px] font-medium bg-[#FFF1E8] text-[#5F524C] rounded-md border border-[#F1D9CA] shadow-3xs cursor-default"
                        >
                          {std}
                        </motion.span>
                      ))}
                      {product.standards.length > 3 && (
                        <span className="text-[10px] text-[#D2430F] self-center">
                          +{product.standards.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#F1D9CA]/60 flex items-center justify-between gap-2">
                    <motion.button
                      whileHover={{ x: 2, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onOpenSpecs(product)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F524C] hover:text-[#231815] py-1 transition-colors cursor-pointer group/specs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#D2430F] group-hover/specs:text-[#5F524C] transition-colors" />
                      <span>View Specs</span>
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 4px 14px rgba(95, 82, 76,0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onOpenRfq(product.name)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer group/inq"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FFF1E8] backdrop-blur-sm backdrop-blur-md"
            onClick={() => setLightboxProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-[#FFFAF6] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#F1D9CA] shadow-2xl text-[#231815]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#F1D9CA]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#5F524C]">
                    {lightboxProduct.brandName} · High-Resolution Preview
                  </span>
                  <h3 className="text-lg font-medium text-[#231815] mt-0.5">{lightboxProduct.name}</h3>
                </div>
                <button
                  onClick={() => setLightboxProduct(null)}
                  className="p-2 rounded-full hover:bg-[#FFF1E8] text-[#5F524C] hover:text-[#231815] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image */}
              <div className="py-6 flex items-center justify-center bg-white rounded-2xl my-4 border border-[#F1D9CA]">
                <img
                  src={lightboxProduct.image}
                  alt={lightboxProduct.name}
                  className="max-h-72 max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              <p className="text-xs text-[#5F524C]/80 font-light leading-relaxed mb-4">
                {lightboxProduct.shortDesc}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F1D9CA]">
                <button
                  onClick={() => {
                    const prod = lightboxProduct;
                    setLightboxProduct(null);
                    onOpenSpecs(prod);
                  }}
                  className="text-xs font-medium text-[#5F524C] hover:underline cursor-pointer"
                >
                  View Full Technical Specs Table →
                </button>

                <button
                  onClick={() => {
                    const name = lightboxProduct.name;
                    setLightboxProduct(null);
                    onOpenRfq(name);
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl shadow-xs transition-colors cursor-pointer"
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
