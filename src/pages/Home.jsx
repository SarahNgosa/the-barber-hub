import { motion, useReducedMotion } from 'motion/react'
import Button from '../components/Button'
import Photo from '../components/Photo'
import Pole from '../components/Pole'
import Reveal from '../components/Reveal'
import ServiceRow from '../components/ServiceRow'
import HoursTable from '../components/HoursTable'
import { SERVICES } from '../data/Services'
import { BARBERS } from '../data/barbers'
import { getOpenStatus } from '../lib/time'

const heroLines = ['Sharp', 'cuts.', 'Clean fades.']

// Trust strip along the bottom of the hero
const heroStats = [
  { value: '★ 4.9', label: '620+ Google reviews' },
  { value: BARBERS.length, label: 'Experienced barbers' },
  { value: '2019', label: 'Cutting in Braamfontein since' },
]

const steps = [
  { title: 'Pick your service', text: 'Choose a cut, beard service or package. Prices and times are shown upfront.' },
  { title: 'Choose barber and time', text: 'Pick a barber or let us match you, then choose any open slot in the next three weeks.' },
  { title: 'Add it to your calendar', text: 'Save the appointment to Google, Apple or Outlook calendar with a reminder an hour before.' },
]

const reviews = [
  { name: 'Lwazi N.', text: "Best skin fade I've had in Joburg. Sipho took his time and it still looks fresh two weeks later." },
  { name: 'Daniel V.', text: 'Booked online at 11pm, got a slot the next morning. The hot towel shave with Kyle is worth every rand.' },
  { name: 'Mpho K.', text: 'I bring my son for the father and son package every month. Thabo is brilliant with kids.' },
]

export default function Home() {
  const status = getOpenStatus()
  const reduceMotion = useReducedMotion()
  const popular = SERVICES.filter((s) => s.popular)

  return (
    <>
      <title>The Barber Hub | Barber Shop in Braamfontein, Johannesburg</title>
      <meta name="description" content="Modern barber shop in Braamfontein, Johannesburg. Fades, scissor cuts, beard trims and hot towel shaves. Book online in under a minute." />

      {/* HERO: pulled up under the see-through header (h-18) so the photo fills the top of the screen */}
      <section className="relative isolate -mt-18 overflow-hidden bg-ink text-paper">
        {/* Full-bleed photo with a slow zoom-out */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: 6, ease: 'easeOut' } }}
        >
          <Photo
            src="/images/hero-cut.webp"
            alt="Barber cutting a client's hair at The Barber Hub"
            className="size-full"
            priority
          />
        </motion.div>
        {/* Dark on the left so the text reads, fading out so the right side of the photo shows through.
            A top fade keeps the header links readable over bright parts of the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ink/70 lg:bg-transparent lg:bg-linear-to-r lg:from-ink/95 lg:via-ink/70 lg:to-ink/10"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink/60 to-transparent" />

        <div className="wrap flex min-h-[min(92vh,820px)] flex-col pt-18">
          <div className="flex flex-1 items-center">
            <div className="max-w-lg py-12 lg:py-16">
              <p className="mb-7 flex items-center gap-2.5 text-white/80">
                <span
                  aria-hidden="true"
                  className={`size-2.5 rounded-full ${status.open ? 'bg-paper shadow-[0_0_0_4px_rgba(255,255,255,0.18)]' : 'border-2 border-steel'}`}
                />
                {status.text}
              </p>

              <h1 className="mb-7 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92] font-black">
                {heroLines.map((line, i) => (
                  <motion.span
                    key={line}
                    className="block"
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <p className="mb-9 text-lg text-white/80 md:text-xl">
                A modern barber shop in Braamfontein. Three experienced barbers, honest prices and online booking that takes under a minute.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button to="/book" variant="light" arrow>Book an appointment</Button>
                <Button to="/services" variant="outlineLight">See services &amp; prices</Button>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <dl className="grid grid-cols-3 gap-4 border-t border-white/15 py-6 md:max-w-3xl md:gap-10">
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-white/60 md:text-sm">{s.label}</dt>
                <dd className="wide text-xl font-black md:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Pole />

      {/* MOST BOOKED */}
      <section className="wrap py-20 md:py-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl">Most booked</h2>
          <Button to="/services" variant="outlineDark" size="sm" arrow>View all {SERVICES.length} services</Button>
        </Reveal>
        <Reveal delay={0.1} className="border-t-2 border-ink">
          {popular.map((s) => <ServiceRow key={s.id} service={s} />)}
        </Reveal>
      </section>

      {/* HOW BOOKING WORKS */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl">Booking takes a minute</h2>
            <p className="text-steel">No calls, no deposits, no account needed.</p>
          </Reveal>
          <ol className="grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="border-t-2 border-paper pt-5">
                <span className="wide block text-5xl font-black">{i + 1}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-steel">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <Button to="/book" variant="light" arrow className="mt-12">Start booking</Button>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-chalk py-20 md:py-28">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl">What clients say</h2>
            <p className="text-slate">4.9 average from 620+ Google reviews</p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal as="figure" key={r.name} delay={i * 0.08}>
                <p aria-label="5 out of 5 stars" className="mb-3 tracking-[3px]">★★★★★</p>
                <blockquote className="text-lg leading-relaxed">{r.text}</blockquote>
                <figcaption className="mt-4 font-bold">{r.name}</figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Photo src="/images/interior.webp" alt="Inside The Barber Hub" className="aspect-[5/4]" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl">Find us on Juta Street</h2>
          <p className="mt-5 max-w-xl text-lg">
            73 Juta Street, Braamfontein. Two minutes' walk from the Gautrain bus stop, with street parking outside.
          </p>
          <HoursTable className="mt-8" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/book" arrow>Book now</Button>
            <Button to="/contact" variant="outlineDark">Directions &amp; contact</Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
