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

      <div className="container mx-auto px-4">
        <div className="text-center lg:pt-32 pb-8 text-white/70 ">
          <h1 className="text-3xl font-bold pb-4">Got <span className="text-[#c7933b]">Dial Tone?</span></h1>
          <p className="text-base">Share your own memories of life before cell phones and computers when pay phones, maps, and face-to-face conversations kept us all connected.</p>
        </div>
        <TestimonialsGrid />
        <div className="text-center lg:pt-32 pb-8 text-white/70 ">
          <h1 className="text-3xl font-bold pb-4">Leave <span className="text-[#c7933b]">a Review</span></h1>
          <p className="text-base">Share your own memories of life before cell phones and computers when pay phones, maps, and face-to-face conversations kept us all connected.</p>
        </div>
        <GotDialToneForm />
      </div>
    </main>
  )
}
