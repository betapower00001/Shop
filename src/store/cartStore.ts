import { create } from 'zustand';
import { Product } from '@prisma/client';

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...items, { ...product, quantity: 1 }],
      });
    }
  },

  removeItem: (productId: number) => {
    set({
      items: get().items.filter(item => item.id !== productId),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  totalItems: 0,
  totalPrice: 0,
}));

// 📌 อัปเดต totalItems & totalPrice อัตโนมัติ (optional enhancement)
useCartStore.subscribe(state => {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useCartStore.setState({ totalItems, totalPrice });
});
