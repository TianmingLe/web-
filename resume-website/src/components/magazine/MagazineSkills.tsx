import { useState } from 'react'
import otherData from '@data/other.json'
import RadarChart from './RadarChart'
import { CornerOrnament } from './MagazineDecorations'

const skillLabels: Record<string, string> = {
  professional: '专业技能',
  programming: '编程语言',
  ai: 'AI 能力',
  media: '媒体技能',
  tools: '工具软件',
}

const skillLevels: Record<string, number> = {
  '★★★★★': 5,
  '★★★★☆': 4,
  '★★★☆☆': 3,
}

export default function MagazineSkills() {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  const radarData = Object.entries(otherData.skills).map(([key, skill]) => ({
    label: skillLabels[key] ?? key,
    value: skillLevels[skill.level] || 4,
  }))

  // 所有技能项打平，用于标签云
  const allTags = Object.entries(otherData.skills).flatMap(([key, skill]) =>
    skill.items.map((item) => ({
      name: item,
      category: skillLabels[key] ?? key,
      level: skill.level,
    }))
  )

  // 根据技能名称长度决定标签大小
  const getTagSize = (name: string) => {
    if (name.length <= 4) return 'text-xs px-2.5 py-1'
    if (name.length <= 8) return 'text-[11px] px-2 py-0.5'
    return 'text-[10px] px-1.5 py-0.5'
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div
          className="relative rounded-lg p-6 md:p-10"
          style={{ background: '#14110F' }}
        >
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          {/* 标题 */}
          <div className="text-center mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-copper-gold/50 uppercase mb-2">
              Skills Column
            </p>
            <h2 className="font-other-title text-2xl md:text-3xl text-magazine-cream">
              技能矩阵
            </h2>
          </div>

          {/* 雷达图 + 标签云 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            {/* 左侧：雷达图 */}
            <div>
              <RadarChart data={radarData} size={280} />
              <div className="flex justify-center gap-6 mt-4">
                {radarData.map((d, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] text-magazine-warm/50">{d.label}</p>
                    <p className="text-sm font-mono text-copper-gold">
                      {d.value}★
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧：标签云 */}
            <div>
              <p className="text-magazine-warm/50 text-[10px] font-mono uppercase tracking-wider mb-4">
                Skill Cloud
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, i) => (
                  <span
                    key={i}
                    className={`rounded-full border transition-all duration-200 cursor-default ${getTagSize(tag.name)} ${
                      hoveredTag === tag.name
                        ? 'bg-copper-gold/20 text-copper-gold border-copper-gold/40 scale-110'
                        : 'bg-magazine-card text-magazine-warm/70 border-magazine-border hover:border-copper-gold/30'
                    }`}
                    onMouseEnter={() => setHoveredTag(tag.name)}
                    onMouseLeave={() => setHoveredTag(null)}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* 悬停提示 */}
              {hoveredTag && (
                <div className="mt-4 p-3 rounded bg-magazine-card border border-magazine-border">
                  <p className="text-copper-gold text-xs">{hoveredTag}</p>
                  <p className="text-magazine-warm/50 text-[10px] mt-1">
                    {
                      allTags.find((t) => t.name === hoveredTag)?.category
                    } · {' '}
                    {
                      allTags.find((t) => t.name === hoveredTag)?.level
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 底部：技能总览表格 */}
          <div className="border-t border-magazine-border pt-6">
            <p className="text-magazine-warm/50 text-[10px] font-mono uppercase tracking-wider mb-4">
              Skill Overview
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(otherData.skills).map(([key, skill]) => (
                <div
                  key={key}
                  className="p-3 border border-magazine-border rounded text-center"
                >
                  <p className="text-magazine-warm text-xs mb-1">
                    {skillLabels[key] ?? key}
                  </p>
                  <p className="text-copper-gold text-sm font-mono">
                    {skill.level}
                  </p>
                  <p className="text-magazine-warm/40 text-[10px] mt-1">
                    {skill.items.length} 项
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
