// src/store/cartStore.ts

import { create } from "zustand";
import { Product } from "@prisma/client";

type CartItem = {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  loadCart: (userId?: number) => Promise<void>;
  addItem: (userId: number, product: Product, quantity?: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  loadCart: async (userId = 1) => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      if (!res.ok) throw new Error("โหลดตะกร้าล้มเหลว");
      const data: CartItem[] = await res.json();
      set({
        items: data,
        totalItems: data.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: data.reduce((sum, item) => sum + item.price * item.quantity, 0),
      });
    } catch (error) {
      console.error("❌ โหลดตะกร้าล้มเหลว:", error);
    }
  },

  addItem: async (userId, product, quantity = 1) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product.id, quantity }),
      });
      if (!res.ok) throw new Error("เพิ่มสินค้าในตะกร้าล้มเหลว");
      await get().loadCart(userId);
    } catch (error) {
      console.error("❌ เพิ่มสินค้าล้มเหลว:", error);
    }
  },

  removeItem: async (cartItemId) => {
    try {
      const res = await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("ลบสินค้าในตะกร้าล้มเหลว");
      await get().loadCart();
    } catch (error) {
      console.error("❌ ลบสินค้าล้มเหลว:", error);
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (!res.ok) throw new Error("อัปเดตจำนวนล้มเหลว");
      await get().loadCart();
    } catch (error) {
      console.error("❌ อัปเดตจำนวนล้มเหลว:", error);
    }
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));
