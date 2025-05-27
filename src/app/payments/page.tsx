 //src/app/payments/page.tsx
 
'use client';

import { Suspense } from 'react';
import PaymentForm from './PaymentForm';

export const dynamic = 'force-dynamic';

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <PaymentForm />
    </Suspense>
  );
}
