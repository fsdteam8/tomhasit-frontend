"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeInWhenVisible = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const ImmediatelyVisible = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/bg.png)" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:pt-40 pt-24 text-center">
        <ImmediatelyVisible>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance text-white/90">
            Providing <span className="text-[#c7933b]">Dial Tone</span>
          </h1>
        </ImmediatelyVisible>

        <ImmediatelyVisible>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed">
            Welcome to my website showcasing my memoir, Providing Dial Tone. In
            the photo section, you will find pictures that coincide with the
            book, adding color to the story. Gathering these photos was a
            combination of luck, a lot of digging, and, dare I say, a bit of
            magic. With all the moves over the years, I'm surprised I found this
            many.
          </p>
        </ImmediatelyVisible>

        <ImmediatelyVisible>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed">
            After I got the idea for the book, it took a while to figure out how
            to approach it. So I dove right in, using my old resume(s) (still
            stored in my file cabinet), the photos (many of which were on
            slides), and other sources, such as my high school yearbooks, as
            well as the internet. Then, I was able to establish a timeline. It's
            amazing that once you have a foundation to work from, the memories
            start coming back, in some cases, even in the smallest of details.
          </p>
        </ImmediatelyVisible>

        <FadeInWhenVisible delay={0.1}>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed">
            Now that the book is finished, I can reminisce about how others in
            my generation lived our lives. I suppose a person around my age
            could relate to a lot of the situations in the book. But what about
            the prior generations? Whether you lived in the city or rural areas,
            like farmers and ranchers, the phone was your lifeline. If you were
            out and about, a pay phone.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed">
            And now look at us―totally dependent on our cell phones. Watch old
            TV shows or movies from that time, and it will come back to you — or
            enlighten you. I'm thinking of shows like Miami Vice, Cheers,
            Seinfeld, Three's Company, and Dallas, among others.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed">
            If we needed to research a topic or do homework, it was off to the
            library. Some of us had a set of encyclopedias at home (remember
            encyclopedia salesmen?). If you needed to spell a word, use the
            dictionary (Funk and Wagnalls, no doubt). Looking for a job or
            apartment, use the want ads. Taking a trip, get out the maps in the
            glove box.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed">
            You can see where this is going — it's how people lived and
            communicated daily. Staying with that theme, I included a section
            called Got Dial Tone? where everyone can share their memories from
            that time. Even if you're a younger person, it's fun to think of
            different scenarios without the use of cell phones or computers.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <p className="text-base sm:text-lg md:text-xl text-[#e6e7e6] mx-auto lg:mb-10 mb-6 leading-relaxed font-bold">
            So, turn off your cell phone and think about how life was back in
            the day. You will find that we all got along just fine without them.
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
