"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Cup from "@/components/Cup";
import SpotlightCard from "@/components/SpotlightCard";

type CupVariant = "hot-paper" | "iced-clear" | "kraft";

type Drink = {
  id: string;
  name: string;
  arabic: string;
  tag: "HOT" | "COLD";
  signature?: boolean;
  body: string;
  ingredients: { en: string; ar: string }[];
  cup: CupVariant;
  liquid: string;
  liquidDark: string;
  ice?: boolean;
};

const drinks: Drink[] = [
  {
    id: "sba3",
    name: "SBA3 Milk",
    arabic: "حليب سبع",
    tag: "COLD",
    body: "A traditional 7-spice milk — cold, refreshing, and unlike anything else. From the mountains, with tradition.",
    ingredients: [
      { en: "Cold milk", ar: "حليب بارد" },
      { en: "7 secret spices", ar: "سبع بهارات" },
      { en: "Light sweetener", ar: "محلّى خفيف" },
    ],
    cup: "iced-clear",
    liquid: "#f6efe1",
    liquidDark: "#c9b78a",
    ice: false,
  },
  {
    id: "mate",
    name: "Mate Latte",
    arabic: "متّة لاتيه",
    tag: "HOT",
    signature: true,
    body: "Yerba mate, milk, and Nescafé in our signature blend. Hot, rich, balanced. Served with the Meltoff bombilla.",
    ingredients: [
      { en: "Yerba mate", ar: "متّة" },
      { en: "Steamed milk", ar: "حليب مبخّر" },
      { en: "Nescafé", ar: "نسكافيه" },
    ],
    cup: "hot-paper",
    liquid: "#caa872",
    liquidDark: "#5a3f1a",
  },
  {
    id: "karak",
    name: "Karak",
    arabic: "كرك ملتوف",
    tag: "HOT",
    body: "Saffron, cardamom, and fresh milk steeped slow. Rich, aromatic, and comforting — warmth in every sip.",
    ingredients: [
      { en: "Premium saffron", ar: "زعفران فاخر" },
      { en: "Aromatic cardamom", ar: "هيل عطري" },
      { en: "Fresh milk", ar: "حليب طازج" },
    ],
    cup: "kraft",
    liquid: "#d8a464",
    liquidDark: "#8a4f1a",
  },
  {
    id: "iced",
    name: "Iced Latte",
    arabic: "آيس لاتيه",
    tag: "COLD",
    body: "Smooth espresso pulled fresh, poured over cold milk and ice. Clean, balanced, and refreshing.",
    ingredients: [
      { en: "Espresso", ar: "إسبريسو" },
      { en: "Cold milk", ar: "حليب بارد" },
      { en: "Ice", ar: "ثلج" },
    ],
    cup: "iced-clear",
    liquid: "#b89372",
    liquidDark: "#5a3f1a",
    ice: true,
  },
  {
    id: "coconut",
    name: "Coconut Ice Latte",
    arabic: "كوكنت آيس لاتيه",
    tag: "COLD",
    body: "Espresso meets coconut milk over ice. Tropical, smooth, and refreshing — a sunny twist on the classic.",
    ingredients: [
      { en: "Espresso", ar: "إسبريسو" },
      { en: "Coconut milk", ar: "حليب جوز الهند" },
      { en: "Ice", ar: "ثلج" },
    ],
    cup: "iced-clear",
    liquid: "#e8dcc4",
    liquidDark: "#6a5a3a",
    ice: true,
  },
];

export default function DrinkShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !trackRef.current) return;
    const wrapper = wrapperRef.current;

    // Skip horizontal scroll on mobile — too cramped. Use vertical stack instead.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      // Horizontal scrub driven by the wrapper's scroll progress.
      // The visual "pin" is achieved with CSS sticky on .stage.
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -distance(),
          ease: "none",
        }),
      });

      gsap.utils.toArray<HTMLElement>(".drink-card").forEach((card) => {
        const heading = card.querySelectorAll(".d-head > *");
        const bullets = card.querySelectorAll(".d-bullet");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: st.animation,
            start: "left center",
            end: "right center",
            toggleActions: "play reverse play reverse",
          },
        });
        tl.from(heading, { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" })
          .from(bullets, { x: -20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
          .from(card.querySelector(".d-cup"), { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7");
      });

      return () => st.kill();
    }, wrapperRef);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger &&
          wrapper &&
          wrapper.contains(t.trigger)
        ) {
          t.kill(true);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative md:h-[500vh]"
    >
      <div
        ref={stageRef}
        className="md:sticky md:top-0 md:h-screen md:min-h-[700px] md:overflow-hidden"
      >
        <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 z-20 items-center gap-3 text-[0.65rem] uppercase tracking-[0.42em] text-ink-soft/70">
          <span>Scroll</span>
          <span className="block w-12 h-px bg-ember" />
          <span className="text-ember">Five Drinks</span>
        </div>

      {/* Mobile: vertical stack. Desktop: horizontal track. */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:h-full md:items-center md:will-change-transform px-6 md:px-0 gap-10 md:gap-0"
        style={{ width: "max-content", maxWidth: "100%" }}
      >
        <div className="hidden md:block shrink-0 w-[12vw]" aria-hidden />

        {drinks.map((d, i) => (
          <SpotlightCard
            key={d.id}
            spotColor={
              d.signature
                ? "rgba(224, 139, 58, 0.28)"
                : "rgba(224, 139, 58, 0.18)"
            }
            spotSize={560}
            className="drink-card shrink-0 w-full md:w-[80vw] lg:w-[70vw] md:h-[78vh] md:mr-10 grid md:grid-cols-2 gap-6 md:gap-10 items-center px-6 py-10 md:px-14 md:py-0 rounded-3xl bg-cream/80 border border-ink/10 backdrop-blur-sm relative overflow-hidden"
          >
            <span className="absolute top-4 right-6 md:top-6 md:right-8 font-serif text-6xl md:text-9xl text-ink/10 leading-none select-none">
              0{i + 1}
            </span>
            <span
              className={`absolute top-4 left-4 md:top-8 md:left-8 px-3 py-1 text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.32em] rounded-full ${
                d.tag === "HOT" ? "bg-ember text-sand" : "bg-ink text-sand"
              }`}
            >
              {d.tag}
              {d.signature ? " · Signature" : ""}
            </span>

            <div className="d-cup relative flex justify-center">
              <div className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px]">
                <Cup
                  variant={d.cup}
                  liquid={d.liquid}
                  liquidDark={d.liquidDark}
                  steam={d.tag === "HOT"}
                  ice={!!d.ice}
                  withLogo
                />
              </div>
            </div>

            <div className="relative z-10">
              <div className="d-head">
                <p className="font-arabic text-2xl md:text-3xl text-ink-soft mb-2">
                  {d.arabic}
                </p>
                <h3 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-[1] text-ink">
                  {d.name}
                </h3>
                <p className="mt-4 md:mt-5 text-ink-soft/85 text-base md:text-lg max-w-md leading-relaxed font-light">
                  {d.body}
                </p>
              </div>
              <ul className="mt-6 md:mt-8 space-y-2">
                {d.ingredients.map((ing) => (
                  <li
                    key={ing.en}
                    className="d-bullet flex items-center justify-between border-b border-ink/10 pb-2"
                  >
                    <span className="text-xs md:text-sm text-ink-soft uppercase tracking-[0.18em]">
                      {ing.en}
                    </span>
                    <span className="font-arabic text-ink-soft">{ing.ar}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        ))}

        <div className="hidden md:block shrink-0 w-[12vw]" aria-hidden />
      </div>
      </div>
    </section>
  );
}
