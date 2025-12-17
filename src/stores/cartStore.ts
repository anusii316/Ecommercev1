import { create } from 'zustand';
import { useToastStore } from './toastStore';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  currentUserId: string | null;
  items: CartItem[];
  initializeUserData: (userId: string) => void;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const USER_CART_KEY = 'nexus-user-cart';

const getUserCartKey = (userId: string) => `${USER_CART_KEY}_${userId}`;

const loadUserCart = (userId: string): CartItem[] => {
  try {
    const stored = localStorage.getItem(getUserCartKey(userId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
  return [];
};

const saveUserCart = (userId: string, items: CartItem[]) => {
  try {
    localStorage.setItem(getUserCartKey(userId), JSON.stringify(items));
  } catch {
    //
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  currentUserId: null,
  items: [],
  initializeUserData: (userId: string) => {
    if (get().currentUserId === userId) {
      return;
    }

    const userCart = loadUserCart(userId);
    set({
      currentUserId: userId,
      items: userCart,
    });
  },
  addItem: (product, quantity = 1) => {
    const existingItem = get().items.find((item) => item.id === product.id);
    let newItems: CartItem[];

    if (existingItem) {
      newItems = get().items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...get().items, { ...product, quantity }];
    }

    set({ items: newItems });
    if (get().currentUserId) {
      saveUserCart(get().currentUserId!, newItems);
    }

    useToastStore.getState().addToast(`Added ${quantity} item(s) to cart!`, 'success');
  },
  addToCart: (product) => {
    const existingItem = get().items.find((item) => item.id === product.id);
    let newItems: CartItem[];

    if (existingItem) {
      newItems = get().items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...get().items, { ...product, quantity: 1 }];
    }

    set({ items: newItems });
    if (get().currentUserId) {
      saveUserCart(get().currentUserId!, newItems);
    }
  },
  removeFromCart: (id) => {
    const newItems = get().items.filter((item) => item.id !== id);
    set({ items: newItems });
    if (get().currentUserId) {
      saveUserCart(get().currentUserId!, newItems);
    }
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
    } else {
      const newItems = get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      set({ items: newItems });
      if (get().currentUserId) {
        saveUserCart(get().currentUserId!, newItems);
      }
    }
  },
  clearCart: () => {
    set({ items: [] });
    if (get().currentUserId) {
      saveUserCart(get().currentUserId!, []);
    }
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
