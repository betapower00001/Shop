// src/app/payments/credit-card/page.tsx

// ลบ dynamic และ Suspense ออกจากไฟล์นี้
import CreditCardClient from './CreditCardClient'; // 👈 นำเข้า CreditCardClient โดยตรง

// เนื่องจากการเรียกใช้ useSearchParams จะทำให้ทั้งหน้าเป็น Client Component
// และ 'use client' จะถูกประกาศใน CreditCardClient.tsx อยู่แล้ว
// Next.js จะจัดการเรื่องนี้ให้เอง

export default function CreditCardPage() {
  return (
    // เรียกใช้ CreditCardClient โดยตรง
    // เนื่องจาก CreditCardClient มี 'use client' อยู่แล้ว
    // Next.js จะรู้ว่าหน้านี้ต้องถูก Client-side Render
    <CreditCardClient />
  );
}
