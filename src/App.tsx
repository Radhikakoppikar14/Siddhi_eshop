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
    <div className="min-h-screen flex flex-col bg-[#FCFBFF] text-[#1E1B2E] relative">
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