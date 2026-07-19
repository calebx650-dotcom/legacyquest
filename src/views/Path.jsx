// Quest Path — the new home screen. One winding, chronological journey through
// history: tap the glowing node, play a two-minute activity, watch the path
// light up behind you. Header carries the three daily hooks: streak, the daily
// goal ring, and coins.

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { buildPath, pathStats } from '../game/path.js'
import { Icon } from '../components/icons.jsx'
import { Reward } from '../components/ui.jsx'
import Speak from '../components/Speak.jsx'
import { featuredForDate, featuredId } from '../data/thisday.js'

const DAILY_GOAL = 3

export default function Path() {
  const { state, dispatch } = useGame()
  const navigate = useNavigate()
  const [chest, setChest] = useState(null) // chest node being opened

  const nodes = buildPath(state)
  const stats = pathStats(nodes)
  const activities = Math.min(state.counters.day.activities || 0, DAILY_GOAL)
  const goalPct = (activities / DAILY_GOAL) * 100

  const featured = featuredForDate()
  const fid = featuredId()
  const claimedToday = state.thisDayClaimed === fid

  function open(node) {
    if (node.status === 'locked') return
    audio.play('click')
    switch (node.type) {
      case 'defend':
        navigate('/defend', { state: { era: node.era, eraName: node.eraName } })
        break
      case 'puzzle':
        navigate('/puzzles', { state: { tab: node.id } })
        break
      case 'story':
        navigate('/stories', { state: { play: node.id } })
        break
      case 'boss':
        navigate('/mysteries', { state: { open: node.id } })
        break
      case 'build':
        navigate('/community')
        break
      case 'chest':
        if (node.status === 'current') {
          audio.play('unlock')
          dispatch({ type: 'OPEN_CHEST', id: node.id })
          setChest(node)
        }
        break
      default:
        break
    }
  }

  return (
    <div className="view">
      <header className="path-header">
        <div className="path-stat">
          <span className="path-stat-icon streak-color">
            <Icon name="flame" size={22} />
          </span>
          <div>
            <strong>{state.daily.streak}</strong>
            <span>day streak</span>
          </div>
        </div>

        <div className="goal-ring-wrap" title={`Daily goal: ${activities}/${DAILY_GOAL} activities`}>
          <div className="goal-ring" style={{ '--pct': `${goalPct}%` }}>
            <span>
              {activities}/{DAILY_GOAL}
            </span>
          </div>
          <span className="goal-label">
            {activities >= DAILY_GOAL ? 'Goal complete' : 'Daily goal'}
          </span>
        </div>

        <div className="path-stat">
          <span className="path-stat-icon coin-color">
            <Icon name="coin" size={22} />
          </span>
          <div>
            <strong>{state.legacyPoints}</strong>
            <span>coins</span>
          </div>
        </div>
      </header>

      {!claimedToday && (
        <button
          className="thisday-chip"
          onClick={() => {
            audio.play('unlock')
            dispatch({ type: 'CLAIM_THIS_DAY', id: fid })
          }}
        >
          <span className="thisday-chip-date">{featured.dateLabel}</span>
          <span className="thisday-chip-text">
            {featured.text}
            <Speak text={`On ${featured.dateLabel}. ${featured.text}`} />
          </span>
          <span className="thisday-chip-claim">Claim +10</span>
        </button>
      )}

      <div className="path-progress">
        <span>
          Timeline restored: {stats.done}/{stats.total}
        </span>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${stats.pct}%` }} />
        </div>
      </div>

      <ol className="quest-path">
        {nodes.map((n, i) => (
          <li key={n.id} className={`path-row ${i % 2 ? 'wind-right' : 'wind-left'}`}>
            {n.eraStart && (
              <div className="path-era-label" style={{ '--accent': n.accent }}>
                {n.eraName}
              </div>
            )}
            <button
              className={`path-node status-${n.status} type-${n.type}`}
              style={{ '--accent': n.accent }}
              disabled={n.status === 'locked'}
              onClick={() => open(n)}
              aria-label={`${n.label} (${n.status})`}
            >
              <span className="path-node-icon">
                {n.status === 'done' ? (
                  <Icon name="check" size={22} />
                ) : n.status === 'locked' ? (
                  <Icon name="lock" size={18} />
                ) : (
                  <Icon name={n.icon} size={22} />
                )}
              </span>
              {n.status === 'current' && <span className="path-node-pulse" aria-hidden />}
            </button>
            <span className={`path-node-label ${n.status}`}>{n.label}</span>
          </li>
        ))}
      </ol>

      <p className="path-foot muted">
        Looking for more? Daily challenges, quests, events, and the full library live in{' '}
        <Link to="/more">More</Link>.
      </p>

      {chest && (
        <div className="modal-scrim" onClick={() => setChest(null)}>
          <div className="reveal-card" onClick={(e) => e.stopPropagation()}>
            <span className="reveal-kicker">Chest opened</span>
            <span className="reveal-icon coin-color" aria-hidden>
              <Icon name="chest" size={64} />
            </span>
            <h2>{chest.eraName} secured</h2>
            <Reward points={30}>Milestone reached. +20 XP</Reward>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setChest(null)}>
              Continue the journey
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
