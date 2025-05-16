// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import ProductCarousel from "@/components/ProductCarousel";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <main className="min-h-screen bg-light">
        {/* Banner */}
        <div
          className="relative w-full h-[300px] md:h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              ยินดีต้อนรับสู่ร้านของเรา
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 mt-6">
          {/* Sidebar */}

          {/* Main content */}
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              สินค้าแนะนำ
            </h2>

            {products.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                ยังไม่มีสินค้า
              </p>
            ) : (
              <ProductCarousel products={products} />
            )}

            <div className="text-center mt-10">
              <a
                href="/product"
                className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
              >
                ดูสินค้าทั้งหมด
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
