import { useCartStore, CartItem } from '@/store/cartStore'

export const useCart = () => {
  // 🔸 บอก TypeScript ว่า items คือ CartItem[]
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCartStore() as {
    items: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
