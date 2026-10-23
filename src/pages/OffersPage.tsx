import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { OffersTable } from '../components/OffersTable';

interface OffersPageProps {
  onGoToContact: (productName: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onGoToContact }) => {
  return (
    <div>
      <PageHeader
        title="Check our RFQ site"
        breadcrumb="RFQ Site & Special Offers"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/aistudio/demoo1.mp4"
      />

      {/* Main Special Offers Table with Direct Contact Routing */}
      <OffersTable onOpenRfq={(item) => onGoToContact(item)} />
    </div>
  );
};