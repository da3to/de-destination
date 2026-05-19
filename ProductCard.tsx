'use client'
import { MenuItem } from '@/lib/menu'
import { useCart } from '@/lib/cart'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface ProductCardProps {
  item: MenuItem
  horizontal?: boolean
}

export default function ProductCard({ item, horizontal = false }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    toast.success(`${item.name} added to cart!`, { duration: 1500 })
    setTimeout(() => setAdded(false), 1200)
  }

  if (horizontal) {
    return (
      <div className="flex bg-white rounded-xl overflow-hidden shadow-sm min-w-[270px] max-w-[310px] flex-shrink-0">
        <div className="w-28 h-28 flex-shrink-0 bg-cream flex items-center justify-center text-5xl overflow-hidden">
          {item.image ? (
            <Image src={item.image} alt={item.name} width={112} height={112} className="w-full h-full object-cover" />
          ) : (
            <span>{item.emoji}</span>
          )}
        </div>
        <div className="p-3 flex flex-col justify-between flex-1">
          <p className="font-bold text-sm">{item.name}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-black text-base text-brand-red">₦{item.price.toLocaleString()}</span>
            <button
              onClick={handleAdd}
              className={`border-2 border-brand-red rounded-full px-3 py-1.5 text-xs font-bold transition-all ${added ? 'bg-brand-red text-white' : 'text-brand-red hover:bg-brand-red hover:text-white'}`}
            >
              {added ? '✓ Added' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
      <div className="w-full h-40 bg-cream flex items-center justify-center text-6xl overflow-hidden">
        {item.image ? (
          <Image src={item.image} alt={item.name} width={300} height={160} className="w-full h-full object-cover" />
        ) : (
          <span>{item.emoji}</span>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-sm mb-1">{item.name}</p>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{item.note}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-black text-base text-brand-red">₦{item.price.toLocaleString()}</span>
          <button
            onClick={handleAdd}
            className={`border-2 border-brand-red rounded-full px-3 py-1.5 text-xs font-bold transition-all ${added ? 'bg-brand-red text-white' : 'text-brand-red hover:bg-brand-red hover:text-white'}`}
          >
            {added ? '✓ Added' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
