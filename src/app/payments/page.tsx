 //src/app/payments/page.tsx

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PaymentsClient = dynamic(() => import('./PaymentClient'), { ssr: false });

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentsClient />
    </Suspense>
  );
}