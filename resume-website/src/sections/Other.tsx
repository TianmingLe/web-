import { Award, BadgeCheck, Building2, GraduationCap } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import otherData from '@data/other.json'

export default function Other() {
  return (
    <SectionLayout
      id="other"
      title={otherData.title}
      subtitle={otherData.subtitle}
      description={otherData.description}
      label="其他"
      glowColor="energy"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16">
        <GlassCard className="flex flex-col" glowColor="energy">
          <div className="flex items-center gap-3 mb-4">
            <Award size={20} className="text-energy" />
            <h3 className="text-lg font-serif text-warm">获奖情况</h3>
          </div>
          <div className="space-y-3">
            {otherData.awards.map((award, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-warm-ghost/5 border border-white/[0.06]">
                <div>
                  <p className="text-warm text-sm font-medium font-sans">{award.name}</p>
                  <p className="text-xs text-warm-faint font-sans">{award.year}年 · {award.project}</p>
                </div>
                <span className="px-2 py-0.5 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20 font-sans">
                  {award.level}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col" glowColor="ai">
          <div className="flex items-center gap-3 mb-4">
            <BadgeCheck size={20} className="text-ai" />
            <h3 className="text-lg font-serif text-warm">证书资质</h3>
          </div>
          <div className="space-y-3">
            {otherData.certificates.map((cert, i) => (
              <div key={i} className="p-3 rounded-lg bg-warm-ghost/5 border border-white/[0.06]">
                <p className="text-warm text-sm font-medium font-sans">{cert.name}</p>
                <p className="text-xs text-warm-faint font-sans">{cert.desc}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap size={24} className="text-energy-light" />
          <h3 className="text-2xl font-serif text-warm">校园经历</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherData.campus.map((item, i) => (
            <GlassCard key={i} glowColor="energy">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-medium text-warm font-sans">{item.role}</h4>
                <span className="text-xs text-warm-faint font-mono">{item.period}</span>
              </div>
              <p className="text-warm-muted text-sm font-sans">{item.desc}</p>
              <p className="text-energy-light/80 text-sm mt-1 font-sans">{item.achievement}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Building2 size={24} className="text-ai" />
          <h3 className="text-2xl font-serif text-warm">实习经历</h3>
        </div>
        <GlassCard glowColor="ai">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-lg font-medium text-warm font-sans">{otherData.internship.company}</h4>
              <p className="text-sm text-warm-muted font-sans">{otherData.internship.role}</p>
            </div>
            <span className="text-xs text-warm-faint font-mono">{otherData.internship.period}</span>
          </div>
          <div className="space-y-2 mb-4">
            {otherData.internship.work.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ai/50 mt-1.5 shrink-0" />
                <p className="text-warm-muted text-sm font-sans">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {otherData.internship.achievements.map((item, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans">
                {item}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-energy" />
          <h3 className="text-2xl font-serif text-warm">技能概览</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(otherData.skills).map(([key, skill]) => (
            <GlassCard key={key} glowColor="energy">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-medium text-warm font-sans">
                  {key === 'professional' ? '专业技能' :
                   key === 'programming' ? '编程语言' :
                   key === 'ai' ? 'AI能力' :
                   key === 'media' ? '媒体技能' :
                   key === 'tools' ? '工具软件' : key}
                </h4>
                <span className="text-xs text-energy-light font-mono">{skill.level}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-warm-ghost/5 text-warm-muted border border-white/[0.06] font-sans">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}
