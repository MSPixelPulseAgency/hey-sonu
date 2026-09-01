import { Heart, Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'

export function FinalCard() {
  return (
    <footer className="section section--final">
      <div className="wrap">
        <Reveal className="final-card">
          <img className="final-card__logo" src="/favicon.svg" alt="Sonu heart mark" width="58" height="58" />
          <p className="eyebrow"><Sparkles size={14} aria-hidden="true" />one last thing, Sonu…</p>
          <h2>I made all of this because you caught my attention.</h2>
          <p>And I’d genuinely like the chance to keep it.</p>
          <p className="hand-note final-card__hand">If you smiled even once… I’m counting this as a successful deployment.</p>
          <strong>only for Sonu <Heart size={17} aria-label="with care" /></strong>
        </Reveal>
        <p className="site-credit">Made by Mahak with code, curiosity &amp; an increasingly obvious soft spot for you.</p>
      </div>
    </footer>
  )
}

