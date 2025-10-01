"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/banner.png)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance text-white/70"
          >
            Providing Dial Tone Snapshots{" "}
            <span className="text-[#c7933b]">from the Past</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-[#e6e7e6] max-w-3xl mx-auto mb-12 text-pretty leading-relaxed"
          >
            A nostalgic journey through memories captured in photos. Each one
            telling a story from the days before cell phones, maps, and instant
            connections.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
