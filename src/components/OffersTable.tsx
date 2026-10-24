import React, { useState } from 'react';
import { SPECIAL_OFFERS } from '../data/siddhiData';
import { Tag, ArrowUpRight, CheckCircle, Truck, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OffersTableProps {
  onOpenRfq: (productName: string) => void;
}

export const OffersTable: React.FC<OffersTableProps> = ({ onOpenRfq }) => {
  const [filterBrand, setFilterBrand] = useState<string>('all');

  const filteredOffers = SPECIAL_OFFERS.filter((item) => {
    if (filterBrand === 'all') return true;
    return item.brand.toLowerCase() === filterBrand.toLowerCase();
  });

  return (
    <section id="offers" className="py-20 lg:py-24 bg-[#FFF1E8] border-b border-[#F1D9CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-2 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA] inline-block">
              <Tag className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>Special Factory Stock Lot</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#231815] font-editorial tracking-tight mt-2">
              Products On Special Offer
            </h2>
          </div>
          <p className="text-sm text-[#5F524C]/80 max-w-md font-light">
            Discounted inventory available for immediate dispatch from our Bangalore warehouse while stocks last.
          </p>
        </div>

        {/* Offer Notice Banner */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FFF1E8] text-[#231815] rounded-3xl p-6 sm:p-8 mb-8 border border-[#F1D9CA] shadow-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5F524C]">
                Customer Notice
              </span>
              <p className="text-sm text-[#5F524C] font-light leading-relaxed">
                Dear Customers, greetings… We are pleased to offer the below list of items with a very special rates, this offer is valid till the stock is available, we request you to kindly select the items required and send us your requirement or order for confirmation on the stock status.
              </p>
            </div>
            {/* Value Props */}
            <div className="flex flex-wrap gap-4 text-xs text-[#231815]">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F1D9CA]">
                <Truck className="w-4 h-4 text-[#D2430F]" />
                <span>Free Bangalore Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F1D9CA]">
                <ShieldCheck className="w-4 h-4 text-[#D2430F]" />
                <span>12 Months Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F1D9CA]">
                <Clock className="w-4 h-4 text-[#D2430F]" />
                <span>Ready for Dispatch</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'Lapp', 'Eaton', 'Partex', 'Mennekes'].map((brand) => (
            <motion.button
              key={brand}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilterBrand(brand)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filterBrand === brand
                  ? 'bg-[#D2430F] text-[#FFFAF6] shadow-xs'
                  : 'bg-white text-[#231815] border border-[#F1D9CA] hover:bg-[#FFFAF6]'
              }`}
            >
              {brand === 'all' ? 'All Brands' : brand}
            </motion.button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-[#F1D9CA] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFFAF6] text-[#231815] font-semibold border-b border-[#F1D9CA] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Part No</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Brand</th>
                  <th className="py-3.5 px-4">Packing / Unit</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1D9CA]/60 font-light text-[#231815]">
                <AnimatePresence>
                  {filteredOffers.map((item) => (
                    <motion.tr
                      key={item.partNo}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-[#FFFAF6] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#231815]">
                        {item.partNo}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#231815] max-w-sm">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-4 text-[#5F524C] font-semibold">
                        {item.brand}
                      </td>
                      <td className="py-3.5 px-4">
                        {item.unit}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[#231815] font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-[#5F524C]" />
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onOpenRfq(`${item.partNo} - ${item.description}`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFFAF6] bg-[#D2430F] hover:bg-[#A8340A] rounded-lg transition-colors shadow-2xs cursor-pointer"
                        >
                          <span>Quote</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Terms & Conditions Footer */}
          <div className="bg-[#FFFAF6] p-4 sm:p-6 border-t border-[#F1D9CA] text-xs text-[#5F524C]/80 space-y-2">
            <span className="font-semibold text-[#231815] uppercase tracking-wider text-[11px]">
              Terms &amp; Conditions:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[#5F524C]/80 font-light">
              <li>The above special Prices are discounted; GST Extra as applicable.</li>
              <li>Payment 100% through bank transfer along with the order after confirmation.</li>
              <li>Delivery: Free Delivery to Bangalore urban and industrial area.</li>
              <li>Warranty: 12 months from the date of sale against any manufacturing defects.</li>
              <li>We look forward to receive your valued order.</li>
              <li>Contact Details: info@siddhikabel.com, 080 – 2672 0440</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
