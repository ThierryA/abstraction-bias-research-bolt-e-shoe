export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount?: number;
  description: string;
  condition: 'new' | 'like new' | 'gently used' | 'well worn';
  images: string[];
  mannequinImages: string[];
  sizes: string[];
  colors: string[];
  tags: string[];
  rating: number;
  comments: Comment[];
  authenticity: boolean;
  featured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'top-rated';
export type ConditionOption = 'all' | 'new' | 'like new' | 'gently used' | 'well worn';