import { Heart, MessageCircleHeart, ShieldCheck, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { photos } from '../data/sonuData'
import { BADGE_CHOICES, buildWhatsAppUrl, getChoice, WHATSAPP_CTA_LABEL } from '../lib/choices'
import { Portrait } from './Portrait'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function BadgeDecision({ choice, setChoice, photosEnabled }) {
  const reduceMotion = useReducedMotion()
  const selected = getChoice(BADGE_CHOICES, choice)
  const primaryChoices = BADGE_CHOICES.filter((option) => option.id !== 'not-yet')
  const safeChoice = BADGE_CHOICES.find((option) => option.id === 'not-yet')

  return (
    <section className="section section--badge" id="badge-decision">
      <div className="wrap">
        <SectionHeading align="center" eyebrow="the actual verdict" title="Okay Sonu… did I earn the ‘My Sonu’ badge yet?" copy="Your answer sets the pace. All three are completely allowed." />
        <div className="badge-layout">
          <Reveal className="badge-seal-card">
            <div className="badge-seal">
              <Portrait photo={photos[3]} enabled={photosEnabled} className="portrait--badge" sizes="(max-width: 767px) 76vw, 350px" />
              <span className="badge-seal__ring" aria-hidden="true" />
              <span className="badge-seal__spark" aria-hidden="true"><Sparkles size={17} /></span>
              <div className="badge-seal__label">
                <img src="/favicon.svg" alt="" width="24" height="24" />
                <span>My Sonu</span>
                <small>{selected?.status || 'Pending Sonu approval'}</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="badge-question">
            <div className="badge-question__title">
              <ShieldCheck size={22} aria-hidden="true" />
              <div><span>Sonu approval desk</span><h3>Okay… what is the verdict?</h3></div>
            </div>
            <div className="badge-primary-choices" role="group" aria-label="My Sonu badge decision">
              {primaryChoices.map((option) => (
                <button key={option.id} type="button" className="badge-choice" aria-pressed={choice === option.id} onClick={() => setChoice(option.id)}>
                  <Heart size={19} aria-hidden="true" />
                  <span>{option.label}</span>
                </button>
              ))}
              <button type="button" className="badge-choice badge-choice--safe" aria-pressed={choice === safeChoice.id} onClick={() => setChoice(safeChoice.id)}>
                {safeChoice.label}
              </button>
            </div>
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div key={selected.id} className={`decision-result decision-result--${selected.id}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }}>
                  <span className="choice-confirmation" aria-hidden="true"><Sparkles size={15} /></span>
                  <div className="decision-result__copy" role="status">
                    <strong>{selected.status}</strong>
                    <span>{selected.line}</span>
                  </div>
                  <a className="button button--whatsapp" href={buildWhatsAppUrl({ badgeId: selected.id })} target="_blank" rel="noreferrer" aria-label={`Send “${selected.label}” to Mahak as a WhatsApp draft`}>
                    <MessageCircleHeart size={19} aria-hidden="true" />{WHATSAPP_CTA_LABEL}
                  </a>
                  <small>This opens a draft for you to review. Nothing sends automatically.</small>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
