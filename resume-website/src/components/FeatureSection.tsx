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
    <div ref={ref} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center mb-20 md:mb-28`}>
      <div className="flex-1 feature-animate">
        {badge && (
          <span className="tag-pill tag-pill-active mb-4 inline-flex">
            {badge}
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
          {description}
        </p>
        {children}
      </div>
      <div className="flex-1 w-full feature-animate">
        {image ? (
          <div className="feature-image-frame">
            {image}
          </div>
        ) : (
          <div className="feature-image-frame aspect-video flex items-center justify-center">
            <div className="text-gray-600 text-sm">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary/30" />
              </div>
              项目展示
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
