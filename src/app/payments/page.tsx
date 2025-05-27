// src/app/payments/page.tsx

import React, { Suspense } from 'react';
import PaymentsClient from './PaymentClient';

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentsClient />
    </Suspense>
  );
}
