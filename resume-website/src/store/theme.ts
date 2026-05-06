import { create } from 'zustand'

type Theme = 'dark' | 'light' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeState = create<ThemeState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}))
