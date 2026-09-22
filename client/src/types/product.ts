export type ProductStatus = 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'SUSPENDED';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  images: string[];
  status: ProductStatus;
  categoryId: number;
  categoryName: string;
  sellerId: number;
  sellerName: string;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  product: Product;
  addedAt: string;
}
