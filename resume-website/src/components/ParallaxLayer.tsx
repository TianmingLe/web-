import { useEffect, useRef, type ReactNode } from 'react'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxLayer({ children, speed = 0.5, className = '' }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
      const clamped = Math.max(0, Math.min(1, progress))
      const offset = (clamped - 0.5) * speed * 100
      el.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`parallax-layer ${className}`}>
      {children}
    </div>
  )
}
