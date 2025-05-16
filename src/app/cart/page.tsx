//src/app/cart/page.tsx

"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, totalItems, totalPrice, loadCart, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    loadCart(1); // โหลดตะกร้าของ userId=1
  }, [loadCart]);

  useEffect(() => {
    console.log("🛒 ตะกร้าล่าสุด:", items);
  }, [items]);

  if (items.length === 0)
    return <div>🛒 ตะกร้าว่างเปล่า</div>;

  return (
    <div>
      <h1>🧾 ตะกร้าสินค้า</h1>
      <p>รวม {totalItems} ชิ้น ราคา {Number(totalPrice).toFixed(2)} บาท</p>
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
            <button onClick={() => removeItem(item.id)}>🗑 ลบสินค้า</button>
          </li>
        ))}
      </ul>

      {/* ✅ ปุ่มชำระเงิน */}
      <button
        onClick={() => router.push("/checkout")}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        ไปชำระเงิน
      </button>
    </div>
  );
}
