import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill, Reward, EmptyNote } from '../components/ui.jsx'
import Speak from '../components/Speak.jsx'
import { audio } from '../audio/engine.js'
import { analytics } from '../game/analytics.js'
import { MYSTERIES } from '../data/mysteries.js'
import { ERAS } from '../data/eras.js'
import { COLLECTIBLES } from '../data/collectibles.js'
import { DIFFICULTIES } from '../game/progression.js'
import { kidText } from '../game/kids.js'

const eraName = (id) => ERAS.find((e) => e.id === id)?.name ?? id

export default function Mysteries() {
  const { state } = useGame()
  const [openId, setOpenId] = useState(null)

  const available = MYSTERIES.filter((m) => state.unlockedEras.includes(m.era))
  const locked = MYSTERIES.filter((m) => !state.unlockedEras.includes(m.era))

  return (
    <div className="view">
      <PageHeader
        icon="🕵️"
        title="History Mysteries"
        subtitle="Collect clues, interview figures, weigh the evidence — then name what really happened."
      />

      {available.length === 0 && (
        <EmptyNote>Restore an era first to open its investigations.</EmptyNote>
      )}

      <div className="grid grid-two">
        {available.map((m) => {
          const solved = state.solvedMysteries.includes(m.id)
          return (
            <article key={m.id} className={`case-card ${solved ? 'solved' : ''}`}>
              <div className="case-top">
                <Pill tone="lock">{eraName(m.era)}</Pill>
                {solved ? <Pill tone="good">Solved ✓</Pill> : <Pill tone="accent">Open case</Pill>}
              </div>
              <h3>{m.title}</h3>
              <p className="case-brief">{m.brief}</p>
              <button className="btn btn-primary" onClick={() => setOpenId(m.id)}>
                {solved ? 'Review case file' : 'Open investigation'}
              </button>
            </article>
          )
        })}
      </div>

      {locked.length > 0 && (
        <>
          <h3 className="section-label">Sealed cases</h3>
          <div className="grid grid-two">
            {locked.map((m) => (
              <article key={m.id} className="case-card case-sealed">
                <Pill tone="lock">🔒 {eraName(m.era)}</Pill>
                <h3>{m.title}</h3>
                <p className="muted">Restore {eraName(m.era)} to unseal this investigation.</p>
              </article>
            ))}
          </div>
        </>
      )}

      {openId && (
        <MysteryModal
          mystery={MYSTERIES.find((m) => m.id === openId)}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}

function MysteryModal({ mystery, onClose }) {
  const { state, dispatch } = useGame()
  const alreadySolved = state.solvedMysteries.includes(mystery.id)
  // Difficulty controls how many clues are revealed for free.
  const ratio = DIFFICULTIES[state.difficulty]?.freeCluesRatio ?? 0.5
  const freeClues = Math.round(mystery.clues.length * ratio)
  const [revealed, setRevealed] = useState(
    alreadySolved ? mystery.clues.length : freeClues,
  )
  const [picked, setPicked] = useState(null)

  const solvedNow = picked === mystery.answerId
  const showAnswer = alreadySolved || solvedNow
  const reward = mystery.unlocks ? COLLECTIBLES[mystery.unlocks] : null

  function revealNext() {
    audio.play('click')
    dispatch({ type: 'COLLECT_CLUE' })
    setRevealed((r) => r + 1)
  }

  function choose(id) {
    if (alreadySolved || picked) return
    setPicked(id)
    analytics.track('answer', {
      id: `mystery-${mystery.id}`,
      label: `Mystery: ${mystery.title}`,
      correct: id === mystery.answerId,
    })
    if (id === mystery.answerId) {
      audio.play('solve')
      dispatch({ type: 'SOLVE_MYSTERY', id: mystery.id })
    } else {
      audio.play('wrong')
    }
  }

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal case-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2>{mystery.title}</h2>
        <p className="case-brief">
          {kidText(state, mystery.brief, mystery.briefSimple)}
          <Speak text={`${mystery.title}. ${kidText(state, mystery.brief, mystery.briefSimple)}`} />
        </p>

        <h4 className="block-label">🔎 Evidence</h4>
        <ol className="clue-list">
          {mystery.clues.map((clue, i) => (
            <li key={i} className={i < revealed ? 'clue-shown' : 'clue-hidden'}>
              {i < revealed ? clue : '• • • • • • • • • •'}
            </li>
          ))}
        </ol>
        {revealed < mystery.clues.length && (
          <button className="btn" onClick={revealNext}>
            Collect next clue ({revealed}/{mystery.clues.length})
          </button>
        )}

        <h4 className="block-label">🗣️ Interviews</h4>
        <div className="interviews">
          {mystery.interviews.map((iv, i) => (
            <blockquote key={i} className="interview">
              <span className="interview-name">{iv.figure}</span>
              {iv.line}
            </blockquote>
          ))}
        </div>

        <h4 className="block-label">⚖️ Your verdict</h4>
        <p className="case-question">{kidText(state, mystery.question, mystery.questionSimple)}</p>
        <div className="option-grid">
          {mystery.choices.map((c) => {
            let cls = 'option'
            if (showAnswer || picked) {
              if (c.id === mystery.answerId) cls += ' option-correct'
              else if (c.id === picked) cls += ' option-wrong'
            }
            return (
              <button
                key={c.id}
                className={cls}
                disabled={!!picked || alreadySolved}
                onClick={() => choose(c.id)}
              >
                {c.text}
              </button>
            )
          })}
        </div>

        {picked && !solvedNow && !alreadySolved && (
          <div className="case-retry">
            <p className="feedback-wrong">Not the answer the evidence supports — look again.</p>
            <button className="btn" onClick={() => setPicked(null)}>
              Try again
            </button>
          </div>
        )}

        {showAnswer && (
          <div className="case-solution">
            {solvedNow && (
              <Reward points={mystery.reward}>
                Case restored!{reward ? ` Recovered “${reward.name}”.` : ''}
              </Reward>
            )}
            <p className="explanation">{mystery.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
