// src/app/payments/upload-slip/page.tsx
export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import UploadSlipClient from './UploadSlipClient'

export default function UploadSlipPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadSlipClient />
    </Suspense>
  )
}
