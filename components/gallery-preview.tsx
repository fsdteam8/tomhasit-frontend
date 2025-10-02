"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const galleryImages = [
  {
    src: "/banner.png",
    alt: "Vintage map",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/placeholder.svg?height=600&width=600",
    alt: "Telephone building",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/banner.png",
    alt: "Vintage house",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/banner.png",
    alt: "Railway station",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/placeholder.svg?height=800&width=800",
    alt: "Harbor boats",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/placeholder.svg?height=600&width=600",
    alt: "Linemen working",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/banner.png",
    alt: "Boats at dock",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/banner.png",
    alt: "Red boat",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/banner.png",
    alt: "Red peppers",
    span: "col-span-1 row-span-1",
  },
];

export default function GalleryPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data: gallery } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/all-galleries`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      return response.json();
    },
    select: (data) => data?.data,
  });

  console.log("Videos:", gallery);

  return (
    <section className="relative z-10 py-20 sm:py-32 overflow-hidden">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-white/70">
            Photo <span className="text-[#c7933b]">Gallery</span>
          </h2>
          <p className="text-base sm:text-lg text-[#e6e7e6] max-w-2xl mx-auto text-pretty leading-relaxed">
            A colorful journey through memories captured in photos, each one
            telling a story from the days before cell phones and instant
            connections.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
        >
          {gallery?.map((image: { title: string, image: { url: string } }, index: number) => (
            <Link href="/gallery">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative overflow-hidden rounded-lg group cursor-pointer`}
              >
                <Image
                  src={image?.image?.url || "/placeholder.svg"}
                  alt={`Gallery Image ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute text-center place-content-center mt-16 text-white font-bold lg:text-xl text-base inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image?.title}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Explore All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 bg-[#c7933b] text-white font-medium rounded-full hover:bg-[#a67a2f] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Explore all
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
