import { useState } from 'react'
import { PageHeader, Pill } from '../components/ui.jsx'
import { RARITY } from '../data/collectibles.js'
import { addContent, removeContent, getCustom, exportContent, importContent, allEras } from '../content/store.js'

export default function Studio() {
  const [, force] = useState(0)
  const refresh = () => force((n) => n + 1)
  const custom = getCustom()

  const [daily, setDaily] = useState({ fact: '', quotePrompt: '', o1: '', o2: '', o3: '', o4: '', answer: 'o1' })
  const [artifact, setArtifact] = useState({ name: '', category: 'Document', rarity: 'common', icon: '📜', era: 'reconstruction', blurb: '' })
  const [era, setEra] = useState({ name: '', years: '', summary: '', unlockCost: 50 })
  const [io, setIo] = useState('')
  const [msg, setMsg] = useState(null)

  function saveDaily(e) {
    e.preventDefault()
    const options = [daily.o1, daily.o2, daily.o3, daily.o4].filter(Boolean)
    if (!daily.fact || !daily.quotePrompt || options.length < 2) return
    const answer = daily[daily.answer]
    addContent('daily', { fact: daily.fact, quotePrompt: daily.quotePrompt, options, answer })
    setDaily({ fact: '', quotePrompt: '', o1: '', o2: '', o3: '', o4: '', answer: 'o1' })
    refresh()
  }

  function saveArtifact(e) {
    e.preventDefault()
    if (!artifact.name || !artifact.blurb) return
    addContent('artifacts', { ...artifact })
    setArtifact({ name: '', category: 'Document', rarity: 'common', icon: '📜', era: 'reconstruction', blurb: '' })
    refresh()
  }

  function saveEra(e) {
    e.preventDefault()
    if (!era.name || !era.summary) return
    addContent('eras', { ...era, unlockCost: Number(era.unlockCost) || 0 })
    setEra({ name: '', years: '', summary: '', unlockCost: 50 })
    refresh()
  }

  function doExport() {
    setIo(exportContent())
    setMsg({ ok: true, text: 'Exported current custom content below.' })
  }
  function doImport() {
    try {
      importContent(io)
      setMsg({ ok: true, text: 'Imported custom content.' })
      refresh()
    } catch {
      setMsg({ ok: false, text: 'Invalid JSON.' })
    }
  }

  return (
    <div className="view">
      <PageHeader
        icon="🛠️"
        title="Content Studio"
        subtitle="Add new eras, daily questions, and artifacts — no code required. Custom content merges straight into the live game and travels in your save."
      />

      <div className="grid grid-two">
        <form className="card studio-form" onSubmit={saveDaily}>
          <h3>New daily question</h3>
          <input className="text-input" placeholder="Surprising fact…" value={daily.fact} onChange={(e) => setDaily({ ...daily, fact: e.target.value })} />
          <input className="text-input" placeholder="Quote prompt (e.g. Who said…?)" value={daily.quotePrompt} onChange={(e) => setDaily({ ...daily, quotePrompt: e.target.value })} />
          <div className="studio-options">
            {['o1', 'o2', 'o3', 'o4'].map((k) => (
              <label key={k} className="studio-option">
                <input type="radio" name="answer" checked={daily.answer === k} onChange={() => setDaily({ ...daily, answer: k })} />
                <input className="text-input" placeholder={`Option ${k.slice(1)}`} value={daily[k]} onChange={(e) => setDaily({ ...daily, [k]: e.target.value })} />
              </label>
            ))}
          </div>
          <p className="muted small">Select the radio next to the correct answer.</p>
          <button className="btn btn-primary" type="submit">Add question</button>
        </form>

        <form className="card studio-form" onSubmit={saveArtifact}>
          <h3>New artifact</h3>
          <input className="text-input" placeholder="Artifact name" value={artifact.name} onChange={(e) => setArtifact({ ...artifact, name: e.target.value })} />
          <div className="studio-row">
            <input className="text-input" placeholder="Emoji" value={artifact.icon} onChange={(e) => setArtifact({ ...artifact, icon: e.target.value })} />
            <input className="text-input" placeholder="Category" value={artifact.category} onChange={(e) => setArtifact({ ...artifact, category: e.target.value })} />
          </div>
          <div className="studio-row">
            <select className="text-input" value={artifact.rarity} onChange={(e) => setArtifact({ ...artifact, rarity: e.target.value })}>
              {Object.keys(RARITY).map((r) => <option key={r} value={r}>{RARITY[r].label}</option>)}
            </select>
            <select className="text-input" value={artifact.era} onChange={(e) => setArtifact({ ...artifact, era: e.target.value })}>
              {allEras().map((er) => <option key={er.id} value={er.id}>{er.name}</option>)}
            </select>
          </div>
          <textarea className="text-input" placeholder="Description" rows={2} value={artifact.blurb} onChange={(e) => setArtifact({ ...artifact, blurb: e.target.value })} />
          <button className="btn btn-primary" type="submit">Add artifact</button>
        </form>

        <form className="card studio-form" onSubmit={saveEra}>
          <h3>New era</h3>
          <input className="text-input" placeholder="Era name" value={era.name} onChange={(e) => setEra({ ...era, name: e.target.value })} />
          <div className="studio-row">
            <input className="text-input" placeholder="Years (e.g. 1900–1950)" value={era.years} onChange={(e) => setEra({ ...era, years: e.target.value })} />
            <input className="text-input" type="number" placeholder="Unlock cost" value={era.unlockCost} onChange={(e) => setEra({ ...era, unlockCost: e.target.value })} />
          </div>
          <textarea className="text-input" placeholder="Summary" rows={3} value={era.summary} onChange={(e) => setEra({ ...era, summary: e.target.value })} />
          <button className="btn btn-primary" type="submit">Add era</button>
        </form>

        <section className="card studio-form">
          <h3>Import / export</h3>
          <p className="muted small">Share content packs as JSON — the seam a real CMS would use.</p>
          <textarea className="text-input" rows={6} value={io} onChange={(e) => setIo(e.target.value)} placeholder="Custom content JSON…" />
          <div className="studio-row">
            <button className="btn" onClick={doExport} type="button">Export</button>
            <button className="btn btn-primary" onClick={doImport} type="button" disabled={!io.trim()}>Import</button>
          </div>
          {msg && <p className={msg.ok ? 'feedback-ok' : 'feedback-wrong'}>{msg.text}</p>}
        </section>
      </div>

      <h3 className="section-label">Your custom content</h3>
      {custom.daily.length + custom.artifacts.length + custom.eras.length === 0 ? (
        <p className="empty-note">Nothing yet. Add content above and it appears live in Daily Legacy, the Museum, and Eras.</p>
      ) : (
        <div className="custom-list">
          {[
            ...custom.eras.map((x) => ({ ...x, type: 'eras', kind: 'Era', name: x.name })),
            ...custom.daily.map((x) => ({ ...x, type: 'daily', kind: 'Daily', name: x.quotePrompt })),
            ...custom.artifacts.map((x) => ({ ...x, type: 'artifacts', kind: 'Artifact', name: x.name })),
          ].map((x) => (
            <div key={x.id} className="custom-row">
              <Pill tone="accent">{x.kind}</Pill>
              <span className="custom-name">{x.name}</span>
              <button className="link-btn" onClick={() => { removeContent(x.type, x.id); refresh() }}>remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
