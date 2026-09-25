import PageHero from '../components/PageHero'
import HoursTable from '../components/HoursTable'
import OpenStatus from '../components/OpenStatus'
import Button from '../components/Button'
import { SHOP } from '../data/shop'

const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=73+Juta+Street+Braamfontein+Johannesburg'
const mapEmbedUrl = 'https://www.google.com/maps?q=73+Juta+Street,+Braamfontein,+Johannesburg&z=16&output=embed'

export default function Contact() {
  return (
    <>
      <title>Contact &amp; Directions | The Barber Hub</title>
      <meta name="description" content="Find The Barber Hub at 73 Juta Street, Braamfontein, Johannesburg. Phone, WhatsApp, email and opening hours." />

      <PageHero title="Contact us">
        <OpenStatus />
      </PageHero>

      <section className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-3">
        <div>
          <h2 className="text-2xl">Get in touch</h2>
          <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
            <li className="py-4">
              <span className="block text-sm text-slate">Phone</span>
              <a href={SHOP.phoneHref} className="text-lg font-bold underline-offset-4 hover:underline">{SHOP.phone}</a>
            </li>
            <li className="py-4">
              <span className="block text-sm text-slate">WhatsApp</span>
              <a href={SHOP.whatsapp} target="_blank" rel="noopener noreferrer" className="text-lg font-bold underline-offset-4 hover:underline">+27 72 403 2210</a>
            </li>
            <li className="py-4">
              <span className="block text-sm text-slate">Email</span>
              <a href={`mailto:${SHOP.email}`} className="text-lg font-bold break-all underline-offset-4 hover:underline">{SHOP.email}</a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate">
            We reply to WhatsApp and email during opening hours. To book, use online booking or call us.
          </p>
        </div>

        <div>
          <h2 className="text-2xl">Address</h2>
          <address className="mt-5 text-lg not-italic">
            {SHOP.street}<br />{SHOP.suburb}<br />{SHOP.city}, {SHOP.postcode}
          </address>
          <p className="mt-4 text-slate">
            Street parking on Juta and De Beer Street. The Gautrain bus stop at Wits Art Museum is a two-minute walk.
          </p>
          <Button href={directionsUrl} target="_blank" rel="noopener noreferrer" variant="outlineDark" className="mt-6">
            Get directions
          </Button>
        </div>

        <div>
          <h2 className="text-2xl">Opening hours</h2>
          <HoursTable className="mt-3" />
          <p className="mt-3 text-sm text-slate">Closed on public holidays.</p>
          <Button to="/book" className="mt-6">Book online</Button>
        </div>
      </section>

      <section className="wrap pb-20 md:pb-28">
        <iframe
          title="Map showing The Barber Hub at 73 Juta Street, Braamfontein"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[4/3] w-full border-0 bg-chalk grayscale md:aspect-[21/9]"
        />
      </section>
    </>
  )
}