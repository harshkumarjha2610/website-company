'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Briefcase, Phone, Globe, Shield, Smartphone, Chrome, Github, Linkedin } from 'lucide-react'

// Simple mock country list
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
]

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(true)
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'magic' | 'otp'>('signup')
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Sign Up form fields
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('US')
  const [industry, setIndustry] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Login form fields
  const [rememberMe, setRememberMe] = useState(false)
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', ''])

  // Device recognition info mock
  const deviceInfo = { os: 'Windows 11', browser: 'Chrome', ip: '192.168.1.45' }

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsOpen(customEvent.detail?.open ?? !isOpen)
      if (customEvent.detail?.mode) {
        setMode(customEvent.detail.mode)
      }
    }
    window.addEventListener('toggle-auth-modal', handleToggle)
    return () => window.removeEventListener('toggle-auth-modal', handleToggle)
  }, [isOpen])

  // Auto focus email field when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        emailInputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, mode])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Move to OTP verification for mock flow
    if (mode === 'signup' || mode === 'login') {
      setMode('otp')
    } else if (mode === 'otp') {
      alert('Mock authentication successful!')
      setIsOpen(false)
    }
  }

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return
    const newOtp = [...otpCode]
    newOtp[index] = val.substring(val.length - 1)
    setOtpCode(newOtp)

    // Focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Background Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#070A0F]/85 backdrop-blur-2xl shadow-2xl p-8 md:p-10 z-10 text-white scrollbar-thin"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-smooth text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff5f1f] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <span className="font-display font-extrabold text-xl">TF</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Password'}
              {mode === 'magic' && 'Passwordless Login'}
              {mode === 'otp' && 'Two-Factor Verification'}
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {mode === 'login' && 'Sign in to access your enterprise platforms.'}
              {mode === 'signup' && 'Get started with our state-of-the-art SaaS platform.'}
              {mode === 'forgot' && 'Enter your business email to get verification links.'}
              {mode === 'magic' && 'Enter your email to receive a passwordless sign-in link.'}
              {mode === 'otp' && 'Enter the 6-digit code sent to your device.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'login' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      required
                      ref={emailInputRef}
                      type="email"
                      id="login-email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs text-[#ff5f1f] hover:underline font-medium">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      required
                      type="password"
                      id="login-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/10 bg-white/5 text-[#ff5f1f] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <span>Remember this device</span>
                  </label>
                  <button type="button" onClick={() => setMode('magic')} className="text-xs text-[#ff5f1f] hover:underline font-medium">Use Magic Link</button>
                </div>
              </>
            )}

            {mode === 'signup' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="text"
                        id="signup-name"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-company" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Company Name</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="text"
                        id="signup-company"
                        placeholder="Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        ref={emailInputRef}
                        type="email"
                        id="signup-email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="tel"
                        id="signup-phone"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-country" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <select
                        id="signup-country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#0b1220] border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20 cursor-pointer appearance-none"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-industry" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Industry</label>
                    <select
                      id="signup-industry"
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-[#0b1220] border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 px-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20 cursor-pointer"
                    >
                      <option value="">Select Industry</option>
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-team" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Team Size</label>
                    <select
                      id="signup-team"
                      required
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-[#0b1220] border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 px-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20 cursor-pointer"
                    >
                      <option value="">Select Team Size</option>
                      <option value="1-10">1 - 10</option>
                      <option value="11-50">11 - 50</option>
                      <option value="51-200">51 - 200</option>
                      <option value="201-500">201 - 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="password"
                        id="signup-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-confirm" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="password"
                        id="signup-confirm"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-gray-300 cursor-pointer pt-1">
                  <input
                    required
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="rounded border-white/10 bg-white/5 text-[#ff5f1f] focus:ring-0 w-4 h-4 cursor-pointer mt-0.5"
                  />
                  <span>I agree to the Terms of Service and Privacy Policy, and consent to NDA compliance.</span>
                </label>
              </>
            )}

            {mode === 'forgot' && (
              <div className="space-y-2">
                <label htmlFor="forgot-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    required
                    ref={emailInputRef}
                    type="email"
                    id="forgot-email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                  />
                </div>
              </div>
            )}

            {mode === 'magic' && (
              <div className="space-y-2">
                <label htmlFor="magic-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    required
                    ref={emailInputRef}
                    type="email"
                    id="magic-email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-smooth focus:ring-4 focus:ring-[#ff5f1f]/20"
                  />
                </div>
              </div>
            )}

            {mode === 'otp' && (
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  {otpCode.map((digit, i) => (
                    <input
                      key={i}
                      required
                      type="text"
                      maxLength={1}
                      id={`otp-${i}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 bg-white/5 border border-white/10 focus:border-[#ff5f1f] rounded-xl text-center text-xl font-bold font-display outline-none focus:ring-4 focus:ring-[#ff5f1f]/20"
                    />
                  ))}
                </div>
                <div className="text-center text-xs text-gray-400 pt-2 flex items-center justify-center gap-2">
                  <Smartphone size={14} />
                  <span>Resend code in 45s</span>
                  <button type="button" className="text-[#ff5f1f] hover:underline font-bold">Resend</button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ff5f1f] hover:bg-[#ff7f50] text-white font-bold py-4 rounded-2xl transition-smooth shadow-glow hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <span>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Free Account'}
                {mode === 'forgot' && 'Send Reset Link'}
                {mode === 'magic' && 'Send Magic Link'}
                {mode === 'otp' && 'Verify & Access'}
              </span>
            </button>
          </form>

          {/* OAuth & Socials (Only on login/signup/magic) */}
          {(mode === 'login' || mode === 'signup' || mode === 'magic') && (
            <>
              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <span className="relative bg-[#070A0F] px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Or Continue With</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => { alert('OAuth Google Clicked'); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-smooth font-medium text-xs"
                >
                  <Chrome size={16} className="text-[#ff7f50]" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => { alert('OAuth Github Clicked'); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-smooth font-medium text-xs"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  onClick={() => { alert('OAuth LinkedIn Clicked'); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-smooth font-medium text-xs"
                >
                  <Linkedin size={16} className="text-blue-500" />
                  <span>LinkedIn</span>
                </button>
                <button
                  type="button"
                  onClick={() => { alert('OAuth Microsoft Clicked'); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-smooth font-medium text-xs"
                >
                  <Globe size={16} className="text-yellow-500" />
                  <span>Microsoft</span>
                </button>
              </div>
            </>
          )}

          {/* Footer switcher */}
          <div className="mt-8 text-center text-sm text-gray-400">
            {mode === 'login' && (
              <p>Don&apos;t have an account? <button onClick={() => setMode('signup')} className="text-[#ff5f1f] hover:underline font-bold">Sign Up</button></p>
            )}
            {mode === 'signup' && (
              <p>Already have an account? <button onClick={() => setMode('login')} className="text-[#ff5f1f] hover:underline font-bold">Sign In</button></p>
            )}
            {mode === 'forgot' && (
              <button onClick={() => setMode('login')} className="text-[#ff5f1f] hover:underline font-bold">Back to Login</button>
            )}
            {mode === 'magic' && (
              <button onClick={() => setMode('login')} className="text-[#ff5f1f] hover:underline font-bold">Back to Login</button>
            )}
            {mode === 'otp' && (
              <button onClick={() => setMode('login')} className="text-[#ff5f1f] hover:underline font-bold">Back to Login</button>
            )}
          </div>

          {/* Security Device recognition footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-500 font-sans font-medium">
            <span className="flex items-center gap-1">
              <Shield size={12} className="text-[#ff5f1f]" />
              <span>SOC2 Type II Protected &bull; SSL Encrypted</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <span>Recognized Device: {deviceInfo.os} - {deviceInfo.browser} ({deviceInfo.ip})</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
