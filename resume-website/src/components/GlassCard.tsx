import { type ReactNode, type CSSProperties } from 'react'

export type GlowColor = 'cyan' | 'purple' | 'blue' | 'none'
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
  cyan: 'rgba(0, 229, 255, 0.15)',
  purple: 'rgba(124, 58, 237, 0.15)',
  blue: 'rgba(59, 130, 246, 0.15)',
  none: 'transparent',
}

const glowBorderMap: Record<GlowColor, string> = {
  cyan: 'rgba(0, 229, 255, 0.25)',
  purple: 'rgba(124, 58, 237, 0.25)',
  blue: 'rgba(59, 130, 246, 0.25)',
  none: 'rgba(255, 255, 255, 0.06)',
}

const variantClasses: Record<CardVariant, string> = {
  default: 'p-6 rounded-2xl',
  large: 'p-8 rounded-3xl',
  small: 'p-4 rounded-xl',
  data: 'p-5 rounded-2xl',
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
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: `1px solid ${glowBorder}`,
    boxShadow:
      glowColor !== 'none'
        ? `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px ${glow}`
        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
    ...style,
  }

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${hoverEffect ? 'glass-card-interactive' : ''}
        ${className}
      `}
      style={baseStyle}
    >
      {children}
    </div>
  )
}
