export interface Product {
  id: string;
  category: string;
  brand: string;
  partNo: string;
  name: string;
  specs: string[];
  voltage?: string;
  tempRange?: string;
  conductor?: string;
  price: number;
  unit: string;
  stock: string;
  icon: string;
  application: string;
  image?: string;
  cores?: number | string;
  size?: number | string;
  color?: string;
  pe?: string;
  outerDia?: number;
}

export interface CartItem {
  id: string;
  name: string;
  partNo: string;
  brand: string;
  price: number;
  unit: string;
  qty: number;
}

export interface OlflexProduct {
  partNo: string;
  name: string;
  core: number;
  pe: string;
  size: number;
  outerDia?: number;
  copperIndex?: number;
  weight?: number;
  price: number;
  gst: number;
  mrp: number;
  category?: string;
  subCategory?: string;
  brand?: string;
  voltage?: string;
  testVoltage?: string;
  standard?: string;
  tempRange?: string;
  desc?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}
