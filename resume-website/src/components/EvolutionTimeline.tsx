import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface EvolutionStep {
  label: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface EvolutionTimelineProps {
  heading: string
  subheading?: string
  steps: EvolutionStep[]
}

function StepCard({ step }: { step: EvolutionStep }) {
  return (
    <div className="w-full">
      <div
        className="relative group"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative p-6 md:p-8 rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(52, 199, 89, 0.05) 100%)',
            }}
          />
          <div className="relative z-10">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(52, 199, 89, 0.2) 100%)',
                color: '#00d4ff',
                border: '1px solid rgba(0, 122, 255, 0.3)',
              }}
            >
              {step.icon}
              <span className="tracking-wider">{step.label}</span>
            </span>
            <h4 className="text-lg md:text-xl font-semibold mb-3 leading-tight" style={{ color: '#ffffff' }}>
              {step.title}
            </h4>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#c8b99a' }}>
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EvolutionTimeline({ heading, subheading, steps }: EvolutionTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.evo-step'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        el.querySelector('.evo-line') as HTMLElement,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
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
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#c8b99a' }}>
            {subheading}
          </p>
        )}
      </div>

      <div className="relative pl-8 md:pl-14">
        <div
          className="evo-line absolute left-3 md:left-5 top-0 bottom-0 w-px origin-top"
          style={{
            background: 'linear-gradient(180deg, #007aff 0%, #34c759 50%, #af52de 100%)',
            opacity: 0.6,
          }}
          aria-hidden="true"
        />

        <div className="space-y-10 md:space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="evo-step relative flex items-start gap-5 md:gap-6">
              <div className="absolute -left-8 md:-left-14 top-6 flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full z-10 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
                    boxShadow: '0 0 20px rgba(0, 122, 255, 0.5), 0 0 40px rgba(52, 199, 89, 0.2)',
                  }}
                />
                <div
                  className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: '#0a0a0a',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <span className="text-[10px] md:text-xs font-bold" style={{ color: '#00d4ff' }}>
                    {index + 1}
                  </span>
                </div>
              </div>

              <div className="flex-1 pt-3">
                <StepCard step={step} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
