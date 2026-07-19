// Cross-cutting game systems that watch state and react:
//   • unlock achievements + toast them
//   • auto-claim completed daily/weekly quests + toast them
//   • detect level-ups (toast + sound)
//   • apply accessibility settings to the document root
//   • keep the audio engine in sync with settings and the current era
// Renders the toast stack. Mounted once, near the app root.

import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { analytics } from '../game/analytics.js'
import { ACHIEVEMENTS } from '../data/achievements.js'
import { ALL_QUESTS } from '../data/quests.js'
import { achievementCtx, getLevel } from '../game/selectors.js'
import { allCollectibles } from '../content/store.js'
import { RARITY } from '../data/collectibles.js'
import { GameIcon } from './icons.jsx'

let toastSeq = 0

// Lightweight CSS confetti burst. Pieces are plain divs animated with CSS;
// reduced-motion settings collapse the animation automatically.
function Confetti({ count = 36 }) {
  const colors = ['#f6d47c', '#e9b949', '#8b5cf6', '#2ea36b', '#e05a3b', '#fff']
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${(i * 97) % 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i % 12) * 0.09}s`,
            animationDuration: `${2 + ((i * 7) % 10) / 8}s`,
            transform: `rotate(${(i * 53) % 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default function GameSystems() {
  const { state, dispatch } = useGame()
  const location = useLocation()
  const [toasts, setToasts] = useState([])
  const [reveal, setReveal] = useState(null) // artifact being celebrated
  const [levelBurst, setLevelBurst] = useState(false)
  const levelRef = useRef(getLevel(state))
  const goalRef = useRef(state.counters.day.goalBonus)
  const collectiblesRef = useRef(state.collectibles)
  const onboardedRef = useRef(state.onboarded)
  const firstRun = useRef(true)

  // Track screen visits for the analytics dashboard.
  useEffect(() => {
    analytics.track('view', { path: location.pathname })
  }, [location.pathname])

  const pushToast = useCallback((toast) => {
    const id = ++toastSeq
    setToasts((t) => [...t, { id, ...toast }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])

  // --- Achievements ---
  useEffect(() => {
    const ctx = achievementCtx(state)
    for (const a of ACHIEVEMENTS) {
      if (!state.achievements.includes(a.id) && a.req(state, ctx)) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', id: a.id })
        audio.play('unlock')
        pushToast({ icon: a.icon, title: 'Achievement unlocked', body: a.name })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, dispatch, pushToast])

  // --- Quests: auto-claim when target reached ---
  useEffect(() => {
    const c = state.counters
    for (const q of ALL_QUESTS) {
      const claimed = q.scope === 'day' ? c.claimedDaily : c.claimedWeekly
      const progress = (q.scope === 'day' ? c.day : c.week)[q.counter] || 0
      if (progress >= q.target && !claimed.includes(q.id)) {
        dispatch({ type: 'CLAIM_QUEST', id: q.id })
        pushToast({
          icon: q.scope === 'day' ? '📅' : '🗓️',
          title: `${q.scope === 'day' ? 'Daily' : 'Weekly'} quest complete`,
          body: `${q.name} · +${q.reward.xp} XP`,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.counters, dispatch, pushToast])

  // --- Level ups (with confetti burst) ---
  useEffect(() => {
    const lvl = getLevel(state)
    if (!firstRun.current && lvl > levelRef.current) {
      audio.play('levelup')
      pushToast({ icon: '⭐', title: 'Level up!', body: `You reached Level ${lvl}` })
      setLevelBurst(true)
      setTimeout(() => setLevelBurst(false), 2600)
    }
    levelRef.current = lvl
    firstRun.current = false
  }, [state, pushToast])

  // --- Daily goal: celebrate crossing 3 activities in a day ---
  useEffect(() => {
    const hit = state.counters.day.goalBonus
    if (hit && !goalRef.current && !firstRun.current) {
      audio.play('levelup')
      pushToast({ icon: '🎯', title: 'Daily goal complete', body: '3 activities today. +10 coins' })
      setLevelBurst(true)
      setTimeout(() => setLevelBurst(false), 2600)
    }
    goalRef.current = hit
  }, [state.counters.day.goalBonus, pushToast])

  // --- Artifact reveal: a full-screen celebration when something new is
  // recovered. Skipped for the onboarding artifact (the outro already
  // celebrates it) and suppressed under reduced motion? No — the moment stays,
  // only the animations calm down via CSS.
  useEffect(() => {
    const prev = collectiblesRef.current
    const wasOnboarding = !onboardedRef.current && state.onboarded
    const added = state.collectibles.filter((id) => !prev.includes(id))
    collectiblesRef.current = state.collectibles
    onboardedRef.current = state.onboarded
    if (added.length === 0 || wasOnboarding) return
    const artifact = allCollectibles()[added[0]]
    if (artifact) {
      audio.play('unlock')
      setReveal(artifact)
    }
  }, [state.collectibles, state.onboarded])

  // --- Accessibility settings → document root ---
  useEffect(() => {
    const s = state.settings
    const root = document.documentElement
    root.dataset.dyslexia = s.dyslexia ? 'on' : 'off'
    root.dataset.contrast = s.contrast ? 'on' : 'off'
    root.dataset.colorblind = s.colorblind ? 'on' : 'off'
    root.dataset.motion = s.reducedMotion ? 'reduced' : 'full'
    root.dataset.kids = state.difficulty === 'explorer' ? 'on' : 'off'
    root.style.setProperty('--text-scale', String(s.textScale))
  }, [state.settings, state.difficulty])

  // --- Audio engine sync ---
  useEffect(() => {
    audio.setSfxEnabled(state.settings.sfx)
    audio.setMusicEnabled(state.settings.music)
  }, [state.settings.sfx, state.settings.music])

  const revealRarity = reveal ? RARITY[reveal.rarity] || RARITY.common : null

  return (
    <>
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span className="toast-icon" aria-hidden>
              <GameIcon glyph={t.icon} size={26} />
            </span>
            <div>
              <div className="toast-title">{t.title}</div>
              <div className="toast-body">{t.body}</div>
            </div>
          </div>
        ))}
      </div>

      {levelBurst && <Confetti />}

      {reveal && (
        <div className="reveal-scrim" onClick={() => setReveal(null)}>
          <Confetti count={48} />
          <div
            className="reveal-card"
            style={{ '--rarity': revealRarity.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="reveal-kicker">Artifact recovered!</span>
            <span className="reveal-icon" aria-hidden>
              <GameIcon glyph={reveal.icon} size={68} />
            </span>
            <span className="reveal-rarity" style={{ color: revealRarity.color }}>
              {revealRarity.label} · {reveal.category}
            </span>
            <h2>{reveal.name}</h2>
            <p>{reveal.blurb}</p>
            <button className="btn btn-primary" onClick={() => setReveal(null)}>
              Add to my museum →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
