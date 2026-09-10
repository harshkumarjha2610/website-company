'use client'

import React, { useState, useEffect, useCallback, useRef, Children } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   Card – simple passthrough wrapper
───────────────────────────────────────────── */
export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`w-full h-full ${className}`}>{children}</div>

/* ─────────────────────────────────────────────
   CardSwap
───────────────────────────────────────────── */
interface CardSwapProps {
  children: React.ReactNode
  /** px horizontal spread between stacked cards */
  cardDistance?: number
  /** px vertical drop per layer */
  verticalDistance?: number
  /** ms between automatic card advances */
  delay?: number
  /** pause auto-swap while hovering */
  pauseOnHover?: boolean
  className?: string
}

export default function CardSwap({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = true,
  className = '',
}: CardSwapProps) {
  const cards = Children.toArray(children)
  const total = cards.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % total)
  }, [total])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(advance, delay)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, delay, advance])

  const stackIndex = (i: number) => (i - active + total) % total

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      onMouseEnter={() => { if (pauseOnHover) setPaused(true) }}
      onMouseLeave={() => { if (pauseOnHover) setPaused(false) }}
    >
      {cards.map((child, i) => {
        const si      = stackIndex(i)
        const isFront = si === 0
        const zIndex  = total - si

        const translateX = si * cardDistance * 0.5
        const translateY = si * verticalDistance * 0.35
        const scale      = 1 - si * 0.045
        // Back cards stay mostly opaque — their content is hidden by the overlay below
        const opacity    = isFront ? 1 : Math.max(0.78, 1 - si * 0.07)

        return (
          <motion.div
            key={i}
            style={{ zIndex }}
            animate={{ x: translateX, y: translateY, scale, opacity }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.9 }}
            onClick={() => { if (isFront) advance() }}
            className={`absolute inset-0 ${isFront ? 'cursor-pointer' : 'pointer-events-none'}`}
          >
            {/* Card content */}
            {child}

            {/* Opaque content mask for all non-front cards.
                Sits above the card's inner content but below the card's border/shadow
                (which live on the EcosystemCard root outside this div). */}
            {!isFront && (
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[28px]"
                style={{
                  background: 'var(--bg-card)',
                  zIndex: 10,
                  // Faint top-edge shimmer so the stacked card still feels alive
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              />
            )}
          </motion.div>
        )
      })}

      {/* Dot indicators */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'w-6 h-2 bg-blue-400'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
