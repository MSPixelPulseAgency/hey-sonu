import { Footprints, MessageCircleHeart, Phone, Sparkles, Utensils } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { buildWhatsAppUrl, getChoice, TONIGHT_CHOICES, WHATSAPP_CTA_LABEL } from '../lib/choices'
import { SectionHeading } from './SectionHeading'
import { Waveform } from './Waveform'

const planIcons = { dinner: Utensils, meet: Footprints, call: Phone }

export function TonightChoice({ plan, setPlan }) {
  const reduceMotion = useReducedMotion()
  const selected = getChoice(TONIGHT_CHOICES, plan)
  const mainChoices = TONIGHT_CHOICES.filter((option) => option.id !== 'later')
  const laterChoice = TONIGHT_CHOICES.find((option) => option.id === 'later')

  return (
    <section className="section section--tonight" id="tonight">
      <div className="wrap tonight-wrap">
        <SectionHeading align="center" eyebrow="one clear next step" title="So… what are we doing tonight?" copy={<>You don’t like typing. I’m running out of excuses.<br />And apparently I’m responsible for initiating 😂</>} />
        <div className="tonight-grid" role="group" aria-label="Tonight options">
          {mainChoices.map((option) => {
            const Icon = planIcons[option.id]
            return (
              <button key={option.id} type="button" className={`plan-card plan-card--${option.id}`} aria-pressed={plan === option.id} onClick={() => setPlan(option.id)}>
                <span className="plan-card__icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" />{option.id === 'call' && <Waveform />}</span>
                <strong>{option.label}</strong>
                <span>{option.copy}</span>
              </button>
            )
          })}
        </div>
        <button type="button" className="later-choice" aria-pressed={plan === 'later'} onClick={() => setPlan('later')}>
          {laterChoice.label}
        </button>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div key={selected.id} className="plan-result" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }}>
              <span className="choice-confirmation" aria-hidden="true"><Sparkles size={15} /></span>
              <div className="plan-result__copy" role="status">
                <span>Your answer</span>
                <h3>{selected.heading}</h3>
                <p>{selected.response}</p>
              </div>
              <a className="button button--whatsapp" href={buildWhatsAppUrl({ planId: selected.id })} target="_blank" rel="noreferrer" aria-label={`Send “${selected.label}” to Mahak as a WhatsApp draft`}>
                <MessageCircleHeart size={19} aria-hidden="true" />{WHATSAPP_CTA_LABEL}
              </a>
              <small>This opens a draft for you to review. Nothing sends automatically.</small>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
