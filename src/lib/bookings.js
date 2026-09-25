const KEY = 'tbh_bookings'

// localStorage is a small storage space in the visitor's browser that survives page refreshes.
// We wrap it in try/catch because some browsers (like private mode) block it. The site must never crash because of that.
export function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...loadBookings(), booking]))
  } catch {
    // Storage unavailable: the booking still shows as confirmed on screen
  }
}

// e.g. "TBH-7KQ2MX". Letters that look alike (O/0, I/1) are left out so references are easy to read out.
export function makeReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'TBH-'
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  return ref
}