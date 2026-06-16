import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -500, y: -500 })
  const targetRef = useRef({ x: -500, y: -500 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const pos = posRef.current
      const target = targetRef.current

      // Smooth lerp
      pos.x += (target.x - pos.x) * 0.08
      pos.y += (target.y - pos.y) * 0.08

      glow.style.left = `${pos.x}px`
      glow.style.top = `${pos.y}px`

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow hidden md:block"
      style={{ left: -500, top: -500 }}
    />
  )
}
