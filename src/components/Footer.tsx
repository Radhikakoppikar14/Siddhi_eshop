import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  Building2
} from 'lucide-react';

interface FooterProps {
  onOpenContactModal?: (subject?: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#2D211B] text-[#FAF7F2] border-t border-[#6F5144]/40 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6F5144]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E8D5C4]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Identity & Trust Badges (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Siddhi Kabel Corporation"
                className="h-11 w-auto object-contain bg-white/95 p-1.5 rounded-lg shadow-sm"
              />
            </Link>

            <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed">
              Siddhi Kabel Corporation Private Limited is an authorized industrial distributor, dealer, and engineering partner supplying world-leading electrical cables, switchgears, plugs, and safety equipment.
            </p>

            {/* Certifications and Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#E8D5C4]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#E8D5C4]" />
                <span className="font-medium">100% Factory Certified &amp; OEM Warranted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#E8D5C4]">
                <Award className="w-4 h-4 shrink-0 text-[#E8D5C4]" />
                <span className="font-medium">Direct Authorized Channel Partner since 2008</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#E8D5C4]">
                <Building2 className="w-4 h-4 shrink-0 text-[#E8D5C4]" />
                <span className="font-medium">Bangalore Central Warehouse &amp; Pan-India Dispatch</span>
              </div>
            </div>
          </div>

          {/* Fast Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8D5C4] flex items-center gap-1.5">
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#FAF7F2]/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Products &amp; Catalog</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Engineering Services</span>
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Industries Catered</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Case Studies</span>
                </Link>
              </li>
              <li>
                <Link to="/products-on-offer" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Check our RFQ site</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3 h-3 text-[#E8D5C4] group-hover:translate-x-1 transition-transform" />
                  <span>Contact Office</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Authorized Factory Portfolios (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8D5C4]">
              Authorized Alliances
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#FAF7F2]/80">
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Lapp Cables (ÖLFLEX / UNITRONIC)</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">Germany</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Eaton - Moeller Switchgears</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">USA / Germany</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Mennekes CEE Plugs &amp; Sockets</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">Germany</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">JEF Eco Safe Chemical Earthing</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">India</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Havells Industrial Electricals</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">India</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Hager Modular Enclosures</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">Germany</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Luker High-Bay Plant LED</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">USA</span>
              </li>
              <li className="flex items-center justify-between group">
                <span className="hover:text-white transition-colors">Neptune Power Factor Solutions</span>
                <span className="text-[10px] text-[#E8D5C4] font-mono">India / Europe</span>
              </li>
            </ul>
          </div>

          {/* Bangalore Headquarters & Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8D5C4]">
              Bangalore Head Office
            </h4>
            <div className="space-y-3 text-xs font-light text-[#FAF7F2]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8D5C4] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  #76, 2nd Floor, 80 Feet Road, Banashankari 3rd Stage, Bangalore - 560 085, Karnataka, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8D5C4] shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:09620000947" className="hover:text-white block font-mono">
                    +91 96200 00947
                  </a>
                  <a href="tel:09886058511" className="hover:text-white block font-mono">
                    +91 98860 58511
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8D5C4] shrink-0" />
                <a href="mailto:info@siddhikabel.com" className="hover:text-white transition-colors">
                  info@siddhikabel.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#E8D5C4] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Operating Hours:</span>
                  <span className="text-[11px] text-[#E8D5C4]/80">Mon – Sat: 9:30 AM to 6:30 PM IST</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Legal Bar */}
      <div className="bg-[#241A15] py-5 px-4 sm:px-6 lg:px-8 border-t border-[#6F5144]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF7F2]/70">
          <p>© 2026 Siddhi Kabel Corporation Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>ISO 9001:2015 Certified Partner</span>
            <span aria-hidden="true">·</span>
            <span>GST Registered Industrial Supplier</span>
            <span aria-hidden="true">·</span>
            <Link to="/about" className="hover:text-white">Corporate Profile</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-white">Contact &amp; Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
