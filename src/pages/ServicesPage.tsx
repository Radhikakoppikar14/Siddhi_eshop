import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { MotionReveal } from '../components/MotionReveal';
import { ShieldCheck, Zap, Lightbulb, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siddhiData';

interface ServicesPageProps {
  onOpenRfq: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenRfq }) => {
  return (
    <div className="bg-[#FCFBFF] text-[#1E1B2E]">
      <PageHeader
        title="Industrial Engineering Services"
        subtitle="Unique industrial electrical solutions specially designed for Indian industries to enhance performance, ensure operator safety, and slash operational energy costs."
        breadcrumb="Services"
        category="Industrial Capabilities"
      />

      {/* Main 3 Services with high clarity images */}
      <ServicesSection onOpenRfq={onOpenRfq} />

      {/* Technical Audit & Site Consultation CTA Banner */}
      <section className="py-16 bg-[#FCFBFF] border-b border-[#E6DEFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <MotionReveal yOffset={20} duration={0.5}>
            <div className="bg-white rounded-3xl border border-[#E6DEFA] p-8 sm:p-12 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-semibold tracking-widest uppercase text-[#55516B] px-3 py-1 rounded-full bg-[#F3EFFE] border border-[#E6DEFA] inline-block">
                    On-Site Engineering Assessment
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#1E1B2E] font-editorial">
                    Need an Electrical Earth Pit Audit or Factory LED Retrofit Study?
                  </h3>
                  <p className="text-sm text-[#55516B]/80 font-light leading-relaxed max-w-2xl">
                    Our certified electrical engineers visit your manufacturing plant to measure soil resistivity, assess earth pit ohmic health, simulate LED lux levels, and propose an optimal, cost-effective execution plan.
                  </p>
                  <div className="flex flex-wrap gap-6 pt-2 text-xs text-[#1E1B2E]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#55516B]" />
                      Earth Pit Resistance Auditing
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Lightbulb className="w-4 h-4 text-[#6D3FD6]" />
                      Shop Floor Lux Level Study
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Zap className="w-4 h-4 text-[#55516B]" />
                      ESE Lightning Umbrella Radius Calculation
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <button
                    onClick={() => onOpenRfq('On-Site Technical Audit / Consultation')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Book Engineering Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`tel:${COMPANY_INFO.contacts.primaryPhone.replace(/\s+/g, '')}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-[#1E1B2E] bg-[#FCFBFF] border border-[#E6DEFA] hover:bg-[#E6DEFA]/30 rounded-xl transition-colors text-center shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#55516B]" />
                    Call Desk: {COMPANY_INFO.contacts.primaryPhone}
                  </a>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
};
