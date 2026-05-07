"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function StoryTradition() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".trad-photo", {
        y: 80,
        rotate: -3,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".trad-tag", {
        scale: 0,
        rotate: -8,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".trad-copy > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".trad-pill", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: ".trad-pills", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Polaroid / vintage card */}
        <div className="relative trad-photo">
          <div className="relative bg-cream p-4 pb-16 rounded-sm shadow-[0_30px_60px_-30px_rgba(58,42,28,0.5)] rotate-[-3deg] max-w-md mx-auto">
            {/* Sepia photo illustration */}
            <svg viewBox="0 0 400 300" className="w-full rounded-sm">
              <defs>
                <linearGradient id="sepia" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b6f4a" />
                  <stop offset="100%" stopColor="#3e2a1c" />
                </linearGradient>
                <pattern id="grain" width="2" height="2" patternUnits="userSpaceOnUse">
                  <rect width="2" height="2" fill="#000" opacity="0.04" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#sepia)" />
              {/* Mountain horizon */}
              <path d="M0 220 L80 170 L160 200 L240 140 L320 190 L400 160 L400 300 L0 300 Z" fill="#2b1a10" opacity="0.65" />
              {/* Four figures (silhouettes) */}
              {[
                [110, 160], [180, 155], [250, 158], [320, 162],
              ].map(([x, y], i) => (
                <g key={i} transform={`translate(${x} ${y})`}>
                  <circle cx="0" cy="-22" r="14" fill="#1a0f08" />
                  <path d={`M-22 60 Q0 0 22 60 Z`} fill="#1a0f08" />
                  {/* mate cup */}
                  <ellipse cx="6" cy="6" rx="6" ry="4" fill="#1a0f08" />
                </g>
              ))}
              <rect width="400" height="300" fill="url(#grain)" />
            </svg>
            <p className="font-script text-2xl text-bark mt-3 text-center">
              من جبل السويداء… إلى كل مكان
            </p>
          </div>
          {/* Tape / tag */}
          <div className="trad-tag absolute -top-6 -right-6 rotate-12 px-5 py-2 bg-ember text-sand text-xs uppercase tracking-[0.32em] shadow-lg">
            est. 2026
          </div>
        </div>

        <div className="trad-copy">
          <p className="hr-mark mb-6">Chapter Three</p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1] text-ink">
            A tradition
            <br />
            <span className="italic text-ember">passed through hands.</span>
          </h2>

          <p className="mt-8 text-lg text-ink-soft/85 font-light leading-relaxed max-w-lg">
            Mate wasn’t just a drink in Sweida. It was the friend of long
            conversations, the symbol of generosity, and a habit handed from
            elders to children for as long as anyone could remember.
          </p>
          <p className="mt-4 text-lg text-ink-soft/85 font-light leading-relaxed max-w-lg">
            Meltoff is our way of carrying that tradition forward — keeping
            its warmth while shaping it for the way we live now.
          </p>

          <p className="font-arabic text-right text-xl text-ink-soft mt-8 leading-loose">
            لم تكن المتّة في السويداء مجرّد مشروب… بل رفيق الجلسات،
            رمز الكرم، وعادة متوارثة عبر الأجيال.
          </p>

          <ul className="trad-pills mt-10 flex flex-wrap gap-3">
            {[
              "Gathering of people",
              "Natural energy",
              "Daily ritual",
              "Mountain origin",
            ].map((p) => (
              <li
                key={p}
                className="trad-pill px-4 py-2 rounded-full border border-ink-soft/20 bg-cream/60 text-xs uppercase tracking-[0.28em] text-ink-soft"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
