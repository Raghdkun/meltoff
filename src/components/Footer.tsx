import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-sand/20">
      {/* Marquee Banner */}
      <div className="relative border-y border-ink/10 bg-sand/40 backdrop-blur-sm">
        <div className="flex whitespace-nowrap py-6 marquee will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {[
                "Sip & Melt Off",
                "From the mountains, for the soul",
                "Born in Sweida",
                "متّة لاتيه",
                "Coffee with attitude",
                "كرك ملتوف",
                "Tradition. Quality. Experience.",
              ].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className="px-10 text-2xl md:text-4xl font-serif italic text-ink-soft/80"
                >
                  {t}
                  <span className="ml-10 text-ember">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
        {/* Brand Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <Logo />
            <p className="font-serif italic text-ink-soft text-base md:text-lg max-w-md leading-relaxed">
              From the mountains, for the soul. A modern café experience rooted in
              the traditions of Sweida — where mate has long been the language of
              generosity.
            </p>
            <p className="font-arabic text-right text-ink-soft text-sm md:text-base leading-relaxed">
              من جبل السويداء إلى كل مكان.
            </p>
          </div>
        </div>

        {/* Explore Section */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.32em] font-medium text-ember">
            Explore
          </h4>
          <ul className="text-sm space-y-2.5 text-ink-soft">
            <li>
              <Link href="/menu" className="hover:text-ember transition-colors duration-200">
                Browse Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ember transition-colors duration-200">
                Our Story
              </Link>
            </li>
            <li>
              <a
                href="mailto:hello@meltoff.cafe"
                className="hover:text-ember transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Visit & Hours Section */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.32em] font-medium text-ember">
            Visit
          </h4>
          <ul className="text-sm space-y-2.5 text-ink-soft">
            <li className="font-medium text-ink">Sweida</li>
            <li>
              <span className="text-xs text-ink-soft/80">Hours</span>
              <p>Daily — 8:00 → 23:00</p>
            </li>
            <li>
              <span className="text-xs text-ink-soft/80">Founded</span>
              <p>2026</p>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.32em] font-medium text-ember">
            Connect
          </h4>
          <ul className="text-sm space-y-2.5 text-ink-soft">
            <li>
              <a 
                className="hover:text-ember transition-colors duration-200 flex items-center gap-2" 
                href="https://instagram.com/meltoff.cafe" 
                target="_blank" 
                rel="noreferrer"
              >
                <span>Instagram</span>
                <span className="text-xs">↗</span>
              </a>
            </li>
            <li>
              <a 
                className="hover:text-ember transition-colors duration-200 flex items-center gap-2" 
                href="mailto:hello@meltoff.cafe"
              >
                <span>Email</span>
                <span className="text-xs">↗</span>
              </a>
            </li>
            <li className="text-xs text-ink-soft/60 pt-2">
              @meltoff.cafe
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-ink/10" />

      {/* Footer Bottom */}
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Copyright */}
        <div className="text-xs text-ink-soft/60 order-2 md:order-1">
          <p>© {new Date().getFullYear()} Meltoff. All rights reserved.</p>
        </div>

        {/* Tagline */}
        <div className="text-center order-1 md:order-2">
          <span className="font-script text-ember text-base md:text-lg">
            Sip & Melt Off
          </span>
        </div>

        {/* Legal Links */}
        <div className="text-xs text-ink-soft/60 space-x-4 flex justify-end order-3">
          <Link href="/privacy" className="hover:text-ember transition-colors duration-200">
            Privacy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-ember transition-colors duration-200">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
