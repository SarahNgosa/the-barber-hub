export const CATEGORIES = [
  { id: 'cuts', name: 'Haircuts', blurb: 'Every cut includes a consultation, wash and style.' },
  { id: 'beard', name: 'Beard & shave', blurb: 'Hot towels, sharp line-ups and proper beard care.' },
  { id: 'pkg', name: 'Packages', blurb: 'Our most-booked combinations, priced to save you money.' },
  { id: 'extra', name: 'Extras', blurb: 'Add-ons you can book on their own or alongside a cut.' },
]

// mins = how long the appointment takes. price is in Rand, VAT included.
export const SERVICES = [
  { id: 'signature', cat: 'cuts', name: 'Signature cut', mins: 45, price: 250, popular: true, desc: 'Scissor and clipper cut tailored to your head shape, finished with a hot towel and style.' },
  { id: 'skin-fade', cat: 'cuts', name: 'Skin fade', mins: 45, price: 220, popular: true, desc: 'Seamless fade down to the skin with a sharp, clean line-up.' },
  { id: 'taper', cat: 'cuts', name: 'Taper fade', mins: 45, price: 200, desc: 'A softer fade at the temples and neckline that grows out cleanly.' },
  { id: 'buzz', cat: 'cuts', name: 'Buzz cut', mins: 30, price: 120, desc: 'One guard all over, edged and lined up.' },
  { id: 'kids', cat: 'cuts', name: 'Kids cut (under 12)', mins: 30, price: 130, desc: 'Patient, relaxed cuts for young clients. An adult must stay in the shop.' },
  { id: 'beard-trim', cat: 'beard', name: 'Beard trim & line-up', mins: 30, price: 120, popular: true, desc: 'Shape, trim and razor line-up, finished with beard oil.' },
  { id: 'hot-shave', cat: 'beard', name: 'Hot towel shave', mins: 45, price: 200, desc: 'Traditional straight-razor shave with hot towels, pre-shave oil and a cold finish.' },
  { id: 'beard-sculpt', cat: 'beard', name: 'Beard sculpt', mins: 30, price: 150, desc: 'Detailed shaping for longer beards with hot towel and conditioning balm.' },
  { id: 'classic-pkg', cat: 'pkg', name: 'The Hub Classic', mins: 75, price: 330, popular: true, desc: 'Signature cut plus beard trim & line-up. Save R40.' },
  { id: 'full-pkg', cat: 'pkg', name: 'The Full Service', mins: 90, price: 480, desc: 'Signature cut, hot towel shave and a black mask facial. Save R110.' },
  { id: 'father-son', cat: 'pkg', name: 'Father & son', mins: 75, price: 340, desc: 'One adult cut and one kids cut, booked back to back with the same barber.' },
  { id: 'grey', cat: 'extra', name: 'Grey blending', mins: 30, price: 180, desc: 'Subtle colour that softens grey for a natural look.' },
  { id: 'design', cat: 'extra', name: 'Hairline design', mins: 15, price: 60, desc: 'Clean part, lines or a simple pattern cut in by hand.' },
  { id: 'facial', cat: 'extra', name: 'Black mask facial', mins: 30, price: 140, desc: 'Deep-cleansing charcoal mask, steam and moisturiser.' },
]

export const formatPrice = (rand) => `R${rand}`
export const getService = (id) => SERVICES.find((s) => s.id === id)