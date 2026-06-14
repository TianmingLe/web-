import { useEffect, useRef, useCallback } from 'react'
import { LayoutConfig } from './usePipelineLayout'
import { DeviceTier } from './useDeviceTier'
import { AnimationState, drawPipes, drawLiquid, drawNodes, drawLabels, drawTooltip } from './pipelineDraw'

interface UseCanvasRendererOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  layout: LayoutConfig
  tier: DeviceTier
  isVisible: boolean
  isWarm: boolean
  hoveredNode: string | null
  hoveredIndex: number
}

export function useCanvasRenderer({
  canvasRef,
  layout,
  tier,
  isVisible,
  isWarm,
  hoveredNode,
  hoveredIndex,
}: UseCanvasRendererOptions) {
  const stateRef = useRef<AnimationState>({
    phase: 'idle',
    startTime: 0,
    hoveredNode: null,
    hoveredIndex: -1,
  })
  const rafRef = useRef<number>(0)

  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current
    const { viewBox } = layout

    const scaleX = canvas.width / viewBox.width
    const scaleY = canvas.height / viewBox.height
    const scale = Math.min(scaleX, scaleY)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(scale, scale)

    state.hoveredNode = hoveredNode
    state.hoveredIndex = hoveredIndex

    if (state.phase === 'idle' && isVisible) {
      state.phase = 'playing'
      state.startTime = timestamp
    }

    const elapsed = timestamp - state.startTime
    const pipeDone = elapsed > 2500
    if (state.phase === 'playing' && pipeDone) {
      state.phase = 'liquid_flowing'
    }

    const drawCtx = { ctx, layout, state, tier, timestamp }

    drawPipes(drawCtx)
    drawLiquid(drawCtx)
    drawNodes(drawCtx)
    drawLabels(drawCtx)
    drawTooltip(drawCtx)

    ctx.restore()

    if (isVisible || state.phase !== 'done') {
      rafRef.current = requestAnimationFrame(render)
    }
  }, [canvasRef, layout, tier, isVisible, hoveredNode, hoveredIndex])

  useEffect(() => {
    if (isWarm && stateRef.current.phase === 'idle') {
      stateRef.current.phase = 'playing'
      stateRef.current.startTime = performance.now()
    }
  }, [isWarm])

  useEffect(() => {
    if (isVisible) {
      rafRef.current = requestAnimationFrame(render)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, render])
}
