//src/app/cart/page.tsx

"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase"; // แก้ตาม path schema ของคุณ

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    loadCart,
    removeItem,
    updateQuantity,
    setUserId,
  } = useCartStore();

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  // ✅ โหลด userId จาก Supabase แล้วตั้งค่าใน store
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data?.user?.id;

      if (uid) {
        setUserId(uid);
        loadCart(uid);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    console.log("🛒 ตะกร้าล่าสุด:", items);
  }, [items]);

  if (items.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        🛒 ตะกร้าว่างเปล่า
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28">
      <h1 className="text-2xl font-bold mb-4">🧾 ตะกร้าสินค้า</h1>
      <p className="mb-6 text-gray-700">
        รวม {totalItems} ชิ้น | ราคา {Number(totalPrice).toFixed(2)} บาท
      </p>

      <ul className="space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="relative w-24 h-24">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover rounded border"
              />
            </div>

            <div className="flex-1">
              <div className="font-semibold text-lg">{item.name}</div>
              <div className="text-gray-500">ราคา {item.price} บาท</div>

              <div className="mt-2 flex items-center gap-2">
                <label
                  htmlFor={`qty-${item.id}`}
                  className="text-sm text-gray-600"
                >
                  จำนวน:
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value);
                    if (!isNaN(qty) && qty > 0) {
                      updateQuantity(item.id, qty);
                    }
                  }}
                  className="w-16 px-2 py-1 border rounded text-center"
                />
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="mt-2 text-red-500 hover:underline text-sm"
              >
                🗑 ลบสินค้า
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push("/checkout")}
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
      >
        ไปชำระเงิน
      </button>
    </div>
  );
}
