import { useRef, useEffect, type ReactNode } from 'react'

interface AnimatedListProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
}

/**
 * AnimatedList - react-bits style staggered list animation
 * Uses CSS transforms for hardware-accelerated animations
 */
export default function AnimatedList({
  children,
  className = '',
  staggerDelay = 0.08,
  duration = 0.6,
}: AnimatedListProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll('.animated-list-item')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = Number(el.dataset.index) || 0
            el.style.transitionDelay = `${index * staggerDelay}s`
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) scale(1)'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [staggerDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

interface AnimatedListItemProps {
  children: ReactNode
  index: number
  className?: string
}

export function AnimatedListItem({
  children,
  index,
  className = '',
}: AnimatedListItemProps) {
  return (
    <div
      data-index={index}
      className={`animated-list-item ${className}`}
      style={{
        opacity: 0,
        transform: 'translateY(20px) scale(0.98)',
        transition: `opacity ${0.6}s cubic-bezier(0.16, 1, 0.3, 1), transform ${0.6}s cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}
