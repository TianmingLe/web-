import MagazineHero from '@components/magazine/MagazineHero'
import MagazineAwards from '@components/magazine/MagazineAwards'
import MagazineExperience from '@components/magazine/MagazineExperience'
import MagazineSkills from '@components/magazine/MagazineSkills'
import MagazineFooter from '@components/magazine/MagazineFooter'

export default function OtherPage() {
  return (
    <div className="relative" style={{ background: '#0D0B0A' }}>
      <MagazineHero />
      <MagazineAwards />
      <MagazineExperience />
      <MagazineSkills />
      <MagazineFooter />
    </div>
  )
}
