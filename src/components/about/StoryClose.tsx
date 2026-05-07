"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function StoryClose() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".close-line", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".close-cta", {
        scale: 0.92,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        <p className="hr-mark mb-8 inline-flex justify-center">
          Final Chapter · The Promise
        </p>
        <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-ink">
          <span className="close-line block">From the mountains,</span>
          <span className="close-line block italic text-ember">to every place.</span>
        </h2>
        <p className="close-line mt-8 max-w-2xl mx-auto text-lg text-ink-soft/85 font-light">
          A modern brand rooted in old generosity. A café experience that
          blends tradition with the way you live now. Every cup, an invitation
          to slow down.
        </p>
        <p className="close-line font-arabic text-2xl text-ink-soft mt-6">
          من جبل السويداء إلى كل مكان.
        </p>

        <Link
          href="/menu"
          className="close-cta mt-14 inline-flex items-center gap-3 px-10 py-5 rounded-full bg-ink text-sand text-sm tracking-[0.4em] uppercase hover:bg-ember transition-colors"
        >
          Sip &amp; Melt Off →
        </Link>
      </div>
    </section>
  );
}
