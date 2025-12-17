import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  specs: { [key: string]: string };
  rating: number;
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((p) => p.id === id),
}));
