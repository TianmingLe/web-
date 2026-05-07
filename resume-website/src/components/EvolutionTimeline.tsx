import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface EvolutionStep {
  label: string
  title: string
  description: string
  icon?: ReactNode
}

interface EvolutionTimelineProps {
  heading: string
  subheading?: string
  steps: EvolutionStep[]
}

export default function EvolutionTimeline({ heading, subheading, steps }: EvolutionTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.evo-step'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
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
    <div ref={ref} className="mb-24 md:mb-32">
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
          {heading}
        </h3>
        {subheading && (
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
      </div>

      <div className="space-y-8 md:space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="evo-step">
            <div className="flex items-start gap-6 md:gap-10">
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span 
                    className="text-base md:text-lg font-semibold"
                    style={{ color: '#00d4ff' }}
                  >
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className="w-px flex-1 mt-2"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    }}
                  />
                )}
              </div>
              
              <div className="flex-1 pt-1">
                <div className="mb-2 md:mb-3">
                  <span 
                    className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {step.icon}
                    {step.label}
                  </span>
                </div>
                
                <h4 className="text-lg md:text-2xl font-semibold text-white mb-3">
                  {step.title}
                </h4>
                
                <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}