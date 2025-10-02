import Hero from "@/components/hero";
import VideoSection from "@/components/video-section";
import GalleryPreview from "@/components/gallery-preview";
import ContactSection from "@/components/contact-section";
import Header from "@/components/header";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen mx-auto">
        <Hero />
        <GalleryPreview />
        <VideoSection />
        <ContactSection />
      </main>
    </>
  );
}
