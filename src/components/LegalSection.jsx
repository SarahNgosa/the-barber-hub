export default function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mt-12 mb-4 text-2xl">{title}</h2>
      <div className="space-y-3 leading-relaxed [&_li]:mb-2 [&_ol]:list-[lower-alpha] [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  )
}