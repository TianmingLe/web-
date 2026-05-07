import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from '@components/Nav'
import ParticleCanvas from '@components/ParticleCanvas'
import MusicDock from '@components/MusicDock'
import HomePage from '@pages/HomePage'
import EnergyPage from '@pages/EnergyPage'
import AIPage from '@pages/AIPage'
import MediaPage from '@pages/MediaPage'
import ThoughtPage from '@pages/ThoughtPage'
import OtherPage from '@pages/OtherPage'
import HomeBPage from '@pages-b/HomeBPage'
import EnergyBPage from '@pages-b/EnergyBPage'
import AIBPage from '@pages-b/AIBPage'
import MediaBPage from '@pages-b/MediaBPage'
import ThoughtBPage from '@pages-b/ThoughtBPage'
import OtherBPage from '@pages-b/OtherBPage'
import { useVersionState } from '@store/version'

function App() {
  const { version } = useVersionState()
  const isVersionB = version === 'B'

  useEffect(() => {
    if (isVersionB) {
      document.body.classList.add('version-b')
    } else {
      document.body.classList.remove('version-b')
    }
    return () => {
      document.body.classList.remove('version-b')
    }
  }, [isVersionB])

  return (
    <BrowserRouter>
      <div className={`relative min-h-screen transition-colors duration-500 ${isVersionB ? 'bg-b-cream' : 'bg-base'}`}>
        {!isVersionB && <ParticleCanvas />}
        <Nav />
        <main className="relative z-10">
          {isVersionB ? (
            <Routes>
              <Route path="/" element={<HomeBPage />} />
              <Route path="/energy" element={<EnergyBPage />} />
              <Route path="/ai" element={<AIBPage />} />
              <Route path="/media" element={<MediaBPage />} />
              <Route path="/thought" element={<ThoughtBPage />} />
              <Route path="/other" element={<OtherBPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/energy" element={<EnergyPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/thought" element={<ThoughtPage />} />
              <Route path="/other" element={<OtherPage />} />
            </Routes>
          )}
        </main>
        <MusicDock />
      </div>
    </BrowserRouter>
  )
}

export default App
