import { type ReactNode } from 'react'

interface CoverLayoutProps {
  children: ReactNode
  className?: string
  id?: string
  'aria-label'?: string
}

export default function CoverLayout({ children, className = '', id, 'aria-label': ariaLabel }: CoverLayoutProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  )
}
