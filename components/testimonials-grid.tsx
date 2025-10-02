"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

const ITEMS_PER_PAGE = 8 // adjust as per your design

export default function TestimonialsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Fetch reviews with pagination
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/all-reviews?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      )
      if (!response.ok) throw new Error("Failed to fetch reviews")
      return response.json()
    },
    select: (data) => data,
  })

  const reviews = data?.data || []
  const totalPages = data?.meta.totalPage || 1

  return (
    <div ref={ref}>
      {/* Testimonials Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
      >
        {isLoading ? (
          <p className="text-center col-span-2 text-gray-500">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-[#c7933b] font-bold text-lg mb-1">
                {testimonial.fullName || "Anonymous"}
              </h3>
              <p className="text-[#344054] leading-relaxed mb-3">
                {testimonial.comment}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">No reviews available</p>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white text-[#344054] rounded-md hover:bg-[#c7933b] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-md transition-colors ${currentPage === page
                ? "bg-[#c7933b] text-white"
                : "bg-white text-[#344054] hover:bg-[#c7933b] hover:text-white"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white text-[#344054] rounded-md hover:bg-[#c7933b] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  )
}
