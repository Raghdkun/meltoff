"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import MountainScene from "@/components/MountainScene";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.9, delay: 0.2 })
        .from(".hero-line", { y: 80, opacity: 0, duration: 1.2, stagger: 0.12 }, "-=0.4")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .from(".hero-meta", { opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".scroll-cue", { opacity: 0, y: 10, duration: 0.6 }, "-=0.2");
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center"
    >
      <MountainScene />

      {/* Soft sand overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand/0 via-sand/40 to-sand pointer-events-none" />

      <div className="hero-content relative z-10 text-center px-6 max-w-5xl">
        <span className="hero-eyebrow inline-flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.32em] sm:tracking-[0.5em] text-ember mb-6">
          <span className="hidden sm:block w-8 h-px bg-ember" />
          Born in Sweida.
          <span className="hidden sm:block w-8 h-px bg-ember" />
        </span>

        <h1 className="font-serif text-ink leading-[0.95] tracking-[-0.02em] text-balance text-[clamp(3.2rem,11vw,9rem)]">
          <span className="hero-line block">Sip &amp;</span>
          <span className="hero-line block italic">
            Melt <span className="text-ember">Off</span>.
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl mx-auto text-base md:text-lg text-ink-soft/85 font-light tracking-wide text-pretty">
          Yerba mate &amp; specialty drinks crafted in the mountains of As-Suwayda.
          Melt the stress. Turn off the noise.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-sand text-sm tracking-[0.32em] uppercase hover:bg-ember transition-[background-color,transform] duration-200 active:scale-[0.97]"
          >
            Browse the menu
            <span className="btn-arrow transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-ink/20 text-ink-soft text-sm tracking-[0.32em] uppercase hover:border-ember hover:text-ember transition-[color,border-color,transform] duration-200 active:scale-[0.97]"
          >
            Our story
          </Link>
        </div>

        <div className="hero-meta mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-8 text-[0.6rem] sm:text-[0.65rem] tracking-[0.28em] sm:tracking-[0.4em] uppercase text-ink-soft/60">
          <span>Authentic Roots</span>
          <span className="w-1 h-1 rounded-full bg-ember" />
          <span>Modern Experience</span>
          <span className="w-1 h-1 rounded-full bg-ember hidden sm:inline-block" />
          <span className="hidden sm:inline">Warm &amp; Cozy</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[0.6rem] tracking-[0.45em] uppercase text-ink-soft/60">
        Scroll
        <span className="block w-px h-12 bg-ink-soft/30 relative overflow-hidden">
          <span className="scroll-cue-bar absolute inset-x-0 top-0 h-1/2 bg-ember" />
        </span>
      </div>
    </section>
  );
}
