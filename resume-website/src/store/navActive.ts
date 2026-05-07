import { create } from 'zustand'

interface NavState {
  activeId: string
  setActiveId: (id: string) => void
}

export const useNavState = create<NavState>((set) => ({
  activeId: 'home',
  setActiveId: (id) => set({ activeId: id }),
}))
