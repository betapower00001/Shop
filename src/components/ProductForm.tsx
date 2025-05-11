'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          stock: parseInt(formData.stock),
        }),
      })

      if (!res.ok) throw new Error('Failed to create product')

      router.push('/admin/products')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">เพิ่มสินค้าใหม่</h2>

      <input
        name="name"
        placeholder="ชื่อสินค้า"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="คำอธิบาย"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="price"
        type="number"
        placeholder="ราคา"
        value={formData.price}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="imageUrl"
        placeholder="ลิงก์รูปสินค้า"
        value={formData.imageUrl}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="stock"
        type="number"
        placeholder="จำนวนในคลัง"
        value={formData.stock}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'กำลังบันทึก...' : 'เพิ่มสินค้า'}
      </button>
    </form>
  )
}
