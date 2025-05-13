'use client';

import { Product } from '@prisma/client'; // ✅ ใส่ตรงนี้
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore(state => state.addItem);

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <Image
        src={product.imageUrl || '/default-product.jpg'}
        alt={product.name}
        width={400}
        height={300}
        className="object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="mt-1 font-bold text-blue-600">฿{product.price}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        onClick={() => addToCart(product)}
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}
