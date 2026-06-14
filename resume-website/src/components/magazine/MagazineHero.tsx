import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MagazineHero() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    const chars = titleRef.current.querySelectorAll('.mag-char')
    gsap.fromTo(
      chars,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.3,
      }
    )
  }, [])

  const titleText = '荣誉与经历'

  return (
    <div
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0D0B0A 0%, #14110F 100%)' }}
    >
      {/* subtle 纸张纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-px bg-copper-gold/60" />

      {/* 期刊信息 */}
      <div className="text-center mb-10">
        <p className="font-mono text-xs tracking-[0.4em] text-copper-gold/70 uppercase">
          Vol. 01 · June 2025
        </p>
      </div>

      {/* 大标题 - 逐字动画 */}
      <div ref={titleRef} className="text-center mb-6">
        <h1 className="font-other-title text-6xl md:text-7xl text-magazine-cream tracking-tight">
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="mag-char inline-block"
              style={{ opacity: 0 }}
            >
              {char === '与' ? (
                <span className="italic text-copper-gold">{char}</span>
              ) : (
                char
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* 副标题 */}
      <p className="text-magazine-warm text-sm max-w-md text-center leading-relaxed mb-8">
        从学术竞赛到职业实践，从校园活动到技能积累——
        <br />
        一份关于成长与探索的个人档案。
      </p>

      {/* 装饰性分隔 */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-px bg-copper-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-copper-gold" />
        <div className="w-12 h-px bg-copper-gold/50" />
      </div>

      {/* 封面装饰：三个小圆点 */}
      <div className="flex items-center gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-copper-gold/40"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* 底部信息栏 */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="flex justify-between items-end text-xs font-mono text-magazine-warm/50">
          <span>EDITOR: TIANMING LE</span>
          <span className="px-3 py-1 border border-copper-gold/30 rounded-full text-copper-gold/70">
            FEATURED
          </span>
          <span>PRICELESS</span>
        </div>
      </div>
    </div>
  )
}
