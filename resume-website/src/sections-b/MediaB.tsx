import { Video, MessageSquare, TrendingUp, Play, Eye, Users } from 'lucide-react'
import mediaData from '@data/media.json'
import ExpandableCard from '@components/ExpandableCard'

const platformIcons = [Play, Video, Eye]

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export default function MediaB() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="b-section-header b-fade-up">
        <p className="font-b-mono text-xs tracking-[0.2em] uppercase text-b-terracotta mb-3">
          {mediaData.subtitle}
        </p>
        <h2 className="font-b-serif text-4xl md:text-5xl text-b-ink leading-tight">
          {mediaData.title}
        </h2>
        <p className="font-b-sans text-b-ink-light mt-4 max-w-2xl leading-relaxed text-base">
          {mediaData.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {mediaData.platforms.map((platform, index) => {
          const Icon = platformIcons[index % platformIcons.length]
          return (
            <div
              key={index}
              className={`b-card b-card-terracotta p-4 b-fade-up b-stagger-${index + 1}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-b-terracotta-dim flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-b-terracotta" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-b-serif text-base text-b-ink">{platform.name}</h3>
                    <span className="font-b-mono text-[11px] text-b-muted tracking-wide">
                      {platform.nameEn}
                    </span>
                  </div>
                </div>
                <span className="b-number-accent text-lg">{platform.followers}</span>
              </div>
              <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                {platform.content}
              </p>
            </div>
          )
        })}
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-4">
        <ExpandableCard
          title={
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-b-sage-dim flex items-center justify-center">
                <Users size={15} className="text-b-sage" />
              </div>
              <h3 className="font-b-serif text-2xl text-b-ink">内容策略</h3>
            </div>
          }
          keywords={mediaData.contentStrategy.map((strategy) => {
            const colonIdx = strategy.indexOf('：')
            const label = colonIdx > -1 ? strategy.slice(0, colonIdx) : strategy
            return (
              <span key={label} className="b-tag b-tag-sage">
                {label}
              </span>
            )
          })}
          cardClass="b-card b-card-sage"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaData.contentStrategy.map((strategy, index) => {
              const colonIdx = strategy.indexOf('：')
              const label = colonIdx > -1 ? strategy.slice(0, colonIdx) : strategy
              const desc = colonIdx > -1 ? strategy.slice(colonIdx + 1) : ''
              const icons = [TrendingUp, MessageSquare, Play, Eye]
              const StrategyIcon = icons[index % icons.length]
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-b-sage-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                    <StrategyIcon size={16} className="text-b-sage" />
                  </div>
                  <div>
                    <p className="font-b-sans text-sm font-semibold text-b-ink mb-1">{label}</p>
                    {desc && (
                      <p className="font-b-sans text-sm text-b-ink-light leading-relaxed">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-b-slate-dim flex items-center justify-center">
            <Video size={15} className="text-b-slate" />
          </div>
          <h3 className="font-b-serif text-2xl text-b-ink">项目作品</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mediaData.projects.map((project, index) => (
            <ExpandableCard
              key={project.id}
              title={project.title}
              badges={
                <span className="b-tag b-tag-terracotta flex-shrink-0 text-[11px]">
                  {project.period}
                </span>
              }
              subtitle={truncate(project.summary, 50)}
              keywords={project.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="b-tag b-tag-terracotta">
                  {tag}
                </span>
              ))}
              cardClass="b-card b-card-slate"
              className={`b-fade-up b-stagger-${index + 5}`}
            >
              <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-4">
                {project.summary}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="b-tag b-tag-terracotta">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="pt-4 border-t border-b-border">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-3">
                    Highlights
                  </p>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta mt-1.5 flex-shrink-0" />
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.outcomes && project.outcomes.length > 0 && (
                <div className="pt-4 border-t border-b-border">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-3">
                    Outcomes
                  </p>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-b-sage mt-1.5 flex-shrink-0" />
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {outcome}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.impact && project.impact.length > 0 && (
                <div className="pt-4 border-t border-b-border">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-3">
                    Impact
                  </p>
                  <ul className="space-y-2">
                    {project.impact.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta mt-1.5 flex-shrink-0" />
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.activities && project.activities.length > 0 && (
                <div className="pt-4 border-t border-b-border">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-3">
                    Activities
                  </p>
                  <ul className="space-y-2">
                    {project.activities.map((activity, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-b-slate mt-1.5 flex-shrink-0" />
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {activity}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.lessons && (
                <div className="pt-4 border-t border-b-border mt-4">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-2">
                    Lessons
                  </p>
                  <p className="font-b-sans text-xs text-b-ink-light leading-relaxed italic">
                    {project.lessons}
                  </p>
                </div>
              )}

              {project.workflow && project.workflow.length > 0 && (
                <div className="pt-4 border-t border-b-border">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-3">
                    Workflow
                  </p>
                  <div className="b-progress-bar mb-2">
                    <div className="b-progress-fill" style={{ width: '100%' }} />
                  </div>
                  <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                    {project.workflow.join(' → ')}
                  </p>
                </div>
              )}
            </ExpandableCard>
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="b-card b-card-terracotta p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-b-terracotta-dim flex items-center justify-center mx-auto mb-4">
              <Play size={20} className="text-b-terracotta" />
            </div>
            <span className="b-number-accent text-3xl">21,500+</span>
            <p className="font-b-sans text-sm text-b-muted mt-2">全平台粉丝</p>
          </div>
          <div className="b-card b-card-sage p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-b-sage-dim flex items-center justify-center mx-auto mb-4">
              <Eye size={20} className="text-b-sage" />
            </div>
            <span className="b-number-accent text-3xl" style={{ color: 'var(--color-b-sage)' }}>
              60万+
            </span>
            <p className="font-b-sans text-sm text-b-muted mt-2">累计播放量</p>
          </div>
          <div className="b-card b-card-slate p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-b-slate-dim flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={20} className="text-b-slate" />
            </div>
            <span className="b-number-accent text-3xl" style={{ color: 'var(--color-b-slate)' }}>
              4
            </span>
            <p className="font-b-sans text-sm text-b-muted mt-2">平台运营</p>
          </div>
        </div>
      </div>
    </section>
  )
}
