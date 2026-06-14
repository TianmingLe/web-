import { useRef, useEffect } from 'react'
import { prefersReducedMotion } from '@utils/reducedMotionCheck'

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  connections: number[]
  pulsePhase: number
  pulseSpeed: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const frameCountRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = prefersReducedMotion()
    const isMobile = window.innerWidth < 768
    const nodeCount = reduced ? 12 : isMobile ? 20 : 35

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const initNodes = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      nodesRef.current = Array.from({ length: nodeCount }, () => {
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.5,
        }
      })
    }
    initNodes()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      frameCountRef.current++
      timeRef.current += 0.016
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const mouse = mouseRef.current
      const forceRadius = 150
      const forceStrength = reduced ? 0 : 0.6

      const nodes = nodesRef.current

      // Update nodes
      nodes.forEach((node) => {
        // Gentle drift
        node.x += node.vx
        node.y += node.vy

        // Boundary wrap (soft)
        if (node.x < -50) node.x = w + 50
        if (node.x > w + 50) node.x = -50
        if (node.y < -50) node.y = h + 50
        if (node.y > h + 50) node.y = -50

        // Mouse repulsion
        if (!reduced) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < forceRadius && dist > 0) {
            const force = ((forceRadius - dist) / forceRadius) * forceStrength
            node.vx += (dx / dist) * force * 0.015
            node.vy += (dy / dist) * force * 0.015
          }
        }

        // Damping
        node.vx *= 0.995
        node.vy *= 0.995

        // Gentle return to base drift
        const returnForce = 0.0003
        node.vx += (node.baseX - node.x) * returnForce * 0.1
        node.vy += (node.baseY - node.y) * returnForce * 0.1
      })

      // Draw connections (circuit traces)
      if (!reduced) {
        const connectDistance = 180
        const maxConnections = 2

        nodes.forEach((n1, i) => {
          let connections = 0
          for (let j = i + 1; j < nodes.length; j++) {
            if (connections >= maxConnections) break
            const n2 = nodes[j]
            const dx = n1.x - n2.x
            const dy = n1.y - n2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < connectDistance) {
              connections++
              const alpha = 0.04 * (1 - dist / connectDistance)

              // Circuit trace style: dashed line with glow
              ctx.beginPath()
              ctx.moveTo(n1.x, n1.y)
              ctx.lineTo(n2.x, n2.y)
              ctx.strokeStyle = `rgba(192, 74, 26, ${alpha})`
              ctx.lineWidth = 0.5
              ctx.setLineDash([4, 8])
              ctx.stroke()
              ctx.setLineDash([])

              // Occasional data packet traveling along the line
              if (frameCountRef.current % 120 === (i + j) % 120) {
                const packetT = ((frameCountRef.current % 120) / 120)
                const px = n1.x + (n2.x - n1.x) * packetT
                const py = n1.y + (n2.y - n1.y) * packetT
                ctx.beginPath()
                ctx.arc(px, py, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(192, 74, 26, ${0.3 * (1 - Math.abs(packetT - 0.5) * 2)})`
                ctx.fill()
              }
            }
          }
        })
      }

      // Draw nodes (circuit junctions)
      nodes.forEach((node) => {
        const pulse = Math.sin(timeRef.current * node.pulseSpeed + node.pulsePhase)
        const baseSize = 1.5
        const pulseSize = baseSize + pulse * 0.5

        // Outer glow
        if (!reduced) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(192, 74, 26, ${0.03 + pulse * 0.02})`
          ctx.fill()
        }

        // Core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, Math.max(pulseSize, 0.8), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 74, 26, ${0.3 + pulse * 0.15})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
