"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data: gallery } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/all-galleries?all=true`,
        { cache: "no-store" } // ⬅️ ensures fresh fetch every time
      );
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    },
    select: (data) => data?.data,
    staleTime: 0, // ⬅️ force fresh data, avoids reusing old cached partial data
    refetchOnMount: "always", // ⬅️ always refetch when component mounts
  });

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? (gallery?.length ?? 1) - 1 : prev - 1
    );
  }, [gallery]);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === (gallery?.length ?? 1) - 1 ? 0 : prev + 1
    );
  }, [gallery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showNext, showPrev]);

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
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 mb-12"
        >
          {gallery?.map(
            (
              image: { title: string; image: { url: string } },
              index: number
            ) => (
              <div
                key={index}
                onClick={() => openModal(index)}
                className="cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    loadedImages.has(index) ? { opacity: 1, scale: 1 } : {}
                  }
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  className="relative overflow-hidden rounded-lg group cursor-pointer mb-4 break-inside-avoid"
                >
                  <div className="relative w-full">
                    <Image
                      src={image?.image?.url || "/placeholder.svg"}
                      alt={image?.title || `Gallery Image ${index + 1}`}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  <div className="absolute text-center text-white font-bold lg:text-lg text-base inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <span className="text-balance">{image?.title}</span>
                  </div>
                </motion.div>
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && gallery && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // ✅ Close on backdrop click
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-white p-2 rounded-full hover:bg-white/20 transition bg-red-500"
            >
              <X size={30} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent backdrop close
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20 transition z-50"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image + Title */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()} // ✅ Prevent close when clicking image
            >
              <div className="w-full max-h-[75vh] flex items-center justify-center">
                <Image
                  src={gallery[currentIndex]?.image?.url || "/placeholder.svg"}
                  alt={gallery[currentIndex]?.title || "Fullscreen Image"}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
              <p className="mt-4 text-center text-white text-lg sm:text-xl font-medium">
                {gallery[currentIndex]?.title}
              </p>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent backdrop close
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20 transition z-50"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
