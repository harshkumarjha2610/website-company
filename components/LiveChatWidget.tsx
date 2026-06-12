'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Initial welcome message — run once on mount
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Hi there! 👋 Welcome to TechFlow Support. How can we help you accelerate your digital product engineering today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }, [])

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const newMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMsg])
    setInputText('')

    // Auto response flow
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      let replyText = "Thank you! An engineering account manager has been notified. We usually reply in under 15 minutes. Would you like to schedule a direct Zoom call with us?"
      
      const lower = text.toLowerCase()
      if (lower.includes('price') || lower.includes('cost')) {
        replyText = "Our product development packages scale based on timelines and size. Most startup MVPs range from $20k - $50k. Shall I open our consultation booker to match your budget?"
      } else if (lower.includes('service') || lower.includes('build') || lower.includes('app')) {
        replyText = "We build custom SaaS, AI integrations, mobile apps, and Cloud infrastructures. I can trigger our meeting scheduler to discuss details with a lead architect. Should I open it?"
      } else if (lower.includes('yes') || lower.includes('schedule') || lower.includes('book')) {
        replyText = "Perfect! Opening the meeting calendar scheduler..."
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('toggle-calendly-modal', { detail: { open: true } }))
          setIsOpen(false)
        }, 1000)
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMsg])
    }, 1500)
  }

  const quickPills = [
    'How much does it cost?',
    'What services do you offer?',
    'Schedule consultation'
  ]

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-tr from-[#ff5f1f] to-purple-600 hover:from-[#ff7f50] hover:to-purple-700 text-white rounded-full flex items-center justify-center shadow-glow transition-transform hover:scale-105 active:scale-95"
        aria-label="Open support chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[380px] h-[500px] rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-[#070A0F]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden text-gray-900 dark:text-white"
          >
            {/* Header */}
            <div className="bg-[#ff5f1f] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-display font-bold">
                  TF
                </div>
                <div>
                  <h4 className="text-sm font-bold">TechFlow Support</h4>
                  <p className="text-[10px] text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                    <span>Solutions expert online</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Conversation Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    msg.sender === 'bot'
                      ? 'bg-[#ff5f1f]/10 text-[#ff5f1f]'
                      : 'bg-purple-600/10 text-purple-500'
                  }`}>
                    {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  
                  <div>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'bot'
                        ? 'bg-gray-150 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none'
                        : 'bg-[#ff5f1f] text-white rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 block px-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-[#ff5f1f]/10 text-[#ff5f1f] flex items-center justify-center text-xs flex-shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-gray-150 dark:bg-white/5 border border-gray-200 dark:border-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick action pills */}
            {messages.length === 1 && !isTyping && (
              <div className="p-3 border-t border-gray-150 dark:border-white/5 bg-gray-50/50 dark:bg-white/2 flex flex-wrap gap-2 justify-center">
                {quickPills.map(pill => (
                  <button
                    key={pill}
                    onClick={() => handleSend(pill)}
                    className="text-[10px] font-bold py-1.5 px-3 rounded-full border border-gray-200 dark:border-white/10 hover:border-[#ff5f1f] bg-white dark:bg-black text-gray-600 dark:text-gray-300 hover:text-[#ff5f1f] transition-all"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 border-t border-gray-150 dark:border-white/5 flex gap-2 items-center bg-white dark:bg-[#070A0F]">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(inputText)}
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#ff5f1f]"
              />
              <button
                onClick={() => handleSend(inputText)}
                className="p-2.5 rounded-xl bg-[#ff5f1f] text-white hover:bg-[#ff7f50] transition-colors"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
