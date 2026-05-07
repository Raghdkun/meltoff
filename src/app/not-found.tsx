import Link from "next/link";

export const metadata = {
  title: "Lost in the mountains — Meltoff",
  description: "The page you were looking for melted off.",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80svh] flex items-center justify-center px-6 py-32 md:py-44">
      <div className="text-center max-w-2xl mx-auto">
        <p className="hr-mark mb-8 inline-flex justify-center">
          404 · Lost in the mountains
        </p>
        <h1 className="font-serif text-[clamp(3rem,9vw,7rem)] leading-[0.95] text-ink">
          This page <span className="italic text-ember">melted off.</span>
        </h1>
        <p className="font-arabic text-2xl text-ink-soft mt-6">
          الصفحة ذابت ولم نعد نراها.
        </p>
        <p className="mt-8 max-w-lg mx-auto text-ink-soft/85 text-lg font-light leading-relaxed">
          The link is gone, the page is missing, or the path is wrong. Let&rsquo;s
          get you back to something warm.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-sand text-sm tracking-[0.32em] uppercase hover:bg-ember transition-[background-color,transform] duration-200 active:scale-[0.97]"
          >
            Back home
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-ink/20 text-ink-soft text-sm tracking-[0.32em] uppercase hover:border-ember hover:text-ember transition-[color,border-color,transform] duration-200 active:scale-[0.97]"
          >
            See the menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
