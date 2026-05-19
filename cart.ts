import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MenuItem } from './menu'

export interface CartItem extends MenuItem {
  qty: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
  updateQty: (id: string, delta: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set({ items: get().items.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...get().items, { ...item, qty: 1 }] })
        }
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQty: (id, delta) => {
        const updated = get().items.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        set({ items: updated.filter((i) => i.qty > 0) })
      },

      clearCart: () => set({ items: [] }),

      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'de-destination-cart' }
  )
)
