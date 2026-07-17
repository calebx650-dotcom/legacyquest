import { useEffect, useState } from 'react'
import { PageHeader, Pill } from '../components/ui.jsx'
import { allEras } from '../content/store.js'

// Offline / History Packs. The whole app is cached by the service worker after
// the first visit, so every "pack" (era) is playable without internet. This
// screen makes that visible and installable for classrooms.

export default function Offline() {
  const [swReady, setSwReady] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((r) => setSwReady(!!r))
    }
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return (
    <div className="view">
      <PageHeader
        icon="📥"
        title="Offline & History Packs"
        subtitle="Play without internet. Once loaded, LegacyQuest and its history packs are cached on your device — ideal for classrooms with limited connectivity."
      />

      <div className="card offline-status">
        <div className="offline-row">
          <span>Connection</span>
          <Pill tone={online ? 'good' : 'accent'}>{online ? 'Online' : 'Offline'}</Pill>
        </div>
        <div className="offline-row">
          <span>Offline mode</span>
          <Pill tone={swReady ? 'good' : 'lock'}>
            {swReady ? 'Ready' : 'Enables after first full load'}
          </Pill>
        </div>
        <p className="muted small">
          Tip: use your browser’s “Install app” / “Add to Home Screen” to run LegacyQuest like a
          native app, fully offline.
        </p>
      </div>

      <h3 className="section-label">History packs</h3>
      <div className="grid grid-buildings">
        {allEras().map((e) => (
          <article key={e.id} className="pack-card" style={{ '--accent': e.accent }}>
            <h3>{e.name}</h3>
            <span className="pack-years">{e.years}</span>
            <Pill tone="good">Available offline</Pill>
          </article>
        ))}
      </div>
    </div>
  )
}
