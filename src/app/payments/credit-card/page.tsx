// src/app/payments/credit-card/page.tsx

import { Suspense } from 'react'
import CreditCardClient from './CreditCardClient'

// บังคับ dynamic rendering
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function CreditCardPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CreditCardClient />
    </Suspense>
  )
}
