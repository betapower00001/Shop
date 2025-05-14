// src/components/ProductList.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

// เปลี่ยนประเภทของ id จาก string เป็น number
type Product = {
  id: number;  // เปลี่ยนจาก string เป็น number
  name: string;
  price: number;
  imageUrl: string | null;
};

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow hover:shadow-lg transition">
          <Image
            src={product.imageUrl || '/default-product.jpg'}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-t-lg object-cover"
          />
          <div className="p-4">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600">{product.price.toLocaleString()} บาท</p>
            <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline block mt-2">
              ดูรายละเอียดสินค้า
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
