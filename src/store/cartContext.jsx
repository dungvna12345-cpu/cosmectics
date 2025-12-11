import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart-items')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(items))
  }, [items])

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.salePrice ?? product.price,
          image: product.image,
          brand: product.brand,
          quantity: 1,
        },
      ]
    })
  }

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0),
    )
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const clear = () => setItems([])

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { count: items.reduce((c, i) => c + i.quantity, 0), subtotal }
  }, [items])

  const value = { items, addToCart, updateQty, remove, clear, summary }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartProvider

