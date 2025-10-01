"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

const galleryImages = [
  { src: "/placeholder.svg?height=400&width=600", alt: "Vintage map", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Telephone building", span: "col-span-1 row-span-2" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Vintage house", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Railway station", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=800&width=800", alt: "Harbor boats", span: "col-span-2 row-span-2" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Linemen working", span: "col-span-1 row-span-2" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Boats at dock", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Red boat", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Red peppers", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Railway station 2", span: "col-span-1 row-span-1" },
  { src: "/placeholder.svg?height=800&width=800", alt: "Harbor boats 2", span: "col-span-2 row-span-2" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Linemen working 2", span: "col-span-1 row-span-2" },
]

export default function GalleryGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 * index }}
            className={`${image.span} relative overflow-hidden rounded-lg group cursor-pointer`}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white font-medium">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
