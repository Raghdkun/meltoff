"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const finishes = [
  { name: "Black", color: "#1f1c16", glow: "#3e3f36" },
  { name: "Gunmetal", color: "#4a4f55", glow: "#7a8088" },
  { name: "Gold", color: "#c79c4a", glow: "#e3c067" },
  { name: "Copper", color: "#b46a3a", glow: "#d4895a" },
  { name: "Silver", color: "#b8b8b8", glow: "#dcdcdc" },
  { name: "Orange", color: "#c0532a", glow: "#e08b3a" },
];

export default function StoryBombilla() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(2); // gold default

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".bom-text > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".bom-stage", {
        scale: 0.8,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.to(".bom-rotate", {
        rotate: 8,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.from(".feat", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: ".feats", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const f = finishes[active];

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-ink text-sand overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-40 -left-20 w-[40rem] h-[40rem] rounded-full blur-3xl"
             style={{ background: `${f.glow}20` }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="bom-text">
          <p className="hr-mark mb-6" style={{ color: "#e08b3a" }}>
            Chapter Six · The Tool
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1]">
            Made for the
            <br />
            <span className="italic text-sun">perfect sip.</span>
          </h2>
          <p className="mt-8 max-w-md text-sand/75 text-lg leading-relaxed font-light">
            The Meltoff bombilla — 304 stainless steel, ergonomic grip, and a
            precision filter that shapes every sip into something smooth.
          </p>

          <ul className="feats mt-10 grid grid-cols-2 gap-x-8 gap-y-5 max-w-md">
            {[
              ["304 Stainless", "Premium quality"],
              ["Precision Filter", "Smooth sip"],
              ["Ergonomic", "Comfort grip"],
              ["Eco Friendly", "Reusable, sustainable"],
            ].map(([t, s]) => (
              <li key={t} className="feat">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-sun">{t}</p>
                <p className="text-sand/85 mt-1">{s}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.32em] text-sun mb-4">
              Six finishes — pick yours
            </p>
            <div className="flex flex-wrap gap-3">
              {finishes.map((fi, i) => (
                <button
                  key={fi.name}
                  onClick={() => setActive(i)}
                  className={`group flex flex-col items-center gap-2 transition-transform ${
                    i === active ? "scale-110" : "hover:scale-105"
                  }`}
                  aria-label={fi.name}
                >
                  <span
                    className="block w-10 h-10 rounded-full ring-2 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${fi.color}, ${fi.glow})`,
                      boxShadow: i === active ? `0 0 0 2px #e08b3a, 0 0 20px ${fi.glow}99` : undefined,
                      borderColor: i === active ? "#e08b3a" : "transparent",
                    }}
                  />
                  <span className={`text-[0.6rem] uppercase tracking-[0.28em] ${
                    i === active ? "text-sun" : "text-sand/55"
                  }`}>
                    {fi.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bombilla render */}
        <div className="bom-stage relative flex justify-center items-center">
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${f.glow}55, transparent 60%)` }}
            />
            <div className="bom-rotate origin-bottom">
              <svg viewBox="0 0 200 600" className="h-[340px] sm:h-[420px] md:h-[500px] w-auto">
                <defs>
                  <linearGradient id="bombShaft" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={f.color} />
                    <stop offset="50%" stopColor={f.glow} />
                    <stop offset="100%" stopColor={f.color} />
                  </linearGradient>
                  <radialGradient id="bombHead">
                    <stop offset="0%" stopColor={f.glow} />
                    <stop offset="100%" stopColor={f.color} />
                  </radialGradient>
                </defs>
                {/* Mouthpiece */}
                <rect x="86" y="20" width="28" height="50" rx="4" fill="url(#bombShaft)" />
                {/* Top ring */}
                <rect x="80" y="68" width="40" height="10" rx="2" fill={f.color} />
                {/* Shaft */}
                <rect x="92" y="78" width="16" height="380" fill="url(#bombShaft)" />
                {/* Branded ring with M */}
                <g transform="translate(100 200)">
                  <rect x="-18" y="-14" width="36" height="28" rx="4" fill={f.color} stroke={f.glow} strokeWidth="1" />
                  <text x="0" y="6" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" fill={f.glow}>
                    M
                  </text>
                </g>
                {/* Head (filter) */}
                <ellipse cx="100" cy="475" rx="36" ry="22" fill="url(#bombHead)" />
                {/* perforations */}
                {Array.from({ length: 18 }).map((_, i) => {
                  const a = (i / 18) * Math.PI * 2;
                  const x = 100 + Math.cos(a) * 22;
                  const y = 475 + Math.sin(a) * 13;
                  return <circle key={i} cx={x} cy={y} r="1.6" fill="#0a0a08" />;
                })}
                {/* Lower curve */}
                <path d="M64 475 Q100 540 136 475" fill="none" stroke={f.color} strokeWidth="6" />
              </svg>
            </div>
            <p className="text-center mt-4 text-[0.65rem] uppercase tracking-[0.42em] text-sun">
              Meltoff Bombilla · {f.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
