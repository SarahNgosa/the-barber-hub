import { SHOP } from '../data/shop'
import { getService } from '../data/Services'
import { getBarber } from '../data/barbers'
import { formatDuration } from './time'
import { longDate, formatTime } from './dates'

const SAST_OFFSET_MINUTES = 2 * 60 // South Africa is UTC+2 all year, no daylight saving

// Booking date + start minutes (Johannesburg time) → the exact moment in UTC
function toUtc(date, mins) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 0, mins - SAST_OFFSET_MINUTES))
}

// 2026-09-29T13:00:00.000Z → "20260929T130000Z" (format used by Google and .ics files)
const compact = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

// 2026-09-29T13:00:00.000Z → "2026-09-29T13:00:00Z" (format used by Outlook)
const iso = (dt) => dt.toISOString().replace(/\.\d{3}Z$/, 'Z')

// Everything a calendar event needs, built from the customer's actual booking
export function buildEvent(booking) {
  const service = getService(booking.serviceId)
  const barber = getBarber(booking.barberId)
  const end = booking.start + booking.mins

  return {
    uid: `${booking.ref}@thebarberhub.co.za`,
    title: `${service.name} with ${barber.name.split(' ')[0]} at ${SHOP.name}`,
    start: toUtc(booking.date, booking.start),
    end: toUtc(booking.date, end),
    location: SHOP.fullAddress,
    description: [
      `Booking ref: ${booking.ref}`,
      `Service: ${service.name} (${formatDuration(service.mins)})`,
      `Barber: ${barber.name}`,
      `Time: ${longDate(booking.date)}, ${formatTime(booking.start)} to ${formatTime(end)} (South African time)`,
      `Price: R${booking.total}${booking.discount ? ` (R${booking.discount} discount applied)` : ''}, pay in store`,
      `Booked for: ${booking.name}`,
      '',
      "Please arrive 5 minutes early. Need to change or cancel? Give us at least 4 hours' notice.",
      `Call ${SHOP.phone} or email ${SHOP.email}`,
    ].join('\n'),
  }
}

// Google Calendar: a link that opens a pre-filled "new event" page
export function googleCalendarUrl(ev) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${compact(ev.start)}/${compact(ev.end)}`,
    details: ev.description,
    location: ev.location,
    ctz: SHOP.timeZone,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// Outlook.com: same idea, different address and parameter names
export function outlookCalendarUrl(ev) {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: ev.title,
    startdt: iso(ev.start),
    enddt: iso(ev.end),
    body: ev.description,
    location: ev.location,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`
}

// .ics files have special characters that must be "escaped" with a backslash
function escapeIcs(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

// The .ics standard says lines can't be longer than 75 bytes; longer ones continue on the next line after a space
function foldLine(line) {
  const encoder = new TextEncoder()
  if (encoder.encode(line).length <= 75) return line
  const parts = []
  let current = ''
  for (const char of line) {
    const limit = parts.length ? 74 : 75 // continuation lines start with a space, which counts
    if (encoder.encode(current + char).length > limit) {
      parts.push(current)
      current = char
    } else {
      current += char
    }
  }
  parts.push(current)
  return parts.join('\r\n ')
}

// Apple Calendar (and Outlook desktop, Samsung, etc.) use .ics files
export function buildIcs(ev) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Barber Hub//Online Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${ev.uid}`,
    `DTSTAMP:${compact(new Date())}`,
    `DTSTART:${compact(ev.start)}`,
    `DTEND:${compact(ev.end)}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    `DESCRIPTION:${escapeIcs(ev.description)}`,
    `LOCATION:${escapeIcs(ev.location)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(ev.title)}`,
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(foldLine).join('\r\n') + '\r\n'
}

// Give the customer the .ics file
export function downloadIcs(ev, booking) {
  const ics = buildIcs(ev)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) // iPads that pretend to be Macs

  if (isIOS) {
    // On iPhone/iPad, opening the calendar data directly shows the "Add to Calendar" screen
    window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
    return
  }

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `barber-hub-${booking.date}-${String(booking.start).padStart(4, '0')}.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}