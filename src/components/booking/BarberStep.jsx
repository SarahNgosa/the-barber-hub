import { BARBERS } from '../../data/barbers'
import { DAY_NAMES } from '../../lib/time'
import { optionClass } from './optionStyle'

export default function BarberStep({ selectedId, onSelect }) {
  const options = [
    { id: 'any', name: 'Any available barber', note: 'Shows the most open times' },
    ...BARBERS.map((b) => ({
      id: b.id,
      name: b.name,
      image: b.image,
      note: `${b.role}. Not in on ${b.daysOff.map((d) => `${DAY_NAMES[d]}s`).join(' and ')}`,
    })),
  ]

  return (
    <div>
      <h2 className="text-3xl">Choose your barber</h2>
      <p className="mt-2 mb-6 text-slate">Pick someone specific or take the first available barber.</p>
      <div role="radiogroup" aria-label="Barbers" className="grid gap-2.5">
        {options.map((o) => {
          const selected = o.id === selectedId
          return (
            <button key={o.id} type="button" role="radio" aria-checked={selected} onClick={() => onSelect(o.id)} className={optionClass(selected)}>
              {o.image ? (
                <img src={o.image} alt="" className="size-14 rounded-full object-cover grayscale" />
              ) : (
                <span aria-hidden="true" className={`wide grid size-14 place-items-center rounded-full text-sm font-black ${selected ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>ANY</span>
              )}
              <span className="col-span-2">
                <span className="block font-bold">{o.name}</span>
                <span className={`mt-0.5 block text-sm ${selected ? 'text-white/75' : 'text-slate'}`}>{o.note}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}