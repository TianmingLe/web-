import { Target, Code2, Compass, Award, BookOpen, Users } from 'lucide-react'
import thoughtData from '@data/thought.json'
import ExpandableCard from '@components/ExpandableCard'

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

      <p className="font-b-serif text-b-ink-light text-base italic leading-relaxed max-w-3xl mb-12 b-fade-up b-stagger-1">
        {thoughtData.guidingThought}
      </p>

      <div className="b-divider" />

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-10 b-fade-up">
          <Target size={22} className="text-b-terracotta" />
          <h3 className="font-b-serif text-2xl md:text-3xl text-b-ink">职业规划时间轴</h3>
        </div>

        <div className="space-y-4">
          {thoughtData.career.map((item, index) => (
            <ExpandableCard
              key={index}
              title={item.phase}
              tags={item.tags}
              icon={<Target size={16} />}
              badge={`Phase ${index + 1}`}
              cardClass="b-card-terracotta"
              tagClass="b-tag-terracotta"
            >
              <p className="font-b-sans text-b-ink-light text-sm leading-relaxed mb-4">
                {item.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="b-tag b-tag-terracotta">
                    {tag}
                  </span>
                ))}
              </div>
            </ExpandableCard>
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-10 b-fade-up">
          <Award size={22} className="text-b-sage" />
          <h3 className="font-b-serif text-2xl md:text-3xl text-b-ink">核心优势</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {thoughtData.coreAdvantages.map((adv, index) => (
            <div key={index} className="text-center b-fade-up b-stagger-1">
              <span className="b-ornament" />
              <p className="font-b-sans text-b-ink-light text-sm leading-relaxed mt-3">{adv}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <div className="mb-16">
        <ExpandableCard
          title={thoughtData.vibeCoding.title}
          badge="5步方法论"
          icon={<Code2 size={16} />}
          cardClass="b-card-terracotta"
          tagClass="b-tag-terracotta"
        >
          <p className="font-b-sans text-b-ink-light text-sm leading-relaxed mb-6">
            {thoughtData.vibeCoding.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {thoughtData.vibeCoding.steps.map((step, index) => (
              <div key={index} className="relative overflow-hidden">
                <span className="b-number-accent text-2xl">{index + 1}</span>
                <h4 className="font-b-serif text-base text-b-ink mb-1">{step.title}</h4>
                <p className="font-b-sans text-b-ink-light text-xs leading-relaxed">
                  {step.content}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-b-mono text-xs tracking-[0.15em] uppercase text-b-muted mb-3">
              实践案例
            </p>
            <div className="flex flex-wrap gap-2">
              {thoughtData.vibeCoding.cases.map((c, index) => (
                <span key={index} className="b-tag b-tag-slate">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="mb-16">
        <ExpandableCard
          title={thoughtData.techSelection.title}
          subtitle={thoughtData.techSelection.subtitle}
          icon={<Compass size={16} />}
          cardClass="b-card-terracotta"
          tagClass="b-tag-terracotta"
        >
          <div className="b-card b-card-slate p-5 mb-6">
            <p className="font-b-mono text-xs tracking-[0.15em] uppercase text-b-slate mb-2">
              案例研究
            </p>
            <p className="font-b-sans text-b-ink-light text-sm leading-relaxed">
              {thoughtData.techSelection.caseStudy}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {thoughtData.techSelection.principles.map((p, index) => (
              <div key={index}>
                <div className="w-8 h-8 rounded-full bg-b-slate-dim flex items-center justify-center mb-3">
                  <span className="font-b-serif text-b-slate text-sm font-bold">
                    {p.dimension.charAt(0)}
                  </span>
                </div>
                <h4 className="font-b-serif text-base text-b-ink mb-1">{p.dimension}</h4>
                <p className="font-b-sans text-b-ink-light text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="mb-16">
        <ExpandableCard
          title={thoughtData.projectManagement.title}
          subtitle={thoughtData.projectManagement.competitions[0].name}
          icon={<BookOpen size={16} />}
          cardClass="b-card-terracotta"
          tagClass="b-tag-terracotta"
        >
          <div className="space-y-4 mb-8">
            {thoughtData.projectManagement.competitions.map((comp, index) => (
              <div key={index} className="border-b border-b-border pb-4 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-b-serif text-base text-b-ink">{comp.name}</h4>
                    <span className="b-tag b-tag-terracotta">{comp.level}</span>
                  </div>
                  <span className="font-b-mono text-xs text-b-muted">{comp.period}</span>
                </div>
                {'project' in comp && comp.project && (
                  <p className="font-b-sans text-b-slate text-xs mb-2 italic">{comp.project}</p>
                )}
                <p className="font-b-sans text-b-ink-light text-sm leading-relaxed mb-2">
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
            <p className="font-b-mono text-xs tracking-[0.15em] uppercase text-b-muted mb-3">
              团队角色
            </p>
            <div className="flex flex-wrap gap-2">
              {thoughtData.projectManagement.roles.map((role, index) => (
                <span key={index} className="b-tag b-tag-sage">
                  {role}
                </span>
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
