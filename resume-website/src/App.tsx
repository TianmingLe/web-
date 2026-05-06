import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Door from '@components/Door'
import Nav from '@components/Nav'
import ParticleCanvas from '@components/ParticleCanvas'
import MusicDock from '@components/MusicDock'
import Home from '@sections/Home'
import Energy from '@sections/Energy'
import AI from '@sections/AI'
import Media from '@sections/Media'
import Thought from '@sections/Thought'
import Other from '@sections/Other'
import { useDoorState } from '@store/doorState'
import { useScrollLock } from '@hooks/useScrollLock'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const { phase, startOpening } = useDoorState()

  // 启用滚动劫持
  useScrollLock()

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const showContent = phase === 'OPEN' || phase === 'NORMAL_SCROLL'
  const showDoor = phase === 'LOCKED' || phase === 'OPENING' || phase === 'OPEN'
  const showLockedButton = phase === 'LOCKED'

  return (
    <div className="relative min-h-screen bg-base">
      {/* 内容区域 - 门开启后显示 */}
      <div
        className={`transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ParticleCanvas />
        <Nav />
        <main className="relative z-10">
          <Home />
          <Energy />
          <AI />
          <Media />
          <Thought />
          <Other />
        </main>
        <MusicDock />
      </div>

      {/* 门扉覆盖层 */}
      {showDoor && <Door />}

      {/* 锁定状态下的开启按钮 */}
      {showLockedButton && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <button
            onClick={startOpening}
            className="px-8 py-4 text-lg font-medium text-white bg-primary/20 border border-primary/30 rounded-full hover:bg-primary/30 transition-all duration-300 backdrop-blur-sm"
          >
            开启体验
          </button>
        </div>
      )}
    </div>
  )
}

export default App
