'use client'
// src/app/admin/products/page.tsx

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'

export default function AdminProductPage() {
  const [activeProducts, setActiveProducts] = useState<Product[]>([])
  const [inactiveProducts, setInactiveProducts] = useState<Product[]>([])
  const [loadingActive, setLoadingActive] = useState(true)
  const [loadingInactive, setLoadingInactive] = useState(true)

  // โหลดสินค้าที่เปิดขาย
  const fetchActiveProducts = async () => {
    setLoadingActive(true)
    const res = await fetch('/api/products?isActive=true')
    const data = await res.json()
    setActiveProducts(data)
    setLoadingActive(false)
  }

  // โหลดสินค้ายกเลิกขาย
  const fetchInactiveProducts = async () => {
    setLoadingInactive(true)
    const res = await fetch('/api/products?isActive=false')
    const data = await res.json()
    setInactiveProducts(data)
    setLoadingInactive(false)
  }

  // toggle สถานะเปิด/ปิดขาย
  const toggleActive = async (product: Product) => {
    const updatedStatus = !product.isActive

    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: updatedStatus }),
    })

    if (res.ok) {
      // รีเฟรชข้อมูลทั้งสองฝั่ง
      await fetchActiveProducts()
      await fetchInactiveProducts()
    } else {
      alert('อัปเดตสถานะไม่สำเร็จ')
    }
  }

  useEffect(() => {
    fetchActiveProducts()
    fetchInactiveProducts()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">สินค้าทั้งหมด (เปิดขาย)</h1>
        <Link href="/admin/products/create">
          <Button>➕ เพิ่มสินค้าใหม่</Button>
        </Link>
      </div>

      {loadingActive ? (
        <p>กำลังโหลดสินค้าที่ยังเปิดขาย...</p>
      ) : activeProducts.length === 0 ? (
        <p>ไม่มีสินค้าเปิดขาย</p>
      ) : (
        <table className="w-full border text-sm mb-10">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">ชื่อสินค้า</th>
              <th className="p-2">ราคา</th>
              <th className="p-2">คงเหลือ</th>
              <th className="p-2">สถานะ</th>
              <th className="p-2">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {activeProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price.toFixed(2)}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2 text-green-600 font-semibold">เปิดขาย</td>
                <td className="p-2 space-x-2">
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Button variant="outline" size="sm">แก้ไข</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => toggleActive(product)}
                  >
                    ยกเลิกขาย
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">สินค้ายกเลิกขาย</h2>

        {loadingInactive ? (
          <p>กำลังโหลดสินค้ายกเลิกขาย...</p>
        ) : inactiveProducts.length === 0 ? (
          <p>ไม่มีสินค้ายกเลิกขาย</p>
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">ชื่อสินค้า</th>
                <th className="p-2">ราคา</th>
                <th className="p-2">คงเหลือ</th>
                <th className="p-2">สถานะ</th>
                <th className="p-2">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {inactiveProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-2">{product.id}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.price.toFixed(2)}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2 text-red-600 font-semibold">ยกเลิกขาย</td>
                  <td className="p-2 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(product)}
                    >
                      เปิดขายใหม่
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
