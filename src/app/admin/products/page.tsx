'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  const deleteProduct = async (id: number) => {
    if (!confirm('แน่ใจว่าต้องการลบสินค้านี้?')) return

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id))
    } else {
      alert('ลบไม่สำเร็จ')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">สินค้าทั้งหมด</h1>
        <Link href="/admin/products/create">
          <Button>➕ เพิ่มสินค้าใหม่</Button>
        </Link>
      </div>

      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">ชื่อสินค้า</th>
              <th className="p-2">ราคา</th>
              <th className="p-2">คงเหลือ</th>
              <th className="p-2">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price.toFixed(2)}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2 space-x-2">
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Button variant="outline" size="sm">แก้ไข</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
