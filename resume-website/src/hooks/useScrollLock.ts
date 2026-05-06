import { useEffect, useRef } from 'react'
import { useDoorState, type DoorPhase } from '@store/doorState'
import { createScrollHijack } from '@utils/scrollHijack'
import { prefersReducedMotion } from '@utils/reducedMotionCheck'

export function useScrollLock() {
  const phase = useDoorState((s) => s.phase)
  const startOpening = useDoorState((s) => s.startOpening)
  const setProgress = useDoorState((s) => s.setProgress)
  const finishOpening = useDoorState((s) => s.finishOpening)
  const enterNormalScroll = useDoorState((s) => s.enterNormalScroll)

  const hijackRef = useRef<ReturnType<typeof createScrollHijack> | null>(null)
  const phaseRef = useRef<DoorPhase>(phase)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (phase === 'NORMAL_SCROLL' || phase === 'OPEN') {
      return
    }

    if (phase === 'LOCKED') {
      const reduced = prefersReducedMotion()

      if (reduced) {
        startOpening()
        setProgress(1)
        finishOpening()
        setTimeout(() => {
          enterNormalScroll()
        }, 100)
        return
      }

      const hijack = createScrollHijack({
        onProgress: (p) => {
          if (phaseRef.current === 'LOCKED' && p > 0) {
            startOpening()
          }
          setProgress(p)
        },
        onComplete: () => {
          finishOpening()
          setTimeout(() => {
            enterNormalScroll()
          }, 600)
        },
        threshold: 1200,
      })

      hijackRef.current = hijack
      hijack.attach()

      return () => {
        hijack.detach()
        hijackRef.current = null
      }
    }

    if (phase === 'OPENING') {
      return
    }
  }, [phase, startOpening, setProgress, finishOpening, enterNormalScroll])

  return phase
}
