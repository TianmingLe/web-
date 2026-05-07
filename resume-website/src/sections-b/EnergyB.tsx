import { Monitor, Code, Cpu, FlaskConical, ClipboardList } from 'lucide-react'
import ExpandableCard from '@components/ExpandableCard'
import energyData from '@data/energy.json'

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={18} strokeWidth={1.5} />,
  code: <Code size={18} strokeWidth={1.5} />,
  cpu: <Cpu size={18} strokeWidth={1.5} />,
  'flask-conical': <FlaskConical size={18} strokeWidth={1.5} />,
  'clipboard-list': <ClipboardList size={18} strokeWidth={1.5} />,
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

function SkillDetail({ skill }: { skill: (typeof energyData.skills)[number] }) {
  return (
    <div className="space-y-5">
      <p className="font-b-sans text-sm text-b-ink-light leading-relaxed">
        {skill.summary}
      </p>

      <div className="space-y-3">
        {skill.items.map((item, i) => {
          const level = itemProficiency[item.name] ?? 3
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-b-sans text-sm font-medium text-b-ink">
                  {item.name}
                </span>
                <SkillMeter level={level} />
              </div>
              <p className="font-b-sans text-xs text-b-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          )
        })}
      </div>

      {skill.scenarios && skill.scenarios.length > 0 && (
        <div className="border-t border-b-border pt-4">
          <h4 className="font-b-serif text-sm text-b-terracotta tracking-wide mb-2">
            应用场景
          </h4>
          <div className="space-y-1.5">
            {skill.scenarios.map((s, i) => (
              <p key={i} className="font-b-sans text-xs text-b-ink-light leading-relaxed pl-3 border-l-2 border-l-b-terracotta/30">
                {s}
              </p>
            ))}
          </div>
        </div>
      )}

      {skill.practices && skill.practices.length > 0 && (
        <div className="border-t border-b-border pt-4">
          <h4 className="font-b-serif text-sm text-b-terracotta tracking-wide mb-2">
            实践经验
          </h4>
          <div className="space-y-1.5">
            {skill.practices.map((p, i) => (
              <p key={i} className="font-b-sans text-xs text-b-ink-light leading-relaxed pl-3 border-l-2 border-l-b-terracotta/30">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {skill.projects && skill.projects.length > 0 && (
        <div className="border-t border-b-border pt-4">
          <h4 className="font-b-serif text-sm text-b-terracotta tracking-wide mb-2">
            项目作品
          </h4>
          <div className="space-y-2">
            {skill.projects.map((proj, i) => (
              <div key={i} className="b-card b-card-terracotta p-3">
                <div className="flex items-start gap-2">
                  <span className="b-number-accent text-lg leading-none mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-b-serif text-sm font-medium text-b-ink mb-0.5">
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
    </div>
  )
}

export default function EnergyB() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
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
        {energyData.skills.map((skill, index) => (
          <div key={index} className={`b-fade-up b-stagger-${index + 1}`}>
            <ExpandableCard
              title={skill.category}
              icon={iconMap[skill.icon]}
              tags={skill.keywords.split('、')}
              cardClass="b-card-terracotta"
              tagClass="b-tag-terracotta"
            >
              <SkillDetail skill={skill} />
            </ExpandableCard>
          </div>
        ))}
      </div>
    </section>
  )
}
