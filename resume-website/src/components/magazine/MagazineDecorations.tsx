export function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, bl: -90, br: 180 }
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className="absolute text-copper-gold/30"
      style={{
        top: position.includes('t') ? '-8px' : undefined,
        bottom: position.includes('b') ? '-8px' : undefined,
        left: position.includes('l') ? '-8px' : undefined,
        right: position.includes('r') ? '-8px' : undefined,
        transform: `rotate(${rotations[position]}deg)`,
      }}
    >
      <path
        d="M0 40 L0 20 Q0 0 20 0 L40 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M0 30 L0 15 Q0 0 15 0 L30 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  )
}

export function DropCap({ children }: { children: string }) {
  const firstChar = children.charAt(0)
  const rest = children.slice(1)
  return (
    <p className="text-magazine-warm text-sm leading-relaxed">
      <span
        className="float-left mr-2 mt-1 font-serif text-5xl text-copper-gold leading-none"
        style={{ lineHeight: '0.8' }}
      >
        {firstChar}
      </span>
      {rest}
    </p>
  )
}

export function MagazineDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="w-16 h-px bg-copper-gold/40" />
      <div className="w-2 h-2 rotate-45 border border-copper-gold/60" />
      <div className="w-16 h-px bg-copper-gold/40" />
    </div>
  )
}

export function PageHeader({ title }: { title: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-magazine-border mb-6">
      <span className="font-mono text-[10px] tracking-[0.3em] text-magazine-warm/50 uppercase">
        {title}
      </span>
      <span className="font-mono text-[10px] text-magazine-warm/50">
        VOL.01
      </span>
    </div>
  )
}

export function PageFooter({ pageNum }: { pageNum: number }) {
  return (
    <div className="flex items-center justify-between py-4 border-t border-magazine-border mt-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-magazine-warm/40">
        HONORS & EXPERIENCE
      </span>
      <span className="font-serif text-lg text-copper-gold/60">
        {String(pageNum).padStart(2, '0')}
      </span>
    </div>
  )
}
