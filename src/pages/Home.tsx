import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrandsShowcase } from "../assets/components/home/BrandsShowcase";
import { BrandPortfoliosSection } from "../assets/components/home/BrandPortfoliosSection";
import { CompanyProfileSection } from "../assets/components/home/CompanyProfileSection";
import { SalesDeskSection } from "../assets/components/home/SalesDeskSection";
import { RfqSection } from "../assets/components/home/RFQSection";

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      {/* 1. Redesigned Interactive Brands Showcase / Hero Slider */}
      <BrandsShowcase />

      {/* 2. Authorized Brand Portfolios & Detailed System Offerings */}
      <BrandPortfoliosSection />

      {/* 3. Quick RFQ Quotation Console */}
      <RfqSection />

      {/* 4. Company Profile 3-Pillar Section */}
      <CompanyProfileSection />

      {/* 5. Direct Sales & Dispatch Desk */}
      <SalesDeskSection />
    </main>
  );
};