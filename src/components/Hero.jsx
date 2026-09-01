import { ArrowDown, Heart, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Portrait } from './Portrait'

export function Hero({ photo, photosEnabled, badgeStatus }) {
  const reduceMotion = useReducedMotion()

  return (
    <header className="hero" id="top">
      <div className="hero__nav wrap">
        <a className="monogram" href="#top" aria-label="Back to the beginning">
          <Heart size={18} aria-hidden="true" />
          <span>For Sonu</span>
        </a>
        <span className="hero__quiet-label">a private little page</span>
      </div>

      <div className="hero__layout wrap">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow"><Sparkles size={14} aria-hidden="true" />for one unexpectedly interesting girl</p>
          <h1>Sonu, you told me the man should initiate…</h1>
          <p className="hero__aside">So I may have taken that slightly too seriously.</p>
          <p className="hero__lead">
            This started as a random conversation.<br />{' '}
            Then you became someone I genuinely wanted to know better.
          </p>
          <a className="button button--primary" href="#sonu-file">
            See what you started <ArrowDown size={18} aria-hidden="true" />
          </a>
          <p className="microcopy">No pressure. Just a suspicious amount of effort.</p>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__portrait-frame">
            <Portrait photo={photo} enabled={photosEnabled} eager className="portrait--hero" sizes="(max-width: 767px) 86vw, 42vw" />
            <span className="hero__portrait-wash" aria-hidden="true" />
          </div>
          <div className="floating-badge floating-badge--status">
            <span>My Sonu</span>
            <strong>{badgeStatus || 'pending approval'}</strong>
          </div>
          <div className="floating-badge floating-badge--initiative">
            <span>Initiative level</span>
            <strong>suspiciously high</strong>
            <i><b /></i>
          </div>
          <span className="hero__heart-pulse" aria-hidden="true"><Heart size={19} /></span>
        </motion.div>
      </div>
    </header>
  )
}
