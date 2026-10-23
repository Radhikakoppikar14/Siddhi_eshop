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
    <section id="offers" className="py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E8D5C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#6F5144] mb-2 px-3 py-1 rounded-full bg-[#E8D5C4]/35 border border-[#E8D5C4] inline-block">
              <Tag className="w-3.5 h-3.5 text-[#A67C63]" />
              <span>Special Factory Stock Lot</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#2D211B] font-editorial tracking-tight mt-2">
              Products On Special Offer
            </h2>
          </div>
          <p className="text-sm text-[#6F5144]/80 max-w-md font-light">
            Discounted inventory available for immediate dispatch from our Bangalore warehouse while stocks last.
          </p>
        </div>

        {/* Offer Notice Banner */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-[#2D211B] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 mb-8 border border-[#6F5144]/40 shadow-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6F5144]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E8D5C4]">
                Customer Notice
              </span>
              <p className="text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
                Dear Customers, greetings… We are pleased to offer the below list of items with a very special rates, this offer is valid till the stock is available, we request you to kindly select the items required and send us your requirement or order for confirmation on the stock status.
              </p>
            </div>
            {/* Value Props */}
            <div className="flex flex-wrap gap-4 text-xs text-[#FAF7F2]">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <Truck className="w-4 h-4 text-[#E8D5C4]" />
                <span>Free Bangalore Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#E8D5C4]" />
                <span>12 Months Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-[#E8D5C4]" />
                <span>Ready for Dispatch</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'Lapp', 'Eaton', 'Mennekes', 'JEF Eco Safe', 'Luker'].map((brand) => (
            <motion.button
              key={brand}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilterBrand(brand)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filterBrand === brand
                  ? 'bg-[#6F5144] text-[#FAF7F2] shadow-xs'
                  : 'bg-white text-[#2D211B] border border-[#E8D5C4] hover:bg-[#FAF7F2]'
              }`}
            >
              {brand === 'all' ? 'All Brands' : brand}
            </motion.button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-[#E8D5C4] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#2D211B] font-semibold border-b border-[#E8D5C4] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Part No</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Brand</th>
                  <th className="py-3.5 px-4">Packing / Unit</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5C4]/60 font-light text-[#2D211B]">
                <AnimatePresence>
                  {filteredOffers.map((item) => (
                    <motion.tr
                      key={item.partNo}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-[#FAF7F2] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#2D211B]">
                        {item.partNo}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#2D211B] max-w-sm">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-4 text-[#6F5144] font-semibold">
                        {item.brand}
                      </td>
                      <td className="py-3.5 px-4">
                        {item.unit}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[#2D211B] font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-[#6F5144]" />
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onOpenRfq(`${item.partNo} - ${item.description}`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#6F5144] hover:bg-[#5C4337] rounded-lg transition-colors shadow-2xs cursor-pointer"
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
          <div className="bg-[#FAF7F2] p-4 sm:p-6 border-t border-[#E8D5C4] text-xs text-[#6F5144]/80 space-y-2">
            <span className="font-semibold text-[#2D211B] uppercase tracking-wider text-[11px]">
              Terms &amp; Conditions:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[#6F5144]/80 font-light">
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
