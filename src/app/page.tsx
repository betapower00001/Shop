// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import ProductList from '@/components/ProductList';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-6">ยินดีต้อนรับสู่ร้านของเรา</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีสินค้า</p>
      ) : (
        <ProductList products={products} />
      )}

      <div className="text-center mt-10">
        <a href="/product" className="btn btn-outline-secondary">
          ดูสินค้าทั้งหมด
        </a>
      </div>
    </main>
  );
}
