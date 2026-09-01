import { Heart, ShieldCheck, Smile, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { photos } from '../data/sonuData'
import { BADGE_CHOICES, getChoice } from '../lib/choices'
import { Portrait } from './Portrait'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const choiceIcons = {
  yes: Heart,
  almost: Sparkles,
  'not-yet': Smile,
}

export function BadgeDecision({ choice, setChoice, photosEnabled }) {
  const reduceMotion = useReducedMotion()
  const selected = getChoice(BADGE_CHOICES, choice)

  return (
    <section className="section section--badge" id="badge-decision">
      <div className="wrap">
        <SectionHeading align="center" eyebrow="apparently this one has to be earned" title="The ‘My Sonu’ badge" copy="Okay Sonu… what is the official verdict?" />
        <div className="badge-layout">
          <Reveal className="badge-seal-card">
            <div className="badge-seal">
              <Portrait photo={photos[3]} enabled={photosEnabled} className="portrait--badge" sizes="(max-width: 767px) 72vw, 340px" />
              <span className="badge-seal__ring" aria-hidden="true" />
              <span className="badge-seal__spark" aria-hidden="true"><Sparkles size={17} /></span>
              <div className="badge-seal__label">
                <Heart size={17} aria-hidden="true" />
                <span>My Sonu</span>
                <small>{selected?.status || 'Pending approval'}</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="badge-question">
            <div className="badge-question__title">
              <ShieldCheck size={22} aria-hidden="true" />
              <div><span>Application review</span><h3>Did Mahak earn it yet?</h3></div>
            </div>
            <div className="choice-stack" role="group" aria-label="My Sonu badge decision">
              {BADGE_CHOICES.map((option) => {
                const Icon = choiceIcons[option.id]
                return (
                  <button
                    key={option.id}
                    type="button"
                    className="choice-button choice-button--large"
                    aria-pressed={choice === option.id}
                    onClick={() => setChoice(option.id)}
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  className={`decision-result decision-result--${selected.id}`}
                  role="status"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                >
                  <strong>{selected.status}</strong>
                  <span>{selected.line}</span>
                  <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

