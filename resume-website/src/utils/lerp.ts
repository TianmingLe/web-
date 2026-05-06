export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function lerpColor(
  start: [number, number, number],
  end: [number, number, number],
  factor: number
): string {
  const r = Math.round(lerp(start[0], end[0], factor))
  const g = Math.round(lerp(start[1], end[1], factor))
  const b = Math.round(lerp(start[2], end[2], factor))
  return `rgb(${r}, ${g}, ${b})`
}
