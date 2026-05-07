import { useState, useRef, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface ExpandableCardProps {
  title: ReactNode
  subtitle?: string
  tags?: string[]
  icon?: ReactNode
  badge?: string
  cardClass?: string
  tagClass?: string
  children: ReactNode
  defaultExpanded?: boolean
  expandOnHover?: boolean
}

export default function ExpandableCard({
  title,
  subtitle,
  tags,
  icon,
  badge,
  cardClass = 'b-card-terracotta',
  tagClass = 'b-tag-terracotta',
  children,
  defaultExpanded = false,
  expandOnHover = false,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const contentRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggle = () => setExpanded((prev) => !prev)

  const handleMouseEnter = () => {
    if (!expandOnHover) return
    hoverTimeoutRef.current = setTimeout(() => {
      setExpanded(true)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (!expandOnHover) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setExpanded(false)
  }

  return (
    <div
      className={`b-card ${cardClass} overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${expanded ? 'p-6 md:p-8' : 'p-4 md:p-5'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggle}
        className="w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-b-terracotta/40 rounded-lg"
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-b-terracotta-dim text-b-terracotta shrink-0">
                {icon}
              </span>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-b-serif text-base md:text-lg text-b-ink leading-tight truncate">
                  {title}
                </h3>
                {badge && (
                  <span className={`b-tag ${tagClass} text-[10px] shrink-0`}>
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="font-b-sans text-xs text-b-muted mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {tags && tags.length > 0 && !expanded && (
              <div className="hidden sm:flex items-center gap-1.5">
                {tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className={`b-tag ${tagClass} text-[10px]`}>
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="font-b-mono text-[10px] text-b-muted">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
            <ChevronDown
              size={16}
              className={`text-b-muted transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div ref={contentRef} className="overflow-hidden">
          <div className="border-t border-b-border pt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
