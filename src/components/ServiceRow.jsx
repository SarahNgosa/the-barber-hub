import Button from './Button'
import { formatPrice } from '../data/Services'
import { formatDuration } from '../lib/time'

export default function ServiceRow({ service }) {
  return (
    <div className="group/row grid grid-cols-[1fr_auto] items-start gap-x-6 border-b border-black/10 py-6 transition-[background-color,padding] duration-300 hover:bg-chalk sm:grid-cols-[1fr_auto_auto] sm:items-center sm:hover:px-4">
      <div className="min-w-0">
        <h3 className="text-xl">{service.name}</h3>
        <p className="mt-1 max-w-xl text-slate">{service.desc}</p>
      </div>
      <div className="text-right">
        <p className="wide text-2xl font-black">{formatPrice(service.price)}</p>
        <p className="text-sm whitespace-nowrap text-slate">{formatDuration(service.mins)}</p>
      </div>
      <Button
        to={`/book?service=${service.id}`}
        variant="outlineDark"
        size="sm"
        arrow
        className="col-span-2 mt-4 justify-self-start group-hover/row:bg-ink group-hover/row:text-paper sm:col-span-1 sm:mt-0"
        aria-label={`Book ${service.name}`}
      >
        Book
      </Button>
    </div>
  )
}
