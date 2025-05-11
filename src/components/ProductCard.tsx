type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">฿{product.price.toFixed(2)}</p>
    </div>
  )
}
