// src/components/ProductCard.tsx

"use client";

import { Product } from "@prisma/client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addItem);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [popupQuantity, setPopupQuantity] = useState(1);

  // ป้องกัน null หรือ undefined
  const safeText = (text: string | null | undefined) => text ?? "";

  // ฟังก์ชันเพิ่มลดจำนวนสินค้า
  const changeQuantity = (
    current: number,
    delta: number,
    setFn: (val: number) => void
  ) => {
    const newQty = current + delta;
    if (newQty >= 1) setFn(newQty);
  };

  return (
    <>
      {/* การ์ดสินค้า */}
      <div className="card h-full overflow-hidden border border-gray-200 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl relative group">
        {/* รูปภาพ */}
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

        {/* เนื้อหาสินค้า */}
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

          {/* ปุ่มเพิ่มลดจำนวน */}
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

          {/* ปุ่มสั่งซื้อ */}
          <button
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => addToCart(product, quantity)}
          >
            สั่งซื้อ
          </button>
        </div>
      </div>

      {/* Modal popup แสดงรายละเอียดสินค้า */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 md:flex shadow-lg animate-slideDown relative">
            {/* ปุ่มปิด */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setIsOpen(false)}
              aria-label="ปิด"
            >
              ×
            </button>

            {/* รูปภาพสินค้า */}
            <div className="w-full md:w-1/2 relative h-72 md:h-auto">
              <Image
                src={product.imageUrl || "/default-product.jpg"}
                alt={safeText(product.name)}
                fill
                className="object-contain rounded"
              />
            </div>

            {/* รายละเอียดสินค้า */}
            <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 flex flex-col">
              <h2 className="text-2xl font-bold">{safeText(product.name)}</h2>
              <p className="text-lg text-gray-600 mt-2">
                ฿{product.price.toLocaleString()}{" "}
                <span className="text-sm text-green-600">ฟรีค่าจัดส่ง</span>
              </p>
              <p className="mt-4 text-gray-700">{safeText(product.description)}</p>

              {/* ปุ่มเพิ่มลดจำนวนใน popup */}
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

              {/* ปุ่มสั่งซื้อและปิด */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    addToCart(product, popupQuantity);
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
