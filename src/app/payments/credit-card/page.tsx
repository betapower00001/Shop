// src/app/payments/credit-card/page.tsx.

import React, { Suspense } from 'react'
import CreditCardClient from './CreditCardClient'

export default function CreditCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreditCardClient />
    </Suspense>
  )
}
