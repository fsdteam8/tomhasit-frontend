"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function VideoSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="video"
      className="relative z-10 py-20 sm:py-32 overflow-hidden"
    >
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-white/70">
              Play The <span className="text-[#c7933b]">Video</span>
            </h2>
            <p className="text-base sm:text-lg text-[#e6e7e6] max-w-2xl mx-auto text-pretty leading-relaxed">
              Music video by Electric Light Orchestra performing Telephone Line
              (Audio). (C) 1976 Epic Records, a division of Sony Music
              Entertainment
            </p>
          </motion.div>

          {/* YouTube Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/XKElk9zTB04?si=ZrdarpdFqAGlWfLd"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
