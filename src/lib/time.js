// Turns 24-hour numbers into friendly times: formatHour(19) → "7 PM", formatHour(9, 30) → "9:30 AM"
export function formatHour(hour, minutes = 0) {
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const h = hour % 12 || 12
  return minutes ? `${h}:${String(minutes).padStart(2, '0')} ${suffix}` : `${h} ${suffix}`
}