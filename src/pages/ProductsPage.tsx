import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { BrandSelector } from '../components/BrandSelector';
import { ProductItem } from '../data/siddhiData';

interface ProductsPageProps {
  selectedBrandId: string;
  onSelectBrand: (brandId: string) => void;
  onOpenSpecs: (product: ProductItem) => void;
  onGoToContact: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectBrand, onGoToContact }) => {
  return (
    <div>
      <PageHeader
        title="Products"
        breadcrumb="Products"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/videos/hero-1.mp4"
      />

      {/* Brand partners + industries each brand serves */}
      <BrandSelector onSelectBrand={onSelectBrand} onOpenRfq={onGoToContact} />
    </div>
  );
};