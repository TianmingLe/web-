import { Target, Code2, Kanban, Compass, Lightbulb, Award, BookOpen, Users } from 'lucide-react'
import thoughtData from '@data/thought.json'
import ExpandableCard from '@components/ExpandableCard'

const advantageIcons = [Lightbulb, Compass, Code2, BookOpen, Users]

export default function ThoughtB() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 max-w-6xl mx-auto">
      <div className="b-section-header b-fade-up">
        <p className="font-b-mono text-xs tracking-[0.2em] uppercase text-b-terracotta mb-3">
          思想领域
        </p>
        <h2 className="font-b-serif text-4xl md:text-5xl text-b-ink leading-tight mb-3">
          {thoughtData.title}
        </h2>
        <p className="font-b-sans text-b-muted text-lg">{thoughtData.subtitle}</p>
      </div>

      <p className="font-b-sans text-b-ink-light text-base leading-relaxed max-w-3xl mb-12 b-fade-up b-stagger-1">
        {thoughtData.description}
      </p>

      <div className="relative pl-8 pr-6 py-6 mb-16 b-card b-fade-up b-stagger-2" style={{ borderLeft: '3px solid var(--color-b-terracotta)' }}>
        <span className="b-quote-mark">&ldquo;</span>
        <div className="relative z-10 pl-4">
          <p className="font-b-serif text-xl md:text-2xl text-b-ink italic leading-relaxed">
            {thoughtData.guidingThought}
          </p>
        </div>
      </div>

      <div className="b-divider" />

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-10 b-fade-up">
          <Target size={22} className="text-b-terracotta" />
          <h3 className="font-b-serif text-2xl md:text-3xl text-b-ink">职业规划时间轴</h3>
        </div>

        <div className="relative ml-2">
          <div className="b-timeline-line" />
          <div className="space-y-10">
            {thoughtData.career.map((item, index) => (
              <div key={index} className={`relative pl-10 b-fade-up b-stagger-${index + 1}`}>
                <div className="b-timeline-dot" />
                <ExpandableCard
                  cardClass="b-card b-card-terracotta"
                  title={item.phase}
                  badges={
                    <span className="b-tag b-tag-terracotta font-b-mono text-xs">
                      Phase {index + 1}
                    </span>
                  }
                  keywords={
                    <>
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="b-tag b-tag-terracotta">{tag}</span>
                      ))}
                    </>
                  }
                  subtitle={item.content.length > 50 ? item.content.slice(0, 50) + '…' : item.content}
                >
                  <p className="font-b-sans text-b-ink-light text-sm leading-relaxed mb-4">
                    {item.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="b-tag b-tag-terracotta">{tag}</span>
                    ))}
                  </div>
                </ExpandableCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="b-divider" />

      <div className="mb-16 b-fade-up b-stagger-1">
        <ExpandableCard
          cardClass="b-card b-card-sage"
          title={
            <div className="flex items-center gap-2.5">
              <Award size={18} className="text-b-sage" />
              <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">核心优势</h3>
            </div>
          }
          keywords={
            <>
              {thoughtData.coreAdvantages.slice(0, 3).map((adv, i) => (
                <span key={i} className="b-tag b-tag-sage">{adv.split('：')[0]}</span>
              ))}
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {thoughtData.coreAdvantages.map((adv, index) => {
              const IconComponent = advantageIcons[index]
              return (
                <div key={index} className="b-card b-card-sage p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-b-sage-dim flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={22} className="text-b-sage" />
                  </div>
                  <p className="font-b-sans text-b-ink-light text-sm leading-relaxed">{adv}</p>
                </div>
              )
            })}
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="mb-16 b-fade-up b-stagger-1">
        <ExpandableCard
          cardClass="b-card b-card-terracotta"
          title={
            <div className="flex items-center gap-2.5">
              <Code2 size={18} className="text-b-terracotta" />
              <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">
                {thoughtData.vibeCoding.title}
              </h3>
            </div>
          }
          subtitle={thoughtData.vibeCoding.description.length > 50 ? thoughtData.vibeCoding.description.slice(0, 50) + '…' : thoughtData.vibeCoding.description}
          keywords={
            <>
              {thoughtData.vibeCoding.cases.slice(0, 3).map((c, i) => (
                <span key={i} className="b-tag b-tag-slate">{c.split('（')[0].split('：')[0]}</span>
              ))}
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-10">
            {thoughtData.vibeCoding.steps.map((step, index) => (
              <div key={index} className="b-card b-card-terracotta p-6 relative overflow-hidden">
                <span className="b-number-accent absolute top-3 right-4 opacity-15">
                  {index + 1}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="b-number-accent text-2xl">{index + 1}</span>
                    <span className="font-b-sans text-b-muted text-xs tracking-wide uppercase">
                      Step
                    </span>
                  </div>
                  <h4 className="font-b-serif text-lg text-b-ink mb-2">{step.title}</h4>
                  <p className="font-b-sans text-b-ink-light text-sm leading-relaxed">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="font-b-mono text-xs tracking-[0.15em] uppercase text-b-muted mb-4">
              实践案例
            </p>
            <div className="flex flex-wrap gap-3">
              {thoughtData.vibeCoding.cases.map((c, index) => (
                <span key={index} className="b-tag b-tag-slate">{c}</span>
              ))}
            </div>
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="mb-16 b-fade-up b-stagger-1">
        <ExpandableCard
          cardClass="b-card b-card-slate"
          title={
            <div className="flex items-center gap-2.5">
              <Compass size={18} className="text-b-slate" />
              <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">
                {thoughtData.techSelection.title}
              </h3>
            </div>
          }
          subtitle={thoughtData.techSelection.subtitle}
          keywords={
            <>
              {thoughtData.techSelection.principles.map((p, i) => (
                <span key={i} className="b-tag b-tag-slate">{p.dimension}</span>
              ))}
            </>
          }
        >
          <div className="b-card b-card-slate p-6 mb-8">
            <p className="font-b-mono text-xs tracking-[0.15em] uppercase text-b-slate mb-3">
              案例研究
            </p>
            <p className="font-b-sans text-b-ink-light text-base leading-relaxed">
              {thoughtData.techSelection.caseStudy}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {thoughtData.techSelection.principles.map((p, index) => (
              <div key={index} className="b-card b-card-slate p-6">
                <div className="w-10 h-10 rounded-full bg-b-slate-dim flex items-center justify-center mb-4">
                  <span className="font-b-serif text-b-slate text-lg font-bold">
                    {p.dimension.charAt(0)}
                  </span>
                </div>
                <h4 className="font-b-serif text-lg text-b-ink mb-2">{p.dimension}</h4>
                <p className="font-b-sans text-b-ink-light text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="mb-16 b-fade-up b-stagger-1">
        <ExpandableCard
          cardClass="b-card b-card-terracotta"
          title={
            <div className="flex items-center gap-2.5">
              <Kanban size={18} className="text-b-terracotta" />
              <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">
                {thoughtData.projectManagement.title}
              </h3>
            </div>
          }
          subtitle={thoughtData.projectManagement.description.length > 50 ? thoughtData.projectManagement.description.slice(0, 50) + '…' : thoughtData.projectManagement.description}
          keywords={
            <>
              {[...new Set(thoughtData.projectManagement.competitions.map(c => c.level))].map((level, i) => (
                <span key={i} className="b-tag b-tag-terracotta">{level}</span>
              ))}
            </>
          }
        >
          <div className="space-y-5 mb-12">
            {thoughtData.projectManagement.competitions.map((comp, index) => (
              <div key={index} className="b-card b-card-terracotta p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-b-serif text-lg text-b-ink">{comp.name}</h4>
                    <span className="b-tag b-tag-terracotta">{comp.level}</span>
                  </div>
                  <span className="font-b-mono text-xs text-b-muted">{comp.period}</span>
                </div>
                {'project' in comp && comp.project && (
                  <p className="font-b-sans text-b-slate text-sm mb-3 italic">{comp.project}</p>
                )}
                <p className="font-b-sans text-b-ink-light text-sm leading-relaxed mb-3">
                  {comp.work}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-b-sans text-b-muted">
                  <span className="flex items-center gap-1.5">
                    <Users size={12} className="text-b-terracotta-light" />
                    {comp.role}
                  </span>
                  {'teamSize' in comp && comp.teamSize && (
                    <span className="flex items-center gap-1.5">
                      <Users size={12} className="text-b-terracotta-light" />
                      {comp.teamSize}人团队
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="font-b-mono text-xs tracking-[0.15em] uppercase text-b-muted mb-5">
              团队角色
            </p>
            <div className="flex flex-wrap gap-3">
              {thoughtData.projectManagement.roles.map((role, index) => (
                <span key={index} className="b-tag b-tag-sage">{role}</span>
              ))}
            </div>
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="text-center b-fade-up b-stagger-8">
        <span className="b-ornament" />
        <span className="b-ornament" />
        <span className="b-ornament" />
      </div>
    </section>
  )
}
