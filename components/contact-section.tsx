"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    fullName: "",
    comment: "",
  })

  // Fetch reviews
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/all-reviews`
      )
      if (!response.ok) throw new Error("Failed to fetch reviews")
      return response.json()
    },
    select: (data) => data?.data,
  })

  // Mutation for submitting review
  const { mutate: addReview, isPending } = useMutation({
    mutationFn: async (newReview: typeof formData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/add-review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      )
      if (!response.ok) throw new Error("Failed to submit review")
      return response.json()
    },
    onSuccess: () => {
      // ✅ Refetch reviews after successful submission
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      setFormData({ fullName: "", comment: "" }) // reset form
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addReview(formData)
  }

  return (
    <section className="relative z-10 py-20 sm:py-32 overflow-hidden">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
              Got <span className="text-[#c7933b]">Dial Tone?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#e6e7e6] max-w-2xl mx-auto text-pretty leading-relaxed">
              Share your own memories of life before cell phones and computers when pay phones, maps,
              and face-to-face conversations kept us all connected.
            </p>
          </motion.div>

          {/* Layout: Reviews + Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              {reviews?.slice(0, 4)?.map(
                (review: { _id: string; fullName: string; comment: string }) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold text-[#c7933b]">
                      {review.fullName || "Anonymous"}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                )
              )}

              {/* Explore all button */}
              <Link href="/got-dial-tone">
                <button className="self-center mt-4 px-6 py-2 bg-[#c7933b] text-white font-medium rounded-md hover:bg-[#a67a2f] transition-colors duration-300 shadow-lg">
                  Explore all
                </button>
              </Link>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-6 sm:p-8 md:p-10 shadow-2xl"
            >
              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-[#c7933b] font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Full Name Here"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#c7933b] text-gray-800 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-[#c7933b] font-medium mb-2">
                  Comment
                </label>
                <textarea
                  id="description"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Write here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#c7933b] text-gray-800 placeholder:text-gray-400 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-[#c7933b] text-white font-medium rounded-md 
                hover:bg-[#a67a2f] transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
