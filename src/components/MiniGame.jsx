import { CheckCircle2, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gameQuestions } from '../data/sonuData'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function MiniGame({ answers, setAnswers }) {
  const reduceMotion = useReducedMotion()
  const complete = gameQuestions.every(({ id }) => answers[id])

  const choose = (questionId, option) => {
    setAnswers((current) => ({ ...current, [questionId]: option }))
  }

  return (
    <section className="section section--game">
      <div className="wrap game-layout">
        <SectionHeading eyebrow="three very scientific questions" title="Earn ‘My Sonu’ privileges" copy="No tricks. No runaway buttons. Your answers are allowed to be your answers." />
        <div className="game-card">
          {gameQuestions.map((question, questionIndex) => (
            <Reveal key={question.id} className="game-question" delay={questionIndex * 0.05}>
              <fieldset>
                <legend><span>0{questionIndex + 1}</span>{question.prompt}</legend>
                <div className="option-row">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option
                    return (
                      <button
                        key={option}
                        type="button"
                        className="choice-button choice-button--compact"
                        aria-pressed={selected}
                        onClick={() => choose(question.id, option)}
                      >
                        <span>{option}</span>
                        {selected && <CheckCircle2 size={17} aria-hidden="true" />}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            </Reveal>
          ))}
          <AnimatePresence>
            {complete && (
              <motion.div
                className="game-result"
                role="status"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Sparkles size={18} aria-hidden="true" />
                <div><strong>Okay. I understand the assignment.</strong><span>Notes saved locally on this device.</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

