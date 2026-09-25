import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="wrap py-28 md:py-36">
      <title>Page not found | The Barber Hub</title>
      <h1 className="text-5xl md:text-7xl">Page not found</h1>
      <p className="mt-5 mb-8 max-w-xl text-lg text-slate">
        That page doesn't exist or has moved. Try one of these instead.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button to="/">Go to home</Button>
        <Button to="/book" variant="outlineDark">Book an appointment</Button>
      </div>
    </section>
  )
}