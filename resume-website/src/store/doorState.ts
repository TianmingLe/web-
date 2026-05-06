import { create } from 'zustand'

export type DoorPhase = 'LOCKED' | 'OPENING' | 'OPEN' | 'NORMAL_SCROLL'

interface DoorState {
  phase: DoorPhase
  progress: number
  startOpening: () => void
  setProgress: (progress: number) => void
  finishOpening: () => void
  enterNormalScroll: () => void
  reset: () => void
}

const STORAGE_KEY = 'door_opened_v2'

function getInitialPhase(): DoorPhase {
  if (typeof window === 'undefined') return 'LOCKED'
  try {
    const opened = localStorage.getItem(STORAGE_KEY)
    if (opened === 'true') return 'NORMAL_SCROLL'
  } catch {
    // ignore
  }
  return 'LOCKED'
}

export const useDoorState = create<DoorState>((set) => ({
  phase: getInitialPhase(),
  progress: 0,
  startOpening: () =>
    set((state) => {
      if (state.phase === 'LOCKED') {
        return { phase: 'OPENING', progress: 0 }
      }
      return state
    }),
  setProgress: (progress) =>
    set(() => ({
      progress: Math.min(1, Math.max(0, progress)),
    })),
  finishOpening: () =>
    set(() => {
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // ignore
      }
      return { phase: 'OPEN', progress: 1 }
    }),
  enterNormalScroll: () =>
    set((state) => {
      if (state.phase === 'OPEN') {
        return { phase: 'NORMAL_SCROLL' }
      }
      return state
    }),
  reset: () =>
    set(() => {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
      return { phase: 'LOCKED', progress: 0 }
    }),
}))
