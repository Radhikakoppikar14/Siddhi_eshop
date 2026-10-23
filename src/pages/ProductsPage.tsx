import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { BrandSelector } from '../components/BrandSelector';
import { ProductExplorer } from '../components/ProductExplorer';
import { ProductItem } from '../data/siddhiData';

interface ProductsPageProps {
  selectedBrandId: string;
  onSelectBrand: (brandId: string) => void;
  onOpenSpecs: (product: ProductItem) => void;
  onGoToContact: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  selectedBrandId,
  onSelectBrand,
  onOpenSpecs,
  onGoToContact,
}) => {
  return (
    <div>
      <PageHeader
        title="Products"
        breadcrumb="Products"
        category="Siddhi Kabel LTD."
        bgVideo="/assets/aistudio/demoo1.mp4"
      />

      {/* Brand Selector */}
      <BrandSelector
        onSelectBrand={onSelectBrand}
        onOpenRfq={onGoToContact}
      />

      {/* Product Explorer Catalog with Search & Filter */}
      <ProductExplorer
        selectedBrandId={selectedBrandId}
        onOpenSpecs={onOpenSpecs}
        onOpenRfq={(name) => onGoToContact(name)}
      />
    </div>
  );
};