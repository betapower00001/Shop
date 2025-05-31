// src/store/cartStore.ts

import { create } from "zustand";
import { Product } from "@prisma/client";

type CartItem = {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

type CartState = {
  userId: number | null;          // เก็บ userId ไว้ใน store
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  setUserId: (userId: number) => void;   // ตั้ง userId

  loadCart: (userId?: number) => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  userId: null,
  items: [],
  totalItems: 0,
  totalPrice: 0,

  setUserId: (userId) => {
    set({ userId });
  },

  loadCart: async (userId) => {
    const id = userId ?? get().userId;
    if (!id) {
      console.warn("loadCart: userId ไม่ได้ตั้งค่า");
      return;
    }
    try {
      const res = await fetch(`/api/cart?userId=${id}`);
      if (!res.ok) throw new Error("โหลดตะกร้าล้มเหลว");
      const data: CartItem[] = await res.json();
      set({
        items: data,
        totalItems: data.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: data.reduce((sum, item) => sum + item.price * item.quantity, 0),
        userId: id,
      });
    } catch (error) {
      console.error("❌ โหลดตะกร้าล้มเหลว:", error);
    }
  },

  addItem: async (product, quantity = 1) => {
    const userId = get().userId;
    if (!userId) {
      console.warn("addItem: userId ไม่ได้ตั้งค่า");
      return;
    }
    try {
      console.log("เพิ่มสินค้าลงตะกร้า:", { userId, productId: product.id, quantity });
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product.id, quantity }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Response error text:", errorText);
        throw new Error("เพิ่มสินค้าในตะกร้าล้มเหลว");
      }

      await get().loadCart(userId);
    } catch (error) {
      console.error("❌ เพิ่มสินค้าล้มเหลว:", error);
    }
  },

  removeItem: async (cartItemId) => {
    const userId = get().userId;
    if (!userId) {
      console.warn("removeItem: userId ไม่ได้ตั้งค่า");
      return;
    }
    try {
      const res = await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("ลบสินค้าในตะกร้าล้มเหลว");
      await get().loadCart(userId);
    } catch (error) {
      console.error("❌ ลบสินค้าล้มเหลว:", error);
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    const userId = get().userId;
    if (!userId) {
      console.warn("updateQuantity: userId ไม่ได้ตั้งค่า");
      return;
    }
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (!res.ok) throw new Error("อัปเดตจำนวนล้มเหลว");
      await get().loadCart(userId);
    } catch (error) {
      console.error("❌ อัปเดตจำนวนล้มเหลว:", error);
    }
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },

  setItems: (items) => {
    set({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });
  },
}));
