import React from 'react';
import { Link } from 'react-router-dom';
import { BrandInfo } from '../data/siddhiData';
import { getIndustriesForBrand } from '../data/industries';

/**
 * "Where this brand is used": one image card per industry, coloured with the brand's own colour.
 */
export const BrandIndustries: React.FC<{ brand: BrandInfo; compact?: boolean }> = ({ brand, compact }) => {
  const industries = getIndustriesForBrand(brand.id);
  if (industries.length === 0) return null;

  return (
    <div
      className={`grid gap-4 ${
        compact ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {industries.map((ind) => (
        <Link
          key={ind.name}
          to="/industries"
          className="group flex flex-col overflow-hidden rounded-xl bg-white border transition-shadow hover:shadow-lg"
          style={{ borderColor: `${brand.color}55` }}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF1E8]">
            <img
              src={ind.image}
              alt={ind.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="px-4 py-3 border-t-4" style={{ borderColor: brand.color }}>
            <h4 className="text-sm font-bold leading-snug" style={{ color: brand.colorDark }}>
              {ind.name}
            </h4>
          </div>
        </Link>
      ))}
    </div>
  );
};
