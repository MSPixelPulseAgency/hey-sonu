import { AmbientScene } from './components/AmbientScene'
import { BadgeDecision } from './components/BadgeDecision'
import { CatchBadge } from './components/CatchBadge'
import { FinalCard } from './components/FinalCard'
import { Hero } from './components/Hero'
import { PrincessMoment } from './components/PrincessMoment'
import { RealTalkVerdict } from './components/RealTalkVerdict'
import { ScrollProgress } from './components/ScrollProgress'
import { SonuFile } from './components/SonuFile'
import { SpaMoment } from './components/SpaMoment'
import { TonightChoice } from './components/TonightChoice'
import { photos } from './data/sonuData'
import { BADGE_CHOICES, getChoice, STORAGE_KEYS } from './lib/choices'
import { usePersistentState } from './hooks/usePersistentState'

export default function App({ photosEnabled = true, storageOverride }) {
  const [badgeChoice, setBadgeChoice] = usePersistentState(STORAGE_KEYS.badge, '', storageOverride)
  const [plan, setPlan] = usePersistentState(STORAGE_KEYS.plan, '', storageOverride)
  const [storedCatchCount, setCatchCount] = usePersistentState(STORAGE_KEYS.catchCount, 0, storageOverride)
  const catchCount = Math.min(Math.max(Number(storedCatchCount) || 0, 0), 3)
  const badgeStatus = getChoice(BADGE_CHOICES, badgeChoice)?.status

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to the note</a>
      <ScrollProgress />
      <AmbientScene />
      <Hero photos={[photos[0], photos[1]]} photosEnabled={photosEnabled} badgeStatus={badgeStatus} />
      <main id="main-content">
        <SonuFile />
        <SpaMoment />
        <RealTalkVerdict photo={photos[2]} photosEnabled={photosEnabled} />
        <CatchBadge count={catchCount} setCount={setCatchCount} />
        <BadgeDecision choice={badgeChoice} setChoice={setBadgeChoice} photosEnabled={photosEnabled} />
        {badgeChoice && (
          <>
            <PrincessMoment />
            <TonightChoice
              plan={plan}
              setPlan={setPlan}
            />
          </>
        )}
      </main>
      <FinalCard />
    </>
  )
}
