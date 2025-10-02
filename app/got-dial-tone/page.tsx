import GotDialToneForm from "@/components/got-dial-tone-form"
import TestimonialsGrid from "@/components/testimonials-grid"

export default function GotDialTonePage() {
  return (
    <main className="min-h-screen z-10 relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/banner.png)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <TestimonialsGrid />
        <GotDialToneForm />
      </div>
    </main>
  )
}
