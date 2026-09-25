const NAMES = ['Service', 'Barber', 'Date & time', 'Your details']

export default function Stepper({ step, onGoTo }) {
  return (
    <ol aria-label="Booking progress" className="mb-8 grid scroll-mt-24 grid-cols-4 border-2 border-ink">
      {NAMES.map((name, i) => {
        const n = i + 1
        const current = n === step
        const done = n < step
        const label = <>{n}<span className="hidden sm:inline">. {name}</span></>
        return (
          <li key={name} aria-current={current ? 'step' : undefined} className="border-r-2 border-ink last:border-r-0">
            {done ? (
              // Finished steps are clickable, so customers can go back and change something
              <button type="button" onClick={() => onGoTo(n)} className="w-full px-2 py-3 text-sm font-bold underline-offset-4 hover:underline">
                {label}<span className="sr-only"> (completed, go back to this step)</span>
              </button>
            ) : (
              <span className={`block px-2 py-3 text-center text-sm font-bold ${current ? 'bg-ink text-paper' : 'text-slate'}`}>
                {label}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}