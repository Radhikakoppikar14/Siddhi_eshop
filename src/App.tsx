<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ContactModal } from './components/ContactModal';
import { FloatingArrow } from './components/FloatingArrow';
import { IntroSplash } from './components/IntroSplash';
import { LiveEffects } from './components/LiveEffects';

// The Exact Pages from the Original Website
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BrandPage } from './pages/BrandPage';
import { ProductsPage } from './pages/ProductsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ContactPage } from './pages/ContactPage';
import { OffersPage } from './pages/OffersPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';

import { ProductItem } from './data/siddhiData';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('lapp');
  const [activeProductForSpecs, setActiveProductForSpecs] = useState<ProductItem | null>(null);

  // Global Contact Modal Popup state per user requirement
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledContactItem, setPrefilledContactItem] = useState<string>('');

  const handleOpenContactModal = (itemName?: string) => {
    setPrefilledContactItem(itemName || '');
    setContactModalOpen(true);
  };

  // Direct page navigation fallback if needed
  const handleGoToContact = (productName?: string) => {
    handleOpenContactModal(productName);
  };

  const handleSelectBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
  };

  const handleOpenSpecs = (product: ProductItem) => {
    setActiveProductForSpecs(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF6] text-[#231815] relative">
      {/* Starting Logo Intro Splash Reveal (as requested) */}
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}

      {/* Global live effects: scroll progress, cursor glow, scroll reveals, button shine + ripple */}
      <LiveEffects />

      {/* Top Navbar */}
      <Navbar onOpenContactModal={handleOpenContactModal} onReplayIntro={() => setShowIntro(true)} />

      {/* Dedicated Page Routes with Smooth Page-Entrance Animations */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <HomePage
                    onGoToContact={handleOpenContactModal}
                    onSelectBrand={handleSelectBrand}
                  />
                }
              />
              <Route path="/about" element={<AboutPage onGoToContact={handleOpenContactModal} />} />
              <Route path="/about_us.html" element={<AboutPage onGoToContact={handleOpenContactModal} />} />

              <Route
                path="/products"
                element={
                  <ProductsPage
                    selectedBrandId={selectedBrandId}
                    onSelectBrand={handleSelectBrand}
                    onOpenSpecs={handleOpenSpecs}
                    onGoToContact={handleOpenContactModal}
                  />
                }
              />

              <Route
                path="/products/:brandId"
                element={<BrandPage onOpenSpecs={handleOpenSpecs} onGoToContact={handleOpenContactModal} />}
              />
              <Route path="/products_lapp.html" element={<Navigate to="/products/lapp" replace />} />
              <Route path="/products_eaton.html" element={<Navigate to="/products/eaton" replace />} />
              <Route path="/products_partex.html" element={<Navigate to="/products/partex" replace />} />
              <Route path="/products_mennekes.html" element={<Navigate to="/products/mennekes" replace />} />

              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries.html" element={<IndustriesPage />} />

              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact_us.html" element={<ContactPage />} />

              <Route
                path="/services"
                element={<ServicesPage onOpenRfq={handleOpenContactModal} />}
              />
              <Route
                path="/services.html"
                element={<ServicesPage onOpenRfq={handleOpenContactModal} />}
              />

              <Route
                path="/projects"
                element={<ProjectsPage onOpenRfq={handleOpenContactModal} />}
              />
              <Route
                path="/projects.html"
                element={<ProjectsPage onOpenRfq={handleOpenContactModal} />}
              />

              <Route
                path="/products-on-offer"
                element={<OffersPage onGoToContact={handleOpenContactModal} />}
              />
              <Route
                path="/products-on-offer.html"
                element={<OffersPage onGoToContact={handleOpenContactModal} />}
              />
              <Route
                path="/offers"
                element={<OffersPage onGoToContact={handleOpenContactModal} />}
              />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onOpenContactModal={handleOpenContactModal} />

      {/* Floating Animated Back to Top Object */}
      <FloatingArrow />

      {/* Technical Specifications Sheet (inquiry opens Contact Modal) */}
      <ProductModal
        product={activeProductForSpecs}
        onClose={() => setActiveProductForSpecs(null)}
        onGoToContact={handleOpenContactModal}
      />

      {/* Contact Page Popup Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        prefilledItem={prefilledContactItem}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
=======
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { Header } from "./assets/components/layout/Header";
import { Footer } from "./assets/components/layout/Footer";
import { TopBar } from "./assets/components/layout/TopBar";

import { CartDrawer } from "./assets/components/ui/CartDrawer";
import { AuthModal } from "./assets/components/ui/AuthModal";
import { AccountModal } from "./assets/components/ui/AccountModal";
import { QuickViewModal } from "./assets/components/ui/QuickViewModal";
import { SearchModal } from "./assets/components/ui/SearchModal";
import { SupportModal } from "./assets/components/ui/SupportModal";
import { AboutModal } from "./assets/components/ui/AboutModal";
import { RFQModal } from "./assets/components/ui/RFQModal";

import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { AboutLapp } from "./pages/AboutLapp";
import { AboutEaton } from "./pages/AboutEaton";
import { AboutPartex } from "./pages/AboutPartex";
import { AboutMennekes } from "./pages/AboutMennekes";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const {
    isAboutOpen,
    closeAbout,
    isSupportOpen,
    closeSupport,
    isRfqOpen,
    closeRfq,
    rfqProduct,
  } = useAuth();

  return (
    <div
      className="siddhi-app-wrapper hybrid-light-bg text-slate-800 transition-colors"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <TopBar />
      <Header />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about-lapp" element={<AboutLapp />} />
          <Route path="/about-eaton" element={<AboutEaton />} />
          <Route path="/about-partex" element={<AboutPartex />} />
          <Route path="/about-mennekes" element={<AboutMennekes />} />
          <Route path="/olflex-cables" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />

      <CartDrawer />
      <AuthModal />
      <AccountModal />
      <QuickViewModal />
      <SearchModal />
      <SupportModal isOpen={isSupportOpen} onClose={closeSupport} />
      <AboutModal isOpen={isAboutOpen} onClose={closeAbout} />
      {isRfqOpen && (
        <RFQModal
          product={rfqProduct || "Industrial Project Bulk Requirement"}
          onClose={closeRfq}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
>>>>>>> origin/main
