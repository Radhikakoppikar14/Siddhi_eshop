import React from "react";
import { Phone, Mail } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#EAF4FC] text-slate-700 text-[11px] border-b border-[#C7DCEF] tracking-normal select-none py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 font-mono">
        {/* Company Name */}
        <div className="font-bold text-blue-900 text-xs tracking-tight text-center md:text-left truncate w-full md:w-auto">
          Siddhi Kabel Corporation Private Limited
        </div>

        {/* Phone & Email Container */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-1 text-slate-600 text-[10px] sm:text-[11px]">
          {/* Phone Numbers */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Phone size={11} className="text-blue-700 shrink-0" />
            <a
              href="tel:09620000947"
              className="hover:text-red-700 transition-colors"
            >
              +91 96200 00947
            </a>
            <span className="text-slate-400">/</span>
            <a
              href="tel:08022214455"
              className="hover:text-red-700 transition-colors"
            >
              +91 80 2221 4455
            </a>
          </div>

          {/* Emails */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Mail size={11} className="text-blue-700 shrink-0" />
            <a
              href="mailto:sales@siddhikabel.com"
              className="hover:text-red-700 transition-colors"
            >
              sales@siddhikabel.com
            </a>
            <span className="text-slate-400">/</span>
            <a
              href="mailto:enquiry@siddhikabel.com"
              className="hover:text-red-700 transition-colors"
            >
              enquiry@siddhikabel.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
