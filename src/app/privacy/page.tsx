import Link from "next/link";

export const metadata = {
  title: "Privacy — Meltoff",
  description:
    "How Meltoff handles the small bits of data we collect when you visit, contact, or order.",
};

export default function PrivacyPage() {
  const updated = "May 7, 2026";

  return (
    <section className="relative pt-40 pb-32 md:pt-48 md:pb-44 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="hr-mark mb-8 inline-flex justify-start">
          The Fine Print · Privacy
        </p>
        <h1 className="font-serif text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-ink">
          Privacy <span className="italic text-ember">policy.</span>
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.32em] text-ink-soft/60">
          Last updated · {updated}
        </p>

        <div className="mt-12 space-y-8 text-ink-soft/90 text-base md:text-lg leading-relaxed font-light">
          <p>
            Meltoff is a small café brand from As-Suwayda. This page is a plain
            summary of what we do with information you share with us. Real
            legal language will replace this when our solicitor finishes
            reviewing it.
          </p>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3">
              What we collect
            </h2>
            <p>
              When you email us, we keep your message and address so we can
              reply. When you visit the site, our host records standard
              request logs (page, time, user-agent). We do not run third-party
              advertising trackers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3">
              How we use it
            </h2>
            <p>
              To respond to you, to keep the site online, and to understand
              which pages people read. We never sell your information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3">
              Your choices
            </h2>
            <p>
              Write to us at{" "}
              <a
                href="mailto:hello@meltoff.cafe"
                className="text-ember underline-offset-4 hover:underline"
              >
                hello@meltoff.cafe
              </a>{" "}
              and we&rsquo;ll remove or hand back any data we hold about you.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-16 inline-flex items-center gap-3 px-7 py-4 rounded-full border border-ink/20 text-ink-soft text-sm tracking-[0.32em] uppercase hover:border-ember hover:text-ember transition-[color,border-color,transform] duration-200 active:scale-[0.97]"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}
