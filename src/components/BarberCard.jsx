import { Link } from 'react-router'
import Photo from './Photo'
import { DAY_NAMES } from '../lib/time'

export default function BarberCard({ barber }) {
  const firstName = barber.name.split(' ')[0]
  const offDays = barber.daysOff.map((d) => `${DAY_NAMES[d]}s`).join(' and ')

  return (
    <article>
      <Photo src={barber.image} alt={`Portrait of ${barber.name}`} className="aspect-[4/5]" />
      <h3 className="mt-5 text-2xl">{barber.name}</h3>
      <p className="mt-1 font-semibold">{barber.role}, {barber.years} years</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {barber.tags.map((t) => (
          <li key={t} className="rounded-full border border-current px-2.5 py-0.5 text-xs font-semibold">{t}</li>
        ))}
      </ul>
      <p className="mt-3 text-slate">{barber.bio}</p>
      <p className="mt-2 text-sm text-slate">Not in on {offDays}.</p>
      <Link to={`/book?barber=${barber.id}`} className="mt-3 inline-block font-bold underline decoration-2 underline-offset-4">
        Book with {firstName}
      </Link>
    </article>
  )
}