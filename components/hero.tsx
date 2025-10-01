"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/background.svg)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Vertical Text */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 -z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="writing-mode-vertical text-[#c7933b]/30 text-2xl font-bold tracking-widest"
        >
          PROVIDING DIAL TONE THE JOURNEY
        </motion.div>
      </div>

      {/* Content */}
      <div ref={ref} className="container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance"
          >
            Providing Dial Tone Snapshots <span className="text-[#c7933b]">from the Past</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-[#e6e7e6] max-w-3xl mx-auto mb-12 text-pretty leading-relaxed"
          >
            A nostalgic journey through memories captured in photos. Each one telling a story from the days before cell
            phones, maps, and instant connections.
          </motion.p>

          {/* Watch Video Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <a href="#video" className="relative w-32 h-32 sm:w-40 sm:h-40 group">
              {/* Rotating text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text className="text-xs fill-[#6c757d] font-medium tracking-wider">
                    <textPath href="#circlePath">Watch Video • Watch Video • Watch Video •</textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#c7933b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#c7933b] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#c7933b] rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
