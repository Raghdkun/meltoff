"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function MountainScene() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-layer='back']", {
        y: 40,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });
      gsap.from("[data-layer='mid']", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        delay: 0.15,
        ease: "power3.out",
      });
      gsap.from("[data-layer='front']", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from("[data-layer='sun']", {
        scale: 0,
        transformOrigin: "center",
        duration: 2,
        delay: 0.4,
        ease: "elastic.out(1, 0.6)",
      });

      // Parallax on scroll
      gsap.to("[data-layer='back']", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-layer='mid']", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-layer='front']", {
        yPercent: -32,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-layer='sun']", {
        y: 60,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4ead6" />
          <stop offset="60%" stopColor="#ede0c8" />
          <stop offset="100%" stopColor="#d9c39a" />
        </linearGradient>
        <radialGradient id="sunDisc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd29a" />
          <stop offset="60%" stopColor="#e08b3a" />
          <stop offset="100%" stopColor="#c0532a" stopOpacity="0.85" />
        </radialGradient>
        <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a6f5c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7a6f5c" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a5b4a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#5a5b4a" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="m3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3e3f36" />
          <stop offset="100%" stopColor="#2b2820" />
        </linearGradient>
      </defs>

      <rect width="1440" height="600" fill="url(#sky)" />

      {/* Sun */}
      <g data-layer="sun">
        <circle cx="720" cy="220" r="90" fill="url(#sunDisc)" opacity="0.9" />
        <circle cx="720" cy="220" r="130" fill="#e08b3a" opacity="0.08" />
        <circle cx="720" cy="220" r="180" fill="#e08b3a" opacity="0.04" />
      </g>

      {/* Distant mountains */}
      <path
        data-layer="back"
        d="M0 420 L120 360 L240 400 L380 320 L520 380 L660 310 L820 370 L980 300 L1120 360 L1280 320 L1440 380 L1440 600 L0 600 Z"
        fill="url(#m1)"
      />

      {/* Mid mountains */}
      <path
        data-layer="mid"
        d="M0 470 L100 410 L220 460 L340 380 L460 440 L600 360 L740 430 L880 360 L1020 440 L1160 380 L1300 450 L1440 410 L1440 600 L0 600 Z"
        fill="url(#m2)"
      />

      {/* Foreground mountains */}
      <path
        data-layer="front"
        d="M0 540 L160 470 L320 530 L500 430 L640 510 L820 420 L1000 510 L1180 440 L1340 520 L1440 480 L1440 600 L0 600 Z"
        fill="url(#m3)"
      />
    </svg>
  );
}
