'use client'
import { useState, useEffect } from 'react'

const slides = [
  { bg: 'from-[#7a3a1a] via-[#c05a20] to-[#8b4010]', title: 'DRINKS', sub: 'Refreshing & Chilled!', emoji: '🥤' },
  { bg: 'from-[#1a3a1a] via-[#2d6b2d] to-[#1a4010]', title: 'MAIN DISHES', sub: 'Delicious & Authentic!', emoji: '🍲' },
  { bg: 'from-[#1a1a4a] via-[#2d2d8a] to-[#1a1060]', title: 'PROTEINS', sub: 'Fresh & Flavourful!', emoji: '🍗' },
]

export default function HeroSlider() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} flex items-center transition-opacity duration-700 ${i === cur ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="pl-8 z-10">
            <h1 className="font-oswald text-6xl font-bold text-white uppercase leading-none">{slide.title}</h1>
            <p className="font-oswald text-base font-semibold text-brand-gold uppercase tracking-[3px] mt-2">{slide.sub}</p>
          </div>
          <div className="absolute right-[8%] bottom-0 text-[140px] leading-none select-none">{slide.emoji}</div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === cur ? 'w-8 bg-white' : 'w-8 bg-white/35'}`}
          />
        ))}
      </div>
    </div>
  )
}
