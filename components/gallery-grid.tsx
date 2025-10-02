"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function GalleryGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const { data: gallery } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/all-galleries`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery");
      }

      return response.json();
    },
    select: (data) => data?.data,
  });

  const handlePrev = () => {
    if (gallery && selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length)
    }
  }

  const handleNext = () => {
    if (gallery && selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % gallery.length)
    }
  }

  return (
    <div ref={ref}>
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
          Photo <span className="text-[#c7933b]">Gallery</span>
        </h1>
        <p className="text-base sm:text-lg text-[#e6e7e6] max-w-2xl mx-auto text-pretty leading-relaxed">
          A colorful journey through memories captured in photos. Each one telling a story from the days before cell
          phones and instant connections.
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {gallery?.map((image: { title: string, image: { url: string } }, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 * index }}
            className="relative overflow-hidden rounded-lg group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.image.url || "/placeholder.svg"}
              alt={`Image ${index + 1}`}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center lg:mt-52 justify-center p-4">
              <p className="text-white font-medium capitalize">{image.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Modal with Carousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white p-2 rounded-full bg-black/50 hover:bg-black transition z-50"
            >
              <X size={28} />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-6 text-white p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black transition z-50"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-6 text-white p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black transition z-50"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            {/* Image + Title */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[80vh] flex flex-col items-center justify-center text-center"
            >
              <Image
                src={gallery[selectedIndex].image.url}
                alt={gallery[selectedIndex].title}
                width={1200}
                height={800}
                className="object-contain rounded-lg w-auto max-h-[70vh]"
              />
              <p className="text-white mt-4 text-sm sm:text-base">
                {gallery[selectedIndex].title}
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
