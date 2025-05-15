// src/components/CartSummary.tsx
'use client';

import { useCartStore } from '@/store/cartStore';

export default function CartSummary() {
  const totalItems = useCartStore(state => state.totalItems);
  const totalPrice = useCartStore(state => state.totalPrice);

  if (totalItems === 0) return null; // ถ้าไม่มีสินค้า ไม่ต้องแสดง

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      backgroundColor: '#0d6efd',
      color: 'white',
      padding: '10px 20px',
      borderRadius: 8,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      zIndex: 9999,
      fontWeight: 'bold',
      cursor: 'pointer',
      userSelect: 'none',
    }}>
      🛒 สินค้าในตะกร้า: {totalItems} ชิ้น | รวมราคา: ฿{totalPrice.toLocaleString()}
    </div>
  );
}
