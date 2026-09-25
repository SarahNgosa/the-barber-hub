import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import LegalSection from '../components/LegalSection'
import { SHOP } from '../data/shop'

export default function Privacy() {
  return (
    <>
      <title>Privacy Policy | The Barber Hub</title>
      <meta name="description" content="How The Barber Hub collects, uses and protects your personal information under POPIA." />

      <PageHero title="Privacy policy">Last updated 1 September 2026</PageHero>

      <div className="wrap max-w-3xl py-16 md:py-24">
        <p className="text-lg leading-relaxed">
          The Barber Hub (Pty) Ltd respects your privacy and processes personal information in line with the Protection of Personal Information Act 4 of 2013 (POPIA).
        </p>

        <LegalSection id="collect" title="What we collect">
          <ul>
            <li>Your name, mobile number and email address when you book.</li>
            <li>Your booking history, chosen barber and any notes you add, such as allergies or style preferences.</li>
          </ul>
        </LegalSection>

        <LegalSection id="why" title="Why we collect it">
          <ul>
            <li>To confirm, remind you about, change or cancel appointments.</li>
            <li>To keep a record of your preferred cut so any barber can repeat it.</li>
            <li>To send offers, only if you've agreed to receive them. You can opt out at any time.</li>
          </ul>
        </LegalSection>

        <LegalSection id="sharing" title="Who we share it with">
          <p>We don't sell your information. We only share it with service providers who help us run bookings and messages, and only as much as they need.</p>
        </LegalSection>

        <LegalSection id="retention" title="How long we keep it">
          <p>We keep booking records for up to 3 years after your last visit, then delete them.</p>
        </LegalSection>

        <LegalSection id="rights" title="Your rights">
          <p>
            You can ask to see, correct or delete your information, or object to how we use it, by emailing <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>. You can also lodge a complaint with the Information Regulator of South Africa.
          </p>
        </LegalSection>

        <LegalSection id="website" title="This website">
          <p>
            This site stores a small amount of information in your browser, such as whether you've already seen our first-visit offer, so we don't show it again. It doesn't use advertising trackers.
          </p>
          <p>See also our <Link to="/terms">Terms &amp; Conditions</Link>.</p>
        </LegalSection>
      </div>
    </>
  )
}