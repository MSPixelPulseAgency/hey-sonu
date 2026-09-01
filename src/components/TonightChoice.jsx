import { CalendarClock, MessageCircleHeart, Phone, Utensils, Video } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { AVAILABILITY_CHOICES, buildWhatsAppUrl, TONIGHT_CHOICES } from '../lib/choices'
import { SectionHeading } from './SectionHeading'
import { Waveform } from './Waveform'

const planIcons = {
  call: Phone,
  video: Video,
  dinner: Utensils,
  chat: MessageCircleHeart,
}

export function TonightChoice({ badgeChoice, plan, setPlan, availability, setAvailability }) {
  const reduceMotion = useReducedMotion()
  const whatsAppUrl = buildWhatsAppUrl({ badgeId: badgeChoice, planId: plan, availability })

  return (
    <motion.section
      className="section section--tonight"
      id="tonight"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="wrap">
        <SectionHeading align="center" eyebrow="one more tiny question" title="What am I allowed to initiate tonight?" copy="If I am trying to earn this properly, you get to set the pace." />
        <div className="tonight-grid" role="group" aria-label="Tonight options">
          {TONIGHT_CHOICES.map((option) => {
            const Icon = planIcons[option.id]
            const selected = plan === option.id
            return (
              <button
                key={option.id}
                type="button"
                className="plan-card"
                aria-pressed={selected}
                onClick={() => setPlan(option.id)}
              >
                <span className="plan-card__icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" />{option.id === 'call' && <Waveform />}</span>
                <strong>{option.label}</strong>
                <span>{option.copy}</span>
              </button>
            )
          })}
        </div>
        <p className="deadline-note"><CalendarClock size={17} aria-hidden="true" />Tonight is an option, not a deadline.</p>

        {plan && (
          <motion.div className="availability-card" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
            <fieldset>
              <legend>When are you usually free tonight?</legend>
              <p>No exact schedule needed.</p>
              <div className="availability-options">
                {AVAILABILITY_CHOICES.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="availability"
                      value={option}
                      checked={availability === option}
                      onChange={(event) => setAvailability(event.target.value)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <a className="button button--whatsapp" href={whatsAppUrl} target="_blank" rel="noreferrer" aria-label="Open your answer as a WhatsApp draft">
              <MessageCircleHeart size={19} aria-hidden="true" />
              Send my answer on WhatsApp
            </a>
            <small>This opens a draft for you to review. Nothing sends automatically.</small>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

