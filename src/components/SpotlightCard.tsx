"use client";

import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  spotColor?: string;
  spotSize?: number;
};

const SpotlightCard = forwardRef<HTMLDivElement, Props>(function SpotlightCard(
  {
    children,
    className = "",
    spotColor = "rgba(224, 139, 58, 0.22)",
    spotSize = 420,
    style,
    ...rest
  },
  forwardedRef
) {
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    el.style.setProperty("--so", "1");
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--so", "0");
  };

  return (
    <div
      ref={forwardedRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`spotlight ${className}`}
      style={
        {
          "--scolor": spotColor,
          "--ssize": `${spotSize}px`,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
});

export default SpotlightCard;
