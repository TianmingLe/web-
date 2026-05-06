import { type ReactNode } from 'react'

interface CoverLayoutProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function CoverLayout({ children, className = '', id }: CoverLayoutProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  )
}
