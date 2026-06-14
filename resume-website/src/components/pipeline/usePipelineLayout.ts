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
          { x: 100, y: 80 },
          { x: 260, y: 65 },
          { x: 420, y: 85 },
          { x: 580, y: 70 },
          { x: 170, y: 220 },
          { x: 330, y: 205 },
          { x: 490, y: 230 },
          { x: 250, y: 360 },
          { x: 410, y: 345 },
          { x: 330, y: 480 },
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
