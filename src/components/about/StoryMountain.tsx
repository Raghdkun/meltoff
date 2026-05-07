"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function StoryMountain() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Parallax effect on mountains
      gsap.to(".mtn-back", {
        yPercent: -15,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".mtn-mid", {
        yPercent: -30,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".mtn-front", {
        yPercent: -50,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });

      // Staggered text animations
      gsap.from(".mtn-text > *", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      // Animate individual text sections
      gsap.from(".mtn-text > div:first-child", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      gsap.from(".mtn-text > p:nth-of-type(2)", {
        x: -40,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      gsap.from(".mtn-text > p:nth-of-type(3)", {
        x: -40,
        opacity: 0,
        delay: 0.4,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sand to-cream py-16 md:py-24"
    >
      {/* Mountain SVG Background - Lower Z-Index */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="msky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4ead6" />
              <stop offset="100%" stopColor="#e6d4b3" />
            </linearGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#msky)" />
          <circle cx="1100" cy="220" r="80" fill="#e08b3a" opacity="0.6" />
          <circle cx="1100" cy="220" r="130" fill="#e08b3a" opacity="0.18" />

          <path className="mtn-back"
            d="M0 560 L160 460 L320 530 L500 420 L640 510 L820 410 L1000 510 L1180 430 L1340 520 L1440 480 L1440 800 L0 800 Z"
            fill="#7a6f5c" opacity="0.5" />
          <path className="mtn-mid"
            d="M0 620 L120 540 L260 600 L400 500 L540 580 L700 480 L860 580 L1000 500 L1160 600 L1320 530 L1440 590 L1440 800 L0 800 Z"
            fill="#5a5b4a" opacity="0.85" />
          <path className="mtn-front"
            d="M0 700 L120 620 L300 690 L440 580 L600 670 L780 560 L960 670 L1140 590 L1300 680 L1440 640 L1440 800 L0 800 Z"
            fill="#3e3f36" />
        </svg>
      </div>

      {/* Content Container - Higher Z-Index */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Text Content */}
          <div className="mtn-text space-y-6 md:space-y-8 order-2 md:order-1">
            <div>
              <p className="hr-mark mb-6 inline-flex justify-start">Chapter Two</p>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl leading-tight text-ink">
                Born in
                <br />
                the mountains.
              </h2>
            </div>

            <p className="font-arabic text-xl md:text-2xl text-ink-soft leading-relaxed">
              من جبل السويداء
            </p>

            <p className="text-base md:text-lg text-ink-soft/90 font-light leading-relaxed max-w-md">
              Yerba mate grows where the air is thin, the weather is gentle, and
              patience is everything. The high mountains give it a smooth, balanced
              energy — and a quiet kind of strength.
            </p>

            {/* Secondary Text */}
            <p className="text-sm md:text-base text-ink-soft/70 leading-relaxed max-w-md border-l-2 border-ember pl-4">
              Every leaf carries the essence of elevation, the wisdom of time, and
              the generosity of sacred soil.
            </p>
          </div>

          {/* Visual Accent Area */}
          <div className="hidden md:flex order-1 md:order-2 h-96 relative justify-end items-center">
            <div className="absolute right-0 w-64 h-64 rounded-full bg-ember/5 blur-3xl" />
            <div className="absolute right-12 top-12 w-32 h-32 rounded-full bg-ember/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
