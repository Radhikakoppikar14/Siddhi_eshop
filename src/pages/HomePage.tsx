import React from 'react';
import { Hero } from '../components/Hero';
import { BrandSelector } from '../components/BrandSelector';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ServicesSection } from '../components/ServicesSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ClientsWall } from '../components/ClientsWall';
import { MotionReveal } from '../components/MotionReveal';

interface HomePageProps {
  onGoToContact: (productName?: string) => void;
  onSelectBrand: (brandId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGoToContact, onSelectBrand }) => {
  return (
    <div>
      {/* 1. Main Slider with live animations, 5s video rotation & typewriter */}
      <Hero onOpenRfq={() => onGoToContact()} />

      {/* 2. Innovative Why Choose Us & About Siddhi Kabel */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <WhyChooseUs />
      </MotionReveal>

      {/* 3. Brands We Deal With (Interactive Selection & Inquiries) */}
      <MotionReveal direction="up" yOffset={50} duration={0.9}>
        <BrandSelector
          onSelectBrand={onSelectBrand}
          onOpenRfq={onGoToContact}
        />
      </MotionReveal>

      {/* 4. Services For Industries */}
      <MotionReveal direction="left" yOffset={70} duration={0.9}>
        <ServicesSection onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 6. Recent Projects */}
      <MotionReveal direction="right" yOffset={70} duration={0.9}>
        <CaseStudiesSection onOpenRfq={onGoToContact} />
      </MotionReveal>

      {/* 7. We Trusted By Client Logos */}
      <MotionReveal direction="zoom" duration={0.9}>
        <ClientsWall />
      </MotionReveal>
    </div>
  );
};