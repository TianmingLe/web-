import { useEffect, useRef } from 'react'

/* ─── Blob Cursor Follower (inspired by react-bits) ─── */
export default function BlobCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const blobsRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number; color: string }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let animId = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize trailing blobs
    blobsRef.current = [
      { x: w / 2, y: h / 2, vx: 0, vy: 0, r: 24, color: 'rgba(196, 108, 84, 0.12)' },
      { x: w / 2, y: h / 2, vx: 0, vy: 0, r: 18, color: 'rgba(139, 157, 120, 0.10)' },
      { x: w / 2, y: h / 2, vx: 0, vy: 0, r: 12, color: 'rgba(123, 107, 158, 0.08)' },
    ]

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      const target = mouseRef.current
      const blobs = blobsRef.current

      // Lead blob follows mouse directly
      blobs[0].x += (target.x - blobs[0].x) * 0.15
      blobs[0].y += (target.y - blobs[0].y) * 0.15

      // Trailing blobs follow previous blob
      for (let i = 1; i < blobs.length; i++) {
        const prev = blobs[i - 1]
        const curr = blobs[i]
        curr.x += (prev.x - curr.x) * (0.12 - i * 0.02)
        curr.y += (prev.y - curr.y) * (0.12 - i * 0.02)
      }

      // Draw from back to front
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i]
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, b.color)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, mixBlendMode: 'multiply' }}
    />
  )
}
