import { type ReactNode, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionLayoutProps {
  children: ReactNode
  className?: string
  id?: string
  title?: string
  subtitle?: string
  description?: string
  label?: string
  glowColor?: 'energy' | 'ai'
}

export default function SectionLayout({
  children,
  className = '',
  id,
  title,
  subtitle,
  description,
  label,
  glowColor = 'energy',
}: SectionLayoutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-24 md:py-32 px-4 md:px-6 ${className}`}
    >
      {/* Section divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-ghost/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {(label || title || subtitle || description) && (
          <div className="mb-14 md:mb-20">
            {label && (
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${glowColor === 'energy' ? 'bg-energy' : 'bg-ai'}`} />
                <span className="section-label">{label}</span>
              </div>
            )}
            {subtitle && (
              <p className="text-energy-light/80 text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] uppercase mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm mb-5 tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-warm-muted text-base md:text-lg max-w-2xl leading-relaxed font-sans">
                {description}
              </p>
            )}
          </div>
        )}
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  )
}
