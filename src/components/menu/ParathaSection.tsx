"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const parathas = [
  {
    name: "Egg Paratha",
    arabic: "براتا بالبيض",
    body: "Fluffy egg filling wrapped in a crispy, layered paratha.",
    icon: "🥚",
  },
  {
    name: "Chocolate Paratha",
    arabic: "براتا بالشوكولاتة",
    body: "Sweet & delicious chocolate, melted inside warm paratha.",
    icon: "🍫",
  },
  {
    name: "Omelette Paratha",
    arabic: "براتا أوملت",
    body: "Soft omelette with veggies & spices in a golden, crispy paratha.",
    icon: "🌿",
  },
];

export default function ParathaSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".p-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".p-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".p-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".p-grid", start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="p-eyebrow hr-mark mb-6 inline-flex justify-center">
            Paratha Menu · براتا
          </p>
          <h2 className="p-title font-serif text-[clamp(2.4rem,7vw,5.5rem)] leading-[1] text-ink">
            Warm. Crispy. <span className="italic text-ember">Always good.</span>
          </h2>
        </div>

        <div className="p-grid grid md:grid-cols-3 gap-6">
          {parathas.map((p) => (
            <article
              key={p.name}
              className="p-card group relative overflow-hidden rounded-3xl bg-ink text-sand p-10 ring-warm flex flex-col justify-between min-h-[420px] transition-transform hover:-translate-y-1"
            >
              <div className="text-6xl mb-6 transition-transform group-hover:scale-110 origin-left">
                {p.icon}
              </div>
              <div>
                <p className="font-arabic text-2xl text-sand/80 mb-2">{p.arabic}</p>
                <h3 className="font-serif text-3xl">{p.name}</h3>
                <p className="mt-4 text-sand/75 leading-relaxed">{p.body}</p>
              </div>
              <div className="absolute -bottom-12 -right-10 font-serif text-[12rem] leading-none text-sand/5 select-none">
                P
              </div>
              <span className="absolute top-6 right-6 text-[0.6rem] uppercase tracking-[0.32em] text-sun">
                Hot
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
