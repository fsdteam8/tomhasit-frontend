"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/background.svg)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-[#c7933b]/30 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
          A MEMOIR BY TOM SHIPLEY
        </p>
      </div>

      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
              Got <span className="text-[#c7933b]">Dial Tone</span>
            </h2>
            <p className="text-base sm:text-lg text-[#e6e7e6] max-w-2xl mx-auto text-pretty leading-relaxed">
              Share your own memories of life before cell phones and computers when pay phones, maps, and face-to-face
              conversations kept us all connected.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-[#f9f4eb] rounded-lg p-6 sm:p-8 md:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-[#c7933b] font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name Here"
                  className="w-full px-4 py-3 bg-white border border-[#d0d5dd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7933b] text-[#344054] placeholder:text-[#6c757d]"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[#c7933b] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your mail here"
                  className="w-full px-4 py-3 bg-white border border-[#d0d5dd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7933b] text-[#344054] placeholder:text-[#6c757d]"
                  required
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-[#c7933b] font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Write here..."
                rows={6}
                className="w-full px-4 py-3 bg-white border border-[#d0d5dd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7933b] text-[#344054] placeholder:text-[#6c757d] resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#c7933b] text-white font-medium rounded-md hover:bg-[#a67a2f] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Submit
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
