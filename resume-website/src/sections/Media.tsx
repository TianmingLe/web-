import { Video, MessageSquare, TrendingUp } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import mediaData from '@data/media.json'

export default function Media() {
  return (
    <SectionLayout
      id="media"
      title={mediaData.title}
      subtitle={mediaData.subtitle}
      description={mediaData.description}
      label="自媒体"
      glowColor="energy"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16">
        {mediaData.platforms.map((platform, index) => (
          <GlassCard key={index} className="flex flex-col" glowColor="energy">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-serif text-warm">
                {platform.name}
              </h3>
              <span className="text-warm-faint text-xs font-mono">{platform.nameEn}</span>
            </div>
            <p className="text-3xl font-serif text-energy-light mb-1">{platform.followers}</p>
            <p className="text-xs text-warm-faint mb-4 font-mono">粉丝</p>
            <p className="text-sm text-warm-muted mb-3 font-sans">{platform.content}</p>
            <div className="pt-4 border-t border-white/[0.06] mt-auto">
              <p className="text-xs text-warm-faint mb-1 font-mono">代表作品</p>
              <p className="text-sm text-ai-light font-sans">{platform.representative}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={24} className="text-energy-light" />
          <h3 className="text-2xl font-serif text-warm">内容策略</h3>
        </div>
        <GlassCard className="mb-8" glowColor="ai">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {mediaData.contentStrategy.map((strategy, index) => {
              const colonIdx = strategy.indexOf('：')
              const label = colonIdx > -1 ? strategy.slice(0, colonIdx) : strategy
              const desc = colonIdx > -1 ? strategy.slice(colonIdx + 1) : ''
              return (
                <div key={index} className="flex items-start gap-3 min-w-[220px]">
                  <div>
                    <p className="text-sm font-medium text-warm font-sans">{label}</p>
                    {desc && <p className="text-xs text-warm-faint mt-1 font-sans">{desc}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Video size={24} className="text-ai" />
          <h3 className="text-2xl font-serif text-warm">项目作品</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {mediaData.projects.map((project, index) => (
            <GlassCard key={index} glowColor={project.id === 'steel_4k' ? 'energy' : 'ai'}>
              <h4 className="text-base font-medium text-warm mb-2 font-sans">
                {project.title}
              </h4>
              {'period' in project && project.period && (
                <p className="text-xs text-warm-faint mb-2 font-mono">{project.period}</p>
              )}
              <p className="text-warm-muted text-sm leading-relaxed font-sans">{project.summary}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare size={24} className="text-ai" />
          <h3 className="text-2xl font-serif text-warm">数据分析</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard glowColor="energy">
            <h4 className="text-base font-medium text-warm mb-2 font-sans">内容表现</h4>
            <p className="text-warm-muted text-sm leading-relaxed font-sans">通过数据驱动优化内容策略，持续提升各平台粉丝增长与互动率。</p>
          </GlassCard>
          <GlassCard glowColor="ai">
            <h4 className="text-base font-medium text-warm mb-2 font-sans">用户画像</h4>
            <p className="text-warm-muted text-sm leading-relaxed font-sans">精准定位技术爱好者与学习者群体，提供高价值内容输出。</p>
          </GlassCard>
        </div>
      </div>
    </SectionLayout>
  )
}
