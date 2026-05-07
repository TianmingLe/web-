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

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-base">
        <ParticleCanvas />
        <Nav />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/energy" element={<EnergyPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/thought" element={<ThoughtPage />} />
            <Route path="/other" element={<OtherPage />} />
          </Routes>
        </main>
        <MusicDock />
      </div>
    </BrowserRouter>
  )
}

export default App