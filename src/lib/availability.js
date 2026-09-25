import { HOURS } from '../data/shop'
import { BARBERS, getBarber } from '../data/barbers'
import { sastNow } from './time'
import { toDateString, addDays, dayOfWeek } from './dates'
import { loadBookings } from './bookings'

export const BOOKING_WINDOW_DAYS = 21 // customers can book up to 3 weeks ahead
const SLOT_STEP = 30                   // appointments start on the hour or half hour
const MIN_NOTICE = 30                  // same-day bookings need at least 30 minutes' notice

// Every date a customer can book, starting today (Johannesburg time)
export function getBookingDates() {
  const today = toDateString(sastNow())
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => addDays(today, i))
}

export function isBarberWorking(barber, date) {
  const dow = dayOfWeek(date)
  return Boolean(HOURS[dow]) && !barber.daysOff.includes(dow)
}

// Turns any text into a number. The same text always gives the same number.
function hash(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// The times a barber is already busy on a date, as [start, end] pairs in minutes
function busyTimes(barberId, date) {
  const hours = HOURS[dayOfWeek(date)]
  if (!hours) return []
  const busy = []

  // Pretend other customers have booked about 28% of slots, so the diary looks realistic.
  // Using hash() (not random) means the same slots are taken every time you reload.
  for (let m = hours[0] * 60; m < hours[1] * 60; m += 30) {
    if (hash(`${barberId}|${date}|${m}`) % 100 < 28) busy.push([m, m + 30])
  }

  // Real bookings made on this device
  for (const b of loadBookings()) {
    if (b.barberId === barberId && b.date === date) busy.push([b.start, b.start + b.mins])
  }
  return busy
}

export function isBarberFree(barber, date, start, mins) {
  if (!isBarberWorking(barber, date)) return false
  const end = start + mins
  // Free if the new appointment ends before, or starts after, every busy period
  return busyTimes(barber.id, date).every(([s, e]) => end <= s || start >= e)
}

// "any" means any barber will do, so we check all of them
const candidates = (barberId) => (barberId === 'any' ? BARBERS : [getBarber(barberId)])

// Every possible start time on a date, each marked free or taken
export function getSlots(date, service, barberId) {
  const hours = HOURS[dayOfWeek(date)]
  if (!hours) return []

  const now = sastNow()
  const isToday = date === toDateString(now)
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + MIN_NOTICE : 0

  const slots = []
  // Stop early enough that the whole service finishes before closing time
  for (let start = hours[0] * 60; start + service.mins <= hours[1] * 60; start += SLOT_STEP) {
    const free = start >= earliest && candidates(barberId).some((b) => isBarberFree(b, date, start, service.mins))
    slots.push({ start, free })
  }
  return slots
}

// 'open', 'closed' (shop shut), 'off' (barber's day off) or 'full' (no free times left)
export function getDayStatus(date, service, barberId) {
  if (!HOURS[dayOfWeek(date)]) return 'closed'
  if (!candidates(barberId).some((b) => isBarberWorking(b, date))) return 'off'
  if (!getSlots(date, service, barberId).some((s) => s.free)) return 'full'
  return 'open'
}

// At confirm time: which barber actually gets the booking (important for "any barber")
export function findFreeBarber(date, start, service, barberId) {
  return candidates(barberId).find((b) => isBarberFree(b, date, start, service.mins)) || null
}