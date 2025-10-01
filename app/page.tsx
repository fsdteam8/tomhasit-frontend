import Hero from "@/components/hero"
import VideoSection from "@/components/video-section"
import GalleryPreview from "@/components/gallery-preview"
import ContactSection from "@/components/contact-section"
import Header from "@/components/header"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <VideoSection />
        <GalleryPreview />
        <ContactSection />
      </main>
    </>
  )
}
