import GotDialToneForm from "@/components/got-dial-tone-form"
import TestimonialsGrid from "@/components/testimonials-grid"

export default function GotDialTonePage() {
  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/background.svg)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Vertical Text */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 -z-10 hidden lg:block">
        <div className="writing-mode-vertical text-[#c7933b]/30 text-2xl font-bold tracking-widest">
          PROVIDING DIAL TONE THE JOURNEY
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <GotDialToneForm />
        <TestimonialsGrid />
      </div>
    </main>
  )
}
