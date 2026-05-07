"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Cup from "@/components/Cup";

export default function BestCombo() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cmb-text > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".cmb-pair > *", {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.to(".cmb-plus", {
        rotate: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-44 bg-cream/50 border-y border-ink/10 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="cmb-text">
          <p className="hr-mark mb-6">Best Combo</p>
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1] text-ink">
            Karak <span className="italic text-ember">+</span> Paratha
          </h2>
          <p className="font-arabic text-2xl text-ink-soft mt-3">
            كرك ملتوف &amp; براتا
          </p>
          <p className="mt-6 text-lg text-ink-soft/85 font-light leading-relaxed max-w-md">
            The pair we’re asked about most. Saffron-cardamom warmth in one
            hand, golden flaky paratha in the other. A small ritual that feels
            like a long Sunday.
          </p>
          <a
            href="mailto:hello@meltoff.cafe?subject=Karak%20%2B%20Paratha"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ember text-sand text-sm tracking-[0.32em] uppercase hover:bg-ink transition-[background-color,transform] duration-200 active:scale-[0.97]"
          >
            Order in store →
          </a>
        </div>

        <div className="cmb-pair relative flex items-center justify-center gap-6">
          {/* Karak cup */}
          <div className="relative w-40 sm:w-44 md:w-52">
            <Cup variant="kraft" liquid="#d8a464" liquidDark="#8a4f1a" steam withLogo />
            <p className="text-center mt-2 text-[0.65rem] uppercase tracking-[0.32em] text-ember">
              Karak
            </p>
          </div>

          {/* Plus */}
          <div className="cmb-plus w-16 h-16 md:w-20 md:h-20 rounded-full bg-ember text-sand flex items-center justify-center text-2xl font-serif italic shadow-lg">
            +
          </div>

          {/* Paratha */}
          <div className="relative w-44 md:w-52">
            <svg viewBox="0 0 220 220" className="w-full h-auto">
              <defs>
                <radialGradient id="pPlate" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f4ead6" />
                  <stop offset="100%" stopColor="#bfa97e" />
                </radialGradient>
                <radialGradient id="pBread" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e7c483" />
                  <stop offset="60%" stopColor="#c79c4a" />
                  <stop offset="100%" stopColor="#7a5a2a" />
                </radialGradient>
              </defs>
              <ellipse cx="110" cy="120" rx="100" ry="22" fill="#3e3f36" opacity="0.18" />
              <ellipse cx="110" cy="110" rx="100" ry="32" fill="url(#pPlate)" />
              <ellipse cx="110" cy="100" rx="80" ry="22" fill="url(#pBread)" />
              {/* layers */}
              <path d="M50 100 Q90 90 130 100 T190 100" stroke="#7a5a2a" strokeWidth="1.5" fill="none" />
              <path d="M55 105 Q95 96 135 104 T185 104" stroke="#a47830" strokeWidth="1" fill="none" />
              {/* spices */}
              {[60, 90, 130, 160].map((x, i) => (
                <circle key={i} cx={x} cy={92 + (i % 2) * 4} r="1.5" fill="#3e3f36" />
              ))}
            </svg>
            <p className="text-center mt-2 text-[0.65rem] uppercase tracking-[0.32em] text-ember">Paratha</p>
          </div>
        </div>
      </div>
    </section>
  );
}
