'use client'
import { useSession, signIn } from 'next-auth/react'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

interface CartSidebarProps {
  open: boolean
  onClose: () => void
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { data: session } = useSession()
  const { items, updateQty, clearCart, total, count } = useCart()
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const handleCheckout = async () => {
    if (!session) {
      signIn()
      return
    }
    if (!phone) {
      toast.error('Please enter your phone number')
      return
    }
    if (!address) {
      toast.error('Please enter your delivery address')
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.post('/api/payment/initialize', {
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        total: total(),
        phone,
        deliveryAddress: address,
        notes,
      })

      clearCart()
      window.location.href = data.authorization_url
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Payment failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 w-[min(90vw,380px)] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-playfair text-xl font-bold text-brand-red">Your Order</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-semibold">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-50">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-brand-red font-bold text-sm">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full border-2 border-brand-red text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-sm w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full border-2 border-brand-red text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery details */}
              <div className="pt-3 space-y-3">
                <input
                  type="tel"
                  placeholder="Phone number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                />
                <input
                  type="text"
                  placeholder="Delivery address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                />
                <textarea
                  placeholder="Special notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-black text-xl text-brand-red">₦{total().toLocaleString()}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0 || loading}
            className="w-full bg-brand-red text-white rounded-full py-4 font-bold text-base disabled:opacity-50 hover:bg-brand-red-light transition-colors"
          >
            {loading ? 'Processing...' : session ? 'Pay with Paystack' : 'Sign in to Checkout'}
          </button>
        </div>
      </div>
    </>
  )
}
