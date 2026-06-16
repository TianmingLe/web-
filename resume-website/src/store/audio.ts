import { create } from 'zustand'

export interface Track {
  id: number
  title: string
  artist: string
  duration: number
  url: string
  cover: string
}

/* ------------------------------------------------------------------ */
/*  Playback State — minimal surface, used by UI frequently            */
/* ------------------------------------------------------------------ */
interface PlaybackState {
  isPlaying: boolean
  currentTrackIndex: number
  currentTime: number
  duration: number

  setPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setCurrentTrackIndex: (index: number) => void
  play: () => void
  pause: () => void
  toggle: () => void
  nextTrack: () => void
  prevTrack: () => void
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  isPlaying: false,
  currentTrackIndex: 0,
  currentTime: 0,
  duration: 0,

  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setCurrentTrackIndex: (index) =>
    set({ currentTrackIndex: Math.max(0, Math.min(index, get().playlist?.length - 1 || 0)) }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),

  nextTrack: () =>
    set((state) => ({
      currentTrackIndex:
        state.playlist?.length > 0
          ? (state.currentTrackIndex + 1) % state.playlist.length
          : 0,
      currentTime: 0,
    })),

  prevTrack: () =>
    set((state) => ({
      currentTrackIndex:
        state.playlist?.length > 0
          ? (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length
          : 0,
      currentTime: 0,
    })),
}))

/* ------------------------------------------------------------------ */
/*  Audio Settings — changed less often, separate store                */
/* ------------------------------------------------------------------ */
interface AudioSettingsState {
  isMuted: boolean
  volume: number

  setMuted: (muted: boolean) => void
  toggleMute: () => void
  setVolume: (volume: number) => void
}

export const useAudioSettingsStore = create<AudioSettingsState>((set) => ({
  isMuted: false,
  volume: 0.6,

  setMuted: (muted) => set({ isMuted: muted }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
}))

/* ------------------------------------------------------------------ */
/*  Playlist State — rarely changes                                    */
/* ------------------------------------------------------------------ */
interface PlaylistState {
  playlist: Track[]
  setPlaylist: (playlist: Track[]) => void
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlist: [],
  setPlaylist: (playlist) => set({ playlist }),
}))

/* ------------------------------------------------------------------ */
/*  Legacy combined store (deprecated, kept for compatibility)         */
/* ------------------------------------------------------------------ */
interface AudioState extends PlaybackState, AudioSettingsState, PlaylistState {}

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
