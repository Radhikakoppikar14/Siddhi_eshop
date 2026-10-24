import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductItem } from '../data/siddhiData';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onGoToContact: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onGoToContact,
}) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FFF1E8] backdrop-blur-sm backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FFFAF6] rounded-3xl shadow-2xl border border-[#F1D9CA] max-w-3xl w-full max-h-[90vh] overflow-y-auto text-[#231815]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="sticky top-0 bg-[#FFFAF6]/95 backdrop-blur-md px-6 py-4 border-b border-[#F1D9CA] flex items-center justify-between z-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5F524C]">
                  {product.brandName}
                </span>
                <span className="text-xs text-[#D2430F] mx-2">/</span>
                <span className="text-xs text-[#5F524C]/80">{product.category}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#FFF1E8] text-[#5F524C] hover:text-[#231815] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Image Column */}
                <div className="md:col-span-5 bg-white rounded-2xl border border-[#F1D9CA] p-6 flex flex-col items-center justify-center min-h-[220px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-48 max-w-full object-contain filter drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  {product.code && (
                    <div className="mt-4 px-3 py-1 bg-[#FFFAF6] border border-[#F1D9CA] rounded-md text-[11px] font-mono text-[#5F524C]">
                      Part: {product.code}
                    </div>
                  )}
                </div>

                {/* Main Info Column */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-normal text-[#231815] font-editorial leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#231815]/80 leading-relaxed font-light">
                    {product.details}
                  </p>

                  {/* Certified Standards */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#5F524C]">
                      Certifications &amp; Compliances:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.standards.map((std, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 text-xs font-medium bg-[#FFF1E8] text-[#5F524C] rounded-md border border-[#F1D9CA]"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-3 pt-4 border-t border-[#F1D9CA]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5F524C]">
                  Technical Specifications &amp; Electrical Parameters
                </h4>
                <div className="bg-white rounded-2xl border border-[#F1D9CA] divide-y divide-[#F1D9CA] overflow-hidden text-xs">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3">
                      <span className="font-medium text-[#5F524C] col-span-1">
                        {spec.label}
                      </span>
                      <span className="text-[#231815] font-mono col-span-2">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F1D9CA]">
                <span className="text-xs text-[#5F524C]/80 font-light text-center sm:text-left">
                  Genuine manufacturer warranty &amp; test certificates provided with every dispatch.
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-[#5F524C] hover:text-[#231815] border border-[#F1D9CA] rounded-xl transition-colors cursor-pointer bg-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onGoToContact(product.name);
                    }}
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Contact Us for this Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
