// Content pipeline. Base game content lives in /data, but educators can add new
// eras, daily questions, and artifacts through the in-app Content Studio without
// touching code. Custom content is stored in localStorage and MERGED with the
// base content at read time, so the whole game (including unlock logic) picks it
// up live. This is the seam a real CMS/authoring backend would plug into.

import { ERAS } from '../data/eras.js'
import { DAILY_POOL } from '../data/daily.js'
import { COLLECTIBLES } from '../data/collectibles.js'

const KEY = 'legacyquest.content.v1'

const blank = () => ({ eras: [], daily: [], artifacts: [] })

export function getCustom() {
  try {
    return { ...blank(), ...(JSON.parse(localStorage.getItem(KEY)) || {}) }
  } catch {
    return blank()
  }
}

function saveCustom(c) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c))
  } catch {
    /* ignore */
  }
}

export function addContent(type, item) {
  const c = getCustom()
  const id = `custom-${type}-${Date.now()}`
  c[type] = [...c[type], { ...item, id, custom: true }]
  saveCustom(c)
  return id
}

export function removeContent(type, id) {
  const c = getCustom()
  c[type] = c[type].filter((x) => x.id !== id)
  saveCustom(c)
}

export function exportContent() {
  return JSON.stringify(getCustom(), null, 2)
}

export function importContent(json) {
  const parsed = JSON.parse(json)
  const c = { ...blank(), ...parsed }
  saveCustom(c)
  return c
}

// --- Merged views used throughout the app -------------------------------

export function allEras() {
  const custom = getCustom().eras.map((e) => ({
    accent: '#3bb0c9',
    figures: [],
    tagline: e.tagline || 'Custom era',
    ...e,
  }))
  return [...ERAS, ...custom]
}

export function allDailyQuestions() {
  return [...DAILY_POOL, ...getCustom().daily]
}

export function customArtifacts() {
  const map = {}
  for (const a of getCustom().artifacts) map[a.id] = a
  return map
}

export function allCollectibles() {
  return { ...COLLECTIBLES, ...customArtifacts() }
}
