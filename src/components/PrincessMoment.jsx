import { Crown, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export function PrincessMoment() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="princess-strip" aria-label="Princess or queen treatment">
      <div className="wrap princess-strip__inner">
        <div className="princess-quote">
          <span>She said</span>
          <p>“Hope you give me princess treatment 🤭”</p>
        </div>
        <motion.div className="princess-answer" initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
          <Crown size={25} strokeWidth={1.5} aria-hidden="true" />
          <div><span className="hand-note">Princess?</span><strong>Sonu… I thought we were discussing queen treatment 👑</strong></div>
        </motion.div>
        <p className="princess-footnote"><Sparkles size={14} aria-hidden="true" />Anyway… let me start with dinner before I get ahead of myself 😂 Subject to Sonu approval, obviously.</p>
      </div>
    </section>
  )
}
