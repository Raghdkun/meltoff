"use client";

import { ReactNode, useId } from "react";

type CupProps = {
  variant?: "hot-paper" | "iced-clear" | "kraft";
  liquid?: string;
  liquidDark?: string;
  steam?: boolean;
  ice?: boolean;
  withLogo?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * A realistic Meltoff paper / iced cup, drawn purely in SVG.
 * - 'hot-paper'   : white paper cup with black lid (Mate Latte / Karak)
 * - 'iced-clear'  : clear plastic cup with dome lid + ice cubes
 * - 'kraft'       : kraft-brown paper cup
 */
export default function Cup({
  variant = "hot-paper",
  liquid = "#caa872",
  liquidDark = "#7a5a2a",
  steam = false,
  ice = false,
  withLogo = true,
  className = "",
  children,
}: CupProps) {
  const uid = useId().replace(/[:]/g, "");
  const id = (k: string) => `${k}-${uid}`;

  const isIced = variant === "iced-clear";
  const isKraft = variant === "kraft";

  // Paper / kraft palettes
  const paperLight = isKraft ? "#cfa56a" : "#f7eedd";
  const paperBase = isKraft ? "#a37841" : "#ece1c5";
  const paperShadow = isKraft ? "#704c20" : "#9c8b67";
  const paperRim = isKraft ? "#5a3917" : "#7d6c4a";

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Steam (only for hot) */}
      {steam && !isIced && (
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-32 h-24 pointer-events-none">
          {[0, 0.6, 1.2, 1.8, 2.4].map((d, i) => (
            <span
              key={i}
              className="block absolute steam"
              style={{
                left: `calc(50% + ${(i - 2) * 10}px)`,
                top: "60%",
                animationDelay: `${d}s`,
                width: 14 + (i % 2) * 4 + "px",
                height: 14 + (i % 2) * 4 + "px",
                borderRadius: "50%",
                background: "rgba(243,233,214,0.85)",
                filter: "blur(8px)",
              }}
            />
          ))}
        </div>
      )}

      <svg viewBox="0 0 240 360" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Paper body — with edge highlights and a soft shadow on the right */}
          <linearGradient id={id("body")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={paperShadow} />
            <stop offset="6%" stopColor={paperBase} />
            <stop offset="22%" stopColor={paperLight} />
            <stop offset="50%" stopColor={paperLight} />
            <stop offset="78%" stopColor={paperBase} />
            <stop offset="100%" stopColor={paperShadow} />
          </linearGradient>

          {/* Subtle vertical fade for depth */}
          <linearGradient id={id("vfade")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
          </linearGradient>

          {/* Liquid surface gradient (top of mate latte / coffee) */}
          <radialGradient id={id("surface")} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={liquid} />
            <stop offset="80%" stopColor={liquidDark} />
            <stop offset="100%" stopColor={liquidDark} />
          </radialGradient>

          {/* Lid for hot cup */}
          <linearGradient id={id("lid")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3530" />
            <stop offset="60%" stopColor="#1a1612" />
            <stop offset="100%" stopColor="#0d0a08" />
          </linearGradient>

          {/* Iced clear cup */}
          <linearGradient id={id("clear")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
          </linearGradient>

          {/* Liquid for iced cup */}
          <linearGradient id={id("icedLiquid")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={liquid} />
            <stop offset="100%" stopColor={liquidDark} />
          </linearGradient>

          {/* Cup body clip */}
          <clipPath id={id("bodyclip")}>
            <path d="M52 80 L188 80 L172 320 Q120 338 68 320 Z" />
          </clipPath>

          {/* Ground shadow */}
          <radialGradient id={id("shadow")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="120" cy="338" rx="78" ry="9" fill={`url(#${id("shadow")})`} />

        {!isIced && (
          <>
            {/* HOT PAPER CUP --------------------------------------------- */}
            {/* Cup body */}
            <path
              d="M52 80 L188 80 L172 320 Q120 338 68 320 Z"
              fill={`url(#${id("body")})`}
            />
            {/* Vertical depth shading */}
            <path
              d="M52 80 L188 80 L172 320 Q120 338 68 320 Z"
              fill={`url(#${id("vfade")})`}
            />

            {/* Right side curved highlight */}
            <path
              d="M168 86 Q176 200 158 318"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Left edge dark line */}
            <path
              d="M62 86 Q56 200 70 318"
              stroke={paperRim}
              strokeWidth="1"
              opacity="0.55"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bottom seam */}
            <path
              d="M68 320 Q120 332 172 320"
              stroke={paperRim}
              strokeWidth="1.5"
              opacity="0.5"
              fill="none"
            />

            {/* Logo etched on cup */}
            {withLogo && (
              <g transform="translate(120 200)" clipPath={`url(#${id("bodyclip")})`}>
                <circle cx="0" cy="-32" r="6" fill="#e08b3a" />
                <path d="M-40 12 L-12 -18 L0 -2 L12 -18 L40 12 Z" fill="#2b2820" />
                <path d="M-24 6 L-12 -10 L-2 4 Z M2 4 L12 -10 L24 6 Z" fill="#ece1c5" />
                <text
                  x="0" y="34"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontSize="18"
                  fontWeight="700"
                  letterSpacing="2"
                  fill="#2b2820"
                >
                  MELT<tspan fill="#c0532a">O</tspan>FF
                </text>
                <text
                  x="0" y="50"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize="6"
                  letterSpacing="3"
                  fill="#3e3f36"
                >
                  YERBA MATE &amp; COFFEE
                </text>
              </g>
            )}

            {/* Lid back rim */}
            <ellipse cx="120" cy="80" rx="68" ry="12" fill={`url(#${id("lid")})`} />
            {/* Lid front face */}
            <path
              d="M52 80 Q120 96 188 80 L188 70 Q120 58 52 70 Z"
              fill={`url(#${id("lid")})`}
            />
            {/* Lid highlight */}
            <path
              d="M62 70 Q120 60 178 70"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              fill="none"
            />
            {/* Sip hole */}
            <ellipse cx="120" cy="68" rx="14" ry="3" fill="#000" opacity="0.85" />
            {/* Liquid through sip hole */}
            <ellipse cx="120" cy="68" rx="11" ry="2" fill={`url(#${id("surface")})`} />
          </>
        )}

        {isIced && (
          <>
            {/* ICED CLEAR CUP -------------------------------------------- */}
            {/* Body silhouette (back glass) */}
            <path
              d="M52 80 L188 80 L172 320 Q120 338 68 320 Z"
              fill="rgba(220,225,228,0.25)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.4"
            />
            {/* Liquid */}
            <g clipPath={`url(#${id("bodyclip")})`}>
              <rect x="40" y="120" width="160" height="220" fill={`url(#${id("icedLiquid")})`} />
              {/* Ice cubes */}
              {ice && (
                <g>
                  {[
                    [78, 130, 26, -8],
                    [148, 142, 24, 12],
                    [104, 168, 28, -4],
                    [80, 200, 22, 8],
                    [156, 200, 26, -10],
                    [114, 230, 24, 6],
                    [86, 258, 22, -6],
                    [148, 262, 26, 4],
                  ].map(([x, y, s, r], i) => (
                    <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
                      <rect width={s} height={s} rx="4"
                        fill="rgba(255,255,255,0.85)"
                        stroke="rgba(255,255,255,0.95)"
                        strokeWidth="1" />
                      <rect x="2" y="2" width={s - 12} height="2" rx="1" fill="rgba(255,255,255,0.95)" />
                    </g>
                  ))}
                </g>
              )}
              {/* surface meniscus */}
              <ellipse cx="120" cy="118" rx="62" ry="6" fill={liquid} opacity="0.9" />
            </g>

            {/* Front glass highlight */}
            <path
              d="M52 80 L188 80 L172 320 Q120 338 68 320 Z"
              fill={`url(#${id("clear")})`}
              opacity="0.9"
            />
            {/* Logo */}
            {withLogo && (
              <g transform="translate(120 230)">
                <circle cx="0" cy="-22" r="4" fill="#e08b3a" />
                <path d="M-26 8 L-8 -10 L0 0 L8 -10 L26 8 Z" fill="#2b2820" />
                <text x="0" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="700" fill="#2b2820" letterSpacing="2">
                  MELT<tspan fill="#c0532a">O</tspan>FF
                </text>
              </g>
            )}

            {/* Dome lid */}
            <path
              d="M44 80 Q120 38 196 80 L196 88 Q120 78 44 88 Z"
              fill="rgba(220,225,228,0.55)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.2"
            />
            {/* Straw */}
            <rect x="118" y="20" width="6" height="56" rx="2" fill={liquid} />
            <rect x="118" y="20" width="6" height="56" rx="2" fill="rgba(255,255,255,0.25)" />

            {/* Condensation droplets */}
            {[
              [60, 200], [70, 240], [180, 180], [176, 250], [62, 290], [178, 300],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2" fill="rgba(255,255,255,0.85)" />
            ))}
          </>
        )}

        {children}
      </svg>
    </div>
  );
}
