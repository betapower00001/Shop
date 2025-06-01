// src/app/products/page.tsx 
  
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true }, // ถ้าต้องการกรองเฉพาะสินค้าที่ active
  });

  console.log("Products:", products); // เช็คข้อมูลที่ดึงมา

  return (
    <div className="container" style={{ paddingTop: "5rem" }}>
      <div style={{ textAlign: "center", fontSize: "30px", padding: "2rem" }}>
        สินค้าทั้งหมด
      </div>
      <div className="row g-5">
        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>ยังไม่มีสินค้าพร้อมจำหน่าย</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-4">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
