// Slide-over panel for difficulty, audio, and accessibility settings.

import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { DIFFICULTIES } from '../game/progression.js'
import { GameIcon } from './icons.jsx'

function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="toggle-row">
      <span>
        <span className="toggle-label">{label}</span>
        {hint && <span className="toggle-hint">{hint}</span>}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        className={`switch ${checked ? 'on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="knob" />
      </button>
    </label>
  )
}

export default function SettingsPanel({ open, onClose }) {
  const { state, dispatch } = useGame()
  const s = state.settings
  const set = (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch })

  if (!open) return null

  return (
    <div className="drawer-scrim" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <h3 className="drawer-label">Difficulty</h3>
        <div className="diff-grid">
          {Object.values(DIFFICULTIES).map((d) => (
            <button
              key={d.id}
              className={`diff-chip ${state.difficulty === d.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_DIFFICULTY', id: d.id })}
            >
              <span className="diff-icon"><GameIcon glyph={d.icon} size={22} /></span>
              <span className="diff-name">{d.name}</span>
              <span className="diff-aud">{d.audience}</span>
            </button>
          ))}
        </div>
        <p className="drawer-note">{DIFFICULTIES[state.difficulty].blurb}</p>

        <h3 className="drawer-label">Audio</h3>
        <Toggle
          label="Music"
          hint="Original, generated era themes"
          checked={s.music}
          onChange={(v) => {
            audio.play('click')
            set({ music: v })
          }}
        />
        <Toggle
          label="Sound effects"
          hint="Unlocks, puzzles, level-ups"
          checked={s.sfx}
          onChange={(v) => set({ sfx: v })}
        />

        <h3 className="drawer-label">Accessibility</h3>
        <Toggle
          label="Read aloud (text-to-speech)"
          hint="Show read-aloud buttons on stories"
          checked={s.tts}
          onChange={(v) => set({ tts: v })}
        />
        <Toggle
          label="Dyslexia-friendly font"
          checked={s.dyslexia}
          onChange={(v) => set({ dyslexia: v })}
        />
        <Toggle
          label="High contrast"
          checked={s.contrast}
          onChange={(v) => set({ contrast: v })}
        />
        <Toggle
          label="Colorblind-friendly palette"
          hint="Distinct status colors"
          checked={s.colorblind}
          onChange={(v) => set({ colorblind: v })}
        />
        <Toggle
          label="Captions"
          hint="Show text for audio cues"
          checked={s.captions}
          onChange={(v) => set({ captions: v })}
        />
        <Toggle
          label="Reduce motion"
          hint="Minimize animations and transitions"
          checked={s.reducedMotion}
          onChange={(v) => set({ reducedMotion: v })}
        />

        <div className="text-size-row">
          <span className="toggle-label">Text size</span>
          <div className="size-buttons">
            {[
              { k: 'A', v: 0.9 },
              { k: 'A', v: 1 },
              { k: 'A', v: 1.15 },
              { k: 'A', v: 1.3 },
            ].map((o, i) => (
              <button
                key={i}
                className={`size-btn ${Math.abs(s.textScale - o.v) < 0.01 ? 'active' : ''}`}
                style={{ fontSize: `${o.v}em` }}
                onClick={() => set({ textScale: o.v })}
                aria-label={`Text size ${o.v}`}
              >
                {o.k}
              </button>
            ))}
          </div>
        </div>

        <h3 className="drawer-label">Save data</h3>
        <p className="drawer-note">
          Your progress is saved on this device. Move it between devices from the Account screen.
        </p>
        <button
          className="btn btn-ghost"
          style={{ marginTop: 10 }}
          onClick={() => {
            if (window.confirm('Reset all progress? This clears your saved game and onboarding.')) {
              dispatch({ type: 'RESET' })
              onClose()
            }
          }}
        >
          Reset all progress
        </button>

        <h3 className="drawer-label">About</h3>
        <div className="about-block">
          <div className="about-name">LegacyQuest</div>
          <div className="about-version">Version 1.0 · playable prototype</div>
          <p>
            Don’t just learn Black history — live it. The framing story is fiction; every name,
            date, and event is drawn from the verified historical record.
          </p>
        </div>
      </aside>
    </div>
  )
}
