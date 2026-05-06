import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, Zap, Brain, Code, Rocket } from 'lucide-react'
import CoverLayout from '@layouts/CoverLayout'

const traits = [
  { icon: <Zap size={24} />, label: '能源工程' },
  { icon: <Brain size={24} />, label: 'AI原生' },
  { icon: <Code size={24} />, label: '全栈开发' },
  { icon: <Rocket size={24} />, label: '自媒体' },
]

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.home-name',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        '.home-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.home-traits',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      )
      gsap.fromTo(
        '.home-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!scrollHintRef.current) return
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(scrollHintRef.current, { y: 10, duration: 1, ease: 'power1.inOut' })
      .to(scrollHintRef.current, { y: 0, duration: 1, ease: 'power1.inOut' })

    return () => { tl.kill() }
  }, [])

  return (
    <CoverLayout id="home" aria-label="首页封面">
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen"
      >
        <h1 className="home-name text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          胡亚伟
        </h1>
        <p className="home-title text-xl md:text-2xl text-primary font-medium tracking-widest uppercase mb-12">
          AI Native Graduate
        </p>

        <div className="home-traits flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 px-6 py-4 glass-card"
              role="listitem"
            >
              <span className="text-primary" aria-hidden="true">{trait.icon}</span>
              <span className="text-sm text-gray-300 font-medium">
                {trait.label}
              </span>
            </div>
          ))}
        </div>

        <div ref={scrollHintRef} className="home-scroll absolute bottom-12">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-xs tracking-widest uppercase">向下滚动</span>
            <ChevronDown size={20} className="text-primary" aria-hidden="true" />
          </div>
        </div>
      </div>
    </CoverLayout>
  )
}
