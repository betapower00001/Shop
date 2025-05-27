// src/app/payments/page.tsx

export const dynamic = 'force-dynamic' // 🛑 ห้ามลืม ❗

import React, { Suspense } from 'react';
import PaymentsClient from './PaymentClient';

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentsClient />
    </Suspense>
  );
}
