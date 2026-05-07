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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
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

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary-light/30 to-primary/20 -translate-x-1/2 hidden md:block" aria-hidden="true" />

        <div className="space-y-10 md:space-y-0">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={index} className="evo-step relative md:flex md:items-center md:gap-8 md:py-4">
                <div className={`hidden md:block flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                  {isLeft && <StepContent step={step} align="right" />}
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-primary-light z-10 shadow-[0_0_16px_rgba(0,122,255,0.4)]">
                  <div className="w-full h-full rounded-full bg-base/50 backdrop-blur-sm" />
                </div>

                <div className={`hidden md:block flex-1 ${isLeft ? 'text-left' : 'text-right'}`}>
                  {!isLeft && <StepContent step={step} align="left" />}
                </div>

                <div className="md:hidden flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-gradient-to-br from-primary to-primary-light z-10 shadow-[0_0_12px_rgba(0,122,255,0.4)]">
                    <div className="w-full h-full rounded-full bg-base/50 backdrop-blur-sm" />
                  </div>
                  <StepContent step={step} align="left" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StepContent({ step, align }: { step: EvolutionStep; align: 'left' | 'right' }) {
  return (
    <div className={`apple-card p-5 md:p-6 inline-block max-w-md ${align === 'right' ? 'ml-auto' : ''}`}>
      <span className="apple-tag text-xs mb-3 inline-flex">
        {step.icon}{step.label}
      </span>
      <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
    </div>
  )
}