// src/components/CartIcon.tsx

'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

export default function CartIcon() {
  const { totalItems } = useCart()

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
