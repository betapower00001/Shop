import ProductCard from '@/components/ProductCard';

const products = [
  { id: '1', name: 'Product A', price: 120, image: '/default-product.jpg' },
  { id: '2', name: 'Product B', price: 199, image: '/default-product.jpg' },
  { id: '3', name: 'Product C', price: 250, image: '/default-product.jpg' },
];

export default function ProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">สินค้าทั้งหมด</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
