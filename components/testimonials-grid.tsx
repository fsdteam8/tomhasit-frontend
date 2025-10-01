"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
  {
    title: "Connect Directly",
    email: "example@example.com",
    text: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having...",
  },
]

const ITEMS_PER_PAGE = 8

export default function TestimonialsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTestimonials = testimonials.slice(startIndex, endIndex)

  return (
    <div ref={ref}>
      {/* Testimonials Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
      >
        {currentTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-[#c7933b] font-bold text-lg mb-1">{testimonial.title}</h3>
            <p className="text-[#6c757d] text-sm mb-3">{testimonial.email}</p>
            <p className="text-[#344054] leading-relaxed mb-3">{testimonial.text}</p>
            <button className="text-[#c7933b] font-medium hover:underline">Read More</button>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-center gap-2"
      >
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
            className={`w-10 h-10 rounded-md transition-colors ${
              currentPage === page
                ? "bg-[#c7933b] text-white"
                : "bg-white text-[#344054] hover:bg-[#c7933b] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white text-[#344054] rounded-md hover:bg-[#c7933b] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
