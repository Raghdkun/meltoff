"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SpotlightCard from "@/components/SpotlightCard";

export default function StoryMeaning() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".m-eq > *", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 65%" },
      });
      gsap.from(".m-side", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".m-grid", start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="hr-mark mb-8 inline-flex justify-center">
          Chapter Five · Meaning
        </p>
        <div className="m-eq font-serif text-[clamp(2.2rem,10vw,9rem)] leading-[0.9] text-ink flex flex-wrap justify-center items-baseline gap-x-3 sm:gap-x-6 gap-y-1">
          <span className="inline-block">Meltoff</span>
          <span className="inline-block text-ember">=</span>
          <span className="inline-block italic">Melt</span>
          <span className="inline-block">+</span>
          <span className="inline-block italic text-ember">Off</span>
        </div>

        <div className="m-grid mt-20 grid md:grid-cols-2 gap-6 text-left">
          <SpotlightCard
            spotColor="rgba(224, 139, 58, 0.28)"
            spotSize={520}
            className="m-side relative p-10 rounded-3xl bg-ink text-sand overflow-hidden ring-warm"
          >
            <span className="absolute -top-10 -right-6 font-serif text-[14rem] leading-none text-sand/10 select-none">
              M
            </span>
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-sun mb-4">
              Melt — ذوبان
            </p>
            <p className="font-serif text-4xl italic">A feeling that softens.</p>
            <p className="mt-5 text-sand/70 leading-relaxed">
              The taste melts in. The day melts off. The walls melt down.
              Comfort, warmth, and a quiet release.
            </p>
            <p className="font-arabic text-right mt-6 text-sand/85 leading-loose">
              إحساس بالذوبان… الراحة… والذوبان في الطعم.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotColor="rgba(244, 234, 214, 0.22)"
            spotSize={520}
            className="m-side relative p-10 rounded-3xl bg-ember text-sand overflow-hidden ring-warm"
          >
            <span className="absolute -top-10 -right-6 font-serif text-[14rem] leading-none text-sand/15 select-none">
              O
            </span>
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-sand/80 mb-4">
              Off — إيقاف
            </p>
            <p className="font-serif text-4xl italic">A switch you flip.</p>
            <p className="mt-5 text-sand/85 leading-relaxed">
              From the noise. From the rush. From the pressure. The off-switch
              for everything you needed a break from.
            </p>
            <p className="font-arabic text-right mt-6 text-sand/90 leading-loose">
              فصل عن التوتر… وخروج من الضغط.
            </p>
          </SpotlightCard>
        </div>

        <p className="mt-16 font-arabic text-2xl md:text-3xl text-ink-soft leading-loose max-w-3xl mx-auto">
          “إرتشف… وخلّي كل شي يذوب ويختفي.”
        </p>
      </div>
    </section>
  );
}
