type Props = {
  className?: string;
  withText?: boolean;
  inline?: boolean;
};

// Precomputed (and rounded) sun-ray endpoints so SSR and client render identical strings.
const RAYS: Array<[string, string, string, string]> = (() => {
  const out: Array<[string, string, string, string]> = [];
  for (let i = 0; i < 12; i++) {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    const x1 = (100 + Math.cos(a) * 20).toFixed(2);
    const y1 = (40 + Math.sin(a) * 20).toFixed(2);
    const x2 = (100 + Math.cos(a) * 28).toFixed(2);
    const y2 = (40 + Math.sin(a) * 28).toFixed(2);
    out.push([x1, y1, x2, y2]);
  }
  return out;
})();

export default function Logo({ className, withText = true, inline = false }: Props) {
  return (
    <div className={`flex ${inline ? "flex-row items-center gap-3" : "flex-col items-center"} ${className ?? ""}`}>
      <svg
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
        className={inline ? "h-10 w-auto" : "h-16 w-auto"}
        aria-hidden
      >
        <defs>
          <linearGradient id="sunGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e08b3a" />
            <stop offset="100%" stopColor="#c0532a" />
          </linearGradient>
        </defs>
        {/* Sun + rays */}
        <g>
          <circle cx="100" cy="40" r="14" fill="url(#sunGrad)" />
          {RAYS.map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="text-ember"
            />
          ))}
        </g>
        {/* Mountains forming the M */}
        <path
          d="M20 105 L65 35 L100 80 L135 35 L180 105 Z"
          fill="currentColor"
          className="text-ink-soft"
        />
        <path
          d="M55 80 L75 55 L95 80 Z M105 80 L125 55 L145 80 Z"
          fill="#f4ead6"
          opacity="0.85"
        />
        <line
          x1="20"
          y1="108"
          x2="180"
          y2="108"
          stroke="currentColor"
          className="text-ink-soft"
          strokeWidth="2"
        />
      </svg>
      {withText && (
        <div className={`flex flex-col ${inline ? "items-start" : "items-center"} leading-none`}>
          <span className="wordmark text-ink-soft text-2xl tracking-wide">
            MELT<span className="text-ember">O</span>FF
          </span>
          <span className="text-[0.55rem] tracking-[0.32em] text-ink-soft/70 mt-1 uppercase">
            Yerba Mate &amp; Coffee
          </span>
        </div>
      )}
    </div>
  );
}
