"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const togglePlay = () => {
    if (videoRef.current && audioRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current.pause();
      } else {
        videoRef.current.play();
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
              Play The <span className="text-[#c7933b]">Video</span>
            </h2>
            <p className="text-base sm:text-lg text-[#e6e7e6] max-w-2xl mx-auto text-pretty leading-relaxed">
              A colorful journey through memories captured in photos. Watch how
              taking a story from the days before cell phones and instant
              connections.
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Placeholder video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/placeholder.svg?height=720&width=1280"
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/placeholder-video.mp4" type="video/mp4" />
            </video>

            {/* Background audio */}
            <audio ref={audioRef} loop>
              <source src="/placeholder-audio.mp3" type="audio/mpeg" />
            </audio>

            {/* Video overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-[#c7933b] flex items-center justify-center shadow-lg hover:bg-[#a67a2f] transition-colors"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </motion.button>
              </div>
            )}

            {/* Video controls */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-[#c7933b] transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c7933b] w-1/3" />
                  </div>

                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-[#c7933b] transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Watch out the video label */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white text-sm font-medium">
                Watch out the video
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="text-[#c7933b]/50 text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider">
          THE JOURNEY
        </p>
      </motion.div>
    </section>
  );
}
