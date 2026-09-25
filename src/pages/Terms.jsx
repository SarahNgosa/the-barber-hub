import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import LegalSection from '../components/LegalSection'
import { SHOP } from '../data/shop'

const SECTIONS = [
  ['bookings', 'Bookings'],
  ['arrival', 'Arrival and lateness'],
  ['cancellations', 'Cancellations and no-shows'],
  ['prices', 'Prices and payment'],
  ['promotions', 'Promotions and discounts'],
  ['children', 'Children'],
  ['health', 'Health and safety'],
  ['satisfaction', "If you're not happy"],
  ['privacy', 'Your personal information'],
  ['liability', 'Liability'],
  ['changes', 'Changes to these terms'],
  ['law', 'Governing law and contact'],
]

export default function Terms() {
  return (
    <>
      <title>Terms &amp; Conditions | The Barber Hub</title>
      <meta name="description" content="Booking, cancellation, payment and promotion terms for The Barber Hub, Braamfontein." />

      <PageHero title="Terms & conditions">Last updated 1 September 2026</PageHero>

      <div className="wrap max-w-3xl py-16 md:py-24">
        <p className="text-lg leading-relaxed">
          These terms apply to every booking made with The Barber Hub (Pty) Ltd ("The Barber Hub", "we", "us") online, by phone, on WhatsApp or in person. By making a booking you agree to them. If anything is unclear, contact us before you book.
        </p>

        <nav aria-label="Contents" className="mt-8 border-2 border-ink p-6">
          <h2 className="text-lg">Contents</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-6">
            {SECTIONS.map(([id, title]) => (
              <li key={id}><a href={`#${id}`} className="underline-offset-4 hover:underline">{title}</a></li>
            ))}
          </ol>
        </nav>

        <LegalSection id="bookings" title="1. Bookings">
          <ol>
            <li>A booking is confirmed when you receive a booking reference on screen or from our staff.</li>
            <li>Please give accurate contact details. We use them to confirm, remind you about or change your appointment.</li>
            <li>Each booking is for the service selected. If you want extra services on the day, we'll add them if time allows, at the listed price.</li>
            <li>If you choose "Any available barber", we'll assign one when you book. We may change your barber if yours is unexpectedly unavailable, and we'll tell you beforehand.</li>
          </ol>
        </LegalSection>

        <LegalSection id="arrival" title="2. Arrival and lateness">
          <ol>
            <li>Please arrive 5 minutes before your appointment.</li>
            <li>We hold your slot for 10 minutes. After that we may shorten your service so the next client isn't delayed, or ask you to rebook. The full price applies to a shortened service.</li>
            <li>If we run more than 10 minutes late, your next visit is 20% off.</li>
          </ol>
        </LegalSection>

        <LegalSection id="cancellations" title="3. Cancellations and no-shows">
          <ol>
            <li>You can cancel or reschedule free of charge up to 4 hours before your appointment by phone, WhatsApp or email.</li>
            <li>Cancelling with less than 4 hours' notice, or not arriving at all, counts as a no-show.</li>
            <li>After two no-shows within 12 months we may ask for a 50% deposit, paid by EFT, to confirm future bookings.</li>
            <li>If we have to cancel, we'll contact you as soon as possible and offer the next available slot.</li>
          </ol>
        </LegalSection>

        <LegalSection id="prices" title="4. Prices and payment">
          <ol>
            <li>Prices are in South African Rand and include VAT at 15%.</li>
            <li>Payment is due after your service by card, cash or SnapScan.</li>
            <li>We may update prices on the website. The price shown when you booked is the price you pay for that booking.</li>
          </ol>
        </LegalSection>

        <LegalSection id="promotions" title="5. Promotions and discounts">
          <ol>
            <li>The FIRSTHUB code gives R50 off one service on a client's first visit. It's limited to one use per person and can't be combined with other offers.</li>
            <li>We may refuse a promotional discount if it has clearly been used more than once by the same person.</li>
            <li>Discounts have no cash value.</li>
          </ol>
        </LegalSection>

        <LegalSection id="children" title="6. Children">
          <ol>
            <li>Kids cuts are for children under 12.</li>
            <li>A parent or guardian must stay in the shop for the whole appointment.</li>
          </ol>
        </LegalSection>

        <LegalSection id="health" title="7. Health and safety">
          <ol>
            <li>Tell your barber about any scalp or skin condition, allergy or sensitivity before your service starts.</li>
            <li>We may decline a service if it could harm you or spread an infection. There is no charge in that case.</li>
            <li>Razors and blades are single use, and tools are disinfected between clients.</li>
          </ol>
        </LegalSection>

        <LegalSection id="satisfaction" title="8. If you're not happy">
          <ol>
            <li>Please tell your barber before you leave so they can fix it on the spot.</li>
            <li>If you notice something later, contact us within 7 days and we'll offer a free touch-up with the same or another barber.</li>
            <li>We don't offer refunds for completed services. This doesn't affect your rights under the Consumer Protection Act.</li>
          </ol>
        </LegalSection>

        <LegalSection id="privacy" title="9. Your personal information">
          <p>
            We collect your name, phone number, email and booking details only to manage your appointments, and we handle them in line with the Protection of Personal Information Act (POPIA). Read our <Link to="/privacy">Privacy Policy</Link> for full details.
          </p>
        </LegalSection>

        <LegalSection id="liability" title="10. Liability">
          <p>
            We take reasonable care with every service. To the extent allowed by law, we're not responsible for indirect losses or for personal items left in the shop. Nothing in these terms limits your rights under the Consumer Protection Act 68 of 2008.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="11. Changes to these terms">
          <p>We may update these terms from time to time. The version shown on this page when you book applies to that booking.</p>
        </LegalSection>

        <LegalSection id="law" title="12. Governing law and contact">
          <p>
            These terms are governed by the laws of the Republic of South Africa. Questions? Email <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a> or call <a href={SHOP.phoneHref}>{SHOP.phone}</a>. {SHOP.name} (Pty) Ltd, {SHOP.fullAddress}.
          </p>
        </LegalSection>
      </div>
    </>
  )
}