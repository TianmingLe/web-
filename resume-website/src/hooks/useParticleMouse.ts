import { useRef, useEffect, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useParticleMouse() {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return mouseRef
}
