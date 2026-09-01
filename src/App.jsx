import { AnimatePresence } from 'framer-motion'
import { AmbientScene } from './components/AmbientScene'
import { BadgeDecision } from './components/BadgeDecision'
import { CompatibilityReport } from './components/CompatibilityReport'
import { FinalCard } from './components/FinalCard'
import { GenuineNote } from './components/GenuineNote'
import { Hero } from './components/Hero'
import { MemoryGallery } from './components/MemoryGallery'
import { MiniGame } from './components/MiniGame'
import { ScrollProgress } from './components/ScrollProgress'
import { SonuFile } from './components/SonuFile'
import { TonightChoice } from './components/TonightChoice'
import { WhyYou } from './components/WhyYou'
import { photos } from './data/sonuData'
import { BADGE_CHOICES, getChoice, STORAGE_KEYS } from './lib/choices'
import { usePersistentState } from './hooks/usePersistentState'

export default function App({ photosEnabled = true, storageOverride }) {
  const [badgeChoice, setBadgeChoice] = usePersistentState(STORAGE_KEYS.badge, '', storageOverride)
  const [plan, setPlan] = usePersistentState(STORAGE_KEYS.plan, '', storageOverride)
  const [availability, setAvailability] = usePersistentState(STORAGE_KEYS.availability, '', storageOverride)
  const [gameAnswers, setGameAnswers] = usePersistentState(STORAGE_KEYS.game, {}, storageOverride)
  const badgeStatus = getChoice(BADGE_CHOICES, badgeChoice)?.status

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to the note</a>
      <ScrollProgress />
      <AmbientScene />
      <Hero photo={photos[0]} photosEnabled={photosEnabled} badgeStatus={badgeStatus} />
      <main id="main-content">
        <SonuFile />
        <WhyYou photosEnabled={photosEnabled} />
        <CompatibilityReport />
        <MiniGame answers={gameAnswers} setAnswers={setGameAnswers} />
        <MemoryGallery photosEnabled={photosEnabled} />
        <GenuineNote />
        <BadgeDecision choice={badgeChoice} setChoice={setBadgeChoice} photosEnabled={photosEnabled} />
        <AnimatePresence initial={false}>
          {badgeChoice && (
            <TonightChoice
              key="tonight-choice"
              badgeChoice={badgeChoice}
              plan={plan}
              setPlan={setPlan}
              availability={availability}
              setAvailability={setAvailability}
            />
          )}
        </AnimatePresence>
      </main>
      <FinalCard />
    </>
  )
}

