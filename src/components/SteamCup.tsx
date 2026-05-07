"use client";

import Cup from "@/components/Cup";

type Props = { className?: string; label?: string; arabic?: string };

export default function SteamCup({
  className = "",
  label = "Mate Latte",
  arabic = "متّة لاتيه",
}: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="cup-tilt origin-bottom relative w-full">
        <Cup variant="hot-paper" liquid="#caa872" liquidDark="#5a3f1a" steam withLogo />
      </div>
      <div className="text-center mt-4">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-ember">
          {label}
        </p>
        <p className="font-arabic text-ink-soft text-lg mt-1">{arabic}</p>
      </div>
    </div>
  );
}
