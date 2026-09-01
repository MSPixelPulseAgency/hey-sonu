import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Portrait } from './Portrait'

export function Hero({ photos, photosEnabled, badgeStatus }) {
  const reduceMotion = useReducedMotion()

  return (
    <header className="hero" id="top">
      <div className="hero__nav wrap">
        <a className="monogram" href="#top" aria-label="Back to the beginning">
          <img src="/favicon.svg" alt="" width="28" height="28" />
          <span>For Sonu</span>
        </a>
        <span className="hero__quiet-label">made with suspicious initiative</span>
      </div>

      <div className="hero__layout wrap">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow"><Sparkles size={14} aria-hidden="true" />for one girl who said the man should initiate</p>
          <h1>Sonu… I took that personally.</h1>
          <p className="hero__lead">You said actions matter more than words.<br />{' '}Unfortunately for you, I build things for a living.</p>
          <p className="hand-note hero__hand-note">so yes… this is me flexing a little 😌</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#catch-badge">
              See if I earned it <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="#badge-decision">
              Skip to tonight 👀 <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.62, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-collage">
            <figure className="polaroid polaroid--hero-main">
              <span className="tape" aria-hidden="true" />
              <Portrait photo={photos[0]} enabled={photosEnabled} eager className="portrait--hero-main" sizes="(max-width: 767px) 62vw, 31vw" />
              <figcaption>the smile that started problems</figcaption>
            </figure>
            <figure className="polaroid polaroid--hero-small">
              <span className="tape tape--lavender" aria-hidden="true" />
              <Portrait photo={photos[1]} enabled={photosEnabled} eager className="portrait--hero-small" sizes="(max-width: 767px) 42vw, 20vw" />
              <figcaption>apparently shy</figcaption>
            </figure>
            <div className="hero-status-card">
              <span>My Sonu</span>
              <strong>status: {badgeStatus?.toLowerCase() || 'still under review'}</strong>
            </div>
            <span className="collage-note collage-note--photo">yes, you really are this photogenic</span>
            <span className="collage-heart" aria-hidden="true">S</span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
