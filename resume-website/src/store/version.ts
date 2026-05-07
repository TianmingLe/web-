import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Version = 'A' | 'B'

interface VersionState {
  version: Version
  toggleVersion: () => void
  setVersion: (v: Version) => void
}

export const useVersionState = create<VersionState>()(
  persist(
    (set) => ({
      version: 'A',
      toggleVersion: () =>
        set((state) => ({ version: state.version === 'A' ? 'B' : 'A' })),
      setVersion: (version) => set({ version }),
    }),
    { name: 'resume-version' }
  )
)
