'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-pressed={isDark}
    >
      <span
        className="relative flex items-center justify-center"
        style={{ transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {isDark ? (
          <Sun
            size={18}
            className="text-yellow-400"
            style={{ transform: 'rotate(0deg)', transition: 'transform 0.4s ease' }}
          />
        ) : (
          <Moon
            size={18}
            style={{ color: 'var(--text-secondary)', transform: 'rotate(0deg)', transition: 'transform 0.4s ease' }}
          />
        )}
      </span>
    </button>
  )
}
