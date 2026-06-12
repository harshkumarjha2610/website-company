'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Globe, ChevronDown, Sparkles, Cpu, Database, TrendingUp, Users, ArrowRight, BookOpen, Briefcase, HelpCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<'platforms' | 'solutions' | 'resources' | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState({ code: 'EN', name: 'English', flag: '🇺🇸' })
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  
  const [mobileAccordions, setMobileAccordions] = useState({
    platforms: false,
    solutions: false,
    resources: false,
  })

  const searchInputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Track scrolling for sticky header style transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isSearchOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const triggerAuthModal = (mode: 'login' | 'signup') => {
    const event = new CustomEvent('toggle-auth-modal', {
      detail: { open: true, mode }
    })
    window.dispatchEvent(event)
    setIsOpen(false)
  }

  const toggleMobileAccordion = (key: 'platforms' | 'solutions' | 'resources') => {
    setMobileAccordions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'JA', name: '日本語', flag: '🇯🇵' },
  ]

  const mockSuggestions = [
    { title: 'NeuralFlow AI Engine', category: 'Platforms', link: '#services' },
    { title: 'Predictive Analytics IQ', category: 'Analytics', link: '#services' },
    { title: 'Financial Fraud Detection', category: 'Solutions', link: '#saas' },
    { title: 'Enterprise Cloud Transformation', category: 'Consulting', link: '#projects' },
    { title: 'SOC-2 Compliance Security Suite', category: 'Platforms', link: '#saas' }
  ]

  const filteredSuggestions = searchQuery
    ? mockSuggestions.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockSuggestions;

  return (
    <>
      <nav
        ref={menuRef}
        className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md border-gray-200/50 dark:border-white/10'
            : 'py-5 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff5f1f] to-purple-600 rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-smooth">
                  <span className="text-white font-display font-extrabold text-lg">TF</span>
                </div>
                <span className="text-2xl font-display font-extrabold tracking-wide bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:opacity-95 transition-opacity">
                  TechFlow
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 font-sans font-medium text-[14px]">
              
              {/* AI Platforms Dropdown Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('platforms')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className={`flex items-center gap-1.5 py-2 hover:text-[#ff5f1f] transition-colors ${
                    activeMenu === 'platforms' ? 'text-[#ff5f1f]' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span>AI Platforms</span>
                  <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeMenu === 'platforms' ? 'rotate-180' : ''}`} />
                </button>

                {/* Platforms Mega Menu */}
                <AnimatePresence>
                  {activeMenu === 'platforms' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-[580px] rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-[#070A0F]/95 backdrop-blur-xl shadow-2xl p-6 grid grid-cols-2 gap-6 z-50 text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                          <Cpu size={12} className="text-[#ff5f1f]" />
                          <span>Core AI Suite</span>
                        </h4>
                        <div className="space-y-4">
                          <Link href="#services" className="group block">
                            <h5 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#ff5f1f] transition-colors">NeuralFlow Engine</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">High-speed large language model orchestration.</p>
                          </Link>
                          <Link href="#services" className="group block">
                            <h5 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#ff5f1f] transition-colors">CognitiveEngine</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Advanced decision frameworks and task auto-agents.</p>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                          <Database size={12} className="text-purple-500" />
                          <span>Data & Middleware</span>
                        </h4>
                        <div className="space-y-4">
                          <Link href="#saas" className="group block">
                            <h5 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">AnalyticsIQ Panel</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Real-time enterprise metrics & predictions dashboard.</p>
                          </Link>
                          <Link href="#saas" className="group block">
                            <h5 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">DevLink Gateway</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Developer APIs and secure system connectivity.</p>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('solutions')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className={`flex items-center gap-1.5 py-2 hover:text-[#ff5f1f] transition-colors ${
                    activeMenu === 'solutions' ? 'text-[#ff5f1f]' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeMenu === 'solutions' ? 'rotate-180' : ''}`} />
                </button>

                {/* Solutions Mega Menu */}
                <AnimatePresence>
                  {activeMenu === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-[#070A0F]/95 backdrop-blur-xl shadow-2xl p-6 grid grid-cols-2 gap-6 z-50 text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                          <TrendingUp size={12} className="text-[#ff5f1f]" />
                          <span>By Industry</span>
                        </h4>
                        <div className="space-y-3">
                          <Link href="#projects" className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-[#ff5f1f]">Financial Systems & Crypto</span>
                          </Link>
                          <Link href="#projects" className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-[#ff5f1f]">Healthcare Compliance</span>
                          </Link>
                          <Link href="#projects" className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-[#ff5f1f]">E-Commerce & Delivery Hubs</span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                          <Users size={12} className="text-blue-500" />
                          <span>By Use Case</span>
                        </h4>
                        <div className="space-y-3">
                          <Link href="#saas" className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-500">Autonomous Customer Chatbots</span>
                          </Link>
                          <Link href="#saas" className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-500">Predictive Cloud Maintenance</span>
                          </Link>
                          <Link href="#saas" className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-500">High-Security Threat Detection</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('resources')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className={`flex items-center gap-1.5 py-2 hover:text-[#ff5f1f] transition-colors ${
                    activeMenu === 'resources' ? 'text-[#ff5f1f]' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeMenu === 'resources' ? 'rotate-180' : ''}`} />
                </button>

                {/* Resources Dropdown */}
                <AnimatePresence>
                  {activeMenu === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#070A0F] shadow-xl p-3 space-y-1 z-50 text-left"
                    >
                      <Link href="#services" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-[#ff5f1f]">
                        <BookOpen size={14} />
                        <span>Documentation</span>
                      </Link>
                      <Link href="#projects" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-[#ff5f1f]">
                        <Briefcase size={14} />
                        <span>Company Careers</span>
                      </Link>
                      <Link href="#contact" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-[#ff5f1f]">
                        <HelpCircle size={14} />
                        <span>Help Center</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Standard Links */}
              <Link href="#projects" className="nav-link">Customers</Link>
              <Link href="#contact" className="nav-link">Contact</Link>
            </div>

            {/* Actions Bar (Search, Language, Theme, Auth Buttons) */}
            <div className="hidden md:flex items-center gap-4">
              
              {/* Search Trigger Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#ff5f1f] hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                aria-label="Search site"
              >
                <Search size={18} />
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#ff5f1f] hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                  aria-label="Select language"
                >
                  <Globe size={18} />
                  <span className="text-[12px] font-bold">{activeLang.code}</span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 mt-1 w-36 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#070A0F] shadow-xl p-2 z-50 flex flex-col gap-0.5"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setActiveLang(lang)
                              setIsLangOpen(false)
                            }}
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${
                              activeLang.code === lang.code ? 'text-[#ff5f1f] bg-gray-50 dark:bg-white/5' : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <ThemeToggle />

              {/* Authentication Actions */}
              <button 
                onClick={() => triggerAuthModal('login')}
                className="text-gray-700 dark:text-gray-300 hover:text-[#ff5f1f] font-semibold text-[14px] px-3 py-1.5 transition-colors"
              >
                Sign In
              </button>
              
              <button
                onClick={() => triggerAuthModal('signup')}
                className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 hover:from-[#ff7f50] hover:to-purple-700 text-white px-5 py-2 rounded-xl font-bold transition-smooth hover:scale-[1.03] text-[14px] shadow-glow"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Actions: hamburger + toggle */}
            <div className="flex md:hidden items-center gap-3">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
              >
                <Search size={20} />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl transition-smooth text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                aria-label="Toggle mobile menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200/50 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 text-left font-semibold text-[15px]">
                
                {/* Mobile Platforms Accordion */}
                <div className="border-b border-gray-200/50 dark:border-white/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('platforms')}
                    className="flex justify-between items-center w-full py-2 text-gray-800 dark:text-gray-200"
                  >
                    <span>AI Platforms</span>
                    <ChevronDown size={16} className={`transform transition-transform ${mobileAccordions.platforms ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccordions.platforms && (
                    <div className="pl-4 mt-2 space-y-2.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Link href="#services" onClick={() => setIsOpen(false)} className="block py-1">NeuralFlow Engine</Link>
                      <Link href="#services" onClick={() => setIsOpen(false)} className="block py-1">CognitiveEngine</Link>
                      <Link href="#saas" onClick={() => setIsOpen(false)} className="block py-1">AnalyticsIQ Panel</Link>
                      <Link href="#saas" onClick={() => setIsOpen(false)} className="block py-1">DevLink Gateway</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Solutions Accordion */}
                <div className="border-b border-gray-200/50 dark:border-white/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('solutions')}
                    className="flex justify-between items-center w-full py-2 text-gray-800 dark:text-gray-200"
                  >
                    <span>Solutions</span>
                    <ChevronDown size={16} className={`transform transition-transform ${mobileAccordions.solutions ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccordions.solutions && (
                    <div className="pl-4 mt-2 space-y-2.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Link href="#projects" onClick={() => setIsOpen(false)} className="block py-1">Financial & Crypto</Link>
                      <Link href="#projects" onClick={() => setIsOpen(false)} className="block py-1">Healthcare Compliance</Link>
                      <Link href="#projects" onClick={() => setIsOpen(false)} className="block py-1">E-Commerce Platforms</Link>
                      <Link href="#saas" onClick={() => setIsOpen(false)} className="block py-1">Autonomous Support AI</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Resources Accordion */}
                <div className="border-b border-gray-200/50 dark:border-white/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('resources')}
                    className="flex justify-between items-center w-full py-2 text-gray-800 dark:text-gray-200"
                  >
                    <span>Resources</span>
                    <ChevronDown size={16} className={`transform transition-transform ${mobileAccordions.resources ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccordions.resources && (
                    <div className="pl-4 mt-2 space-y-2.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Link href="#services" onClick={() => setIsOpen(false)} className="block py-1">Documentation</Link>
                      <Link href="#projects" onClick={() => setIsOpen(false)} className="block py-1">Careers</Link>
                      <Link href="#contact" onClick={() => setIsOpen(false)} className="block py-1">Help Center</Link>
                    </div>
                  )}
                </div>

                <Link href="#projects" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 dark:text-gray-200 border-b border-gray-200/50 dark:border-white/10">Customers</Link>
                <Link href="#contact" onClick={() => setIsOpen(false)} className="block py-2 text-gray-800 dark:text-gray-200">Contact</Link>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={() => triggerAuthModal('login')}
                    className="w-full text-center py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 font-semibold"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => triggerAuthModal('signup')}
                    className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#ff5f1f] to-purple-600 text-white font-bold"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Interactive Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-[#070A0F]/95 backdrop-blur-2xl shadow-2xl p-5 overflow-hidden z-10 text-gray-900 dark:text-white"
            >
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-4">
                <Search className="text-gray-400" size={20} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search platforms, solutions, documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-md border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-400 bg-gray-50 dark:bg-white/5"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions/Results */}
              <div className="mt-4 max-h-[350px] overflow-y-auto space-y-3 pr-1.5 scrollbar-thin">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {searchQuery ? 'Search Results' : 'Trending Searches'}
                </h5>
                
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.link}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles size={16} className="text-[#ff5f1f] opacity-80 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.title}</p>
                          <p className="text-[11px] text-gray-400">{item.category}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all text-[#ff5f1f]" />
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  )
}

