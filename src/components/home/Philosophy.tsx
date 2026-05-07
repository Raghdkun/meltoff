"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SpotlightCard from "@/components/SpotlightCard";

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".phi-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.from(".phi-word", {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 65%" },
      });

      gsap.from(".phi-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".phi-grid", start: "top 75%" },
      });

      gsap.from(".phi-arabic", {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: { trigger: ".phi-arabic", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      key: "Melt",
      ar: "ذوبان",
      meaning: "A sense of relaxation. Of melting into the moment, into the taste, into yourself.",
    },
    {
      key: "Off",
      ar: "إيقاف",
      meaning: "Disconnect from the noise. Step away from pressure. Turn it all off.",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <p className="phi-eyebrow hr-mark mb-10">Meaning</p>

        <h2 className="font-serif text-[clamp(2.4rem,9vw,8rem)] leading-[0.9] text-ink flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-1">
          <span className="overflow-hidden inline-block">
            <span className="phi-word inline-block">Meltoff</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="phi-word inline-block text-ember">=</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="phi-word inline-block italic">Melt</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="phi-word inline-block">+</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="phi-word inline-block italic text-ember">Off</span>
          </span>
        </h2>

        <div className="phi-grid mt-20 grid md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <SpotlightCard
              key={c.key}
              spotColor="rgba(224, 139, 58, 0.20)"
              spotSize={520}
              className="phi-card relative p-10 md:p-14 rounded-3xl bg-cream/70 border border-ink/10 backdrop-blur-sm ring-warm overflow-hidden"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-serif italic text-7xl md:text-8xl text-ember">
                  {c.key}
                </span>
                <span className="font-arabic text-3xl md:text-4xl text-ink-soft">
                  {c.ar}
                </span>
              </div>
              <p className="mt-6 text-lg md:text-xl text-ink-soft/85 font-light max-w-md leading-relaxed">
                {c.meaning}
              </p>
              <span
                aria-hidden
                className="absolute -bottom-12 -right-10 font-serif text-[16rem] leading-none text-ink/5 select-none"
              >
                {c.key.charAt(0)}
              </span>
            </SpotlightCard>
          ))}
        </div>

        <p className="phi-arabic mt-16 text-center font-arabic text-2xl md:text-3xl text-ink-soft leading-loose max-w-3xl mx-auto">
          “إرتشف… وخلّي كل شي يذوب ويختفي”
        </p>
        <p className="text-center mt-3 text-sm tracking-[0.32em] uppercase text-ember/80">
          Sip · and let it all melt away
        </p>
      </div>
    </section>
  );
}
