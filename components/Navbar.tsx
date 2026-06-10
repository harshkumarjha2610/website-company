'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className="fixed w-full top-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-nav)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-purple-600 rounded-xl flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition-smooth">
                <span className="text-white font-display font-extrabold text-lg">TF</span>
              </div>
              <span className="text-2xl font-display font-extrabold gradient-text tracking-wide">TechFlow</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-sans font-medium text-[15px]">
            <Link href="#services" className="nav-link">Services</Link>
            <Link href="#projects" className="nav-link">Projects</Link>
            <Link href="#saas" className="nav-link">SaaS Products</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
            <button
              className="bg-gradient-to-r from-[#22d3ee] to-purple-600 hover:from-[#0891b2] hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-smooth hover:scale-[1.02]"
              style={{ boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
            >
              Get Started
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-smooth"
              style={{ color: 'var(--text-nav)', border: '1px solid var(--border)' }}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            className="md:hidden pb-6 pt-2 space-y-1 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            {[
              { href: '#services', label: 'Services' },
              { href: '#projects', label: 'Projects' },
              { href: '#saas',     label: 'SaaS Products' },
              { href: '#contact',  label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl font-medium transition-smooth"
                style={{ color: 'var(--text-nav)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card-hover)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-nav-hover)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = ''
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-nav)'
                }}
              >
                {label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <button className="w-full bg-gradient-to-r from-[#22d3ee] to-purple-600 text-white px-4 py-3 rounded-xl font-semibold transition-smooth">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
