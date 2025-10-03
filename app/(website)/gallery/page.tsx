import GalleryGrid from "@/components/gallery-grid"

export default function GalleryPage() {
  return (
    <main className="min-h-screen relative mx-auto pt-10">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url(/bg.png)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 ">
        <GalleryGrid />
      </div>
    </main>
  )
}
