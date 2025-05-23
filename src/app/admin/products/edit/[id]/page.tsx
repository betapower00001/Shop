// src/app/admin/products/edit/[id]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
  })

  const [loading, setLoading] = useState(true)

  // 🔒 ตรวจสอบ role admin
  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'admin') {
      router.replace('/403')
    }
  }, [session, status])

  // ดึงข้อมูลสินค้าเดิม
  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name,
          description: data.description || '',
          price: data.price.toString(),
          imageUrl: data.imageUrl,
          stock: data.stock.toString(),
        })
        setLoading(false)
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      }),
    })

    router.push('/admin/products')
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('คุณแน่ใจว่าต้องการลบสินค้านี้หรือไม่?')
    if (!confirmDelete) return

    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    router.push('/admin/products')
  }

  if (status === 'loading' || loading) return <p className="p-6">กำลังโหลด...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">แก้ไขสินค้า</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="ชื่อสินค้า" className="w-full border p-2" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="คำอธิบาย" className="w-full border p-2" />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="ราคา" className="w-full border p-2" required />
        <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="URL รูปภาพ" className="w-full border p-2" required />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="จำนวนคงเหลือ" className="w-full border p-2" required />

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            บันทึกการเปลี่ยนแปลง
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            ลบสินค้า
          </button>
        </div>
      </form>
    </div>
  )
}
