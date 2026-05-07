import { Award, BadgeCheck, Building2, GraduationCap, Phone, Mail, ExternalLink, MapPin } from 'lucide-react'
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

      <div className="b-fade-up b-stagger-1">
        <div className="flex items-center gap-3 mb-6">
          <Award size={22} className="text-b-terracotta" />
          <h3 className="font-b-serif text-2xl text-b-ink">获奖荣誉</h3>
          <span className="b-ornament" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {otherData.awards.map((award, i) => (
            <div
              key={i}
              className="b-card b-card-terracotta p-5 md:p-6 b-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="b-tag b-tag-terracotta">{award.level}</span>
                <span className="font-b-mono text-xs text-b-muted whitespace-nowrap">
                  {award.year}
                </span>
              </div>
              <h4 className="font-b-serif text-lg text-b-ink mb-2 leading-snug">
                {award.name}
              </h4>
              <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-2">
                {award.project}
              </p>
              <p className="font-b-sans text-xs text-b-muted">
                {award.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-2">
        <div className="flex items-center gap-3 mb-6">
          <BadgeCheck size={22} className="text-b-sage" />
          <h3 className="font-b-serif text-2xl text-b-ink">证书资质</h3>
          <span className="b-ornament" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherData.certificates.map((cert, i) => (
            <div
              key={i}
              className="b-card b-card-sage p-5 b-fade-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-b-sage-dim flex items-center justify-center">
                  <BadgeCheck size={16} className="text-b-sage" />
                </div>
                <h4 className="font-b-serif text-base text-b-ink leading-snug">
                  {cert.name}
                </h4>
              </div>
              <p className="font-b-sans text-sm text-b-ink-light leading-relaxed">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-3">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap size={22} className="text-b-slate" />
          <h3 className="font-b-serif text-2xl text-b-ink">校园经历</h3>
          <span className="b-ornament" />
        </div>
        <div className="relative pl-10">
          <div className="b-timeline-line" />
          {otherData.campus.map((item, i) => (
            <div
              key={i}
              className="relative mb-6 last:mb-0 b-fade-up"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="b-timeline-dot" />
              <div className="b-card b-card-slate p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-b-serif text-lg text-b-ink">
                    {item.role}
                  </h4>
                  <span className="font-b-mono text-xs text-b-muted">
                    {item.period}
                  </span>
                </div>
                <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta shrink-0" />
                  <p className="font-b-sans text-sm text-b-terracotta font-medium">
                    {item.achievement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-4">
        <div className="flex items-center gap-3 mb-6">
          <Building2 size={22} className="text-b-terracotta" />
          <h3 className="font-b-serif text-2xl text-b-ink">实习经历</h3>
          <span className="b-ornament" />
        </div>
        <div className="b-card b-card-terracotta p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-5">
            <div>
              <h4 className="font-b-serif text-xl md:text-2xl text-b-ink">
                {otherData.internship.company}
              </h4>
              <p className="font-b-sans text-sm text-b-ink-light mt-1">
                {otherData.internship.role}
              </p>
            </div>
            <span className="font-b-mono text-xs text-b-muted bg-b-cream-dark px-3 py-1.5 rounded-full self-start">
              {otherData.internship.period}
            </span>
          </div>

          <div className="mb-6">
            <p className="font-b-sans text-xs uppercase tracking-widest text-b-muted mb-3">
              工作内容
            </p>
            <div className="space-y-3">
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
        </div>
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-5">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={22} className="text-b-terracotta" />
          <h3 className="font-b-serif text-2xl text-b-ink">技能概览</h3>
          <span className="b-ornament" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(otherData.skills).map(([key, skill], i) => (
            <div
              key={key}
              className="b-card p-5 b-fade-up"
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-b-serif text-lg text-b-ink">
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
      </div>

      <div className="b-divider" />

      <div className="b-fade-up b-stagger-6">
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
