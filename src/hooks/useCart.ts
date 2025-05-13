import { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { CartItem } from "@/types/cart"; // หรือ './types/cart' แล้วแต่โครงสร้าง

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // โหลดข้อมูลตะกร้าจากฐานข้อมูล
  useEffect(() => {
    async function loadCart() {
      const response = await fetch("/api/cart");
      const data = await response.json();
      
      // ตรวจสอบว่า data ตรงตาม CartItem หรือไม่
      if (Array.isArray(data)) {
        setItems(data);
        setTotalPrice(
          data.reduce(
            (sum: number, item: CartItem) => sum + item.quantity * item.price,
            0
          )
        );
      }
    }

    loadCart();
  }, []);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = async (product: Product) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        userId: 1, // ตัวอย่าง User ID ที่ได้จากระบบ
        productId: product.id,
        quantity: 1,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const newItem = await response.json();
    if (newItem && typeof newItem.id === "string") { // ตรวจสอบว่า newItem ตรงกับ CartItem
      setItems((prevItems) => [...prevItems, newItem]);
    }
  };

  // อัปเดตจำนวนสินค้าในตะกร้า
  const updateQuantity = async (id: string, quantity: number) => {
    const response = await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({ cartItemId: id, quantity }),
      headers: { "Content-Type": "application/json" },
    });
    const updatedItem = await response.json();
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // ลบสินค้าจากตะกร้า
  const removeFromCart = async (id: string) => {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ cartItemId: id }),
      headers: { "Content-Type": "application/json" },
    });
    const deletedItem = await response.json();
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItem.id)
    );
  };

  // เคลียร์ตะกร้า
  const clearCart = async () => {
    setItems([]);
    setTotalPrice(0);
    await fetch("/api/cart/clear", { method: "POST" });
  };

  return { items, totalPrice, addToCart, updateQuantity, removeFromCart, clearCart };
}
