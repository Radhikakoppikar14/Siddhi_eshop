import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ClientsWall } from '../components/ClientsWall';
import { MotionReveal } from '../components/MotionReveal';
import { ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onOpenRfq: (projectName?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenRfq }) => {
  return (
    <div className="bg-[#FCFBFF] text-[#1E1B2E]">
      <PageHeader
        title="Proven Field Projects & Case Studies"
        subtitle="Explore successful industrial installations executed for India's leading aerospace, automotive, machine tool, and pharmaceutical enterprises."
        breadcrumb="Projects"
        category="Field Track Record"
      />

      {/* Case Studies Section */}
      <CaseStudiesSection onOpenRfq={onOpenRfq} />

      {/* Project Execution Methodology Banner */}
      <section className="py-20 bg-[#FCFBFF] border-b border-[#E6DEFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <MotionReveal yOffset={20} duration={0.5}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-semibold tracking-widest uppercase text-[#55516B] px-3 py-1 rounded-full bg-[#F3EFFE] border border-[#E6DEFA] inline-block">
                  Field Execution Standards
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#1E1B2E] font-editorial leading-tight">
                  Zero Plant Downtime &amp; Certified Compliance
                </h3>
                <p className="text-sm text-[#55516B]/80 font-light leading-relaxed">
                  Industrial revamps require extreme coordination. Whether installing chemical earthing pits for GE &amp; Toyota or executing full LED retrofits for Denso Kirloskar &amp; Kennametal, our certified technicians execute during scheduled shutdown windows with zero disruption to continuous production.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-2xl border border-[#E6DEFA] shadow-xs">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#55516B] block mb-1">
                      Pre-Commission Testing
                    </span>
                    <p className="text-xs text-[#55516B]/80 font-light">
                      Complete Earth Megger testing, insulation resistance certification, and lux mapping provided upon project handover.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#E6DEFA] shadow-xs">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#55516B] block mb-1">
                      Statutory Documentation
                    </span>
                    <p className="text-xs text-[#55516B]/80 font-light">
                      Electrical inspectorate-ready test reports and original equipment manufacturer warranties provided with every installation.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenRfq('Industrial Project Inquiry')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Inquire for Project Implementation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border border-[#E6DEFA] shadow-md">
                  <img
                    src="/images/resource/ind2.jpg"
                    alt="Siddhi Kabel Field Commissioning"
                    className="w-full h-80 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Client Wall */}
      <ClientsWall />
    </div>
  );
};
