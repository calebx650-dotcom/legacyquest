// A small "read aloud" button. Appears when text-to-speech is enabled in
// Settings — and always in Explorer (kids) mode, where early readers need it
// most. Uses the browser's built-in speech synthesis (no network).

import { useGame } from '../state/GameContext.jsx'
import { isKidsMode } from '../game/kids.js'

export default function Speak({ text, label = 'Read aloud' }) {
  const { state } = useGame()
  if (!state.settings.tts && !isKidsMode(state)) return null

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  function speak() {
    if (!supported) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.98
    u.pitch = 1
    window.speechSynthesis.speak(u)
  }

  if (!supported) return null

  return (
    <button className="speak-btn" onClick={speak} title={label} aria-label={label}>
      🔊
    </button>
  )
}
