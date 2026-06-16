import { useEffect, useRef, useState } from 'react'

/* ─── Blur Text Reveal (inspired by react-bits) ─── */
interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function BlurText({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  as: Tag = 'span',
}: BlurTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={containerRef as any} className={`inline-block ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, ci) => {
            const index = words.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + ci
            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  filter: visible ? 'blur(0px)' : 'blur(8px)',
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * stagger}s, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * stagger}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * stagger}s`,
                }}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
