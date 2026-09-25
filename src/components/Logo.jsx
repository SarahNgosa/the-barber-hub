export default function Logo() {
  return (
    <span className="flex items-center gap-3">
      {/* The mark: a barber pole inside a circle, drawn as SVG */}
      <svg viewBox="0 0 48 48" className="size-10 shrink-0" aria-hidden="true">
        <defs>
          <clipPath id="tbh-pole">
            <rect x="18" y="10" width="12" height="28" rx="6" />
          </clipPath>
        </defs>
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <g clipPath="url(#tbh-pole)" stroke="currentColor" strokeWidth="3">
          <path d="M12 20L36 8M12 28L36 16M12 36L36 24M12 44L36 32" />
        </g>
        <rect x="18" y="10" width="12" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="16" y="6.5" width="16" height="3" rx="1" fill="currentColor" />
        <rect x="16" y="38.5" width="16" height="3" rx="1" fill="currentColor" />
      </svg>

      {/* The wordmark */}
      <span className="wide flex flex-col leading-none">
        <small className="mb-1 text-[0.62rem] font-semibold tracking-[0.32em]">THE</small>
        <b className="text-lg font-black tracking-wide">BARBER HUB</b>
      </span>
    </span>
  )
}