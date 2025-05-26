// src/components/ProductCarousel.tsx

'use client';

import { Product } from '@prisma/client';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // เปลี่ยนจำนวนต่อแถวตามขนาดหน้าจอ
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerSlide(1);
      else if (width < 768) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const groupedProducts = Array.from(
    { length: Math.ceil(products.length / itemsPerSlide) },
    (_, i) => products.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide)
  );

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? groupedProducts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === groupedProducts.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${groupedProducts.length * 100}%`,
          transform: `translateX(-${(100 / groupedProducts.length) * currentIndex}%)`,
        }}
      >
        {groupedProducts.map((group, idx) => (
          <div
            key={idx}
            className="flex justify-center gap-4 px-4"
            style={{ width: `${100 / groupedProducts.length}%` }}
          >
            {group.map((product) => (
              <div key={product.id} className="w-full max-w-sm flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ปุ่ม Prev */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md z-10"
        aria-label="Previous"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ปุ่ม Next */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md z-10"
        aria-label="Next"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
