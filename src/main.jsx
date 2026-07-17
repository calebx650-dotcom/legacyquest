import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { GameProvider } from './state/GameContext.jsx'
import './index.css'

// HashRouter keeps deep links working when the built app is served from a
// static host or opened directly from disk (offline mode for schools).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <GameProvider>
        <App />
      </GameProvider>
    </HashRouter>
  </React.StrictMode>,
)

// Fade out the launch splash once React has painted its first frame.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const splash = document.getElementById('splash')
    if (splash) {
      splash.classList.add('is-done')
      setTimeout(() => splash.remove(), 600)
    }
  })
})

// Register the service worker for offline play (production only, so it doesn't
// interfere with the dev server's hot reload). When an updated worker takes
// over an already-controlled page (i.e., a new deploy), reload once so users
// stuck on a stale cached build self-heal automatically.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return
    reloaded = true
    window.location.reload()
  })
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* offline support is a progressive enhancement; ignore failures */
    })
  })
}
