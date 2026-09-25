export default function Pole({ inverted = false }) {
  const [a, b] = inverted ? ['var(--color-paper)', 'var(--color-ink)'] : ['var(--color-ink)', 'var(--color-paper)']
  return (
    <div
      aria-hidden="true"
      className={`h-3.5 border-y-2 ${inverted ? 'border-paper' : 'border-ink'}`}
      style={{ background: `repeating-linear-gradient(-45deg, ${a} 0 12px, ${b} 12px 24px)` }}
    />
  )
}