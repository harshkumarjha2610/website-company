'use client'

import { useRef, useEffect } from 'react'

export default function IntegrationsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse control relative to card
    const mouse = { x: 0, y: 0, active: false, targetX: 0, targetY: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.targetX = x
        mouse.targetY = y
        mouse.active = true
      } else {
        mouse.active = false
      }
    }

    const onMouseLeave = () => {
      mouse.active = false
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    // Setup integrations structure: Center hub & Outer nodes
    const outerNodesCount = 6
    const outerNodes: { x: number; y: number; angle: number; label: string; icon: string }[] = []
    
    const labels = ['SaaS', 'API', 'DB', 'Cloud', 'Auth', 'Webhooks']

    // Setup orbiting data packets
    interface Packet {
      nodeIndex: number
      progress: number // 0 to 1
      speed: number
      size: number
    }
    const packets: Packet[] = []

    // Spawn initial packets
    for (let i = 0; i < 12; i++) {
      packets.push({
        nodeIndex: Math.floor(Math.random() * outerNodesCount),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
        size: 3 + Math.random() * 3
      })
    }

    let rafId: number
    let time = 0

    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark')
      return isDark
        ? {
            bg: '#0f172a',
            hub: 'rgba(34, 211, 238, 0.95)', // cyan
            hubGlow: 'rgba(34, 211, 238, 0.35)',
            node: 'rgba(167, 139, 250, 0.85)', // violet
            nodeGlow: 'rgba(167, 139, 250, 0.2)',
            nodeLine: 'rgba(255, 255, 255, 0.05)',
            nodeLineActive: 'rgba(34, 211, 238, 0.25)',
            packet: 'rgba(34, 211, 238, 0.9)',
            text: '#94a3b8'
          }
        : {
            bg: '#fafafa',
            hub: 'rgba(255, 95, 31, 0.95)', // orange
            hubGlow: 'rgba(255, 95, 31, 0.35)',
            node: 'rgba(99, 60, 210, 0.85)', // indigo
            nodeGlow: 'rgba(99, 60, 210, 0.18)',
            nodeLine: 'rgba(0, 0, 0, 0.04)',
            nodeLineActive: 'rgba(255, 95, 31, 0.22)',
            packet: 'rgba(255, 95, 31, 0.9)',
            text: '#64748b'
          }
    }

    const draw = () => {
      if (!canvas || !ctx) return
      time += 0.015

      const w = canvas.width
      const h = canvas.height
      const colors = getColors()

      // Smooth mouse target update
      const startX = mouse.active ? mouse.targetX : w / 2
      const startY = mouse.active ? mouse.targetY : h / 2
      mouse.x += (startX - mouse.x) * 0.1
      mouse.y += (startY - mouse.y) * 0.1

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.35

      // Calculate outer node locations dynamically (incorporating slight floating rotation)
      outerNodes.length = 0
      for (let i = 0; i < outerNodesCount; i++) {
        const angle = (i * Math.PI * 2) / outerNodesCount + time * 0.1
        // Adding elastic tilt based on mouse offset
        const mouseShiftX = (mouse.x - cx) * 0.08
        const mouseShiftY = (mouse.y - cy) * 0.08

        outerNodes.push({
          x: cx + radius * Math.cos(angle) + mouseShiftX,
          y: cy + radius * Math.sin(angle) + mouseShiftY,
          angle: angle,
          label: labels[i],
          icon: ''
        })
      }

      // ── Draw Connection lines/paths ───────────────────────
      outerNodes.forEach((node) => {
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        
        // Bend connection path toward cursor for tactile feedback
        const midX = (cx + node.x) / 2
        const midY = (cy + node.y) / 2
        const dx = mouse.x - midX
        const dy = mouse.y - midY
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        let controlX = midX
        let controlY = midY
        if (dist < 120) {
          const bend = (120 - dist) * 0.25
          controlX += (dx / dist) * bend
          controlY += (dy / dist) * bend
        }

        ctx.quadraticCurveTo(controlX, controlY, node.x, node.y)
        ctx.strokeStyle = mouse.active ? colors.nodeLineActive : colors.nodeLine
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // ── Draw Packets moving along the paths ────────────────
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed
        if (pkt.progress >= 1) {
          pkt.progress = 0
          pkt.nodeIndex = Math.floor(Math.random() * outerNodesCount)
        }

        const node = outerNodes[pkt.nodeIndex]
        if (!node) return

        // Compute coordinate along the quadratic curve
        const midX = (cx + node.x) / 2
        const midY = (cy + node.y) / 2
        const dx = mouse.x - midX
        const dy = mouse.y - midY
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        let controlX = midX
        let controlY = midY
        if (dist < 120) {
          const bend = (120 - dist) * 0.25
          controlX += (dx / dist) * bend
          controlY += (dy / dist) * bend
        }

        // Quadratic bezier equation: B(t) = (1-t)^2*P0 + 2*(1-t)*t*P1 + t^2*P2
        const t = pkt.progress
        const px = (1 - t) * (1 - t) * cx + 2 * (1 - t) * t * controlX + t * t * node.x
        const py = (1 - t) * (1 - t) * cy + 2 * (1 - t) * t * controlY + t * t * node.y

        ctx.beginPath()
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2)
        ctx.fillStyle = colors.packet
        
        // Add glowing trail effect
        ctx.save()
        ctx.shadowBlur = 10
        ctx.shadowColor = colors.packet
        ctx.fill()
        ctx.restore()
      })

      // ── Draw Outer Nodes ──────────────────────────────────
      outerNodes.forEach((node) => {
        // Outer dot boundary
        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = colors.nodeGlow
        ctx.fillStyle = colors.nodeGlow
        ctx.beginPath()
        ctx.arc(node.x, node.y, 16, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Crisp inner circle
        ctx.fillStyle = colors.node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 7, 0, Math.PI * 2)
        ctx.fill()

        // Label text below node
        ctx.fillStyle = colors.text
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(node.label, node.x, node.y + 28)
      })

      // ── Draw Center API Hub ──────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, 22, 0, Math.PI * 2)
      ctx.fillStyle = colors.hub
      ctx.shadowBlur = 18
      ctx.shadowColor = colors.hubGlow
      ctx.fill()

      // Inner white glow circle
      ctx.beginPath()
      ctx.arc(cx, cy, 10, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.restore()

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
