import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { products, categoriesList, type Category, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";

type Sort = "featured" | "new" | "price-asc" | "price-desc";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Collection — NURÉ" },
      { name: "description", content: "Explore NURÉ — silk, cashmere, leather, jewelry and perfume, composed slowly." },
      { property: "og:title", content: "The Collection — NURÉ" },
      { property: "og:description", content: "Silk, cashmere, leather, jewelry and perfume — composed slowly." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [quick, setQuick] = useState<Product | null>(null);

  const list = useMemo(() => {
    let items = cat === "All" ? products : products.filter((p) => p.category === cat);
    items = [...items];
    switch (sort) {
      case "new":
        items.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
        break;
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
    }
    return items;
  }, [cat, sort]);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
      <header className="border-b border-warm-taupe/25 py-10 md:py-16">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">
          Composed, not <em className="not-italic text-champagne-deep">assembled.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-matte-black/70">
          Every piece begins with an atelier. Nothing is made for the sake of a season — only for the years it will be kept.
        </p>
      </header>

      <div className="sticky top-16 z-20 -mx-6 border-b border-warm-taupe/25 bg-ivory/90 px-6 py-4 backdrop-blur md:top-20 md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(["All", ...categoriesList.map((c) => c.key)] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c as never)}
                className={`relative text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  cat === c ? "text-matte-black" : "text-warm-taupe hover:text-matte-black"
                }`}
              >
                {c}
                {cat === c && <span className="absolute -bottom-2 left-0 h-px w-full bg-champagne" />}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
            <span className="text-warm-taupe">Sort</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none bg-transparent pr-6 text-[11px] uppercase tracking-[0.22em] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="new">New arrivals</option>
                <option value="price-asc">Price · low</option>
                <option value="price-desc">Price · high</option>
              </select>
              <ChevronDown size={12} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuick} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-24 text-center text-sm text-warm-taupe">Nothing here — for now.</p>
      )}

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}