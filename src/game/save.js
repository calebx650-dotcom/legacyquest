// Save portability — the honest, backend-free path to "cloud saves across
// devices": export the full save as a shareable code and import it elsewhere.
//
// A real cloud sync (Google/Apple sign-in, automatic cross-device) needs a
// server and OAuth; `SyncProvider` documents the seam where that drops in. The
// export/import code below already lets a player move progress between devices.

const MAGIC = 'LQv1:'

// Encode an object to a portable, copy-pasteable code (base64 of JSON).
export function exportSave(state) {
  const json = JSON.stringify(state)
  const b64 = btoa(unescape(encodeURIComponent(json)))
  return MAGIC + b64
}

// Decode a code back to a state object. Throws on malformed input.
export function importSave(code) {
  const trimmed = String(code).trim()
  if (!trimmed.startsWith(MAGIC)) throw new Error('Not a LegacyQuest sync code.')
  const b64 = trimmed.slice(MAGIC.length)
  const json = decodeURIComponent(escape(atob(b64)))
  const obj = JSON.parse(json)
  if (typeof obj !== 'object' || obj === null) throw new Error('Corrupt sync code.')
  return obj
}

/**
 * SyncProvider is the interface a real backend would implement. The default
 * LocalProvider keeps everything on-device; a future SupabaseProvider /
 * FirebaseProvider would sign the user in and push/pull the same shape.
 *
 * @typedef {Object} SyncProvider
 * @property {() => Promise<{name:string, provider:string}>} signIn
 * @property {() => Promise<void>} signOut
 * @property {(state:object) => Promise<void>} push   // upload save
 * @property {() => Promise<object|null>} pull        // download save
 */

// Simulated sign-in used by the prototype. Returns a profile without contacting
// any server — clearly a stand-in for real OAuth.
export const LocalProvider = {
  async signIn(provider = 'guest') {
    const names = {
      google: 'Google Keeper',
      apple: 'Apple Keeper',
      guest: 'Guest Keeper',
    }
    return { name: names[provider] || 'Keeper', provider }
  },
  async signOut() {},
  async push() {},
  async pull() {
    return null
  },
}
