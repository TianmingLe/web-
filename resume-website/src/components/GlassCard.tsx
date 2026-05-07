import { type ReactNode, type CSSProperties } from 'react'

export type GlowColor = 'blue' | 'green' | 'purple' | 'none'
export type CardVariant = 'default' | 'large' | 'small' | 'data'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: GlowColor
  hoverEffect?: boolean
  variant?: CardVariant
  style?: CSSProperties
}

const glowColorMap: Record<GlowColor, string> = {
  blue: 'rgba(0, 122, 255, 0.15)',
  green: 'rgba(52, 199, 89, 0.15)',
  purple: 'rgba(175, 82, 222, 0.15)',
  none: 'transparent',
}

const glowBorderMap: Record<GlowColor, string> = {
  blue: 'rgba(0, 122, 255, 0.25)',
  green: 'rgba(52, 199, 89, 0.25)',
  purple: 'rgba(175, 82, 222, 0.25)',
  none: 'rgba(255, 255, 255, 0.08)',
}

const variantClasses: Record<CardVariant, string> = {
  default: 'p-6',
  large: 'p-8',
  small: 'p-4',
  data: 'p-5',
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'none',
  hoverEffect = true,
  variant = 'default',
  style,
}: GlassCardProps) {
  const glow = glowColorMap[glowColor]
  const glowBorder = glowBorderMap[glowColor]

  const baseStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${glowBorder}`,
    borderRadius: '24px',
    boxShadow:
      glowColor !== 'none'
        ? `inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 20px ${glow}`
        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
    ...style,
  }

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${hoverEffect ? 'apple-card-interactive' : 'apple-card'}
        ${className}
      `}
      style={baseStyle}
    >
      {children}
    </div>
  )
}