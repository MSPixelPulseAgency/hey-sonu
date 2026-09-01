import { Heart, Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'

export function FinalCard() {
  return (
    <footer className="section section--final">
      <div className="wrap">
        <Reveal className="final-card">
          <p className="eyebrow"><Sparkles size={14} aria-hidden="true" />okay… website over</p>
          <h2>Now I would rather talk to you.</h2>
          <p>If you smiled even once while scrolling this, I am counting it as a successful deployment.</p>
          <strong>— Mahak <Heart size={18} aria-label="with care" /></strong>
        </Reveal>
        <p className="site-credit">Built with code, curiosity, and far too much initiative.</p>
      </div>
    </footer>
  )
}

