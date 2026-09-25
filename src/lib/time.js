import { HOURS } from '../data/shop'

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// formatHour(19) → "7 PM", formatHour(9, 30) → "9:30 AM"
export function formatHour(hour, minutes = 0) {
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const h = hour % 12 || 12
  return minutes ? `${h}:${String(minutes).padStart(2, '0')} ${suffix}` : `${h} ${suffix}`
}

// formatDuration(45) → "45 min", formatDuration(90) → "1 hr 30 min"
export function formatDuration(mins) {
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

// The current time in Johannesburg, whatever timezone the visitor's device is in.
// South Africa is UTC+2 all year round (no daylight saving).
export function sastNow() {
  const now = new Date()
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 2 * 3600000)
}

// "Open now until 7 PM" or "Closed now. Opens tomorrow at 9 AM"
export function getOpenStatus() {
  const now = sastNow()
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  const today = HOURS[day]

  if (today && mins >= today[0] * 60 && mins < today[1] * 60) {
    return { open: true, text: `Open now until ${formatHour(today[1])}` }
  }

  // Look ahead up to a week for the next opening time
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7
    const hours = HOURS[d]
    if (!hours) continue
    if (i === 0 && mins >= hours[0] * 60) continue // today's opening time has already passed
    const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAY_NAMES[d]
    return { open: false, text: `Closed now. Opens ${when} at ${formatHour(hours[0])}` }
  }
  return { open: false, text: 'Closed now' }
}