import Button from '../Button'
import { getService, formatPrice } from '../../data/Services'
import { getBarber } from '../../data/barbers'
import { SHOP } from '../../data/shop'
import { formatDuration } from '../../lib/time'
import { longDate, formatTime } from '../../lib/dates'

export default function Confirmation({ booking, onBookAnother }) {
  const service = getService(booking.serviceId)
  const barber = getBarber(booking.barberId)
  const firstName = booking.name.split(' ')[0]

  const rows = [
    ['Service', `${service.name} (${formatDuration(service.mins)})`],
    ['Barber', `${barber.name}${booking.anyBarber ? ' (assigned for you)' : ''}`],
    ['Date', longDate(booking.date)],
    ['Time', `${formatTime(booking.start)} to ${formatTime(booking.start + booking.mins)} SAST`],
    ['Where', SHOP.fullAddress],
    ['Price', `${formatPrice(booking.total)}${booking.discount ? ` (R${booking.discount} off with ${booking.promo})` : ''}, pay in store`],
  ]

  return (
    <section className="wrap max-w-3xl py-16 md:py-24">
      <title>Booking confirmed | The Barber Hub</title>
      <div aria-hidden="true" className="mb-6 grid size-16 place-items-center rounded-full border-[3px] border-ink">
        <svg width="30" height="30" viewBox="0 0 30 30"><path d="M5 15.5l6.5 6.5L25 8" fill="none" stroke="currentColor" strokeWidth="3.2" /></svg>
      </div>
      <h1 id="confirm-title" tabIndex={-1} className="text-[clamp(2.2rem,5vw,3.4rem)] outline-none">
        You're booked in, {firstName}
      </h1>
      <p className="mt-4 text-lg">We've saved your appointment. Add it to your calendar so you get a reminder an hour before.</p>

      <div className="my-8 border-2 border-ink">
        <div className="flex flex-wrap justify-between gap-3 bg-ink px-5 py-4 font-bold text-paper">
          <span>{SHOP.name}</span>
          <span>Ref {booking.ref}</span>
        </div>
        <dl>
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b border-black/10 px-5 py-3.5 last:border-b-0 sm:grid-cols-[140px_1fr]">
              <dt className="text-slate">{label}</dt>
              <dd className="font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Calendar buttons go here in Step 7 */}

      <p className="mt-8">
        Need to change or cancel? Call{' '}
        <a href={SHOP.phoneHref} className="font-bold underline underline-offset-4">{SHOP.phone}</a>{' '}
        or WhatsApp us at least 4 hours before your appointment.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="outlineDark" onClick={onBookAnother}>Book another appointment</Button>
        <Button to="/" variant="outlineDark">Back to home</Button>
      </div>
    </section>
  )
}