// Dates are stored as text like "2026-09-29", and times as minutes after midnight (900 = 3:00 PM).
// Text dates avoid timezone bugs: "2026-09-29" means the same day everywhere in the world.

const pad = (n) => String(n).padStart(2, '0')

export function toDateString(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function toUtcDate(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export function addDays(s, n) {
  const date = toUtcDate(s)
  date.setUTCDate(date.getUTCDate() + n)
  return date.toISOString().slice(0, 10)
}

export const dayOfWeek = (s) => toUtcDate(s).getUTCDay()
export const dayOfMonth = (s) => Number(s.slice(8, 10))

// "Tuesday, 29 September 2026"
export const longDate = (s) =>
  toUtcDate(s).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

// "Sept"
export const shortMonth = (s) => toUtcDate(s).toLocaleDateString('en-ZA', { month: 'short', timeZone: 'UTC' })

// formatTime(900) → "3:00 PM"
export function formatTime(mins) {
  const h = Math.floor(mins / 60)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${pad(mins % 60)} ${suffix}`
}