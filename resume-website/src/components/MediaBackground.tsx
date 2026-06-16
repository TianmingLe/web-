import { useEffect, useRef, useState } from 'react'

interface MediaBackgroundProps {
  src: string
  type?: 'image' | 'video'
  overlay?: boolean
  overlayOpacity?: number
  overlayColor?: string
  className?: string
  parallax?: boolean
  parallaxSpeed?: number
  children?: React.ReactNode
}

export default function MediaBackground({
  src,
  type = 'image',
  overlay = true,
  overlayOpacity = 0.7,
  overlayColor = 'var(--color-b-cream)',
  className = '',
  parallax = false,
  parallaxSpeed = 0.3,
  children,
}: MediaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!parallax || !mediaRef.current) return

    const handleScroll = () => {
      const el = mediaRef.current
      if (!el) return
      const rect = el.parentElement?.getBoundingClientRect()
      if (!rect) return
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const clamped = Math.max(0, Math.min(1, progress))
      const offset = (clamped - 0.5) * parallaxSpeed * 200
      el.style.transform = `translateY(${offset}px) scale(1.1)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [parallax, parallaxSpeed])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 媒体层 */}
      <div
        ref={mediaRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: parallax ? 'transform' : undefined }}
      >
        {type === 'video' ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setLoaded(true)}
            className="w-full h-full object-cover"
            style={{ transform: parallax ? undefined : 'scale(1.1)' }}
          >
            <source src={src} />
          </video>
        ) : (
          <img
            src={src}
            alt=""
            onLoad={() => setLoaded(true)}
            className="w-full h-full object-cover"
            style={{ transform: parallax ? undefined : 'scale(1.1)' }}
          />
        )}
      </div>

      {/* 遮罩层 */}
      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${overlayColor}00 0%, ${overlayColor}${Math.round(overlayOpacity * 255).toString(16).padStart(2, '0')} 100%)`,
          }}
        />
      )}

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
