import PageHero from '../components/PageHero'
import Photo from '../components/Photo'
import BarberCard from '../components/BarberCard'
import Button from '../components/Button'
import { BARBERS } from '../data/barbers'

const values = [
  { title: 'On time, every time', text: 'Your appointment time is your start time. If we run more than 10 minutes late, your next visit is 20% off.' },
  { title: 'Fixed, fair prices', text: 'The price on the website is the price you pay. No surprise add-ons at the till.' },
  { title: 'Clean and safe', text: 'Blades are single use. Clippers, combs and chairs are disinfected between every client.' },
]

export default function About() {
  return (
    <>
      <title>About Us &amp; Our Barbers | The Barber Hub</title>
      <meta name="description" content="How The Barber Hub grew from one chair on Juta Street to Braamfontein's favourite barber shop. Meet our barbers." />

      <PageHero title="One chair to a hub">
        How a single chair on Juta Street became Braamfontein's busiest barber shop.
      </PageHero>

      <section className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl space-y-4 text-lg leading-relaxed">
          <h2 className="mb-6 text-4xl md:text-5xl">Our story</h2>
          <p>
            Thabo Mokoena rented one chair in the back of a Braamfontein print shop in 2019. He had twelve years of experience, a set of clippers and a simple idea: a proper barber shop where you know the price before you sit down and you're never kept waiting past your time.
          </p>
          <p>
            Word spread through the students, creatives and office workers of the neighbourhood. By 2021 the print shop had moved out and The Barber Hub took over the whole space. Today there are three barbers, four chairs and more than 600 five-star reviews.
          </p>
          <p>We still run it the same way. Appointments start on time, prices are fixed, and every cut ends with a hot towel.</p>
        </div>
        <Photo src="/images/interior.webp" alt="Inside The Barber Hub with barbers at work" className="aspect-[4/5] lg:aspect-[5/6]" />
      </section>

      <section className="bg-chalk py-20 md:py-28">
        <div className="wrap">
          <h2 className="mb-12 text-4xl md:text-5xl">What we stand for</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-xl">{v.title}</h3>
                <p className="mt-2 text-slate">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl">The barbers</h2>
          <Button to="/book">Book now</Button>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {BARBERS.map((b) => <BarberCard key={b.id} barber={b} />)}
        </div>
      </section>
    </>
  )
}