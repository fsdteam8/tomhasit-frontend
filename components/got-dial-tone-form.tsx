"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 sm:p-8 md:p-10 shadow-2xl max-w-5xl mx-auto"
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
        </motion.div>
      </div>
    </section >
  )
}
