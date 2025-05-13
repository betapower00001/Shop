// /src/hooks/useCart.ts

import { useState, useEffect } from 'react';
import { Product } from '@prisma/client';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // โหลดข้อมูลตะกร้าจากฐานข้อมูล
  useEffect(() => {
    async function loadCart() {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setItems(data);
      setTotalPrice(data.reduce((sum: number, item: CartItem) => sum + item.quantity * item.price, 0));
    }

    loadCart();
  }, []);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = async (product: Product) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        userId: 1, // ตัวอย่าง User ID ที่ได้จากระบบ
        productId: product.id,
        quantity: 1,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newItem = await response.json();
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // อัปเดตจำนวนสินค้าในตะกร้า
  const updateQuantity = async (id: string, quantity: number) => {
    const response = await fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ cartItemId: id, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedItem = await response.json();
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // ลบสินค้าจากตะกร้า
  const removeFromCart = async (id: string) => {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({ cartItemId: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    const deletedItem = await response.json();
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedItem.id));
  };

  return { items, totalPrice, addToCart, updateQuantity, removeFromCart };
}
