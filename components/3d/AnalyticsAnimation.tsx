'use client'

import { useRef, useEffect } from 'react'

export default function AnalyticsAnimation() {
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

    // Data points for two line charts
    const pointsCount = 12
    const chart1: { x: number; y: number; targetY: number }[] = []
    const chart2: { x: number; y: number; targetY: number }[] = []

    for (let i = 0; i < pointsCount; i++) {
      chart1.push({
        x: i / (pointsCount - 1),
        y: 0.5 + Math.sin(i * 0.8) * 0.2,
        targetY: 0.5 + Math.sin(i * 0.8) * 0.2
      })
      chart2.push({
        x: i / (pointsCount - 1),
        y: 0.4 + Math.cos(i * 1.1) * 0.15,
        targetY: 0.4 + Math.cos(i * 1.1) * 0.15
      })
    }

    const mouse = { x: -1000, y: -1000, active: false, rx: 0, ry: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x
        mouse.y = y
        mouse.rx = (x / rect.width) * 2 - 1
        mouse.ry = (y / rect.height) * 2 - 1
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

    let rafId: number
    let time = 0

    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark')
      return isDark
        ? {
            bg: '#0f172a',
            grid: 'rgba(255, 255, 255, 0.05)',
            accent1: 'rgba(34, 211, 238, 0.85)', // cyan
            accent1Glow: 'rgba(34, 211, 238, 0.15)',
            accent2: 'rgba(167, 139, 250, 0.85)', // purple/violet
            accent2Glow: 'rgba(167, 139, 250, 0.15)',
            cursorLine: 'rgba(255, 255, 255, 0.15)',
            text: '#94a3b8',
            tooltipBg: 'rgba(15, 23, 42, 0.9)',
            tooltipBorder: 'rgba(255, 255, 255, 0.1)'
          }
        : {
            bg: '#fafafa',
            grid: 'rgba(0, 0, 0, 0.04)',
            accent1: 'rgba(255, 95, 31, 0.85)', // orange
            accent1Glow: 'rgba(255, 95, 31, 0.12)',
            accent2: 'rgba(99, 60, 210, 0.85)', // indigo
            accent2Glow: 'rgba(99, 60, 210, 0.12)',
            cursorLine: 'rgba(0, 0, 0, 0.1)',
            text: '#64748b',
            tooltipBg: 'rgba(255, 255, 255, 0.95)',
            tooltipBorder: 'rgba(0, 0, 0, 0.08)'
          }
    }

    const draw = () => {
      if (!canvas || !ctx) return
      time += 0.02

      const w = canvas.width
      const h = canvas.height
      const colors = getColors()

      ctx.clearRect(0, 0, w, h)

      // Draw grid lines
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      const gridRows = 6
      const gridCols = 8
      
      for (let i = 1; i < gridRows; i++) {
        const y = (i / gridRows) * h
        ctx.beginPath()
        ctx.moveTo(20, y)
        ctx.lineTo(w - 20, y)
        ctx.stroke()
      }
      for (let i = 1; i < gridCols; i++) {
        const x = (i / gridCols) * w
        ctx.beginPath()
        ctx.moveTo(x, 20)
        ctx.lineTo(x, h - 20)
        ctx.stroke()
      }

      // Smooth interaction logic for charts
      const paddingX = 40
      const paddingY = 50
      const graphW = w - paddingX * 2
      const graphH = h - paddingY * 2

      // Draw first chart (Cyan/Orange)
      ctx.beginPath()
      chart1.forEach((pt, i) => {
        // dynamic wave modulation + cursor drag/warp
        let targetY = pt.targetY + Math.sin(time + i * 0.5) * 0.04
        
        if (mouse.active) {
          const ptX = paddingX + pt.x * graphW
          const dist = Math.abs(mouse.x - ptX)
          if (dist < 100) {
            const pull = (100 - dist) / 100
            targetY += mouse.ry * pull * 0.15
          }
        }

        pt.y += (targetY - pt.y) * 0.1
        const cx = paddingX + pt.x * graphW
        const cy = paddingY + (1 - pt.y) * graphH

        if (i === 0) ctx.moveTo(cx, cy)
        else {
          const prevX = paddingX + chart1[i - 1].x * graphW
          const prevY = paddingY + (1 - chart1[i - 1].y) * graphH
          ctx.bezierCurveTo((prevX + cx) / 2, prevY, (prevX + cx) / 2, cy, cx, cy)
        }
      })
      ctx.strokeStyle = colors.accent1
      ctx.lineWidth = 3
      ctx.shadowBlur = 10
      ctx.shadowColor = colors.accent1Glow
      ctx.stroke()
      ctx.shadowBlur = 0 // reset shadow

      // Draw gradient under Chart 1
      ctx.beginPath()
      ctx.moveTo(paddingX, h - paddingY)
      chart1.forEach((pt, i) => {
        const cx = paddingX + pt.x * graphW
        const cy = paddingY + (1 - pt.y) * graphH
        if (i === 0) ctx.lineTo(cx, cy)
        else {
          const prevX = paddingX + chart1[i - 1].x * graphW
          const prevY = paddingY + (1 - chart1[i - 1].y) * graphH
          ctx.bezierCurveTo((prevX + cx) / 2, prevY, (prevX + cx) / 2, cy, cx, cy)
        }
      })
      ctx.lineTo(w - paddingX, h - paddingY)
      ctx.closePath()
      const grad1 = ctx.createLinearGradient(0, paddingY, 0, h - paddingY)
      grad1.addColorStop(0, colors.accent1Glow)
      grad1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad1
      ctx.fill()

      // Draw second chart (Purple/Indigo)
      ctx.beginPath()
      chart2.forEach((pt, i) => {
        let targetY = pt.targetY + Math.cos(time + i * 0.6) * 0.05
        
        if (mouse.active) {
          const ptX = paddingX + pt.x * graphW
          const dist = Math.abs(mouse.x - ptX)
          if (dist < 100) {
            const pull = (100 - dist) / 100
            targetY += mouse.ry * pull * 0.12
          }
        }

        pt.y += (targetY - pt.y) * 0.1
        const cx = paddingX + pt.x * graphW
        const cy = paddingY + (1 - pt.y) * graphH

        if (i === 0) ctx.moveTo(cx, cy)
        else {
          const prevX = paddingX + chart2[i - 1].x * graphW
          const prevY = paddingY + (1 - chart2[i - 1].y) * graphH
          ctx.bezierCurveTo((prevX + cx) / 2, prevY, (prevX + cx) / 2, cy, cx, cy)
        }
      })
      ctx.strokeStyle = colors.accent2
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Draw dots on peaks
      chart1.forEach((pt, i) => {
        if (i % 3 === 0) {
          const cx = paddingX + pt.x * graphW
          const cy = paddingY + (1 - pt.y) * graphH
          ctx.beginPath()
          ctx.arc(cx, cy, 5, 0, Math.PI * 2)
          ctx.fillStyle = colors.accent1
          ctx.fill()
          ctx.strokeStyle = colors.bg
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      })

      // Draw cursor guidelines and tooltip
      if (mouse.active) {
        ctx.strokeStyle = colors.cursorLine
        ctx.lineWidth = 1.5
        ctx.setLineDash([4, 4])
        
        // Vertical projection line
        ctx.beginPath()
        ctx.moveTo(mouse.x, 20)
        ctx.lineTo(mouse.x, h - 20)
        ctx.stroke()

        // Horizontal line
        ctx.beginPath()
        ctx.moveTo(20, mouse.y)
        ctx.lineTo(w - 20, mouse.y)
        ctx.stroke()

        ctx.setLineDash([]) // reset dash

        // Draw coordinate crosshair circle
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = colors.accent1
        ctx.fill()

        // Render dynamic HUD box tooltip
        const toolW = 100
        const toolH = 50
        const tx = Math.max(10, Math.min(w - toolW - 10, mouse.x + 15))
        const ty = Math.max(10, Math.min(h - toolH - 10, mouse.y - 60))

        ctx.fillStyle = colors.tooltipBg
        ctx.strokeStyle = colors.tooltipBorder
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.roundRect(tx, ty, toolW, toolH, 8)
        ctx.fill()
        ctx.stroke()

        // Text values
        ctx.fillStyle = colors.accent1
        ctx.font = 'bold 11px sans-serif'
        ctx.fillText(`VAL: ${Math.round((1 - (mouse.y - paddingY) / graphH) * 100)}%`, tx + 10, ty + 20)
        
        ctx.fillStyle = colors.text
        ctx.font = '10px sans-serif'
        ctx.fillText(`INDEX: ${Math.round((mouse.x - paddingX) / graphW * 100)}`, tx + 10, ty + 38)
      }

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
    <div ref={containerRef} className="w-full h-full relative group cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
