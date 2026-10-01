import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  FileText,
  ShoppingCart,
  Headphones,
  Building2,
  Grid,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

export const Header: React.FC = () => {
  const {
    currentUser,
    openAuthModal,
    openAccountModal,
    openSearch,
    openSupport,
    openAbout,
    openRfq,
  } = useAuth();

  const { totalItems, isCartOpen, openCartDrawer, closeCartDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const handleAuthAction = () => {
    if (currentUser) {
      openAccountModal();
    } else {
      openAuthModal("login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-[3px] border-b-red-600 shadow-md transition-all select-none text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 group"
            aria-label="Siddhi Kabel Home"
          >
            <div className="h-11 px-2.5 py-1 bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md flex items-center transition-all duration-300">
              <img
                src="/images/siddhi-kabel-lockup.png"
                alt="Siddhi Kabel Corporation"
                className="h-7 sm:h-8 w-auto max-w-[150px] sm:max-w-[200px] object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/siddhi-kabel-logo.png";
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/catalog"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-800 hover:bg-blue-50 transition-colors"
            >
              <Grid size={14} className="text-blue-600" />
              <span>Catalog</span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <a
                href="/#brandPortfolios"
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-800 hover:bg-blue-50 transition-colors"
              >
                <span>Brands</span>
                <ChevronDown
                  size={12}
                  className={`text-blue-600 transition-transform ${brandsOpen ? "rotate-180 text-red-600" : ""}`}
                />
              </a>

              {brandsOpen && (
                <div className="absolute top-full left-0 w-64 pt-1.5 z-50 animate-fade-in shadow-2xl">
                  <div className="bg-white rounded-2xl border border-slate-200 border-t-[3px] border-t-blue-700 p-2 shadow-2xl space-y-1 text-slate-900">
                    <Link
                      to="/about-lapp"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-red-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-red-800">
                          LAPP Kabel
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ÖLFLEX® Cables & Glands
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/about-eaton"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sky-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-sky-800">
                          EATON Moeller
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Motor Starters & Switchgear
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/about-partex"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-amber-900">
                          PARTEX Sweden
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Wire Marking & Printers
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/about-mennekes"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-slate-800">
                          MENNEKES
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          CEE Plugs & AMAXX
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openAbout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Building2 size={14} className="text-blue-600" />
              <span>Company</span>
            </button>

            <button
              type="button"
              onClick={openSupport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 border border-blue-800 transition-colors cursor-pointer shadow-sm"
            >
              <Headphones size={14} className="text-white" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="h-9 w-9 rounded-xl bg-slate-100 hover:bg-blue-50 text-blue-800 border border-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Search Products (⌘K)"
            >
              <Search size={16} />
            </button>

            {/* Bulk Enquiry Button */}
            <button
              type="button"
              onClick={() => openRfq("Website Bulk Enquiry Requirement")}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-blue-50 text-blue-800 border border-blue-300 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-2xs"
            >
              <FileText size={14} className="text-blue-600" />
              <span>Bulk Enquiry</span>
            </button>

            {/* RFQ Cart Trigger */}
            <button
              onClick={() =>
                isCartOpen ? closeCartDrawer() : openCartDrawer()
              }
              className="relative flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-xl text-xs transition-all shadow-md cursor-pointer border border-red-400"
            >
              <ShoppingCart size={15} />
              <span className="hidden sm:inline">RFQ Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-800 text-white border border-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account Button */}
            <button
              type="button"
              onClick={handleAuthAction}
              className="h-9 w-9 rounded-xl bg-slate-100 hover:bg-blue-50 text-blue-800 border border-slate-300 flex items-center justify-center transition-all cursor-pointer relative shadow-2xs"
              title={
                currentUser
                  ? `Account: ${currentUser.companyName}`
                  : "Sign In / Register"
              }
            >
              <User size={16} />
              {currentUser && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-blue-800 hover:bg-blue-50 border border-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1.5 animate-fade-in bg-white rounded-b-2xl px-2">
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50"
            >
              <Grid size={14} className="text-blue-600" />
              <span>Catalog</span>
            </Link>

            <a
              href="/#brandPortfolios"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50"
            >
              <span>Brands</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAbout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 text-left cursor-pointer"
            >
              <Building2 size={14} className="text-blue-600" />
              <span>Company</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSupport();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs text-left border border-blue-800 cursor-pointer"
            >
              <Headphones size={14} className="text-white" />
              <span>Contact</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openRfq("Website Bulk Enquiry Requirement");
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-rose-400 hover:bg-rose-300 cursor-pointer"
            >
              <FileText size={14} />
              <span>Bulk Enquiry (RFQ Form)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
