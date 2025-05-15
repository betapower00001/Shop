// src/hooks/useCart.ts

'use client'

import { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { CartItem } from "@/types/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // ✅ คำนวณ totalItems อย่างปลอดภัย
  const totalItems = items?.reduce((sum, item) => sum + (item.quantity || 0), 0);

  useEffect(() => {
    async function loadCart() {
      try {
        const response = await fetch("/api/cart");
        const data: CartItem[] = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
          const total = data.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          );
          setTotalPrice(total);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดขณะโหลดตะกร้า:", error);
      }
    }

    loadCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          productId: product.id,
          quantity: 1,
        }),
      });
      await response.json();
      await reloadCart();
    } catch (error) {
      console.error("❌ เพิ่มสินค้าล้มเหลว:", error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: id, quantity }),
      });
      await response.json();
      await reloadCart();
    } catch (error) {
      console.error("❌ อัปเดตจำนวนสินค้าล้มเหลว:", error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: id }),
      });
      await response.json();
      await reloadCart();
    } catch (error) {
      console.error("❌ ลบสินค้าล้มเหลว:", error);
    }
  };

  const reloadCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const data: CartItem[] = await response.json();
      setItems(data);
      const total = data.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("❌ โหลดตะกร้าล้มเหลว:", error);
    }
  };

  // ✅ return totalItems ด้วย
  return { items, totalItems, totalPrice, addToCart, updateQuantity, removeFromCart };
}
