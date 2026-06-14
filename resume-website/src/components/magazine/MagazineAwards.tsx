import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Award, Medal } from 'lucide-react'
import otherData from '@data/other.json'
import MagazineSpread from './MagazineSpread'
import CertificateCard from './CertificateCard'
import { DropCap } from './MagazineDecorations'

function AwardItem({
  award,
}: {
  award: (typeof otherData.awards)[0]
}) {
  const isGold = award.level.includes('一等')
  const isSilver = award.level.includes('二等')

  return (
    <div className="flex items-start gap-4 py-4 border-b border-magazine-border/50 last:border-0 group">
      {/* 年份 - 竖排 */}
      <div className="shrink-0 w-12">
        <span
          className="block text-2xl font-serif text-copper-gold/60 leading-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {award.year}
        </span>
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <h4 className="text-magazine-cream text-sm font-medium mb-1 group-hover:text-copper-gold transition-colors">
          {award.name}
        </h4>
        <p className="text-magazine-warm/70 text-xs leading-relaxed mb-1">
          {award.project}
        </p>
        <p className="text-magazine-warm/50 text-[10px]">{award.role}</p>
      </div>

      {/* 徽章 */}
      <div className="shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isGold
              ? 'bg-amber-500/20 text-amber-400'
              : isSilver
                ? 'bg-gray-400/20 text-gray-300'
                : 'bg-orange-700/20 text-orange-400'
          }`}
        >
          {isGold ? <Medal size={18} /> : <Award size={16} />}
        </div>
      </div>
    </div>
  )
}

export default function MagazineAwards() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean)
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: items[0]?.closest('.magazine-spread'),
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const leftContent = (
    <div>
      <div className="mb-6">
        <DropCap>
          在学术竞赛与实践中不断突破，累计获得省级奖项2项、校级奖项2项，涵盖数学建模、市场调查、英语视频制作等多个领域。
        </DropCap>
      </div>

      <div className="space-y-1">
        {otherData.awards.map((award, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el }}
            style={{ opacity: 0 }}
          >
            <AwardItem award={award} />
          </div>
        ))}
      </div>

      {/* 统计框 */}
      <div className="mt-6 p-4 border border-copper-gold/20 rounded-lg bg-copper-gold/5">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-serif text-copper-gold">4</p>
            <p className="text-[10px] text-magazine-warm/50 uppercase">Total Awards</p>
          </div>
          <div className="w-px h-8 bg-magazine-border" />
          <div className="text-center">
            <p className="text-2xl font-serif text-copper-gold">2</p>
            <p className="text-[10px] text-magazine-warm/50 uppercase">Provincial</p>
          </div>
          <div className="w-px h-8 bg-magazine-border" />
          <div className="text-center">
            <p className="text-2xl font-serif text-copper-gold">2</p>
            <p className="text-[10px] text-magazine-warm/50 uppercase">School-level</p>
          </div>
        </div>
      </div>
    </div>
  )

  const rightContent = (
    <div>
      <p className="text-magazine-warm/70 text-xs mb-4 italic">
        证书不仅是能力的证明，更是持续学习的见证。
      </p>
      <div className="grid grid-cols-2 gap-3">
        {otherData.certificates.map((cert, i) => (
          <CertificateCard key={i} name={cert.name} desc={cert.desc} />
        ))}
      </div>
    </div>
  )

  return (
    <MagazineSpread
      leftTitle="Hall of Honor"
      rightTitle="Certificate Gallery"
      leftContent={leftContent}
      rightContent={rightContent}
      pageNum={2}
      className="magazine-spread"
    />
  )
}
