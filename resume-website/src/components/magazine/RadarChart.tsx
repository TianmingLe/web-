import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface RadarChartProps {
  data: { label: string; value: number }[]
  size?: number
}

export default function RadarChart({ data, size = 240 }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const max = 5
  const center = size / 2
  const radius = size * 0.38
  const angleStep = (Math.PI * 2) / data.length

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.radar-path')
    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() || 0
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // 计算多边形顶点
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (d.value / max) * radius
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
  })

  const polygonPoints = points.join(' ')

  // 网格圆环
  const gridRings = [1, 2, 3, 4, 5].map((level) => (
    <polygon
      key={level}
      points={data
        .map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          const r = (level / max) * radius
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        })
        .join(' ')}
      fill="none"
      stroke="rgba(212, 165, 116, 0.15)"
      strokeWidth="1"
    />
  ))

  // 轴线
  const axes = data.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={center + radius * Math.cos(angle)}
        y2={center + radius * Math.sin(angle)}
        stroke="rgba(212, 165, 116, 0.15)"
        strokeWidth="1"
      />
    )
  })

  // 标签
  const labels = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const labelR = radius + 20
    return (
      <text
        key={i}
        x={center + labelR * Math.cos(angle)}
        y={center + labelR * Math.sin(angle)}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[10px] fill-magazine-warm/70"
      >
        {d.label}
      </text>
    )
  })

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
    >
      {gridRings}
      {axes}
      <polygon
        className="radar-path"
        points={polygonPoints}
        fill="rgba(212, 165, 116, 0.15)"
        stroke="#D4A574"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {points.map((p, i) => {
        const [x, y] = p.split(',').map(Number)
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#D4A574" />
        )
      })}
      {labels}
    </svg>
  )
}
