import PageHero from '../components/PageHero'
import ServiceRow from '../components/ServiceRow'
import Button from '../components/Button'
import Photo from '../components/Photo'
import { CATEGORIES, SERVICES } from '../data/Services'

export default function Services() {
  return (
    <>
      <title>Services &amp; Prices | The Barber Hub</title>
      <meta name="description" content="Haircuts, skin fades, beard trims, hot towel shaves and packages at The Barber Hub, Braamfontein. Prices in Rand, VAT included." />

      <PageHero title="Services & prices">
        All prices are in South African Rand and include VAT. Pay by card, cash or SnapScan after your cut.
      </PageHero>

      <section className="wrap py-16 md:py-24">
        {/* Jump links to each category */}
        <nav aria-label="Service categories" className="mb-14 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
            >
              {c.name}
            </a>
          ))}
        </nav>

        <div className="space-y-20">
          {CATEGORIES.map((c) => (
            <div key={c.id} id={c.id} className="scroll-mt-28">
              <h2 className="text-3xl md:text-4xl">{c.name}</h2>
              <p className="mt-2 mb-6 text-slate">{c.blurb}</p>
              <div className="border-t-2 border-ink">
                {SERVICES.filter((s) => s.cat === c.id).map((s) => (
                  <ServiceRow key={s.id} service={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl">Not sure what to book?</h2>
            <p className="mt-5 mb-8 max-w-xl text-lg text-steel">
              Book a Signature cut and tell your barber what you're after. If you'd like a beard trim added on the day, we'll fit it in when there's time.
            </p>
            <Button to="/book?service=signature" variant="light">Book a Signature cut</Button>
          </div>
          <Photo src="/images/beard.webp" alt="Barber trimming a client's beard with scissors" className="aspect-[5/4]" />
        </div>
      </section>
    </>
  )
}