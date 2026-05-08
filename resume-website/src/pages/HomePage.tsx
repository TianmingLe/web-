import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Zap, Brain, Code, Rocket, GraduationCap, MapPin, Activity } from 'lucide-react'

const traits = [
  { icon: <Zap size={18} />, label: '工程专业能力', desc: 'ANSYS / AutoCAD / 实践操作' },
  { icon: <Brain size={18} />, label: 'AI技术应用', desc: 'Agent / RAG / Prompt工程' },
  { icon: <Code size={18} />, label: '数据驱动思维', desc: 'Python / SQL / 数据分析' },
  { icon: <Rocket size={18} />, label: '项目执行力', desc: '团队协作 / 竞赛获奖' },
]

const profile = {
  name: '胡亚伟',
  title: 'AI NATIVE GRADUATE',
  subtitle: '能源动力技术与人工智能交叉领域探索者',
  school: '山西大学 · 能源与动力工程',
  mbti: 'ENTJ-A',
  tagline: '将AI技术深度融入能源工程，以跨界思维驱动创新',
}

const hudMetrics = [
  { label: '技术栈', value: '能源 × AI', status: 'active' as const },
  { label: '当前阶段', value: '本科在读', status: 'active' as const },
  { label: '核心领域', value: '能动 / AI / 自媒体', status: 'ai' as const },
]

export default function HomePage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const [circuitReady, setCircuitReady] = useState(false)

  useEffect(() => {
    // Circuit animation trigger
    const timer = setTimeout(() => setCircuitReady(true), 300)

    const ctx = gsap.context(() => {
      // Hero text staggered entrance with expoOut
      gsap.fromTo(
        '.home-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 }
      )
      gsap.fromTo(
        '.home-name',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.home-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.8 }
      )
      gsap.fromTo(
        '.home-tagline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 1.0 }
      )
      gsap.fromTo(
        '.home-meta',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1.2 }
      )
      gsap.fromTo(
        '.home-traits',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 1.4 }
      )
      gsap.fromTo(
        '.home-hud',
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out', delay: 1.6 }
      )
    }, contentRef)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient glows */}
      <div className="hero-glow hero-glow-energy" style={{ top: '-20%', left: '10%' }} aria-hidden="true" />
      <div className="hero-glow hero-glow-ai" style={{ bottom: '-15%', right: '5%', opacity: 0.06 }} aria-hidden="true" />

      {/* Circuit SVG decoration */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(192, 74, 26, 0.1)" />
            <stop offset="100%" stopColor="rgba(74, 124, 155, 0.08)" />
          </linearGradient>
        </defs>
        {/* Horizontal traces */}
        <line x1="0" y1="30" x2="100" y2="30" stroke="url(#circuit-grad)" strokeWidth="0.05" className={circuitReady ? 'animate-circuit-draw' : ''} style={{ animationDelay: '0.5s' }} />
        <line x1="0" y1="70" x2="100" y2="70" stroke="url(#circuit-grad)" strokeWidth="0.05" className={circuitReady ? 'animate-circuit-draw' : ''} style={{ animationDelay: '1s' }} />
        {/* Vertical traces */}
        <line x1="20" y1="0" x2="20" y2="100" stroke="url(#circuit-grad)" strokeWidth="0.05" className={circuitReady ? 'animate-circuit-draw' : ''} style={{ animationDelay: '0.8s' }} />
        <line x1="80" y1="0" x2="80" y2="100" stroke="url(#circuit-grad)" strokeWidth="0.05" className={circuitReady ? 'animate-circuit-draw' : ''} style={{ animationDelay: '1.2s' }} />
        {/* Nodes */}
        <circle cx="20" cy="30" r="0.3" fill="rgba(192, 74, 26, 0.3)" className={circuitReady ? 'animate-fade-in' : ''} style={{ animationDelay: '1.5s' }} />
        <circle cx="80" cy="70" r="0.3" fill="rgba(74, 124, 155, 0.3)" className={circuitReady ? 'animate-fade-in' : ''} style={{ animationDelay: '1.8s' }} />
      </svg>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 w-full max-w-5xl mx-auto py-28 md:py-36"
      >
        {/* Title badge */}
        <p className="home-title text-[11px] md:text-xs text-energy-light font-mono font-medium tracking-[0.3em] uppercase mb-8">
          {profile.title}
        </p>

        {/* Name */}
        <h1 className="home-name text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-warm mb-6 tracking-tight leading-[0.95]">
          <span className="text-gradient-warm">{profile.name}</span>
        </h1>

        {/* Subtitle */}
        <p className="home-subtitle text-base md:text-lg lg:text-xl text-warm-muted max-w-xl mb-3 leading-relaxed font-sans">
          {profile.subtitle}
        </p>

        {/* Tagline */}
        <p className="home-tagline text-sm md:text-base text-warm-faint max-w-lg mb-8 font-sans">
          {profile.tagline}
        </p>

        {/* Meta info */}
        <div className="home-meta flex flex-wrap items-center justify-center gap-4 text-warm-faint text-sm mb-12 font-sans">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={14} className="text-energy/60" />
            {profile.school}
          </span>
          <span className="text-warm-ghost">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-energy/60" />
            山西 · 太原
          </span>
          <span className="text-warm-ghost">|</span>
          <span className="font-mono text-energy-light/80">{profile.mbti}</span>
        </div>

        {/* Traits */}
        <div className="home-traits flex flex-wrap justify-center gap-3 mb-16">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="group flex items-center gap-2.5 px-4 py-2.5 hud-panel cursor-default"
              role="listitem"
              style={{ animationDelay: `${1.4 + index * 0.1}s` }}
            >
              <span className="text-energy/50 group-hover:text-energy transition-colors duration-300" aria-hidden="true">
                {trait.icon}
              </span>
              <div className="text-left">
                <span className="text-xs text-warm font-medium block leading-tight font-sans">
                  {trait.label}
                </span>
                <span className="text-[11px] text-warm-faint group-hover:text-warm-muted transition-colors duration-300 font-sans">
                  {trait.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* HUD Panel */}
        <div
          ref={hudRef}
          className="home-hud w-full max-w-2xl"
        >
          <div className="hud-panel p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-energy" />
              <span className="section-label">系统状态</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hudMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1.5"
                >
                  <span className="text-[11px] text-warm-faint font-mono uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className={`status-indicator ${metric.status === 'active' ? 'status-active' : 'status-ai'} w-fit`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-warm-faint font-mono uppercase tracking-wider">学习进度</span>
                <span className="text-[11px] text-energy-light font-mono">本科 · 进行中</span>
              </div>
              <div className="h-1 bg-warm-ghost/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-energy to-energy-light rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
