// src/components/ProductCarousel.tsx

'use client';

import { Product } from '@prisma/client';
import ProductCard from './ProductCard';
import { useState } from 'react';

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const groupedProducts = Array.from(
    { length: Math.ceil(products.length / itemsPerSlide) },
    (_, index) =>
      products.slice(index * itemsPerSlide, index * itemsPerSlide + itemsPerSlide)
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? groupedProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === groupedProducts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="position-relative overflow-hidden">
      <div
        className="d-flex"
        style={{
          width: `${groupedProducts.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / groupedProducts.length}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {groupedProducts.map((group, index) => (
          <div
            key={index}
            className="d-flex justify-content-center gap-3"
            style={{ width: `${100 / groupedProducts.length}%` }}
          >
            {group.map((product) => (
              <div key={product.id} className="flex-fill" style={{ minWidth: 0 }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={handlePrev}
        aria-label="Previous"
        style={{ width: '5%', cursor: 'pointer' }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
        aria-label="Next"
        style={{ width: '5%', cursor: 'pointer' }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
}
