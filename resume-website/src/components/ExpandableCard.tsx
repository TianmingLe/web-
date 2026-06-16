import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface ExpandableCardProps {
  title: ReactNode
  subtitle?: ReactNode
  badges?: ReactNode
  keywords?: ReactNode
  children: ReactNode
  cardClass?: string
  defaultExpanded?: boolean
  className?: string
}

export default function ExpandableCard({
  title,
  subtitle,
  badges,
  keywords,
  children,
  cardClass = 'b-card',
  defaultExpanded = true,
  className = '',
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div
      className={`${cardClass} ${className} overflow-hidden cursor-pointer group`}
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
                <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">
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
                  <p className="font-b-sans text-sm text-b-muted leading-relaxed">
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
                ? 'bg-b-terracotta-dim text-b-terracotta rotate-180'
                : 'bg-b-cream-dark text-b-muted group-hover:bg-b-sand/50 group-hover:text-b-ink-light group-hover:scale-110'
            }`}
          >
            <ChevronDown size={14} strokeWidth={2} />
          </span>
        </div>

        <div
          className="transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            display: 'grid',
            gridTemplateRows: expanded ? '1fr' : '0fr',
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className={`pt-5 mt-5 border-t border-b-border transition-opacity duration-300 ${expanded ? '' : 'opacity-0'}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
