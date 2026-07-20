import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — NURÉ" },
      { name: "description", content: "Nobility. Uniqueness. Royalty. Élegance. The four letters that compose NURÉ." },
      { property: "og:title", content: "Our Story — NURÉ" },
      { property: "og:description", content: "The four letters that compose NURÉ." },
    ],
  }),
  component: StoryPage,
});

const letters = [
  { l: "N", w: "Nobility",   d: "Grace in character. Confidence in every step." },
  { l: "U", w: "Uniqueness", d: "Celebrate individuality. No two women are alike." },
  { l: "R", w: "Royalty",    d: "Every woman deserves to feel extraordinary." },
  { l: "É", w: "Élegance",   d: "Beauty that never goes out of style." },
];

function StoryPage() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <header className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
        <p className="eyebrow">Our Story</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-8xl">
          Four letters,<br />
          one <em className="not-italic text-champagne-deep">philosophy.</em>
        </h1>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-24 md:grid-cols-[1fr_1.1fr] md:gap-20 md:px-10 md:pb-32">
        <div className="relative aspect-[4/5] overflow-hidden bg-soft-beige md:sticky md:top-32 md:h-[80vh]">
          <img src={storyImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif text-[40vw] leading-none text-ivory/85 mix-blend-overlay md:text-[24rem]"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.25)" }}
            >
              {letters[active].l}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {letters.map((it, i) => {
            const open = active === i;
            return (
              <button
                key={it.l}
                onClick={() => setActive(i)}
                className={`border-t border-warm-taupe/30 py-8 text-left transition-colors ${
                  open ? "text-matte-black" : "text-matte-black/60 hover:text-matte-black"
                }`}
              >
                <div className="flex items-baseline justify-between gap-6">
                  <div>
                    <span className="eyebrow">0{i + 1}</span>
                    <h2 className="mt-3 font-serif text-4xl md:text-6xl">{it.w}</h2>
                  </div>
                  <span className="font-serif text-2xl text-champagne-deep">{it.l}</span>
                </div>
                <p
                  className={`overflow-hidden text-sm leading-relaxed text-matte-black/75 transition-all duration-500 ${
                    open ? "mt-6 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {it.d}
                </p>
              </button>
            );
          })}
          <div className="border-t border-warm-taupe/30 pt-10">
            <p className="max-w-md font-serif text-2xl italic leading-snug text-matte-black md:text-3xl">
              Together they create NURÉ — a symbol of timeless luxury and refined individuality.
            </p>
            <Link to="/shop" className="btn-ghost mt-8 inline-flex">Explore the collection</Link>
          </div>
        </div>
      </section>
    </div>
  );
}