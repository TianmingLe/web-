import { type ReactNode, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FeatureSectionProps {
  title: string
  description: string
  badge?: string
  image?: ReactNode
  reverse?: boolean
  children?: ReactNode
}

export default function FeatureSection({
  title,
  description,
  badge,
  image,
  reverse = false,
  children,
}: FeatureSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.feature-animate'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => { ctx.revert() }
  }, [])

  return (
    <div ref={ref} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center mb-24 md:mb-32`}>
      <div className="flex-1 feature-animate">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20 mb-5">
            {badge}
          </span>
        )}
        <h3 className="text-2xl md:text-4xl font-semibold text-white mb-5 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-[#c8b99a] text-base md:text-lg leading-relaxed mb-6">
          {description}
        </p>
        {children}
      </div>
      <div className="flex-1 w-full feature-animate">
        {image ? (
          <div className="feature-frame">
            {image}
          </div>
        ) : (
          <div className="feature-frame aspect-video flex items-center justify-center">
            <div className="text-[#c8b99a] text-sm">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-energy/40" />
              </div>
              项目展示
            </div>
          </div>
        )}
      </div>
    </div>
  )
}