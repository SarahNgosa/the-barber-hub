import { useMemo } from 'react'
import { getBookingDates, getDayStatus, getSlots } from '../../lib/availability'
import { dayOfWeek, dayOfMonth, longDate, shortMonth, formatTime } from '../../lib/dates'
import { DAY_NAMES } from '../../lib/time'

const STATUS_LABEL = { closed: 'Closed', off: 'Off', full: 'Full' }

export default function DateTimeStep({ service, barberId, date, start, onSelectDate, onSelectTime, notice }) {
  const dates = getBookingDates()

  // Working out 21 days of availability is heavy, so useMemo only recalculates when the service or barber changes
  const statuses = useMemo(
    () => Object.fromEntries(dates.map((d) => [d, getDayStatus(d, service, barberId)])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [service.id, barberId]
  )

  const slots = date ? getSlots(date, service, barberId) : []
  const groups = [
    { label: 'Morning', items: slots.filter((s) => s.start < 720) },
    { label: 'Afternoon', items: slots.filter((s) => s.start >= 720 && s.start < 1020) },
    { label: 'Evening', items: slots.filter((s) => s.start >= 1020) },
  ].filter((g) => g.items.length)

  return (
    <div>
      <h2 className="text-3xl">Pick a date and time</h2>
      <p className="mt-2 mb-6 text-slate">Showing the next three weeks. Crossed-out times are already booked.</p>

      {notice && <p role="alert" className="mb-5 border-2 border-ink bg-chalk p-4 font-semibold">{notice}</p>}

      <div role="group" aria-label="Dates" className="flex snap-x gap-2 overflow-x-auto pb-3">
        {dates.map((d, i) => {
          const status = statuses[d]
          const available = status === 'open'
          const selected = d === date
          return (
            <button
              key={d}
              type="button"
              disabled={!available}
              aria-pressed={selected}
              aria-label={`${longDate(d)}${available ? '' : `, ${STATUS_LABEL[status].toLowerCase()}`}`}
              onClick={() => onSelectDate(d)}
              className={`flex w-[76px] shrink-0 snap-start flex-col items-center border-2 px-1 py-2.5 leading-tight transition-colors ${
                selected
                  ? 'border-ink bg-ink text-paper'
                  : available
                    ? 'border-black/15 bg-paper hover:border-ink'
                    : 'cursor-not-allowed border-chalk bg-chalk text-black/35'
              }`}
            >
              <span className="text-xs">{i === 0 ? 'Today' : DAY_NAMES[dayOfWeek(d)].slice(0, 3)}</span>
              <span className="wide my-0.5 text-2xl font-extrabold">{dayOfMonth(d)}</span>
              <span className="text-xs">{available ? shortMonth(d) : STATUS_LABEL[status]}</span>
            </button>
          )
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        {!date && (
          <p className="border-2 border-dashed border-black/15 p-6 text-center text-slate">Choose a date to see available times.</p>
        )}
        {groups.map((g) => (
          <div key={g.label} className="mt-5">
            <h3 className="mb-2 text-base">{g.label}</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2">
              {g.items.map((s) => {
                const selected = s.start === start
                return (
                  <button
                    key={s.start}
                    type="button"
                    disabled={!s.free}
                    aria-pressed={selected}
                    aria-label={`${formatTime(s.start)}${s.free ? '' : ', unavailable'}`}
                    onClick={() => onSelectTime(s.start)}
                    className={`min-h-12 border-2 font-bold transition-colors ${
                      selected
                        ? 'border-ink bg-ink text-paper'
                        : s.free
                          ? 'border-black/15 bg-paper hover:border-ink'
                          : 'cursor-not-allowed border-chalk bg-chalk text-black/30 line-through'
                    }`}
                  >
                    {formatTime(s.start)}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-slate">All times are South African Standard Time (SAST, UTC+2).</p>
    </div>
  )
}