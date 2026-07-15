// Random & seasonal events, all derived from the calendar so they feel "live"
// without a backend. Includes double-XP weekends, holiday events (Juneteenth,
// Black History Month, Kwanzaa, MLK Day), and a weekly hidden-artifact hunt.

// --- Holiday / seasonal windows -------------------------------------------
function isBlackHistoryMonth(d) {
  return d.getMonth() === 1 // February
}
function isJuneteenth(d) {
  return d.getMonth() === 5 && d.getDate() === 19
}
function isKwanzaa(d) {
  // Dec 26 – Jan 1
  return (d.getMonth() === 11 && d.getDate() >= 26) || (d.getMonth() === 0 && d.getDate() === 1)
}
function isMlkDay(d) {
  // Third Monday of January
  if (d.getMonth() !== 0 || d.getDay() !== 1) return false
  return d.getDate() >= 15 && d.getDate() <= 21
}
function isWeekend(d) {
  return d.getDay() === 0 || d.getDay() === 6
}

// Returns the list of currently-active events for a date.
export function activeEvents(date = new Date()) {
  const events = []
  if (isJuneteenth(date))
    events.push({
      id: 'juneteenth',
      name: 'Juneteenth',
      icon: '🎉',
      xp: 2,
      blurb: 'Celebrate freedom — double XP and a special commemorative artifact today.',
      artifact: 'event-juneteenth',
    })
  if (isBlackHistoryMonth(date))
    events.push({
      id: 'bhm',
      name: 'Black History Month',
      icon: '📚',
      xp: 1.5,
      blurb: 'All February: +50% XP and featured stories every day.',
    })
  if (isKwanzaa(date))
    events.push({
      id: 'kwanzaa',
      name: 'Kwanzaa',
      icon: '🕯️',
      xp: 1.5,
      blurb: 'Seven principles, seven days — bonus XP through the celebration.',
    })
  if (isMlkDay(date))
    events.push({
      id: 'mlk',
      name: 'MLK Day',
      icon: '🕊️',
      xp: 2,
      blurb: 'Honor the dream — double XP and a spotlight on the Civil Rights era.',
    })
  if (isWeekend(date))
    events.push({
      id: 'weekend',
      name: 'Double-XP Weekend',
      icon: '⚡',
      xp: 2,
      blurb: 'It’s the weekend — every action earns double XP.',
    })
  return events
}

// The single highest XP multiplier in effect (used by the reducer). Real and
// live: play on a weekend or holiday and XP genuinely doubles.
export function xpMultiplierForDate(date = new Date()) {
  return activeEvents(date).reduce((m, e) => Math.max(m, e.xp || 1), 1)
}

// A rotating "hidden artifact of the week" the player can hunt for.
export const HIDDEN_ARTIFACTS = ['hidden-lantern', 'hidden-quilt', 'hidden-almanac']

export function hiddenArtifactOfWeek(date = new Date()) {
  const weekIndex = Math.floor(date.getTime() / (86_400_000 * 7))
  return HIDDEN_ARTIFACTS[weekIndex % HIDDEN_ARTIFACTS.length]
}
