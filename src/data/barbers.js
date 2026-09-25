// daysOff uses the same day numbers as HOURS (0 = Sunday, 6 = Saturday)
export const BARBERS = [
  {
    id: 'thabo', name: 'Thabo Mokoena', role: 'Founder & master barber', years: 14, daysOff: [1],
    image: '/images/barber-thabo.webp',
    tags: ['Scissor cuts', 'Classic styles', 'Grey blending'],
    bio: 'Thabo opened The Barber Hub in 2019 after twelve years cutting in Soweto and Sandton. He still takes clients five days a week and trains every barber who joins the team.',
  },
  {
    id: 'sipho', name: 'Sipho Dlamini', role: 'Fade specialist', years: 8, daysOff: [6],
    image: '/images/barber-sipho.webp',
    tags: ['Skin fades', 'Tapers', 'Hairline designs'],
    bio: "Sipho is the reason people book fades here. Precise, quick and calm, he's known for fades that still look sharp two weeks later.",
  },
  {
    id: 'kyle', name: 'Kyle Adams', role: 'Beard & shave specialist', years: 6, daysOff: [3],
    image: '/images/barber-kyle.webp',
    tags: ['Hot towel shaves', 'Beard sculpting', 'Facials'],
    bio: "Kyle trained in traditional wet shaving in Cape Town. If you're growing a beard or want a proper straight-razor shave, he's your barber.",
  },
]

export const getBarber = (id) => BARBERS.find((b) => b.id === id)