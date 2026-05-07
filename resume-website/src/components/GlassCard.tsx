import { type ReactNode, type CSSProperties } from 'react'

export type GlowColor = 'energy' | 'ai' | 'none'
export type CardVariant = 'default' | 'large' | 'small' | 'data'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: GlowColor
  hoverEffect?: boolean
  variant?: CardVariant
  style?: CSSProperties
}

const variantClasses: Record<CardVariant, string> = {
  default: 'p-6',
  large: 'p-8',
  small: 'p-4',
  data: 'p-5',
}

const glowClasses: Record<GlowColor, string> = {
  energy: 'industrial-card-energy',
  ai: 'industrial-card-ai',
  none: '',
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'none',
  hoverEffect = true,
  variant = 'default',
  style,
}: GlassCardProps) {
  return (
    <div
      className={`
        industrial-card
        ${variantClasses[variant]}
        ${hoverEffect ? glowClasses[glowColor] : ''}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  )
}
