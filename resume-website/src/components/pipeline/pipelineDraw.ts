import { LayoutConfig } from './usePipelineLayout'
import { DeviceTier } from './useDeviceTier'
import { capabilityData } from '@data/capabilityMap'

const energyNode = capabilityData.mainNodes.find((n) => n.id === 'energy')!

export interface AnimationState {
  phase: 'idle' | 'playing' | 'liquid_flowing' | 'done'
  startTime: number
  hoveredNode: string | null
  hoveredIndex: number
}

export interface DrawContext {
  ctx: CanvasRenderingContext2D
  layout: LayoutConfig
  state: AnimationState
  tier: DeviceTier
  timestamp: number
}

function easeOutBack(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function easePower2Out(t: number): number {
  return t * (2 - t)
}

export function drawPipes({ ctx, layout, state, tier, timestamp }: DrawContext) {
  const { pipes } = layout
  const pipeDuration = tier === 'high' ? 2000 : tier === 'medium' ? 1500 : 800

  pipes.forEach((pipe, i) => {
    const stagger = i * 200
    const elapsed = timestamp - state.startTime - stagger
    const progress = Math.max(0, Math.min(1, elapsed / pipeDuration))
    const eased = easePower2Out(progress)

    ctx.save()
    ctx.beginPath()
    const path = new Path2D(pipe.d)
    ctx.strokeStyle = 'rgba(192, 74, 26, 0.3)'
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.setLineDash([pipe.length])
    ctx.lineDashOffset = pipe.length * (1 - eased)
    ctx.stroke(path)
    ctx.restore()
  })
}

export function drawLiquid({ ctx, layout, state, tier, timestamp }: DrawContext) {
  if (tier === 'low') return
  if (state.phase === 'playing') return

  const { pipes } = layout
  const speed = state.hoveredNode !== null
    ? (tier === 'high' ? 0.5 : 1)
    : (tier === 'high' ? 2 : 3)

  pipes.forEach((pipe) => {
    ctx.save()
    ctx.beginPath()
    const path = new Path2D(pipe.d)
    ctx.strokeStyle = '#C04A1A'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.setLineDash([8, 6])
    ctx.lineDashOffset = -((timestamp / 1000) * 28 / speed) % 28
    ctx.stroke(path)
    ctx.restore()
  })
}

export function drawNodes({ ctx, layout, state, timestamp }: DrawContext) {
  const { nodePositions, nodeShapes } = layout
  const skills = energyNode.subNodes ?? []
  const nodeDuration = 600
  const nodeStagger = 150

  nodePositions.forEach((pos, i) => {
    const stagger = i * nodeStagger + 800
    const elapsed = timestamp - state.startTime - stagger
    const progress = Math.max(0, Math.min(1, elapsed / nodeDuration))
    const eased = easeOutBack(progress)

    const isHovered = state.hoveredIndex === i
    const shape = nodeShapes[i] ?? 'circle'
    const level = skills[i]?.level || 0

    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.scale(eased, eased)

    if (isHovered) {
      ctx.beginPath()
      ctx.arc(0, 0, 35, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(192, 74, 26, 0.4)'
      ctx.lineWidth = 2
      ctx.shadowColor = '#C04A1A'
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    if (shape === 'circle') {
      ctx.beginPath()
      ctx.arc(0, 0, 28, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(15, 18, 24, 0.95)'
      ctx.fill()
      ctx.strokeStyle = isHovered ? '#C04A1A' : 'rgba(192, 74, 26, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = 'rgba(192, 74, 26, 0.5)'
      ;[[-20, -20], [20, -20], [-20, 20], [20, 20]].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    } else {
      ctx.beginPath()
      ctx.moveTo(0, -28)
      ctx.lineTo(28, 0)
      ctx.lineTo(0, 28)
      ctx.lineTo(-28, 0)
      ctx.closePath()
      ctx.fillStyle = 'rgba(15, 18, 24, 0.95)'
      ctx.fill()
      ctx.strokeStyle = isHovered ? '#C04A1A' : 'rgba(192, 74, 26, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = 'rgba(192, 74, 26, 0.5)'
      ;[[-18, -18], [18, -18], [-18, 18], [18, 18]].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const circumference = 2 * Math.PI * 22
    const dash = (level / 5) * circumference
    ctx.beginPath()
    ctx.arc(0, 0, 22, -Math.PI / 2, -Math.PI / 2 + (dash / circumference) * Math.PI * 2)
    ctx.strokeStyle = 'rgba(192, 74, 26, 0.6)'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
  })
}

export function drawLabels({ ctx, layout, state, timestamp }: DrawContext) {
  const { nodePositions } = layout
  const skills = energyNode.subNodes ?? []
  const labelDuration = 400
  const labelStagger = 80

  nodePositions.forEach((pos, i) => {
    const stagger = i * labelStagger + 1400
    const elapsed = timestamp - state.startTime - stagger
    const progress = Math.max(0, Math.min(1, elapsed / labelDuration))
    const eased = easePower2Out(progress)

    const label = skills[i]?.label ?? ''
    const displayLabel = label.length > 8 ? label.slice(0, 7) + '…' : label
    const isHovered = state.hoveredIndex === i

    ctx.save()
    ctx.globalAlpha = eased
    ctx.font = '500 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = isHovered ? '#E8703A' : '#F0E6D8'
    ctx.fillText(displayLabel, pos.x, pos.y + 4)
    ctx.restore()
  })
}

export function drawTooltip({ ctx, layout, state }: DrawContext) {
  if (state.hoveredIndex < 0) return
  const { nodePositions } = layout
  const skills = energyNode.subNodes ?? []
  const pos = nodePositions[state.hoveredIndex]
  const skill = skills[state.hoveredIndex]
  if (!pos || !skill) return

  const text = `Lv.${skill.level || 0} ${skill.label}`
  ctx.font = '9px monospace'
  const textWidth = ctx.measureText(text).width
  const padding = 8
  const rectWidth = textWidth + padding * 2
  const rectHeight = 24

  ctx.save()
  ctx.fillStyle = 'rgba(192, 74, 26, 0.15)'
  ctx.strokeStyle = '#C04A1A'
  ctx.lineWidth = 1

  const x = pos.x - rectWidth / 2
  const y = pos.y - 45 - rectHeight / 2
  const r = 4

  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + rectWidth - r, y)
  ctx.quadraticCurveTo(x + rectWidth, y, x + rectWidth, y + r)
  ctx.lineTo(x + rectWidth, y + rectHeight - r)
  ctx.quadraticCurveTo(x + rectWidth, y + rectHeight, x + rectWidth - r, y + rectHeight)
  ctx.lineTo(x + r, y + rectHeight)
  ctx.quadraticCurveTo(x, y + rectHeight, x, y + rectHeight - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#E8703A'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, pos.x, pos.y - 45)
  ctx.restore()
}
