'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Terminal, Cloud, Database, BrainCircuit, Globe, Layers, Shield } from 'lucide-react'

interface TechNode {
  name: string
  icon: React.ReactNode
  description: string
  x: number
  y: number
  z: number
}

const initialTechs = [
  { name: 'React', icon: <Globe className="text-cyan-400" size={16} />, description: 'Frontend UI library' },
  { name: 'Next.js', icon: <Layers className="text-white dark:text-black bg-black dark:bg-white rounded p-0.5" size={16} />, description: 'Production React framework' },
  { name: 'Node.js', icon: <Terminal className="text-green-500" size={16} />, description: 'JS runtime for server backend' },
  { name: 'Python', icon: <BrainCircuit className="text-yellow-400" size={16} />, description: 'AI, machine learning & scripting' },
  { name: 'AWS', icon: <Cloud className="text-orange-400" size={16} />, description: 'Cloud computing platform' },
  { name: 'Docker', icon: <Layers className="text-blue-400" size={16} />, description: 'Containerization engine' },
  { name: 'Kubernetes', icon: <Shield className="text-blue-600" size={16} />, description: 'Container orchestration' },
  { name: 'OpenAI', icon: <Cpu className="text-emerald-500" size={16} />, description: 'Generative AI LLM engine' },
  { name: 'PostgreSQL', icon: <Database className="text-[#336791]" size={16} />, description: 'Relational database systems' },
  { name: 'TypeScript', icon: <CodeIcon className="text-blue-500" size={16} />, description: 'Typed Javascript' }
]

function CodeIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={className} height={size} width={size}>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  )
}

export default function TechnologySphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<TechNode[]>([])
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Initialize sphere nodes using Fibonacci distribution
  useEffect(() => {
    const radius = 130
    const count = initialTechs.length
    const tempNodes: TechNode[] = []

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      tempNodes.push({
        ...initialTechs[i],
        x,
        y,
        z
      })
    }
    setNodes(tempNodes)
  }, [])

  // Rotate nodes on cursor move or timer ticks
  useEffect(() => {
    if (hoveredNode) return // Pause on hover

    const interval = setInterval(() => {
      // Base rotation speeds modified by mouse hover position
      const speedX = 0.005 + mousePos.y * 0.0001
      const speedY = 0.005 + mousePos.x * 0.0001

      setNodes(prevNodes =>
        prevNodes.map(node => {
          // Rotate X
          const cosX = Math.cos(speedX)
          const sinX = Math.sin(speedX)
          const y1 = node.y * cosX - node.z * sinX
          const z1 = node.y * sinX + node.z * cosX

          // Rotate Y
          const cosY = Math.cos(speedY)
          const sinY = Math.sin(speedY)
          const x2 = node.x * cosY + z1 * sinY
          const z2 = -node.x * sinY + z1 * cosY

          return { ...node, x: x2, y: y1, z: z2 }
        })
      )
    }, 16)

    return () => clearInterval(interval)
  }, [hoveredNode, mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setMousePos({
      x: e.clientX - cx,
      y: e.clientY - cy
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setHoveredNode(null)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-80 h-80 flex items-center justify-center cursor-pointer select-none"
    >
      {/* Visual center node core */}
      <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#ff5f1f]/20 to-purple-600/20 border border-[#ff5f1f]/30 flex items-center justify-center backdrop-blur-md z-0 shadow-glow">
        <span className="text-[11px] font-bold tracking-widest text-[#ff5f1f] uppercase animate-pulse">Core Stack</span>
      </div>

      {/* Sphere Orbit Rings */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-gray-400/10 dark:border-white/5 animate-[spin_40s_linear_infinite]" />
      <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-gray-400/10 dark:border-white/5 animate-[spin_20s_linear_infinite_reverse]" />

      {/* Nodes mapping */}
      {nodes.map((node, index) => {
        // Perspective projection: scale & z-depth mapping
        const depth = 250
        const scale = depth / (depth + node.z)
        const x2d = node.x * scale
        const y2d = node.y * scale
        const zIndex = Math.round((depth - node.z) * 10)
        
        // Dynamic opacity based on z-depth
        const opacity = (250 - node.z) / 300

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x2d}px - 2rem)`,
              top: `calc(50% + ${y2d}px - 2rem)`,
              transform: `scale(${scale})`,
              zIndex: zIndex,
              opacity: opacity
            }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            className="transition-shadow duration-300"
          >
            <motion.div
              layout
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-md backdrop-blur-md cursor-pointer ${
                hoveredNode?.name === node.name
                  ? 'border-[#ff5f1f] bg-[#ff5f1f]/10 dark:bg-[#ff5f1f]/20 shadow-[0_0_15px_rgba(255,95,31,0.4)] scale-110'
                  : 'border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/60 hover:border-gray-400 dark:hover:border-white/30'
              }`}
            >
              <span>{node.icon}</span>
              <span className="text-[10px] font-bold text-gray-700 dark:text-gray-200">{node.name}</span>
            </motion.div>
          </div>
        )
      })}

      {/* Floating Info Overlay for hovered node */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-[-60px] w-64 p-3 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-xl text-center z-50 pointer-events-none"
          >
            <h5 className="text-xs font-bold text-gray-800 dark:text-white flex items-center justify-center gap-1.5">
              {hoveredNode.icon}
              <span>{hoveredNode.name}</span>
            </h5>
            <p className="text-[10px] text-gray-500 mt-1">{hoveredNode.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
