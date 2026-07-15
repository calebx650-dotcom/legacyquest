import { levelForXp, levelProgress } from './progression.js'
import { allCollectibles } from '../content/store.js'

export function getLevel(state) {
  return levelForXp(state.xp)
}

export function getLevelInfo(state) {
  return levelProgress(state.xp)
}

export function hasLegendary(state) {
  const all = allCollectibles()
  return state.collectibles.some((id) => all[id]?.rarity === 'legendary')
}

// Context object passed to achievement predicates that need derived values.
export function achievementCtx(state) {
  return { level: getLevel(state), hasLegendary: hasLegendary(state) }
}
