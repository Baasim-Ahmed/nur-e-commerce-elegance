import { createFileRoute } from "@tanstack/react-router";
import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — NURÉ" },
      { name: "description", content: "Notes on craft, atelier visits, and the quiet aesthetic of NURÉ." },
      { property: "og:title", content: "Journal — NURÉ" },
      { property: "og:description", content: "Notes on craft, atelier visits, and quiet aesthetics." },
    ],
  }),
  component: Journal,
});

const posts = [
  { img: j1, cat: "Wardrobe", t: "On the case for the one coat you'll keep.", d: "Notes on cashmere, cut, and choosing outerwear you'll still wear a decade from now." },
  { img: j2, cat: "Objects",  t: "The quietest gold, and how to wear it.", d: "A short guide to the gestures — hoops, chains, a single ring — that require nothing else." },
  { img: j3, cat: "Perfume",  t: "Inside Grasse, where Nuit Blanche was made.", d: "A morning with our perfumer, and the raw materials behind our first eau de parfum." },
];

function Journal() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
      <header className="border-b border-warm-taupe/25 py-16 md:py-24">
        <p className="eyebrow">Journal</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-8xl">
          Notes from the <em className="not-italic text-champagne-deep">maison.</em>
        </h1>
      </header>

      <article className="grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="aspect-[4/5] overflow-hidden bg-soft-beige md:aspect-[4/5]">
          <img src={posts[0].img} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">Featured · {posts[0].cat}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{posts[0].t}</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-matte-black/75">{posts[0].d}</p>
          <a href="#" className="mt-8 self-start text-[11px] uppercase tracking-[0.22em] underline-grow">Read the essay</a>
        </div>
      </article>

      <div className="grid gap-10 border-t border-warm-taupe/25 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        {posts.slice(1).map((p) => (
          <a key={p.t} href="#" className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-soft-beige">
              <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
            </div>
            <p className="eyebrow mt-6">{p.cat}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{p.t}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-matte-black/70">{p.d}</p>
          </a>
        ))}
      </div>
    </div>
  );
}