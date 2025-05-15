 //src/app/cart/page.tsx

"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, totalItems, totalPrice, loadCart, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    loadCart(1); // โหลดตะกร้าของ userId=1
  }, [loadCart]);

  if (items.length === 0)
    return <div>ตะกร้าว่างเปล่า</div>;

  return (
    <div>
      <h1>ตะกร้าสินค้า</h1>
      <p>รวม {totalItems} ชิ้น ราคา {totalPrice.toFixed(2)} บาท</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <div>{item.name} - ราคา {item.price} บาท</div>
            <div>
              จำนวน: 
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => {
                  const qty = parseInt(e.target.value);
                  if (qty > 0) updateQuantity(item.id, qty);
                }}
                style={{ width: "60px", marginLeft: "0.5rem" }}
              />
            </div>
            <button onClick={() => removeItem(item.id)}>ลบสินค้า</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
