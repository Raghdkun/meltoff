"use client";

const items = [
  { en: "From the mountains, for the soul", ar: "من الجبال… للروح" },
  { en: "Every sip — a different experience", ar: "كل رشفة، تجربة مختلفة" },
  { en: "Tradition. Quality. Experience.", ar: "إرث. جودة. تجربة." },
];

export default function RitualStrip() {
  return (
    <section className="relative py-10 border-y border-ink/10 bg-cream/40 overflow-hidden">
      <div className="flex whitespace-nowrap marquee">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex shrink-0">
            {items.map((it, i) => (
              <div key={`${k}-${i}`} className="flex items-center gap-8 px-12">
                <span className="font-serif italic text-2xl md:text-3xl text-ink-soft">
                  {it.en}
                </span>
                <span className="font-arabic text-lg md:text-xl text-ember">
                  {it.ar}
                </span>
                <span className="text-ember">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
