import React, { useState } from 'react';
import { Factory } from 'lucide-react';
import { IndustryItem } from '../data/industries';

export const IndustryCard: React.FC<{ industry: IndustryItem }> = ({ industry }) => {
  const [failed, setFailed] = useState(false);
  return (
    <article className="flex flex-col bg-white border border-[#F1D9CA] rounded-md overflow-hidden">
      <div className="relative aspect-[16/10] bg-[#FFF1E8]">
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center text-[#D2430F]/40">
            <Factory className="w-12 h-12" />
          </div>
        ) : (
          <img
            src={industry.image}
            alt={industry.name}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-5 border-t-4 border-[#D2430F]">
        <h3 className="text-lg font-bold text-[#231815] leading-snug">{industry.name}</h3>
        <p className="mt-2 text-sm text-[#5F524C] leading-relaxed">{industry.desc}</p>
      </div>
    </article>
  );
};
