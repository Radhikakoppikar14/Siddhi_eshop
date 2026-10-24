import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { COMPANY_INFO, BRANDS_DATA } from '../data/siddhiData';
import { motion, AnimatePresence } from 'framer-motion';

/* Desktop nav link with hover underline + sliding active indicator */
const DesktopNavLink: React.FC<{ to: string; children: React.ReactNode; end?: boolean }> = ({ to, children, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `relative group whitespace-nowrap py-1 transition-colors duration-200 ${
        isActive ? 'text-[#55516B] font-semibold' : 'text-[#1E1B2E]/80 hover:text-[#55516B]'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span className="inline-block transition-transform duration-200 group-hover:-translate-y-px">{children}</span>
        <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-[#6D3FD6] transition-transform duration-300 ease-out group-hover:scale-x-100" />
        {isActive && (
          <motion.span
            layoutId="nav-active-underline"
            className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-[#6D3FD6]"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </>
    )}
  </NavLink>
);

const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/products', label: 'Products Catalog' },
  { to: '/industries', label: 'Industries We Cater' },
  { to: '/contact', label: 'Contact & Location' },
];

interface NavbarProps {
  onOpenContactModal?: (item?: string) => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Utility Top Bar - Soft Brown (#55516B) with Warm Beige (#E6DEFA) & Cream White (#FCFBFF) */}
      <div className="bg-[#6D3FD6] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-white/15 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          {/* Left: Tagline & Social Links */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-light text-white truncate max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-none">
              {COMPANY_INFO.tagline}
            </span>
            <div className="hidden lg:flex items-center gap-2.5 text-white/80 border-l border-white/25 pl-3 shrink-0">
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E4D9FF] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7v-3h3V9.5C10 6.46 11.82 5 14.5 5c1.28 0 2.4.1 2.4.1v2.7h-1.35c-1.46 0-1.92.91-1.92 1.85V12h3.15l-.5 3h-2.65v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E4D9FF] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E4D9FF] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.47v6.76z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Phone & Email Contacts */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-white/80 shrink-0 pr-1">
            <a
              href="tel:09620000947"
              className="flex items-center gap-1 sm:gap-1.5 hover:text-[#E4D9FF] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#E4D9FF]" />
              <span className="font-medium font-mono text-white">096200 00947</span>
            </a>
            <span className="text-[#E4D9FF] hidden sm:inline" aria-hidden="true">·</span>
            <a
              href="mailto:info@siddhikabel.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#E4D9FF] transition-colors whitespace-nowrap"
            >
              <Mail className="w-3 h-3 text-[#E4D9FF]" />
              <span>info@siddhikabel.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Cream White (#FCFBFF) with Warm Beige (#E6DEFA) hairline border */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FCFBFF]/95 backdrop-blur-md shadow-sm border-b border-[#E6DEFA]'
            : 'bg-[#FCFBFF] border-b border-[#E6DEFA]'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
          {/* Brand Logo - click goes to the home page */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center shrink-0 group"
            title="Siddhi Kabel - Home"
          >
            <img
              src="/images/logo.png"
              alt="Siddhi Kabel Corporation Private Limited"
              className="h-8 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2"
            />
          </Link>

          {/* Navigation Links (Desktop lg+) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1E1B2E]">
            <DesktopNavLink to="/" end>Home</DesktopNavLink>
            <DesktopNavLink to="/about">About us</DesktopNavLink>

            {/* Products with Brand Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <DesktopNavLink to="/products">
                <span className="inline-flex items-center gap-1">
                  <span>Products</span>
                  <motion.span
                    animate={{ rotate: productsDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] text-[#6D3FD6] inline-block"
                  >
                    ▾
                  </motion.span>
                </span>
              </DesktopNavLink>

              {/* Products Brand Dropdown */}
              <AnimatePresence>
                {productsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top left' }}
                    className="absolute top-full left-0 w-60 bg-[#FCFBFF] rounded-xl shadow-xl border border-[#E6DEFA] py-2 z-50"
                  >
                    <Link
                      to="/products"
                      className="block px-4 py-2.5 text-xs font-semibold text-[#55516B] hover:bg-[#F3EFFE] hover:pl-6 border-b border-[#E6DEFA]/60 transition-all duration-200"
                    >
                      All Products Catalog
                    </Link>
                    {BRANDS_DATA.map((brand, i) => (
                      <motion.div
                        key={brand.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * i + 0.05, duration: 0.25 }}
                      >
                        <Link
                          to={`/products?brand=${brand.id}`}
                          className="block px-4 py-2 text-xs text-[#1E1B2E]/85 hover:text-[#55516B] hover:bg-[#6D3FD6]/8 hover:pl-6 transition-all duration-200"
                        >
                          {brand.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DesktopNavLink to="/industries">Industries</DesktopNavLink>
            <DesktopNavLink to="/contact">Contact</DesktopNavLink>
          </nav>

          {/* Desktop Action Button: CHECK OUR RFQ SITE (Visible only on lg+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/products-on-offer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <motion.span
                animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5B83D]" />
              </motion.span>
              <span>Check our RFQ site</span>
            </Link>
          </div>

          {/* Mobile & Tablet Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#1E1B2E] hover:bg-[#F3EFFE] rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <motion.span
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-[#FCFBFF] border-b border-[#E6DEFA] px-6 py-6 shadow-2xl overflow-hidden"
            >
              <nav className="flex flex-col gap-2 text-sm font-medium text-[#1E1B2E]">
                {MOBILE_LINKS.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.3, ease: 'easeOut' }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block py-2.5 border-b border-[#E6DEFA]/60 transition-all duration-200 hover:pl-2 hover:text-[#55516B] ${
                          isActive ? 'text-[#55516B] font-semibold pl-2 border-l-2 border-l-[#55516B]' : ''
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="pt-4 space-y-2.5">
                  <Link
                    to="/products-on-offer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl text-center shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-[#F5B83D]" />
                    <span>Check our RFQ site</span>
                  </Link>

                  {onOpenContactModal && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenContactModal('Mobile Inquiry');
                      }}
                      className="w-full py-2.5 text-xs font-medium uppercase tracking-wider text-[#55516B] bg-[#F3EFFE] border border-[#E6DEFA] hover:bg-[#E6DEFA] rounded-xl text-center cursor-pointer"
                    >
                      Instant Contact Popup
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};