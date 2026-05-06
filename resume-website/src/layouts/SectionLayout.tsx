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
}

export default function SectionLayout({
  children,
  className = '',
  id,
  title,
  subtitle,
  description,
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen py-24 px-6 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {(title || subtitle || description) && (
          <div className="mb-16 text-center">
            {subtitle && (
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
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
