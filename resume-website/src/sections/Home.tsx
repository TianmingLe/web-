import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, Zap, Brain, Code, Rocket, GraduationCap } from 'lucide-react'
import CoverLayout from '@layouts/CoverLayout'

const traits = [
  { icon: <Zap size={24} />, label: '工程专业能力', desc: 'ANSYS/AutoCAD/实践操作' },
  { icon: <Brain size={24} />, label: 'AI技术应用', desc: 'Agent开发/RAG/Prompt工程' },
  { icon: <Code size={24} />, label: '数据驱动思维', desc: 'Python/SQL/数据分析' },
  { icon: <Rocket size={24} />, label: '项目执行力', desc: '团队协作/竞赛获奖' },
]

const profile = {
  name: '胡亚伟',
  title: 'AI NATIVE GRADUATE',
  subtitle: '能源动力技术与人工智能交叉领域',
  school: '山西大学 · 能源与动力工程',
  mbti: 'ENTJ-A',
}

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
        '.home-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.65 }
      )
      gsap.fromTo(
        '.home-school',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.75 }
      )
      gsap.fromTo(
        '.home-traits',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.9 }
      )
      gsap.fromTo(
        '.home-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 }
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
          {profile.name}
        </h1>
        <p className="home-title text-xl md:text-2xl text-primary font-medium tracking-widest uppercase mb-3">
          {profile.title}
        </p>
        <p className="home-subtitle text-base md:text-lg text-gray-300 max-w-xl mb-2">
          {profile.subtitle}
        </p>
        <div className="home-school flex items-center gap-2 text-gray-400 text-sm mb-10">
          <GraduationCap size={16} />
          <span>{profile.school}</span>
          <span className="text-white/20">|</span>
          <span className="text-accent-light">MBTI: {profile.mbti}</span>
        </div>

        <div className="home-traits flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 px-5 py-4 glass-card min-w-[120px]"
              role="listitem"
            >
              <span className="text-primary" aria-hidden="true">{trait.icon}</span>
              <span className="text-sm text-white font-medium">
                {trait.label}
              </span>
              <span className="text-xs text-gray-500">
                {trait.desc}
              </span>
            </div>
          ))}
        </div>

        <div ref={scrollHintRef} className="home-scroll absolute bottom-12">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-xs tracking-widest uppercase">探索我的世界</span>
            <ChevronDown size={20} className="text-primary" aria-hidden="true" />
          </div>
        </div>
      </div>
    </CoverLayout>
  )
}
