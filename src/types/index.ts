export type ProductType = "ARABE" | "DISENADOR";
export type VariantType = "BOTTLE" | "DECANT";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  _count?: { products: number };
}

export interface VariantData {
  id: string;
  type: VariantType;
  price: number;
  ml: number;
  stock: number;
  sku: string;
}

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ProductType;
  brand: string | null;
  notes: string | null;
  categoryId: string | null;
  category: CategoryData | null;
  images: string[];
  featured: boolean;
  variants: VariantData[];
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface WhatsAppParams {
  productName?: string;
  variantType?: VariantType;
  ml?: number;
  price?: number;
  isGeneric?: boolean;
}
