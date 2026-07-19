// Defend the Timeline — the answer-powered game mode. The Eraser advances on an
// artifact; every correct answer drives it back and builds a combo multiplier
// (research: the answer should BE the game action). Wrong answers let it
// advance. Survive all questions to win, bank a score, and chase your best.

import { useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { questionsForEra } from '../data/questions.js'
import { allEras } from '../content/store.js'
import { Icon } from '../components/icons.jsx'
import { kidText } from '../game/kids.js'

const ROUND = 8
const ADVANCE = 34 // Eraser progress per wrong answer; 3 misses = defeat
const BASE_XP = 10
const MAX_COMBO = 3

const RANKS = [
  { min: 180, name: 'Gold Keeper' },
  { min: 120, name: 'Silver Keeper' },
  { min: 0, name: 'Bronze Keeper' },
]

export default function Defend() {
  const { state, dispatch } = useGame()
  const location = useLocation()
  const navigate = useNavigate()

  const eras = allEras()
  const eraId = location.state?.era || 'reconstruction'
  const eraName =
    location.state?.eraName || eras.find((e) => e.id === eraId)?.name || 'the timeline'

  const questions = useMemo(() => questionsForEra(eraId, ROUND), [eraId])

  const [qIndex, setQIndex] = useState(0)
  const [eraser, setEraser] = useState(0)
  const [combo, setCombo] = useState(1)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null) // option index picked this question
  const [phase, setPhase] = useState('play') // play | won | lost
  const [floaters, setFloaters] = useState([])
  const floaterSeq = useRef(0)
  const rewarded = useRef(false)

  const q = questions[qIndex]
  const isKids = state.difficulty === 'explorer'

  function addFloater(text, tone) {
    const id = ++floaterSeq.current
    setFloaters((f) => [...f, { id, text, tone }])
    setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 1100)
  }

  function finish(win, finalScore) {
    setPhase(win ? 'won' : 'lost')
    if (win && !rewarded.current) {
      rewarded.current = true
      audio.play('levelup')
      dispatch({ type: 'DEFEND_WIN', era: eraId, score: finalScore })
    } else if (!win) {
      audio.play('wrong')
    }
  }

  function answer(i) {
    if (picked !== null || phase !== 'play') return
    setPicked(i)
    const correct = i === q.a
    let nextScore = score
    let nextEraser = eraser
    if (correct) {
      const gain = BASE_XP * combo
      nextScore = score + gain
      setScore(nextScore)
      setCombo((c) => Math.min(c + 1, MAX_COMBO))
      setEraser((e) => Math.max(0, e - 8))
      audio.play('solve')
      addFloater(`+${gain} XP${combo > 1 ? ` x${combo}` : ''}`, 'good')
    } else {
      nextEraser = eraser + ADVANCE
      setEraser(nextEraser)
      setCombo(1)
      audio.play('wrong')
      addFloater('The Eraser advances', 'bad')
    }

    setTimeout(() => {
      if (nextEraser >= 100) return finish(false, nextScore)
      if (qIndex + 1 >= questions.length) return finish(true, nextScore)
      setQIndex((n) => n + 1)
      setPicked(null)
    }, correct ? 700 : 1400)
  }

  function retry() {
    setQIndex(0)
    setEraser(0)
    setCombo(1)
    setScore(0)
    setPicked(null)
    setPhase('play')
    rewarded.current = false
  }

  const best = state.defendBest[eraId] || 0
  const rank = RANKS.find((r) => score >= r.min)?.name || 'Bronze Keeper'

  return (
    <div className="view defend-view">
      <div className="defend-top">
        <button className="btn btn-sm" onClick={() => navigate('/')}>
          Back to path
        </button>
        <h1 className="defend-title">Defend the Timeline</h1>
        <span className="muted small">{eraName}</span>
      </div>

      <div className="eraser-track" title="The Eraser's advance">
        <div className="eraser-label">
          <Icon name="moon" size={16} /> The Eraser
        </div>
        <div className="eraser-bar">
          <div className="eraser-fill" style={{ width: `${Math.min(eraser, 100)}%` }} />
        </div>
        <div className="eraser-goal">
          <Icon name="vase" size={18} />
        </div>
      </div>

      <div className="defend-hud">
        <span className={`combo combo-${combo}`}>
          <Icon name="bolt" size={14} /> x{combo}
        </span>
        <span className="defend-score">{score} XP</span>
        <span className="muted small">
          {Math.min(qIndex + 1, ROUND)}/{questions.length}
        </span>
      </div>

      {phase === 'play' && q && (
        <div className="card defend-card">
          <h3 className="defend-question">{kidText(state, q.q, q.qSimple)}</h3>
          <div className="option-grid">
            {q.options.map((opt, i) => {
              let cls = 'option'
              if (picked !== null) {
                if (i === q.a) cls += ' option-correct'
                else if (i === picked) cls += ' option-wrong'
              }
              return (
                <button key={opt} className={cls} disabled={picked !== null} onClick={() => answer(i)}>
                  {opt}
                </button>
              )
            })}
          </div>
          {isKids && picked === null && (
            <p className="muted small center">Take your time. Every right answer pushes the Eraser back.</p>
          )}
        </div>
      )}

      {phase !== 'play' && (
        <div className={`card defend-result ${phase}`}>
          {phase === 'won' ? (
            <>
              <span className="reveal-kicker">Timeline defended</span>
              <h2>{rank}</h2>
              <p className="defend-final">
                Score: <strong>{score} XP</strong>
                {best > 0 && (
                  <span className="muted"> · Best: {Math.max(best, score)} XP</span>
                )}
              </p>
              <div className="onboarding-actions">
                <button className="btn" onClick={retry}>
                  Beat your best
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                  Continue the path
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="reveal-kicker" style={{ color: 'var(--red)' }}>
                The Eraser reached the artifact
              </span>
              <h2>Not this time</h2>
              <p className="defend-final muted">
                No progress lost. Read each question closely and try again.
              </p>
              <div className="onboarding-actions">
                <button className="btn btn-primary" onClick={retry}>
                  Try again
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="floater-stack" aria-hidden>
        {floaters.map((f) => (
          <span key={f.id} className={`floater ${f.tone}`}>
            {f.text}
          </span>
        ))}
      </div>
    </div>
  )
}
