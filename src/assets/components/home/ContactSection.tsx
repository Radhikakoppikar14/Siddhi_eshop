import React from "react";
import { MapPin, Mail, Phone, Clock, Building, ShieldCheck, ArrowUpRight } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section className="py-14 lg:py-20 hybrid-light-bg border-b border-[#E2E8F0] select-none" id="contactSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-[#059669] font-bold uppercase tracking-wider">LOGISTICS & DISPATCH HUBS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1956A6] tracking-tight">
              Connect With Bangalore Central Office
            </h2>
          </div>
          <p className="text-sm text-[#475569] max-w-md leading-relaxed">
            Centrally located in Bangalore's industrial supply network with same-day dispatch to Peenya Industrial Area, Electronic City, Whitefield, and Hosur.
          </p>
        </div>

        {/* 3-Column Executive Dispatch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Registered Head Office */}
          <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 flex flex-col justify-between hover-card-lift shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-[#E2E8F0] text-[#1956A6] flex items-center justify-center shadow-2xs">
                <MapPin size={20} className="text-[#D9262E]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                  REGISTERED HEADQUARTERS
                </span>
                <h3 className="text-base font-black text-[#1956A6] mb-2 tracking-tight">
                  Siddhi Kabel Corporation Pvt Ltd
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed font-mono">
                  No. 3, 1st Main Road, 1st Block,<br />
                  Banashankari 3rd Stage,<br />
                  Bangalore - 560085, Karnataka, India.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#475569]">
              <div className="flex items-center gap-1.5 font-mono">
                <Building size={14} className="text-[#059669]" />
                <span>Central Stocking Hub</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                Active
              </span>
            </div>
          </div>

          {/* Card 2: Sales & Quotation Desk */}
          <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 flex flex-col justify-between hover-card-lift shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-[#E2E8F0] text-[#1956A6] flex items-center justify-center shadow-2xs">
                <Mail size={20} className="text-[#0284C7]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                  ELECTRONIC CORRESPONDENCE
                </span>
                <h3 className="text-base font-black text-[#1956A6] mb-3 tracking-tight">
                  Quotation & Technical Desks
                </h3>
                <div className="space-y-2.5 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#64748B] block">Sales & RFQs:</span>
                    <a href="mailto:sales@siddhikabel.com" className="font-bold text-[#1956A6] hover:text-[#0284C7] transition-colors flex items-center gap-1">
                      <span>sales@siddhikabel.com</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] block">General Technical Enquiry:</span>
                    <a href="mailto:Enquiry@siddhikabel.com" className="font-bold text-[#1956A6] hover:text-[#0284C7] transition-colors flex items-center gap-1">
                      <span>Enquiry@siddhikabel.com</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] block">Executive Management:</span>
                    <a href="mailto:guru@siddhikabel.com" className="text-[#475569] hover:text-[#0284C7] transition-colors">
                      guru@siddhikabel.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center gap-1.5 text-[11px] text-[#475569] font-mono">
              <ShieldCheck size={14} className="text-[#059669]" />
              <span>Avg RFQ response: &lt; 2 business hours</span>
            </div>
          </div>

          {/* Card 3: Hotline & Site Dispatch */}
          <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 flex flex-col justify-between hover-card-lift shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-[#E2E8F0] text-[#1956A6] flex items-center justify-center shadow-2xs">
                <Phone size={20} className="text-[#059669]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                  TELEPHONE ASSISTANCE
                </span>
                <h3 className="text-base font-black text-[#1956A6] mb-3 tracking-tight">
                  Customer Support Hotlines
                </h3>
                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#64748B] block">Primary Hotline:</span>
                    <a href="tel:09620000947" className="font-black text-sm text-[#1956A6] hover:text-[#059669] transition-colors block">
                      096200 00947
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] block">Technical Support:</span>
                    <a href="tel:09886058511" className="font-black text-sm text-[#1956A6] hover:text-[#059669] transition-colors block">
                      098860 58511
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center gap-1.5 text-xs text-[#475569] font-mono">
              <Clock size={14} className="text-[#D9262E]" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};