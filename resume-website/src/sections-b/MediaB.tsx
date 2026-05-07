import { Video, Play, Eye, TrendingUp } from 'lucide-react'
import ExpandableCard from '@components/ExpandableCard'
import mediaData from '@data/media.json'

const platformIcons = [Play, Video, Eye]

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        {mediaData.platforms.map((platform, index) => {
          const Icon = platformIcons[index % platformIcons.length]
          return (
            <div
              key={index}
              className={`b-card b-card-terracotta p-5 md:p-6 b-fade-up b-stagger-${index + 1}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-b-terracotta-dim flex items-center justify-center">
                  <Icon size={16} className="text-b-terracotta" />
                </div>
                <div>
                  <h3 className="font-b-serif text-base text-b-ink">{platform.name}</h3>
                  <p className="font-b-mono text-[10px] text-b-muted tracking-wide">
                    {platform.nameEn}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="b-number-accent">{platform.followers}</span>
                  <p className="font-b-sans text-[11px] text-b-muted mt-0.5">粉丝关注</p>
                </div>
                <span className="b-tag b-tag-terracotta text-[10px]">{platform.content}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-b-slate-dim flex items-center justify-center">
            <Video size={15} className="text-b-slate" />
          </div>
          <h3 className="font-b-serif text-2xl text-b-ink">项目作品</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mediaData.projects.map((project) => (
            <ExpandableCard
              key={project.id}
              title={project.title}
              badge={project.period}
              tags={project.tags?.slice(0, 2)}
              icon={<TrendingUp size={16} />}
              cardClass="b-card-slate"
              tagClass="b-tag-slate"
            >
              <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-4">
                {project.summary}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="b-tag b-tag-slate">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-4">
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-3">
                    Highlights
                  </p>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-b-slate mt-1.5 flex-shrink-0" />
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.outcomes && project.outcomes.length > 0 && (
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
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

              {project.workflow && project.workflow.length > 0 && (
                <div className="mb-4">
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

              {project.lessons && (
                <div>
                  <p className="font-b-mono text-[11px] text-b-muted tracking-wider uppercase mb-2">
                    Lessons
                  </p>
                  <p className="font-b-sans text-xs text-b-ink-light leading-relaxed italic">
                    {project.lessons}
                  </p>
                </div>
              )}
            </ExpandableCard>
          ))}
        </div>
      </div>
    </section>
  )
}
