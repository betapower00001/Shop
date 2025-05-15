// src/components/ProductCard.tsx

"use client";

import { Product } from "@prisma/client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import styles from "./Css/ProductCard.module.css"; // เรียก CSS module

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addItem);

  const safeText = (text: string | null | undefined) => text ?? "";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl || "/default-product.jpg"}
          alt={`ภาพสินค้า ${safeText(product.name)}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className={styles.cardBody}>
        <h5 className={styles.title} title={safeText(product.name)}>
          {safeText(product.name)}
        </h5>

        <p className={styles.description} title={safeText(product.description)}>
          {safeText(product.description)}
        </p>

        <p className={styles.price}>฿{product.price.toLocaleString()}</p>

        <button
          className={styles.button}
          onClick={() => {
            addToCart(1, product, 1); // ✅ ส่ง userId และ quantity
            console.log("✅ เพิ่มสินค้าลงตะกร้าแล้ว:", product.name);
          }}
          aria-label={`เพิ่ม ${safeText(product.name)} ลงตะกร้า`}
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}
