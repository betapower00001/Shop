'use client'
// src/app/admin/products/create/page.tsx

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function CreateProductPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [stock, setStock] = useState('0')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'admin') {
      router.push('/403')
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock),
      }),
    })

    if (res.ok) {
      router.push('/admin/products')
    } else {
      alert('เพิ่มสินค้าไม่สำเร็จ')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้าใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="ชื่อสินค้า"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="คำอธิบาย"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="ราคา"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="ลิงก์รูปภาพ"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="จำนวนในคลัง"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          บันทึกสินค้า
        </button>
      </form>
    </div>
  )
}
