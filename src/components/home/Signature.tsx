"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SteamCup from "@/components/SteamCup";
import Link from "next/link";

export default function Signature() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".sig-cup", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".sig-text > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.to(".sig-stamp", {
        rotate: 360,
        ease: "none",
        repeat: -1,
        duration: 25,
      });
      gsap.from(".bullet", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: ".bullets", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-44 bg-ink text-sand overflow-hidden"
    >
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[40rem] h-[40rem] rounded-full bg-ember/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[40rem] h-[40rem] rounded-full bg-sun/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="sig-cup relative flex justify-center order-2 md:order-1">
          <div className="relative w-[260px] sm:w-[320px] md:w-[420px]">
            <SteamCup />
            {/* Rotating stamp */}
            <div className="sig-stamp absolute -top-2 -right-4 sm:-top-4 sm:-right-6 md:-top-6 md:-right-12 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36">
              <svg viewBox="0 0 200 200" className="w-full h-full text-ember">
                <defs>
                  <path
                    id="circle"
                    d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                  />
                </defs>
                <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
                <text fill="currentColor" fontSize="13" letterSpacing="6" fontFamily="var(--font-display), Montserrat, sans-serif" fontWeight="600">
                  <textPath href="#circle" startOffset="0">
                    SIGNATURE DRINK · MELTOFF ORIGINAL · MATE LATTE ·
                  </textPath>
                </text>
                <text x="100" y="108" textAnchor="middle" fontSize="14" letterSpacing="3" fill="currentColor" fontFamily="Georgia, serif" fontWeight="700">
                  EST · 2024
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="sig-text order-1 md:order-2">
          <p className="hr-mark mb-8" style={{ color: "#e08b3a" }}>
            Signature
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1] text-sand">
            Mate Latte
            <br />
            <span className="italic text-sun">our pride.</span>
          </h2>
          <p className="font-arabic text-2xl text-sand/80 mt-3">
            مشروب المتّة اللاتيه الأصلي
          </p>

          <p className="mt-8 max-w-lg text-sand/70 text-lg leading-relaxed font-light">
            A blend of mountain-grown yerba mate, warm milk, and our own roast.
            Smooth, balanced, and quietly bold — served with the Meltoff
            bombilla for the purest sip.
          </p>

          <ul className="bullets mt-10 grid grid-cols-2 gap-4 max-w-md">
            {[
              "Natural energy",
              "Creamy & smooth",
              "Rich & balanced",
              "Warm & comforting",
            ].map((b) => (
              <li
                key={b}
                className="bullet flex items-center gap-3 text-sm text-sand/85"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                {b}
              </li>
            ))}
          </ul>

          <Link
            href="/menu"
            className="mt-12 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-ember text-sand text-sm tracking-[0.32em] uppercase hover:bg-sun transition-colors"
          >
            See the full menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
