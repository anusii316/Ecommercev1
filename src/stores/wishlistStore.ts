import { create } from 'zustand';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  currentUserId: string | null;
  items: WishlistItem[];
  initializeUserData: (userId: string) => void;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const USER_WISHLIST_KEY = 'nexus-user-wishlist';

const getUserWishlistKey = (userId: string) => `${USER_WISHLIST_KEY}_${userId}`;

const loadUserWishlist = (userId: string): WishlistItem[] => {
  try {
    const stored = localStorage.getItem(getUserWishlistKey(userId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [];
  }
  return [];
};

const saveUserWishlist = (userId: string, items: WishlistItem[]) => {
  try {
    localStorage.setItem(getUserWishlistKey(userId), JSON.stringify(items));
  } catch {
    //
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  currentUserId: null,
  items: [],
  initializeUserData: (userId: string) => {
    if (get().currentUserId === userId) {
      return;
    }

    const userWishlist = loadUserWishlist(userId);
    set({
      currentUserId: userId,
      items: userWishlist,
    });
  },
  addToWishlist: (product) => {
    if (!get().isInWishlist(product.id)) {
      const newItems = [...get().items, product];
      set({ items: newItems });
      if (get().currentUserId) {
        saveUserWishlist(get().currentUserId!, newItems);
      }
    }
  },
  removeFromWishlist: (id) => {
    const newItems = get().items.filter((item) => item.id !== id);
    set({ items: newItems });
    if (get().currentUserId) {
      saveUserWishlist(get().currentUserId!, newItems);
    }
  },
  isInWishlist: (id) => {
    return get().items.some((item) => item.id === id);
  },
}));
