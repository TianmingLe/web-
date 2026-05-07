import { create } from 'zustand'

export interface Track {
  id: number
  title: string
  artist: string
  duration: number
  url: string
  cover: string
}

interface AudioState {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  currentTrackIndex: number
  playlist: Track[]
  currentTime: number
  duration: number

  setPlaying: (playing: boolean) => void
  setMuted: (muted: boolean) => void
  toggleMute: () => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setPlaylist: (playlist: Track[]) => void
  setCurrentTrackIndex: (index: number) => void
  play: () => void
  pause: () => void
  toggle: () => void
  nextTrack: () => void
  prevTrack: () => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isPlaying: false,
  isMuted: false,
  volume: 0.6,
  currentTrackIndex: 0,
  playlist: [],
  currentTime: 0,
  duration: 0,

  setPlaying: (playing) => set({ isPlaying: playing }),
  setMuted: (muted) => set({ isMuted: muted }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setPlaylist: (playlist) => set({ playlist }),
  setCurrentTrackIndex: (index) =>
    set({ currentTrackIndex: Math.max(0, Math.min(index, get().playlist.length - 1)) }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),

  nextTrack: () =>
    set((state) => ({
      currentTrackIndex:
        state.playlist.length > 0
          ? (state.currentTrackIndex + 1) % state.playlist.length
          : 0,
      currentTime: 0,
    })),

  prevTrack: () =>
    set((state) => ({
      currentTrackIndex:
        state.playlist.length > 0
          ? (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length
          : 0,
      currentTime: 0,
    })),
}))
