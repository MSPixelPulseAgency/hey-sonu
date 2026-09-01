import { HeartHandshake } from 'lucide-react'
import { BotanicalDivider } from './BotanicalDivider'
import { Reveal } from './Reveal'

export function GenuineNote() {
  return (
    <section className="section section--genuine" id="genuine-note">
      <div className="wrap genuine-wrap">
        <Reveal className="genuine-note">
          <p className="eyebrow"><HeartHandshake size={15} aria-hidden="true" />real talk for a second</p>
          <h2>The part I like most is not that we have things in common.</h2>
          <BotanicalDivider />
          <div className="genuine-note__body">
            <p>It is that talking to you feels easy without feeling empty.</p>
            <p>You care about trust. You care about understanding. You care about what kind of person someone is.</p>
            <p className="genuine-note__noticed">I noticed that.</p>
            <p>I do not know where this goes, and I am not trying to rush it.</p>
            <p>I just know I would rather find out properly than keep wondering.</p>
          </div>
          <p className="genuine-note__question">So… did I earn a little more of your time?</p>
        </Reveal>
      </div>
    </section>
  )
}

