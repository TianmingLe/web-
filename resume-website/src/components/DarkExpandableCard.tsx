import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface DarkExpandableCardProps {
  title: ReactNode
  subtitle?: ReactNode
  badges?: ReactNode
  keywords?: ReactNode
  children: ReactNode
  glowColor?: 'energy' | 'ai' | 'none'
  defaultExpanded?: boolean
  className?: string
}

export default function DarkExpandableCard({
  title,
  subtitle,
  badges,
  keywords,
  children,
  glowColor = 'none',
  defaultExpanded = false,
  className = '',
}: DarkExpandableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const glowClass = glowColor === 'energy'
    ? 'industrial-card-energy'
    : glowColor === 'ai'
      ? 'industrial-card-ai'
      : ''

  return (
    <div
      className={`industrial-card ${glowClass} ${className} overflow-hidden transition-all duration-500 cursor-pointer group`}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setExpanded(!expanded)
        }
      }}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              {typeof title === 'string' ? (
                <h3 className="font-serif text-lg md:text-xl text-warm leading-snug">
                  {title}
                </h3>
              ) : (
                title
              )}
              {badges}
            </div>
            {subtitle && (
              <div className="mt-1.5">
                {typeof subtitle === 'string' ? (
                  <p className="font-sans text-sm text-warm-muted leading-relaxed">
                    {subtitle}
                  </p>
                ) : (
                  subtitle
                )}
              </div>
            )}
            {keywords && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {keywords}
              </div>
            )}
          </div>

          <span
            className={`shrink-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${
              expanded
                ? 'bg-energy-dim text-energy-light rotate-180'
                : 'bg-warm-ghost/5 text-warm-faint group-hover:bg-warm-ghost/10 group-hover:text-warm-muted'
            }`}
          >
            <ChevronDown size={14} strokeWidth={2} />
          </span>
        </div>

        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            display: 'grid',
            gridTemplateRows: expanded ? '1fr' : '0fr',
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-5 mt-5 border-t border-white/[0.06] transition-opacity duration-300" style={{ opacity: expanded ? 1 : 0 }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
