import { useEffect, useRef, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div'
}

export default function GlitchText({ text, className = '', as: Tag = 'span' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    // Trigger glitch periodically
    intervalRef.current = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 400)
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <Tag
      className={`${isGlitching ? 'glitch-text' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
