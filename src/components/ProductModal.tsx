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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D211B]/80 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8D5C4] max-w-3xl w-full max-h-[90vh] overflow-y-auto text-[#2D211B]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8D5C4] flex items-center justify-between z-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6F5144]">
                  {product.brandName}
                </span>
                <span className="text-xs text-[#A67C63] mx-2">/</span>
                <span className="text-xs text-[#6F5144]/80">{product.category}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#E8D5C4]/40 text-[#6F5144] hover:text-[#2D211B] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Image Column */}
                <div className="md:col-span-5 bg-white rounded-2xl border border-[#E8D5C4] p-6 flex flex-col items-center justify-center min-h-[220px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-48 max-w-full object-contain filter drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  {product.code && (
                    <div className="mt-4 px-3 py-1 bg-[#FAF7F2] border border-[#E8D5C4] rounded-md text-[11px] font-mono text-[#6F5144]">
                      Part: {product.code}
                    </div>
                  )}
                </div>

                {/* Main Info Column */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-normal text-[#2D211B] font-editorial leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#2D211B]/80 leading-relaxed font-light">
                    {product.details}
                  </p>

                  {/* Certified Standards */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6F5144]">
                      Certifications &amp; Compliances:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.standards.map((std, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 text-xs font-medium bg-[#E8D5C4]/40 text-[#6F5144] rounded-md border border-[#E8D5C4]"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-3 pt-4 border-t border-[#E8D5C4]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6F5144]">
                  Technical Specifications &amp; Electrical Parameters
                </h4>
                <div className="bg-white rounded-2xl border border-[#E8D5C4] divide-y divide-[#E8D5C4] overflow-hidden text-xs">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3">
                      <span className="font-medium text-[#6F5144] col-span-1">
                        {spec.label}
                      </span>
                      <span className="text-[#2D211B] font-mono col-span-2">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8D5C4]">
                <span className="text-xs text-[#6F5144]/80 font-light text-center sm:text-left">
                  Genuine manufacturer warranty &amp; test certificates provided with every dispatch.
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-[#6F5144] hover:text-[#2D211B] border border-[#E8D5C4] rounded-xl transition-colors cursor-pointer bg-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onGoToContact(product.name);
                    }}
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#6F5144] hover:bg-[#5C4337] rounded-xl transition-all shadow-sm cursor-pointer"
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
