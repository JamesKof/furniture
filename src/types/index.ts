export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: number;
  material: string;
  color: string;
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
  };
  weight: number;
  is_featured: boolean;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  category?: Category;
  average_rating?: number;
  review_count?: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  parent_id: string | null;
  sort_order: number;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total: number;
  promo_code: string | null;
  shipping_address: ShippingAddress;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  variant_name: string | null;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
  user?: {
    full_name: string;
  };
}

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase: number;
  max_uses: number | null;
  used_count: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
}
