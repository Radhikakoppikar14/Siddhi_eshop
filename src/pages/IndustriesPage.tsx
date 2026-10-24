import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MotionReveal } from '../components/MotionReveal';
import { INDUSTRIES } from '../data/industries';
import { IndustryCard } from '../components/IndustryCard';

export const IndustriesPage: React.FC = () => {
  return (
    <div className="bg-[#FFFAF6] text-[#231815]">
      <PageHeader
        title="Industries"
        breadcrumb="Industries"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/aistudio/demoo1.mp4"
      />

      <section className="py-16 sm:py-20 bg-[#FFFAF6] border-b border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <MotionReveal yOffset={20} duration={0.5}>
            <div className="max-w-3xl mb-12 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-normal text-[#231815] font-editorial">
                Industries We Cater To
              </h2>
              <p className="text-sm sm:text-base text-[#5F524C]/80 font-light leading-relaxed">
                As the industry is marching towards automation, Industry 4.0, IOT etc, It is important to take right step in selecting the products and solutions in the fast paced journey for a error free and effective future.
              </p>
              <p className="text-sm text-[#5F524C]/80 font-light leading-relaxed">
                Siddhi helps varied industries in their march towards success. Below are some of the Industries we cater to:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRIES.map((industry) => (
                <IndustryCard key={industry.name} industry={industry} />
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
};