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
 * Authorised brand partners (Lapp, Eaton, Partex, Mennekes).
 * Each card carries only that brand's colour.
 */
export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelectBrand }) => {
  return (
    <section id="brands" className="bg-white border-b border-[#EBD9CD] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#231815] leading-[1.05] font-editorial">
            Our Authorised Brand Partners
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F524C] leading-relaxed">
            Siddhi Kabel is the certified regional distributor and factory-direct partner for world-leading
            electrical brands.
          </p>
        </div>

        {/* Brand cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANDS_DATA.map((brand) => {
            return (
              <article
                key={brand.id}
                className="flex flex-col text-center rounded-3xl overflow-hidden transition-all"
                style={{
                  border: `1px solid ${brand.color}66`,
                  borderTop: `5px solid ${brand.color}`,
                  background: `linear-gradient(135deg, ${brand.color}26 0%, #ffffff 58%, ${brand.color}14 100%)`,
                }}
              >
                <div className="flex flex-col items-center flex-1 px-6 pt-8 pb-6">
                  <div className="w-36 h-36 rounded-full bg-white shadow-md flex items-center justify-center p-5">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-14 max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3
                    className="mt-6 text-2xl font-extrabold uppercase leading-tight"
                    style={{ color: brand.colorDark }}
                  >
                    {brand.name}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#8A97AB]">{brand.origin}</p>
                  <p className="mt-2 text-[15px] leading-snug text-[#3D332E]">{brand.shortDesc}</p>

                  <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {brand.categories.map((cat) => (
                      <li
                        key={cat}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/80 border"
                        style={{ color: brand.colorDark, borderColor: `${brand.color}55` }}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 flex flex-col items-center gap-3 w-full">
                    <Link
                      to={`/products/${brand.id}`}
                      onClick={() => onSelectBrand(brand.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: brand.colorDark }}
                    >
                      <span>Browse {brand.name.split(' ')[0]} products</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};