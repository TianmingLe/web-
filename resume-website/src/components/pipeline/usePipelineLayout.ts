import { useMemo } from 'react'
import { capabilityData } from '@data/capabilityMap'

const energyNode = capabilityData.mainNodes.find((n) => n.id === 'energy')!

export interface NodePosition { x: number; y: number }

export interface PipePath {
  d: string
  length: number
  from: number
  to: number
}

export interface LayoutConfig {
  viewBox: { width: number; height: number }
  nodePositions: NodePosition[]
  pipes: PipePath[]
  nodeShapes: string[]
}

function estimatePathLength(d: string): number {
  const svgNS = 'http://www.w3.org/2000/svg'
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  document.body.appendChild(path)
  const length = path.getTotalLength()
  document.body.removeChild(path)
  return length
}

export function usePipelineLayout(isMobile: boolean): LayoutConfig {
  return useMemo(() => {
    const skills = energyNode.subNodes ?? []
    const viewBox = isMobile
      ? { width: 200, height: 60 + skills.length * 90 }
      : { width: 800, height: 720 }

    const nodePositions = isMobile
      ? skills.map((_, i) => ({ x: 100, y: 60 + i * 90 }))
      : [
          { x: 80, y: 100 },
          { x: 280, y: 80 },
          { x: 480, y: 110 },
          { x: 680, y: 90 },
          { x: 160, y: 280 },
          { x: 360, y: 260 },
          { x: 560, y: 290 },
          { x: 260, y: 440 },
          { x: 460, y: 420 },
          { x: 360, y: 580 },
        ]

    const connections = isMobile
      ? skills.map((_, i) => (i < skills.length - 1 ? [i, i + 1] : null)).filter(Boolean) as number[][]
      : [
          [0, 1], [1, 2], [2, 3],
          [0, 4], [1, 5], [2, 6], [3, 6],
          [4, 7], [5, 7], [5, 8], [6, 8],
          [7, 9], [8, 9],
        ]

    const pipes: PipePath[] = connections.map(([from, to], i) => {
      const start = nodePositions[from]
      const end = nodePositions[to]
      const midX = (start.x + end.x) / 2
      const midY = (start.y + end.y) / 2
      const d = isMobile
        ? `M ${start.x} ${start.y + 25} L ${end.x} ${end.y - 25}`
        : `M ${start.x} ${start.y} Q ${midX + (i % 2 === 0 ? 30 : -30)} ${midY + (i % 2 === 0 ? -20 : 20)} ${end.x} ${end.y}`
      return { d, length: estimatePathLength(d), from, to }
    })

    const nodeShapes = ['circle', 'diamond', 'circle', 'diamond', 'circle', 'circle', 'diamond', 'circle', 'diamond', 'circle']

    return { viewBox, nodePositions, pipes, nodeShapes }
  }, [isMobile])
}
