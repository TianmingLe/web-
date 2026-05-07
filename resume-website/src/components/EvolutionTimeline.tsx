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

      <div className="relative">
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{
            background: 'linear-gradient(180deg, rgba(0,122,255,0.4) 0%, rgba(52,199,89,0.3) 50%, rgba(175,82,222,0.3) 100%)'
          }}
          aria-hidden="true" 
        />

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={index} className="evo-step relative md:flex md:items-center md:gap-12 md:py-8">
                <div className={`hidden md:block flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-md ${isLeft ? 'ml-auto' : ''}`}>
                    <div 
                      className="relative p-6 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <span 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full mb-4"
                        style={{
                          background: 'rgba(0, 122, 255, 0.15)',
                          color: '#007aff',
                          border: '1px solid rgba(0, 122, 255, 0.3)',
                        }}
                      >
                        {step.icon}{step.label}
                      </span>
                      <h4 className="text-lg font-semibold text-white mb-3">{step.title}</h4>
                      <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 justify-center items-center">
                  <div 
                    className="w-full h-full rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
                      boxShadow: '0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(52, 199, 89, 0.3)',
                    }}
                  />
                  <div 
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: '#0a0a0a',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  />
                </div>

                <div className={`hidden md:block flex-1 ${isLeft ? 'text-left' : 'text-right'}`}>
                  {!isLeft && (
                    <div className="inline-block max-w-md">
                      <div 
                        className="relative p-6 rounded-2xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <span 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full mb-4"
                          style={{
                            background: 'rgba(0, 122, 255, 0.15)',
                            color: '#007aff',
                            border: '1px solid rgba(0, 122, 255, 0.3)',
                          }}
                        >
                          {step.icon}{step.label}
                        </span>
                        <h4 className="text-lg font-semibold text-white mb-3">{step.title}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:hidden flex items-start gap-4 p-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full z-10 flex items-center justify-center">
                    <div 
                      className="w-full h-full rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
                        boxShadow: '0 0 16px rgba(0, 122, 255, 0.5)',
                      }}
                    />
                    <div 
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: '#0a0a0a',
                      }}
                    />
                  </div>
                  <div 
                    className="flex-1 p-5 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full mb-3"
                      style={{
                        background: 'rgba(0, 122, 255, 0.15)',
                        color: '#007aff',
                        border: '1px solid rgba(0, 122, 255, 0.3)',
                      }}
                    >
                      {step.icon}{step.label}
                    </span>
                    <h4 className="text-base font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
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