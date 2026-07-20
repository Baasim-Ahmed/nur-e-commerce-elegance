import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story.jpg";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import look3 from "@/assets/lookbook-3.jpg";
import look4 from "@/assets/lookbook-4.jpg";
import { products, categoriesList, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const featured = products.slice(0, 4);
  return (
    <>
      <Hero />
      <Categories />
      <Featured items={featured} onQuick={setQuick} />
      <Why />
      <StoryTeaser />
      <Testimonials />
      <Lookbook images={[look1, look2, look3, look4]} />
      <Newsletter />
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative -mt-[1px] h-[100svh] min-h-[720px] w-full overflow-hidden bg-matte-black">
      <img
        src={heroImg}
        alt="NURÉ campaign — a woman in ivory silk"
        className="absolute inset-0 h-full w-full object-cover opacity-95 fade-in-slow"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-matte-black/30 via-matte-black/10 to-matte-black/60" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 text-ivory md:px-14 md:pb-24">
        <div className="max-w-2xl fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="eyebrow" style={{ color: "var(--champagne)" }}>Autumn Collection · MMXXVI</p>
          <h1 className="mt-6 font-serif text-[13vw] font-light leading-[0.95] tracking-tight md:text-[7rem]">
            Born with<br />
            <em className="not-italic" style={{ color: "var(--champagne)" }}>Nobility.</em>
          </h1>
          <p className="mt-6 max-w-md text-sm tracking-wide text-ivory/85 md:text-base">
            A composition of silk, cashmere and gold — worn slowly, kept always.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/shop" className="btn-primary" style={{ background: "var(--ivory)", color: "var(--matte-black)", borderColor: "var(--ivory)" }}>
              Explore Collection <ArrowRight size={14} strokeWidth={1.25} />
            </Link>
            <Link to="/story" className="btn-ghost text-ivory" style={{ color: "var(--ivory)" }}>
              Our Story
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/70">
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          <span>Scroll</span>
          <span className="block h-10 w-px bg-ivory/40" />
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">The Collection</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Shop by category.</h2>
        </div>
        <Link to="/shop" className="underline-grow text-[11px] uppercase tracking-[0.22em]">
          View all
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px bg-warm-taupe/20 md:grid-cols-3">
        {categoriesList.map((c, i) => (
          <Link
            key={c.key}
            to="/shop"
            search={{ category: c.key } as never}
            className="group relative flex aspect-square flex-col justify-between bg-soft-beige p-8 transition-colors duration-500 hover:bg-ivory"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <h3 className="font-serif text-3xl md:text-4xl">{c.key}</h3>
              <p className="mt-2 max-w-[16ch] text-sm text-matte-black/60">{c.blurb}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-champagne-deep">
                Discover
                <span className="inline-block h-px w-8 bg-champagne transition-all duration-500 group-hover:w-14" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Featured({ items, onQuick }: { items: Product[]; onQuick: (p: Product) => void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Featured</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">A quiet edit.</h2>
        </div>
        <Link to="/shop" className="underline-grow text-[11px] uppercase tracking-[0.22em]">
          The full collection
        </Link>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-8">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuick} />
        ))}
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { t: "Premium Quality", d: "Silk from Como, leather from Florence, gold from Vicenza." },
    { t: "Exclusive Designs", d: "Small runs. Numbered pieces. Rarely restocked." },
    { t: "Slow Craftsmanship", d: "Made by ateliers who work in decades, not seasons." },
    { t: "Made with Intention", d: "Every finish is considered. Nothing is decorative for its own sake." },
  ];
  return (
    <section className="bg-soft-beige">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="max-w-xl">
          <p className="eyebrow">Why NURÉ</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Luxury, understood as restraint.
          </h2>
        </div>
        <div className="mt-16 grid gap-px bg-warm-taupe/20 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.t} className="bg-soft-beige p-8">
              <span className="eyebrow" style={{ color: "var(--champagne-deep)" }}>
                0{i + 1}
              </span>
              <h3 className="mt-6 font-serif text-2xl">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-matte-black/70">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryTeaser() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-10 md:py-32">
      <div className="relative aspect-[4/5] overflow-hidden bg-soft-beige">
        <img src={storyImg} alt="Champagne leather bag" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="eyebrow">Our Story</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Four letters, one <em className="not-italic" style={{ color: "var(--champagne-deep)" }}>philosophy.</em>
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-matte-black/75">
          N. U. R. É. — Nobility. Uniqueness. Royalty. Élegance. Together they compose a house
          that believes beauty is quiet, personal, and made to last.
        </p>
        <Link to="/story" className="btn-ghost mt-10 self-start">Read the story</Link>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "The kind of pieces I reach for on the days I want to feel most like myself.", n: "Iris Laurent", city: "Paris" },
    { q: "Impeccable. The tailoring is patient, the leather ages beautifully.", n: "Adaeze Okafor", city: "Lagos" },
    { q: "A house that understands the value of quiet. I trust everything they make.", n: "Sofia Marino", city: "Milan" },
  ];
  return (
    <section className="bg-matte-black text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <p className="eyebrow" style={{ color: "var(--champagne)" }}>In Her Words</p>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-16">
          {items.map((it) => (
            <figure key={it.n}>
              <div className="flex gap-1" style={{ color: "var(--champagne)" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-6 font-serif text-2xl leading-snug md:text-3xl">
                “{it.q}”
              </blockquote>
              <figcaption className="mt-8 text-xs uppercase tracking-[0.22em] text-ivory/70">
                {it.n} · {it.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lookbook({ images }: { images: string[] }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">The Lookbook</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">In her world.</h2>
        </div>
        <a href="#" className="underline-grow text-[11px] uppercase tracking-[0.22em]">
          Follow on Instagram
        </a>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {images.map((src, i) => (
          <a
            key={i}
            href="#"
            className="group relative block aspect-[4/5] overflow-hidden bg-soft-beige"
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Shop this look
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<null | "ok" | "err">(null);
  return (
    <section className="bg-soft-beige">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="eyebrow">Correspondence</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Join the world of NURÉ.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-matte-black/70">
          Private previews, house letters, and the occasional invitation. Never noise.
        </p>
        <form
          className="mx-auto mt-10 flex max-w-md items-center border-b border-warm-taupe/40 focus-within:border-champagne"
          onSubmit={(e) => {
            e.preventDefault();
            const ok = /.+@.+\..+/.test(email.trim());
            setState(ok ? "ok" : "err");
          }}
        >
          <input
            value={email}
            onChange={(e) => { setEmail(e.target.value); setState(null); }}
            type="email"
            placeholder="Your email"
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-warm-taupe/70"
            required
          />
          <button className="px-2 text-[11px] uppercase tracking-[0.22em] text-champagne-deep hover:text-matte-black">
            Subscribe
          </button>
        </form>
        <p
          role="status"
          className={`mt-4 text-xs ${state === "ok" ? "text-champagne-deep" : state === "err" ? "text-destructive" : "text-transparent"}`}
        >
          {state === "ok"
            ? "Thank you — a letter is on its way."
            : state === "err"
              ? "Please enter a valid email."
              : "·"}
        </p>
      </div>
    </section>
  );
}
