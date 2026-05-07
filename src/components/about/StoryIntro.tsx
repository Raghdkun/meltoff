"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function StoryIntro() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".intro-eyebrow", { y: 14, opacity: 0, duration: 0.8 })
        .from(".intro-line", { y: 60, opacity: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" }, "-=0.3")
        .from(".intro-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".intro-arabic", { opacity: 0, duration: 0.8 }, "-=0.4");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-40 pb-32 md:pt-48 md:pb-44 px-6 text-center"
    >
      <p className="intro-eyebrow hr-mark mb-8 inline-flex justify-center">
        Our Story · Chapter One
      </p>
      <h1 className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-ink max-w-5xl mx-auto">
        <span className="intro-line block">A drink isn’t just</span>
        <span className="intro-line block italic">a drink.</span>
        <span className="intro-line block text-ember mt-2">It’s a memory.</span>
      </h1>
      <p className="intro-sub mt-10 max-w-2xl mx-auto text-lg md:text-xl text-ink-soft/85 font-light">
        Meltoff was born from the mountains of As-Suwayda — where mate has long
        been the language of friendship, and patience the only recipe.
      </p>
      <p className="intro-arabic mt-6 font-arabic text-2xl text-ink-soft">
        من جبل السويداء… إلى كل مكان.
      </p>
    </section>
  );
}
