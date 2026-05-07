"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HomeCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-line", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".cta-button", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="hr-mark mb-8 mx-auto justify-center inline-flex">
          The Invitation
        </p>
        <h2 className="font-serif text-[clamp(2.6rem,8vw,7rem)] leading-[1] text-ink">
          <span className="cta-line block">Find your</span>
          <span className="cta-line block italic text-ember">favorite cup.</span>
        </h2>
        <p className="cta-line mt-8 max-w-xl mx-auto text-ink-soft text-lg font-light">
          Five drinks. One philosophy. Discover the menu and pick the one that
          melts you off.
        </p>
        <div className="cta-button mt-12 inline-block">
          <Link
            href="/menu"
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-ink text-sand text-sm tracking-[0.42em] uppercase overflow-hidden"
          >
            <span className="relative z-10">Sip &amp; Melt Off</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 bg-ember scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
