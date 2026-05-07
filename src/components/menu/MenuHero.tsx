"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function MenuHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".mh-eyebrow", { y: 14, opacity: 0, duration: 0.8 });
      gsap.from(".mh-title", { y: 80, opacity: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", delay: 0.1 });
      gsap.from(".mh-sub", { y: 30, opacity: 0, duration: 0.9, delay: 0.5 });
      gsap.from(".mh-tag", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.7 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative pt-40 pb-20 md:pt-52 md:pb-28 px-6 text-center">
      <p className="mh-eyebrow hr-mark mb-8 inline-flex justify-center">
        The Menu · قائمة الطعام
      </p>
      <h1 className="font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-ink">
        <span className="mh-title block">Sip Different.</span>
        <span className="mh-title block italic text-ember">Live Meltoff.</span>
      </h1>
      <p className="mh-sub mt-8 max-w-2xl mx-auto text-lg text-ink-soft/85 font-light">
        Five signature drinks crafted with attitude. Five reasons to slow down.
      </p>
      <ul className="mh-tags mt-10 flex flex-wrap items-center justify-center gap-3">
        {[
          "Yerba Mate",
          "Specialty Coffee",
          "Karak",
          "Iced",
          "Hot",
          "Eco Friendly",
        ].map((t) => (
          <li
            key={t}
            className="mh-tag px-4 py-2 rounded-full border border-ink-soft/20 bg-cream/60 text-xs uppercase tracking-[0.28em] text-ink-soft"
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
