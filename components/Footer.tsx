'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const linkStyle = {
    color: 'var(--text-footer-link)',
    transition: 'color 0.25s ease',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
  }

  return (
    <footer
      className="relative z-10"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a78bfa] rounded-xl flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(34,211,238,0.2)' }}>
                <span className="font-display font-extrabold text-lg" style={{ color: 'var(--text-inverse)' }}>EP</span>
              </div>
              <span className="text-2xl font-display font-extrabold tracking-wide" style={{ color: 'var(--text-heading)' }}>Enterprise</span>
            </div>
            <p className="font-sans text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Transforming modern businesses with cutting-edge software engineering, custom cloud setups, and intelligent digital products.
            </p>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl transition-smooth group"
                  style={{
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#22d3ee'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)'
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(34,211,238,0.08)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card)'
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-sm tracking-wide uppercase" style={{ color: 'var(--text-heading)' }}>Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Insights Blog', 'Careers', 'Press Kit'].map(item => (
                <li key={item}>
                  <Link href="#" style={linkStyle}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#22d3ee'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-footer-link)'}
                    className="hover:underline decoration-[#22d3ee] underline-offset-4 transition-smooth"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-sm tracking-wide uppercase" style={{ color: 'var(--text-heading)' }}>Services</h3>
            <ul className="space-y-3">
              {['Web Dev', 'Mobile Apps', 'SaaS Design', 'Consulting'].map(item => (
                <li key={item}>
                  <Link href="#" style={linkStyle}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#22d3ee'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-footer-link)'}
                    className="hover:underline decoration-[#22d3ee] underline-offset-4 transition-smooth"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display font-bold text-sm tracking-wide uppercase" style={{ color: 'var(--text-heading)' }}>Newsletter</h3>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Subscribe to receive updates on tech trends and frameworks.
            </p>
            {subscribed ? (
              <p className="text-[#22d3ee] font-semibold font-sans text-sm pt-2">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm pt-1">
                <input
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl px-4 py-2 text-sm font-sans outline-none transition-smooth focus:ring-2 focus:ring-[#22d3ee]/30"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-input)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="submit"
                  className="p-3 bg-[#22d3ee] hover:bg-[#0891b2] rounded-xl transition-smooth hover:-translate-y-0.5 flex-shrink-0"
                  style={{ color: 'var(--text-inverse)', boxShadow: '0 0 15px rgba(34,211,238,0.2)' }}
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-sans gap-4"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <p>&copy; {currentYear} Enterprise SaaS. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link
                key={item}
                href="#"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                className="transition-smooth"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
