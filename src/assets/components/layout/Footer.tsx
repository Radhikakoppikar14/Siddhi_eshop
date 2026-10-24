import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EAF4FC] text-slate-700 text-xs border-t border-[#C7DCEF] select-none">
      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand Info & Identity (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-block"
              aria-label="Siddhi Kabel Home"
            >
              <div className="h-12 px-3 py-1 bg-white rounded-2xl border border-white/20 shadow-md inline-flex items-center">
                <img
                  src="/images/siddhi-kabel-lockup.png"
                  alt="Siddhi Kabel Corporation Private Limited"
                  className="h-8 w-auto max-w-[210px] object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/siddhi-kabel-logo.png";
                  }}
                />
              </div>
            </Link>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Premier stocking distributor and supply partner for industrial
              automation cables, switchgear, heavy-duty CEE connections, and
              precision marking systems across South India.
            </p>

            <div className="pt-2 text-slate-600 font-mono text-[11px] space-y-1">
              <div>
                GSTIN: <span className="text-blue-900">29AB2I30DNNJ</span>
              </div>
              <div>Central Hub: Peenya Industrial Area, Bangalore 560058</div>
            </div>
          </div>

          {/* Column 2: Authorized Brands (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono">
              Authorized Brands
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/about-lapp"
                  className="hover:text-red-700 transition-colors"
                >
                  LAPP Kabel Stuttgart
                </Link>
              </li>
              <li>
                <Link
                  to="/about-eaton"
                  className="hover:text-blue-700 transition-colors"
                >
                  EATON Moeller Switchgear
                </Link>
              </li>
              <li>
                <Link
                  to="/about-mennekes"
                  className="hover:text-red-700 transition-colors"
                >
                  MENNEKES Industrial Plugs
                </Link>
              </li>
              <li>
                <Link
                  to="/about-partex"
                  className="hover:text-blue-700 transition-colors"
                >
                  PARTEX Marking Systems
                </Link>
              </li>
              <li>
                <a
                  href="#productsSection"
                  className="hover:text-blue-900 transition-colors"
                >
                  Full Catalog & Inventory Stock →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Catalogs (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono">
              Product Catalogs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#productsSection"
                  className="hover:text-blue-900 transition-colors"
                >
                  ÖLFLEX® Flexible Control Cables
                </a>
              </li>
              <li>
                <a
                  href="#productsSection"
                  className="hover:text-blue-900 transition-colors"
                >
                  Industrial Ethernet & PROFINET
                </a>
              </li>
              <li>
                <a
                  href="#productsSection"
                  className="hover:text-blue-900 transition-colors"
                >
                  CEE 16A/32A Watertight Plugs
                </a>
              </li>
              <li>
                <a
                  href="#productsSection"
                  className="hover:text-blue-900 transition-colors"
                >
                  Motor Starters & Contactors
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Bangalore Sales Desk (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono">
              Bangalore Sales Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-red-600 shrink-0 mt-0.5" />
                <span>
                  No. 42/1, 2nd Main, Banashankari 3rd Stage, Bangalore -
                  560058, Karnataka, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-blue-700 shrink-0" />
                <a
                  href="tel:09620000947"
                  className="hover:text-white transition-colors font-mono"
                >
                  +91 96200 00947
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-blue-700 shrink-0" />
                <a
                  href="mailto:sales@siddhikabel.com"
                  className="hover:text-white transition-colors font-mono"
                >
                  sales@siddhikabel.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#C7DCEF] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Siddhi Kabel Corporation Private
            Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about-lapp" className="hover:text-blue-900">
              LAPP
            </Link>
            <Link to="/about-eaton" className="hover:text-blue-900">
              EATON
            </Link>
            <Link to="/about-partex" className="hover:text-blue-900">
              PARTEX
            </Link>
            <Link to="/about-mennekes" className="hover:text-blue-900">
              MENNEKES
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
