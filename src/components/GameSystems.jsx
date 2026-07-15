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

let toastSeq = 0

export default function GameSystems() {
  const { state, dispatch } = useGame()
  const location = useLocation()
  const [toasts, setToasts] = useState([])
  const levelRef = useRef(getLevel(state))
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

  // --- Level ups ---
  useEffect(() => {
    const lvl = getLevel(state)
    if (!firstRun.current && lvl > levelRef.current) {
      audio.play('levelup')
      pushToast({ icon: '⭐', title: 'Level up!', body: `You reached Level ${lvl}` })
    }
    levelRef.current = lvl
    firstRun.current = false
  }, [state, pushToast])

  // --- Accessibility settings → document root ---
  useEffect(() => {
    const s = state.settings
    const root = document.documentElement
    root.dataset.dyslexia = s.dyslexia ? 'on' : 'off'
    root.dataset.contrast = s.contrast ? 'on' : 'off'
    root.dataset.colorblind = s.colorblind ? 'on' : 'off'
    root.style.setProperty('--text-scale', String(s.textScale))
  }, [state.settings])

  // --- Audio engine sync ---
  useEffect(() => {
    audio.setSfxEnabled(state.settings.sfx)
    audio.setMusicEnabled(state.settings.music)
  }, [state.settings.sfx, state.settings.music])

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <span className="toast-icon" aria-hidden>
            {t.icon}
          </span>
          <div>
            <div className="toast-title">{t.title}</div>
            <div className="toast-body">{t.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
