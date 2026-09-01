import { ArrowDown, Heart, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { badgeEvidence } from '../data/sonuData'
import { SectionHeading } from './SectionHeading'

export function CatchBadge({ count, setCount }) {
  const reduceMotion = useReducedMotion()
  const complete = count >= 3

  const collectEvidence = () => {
    if (!complete) setCount((value) => Math.min((Number(value) || 0) + 1, 3))
  }

  return (
    <section className="section section--catch" id="catch-badge">
      <div className="wrap catch-wrap">
        <SectionHeading align="center" eyebrow="tiny initiative test" title="Okay Sonu… come collect your evidence 😏" copy="You said I have to earn it. I brought receipts." />
        <div className={`catch-window catch-window--step-${count}`}>
          <span className="catch-window__spark catch-window__spark--one" aria-hidden="true" />
          <span className="catch-window__spark catch-window__spark--two" aria-hidden="true" />
          <button className="catch-heart" type="button" onClick={collectEvidence} disabled={complete} aria-label={complete ? 'My Sonu badge evidence collected' : `Collect evidence ${count + 1} of 3`}>
            <Heart size={54} strokeWidth={1.25} aria-hidden="true" />
            <span>{complete ? 'My Sonu' : 'My Sonu?'}</span>
            <small>{complete ? 'evidence collected' : `tap ${count + 1} of 3`}</small>
          </button>
          <div className="catch-evidence" aria-live="polite">
            <AnimatePresence mode="wait">
              {count > 0 && (
                <motion.div key={count} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }}>
                  <Sparkles size={17} aria-hidden="true" />
                  <p>{badgeEvidence[count - 1]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="catch-dots" aria-label={`${count} of 3 pieces of evidence collected`}>
            {[1, 2, 3].map((step) => <span key={step} className={count >= step ? 'is-collected' : ''} />)}
          </div>
        </div>
        {complete && (
          <motion.div className="catch-complete" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="status">
            <p className="hand-note">Okay… enough running.</p>
            <a className="button button--primary" href="#badge-decision">Did I earn it? <ArrowDown size={18} aria-hidden="true" /></a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
