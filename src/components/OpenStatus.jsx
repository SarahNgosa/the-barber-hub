import { getOpenStatus } from '../lib/time'

export default function OpenStatus() {
  const status = getOpenStatus()
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`size-2.5 rounded-full ${status.open ? 'bg-paper shadow-[0_0_0_4px_rgba(255,255,255,0.18)]' : 'border-2 border-steel'}`}
      />
      {status.text}
    </span>
  )
}