'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-primary/70 backdrop-blur-md border-b border-white/5 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition-smooth">
                <span className="text-white font-display font-extrabold text-lg">TF</span>
              </div>
              <span className="text-2xl font-display font-extrabold gradient-text tracking-wide">TechFlow</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 font-sans font-medium text-[15px]">
            <Link href="#services" className="text-gray-300 hover:text-white transition-smooth relative py-2 group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#projects" className="text-gray-300 hover:text-white transition-smooth relative py-2 group">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#saas" className="text-gray-300 hover:text-white transition-smooth relative py-2 group">
              SaaS Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-smooth relative py-2 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <button className="bg-gradient-to-r from-accent to-purple-600 hover:from-accent-hover hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-glow-indigo transition-smooth hover:scale-[1.02]">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-smooth"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 pt-2 space-y-2 border-t border-white/5">
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-smooth"
            >
              Services
            </Link>
            <Link
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-smooth"
            >
              Projects
            </Link>
            <Link
              href="#saas"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-smooth"
            >
              SaaS Products
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-smooth"
            >
              Contact
            </Link>
            <div className="px-4 pt-2">
              <button className="w-full bg-gradient-to-r from-accent to-purple-600 text-white px-4 py-3 rounded-xl font-semibold shadow-glow-indigo transition-smooth">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

