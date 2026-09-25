import { CATEGORIES, SERVICES, formatPrice } from '../../data/Services'
import { formatDuration } from '../../lib/time'
import { optionClass } from './optionStyle'

export default function ServiceStep({ selectedId, onSelect }) {
  return (
    <div>
      <h2 className="text-3xl">Choose a service</h2>
      <p className="mt-2 mb-6 text-slate">Prices include VAT. You can add extras with your barber on the day.</p>
      <div role="radiogroup" aria-label="Services" className="space-y-8">
        {CATEGORIES.map((c) => (
          <div key={c.id}>
            <h3 className="mb-3 text-lg">{c.name}</h3>
            <div className="grid gap-2.5">
              {SERVICES.filter((s) => s.cat === c.id).map((s) => {
                const selected = s.id === selectedId
                return (
                  <button key={s.id} type="button" role="radio" aria-checked={selected} onClick={() => onSelect(s.id)} className={optionClass(selected)}>
                    <span className="col-span-2">
                      <span className="block font-bold">{s.name}</span>
                      <span className={`mt-0.5 block text-sm ${selected ? 'text-white/75' : 'text-slate'}`}>
                        {formatDuration(s.mins)}. {s.desc}
                      </span>
                    </span>
                    <span className="wide text-lg font-extrabold">{formatPrice(s.price)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}