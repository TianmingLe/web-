import { Monitor, Code, Cpu, FlaskConical, ClipboardList } from 'lucide-react'
import GlassCard from '@components/GlassCard'
import energyData from '@data/energy.json'

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={24} />,
  code: <Code size={24} />,
  cpu: <Cpu size={24} />,
  'flask-conical': <FlaskConical size={24} />,
  'clipboard-list': <ClipboardList size={24} />,
}

export default function EnergyPage() {
  return (
    <div className="relative pt-20 pb-12 md:py-40 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-energy-light/80 text-xs md:text-sm font-mono font-medium tracking-[0.3em] uppercase mb-4">
            {energyData.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-warm mb-6 tracking-tight">
            {energyData.title}
          </h2>
          <p className="text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            {energyData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {energyData.skills.map((skill, index) => (
            <GlassCard key={index} className="flex flex-col" glowColor="energy">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-energy/60">{iconMap[skill.icon]}</span>
                <h3 className="text-lg font-serif text-warm">
                  {skill.category}
                </h3>
              </div>
              <p className="text-energy-light/60 text-[11px] font-mono uppercase tracking-wider mb-3">{skill.keywords}</p>
              <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">
                {skill.summary}
              </p>
              <ul className="space-y-2 mb-4">
                {skill.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-warm-muted text-sm flex items-start gap-2 font-sans"
                  >
                    <span className="w-1 h-1 rounded-full bg-energy/50 mt-2 shrink-0" />
                    <span>
                      <span className="font-medium text-warm">{item.name}</span>
                      <span className="text-warm-faint"> — {item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {skill.scenarios && (
                <div className="border-t border-white/[0.06] pt-4 mt-auto">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-energy-light/80 mb-2">
                    应用场景
                  </h4>
                  <ul className="space-y-1.5">
                    {skill.scenarios.map((s, i) => (
                      <li
                        key={i}
                        className="text-warm-faint text-xs flex items-start gap-2 font-sans"
                      >
                        <span className="w-1 h-1 rounded-full bg-ai/50 mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {skill.practices && (
                <div className="border-t border-white/[0.06] pt-4 mt-auto">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-energy-light/80 mb-2">
                    项目实践
                  </h4>
                  <ul className="space-y-1.5">
                    {skill.practices.map((p, i) => (
                      <li
                        key={i}
                        className="text-warm-faint text-xs flex items-start gap-2 font-sans"
                      >
                        <span className="w-1 h-1 rounded-full bg-ai/50 mt-1.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {skill.projects && (
                <div className="border-t border-white/[0.06] pt-4 mt-auto">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-energy-light/80 mb-3">
                    项目作品
                  </h4>
                  <div className="space-y-2">
                    {skill.projects.map((proj, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-warm-ghost/5 border border-white/[0.06] px-3 py-2"
                      >
                        <p className="text-warm text-sm font-medium font-sans">
                          {proj.name}
                        </p>
                        <p className="text-warm-faint text-xs mt-0.5 font-sans">
                          {proj.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
