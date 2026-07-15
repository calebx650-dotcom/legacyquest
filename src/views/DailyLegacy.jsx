import { useMemo, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Reward } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { DAILY_POOL } from '../data/daily.js'

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

const DAILY_POINTS = 15

export default function DailyLegacy() {
  const { state, dispatch } = useGame()
  const [picked, setPicked] = useState(null)

  const today = new Date()
  const todayStr = ymd(today)
  const yesterdayStr = ymd(new Date(today.getTime() - 86_400_000))

  const challenge = useMemo(() => DAILY_POOL[dayIndex(today) % DAILY_POOL.length], [todayStr])

  const alreadyDone = state.daily.lastCompleted === todayStr
  const correct = picked === challenge.answer

  function submit(option) {
    if (alreadyDone || picked) return
    setPicked(option)
    audio.play(option === challenge.answer ? 'solve' : 'wrong')
    if (option === challenge.answer) {
      dispatch({
        type: 'COMPLETE_DAILY',
        date: todayStr,
        yesterday: yesterdayStr,
        points: DAILY_POINTS,
      })
    }
  }

  return (
    <div className="view">
      <PageHeader
        icon="📅"
        title="Daily Legacy"
        subtitle="A surprising fact and a quote to identify — every day. Keep your streak alive to unlock exclusive artifacts."
      />

      <div className="streak-banner">
        <span className="flame">🔥</span>
        <div>
          <strong>{state.daily.streak}-day streak</strong>
          <span className="muted">
            {alreadyDone
              ? 'Come back tomorrow to keep it going.'
              : 'Answer today’s challenge to extend it.'}
          </span>
        </div>
        <div className="streak-track">
          {[3, 7, 14].map((n) => (
            <span key={n} className={`streak-node ${state.daily.streak >= n ? 'hit' : ''}`}>
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="card daily-card">
        <div className="daily-fact">
          <span className="kicker">Did you know?</span>
          <p>{challenge.fact}</p>
        </div>

        <hr className="rule" />

        <div className="daily-quiz">
          <span className="kicker">Identify the source</span>
          <h3>{challenge.quotePrompt}</h3>
          <div className="option-grid">
            {challenge.options.map((opt) => {
              let cls = 'option'
              if (picked || alreadyDone) {
                if (opt === challenge.answer) cls += ' option-correct'
                else if (opt === picked) cls += ' option-wrong'
              }
              return (
                <button
                  key={opt}
                  className={cls}
                  disabled={!!picked || alreadyDone}
                  onClick={() => submit(opt)}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {alreadyDone && !picked && (
            <p className="muted center">
              You’ve completed today’s Daily Legacy. The answer was{' '}
              <strong>{challenge.answer}</strong>.
            </p>
          )}

          {picked &&
            (correct ? (
              <Reward points={DAILY_POINTS}>Correct — streak extended!</Reward>
            ) : (
              <p className="feedback-wrong">
                Not quite. The answer was <strong>{challenge.answer}</strong>. Try again tomorrow to
                build your streak.
              </p>
            ))}
        </div>
      </div>
    </div>
  )
}
