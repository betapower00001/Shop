// src/components/ProductCard.tsx

"use client";

import { Product } from "@prisma/client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import styles from "./Css/ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addItem);
  const safeText = (text: string | null | undefined) => text ?? "";

  return (
    <div className={`card h-100 shadow-sm ${styles.card}`}>
      <div className={`${styles.imageWrapper} position-relative`}>
        <Image
          src={product.imageUrl || "/default-product.jpg"}
          alt={`ภาพสินค้า ${safeText(product.name)}`}
          fill
          style={{ objectFit: "contain", backgroundColor: "#f9f9f9" }}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className={`card-body d-flex flex-column ${styles.cardBody}`}>
        <h5
          className={`card-title text-truncate ${styles.title}`}
          title={safeText(product.name)}
        >
          {safeText(product.name)}
        </h5>

        <p
          className={`card-text ${styles.description}`}
          title={safeText(product.description)}
        >
          {safeText(product.description)}
        </p>

        <p className={`fw-bold text-primary ${styles.price}`}>
          ฿{product.price.toLocaleString()}
        </p>

        <button
          className={`btn btn-primary mt-auto  ${styles.button}`}
          onClick={() => {
            addToCart(1, product, 1);
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
