import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  // ดึงสินค้าจากฐานข้อมูล (ล่าสุด 6 รายการ)
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">ยินดีต้อนรับสู่ร้านของเรา</h1>

      {products.length === 0 ? (
        <p className="text-center">ยังไม่มีสินค้า</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <Image
                  src={product.imageUrl || '/default-product.jpg'}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.price.toLocaleString()} บาท</p>
                  <Link href={`/product/${product.id}`} className="btn btn-primary">
                    ดูสินค้า
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-5">
        <Link href="/product" className="btn btn-outline-secondary">
          ดูสินค้าทั้งหมด
        </Link>
      </div>
    </div>
  );
}
