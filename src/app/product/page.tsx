import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';


export default async function ProductPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
