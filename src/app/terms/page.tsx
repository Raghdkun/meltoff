import Link from "next/link";

export const metadata = {
  title: "Terms — Meltoff",
  description:
    "The terms that cover using meltoff.cafe and ordering from the Meltoff café.",
};

export default function TermsPage() {
  const updated = "May 7, 2026";

  return (
    <section className="relative pt-40 pb-32 md:pt-48 md:pb-44 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="hr-mark mb-8 inline-flex justify-start">
          The Fine Print · Terms
        </p>
        <h1 className="font-serif text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-ink">
          Terms of <span className="italic text-ember">use.</span>
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.32em] text-ink-soft/60">
          Last updated · {updated}
        </p>

        <div className="mt-12 space-y-8 text-ink-soft/90 text-base md:text-lg leading-relaxed font-light">
          <p>
            Welcome. By using meltoff.cafe you agree to the simple terms below.
            This is a working draft while we finalise the formal legal version.
          </p>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3">
              Brand &amp; content
            </h2>
            <p>
              The Meltoff name, logo, illustrations and the bilingual copy on
              this site belong to Meltoff. Please don&rsquo;t reuse them
              commercially without asking. Quoting a sentence or two for an
              article or a review is fine.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3">
              In-store orders
            </h2>
            <p>
              Drinks and food are sold at the café. Prices, ingredients and
              opening hours can change, and we&rsquo;ll do our best to keep
              this site accurate.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3">
              Disputes
            </h2>
            <p>
              If something goes wrong, write to us first at{" "}
              <a
                href="mailto:hello@meltoff.cafe"
                className="text-ember underline-offset-4 hover:underline"
              >
                hello@meltoff.cafe
              </a>
              . We&rsquo;d much rather solve it over a cup than over paperwork.
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
