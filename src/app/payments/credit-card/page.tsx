// src/app/payments/credit-card/page.tsx

import dynamic from 'next/dynamic'

// โหลด CreditCardClient แบบ dynamic และปิด SSR
const CreditCardClient = dynamic(() => import('./CreditCardClient'), {
  ssr: false,
})

export default function CreditCardPage() {
  return <CreditCardClient />
}
