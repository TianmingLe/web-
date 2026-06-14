import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Building2, GraduationCap } from 'lucide-react'
import otherData from '@data/other.json'
import MagazineSpread from './MagazineSpread'
import PolaroidFrame from './PolaroidFrame'
import StickyNote from './StickyNote'
import { DropCap } from './MagazineDecorations'

export default function MagazineExperience() {
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quoteRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const leftContent = (
    <div>
      {/* 引言框 */}
      <div
        ref={quoteRef}
        className="mb-6 pl-4 border-l-2 border-copper-gold/50"
        style={{ opacity: 0 }}
      >
        <p className="text-magazine-cream/80 text-sm italic font-serif leading-relaxed">
          "从风电场的高压设备巡检到互联网公司的校园运营，每一次实践都是对课堂知识的延伸与验证。"
        </p>
      </div>

      {/* 首字下沉介绍 */}
      <div className="mb-6">
        <DropCap>
          实习经历横跨能源运维与互联网运营两大领域。在山西粤电风电场，深入220kV升压站进行设备巡检；在百度网盘，负责校园大使运营与内容创作。
        </DropCap>
      </div>

      {/* 实习经历 */}
      <div className="space-y-6">
        {otherData.internship.map((intern, idx) => (
          <div key={idx} className="relative">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-copper-gold/10 flex items-center justify-center shrink-0">
                <Building2 size={14} className="text-copper-gold" />
              </div>
              <div>
                <h4 className="text-magazine-cream text-sm font-medium">
                  {intern.company}
                </h4>
                <p className="text-magazine-warm/60 text-xs">
                  {intern.role} · {intern.period}
                </p>
              </div>
            </div>

            {/* 工作内容 */}
            <div className="ml-11 space-y-1.5 mb-3">
              {intern.work.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-copper-gold/50 mt-1.5 shrink-0" />
                  <p className="text-magazine-warm/70 text-xs leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* 成果标签 */}
            <div className="ml-11 flex flex-wrap gap-1.5">
              {intern.achievements.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-copper-gold/10 text-copper-gold/80 border border-copper-gold/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 数据框 */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="text-center p-3 border border-magazine-border rounded">
          <p className="text-xl font-serif text-copper-gold">2</p>
          <p className="text-[10px] text-magazine-warm/50">实习单位</p>
        </div>
        <div className="text-center p-3 border border-magazine-border rounded">
          <p className="text-xl font-serif text-copper-gold">10+</p>
          <p className="text-[10px] text-magazine-warm/50">巡检次数</p>
        </div>
        <div className="text-center p-3 border border-magazine-border rounded">
          <p className="text-xl font-serif text-copper-gold">50+</p>
          <p className="text-[10px] text-magazine-warm/50">拉新人数</p>
        </div>
      </div>
    </div>
  )

  const rightContent = (
    <div>
      {/* 校园经历标题 */}
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={16} className="text-copper-gold" />
        <h4 className="text-magazine-cream text-sm font-medium">Campus Life</h4>
      </div>

      {/* 拍立得照片框 */}
      <div className="mb-6 flex justify-center">
        <PolaroidFrame
          caption="Volunteer Team 2024"
          rotation={-2}
        >
          <div className="w-full h-32 bg-gradient-to-br from-amber-900/30 to-orange-900/30 flex items-center justify-center">
            <GraduationCap size={40} className="text-copper-gold/30" />
          </div>
        </PolaroidFrame>
      </div>

      {/* 校园经历列表 */}
      <div className="space-y-4 mb-6">
        {otherData.campus.map((item, idx) => (
          <div key={idx} className="relative pl-4 border-l border-copper-gold/20">
            <div className="absolute left-[-3px] top-1 w-1.5 h-1.5 rounded-full bg-copper-gold/50" />
            <div className="flex items-center justify-between mb-1">
              <h5 className="text-magazine-cream text-xs font-medium">
                {item.role}
              </h5>
              <span className="text-[10px] text-magazine-warm/50 font-mono">
                {item.period}
              </span>
            </div>
            <p className="text-magazine-warm/70 text-xs leading-relaxed mb-1">
              {item.desc}
            </p>
            <p className="text-copper-gold/70 text-[10px]">{item.achievement}</p>
          </div>
        ))}
      </div>

      {/* 便签区 */}
      <div className="relative h-40">
        <div className="absolute top-0 left-0">
          <StickyNote
            front="参与志愿活动20+次"
            back="累计时长100+小时！"
            color="yellow"
            rotation={-3}
          />
        </div>
        <div className="absolute top-4 right-4">
          <StickyNote
            front="优秀网宣部部长"
            back="获得官方认证称号"
            color="blue"
            rotation={2}
          />
        </div>
        <div className="absolute bottom-0 left-8">
          <StickyNote
            front="军训负责人"
            back="连队获教官表扬"
            color="pink"
            rotation={-1}
          />
        </div>
      </div>
    </div>
  )

  return (
    <MagazineSpread
      leftTitle={<span className="font-other-title">Field Report</span>}
      rightTitle={<span className="font-other-title">Campus Life</span>}
      leftContent={leftContent}
      rightContent={rightContent}
      pageNum={4}
      className="magazine-spread"
    />
  )
}
