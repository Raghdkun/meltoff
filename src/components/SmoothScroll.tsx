"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(refreshTimer2);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  // On route change: kill all ScrollTriggers from the previous page so
  // pin spacers / scrub state don't leak into the new page, and reset
  // scroll position. This also avoids stale triggers firing during the
  // unmount cycle which can cause "removeChild" errors.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    ScrollTrigger.getAll().forEach((t) => t.kill(true));
    window.scrollTo(0, 0);
    // After the new page mounts, refresh so its triggers register clean.
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
