import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRANDS_DATA } from '../data/siddhiData';

interface BrandSelectorProps {
  onSelectBrand: (brandId: string) => void;
  // kept for compatibility with existing pages; the brand cards no longer open the inquiry modal
  onOpenRfq?: (brandName?: string) => void;
}

/**
 * Authorised brand partners: exactly four brands (Lapp, Eaton, Partex, Mennekes).
 * Each panel uses only that brand's own colour.
 */
export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelectBrand }) => {
  return (
    <section id="brands" className="bg-white border-b border-[#EBD9CD] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 mb-12 lg:mb-14 items-end">
          <h2 className="lg:col-span-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#231815] leading-[1.02] font-editorial">
            Our authorised
            <br />
            brand partners
          </h2>
          <p className="lg:col-span-5 lg:col-start-8 text-base sm:text-lg text-[#5F524C] leading-relaxed">
            Siddhi Kabel is the certified regional distributor and factory-direct partner for
            world-leading electrical brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANDS_DATA.map((brand) => (
            <article
              key={brand.id}
              className="flex flex-col bg-white border overflow-hidden rounded-md"
              style={{ borderColor: brand.color }}
            >
              <div
                className="relative h-40 flex items-center justify-center"
                style={{ backgroundColor: brand.color }}
              >
                <div className="bg-white rounded-md px-6 py-4 w-[68%] h-[64px] flex items-center justify-center shadow-sm">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-9 max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/95">
                  {brand.origin}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-6" style={{ backgroundColor: brand.colorTint }}>
                <h3 className="text-2xl font-bold leading-tight" style={{ color: brand.colorDark }}>
                  {brand.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3D332E]">{brand.shortDesc}</p>

                <ul className="mt-5 space-y-2 text-sm text-[#3D332E]">
                  {brand.categories.map((cat) => (
                    <li key={cat} className="flex items-start gap-2.5">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0"
                        style={{ backgroundColor: brand.color }}
                      />
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/products/${brand.id}`}
                  onClick={() => onSelectBrand(brand.id)}
                  className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: brand.colorDark }}
                >
                  <span>Browse {brand.name.split(' ')[0]} products</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
