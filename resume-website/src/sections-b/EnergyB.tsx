import { Monitor, Code, Cpu, FlaskConical, ClipboardList } from 'lucide-react'
import ExpandableCard from '@components/ExpandableCard'
import energyData from '@data/energy.json'

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={22} strokeWidth={1.5} />,
  code: <Code size={22} strokeWidth={1.5} />,
  cpu: <Cpu size={22} strokeWidth={1.5} />,
  'flask-conical': <FlaskConical size={22} strokeWidth={1.5} />,
  'clipboard-list': <ClipboardList size={22} strokeWidth={1.5} />,
}

const proficiencyMap: Record<string, number> = {
  '专业仿真与设计软件': 5,
  '编程与数据分析': 4,
  '控制与嵌入式系统': 4,
  '实验与实操能力': 3,
  '工程管理与经济': 3,
}

const itemProficiency: Record<string, number> = {
  'EBSILON Professional': 5,
  'ANSYS Fluent': 4,
  'ANSYS Mechanical': 4,
  'ASPEN Plus': 3,
  'COMSOL': 3,
  'AutoCAD': 5,
  'SolidWorks': 4,
  'Python': 5,
  'C/C++': 4,
  'SQL': 4,
  'Java/HTTP': 3,
  'PLC': 3,
  '51单片机': 4,
  'STM32': 5,
  'Keil/STM32CubeIDE': 4,
  'UART/I2C/SPI/CAN': 4,
  '温度测量': 4,
  '流量测量': 4,
  'NI DAQ': 3,
  '实验设计': 4,
  'PERT/甘特图': 3,
  'ROI/NPV评估': 3,
  '成本控制': 3,
  '风险评估': 3,
}

function SkillMeter({ level }: { level: number }) {
  return (
    <div className="b-skill-meter">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`b-skill-dot ${i < level ? 'b-skill-dot-filled' : ''}`}
        />
      ))}
    </div>
  )
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export default function EnergyB() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 pt-24 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto">
      <div className="b-section-header b-fade-up">
        <p className="font-b-mono text-xs text-b-terracotta tracking-[0.2em] uppercase mb-3">
          Core Competencies
        </p>
        <h2 className="font-b-serif text-4xl md:text-5xl text-b-ink mb-3 tracking-tight">
          {energyData.title}
        </h2>
        <p className="font-b-sans text-lg text-b-ink-light mb-4">
          {energyData.subtitle}
        </p>
        <p className="font-b-sans text-sm text-b-muted leading-relaxed max-w-2xl">
          {energyData.description}
        </p>
      </div>

      <div className="b-divider b-fade-in b-stagger-1" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {energyData.skills.map((skill, index) => {
          const categoryLevel = proficiencyMap[skill.category] ?? 3
          const keywordList = skill.keywords.split('、')
          const displayKeywords = keywordList.slice(0, 4)

          return (
            <ExpandableCard
              key={index}
              cardClass="b-card b-card-terracotta"
              className={`b-fade-up b-stagger-${index + 1}`}
              title={
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-b-terracotta-dim text-b-terracotta">
                    {iconMap[skill.icon]}
                  </span>
                  <div>
                    <h3 className="font-b-serif text-xl text-b-ink leading-tight">
                      {skill.category}
                    </h3>
                    <SkillMeter level={categoryLevel} />
                  </div>
                </div>
              }
              subtitle={truncate(skill.summary, 60)}
              keywords={
                <>
                  {displayKeywords.map((kw, i) => (
                    <span key={i} className="b-tag b-tag-terracotta">
                      {kw}
                    </span>
                  ))}
                </>
              }
            >
              <p className="font-b-sans text-sm text-b-ink-light leading-relaxed mb-5">
                {skill.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {keywordList.map((kw, i) => (
                  <span key={i} className="b-tag b-tag-terracotta">
                    {kw}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                {skill.items.map((item, i) => {
                  const level = itemProficiency[item.name] ?? 3
                  return (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-b-sans text-sm font-medium text-b-ink b-underline-hover cursor-default">
                          {item.name}
                        </span>
                        <SkillMeter level={level} />
                      </div>
                      <p className="font-b-sans text-xs text-b-muted leading-relaxed pl-0">
                        {item.desc}
                      </p>
                      <div className="b-progress-bar mt-2">
                        <div
                          className="b-progress-fill"
                          style={{ width: `${(level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {skill.scenarios && skill.scenarios.length > 0 && (
                <div className="border-t border-b-border pt-5 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="b-ornament" />
                    <h4 className="font-b-serif text-sm text-b-terracotta tracking-wide">
                      应用场景
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {skill.scenarios.map((s, i) => (
                      <div
                        key={i}
                        className="b-card p-3 border-l-2 border-l-b-terracotta/30"
                      >
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {s}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skill.practices && skill.practices.length > 0 && (
                <div className="border-t border-b-border pt-5 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="b-ornament" />
                    <h4 className="font-b-serif text-sm text-b-terracotta tracking-wide">
                      实践经验
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {skill.practices.map((p, i) => (
                      <div
                        key={i}
                        className="b-card p-3 border-l-2 border-l-b-terracotta/30"
                      >
                        <p className="font-b-sans text-xs text-b-ink-light leading-relaxed">
                          {p}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skill.projects && skill.projects.length > 0 && (
                <div className="border-t border-b-border pt-5 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="b-ornament" />
                    <h4 className="font-b-serif text-sm text-b-terracotta tracking-wide">
                      项目作品
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {skill.projects.map((proj, i) => (
                      <div
                        key={i}
                        className="b-card b-card-terracotta p-4 group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="b-number-accent text-2xl leading-none mt-0.5">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-b-serif text-sm font-medium text-b-ink mb-1">
                              {proj.name}
                            </h5>
                            <p className="font-b-sans text-xs text-b-muted leading-relaxed">
                              {proj.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ExpandableCard>
          )
        })}
      </div>

      <div className="b-divider b-fade-in" />

      <div className="b-fade-up b-stagger-5">
        <div className="b-card b-card-terracotta p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="b-ornament" />
            <h3 className="font-b-serif text-lg text-b-ink">
              技术栈总览
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {energyData.skills.map((skill, i) => {
              const level = proficiencyMap[skill.category] ?? 3
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-b-cream-dark/60 border border-b-border"
                >
                  <span className="text-b-terracotta">
                    {iconMap[skill.icon]}
                  </span>
                  <span className="font-b-sans text-xs font-medium text-b-ink leading-tight">
                    {skill.category}
                  </span>
                  <SkillMeter level={level} />
                  <span className="font-b-mono text-[10px] text-b-muted">
                    {level}/5
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="b-divider b-fade-in" />

      <div className="b-fade-up b-stagger-6">
        <div className="b-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="b-ornament" />
            <h3 className="font-b-serif text-lg text-b-ink">
              关键词索引
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {energyData.skills.flatMap((skill) =>
              skill.keywords.split('、').map((kw, i) => (
                <span
                  key={`${skill.category}-${i}`}
                  className="b-tag b-tag-terracotta hover:scale-105 transition-transform cursor-default"
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
