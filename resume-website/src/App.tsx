import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@components/Nav'
import ParticleCanvas from '@components/ParticleCanvas'
import MusicDock from '@components/MusicDock'
import Home from '@sections/Home'
import Energy from '@sections/Energy'
import AI from '@sections/AI'
import Media from '@sections/Media'
import Thought from '@sections/Thought'
import Other from '@sections/Other'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-base">
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
  )
}

export default App
