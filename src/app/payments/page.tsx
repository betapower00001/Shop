import { Suspense } from 'react'
import PaymentForm from './PaymentForm'

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <PaymentForm />
    </Suspense>
  )
}
