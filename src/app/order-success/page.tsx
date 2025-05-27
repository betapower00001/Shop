// src/app/order-success/page.tsx
import Link from 'next/link' // เพิ่มบรรทัดนี้

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">สั่งซื้อสำเร็จ!</h1>
        <p className="text-gray-700">เจ้าหน้าที่จะติดต่อคุณเพื่อยืนยันการจัดส่งเร็ว ๆ นี้</p>
        <Link href="/" className="inline-block mt-6 text-green-600 hover:underline">
          กลับไปหน้าร้าน
        </Link>
      </div>
    </div>
  )
}
