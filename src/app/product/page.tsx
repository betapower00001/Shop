// src/app/products/page.tsx

import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="container py-4">
        <div style={{textAlign:'center', fontSize:'30px',padding:'2rem'}}>สินค้าทั้งหมด</div>
      <div className="row g-5">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
