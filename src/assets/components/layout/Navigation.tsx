import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Headphones,
  Home,
  Info,
  Grid,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { openSupport, openAbout } = useAuth();

  const brandLinks = [
    {
      title: "LAPP Kabel",
      path: "/about-lapp",
      tagline: "Stuttgart, Germany · Integrated Cable Solutions",
      tint: "hover:bg-rose-50 hover:text-rose-700",
      accentDot: "bg-rose-500",
      subItems: [
        { label: "ÖLFLEX® Power & Control Cables", path: "/about-lapp", desc: "Oil-resistant machine wiring" },
        { label: "UNITRONIC® Data & Fieldbus", path: "/about-lapp", desc: "Shielded communication lines" },
        { label: "SKINTOP® Cable Glands", path: "/about-lapp", desc: "IP68 metric strain relief" },
        { label: "UNIPLUS® Single Core Wires", path: "/about-lapp", desc: "Panel & switchboard wiring" },
      ],
    },
    {
      title: "EATON Moeller",
      path: "/about-eaton",
      tagline: "Bonn, Germany · Power Control & Automation",
      tint: "hover:bg-sky-50 hover:text-sky-700",
      accentDot: "bg-sky-500",
      subItems: [
        { label: "PKZM0® Motor Protectors", path: "/about-eaton", desc: "Up to 32A, 150kA breaking" },
        { label: "DILM® Power Contactors", path: "/about-eaton", desc: "AC-3 motor duty 7A-1000A" },
        { label: "NZM® Molded Case Breakers", path: "/about-eaton", desc: "MCCBs up to 1600A" },
        { label: "RMQ-TITAN® Pilot Devices", path: "/about-eaton", desc: "22.5mm IP67 pushbuttons" },
      ],
    },
    {
      title: "PARTEX Sweden",
      path: "/about-partex",
      tagline: "Gullspång, Sweden · Wire & Cable Identification",
      tint: "hover:bg-rose-50 hover:text-rose-700",
      accentDot: "bg-rose-500",
      subItems: [
        { label: "PA Closed Chevron Markers", path: "/about-partex", desc: "0.2 to 70 sq mm sleeves" },
        { label: "ProMark T-1000 Printer", path: "/about-partex", desc: "Portable 300dpi marking kit" },
        { label: "PC Clip-On Open Markers", path: "/about-partex", desc: "Snap-on retrofit markers" },
        { label: "PKS Stainless Steel 316", path: "/about-partex", desc: "Acid-proof marine tags" },
      ],
    },
    {
      title: "MENNEKES",
      path: "/about-mennekes",
      tagline: "Kirchhundem, Germany · Industrial CEE Plugs",
      tint: "hover:bg-slate-50 hover:text-slate-700",
      accentDot: "bg-slate-500",
      subItems: [
        { label: "PowerTOP® Xtra Plugs", path: "/about-mennekes", desc: "IP44 / IP67 16A-125A" },
        { label: "AMAXX® Combinations", path: "/about-mennekes", desc: "Modular distribution panels" },
        { label: "EverGUM® Solid Rubber", path: "/about-mennekes", desc: "Drop-proof portable boxes" },
        { label: "CEE Panel Sockets & DUO", path: "/about-mennekes", desc: "Interlocked switch receptacles" },
      ],
    },
  ];

  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-30 bg-white border-b border-slate-200/90 text-xs font-medium text-slate-700 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            
            {/* 1. Home Link */}
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
                location.pathname === "/" && !location.hash
                  ? "text-slate-800 bg-slate-100 font-bold"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Home size={13} className="text-slate-400" />
              <span>Home</span>
            </Link>

            {/* 2. About Us Trigger (Pops up About Modal) */}
            <button
              type="button"
              onClick={openAbout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-semibold cursor-pointer"
              title="About Siddhi Kabel Corporation"
            >
              <Info size={13} className="text-slate-400" />
              <span>About Us</span>
            </button>

            {/* 3. Product Catalog Link */}
            <a
              href="/#productsSection"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-semibold"
            >
              <Grid size={13} className="text-slate-400" />
              <span>Product Catalog</span>
            </a>

            <span className="text-slate-200 mx-1">|</span>

            {/* 4. Brand Dropdowns */}
            {brandLinks.map((brand) => (
              <div
                key={brand.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(brand.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={brand.path}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all font-medium ${
                    isLinkActive(brand.path)
                      ? "text-slate-800 bg-slate-100 font-bold"
                      : `text-slate-600 hover:text-slate-800 ${brand.tint}`
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${brand.accentDot}`}></span>
                  <span>{brand.title}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 text-slate-400 ${
                      activeDropdown === brand.title ? "rotate-180 text-slate-900" : ""
                    }`}
                  />
                </Link>

                {/* Completely Opaque Floating Flyout with High Z-Index */}
                {activeDropdown === brand.title && (
                  <div className="absolute top-full left-0 w-80 pt-1.5 z-50 animate-fade-in shadow-2xl">
                    <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xl text-slate-900">
                      <div className="px-2 py-1 mb-2 border-b border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-mono font-medium">
                          {brand.tagline}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {brand.subItems.map((sub, idx) => (
                          <Link
                            key={idx}
                            to={sub.path}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                              <span>{sub.label}</span>
                              <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <Link
                          to={brand.path}
                          onClick={() => setActiveDropdown(null)}
                          className="text-[11px] font-bold text-slate-900 hover:text-sky-600 flex items-center gap-1 px-2 py-1"
                        >
                          <span>View Official {brand.title} Make Sheet</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Right Side: Contact & Support Trigger Button */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={openSupport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold transition-all hover:scale-102 cursor-pointer"
              title="Open Technical Helpdesk"
            >
              <Headphones size={13} className="text-sky-600" />
              <span>Contact & Support</span>
            </button>
          </div>

          {/* Mobile Menu Button Bar */}
          <div className="flex md:hidden items-center justify-between w-full py-2">
            <span className="text-xs font-semibold text-slate-900">
              Navigation Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu — Full Width Below Bar */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t border-slate-100 space-y-1.5 animate-fade-in bg-white shadow-xl">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-slate-100"
            >
              <Home size={14} className="text-slate-500" />
              <span>Home</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAbout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-slate-100 text-left cursor-pointer"
            >
              <Info size={14} className="text-slate-500" />
              <span>About Us</span>
            </button>

            <a
              href="/#productsSection"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-slate-100"
            >
              <Grid size={14} className="text-slate-500" />
              <span>Product Catalog</span>
            </a>

            <div className="pt-2 pb-1 px-3 border-t border-slate-100">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Brand Make Sheets
              </span>
            </div>

            <Link
              to="/about-lapp"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50/60 hover:bg-rose-50"
            >
              LAPP Kabel Germany
            </Link>
            <Link
              to="/about-eaton"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50/60 hover:bg-sky-50"
            >
              EATON Moeller Switchgear
            </Link>
            <Link
              to="/about-partex"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50/60 hover:bg-rose-50"
            >
              PARTEX Sweden Marking
            </Link>
            <Link
              to="/about-mennekes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50/60 hover:bg-slate-50"
            >
              MENNEKES Industrial Plugs
            </Link>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSupport();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs cursor-pointer"
              >
                <Headphones size={14} />
                <span>Contact & Technical Support</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};