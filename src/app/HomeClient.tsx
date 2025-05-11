import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}
