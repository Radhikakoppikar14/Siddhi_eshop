import React from 'react';
import { INDUSTRIES } from '../data/industries';
import { IndustryCard } from './IndustryCard';

export const IndustriesSection: React.FC = () => (
  <section id="industries" className="py-20 lg:py-24 bg-[#FFF1E8] border-b border-[#F1D9CA]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <h2 className="text-3xl sm:text-5xl font-bold text-[#231815] font-editorial">Industries we cater to</h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INDUSTRIES.slice(0, 8).map((industry) => (
          <IndustryCard key={industry.name} industry={industry} />
        ))}
      </div>
    </div>
  </section>
);
