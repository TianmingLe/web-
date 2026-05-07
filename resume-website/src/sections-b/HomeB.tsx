import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Zap, Brain, Code, Rocket, GraduationCap, MapPin, ChevronDown } from 'lucide-react'
import CoverLayout from '@layouts/CoverLayout'
import ExpandableCard from '@components/ExpandableCard'

const traits = [
  {
    icon: <Zap size={18} />,
    label: '工程专业能力',
    subtitle: 'ANSYS / AutoCAD / 实践操作',
    tags: ['ANSYS', 'AutoCAD', '工程实践'],
    cardClass: 'b-card-terracotta',
    tagClass: 'b-tag-terracotta',
    detail: '扎实的能源与动力工程基础，熟练使用ANSYS进行热力学仿真与结构分析，AutoCAD工程制图，具备现场实践与设备调试经验。',
    level: 4,
  },
  {
    icon: <Brain size={18} />,
    label: 'AI技术应用',
    subtitle: 'Agent / RAG / Prompt工程',
    tags: ['Agent', 'RAG', 'Prompt'],
    cardClass: 'b-card-sage',
    tagClass: 'b-tag-sage',
    detail: '深入探索AI Agent架构与检索增强生成技术，擅长Prompt工程优化，将大语言模型能力与专业领域知识深度融合。',
    level: 4,
  },
  {
    icon: <Code size={18} />,
    label: '数据驱动思维',
    subtitle: 'Python / SQL / 数据分析',
    tags: ['Python', 'SQL', '数据分析'],
    cardClass: 'b-card-slate',
    tagClass: 'b-tag-slate',
    detail: '以数据为核心驱动力，熟练运用Python进行数据处理与建模，SQL数据库查询优化，将分析洞察转化为工程决策依据。',
    level: 3,
  },
  {
    icon: <Rocket size={18} />,
    label: '项目执行力',
    subtitle: '团队协作 / 竞赛获奖',
    tags: ['团队协作', '竞赛', '项目管理'],
    cardClass: 'b-card-terracotta',
    tagClass: 'b-tag-terracotta',
    detail: '多次带队参与学科竞赛并获奖，擅长跨学科团队协作与项目统筹，从方案设计到落地交付全流程把控。',
    level: 4,
  },
]

export default function HomeB() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hb-ornament-top',
        { opacity: 0, scale: 0.5, rotate: 45 },
        { opacity: 1, scale: 1, rotate: 45, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1 }
      )

      gsap.fromTo(
        '.hb-name',
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', delay: 0.3 }
      )

      gsap.fromTo(
        '.hb-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.6 }
      )

      gsap.fromTo(
        '.hb-meta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.8 }
      )

      gsap.fromTo(
        '.hb-trait-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.1, delay: 1.0 }
      )

      gsap.fromTo(
        '.hb-scroll-indicator',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1.6 }
      )

      gsap.to('.hb-scroll-chevron', {
        y: 6,
        duration: 1.2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <CoverLayout id="home-b" aria-label="首页封面" className="bg-b-cream">
      <div className="b-hero-shape b-hero-shape-1" aria-hidden="true" />
      <div className="b-hero-shape b-hero-shape-2" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 md:px-8 min-h-screen w-full max-w-4xl mx-auto py-16"
      >
        <div className="hb-ornament-top mb-8">
          <span className="b-ornament" />
          <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle" />
          <span className="b-ornament" />
        </div>

        <h1 className="hb-name font-b-serif text-6xl md:text-8xl lg:text-9xl text-b-ink leading-[0.9] tracking-tight mb-6">
          胡亚伟
        </h1>

        <p className="hb-subtitle font-b-sans text-lg md:text-xl lg:text-2xl text-b-ink-light max-w-xl mb-5 leading-relaxed">
          能源动力技术与人工智能交叉领域探索者
        </p>

        <div className="hb-meta flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-b-muted text-sm mb-14 font-b-sans">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={15} className="text-b-terracotta/70" />
            <span className="b-underline-hover">山西大学 · 能源与动力工程</span>
          </span>
          <span className="hidden sm:inline text-b-sand">◆</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-b-terracotta/70" />
            <span>山西 · 太原</span>
          </span>
          <span className="hidden sm:inline text-b-sand">◆</span>
          <span className="font-b-mono text-xs text-b-slate bg-b-slate-dim px-2.5 py-1 rounded-full border border-b-slate-dim">
            ENTJ-A
          </span>
        </div>

        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {traits.map((trait, index) => (
            <div key={index} className="hb-trait-card">
              <ExpandableCard
                title={trait.label}
                subtitle={trait.subtitle}
                tags={trait.tags}
                icon={trait.icon}
                cardClass={trait.cardClass}
                tagClass={trait.tagClass}
                expandOnHover
              >
                <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-4">
                  {trait.detail}
                </p>
                <div className="b-skill-meter">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`b-skill-dot ${i < trait.level ? 'b-skill-dot-filled' : ''}`}
                    />
                  ))}
                </div>
              </ExpandableCard>
            </div>
          ))}
        </div>

        <div className="hb-scroll-indicator flex flex-col items-center gap-2 mt-auto">
          <span className="font-b-mono text-[10px] text-b-muted tracking-[0.2em] uppercase">
            Scroll
          </span>
          <ChevronDown size={16} className="hb-scroll-chevron text-b-terracotta/60" />
        </div>
      </div>
    </CoverLayout>
  )
}
