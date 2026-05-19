'use client'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { ShoppingBag, Menu, X, User, LogOut, Package } from 'lucide-react'
import { useCart } from '@/lib/cart'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  onCartOpen: () => void
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { data: session } = useSession()
  const count = useCart((s) => s.count())
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-brand-dark/90 backdrop-blur-md">
        {/* Hamburger */}
        <button onClick={() => setDrawerOpen(true)} className="flex flex-col gap-1.5 p-1">
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-11 h-11 border-2 border-brand-gold rounded-full flex items-center justify-center font-playfair text-xl font-black text-brand-gold">
            D
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-playfair italic text-[10px] text-brand-gold tracking-wider">De</span>
            <span className="font-oswald text-lg text-brand-gold tracking-[3px]">DESTINATION</span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 text-sm font-bold relative"
          >
            <ShoppingBag size={16} className="text-brand-red" />
            <span>|</span>
            <span>{count}</span>
          </button>

          {/* User */}
          {session ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-gold">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="avatar" width={36} height={36} />
                ) : (
                  <div className="w-full h-full bg-brand-gold flex items-center justify-center text-white font-bold text-sm">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                )}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-bold text-sm truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                  <Link href="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                    <Package size={15} /> My Orders
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-red w-full hover:bg-gray-50">
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => signIn()} className="text-brand-gold text-sm font-bold">
              <User size={20} />
            </button>
          )}
        </div>
      </nav>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-72 bg-brand-dark h-full flex flex-col pt-16 px-6 z-10">
            <button onClick={() => setDrawerOpen(false)} className="absolute top-4 right-4 text-white">
              <X size={22} />
            </button>
            {[
              { href: '/', label: '🏠 Home' },
              { href: '#menu', label: '🍽️ Menu' },
              { href: '#main', label: 'Main Dishes' },
              { href: '#proteins', label: 'Proteins' },
              { href: '#drinks', label: 'Drinks' },
              { href: '#extras', label: 'Extras' },
              { href: '/orders', label: '📦 My Orders' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="text-white/85 hover:text-brand-gold font-semibold text-base py-3 border-b border-white/10 block"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
