import { Award, BadgeCheck, Building2, GraduationCap, Phone, Mail, ExternalLink } from 'lucide-react'
import ExpandableCard from '@components/ExpandableCard'
import otherData from '@data/other.json'

const SKILL_LABELS: Record<string, string> = {
  professional: '专业技能',
  programming: '编程语言',
  ai: 'AI能力',
  media: '媒体技能',
  tools: '工具软件',
}

function parseStarLevel(level: string): number {
  return [...level].filter(c => c === '★').length
}

function SkillMeter({ level }: { level: string }) {
  const filled = parseStarLevel(level)
  return (
    <div className="b-skill-meter">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`b-skill-dot ${i < filled ? 'b-skill-dot-filled' : ''}`}
        />
      ))}
    </div>
  )
}

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'github':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    case 'bilibili':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="14" rx="3" />
          <path d="M8 2l3 4" />
          <path d="M16 2l-3 4" />
          <circle cx="9.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'xiaohongshu':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z" rx="2" />
          <path d="M9 9l3 6 3-6" />
        </svg>
      )
    case 'douyin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    default:
      return <ExternalLink size={18} />
  }
}

export default function OtherB() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="b-section-header b-fade-up">
        <p className="font-b-sans text-sm tracking-widest uppercase text-b-muted mb-2">
          {otherData.subtitle}
        </p>
        <h2 className="font-b-serif text-4xl md:text-5xl text-b-ink leading-tight">
          {otherData.title}
        </h2>
        <p className="font-b-sans text-b-ink-light mt-4 max-w-2xl text-base leading-relaxed">
          {otherData.description}
        </p>
      </div>

      <div className="space-y-5 mt-10">
        <ExpandableCard
          title="获奖情况"
          icon={<Award size={18} />}
          badge={`${otherData.awards.length}项`}
          cardClass="b-card-terracotta"
          tagClass="b-tag-terracotta"
          expandOnHover
        >
          <div className="space-y-4">
            {otherData.awards.map((award, i) => (
              <div key={i} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-b-serif text-base text-b-ink leading-snug">
                    {award.name}
                  </h4>
                  <p className="font-b-sans text-xs text-b-muted mt-1">
                    {award.project}
                  </p>
                  <p className="font-b-sans text-xs text-b-ink-light mt-0.5">
                    {award.role}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="b-tag b-tag-terracotta">{award.level}</span>
                  <span className="font-b-mono text-xs text-b-muted">
                    {award.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ExpandableCard>

        <ExpandableCard
          title="证书资质"
          icon={<BadgeCheck size={18} />}
          badge={`${otherData.certificates.length}项`}
          cardClass="b-card-sage"
          tagClass="b-tag-sage"
          expandOnHover
        >
          <div className="space-y-4">
            {otherData.certificates.map((cert, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-b-sage-dim flex items-center justify-center shrink-0">
                  <BadgeCheck size={14} className="text-b-sage" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-b-serif text-base text-b-ink leading-snug">
                    {cert.name}
                  </h4>
                  <p className="font-b-sans text-xs text-b-ink-light mt-0.5">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ExpandableCard>

        <ExpandableCard
          title="校园经历"
          subtitle={otherData.campus[0]?.role}
          icon={<GraduationCap size={18} />}
          cardClass="b-card-slate"
          tagClass="b-tag-slate"
          expandOnHover
        >
          <div className="space-y-5">
            {otherData.campus.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-b-serif text-base text-b-ink">
                    {item.role}
                  </h4>
                  <span className="font-b-mono text-xs text-b-muted">
                    {item.period}
                  </span>
                </div>
                <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-2">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta shrink-0" />
                  <p className="font-b-sans text-sm text-b-terracotta font-medium">
                    {item.achievement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ExpandableCard>

        <ExpandableCard
          title={otherData.internship.company}
          subtitle={otherData.internship.role}
          icon={<Building2 size={18} />}
          badge={otherData.internship.period}
          cardClass="b-card-terracotta"
          tagClass="b-tag-terracotta"
          expandOnHover
        >
          <div className="mb-5">
            <p className="font-b-sans text-xs uppercase tracking-widest text-b-muted mb-3">
              工作内容
            </p>
            <div className="space-y-2.5">
              {otherData.internship.work.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta mt-2 shrink-0" />
                  <p className="font-b-sans text-sm text-b-ink-light leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-b-sans text-xs uppercase tracking-widest text-b-muted mb-3">
              核心成果
            </p>
            <div className="flex flex-wrap gap-2">
              {otherData.internship.achievements.map((item, i) => (
                <span key={i} className="b-tag b-tag-terracotta">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ExpandableCard>

        <ExpandableCard
          title="技能概览"
          tags={Object.keys(otherData.skills).map(k => SKILL_LABELS[k] || k)}
          cardClass="b-card-sage"
          tagClass="b-tag-sage"
          expandOnHover
        >
          <div className="space-y-5">
            {Object.entries(otherData.skills).map(([key, skill]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-b-serif text-base text-b-ink">
                    {SKILL_LABELS[key] || key}
                  </h4>
                  <SkillMeter level={skill.level} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="font-b-sans text-xs px-2.5 py-1 rounded-full bg-b-cream-dark text-b-ink-light border border-b-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ExpandableCard>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <Mail size={22} className="text-b-terracotta" />
          <h3 className="font-b-serif text-2xl text-b-ink">联系方式</h3>
          <span className="b-ornament" />
        </div>
        <div className="b-card p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-b-terracotta-dim flex items-center justify-center shrink-0">
                <Phone size={18} className="text-b-terracotta" />
              </div>
              <div>
                <p className="font-b-sans text-xs text-b-muted uppercase tracking-wider mb-0.5">
                  电话
                </p>
                <a
                  href={`tel:${otherData.contact.phone}`}
                  className="font-b-sans text-base text-b-ink b-underline-hover"
                >
                  {otherData.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-b-sage-dim flex items-center justify-center shrink-0">
                <Mail size={18} className="text-b-sage" />
              </div>
              <div>
                <p className="font-b-sans text-xs text-b-muted uppercase tracking-wider mb-0.5">
                  邮箱
                </p>
                <a
                  href={`mailto:${otherData.contact.email}`}
                  className="font-b-sans text-base text-b-ink b-underline-hover"
                >
                  {otherData.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="font-b-sans text-xs text-b-muted uppercase tracking-wider mb-4">
              社交平台
            </p>
            <div className="flex flex-wrap gap-3">
              {otherData.contact.social.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-b-cream-dark border border-b-border hover:border-b-border-hover hover:bg-b-sand/30 transition-all duration-300 group"
                >
                  <span className="text-b-ink-light group-hover:text-b-terracotta transition-colors duration-300">
                    <SocialIcon icon={s.icon} />
                  </span>
                  <span className="font-b-sans text-sm text-b-ink-light group-hover:text-b-ink transition-colors duration-300">
                    {s.name}
                  </span>
                  <ExternalLink size={12} className="text-b-muted group-hover:text-b-terracotta transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
