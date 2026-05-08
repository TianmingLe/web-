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
    <div className="inline-block max-w-md w-full">
      <div
        className="relative group"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative p-8 rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
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
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(52, 199, 89, 0.2) 100%)',
                color: '#00d4ff',
                border: '1px solid rgba(0, 122, 255, 0.3)',
              }}
            >
              {step.icon}
              <span className="tracking-wider">{step.label}</span>
            </span>
            <h4 className="text-xl font-semibold mb-4 leading-tight" style={{ color: '#ffffff' }}>
              {step.title}
            </h4>
            <p className="text-base leading-relaxed" style={{ color: '#c8b99a' }}>
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

      <div className="relative">
        <div
          className="evo-line absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block origin-top"
          style={{
            background: 'linear-gradient(180deg, #007aff 0%, #34c759 50%, #af52de 100%)',
            opacity: 0.6,
          }}
          aria-hidden="true"
        />

        <div className="space-y-16 md:space-y-0">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={index} className="evo-step relative md:flex md:items-center md:py-8">
                <div className={`hidden md:block flex-1 ${isLeft ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                  {isLeft && <StepCard step={step} />}
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full z-10 justify-center items-center">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
                      boxShadow: '0 0 30px rgba(0, 122, 255, 0.5), 0 0 60px rgba(52, 199, 89, 0.2)',
                    }}
                  />
                  <div
                    className="absolute w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: '#0a0a0a',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <span className="text-xs font-bold" style={{ color: '#00d4ff' }}>
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className={`hidden md:block flex-1 ${isLeft ? 'pl-16 text-left' : 'pr-16 text-right'}`}>
                  {!isLeft && <StepCard step={step} />}
                </div>

                <div className="md:hidden flex items-start gap-5 p-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full z-10 flex items-center justify-center relative">
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
                        boxShadow: '0 0 20px rgba(0, 122, 255, 0.5)',
                      }}
                    />
                    <div
                      className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#0a0a0a' }}
                    >
                      <span className="text-xs font-bold" style={{ color: '#00d4ff' }}>
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="relative p-5 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full mb-3"
                        style={{
                          background: 'rgba(0, 122, 255, 0.15)',
                          color: '#007aff',
                          border: '1px solid rgba(0, 122, 255, 0.3)',
                        }}
                      >
                        {step.icon}{step.label}
                      </span>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>{step.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#c8b99a' }}>{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
