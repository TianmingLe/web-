import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
} from 'lucide-react'
import { useAudioStore } from '@store/audio'
import playlistData from '@data/playlist.json'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicDock() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wasPlayingBeforeHidden = useRef(false)

  const {
    isPlaying,
    isMuted,
    volume,
    currentTrackIndex,
    playlist,
    currentTime,
    duration,
    setPlaylist,
    setPlaying,
    setMuted,
    setVolume,
    setCurrentTime,
    setDuration,
    nextTrack,
    prevTrack,
  } = useAudioStore()

  const currentTrack = playlist[currentTrackIndex] ?? null

  useEffect(() => {
    setPlaylist(playlistData)
  }, [setPlaylist])

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'metadata'
    audioRef.current = audio

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => nextTrack()

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [setCurrentTime, setDuration, nextTrack])

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return
    if (audioRef.current.src !== currentTrack.url) {
      audioRef.current.src = currentTrack.url
      audioRef.current.load()
      setCurrentTime(0)
    }
  }, [currentTrack, setCurrentTime])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return

    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audioRef.current!.play()
        } else {
          audioRef.current!.pause()
        }
      } catch (err) {
        console.warn('Audio playback failed:', err)
        setPlaying(false)
      }
    }

    playAudio()
  }, [isPlaying, currentTrack, setPlaying])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return
      if (document.hidden) {
        wasPlayingBeforeHidden.current = isPlaying
        if (isPlaying) {
          audioRef.current.pause()
        }
      } else {
        if (wasPlayingBeforeHidden.current && isPlaying) {
          audioRef.current.play().catch(() => {})
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPlaying])

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !duration) return
      const rect = e.currentTarget.getBoundingClientRect()
      const ratio = (e.clientX - rect.left) / rect.width
      const newTime = Math.max(0, Math.min(duration, ratio * duration))
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    },
    [duration, setCurrentTime]
  )

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  const showExpanded = isExpanded || isHovered

  return (
    <div
      className="fixed right-6 bottom-6 z-50 flex items-end justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!isExpanded) setIsExpanded(false)
      }}
    >
      <div
        className={`
          relative flex items-center gap-3 overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${showExpanded ? 'w-64 px-4 py-3 rounded-2xl' : 'w-10 h-10 rounded-full'}
        `}
        style={{
          background: 'rgba(10, 15, 26, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(0, 229, 255, 0.15)',
          boxShadow: showExpanded
            ? '0 0 30px rgba(0, 229, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 0 15px rgba(0, 229, 255, 0.08)',
        }}
      >
        {!showExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center text-primary hover:text-primary-light transition-colors"
            aria-label="展开音乐播放器"
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-current rounded-full animate-pulse"
                    style={{
                      height: '60%',
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.6s',
                    }}
                  />
                ))}
              </div>
            ) : (
              <Music size={16} />
            )}
          </button>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => setPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center hover:bg-primary/25 transition-colors shrink-0"
                  aria-label={isPlaying ? '暂停' : '播放'}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <div className="min-w-0">
                  <p className="text-xs text-white/90 font-medium truncate max-w-[120px]">
                    {currentTrack?.title ?? '未选择曲目'}
                  </p>
                  <p className="text-[10px] text-white/40 truncate max-w-[120px]">
                    {currentTrack?.artist ?? '--'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/30 hover:text-white/60 transition-colors shrink-0"
                aria-label="收起播放器"
              >
                <span className="text-xs">收起</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTrack}
                className="text-white/40 hover:text-white/80 transition-colors"
                aria-label="上一首"
              >
                <SkipBack size={14} />
              </button>

              <div className="flex-1 relative group cursor-pointer" onClick={handleProgressClick}>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                      width: `${progressPercent}%`,
                      background: 'linear-gradient(90deg, #00e5ff, #7c3aed)',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] text-white/30">{formatTime(currentTime)}</span>
                  <span className="text-[9px] text-white/30">
                    {formatTime(duration || currentTrack?.duration || 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={nextTrack}
                className="text-white/40 hover:text-white/80 transition-colors"
                aria-label="下一首"
              >
                <SkipForward size={14} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted(!isMuted)}
                className="text-white/40 hover:text-white/80 transition-colors"
                aria-label={isMuted ? '取消静音' : '静音'}
              >
                {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value)
                  setVolume(v)
                  if (v > 0 && isMuted) setMuted(false)
                }}
                className="flex-1 h-1 accent-primary cursor-pointer"
                style={{
                  appearance: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '999px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
