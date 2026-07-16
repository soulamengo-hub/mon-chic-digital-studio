export type ProductInput = {
  sku: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  season?: string;
  size?: string;
  original_size?: string;
  size_system?: string;
  de_size?: string;
  international_size?: string;
  color?: string;
  secondary_color?: string;
  material?: string;
  pattern?: string;
  condition?: string;
  era?: string;
  style_key?: string;
  authenticity_status?: string;
  purchase_price?: number | null;
  sale_price?: number | null;
  occasions?: string[];
  measurements?: string;
  flaws?: string;
  notes?: string;
  status?: string;
};

export type ProductRecord = ProductInput & {
  id: string;
  created_at: string;
  updated_at: string;
};
