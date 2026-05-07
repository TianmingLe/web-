import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, Zap, Brain, Code, Rocket, GraduationCap } from 'lucide-react'
import CoverLayout from '@layouts/CoverLayout'

const traits = [
  { icon: <Zap size={20} />, label: '工程专业能力', desc: 'ANSYS / AutoCAD / 实践操作' },
  { icon: <Brain size={20} />, label: 'AI技术应用', desc: 'Agent / RAG / Prompt工程' },
  { icon: <Code size={20} />, label: '数据驱动思维', desc: 'Python / SQL / 数据分析' },
  { icon: <Rocket size={20} />, label: '项目执行力', desc: '团队协作 / 竞赛获奖' },
]

const profile = {
  name: '胡亚伟',
  title: 'AI NATIVE GRADUATE',
  subtitle: '能源动力技术与人工智能交叉领域探索者',
  school: '山西大学 · 能源与动力工程',
  mbti: 'ENTJ-A',
  tagline: '将AI技术深度融入能源工程，以跨界思维驱动创新',
}

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.home-name',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.home-title',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.home-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      )
      gsap.fromTo(
        '.home-tagline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.85 }
      )
      gsap.fromTo(
        '.home-school',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.95 }
      )
      gsap.fromTo(
        '.home-traits',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
      )
      gsap.fromTo(
        '.home-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.out', delay: 1.6 }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!scrollHintRef.current) return
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(scrollHintRef.current, { y: 10, duration: 1.5, ease: 'power1.inOut' })
      .to(scrollHintRef.current, { y: 0, duration: 1.5, ease: 'power1.inOut' })

    return () => { tl.kill() }
  }, [])

  return (
    <CoverLayout id="home" aria-label="首页封面">
      <div className="hero-glow hero-glow-blue" style={{ top: '-15%', left: '15%' }} aria-hidden="true" />
      <div className="hero-glow hero-glow-green" style={{ bottom: '-10%', right: '10%' }} aria-hidden="true" />
      <div className="hero-glow hero-glow-purple" style={{ top: '40%', right: '40%', width: '500px', height: '500px', opacity: 0.06 }} aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-6 min-h-screen"
      >
        <p className="home-title text-xs md:text-sm text-primary/70 font-semibold tracking-[0.4em] uppercase mb-6">
          {profile.title}
        </p>

        <h1 className="home-name text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 tracking-tight leading-[0.9]">
          <span className="text-gradient-hero">{profile.name}</span>
        </h1>

        <p className="home-subtitle text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mb-4 leading-relaxed">
          {profile.subtitle}
        </p>

        <p className="home-tagline text-sm md:text-base text-text-muted max-w-xl mb-6">
          {profile.tagline}
        </p>

        <div className="home-school flex flex-wrap items-center justify-center gap-3 text-text-secondary text-sm mb-16">
          <span className="flex items-center gap-2">
            <GraduationCap size={16} />
            {profile.school}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-accent">{profile.mbti}</span>
        </div>

        <div className="home-traits flex flex-wrap justify-center gap-3 md:gap-4 mb-20">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-5 py-3.5 apple-glass cursor-default"
              role="listitem"
            >
              <span className="text-primary/60 group-hover:text-primary transition-colors duration-300" aria-hidden="true">{trait.icon}</span>
              <div className="text-left">
                <span className="text-sm text-white font-medium block leading-tight">
                  {trait.label}
                </span>
                <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                  {trait.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div ref={scrollHintRef} className="home-scroll absolute bottom-16">
          <div className="flex flex-col items-center gap-3 text-text-muted">
            <span className="text-xs tracking-[0.25em] uppercase">探索更多</span>
            <ChevronDown size={20} className="text-primary/50" aria-hidden="true" />
          </div>
        </div>
      </div>
    </CoverLayout>
  )
}