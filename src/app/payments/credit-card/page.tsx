// src/app/payments/credit-card/page.tsx

import dynamic from 'next/dynamic'

const CreditCardClient = dynamic(() => import('./CreditCardClient'), {
  ssr: false, // ❌ ปิดการ render ฝั่ง server
})

export default function CreditCardPage() {
  return <CreditCardClient />
}
