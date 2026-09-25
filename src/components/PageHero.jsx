import Pole from './Pole'

// The black title banner at the top of every inside page
export default function PageHero({ title, children }) {
  return (
    <>
      <section className="bg-ink py-16 text-paper md:py-24">
        <div className="wrap">
          <h1 className="text-[clamp(2.6rem,7vw,5.6rem)]">{title}</h1>
          {children && <div className="mt-5 max-w-2xl text-lg text-white/80 md:text-xl">{children}</div>}
        </div>
      </section>
      <Pole />
    </>
  )
}