"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function StoryMap() {
  const ref = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    // Pre-hide reveal targets
    gsap.set(svgRef.current, { autoAlpha: 0, scale: 0.96, transformOrigin: "center center" });
    gsap.set(
      [
        ".sweida-pin",
        ".sweida-pulse",
        ".sweida-label",
        ".sweida-arabic",
        ".sweida-coords",
      ],
      { autoAlpha: 0 }
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // 1. SVG fades + scales in
      tl.to(svgRef.current, { autoAlpha: 1, scale: 1, ease: "power2.out", duration: 1 }, 0);

      // 2. Pin reveal + pulses (no y-shift so it stays centered)
      tl.fromTo(
        ".sweida-pin",
        { scale: 0.82, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.35, ease: "power2.out", transformOrigin: "center center" },
        1.0
      );
      tl.to(".sweida-pulse", { autoAlpha: 1, duration: 0.2 }, 1.1);

      // 3. Labels
      tl.fromTo(
        ".sweida-label",
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3 },
        1.25
      )
        .fromTo(
          ".sweida-arabic",
          { y: 8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3 },
          1.35
        )
        .fromTo(
          ".sweida-coords",
          { autoAlpha: 0 },
          { autoAlpha: 0.85, duration: 0.3 },
          1.45
        );

      // Pulsing ring loop
      gsap.to(".sweida-pulse-ring", {
        scale: 2.2,
        opacity: 0,
        duration: 1.6,
        ease: "power2.out",
        repeat: -1,
        transformOrigin: "center",
      });
    }, ref);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section && section.contains(t.trigger as Node)) {
          t.kill(true);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <>
    <section ref={ref} className="relative h-[260vh] md:h-[280vh]">
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen min-h-160 w-full grid md:grid-cols-2 items-center bg-cream/50 border-y border-ink/10 overflow-hidden">
        {/* Map */}
        <div className="relative h-full flex items-center justify-center p-4">
          {/*
            Single SVG with padded viewBox (-100 -100 1500 1415) = 100px breathing room
            on every edge. The <image> element renders As-Suwayda.svg at its original
            1300×1215 coordinate position, keeping all overlay elements perfectly aligned.
          */}
          <div className="w-full max-w-130">
            <svg
              ref={svgRef}
              viewBox="-100 -100 1500 1415"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {/* SVG filter to recolour the black fill to brand ember/sand tone */}
              <defs>
                <filter id="mapColor" colorInterpolationFilters="sRGB">
                  <feColorMatrix type="matrix" values="
                    0.38  0     0     0  0.44
                    0.20  0     0     0  0.24
                    0.10  0     0     0  0.12
                    0     0     0  0.72  0
                  " />
                </filter>
              </defs>

              {/* Real boundary from public/As-Suwayda.svg */}
              <image
                href="/As-Suwayda.svg"
                x="0" y="0"
                width="1300" height="1215"
                filter="url(#mapColor)"
              />

              {/* Pin — centered in the map body */}
              <g className="sweida-pin-anchor" transform="translate(443 516)">
                <g className="sweida-pin">
                  <circle className="sweida-pulse sweida-pulse-ring" r="22" fill="#c0532a" opacity="0.45" />
                  <circle className="sweida-pulse" r="11" fill="#c0532a" />
                  <path
                    d="M0 -48 C -18 -48 -30 -32 -21 -13 L 0 26 L 21 -13 C 30 -32 18 -48 0 -48 Z"
                    fill="#c0532a"
                    stroke="#3a1a0e"
                    strokeWidth="1.5"
                  />
                  <circle cy="-30" r="8" fill="#f4ead6" />
                </g>
              </g>

              {/* AS-SUWAYDA label */}
              <text
                x="443" y="422" textAnchor="middle"
                className="sweida-label"
                fontFamily="var(--font-display), Montserrat"
                fontSize="19" letterSpacing="7"
                fill="#2e2f28" fontWeight="700"
                stroke="#f4ead6" strokeWidth="3"
                paintOrder="stroke"
              >
                AS-SUWAYDA
              </text>
              <text
                x="443" y="456" textAnchor="middle"
                className="sweida-arabic"
                fontFamily="var(--font-arabic), Cairo"
                fontSize="24" fill="#b84e25"
                stroke="#f4ead6" strokeWidth="2"
                paintOrder="stroke"
              >
                السويداء
              </text>

              {/* Coordinates */}
              <text
                x="650" y="1155" textAnchor="middle"
                className="sweida-coords"
                fontFamily="ui-monospace, monospace"
                fontSize="17" letterSpacing="3"
                fill="#3e3f36" opacity="0.85"
              >
                32.7094° N · 36.5694° E
              </text>
              <text
                x="650" y="1185" textAnchor="middle"
                className="sweida-coords"
                fontFamily="ui-monospace, monospace"
                fontSize="13" letterSpacing="4"
                fill="#3e3f36" opacity="0.6"
              >
                ~ 5,550 km² · 1,200–1,800 m
              </text>

              {/* North compass — moved inward so it's never clipped */}
              <g transform="translate(1180 160)" opacity="0.55">
                <circle r="30" fill="none" stroke="#3e3f36" strokeWidth="1.5" />
                <path d="M0 -22 L7 0 L0 -5 L-7 0 Z" fill="#c0532a" />
                <path d="M0 22 L-7 0 L0 5 L7 0 Z" fill="#3e3f36" />
                <text x="0" y="-36" textAnchor="middle" fontFamily="sans-serif" fontSize="15" fill="#3e3f36">N</text>
              </g>

              {/* Scale ruler */}
              <g transform="translate(130 1148)" opacity="0.6">
                <line x1="0" y1="0" x2="130" y2="0" stroke="#3e3f36" strokeWidth="1.5" />
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#3e3f36" strokeWidth="1.5" />
                <line x1="65" y1="-3" x2="65" y2="3" stroke="#3e3f36" strokeWidth="1.5" />
                <line x1="130" y1="-6" x2="130" y2="6" stroke="#3e3f36" strokeWidth="1.5" />
                <text x="65" y="-13" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fill="#3e3f36">
                  20 km
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Side label */}
        <div className="relative flex flex-col justify-center px-6 md:px-16 pb-10 md:pb-0">
          <p className="hr-mark mb-4 md:mb-6">Chapter Four · The Origin</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-none text-ink">
            Home of the
            <br />
            <span className="italic text-ember">original mate.</span>
          </h2>
          <p className="font-arabic text-xl md:text-2xl text-ink-soft mt-3 md:mt-4">
            موطن المتّة الأصلية
          </p>

          <p className="mt-6 md:mt-8 text-ink-soft/85 text-base md:text-lg leading-relaxed max-w-md font-light">
            The province of As-Suwayda sits in southern Syria — a high basalt
            plateau where the air is dry, the people are warm, and mate has
            quietly become a cultural signature.
          </p>

          <ul className="mt-6 md:mt-8 space-y-2 md:space-y-3 text-sm text-ink-soft">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-ember" />
              Elevation — up to 1,800 m
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-ember" />
              Climate — Mediterranean, mountainous
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-ember" />
              Tradition — daily, multi-generational
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* Quote pair — sibling section so it doesn't overlap the sticky stage */}
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32 space-y-20 md:space-y-32">
      <div className="text-center">
        <p className="hr-mark mb-6 inline-flex justify-center">Why Sweida</p>
        <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl leading-[1.2] text-ink">
          “The mountain teaches you to slow down.
          <br />
          Mate teaches you to share.”
        </p>
      </div>
      <div className="text-center">
        <p className="font-arabic text-xl md:text-2xl text-ink-soft leading-loose">
          تنمو المتّة في أحضان الجبال العالية،
          <br />
          حيث الطبيعة النقية والهواء العليل…
          <br />
          لتمنحك طاقة صافية ومتوازنة.
        </p>
      </div>
    </section>
    </>
  );
}
