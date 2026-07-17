import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader } from '../components/ui.jsx'
import { exportSave, importSave, LocalProvider } from '../game/save.js'

export default function Account() {
  const { state, dispatch } = useGame()
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState(null)
  const [copied, setCopied] = useState(false)

  async function signIn(provider) {
    const profile = await LocalProvider.signIn(provider)
    dispatch({ type: 'SET_ACCOUNT', patch: { signedIn: true, ...profile } })
    setMsg({ ok: true, text: `Signed in as ${profile.name}.` })
  }

  function signOut() {
    dispatch({ type: 'SET_ACCOUNT', patch: { signedIn: false, provider: null, name: 'Guest Keeper' } })
    setMsg(null)
  }

  function copySync() {
    const c = exportSave(state)
    navigator.clipboard?.writeText(c).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      },
      () => setMsg({ ok: false, text: 'Copy failed — select and copy the code manually.' }),
    )
  }

  function applySync() {
    try {
      const imported = importSave(code.trim())
      dispatch({ type: 'IMPORT_SAVE', state: imported })
      setMsg({ ok: true, text: 'Progress restored from sync code.' })
      setCode('')
    } catch (e) {
      setMsg({ ok: false, text: e.message })
    }
  }

  const syncCode = exportSave(state)

  return (
    <div className="view">
      <PageHeader
        icon="👤"
        title="Account & Cloud Save"
        subtitle="Sign in and move your progress between devices. Collections, XP, badges, and streaks travel with you."
      />

      <div className="grid grid-two">
        <section className="card">
          <h3>Profile</h3>
          {state.account.signedIn ? (
            <div className="account-profile">
              <div className="account-avatar">{state.account.name.charAt(0)}</div>
              <div>
                <div className="account-name">{state.account.name}</div>
                <div className="muted small">Signed in with {state.account.provider}</div>
              </div>
              <button className="btn" onClick={signOut}>
                Sign out
              </button>
            </div>
          ) : (
            <>
              <p className="muted">Sign in to label this save and enable sync.</p>
              <div className="signin-buttons">
                <button className="btn signin google" onClick={() => signIn('google')}>
                  <span>G</span> Continue with Google
                </button>
                <button className="btn signin apple" onClick={() => signIn('apple')}>
                  <span>A</span> Continue with Apple
                </button>
                <button className="btn" onClick={() => signIn('guest')}>
                  Continue as Guest
                </button>
              </div>
            </>
          )}
          <p className="demo-note" style={{ marginTop: 14 }}>
            Prototype note: real Google/Apple sign-in and automatic cross-device sync require a
            backend and OAuth. Here, sign-in labels your local save and the sync code below moves
            progress between devices. The code path in <code>src/game/save.js</code> is where a real
            backend (e.g. Supabase/Firebase) plugs in.
          </p>
        </section>

        <section className="card">
          <h3>Cross-device sync</h3>
          <p className="muted">
            Copy this code on one device, paste it on another to restore your full progress.
          </p>
          <label className="field-label">Your sync code</label>
          <textarea className="text-input sync-box" readOnly value={syncCode} rows={4} />
          <button className="btn btn-primary" onClick={copySync}>
            {copied ? 'Copied' : 'Copy sync code'}
          </button>

          <label className="field-label" style={{ marginTop: 18 }}>
            Restore from a code
          </label>
          <textarea
            className="text-input sync-box"
            placeholder="Paste a LegacyQuest sync code…"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={4}
          />
          <button className="btn" onClick={applySync} disabled={!code.trim()}>
            Restore progress
          </button>

          {msg && (
            <p className={msg.ok ? 'feedback-ok' : 'feedback-wrong'} style={{ marginTop: 12 }}>
              {msg.text}
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
