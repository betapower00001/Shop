 //src/app/payments/upload-slip/page.tsx


'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function UploadSlipPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file || !orderId) return alert('กรุณาเลือกไฟล์และแนบหมายเลขคำสั่งซื้อ')

    const formData = new FormData()
    formData.append('orderId', orderId)
    formData.append('paymentMethod', 'bank_transfer')
    formData.append('file', file)

    const res = await fetch('/api/payments', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('อัปโหลดสลิปเรียบร้อยแล้ว')
      router.push('/order')
    } else {
      alert('เกิดข้อผิดพลาดในการอัปโหลด')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">อัปโหลดสลิปโอนเงิน</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
        ยืนยันการชำระเงิน
      </button>
    </div>
  )
}
