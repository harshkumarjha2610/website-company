'use client'

import { useRef, useEffect } from 'react'

export default function SecurityAnimation() {
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

    // Mouse coordinates relative to card
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

    const rings = [
      { radius: 40, speed: 0.015, angle: 0, direction: 1 },
      { radius: 65, speed: 0.01, angle: Math.PI / 4, direction: -1 },
      { radius: 90, speed: 0.007, angle: Math.PI / 2, direction: 1 }
    ]

    // Hexagonal node grid system
    const hexSize = 22
    const hexWidth = Math.sqrt(3) * hexSize

    // Helper to calculate hex points
    const getHexPoints = (cx: number, cy: number, size: number) => {
      const pts = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        pts.push([cx + size * Math.cos(angle), cy + size * Math.sin(angle)])
      }
      return pts
    }

    let rafId: number
    let time = 0

    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark')
      return isDark
        ? {
            bg: '#0f172a',
            hexLine: 'rgba(255, 255, 255, 0.035)',
            hexActive: 'rgba(167, 139, 250, 0.25)', // violet/purple glow
            ringPrimary: 'rgba(34, 211, 238, 0.75)', // cyan
            ringSecondary: 'rgba(167, 139, 250, 0.6)', // violet
            core: 'rgba(34, 211, 238, 0.9)',
            coreGlow: 'rgba(34, 211, 238, 0.35)'
          }
        : {
            bg: '#fafafa',
            hexLine: 'rgba(0, 0, 0, 0.03)',
            hexActive: 'rgba(99, 60, 210, 0.18)', // indigo/purple glow
            ringPrimary: 'rgba(255, 95, 31, 0.75)', // orange
            ringSecondary: 'rgba(99, 60, 210, 0.6)', // indigo
            core: 'rgba(255, 95, 31, 0.9)',
            coreGlow: 'rgba(255, 95, 31, 0.3)'
          }
    }

    const draw = () => {
      if (!canvas || !ctx) return
      time += 0.02

      const w = canvas.width
      const h = canvas.height
      const colors = getColors()

      // Smooth mouse movement interpolation
      const startX = mouse.active ? mouse.targetX : w / 2
      const startY = mouse.active ? mouse.targetY : h / 2
      mouse.x += (startX - mouse.x) * 0.1
      mouse.y += (startY - mouse.y) * 0.1

      ctx.clearRect(0, 0, w, h)

      // Hexagonal grid drawing
      const cols = Math.ceil(w / hexWidth) + 1
      const rows = Math.ceil(h / (hexSize * 1.5)) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let cx = c * hexWidth
          if (r % 2 !== 0) cx += hexWidth / 2
          const cy = r * hexSize * 1.5

          // Check proximity to mouse
          const dx = mouse.x - cx
          const dy = mouse.y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          let hexGlow = 0
          if (dist < 100) {
            hexGlow = (1 - dist / 100) * 0.9
          }

          // Draw hexagon outline
          const pts = getHexPoints(cx, cy, hexSize - 1)
          ctx.beginPath()
          pts.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt[0], pt[1])
            else ctx.lineTo(pt[0], pt[1])
          })
          ctx.closePath()

          if (hexGlow > 0) {
            ctx.fillStyle = colors.hexActive.replace(/0\.\d+\)/, `${hexGlow * 0.25})`)
            ctx.fill()
            ctx.strokeStyle = colors.hexActive.replace(/0\.\d+\)/, `${hexGlow * 0.4})`)
          } else {
            ctx.strokeStyle = colors.hexLine
          }
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Draw futuristic orbital system at the center
      const centerX = w / 2
      const centerY = h / 2

      // Tilt core based on mouse offset from center
      const offsetX = (mouse.x - centerX) * 0.15
      const offsetY = (mouse.y - centerY) * 0.15

      rings.forEach((ring, idx) => {
        ring.angle += ring.speed * ring.direction

        ctx.save()
        ctx.translate(centerX + offsetX * (idx + 1) * 0.5, centerY + offsetY * (idx + 1) * 0.5)
        
        // Draw orbital ring
        ctx.beginPath()
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = idx % 2 === 0 ? colors.ringPrimary : colors.ringSecondary
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Draw node orbiting on ring
        const nodeX = ring.radius * Math.cos(ring.angle)
        const nodeY = ring.radius * Math.sin(ring.angle)

        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 4.5, 0, Math.PI * 2)
        ctx.fillStyle = idx % 2 === 0 ? colors.ringPrimary : colors.ringSecondary
        
        // Outer glow
        ctx.shadowBlur = 10
        ctx.shadowColor = idx % 2 === 0 ? colors.ringPrimary : colors.ringSecondary
        ctx.fill()
        ctx.restore()
      })

      // Central Shield/Security Core (Glowing Circle)
      ctx.save()
      ctx.translate(centerX + offsetX * 0.3, centerY + offsetY * 0.3)
      ctx.beginPath()
      ctx.arc(0, 0, 18, 0, Math.PI * 2)
      ctx.fillStyle = colors.core
      ctx.shadowBlur = 18
      ctx.shadowColor = colors.coreGlow
      ctx.fill()

      // Inner Core Accent
      ctx.beginPath()
      ctx.arc(0, 0, 8, 0, Math.PI * 2)
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
    <div ref={containerRef} className="w-full h-full relative group overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
