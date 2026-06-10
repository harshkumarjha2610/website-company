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

  return (
    <footer className="bg-primary border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Logo and Description */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-violet rounded-xl flex items-center justify-center shadow-glow-cyan">
                <span className="text-primary font-display font-extrabold text-lg">EP</span>
              </div>
              <span className="text-2xl font-display font-extrabold text-white tracking-wide">Enterprise</span>
            </div>
            <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-sm">
              Transforming modern businesses with cutting-edge software engineering, custom cloud setups, and intelligent digital products.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-secondary/50 text-gray-400 hover:text-white hover:bg-accent/10 hover:border-accent/40 transition-smooth">
                <Github size={20} />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-secondary/50 text-gray-400 hover:text-white hover:bg-accent/10 hover:border-accent/40 transition-smooth">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-secondary/50 text-gray-400 hover:text-white hover:bg-accent/10 hover:border-accent/40 transition-smooth">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-display font-bold text-sm tracking-wide uppercase">Company</h3>
            <ul className="space-y-3 text-sm font-sans text-gray-400">
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">About Us</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">Insights Blog</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">Careers</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">Press Kit</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-display font-bold text-sm tracking-wide uppercase">Services</h3>
            <ul className="space-y-3 text-sm font-sans text-gray-400">
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">Web Dev</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">Mobile Apps</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">SaaS Design</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline decoration-accent underline-offset-4 transition-smooth">Consulting</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white font-display font-bold text-sm tracking-wide uppercase">Newsletter</h3>
            <p className="text-gray-400 font-sans text-sm leading-relaxed">
              Subscribe to receive updates on tech trends and frameworks.
            </p>
            {subscribed ? (
              <p className="text-accent font-semibold font-sans text-sm pt-2">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm pt-1">
                <input
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/40 focus:bg-secondary transition-smooth font-sans text-sm"
                />
                <button
                  type="submit"
                  className="p-3 bg-accent hover:bg-accent-hover text-primary rounded-xl shadow-glow-cyan transition-smooth hover:-translate-y-0.5"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-sans text-gray-400 gap-4">
          <p>&copy; {currentYear} Enterprise SaaS. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-smooth">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-smooth">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-smooth">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

