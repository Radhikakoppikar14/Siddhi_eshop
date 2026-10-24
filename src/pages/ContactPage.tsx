import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Contact"
        breadcrumb="Contact-us"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/videos/hero-1.mp4"
      />

      {/* Exact Head Office Details & Send Message Form */}
      <ContactSection />
    </div>
  );
};