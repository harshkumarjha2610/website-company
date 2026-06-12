'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Sparkles, Send, BrainCircuit } from 'lucide-react'

interface PresetQ {
  q: string
  a: string
}

export default function AIAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([])
  const [inputText, setInputText] = useState('')
  const [generating, setGenerating] = useState(false)
  const drawerEndRef = useRef<HTMLDivElement>(null)

  const presets: PresetQ[] = [
    {
      q: 'What is NeuralFlow?',
      a: 'NeuralFlow is TechFlow’s high-throughput LLM orchestration engine. It balances prompts across Vercel AI, OpenAI, and Anthropic backends, integrating semantic caching to save 40% on API costs while keeping response latency sub-second.'
    },
    {
      q: 'How do you handle corporate IP?',
      a: 'All our partnerships are covered by strict mutual NDAs. Codebases are entirely owned by you, deployed inside isolated cloud partitions (AWS/Azure), and customer data is strictly excluded from LLM public training sets.'
    },
    {
      q: 'What services do you offer?',
      a: 'We specialize in custom enterprise software, production-grade AI applications, custom SaaS systems, real-time analytics panels, vector database clustering, and full digital transformation consulting.'
    }
  ]

  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: 'Welcome to the TechFlow AI hub! 🧠 I can answer queries regarding our platforms, security compliance, architecture, or scheduling options. What would you like to know?'
      }
    ])
  }, []) // Run only once on mount — no dependency on messages to avoid infinite loop

  useEffect(() => {
    drawerEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, generating])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    setMessages(prev => [...prev, { sender: 'user', text }])
    setInputText('')
    setGenerating(true)

    // Match query or provide general answer
    setTimeout(() => {
      setGenerating(false)
      let matched = presets.find(p => text.toLowerCase().includes(p.q.toLowerCase()) || p.q.toLowerCase().includes(text.toLowerCase()))
      let reply = matched 
        ? matched.a 
        : 'TechFlow engineers world-class custom SaaS, AI models, and cloud systems. For specific details or customized pricing, I suggest scheduling a direct consultation call with our team. Type "consultation" or use the Booker below.'

      if (text.toLowerCase().includes('consult') || text.toLowerCase().includes('schedule') || text.toLowerCase().includes('book')) {
        reply = 'Opening the Consultation scheduler modal now...'
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('toggle-calendly-modal', { detail: { open: true } }))
          setIsOpen(false)
        }, 1000)
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }])
    }, 1500)
  }

  return (
    <>
      {/* Ask AI Toggle (bottom left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full shadow-glow transition-transform hover:scale-105 active:scale-95"
      >
        <Sparkles size={16} className="animate-pulse" />
        <span className="text-xs font-bold font-sans">Ask AI Engine</span>
      </button>

      {/* Slide-out Left Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 bottom-0 left-0 w-full max-w-md bg-white dark:bg-[#070A0F] border-r border-gray-200 dark:border-white/10 shadow-2xl flex flex-col z-10 text-gray-900 dark:text-white"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-600/10 text-purple-500">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-extrabold">TechFlow Cognitive AI</h4>
                    <p className="text-[10px] text-gray-500">Instant developer insights & documentation</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      msg.sender === 'ai' ? 'bg-purple-600/10 text-purple-500' : 'bg-gray-100 dark:bg-white/5'
                    }`}>
                      {msg.sender === 'ai' ? <Bot size={14} /> : 'U'}
                    </div>

                    <div>
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'ai'
                          ? 'bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none'
                          : 'bg-purple-600 text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}

                {generating && (
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full bg-purple-600/10 text-purple-500 flex items-center justify-center text-xs flex-shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-xs text-gray-400">
                      <Sparkles size={12} className="animate-spin text-purple-500" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={drawerEndRef} />
              </div>

              {/* Presets suggestions */}
              {!generating && (
                <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/2 space-y-2 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Common Questions</p>
                  <div className="flex flex-col gap-2">
                    {presets.map(item => (
                      <button
                        key={item.q}
                        onClick={() => handleSend(item.q)}
                        className="text-xs text-left p-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-purple-500/40 bg-white dark:bg-black/40 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#070A0F] flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(inputText)}
                  className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => handleSend(inputText)}
                  className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
