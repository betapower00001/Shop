// src/components/ProductCard.tsx

// src/components/ProductCard.tsx

"use client";

import { Product } from "@prisma/client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProductCard({ product }: { product: Product }) {
  const { data: session } = useSession();
  const setUserId = useCartStore((state) => state.setUserId);
  const addToCart = useCartStore((state) => state.addItem);

  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [popupQuantity, setPopupQuantity] = useState(1);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session?.user?.id]);

  const safeText = (text: string | null | undefined) => text ?? "";

  const changeQuantity = (
    current: number,
    delta: number,
    setFn: (val: number) => void
  ) => {
    const newQty = current + delta;
    if (newQty >= 1) setFn(newQty);
  };

  const handleAddToCart = (qty: number) => {
    if (!session?.user?.id) {
      alert("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
      return;
    }
    addToCart(product, qty);
  };

  return (
    <>
      <div className="card h-full overflow-hidden border border-gray-200 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl relative group">
        <div
          className="relative w-full h-60 bg-gray-100 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={product.imageUrl || "/default-product.jpg"}
            alt={safeText(product.name)}
            fill
            className="object-contain"
          />
        </div>

        <div className="p-4 flex flex-col h-full">
          <h5
            className="font-semibold text-lg truncate mb-1 cursor-pointer hover:text-blue-600"
            onClick={() => setIsOpen(true)}
          >
            {safeText(product.name)}
          </h5>
          <p className="text-sm text-gray-500 line-clamp-2">
            {safeText(product.description)}
          </p>
          <p className="text-primary font-bold mt-2 mb-2">
            ฿{product.price.toLocaleString()}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => changeQuantity(quantity, -1, setQuantity)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="ลดจำนวน"
            >
              −
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => changeQuantity(quantity, 1, setQuantity)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="เพิ่มจำนวน"
            >
              +
            </button>
          </div>

          <button
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => handleAddToCart(quantity)}
          >
            สั่งซื้อ
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 md:flex shadow-lg animate-slideDown relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setIsOpen(false)}
              aria-label="ปิด"
            >
              ×
            </button>

            <div className="w-full md:w-1/2 relative h-72 md:h-auto">
              <Image
                src={product.imageUrl || "/default-product.jpg"}
                alt={safeText(product.name)}
                fill
                className="object-contain rounded"
              />
            </div>

            <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 flex flex-col">
              <h2 className="text-2xl font-bold">{safeText(product.name)}</h2>
              <p className="text-lg text-gray-600 mt-2">
                ฿{product.price.toLocaleString()}{" "}
                <span className="text-sm text-green-600">ฟรีค่าจัดส่ง</span>
              </p>
              <p className="mt-4 text-gray-700">
                {safeText(product.description)}
              </p>

              <div className="flex items-center gap-2 mt-6">
                <button
                  onClick={() => changeQuantity(popupQuantity, -1, setPopupQuantity)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  aria-label="ลดจำนวน"
                >
                  −
                </button>
                <span className="w-8 text-center">{popupQuantity}</span>
                <button
                  onClick={() => changeQuantity(popupQuantity, 1, setPopupQuantity)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  aria-label="เพิ่มจำนวน"
                >
                  +
                </button>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    handleAddToCart(popupQuantity);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  สั่งซื้อ
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
