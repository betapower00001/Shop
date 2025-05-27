// src/app/payments/credit-card/page.tsx

export const dynamic = 'force-dynamic' // ✅ บอก Next.js ว่านี่คือ dynamic page

import loadDynamic from 'next/dynamic' // ✅ เปลี่ยนชื่อ dynamic เพื่อเลี่ยงชนกัน

// โหลด component แบบ dynamic และปิด SSR
const CreditCardClient = loadDynamic(() => import('./CreditCardClient'), {
  ssr: false,
})

export default function CreditCardPage() {
  return <CreditCardClient />
}
