// A small "read aloud" button. Only appears when the player has enabled
// text-to-speech in Settings, and uses the browser's built-in speech synthesis
// (no network, no external service).

import { useGame } from '../state/GameContext.jsx'

export default function Speak({ text, label = 'Read aloud' }) {
  const { state } = useGame()
  if (!state.settings.tts) return null

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
