import { getBarber } from '../../data/barbers'
import { formatPrice } from '../../data/Services'
import { PROMOS } from '../../data/promos'
import { formatDuration } from '../../lib/time'
import { longDate, formatTime } from '../../lib/dates'

export default function Summary({ service, barberId, date, start, promo, discount, total }) {
  const barberName = barberId === 'any' ? 'Any available' : getBarber(barberId)?.name
  const rows = [
    ['Service', service?.name],
    ['Duration', service && formatDuration(service.mins)],
    ['Barber', barberName],
    ['Date', date && longDate(date)],
    ['Time', start != null && service && `${formatTime(start)} to ${formatTime(start + service.mins)}`],
  ]

  return (
    <aside aria-label="Booking summary" className="border-2 border-ink p-6 lg:sticky lg:top-24">
      <h2 className="mb-4 text-lg">Your booking</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-slate">{label}</dt>
            <dd className="text-right font-semibold">{value || <span className="font-normal text-slate">Not chosen</span>}</dd>
          </div>
        ))}
        {discount > 0 && (
          <div className="contents">
            <dt className="text-slate">{PROMOS[promo].label}</dt>
            <dd className="text-right font-semibold">-{formatPrice(discount)}</dd>
          </div>
        )}
      </dl>
      <div className="wide mt-4 flex justify-between border-t-2 border-ink pt-3.5 text-xl font-extrabold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <p className="mt-3 text-sm text-slate">Pay in store after your service. Times are South African time (SAST).</p>
    </aside>
  )
}