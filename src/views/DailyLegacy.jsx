import { useMemo, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Reward } from '../components/ui.jsx'
import Speak from '../components/Speak.jsx'
import { audio } from '../audio/engine.js'
import { analytics } from '../game/analytics.js'
import { allDailyQuestions } from '../content/store.js'
import { STREAK_MILESTONES } from '../data/collectibles.js'
import { kidText } from '../game/kids.js'
import { Icon } from '../components/icons.jsx'

// Local YYYY-MM-DD (avoids UTC off-by-one across time zones).
function ymd(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Days since the Unix epoch, used to pick the same challenge for everyone today.
function dayIndex(date) {
  return Math.floor(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86_400_000,
  )
}

const FULL_POINTS = 15
const RETRY_POINTS = 8
const HINT_COST = 5

export default function DailyLegacy() {
  const { state, dispatch } = useGame()
  // Wrong picks stay visible and disabled; the player keeps trying — no lockout.
  const [wrongPicks, setWrongPicks] = useState([])
  const [solved, setSolved] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)
  const [hidden, setHidden] = useState([]) // options removed by the hint

  const today = new Date()
  const todayStr = ymd(today)
  const yesterdayStr = ymd(new Date(today.getTime() - 86_400_000))

  const challenge = useMemo(() => {
    const pool = allDailyQuestions()
    return pool[dayIndex(today) % pool.length]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayStr])

  const alreadyDone = state.daily.lastCompleted === todayStr
  const missed = wrongPicks.length > 0
  const rewardPoints = missed ? RETRY_POINTS : FULL_POINTS

  const factText = kidText(state, challenge.fact, challenge.simple)
  const promptText = kidText(state, challenge.quotePrompt, challenge.promptSimple)

  function submit(option) {
    if (alreadyDone || solved || wrongPicks.includes(option) || hidden.includes(option)) return
    const correct = option === challenge.answer
    audio.play(correct ? 'solve' : 'wrong')
    analytics.track('answer', {
      id: `daily-${challenge.id}`,
      label: `Daily: ${challenge.quotePrompt}`,
      correct,
    })
    if (correct) {
      setSolved(true)
      dispatch({
        type: 'COMPLETE_DAILY',
        date: todayStr,
        yesterday: yesterdayStr,
        points: rewardPoints,
      })
    } else {
      setWrongPicks((w) => [...w, option])
    }
  }

  // Hint: spend points to remove two wrong options (a 50/50).
  function useHint() {
    if (hintUsed || solved || alreadyDone || state.legacyPoints < HINT_COST) return
    audio.play('click')
    dispatch({ type: 'SPEND_POINTS', points: HINT_COST })
    const wrongs = challenge.options.filter(
      (o) => o !== challenge.answer && !wrongPicks.includes(o),
    )
    setHidden(wrongs.slice(0, Math.max(0, wrongs.length - 1)).slice(0, 2))
    setHintUsed(true)
  }

  return (
    <div className="view">
      <PageHeader
        icon="📅"
        title="Daily Legacy"
        subtitle="A surprising fact and a quote to identify — every day. Keep your streak alive to unlock exclusive artifacts."
      />

      <div className="streak-banner">
        <span className="flame"><Icon name="flame" size={26} /></span>
        <div>
          <strong>{state.daily.streak}-day streak</strong>
          <span className="muted">
            {alreadyDone
              ? 'Come back tomorrow to keep it going.'
              : 'Answer today’s challenge to extend it.'}
          </span>
        </div>
        <div className="streak-track">
          {STREAK_MILESTONES.map((m) => (
            <span
              key={m.days}
              className={`streak-node ${state.daily.streak >= m.days ? 'hit' : ''}`}
              title={`${m.label} streak reward`}
            >
              <Icon name="flame" size={20} className="streak-flame" />
              {m.days}
            </span>
          ))}
        </div>
      </div>

      <div className="card daily-card">
        <div className="daily-fact">
          <span className="kicker">Did you know?</span>
          <p>
            {factText}
            <Speak text={factText} />
          </p>
        </div>

        <hr className="rule" />

        <div className="daily-quiz">
          <span className="kicker">Identify the source</span>
          <h3>
            {promptText}
            <Speak text={promptText} />
          </h3>
          <div className="option-grid">
            {challenge.options.map((opt) => {
              if (hidden.includes(opt)) return null
              let cls = 'option'
              if (solved || alreadyDone) {
                if (opt === challenge.answer) cls += ' option-correct'
              } else if (wrongPicks.includes(opt)) {
                cls += ' option-wrong'
              }
              return (
                <button
                  key={opt}
                  className={cls}
                  disabled={solved || alreadyDone || wrongPicks.includes(opt)}
                  onClick={() => submit(opt)}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {!solved && !alreadyDone && (
            <div className="daily-actions">
              <button
                className="btn hint-btn"
                onClick={useHint}
                disabled={hintUsed || state.legacyPoints < HINT_COST}
                title={`Removes two wrong answers (−${HINT_COST} coins)`}
              >
                <Icon name="bulb" size={14} /> {hintUsed ? 'Hint used' : `Hint (−${HINT_COST} coins)`}
              </button>
              {missed && (
                <p className="retry-note">
                  Not quite — try another! (Correct now earns +{RETRY_POINTS} coins)
                </p>
              )}
            </div>
          )}

          {alreadyDone && !solved && (
            <p className="muted center">
              You’ve completed today’s Daily Legacy. The answer was{' '}
              <strong>{challenge.answer}</strong>.
            </p>
          )}

          {solved && (
            <Reward points={rewardPoints}>
              {missed ? 'You got there — streak extended!' : 'First try — streak extended!'}
            </Reward>
          )}
        </div>
      </div>
    </div>
  )
}
