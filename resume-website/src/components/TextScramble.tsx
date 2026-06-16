import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export default function TextScramble({
  text,
  className = '',
  delay = 0,
  duration = 1200,
}: TextScrambleProps) {
  const [display, setDisplay] = useState('')
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const startDelay = setTimeout(() => {
      startTimeRef.current = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)

        let result = ''
        for (let i = 0; i < text.length; i++) {
          const charProgress = Math.max(0, Math.min((eased * text.length - i) / 2, 1))
          if (charProgress >= 1) {
            result += text[i]
          } else if (charProgress > 0) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            result += '\u00A0'
          }
        }

        setDisplay(result)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(startDelay)
      cancelAnimationFrame(frameRef.current)
    }
  }, [text, delay, duration])

  return <span className={`scramble-text ${className}`}>{display || '\u00A0'.repeat(text.length)}</span>
}
