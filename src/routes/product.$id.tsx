import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Minus, Plus, Truck, RefreshCcw, Sparkles } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — NURÉ` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — NURÉ` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Piece — NURÉ" }],
  }),
  component: PDP,
});

function PDP() {
  const { product } = Route.useLoaderData();
  const { addLine } = useCart();
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<string | null>("materials");

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fill = related.length < 4 ? products.filter((p) => p.id !== product.id).slice(0, 4 - related.length) : [];
  const relatedFinal = [...related, ...fill].slice(0, 4);

  return (
    <div>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-20 md:grid-cols-2 md:gap-16 md:px-10 md:pb-32">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden bg-soft-beige">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden bg-soft-beige">
                <img src={src} alt="" className="h-full w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-32 md:self-start">
          <nav className="text-xs uppercase tracking-[0.22em] text-warm-taupe">
            <Link to="/shop">Shop</Link>
            <span className="mx-2">·</span>
            <span>{product.category}</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{product.name}</h1>
          <p className="mt-3 text-sm text-warm-taupe">${product.price.toLocaleString()}</p>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-matte-black/80">
            {product.description}
          </p>

          {product.sizes && (
            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <p className="eyebrow">Size</p>
                <button className="text-[10px] uppercase tracking-[0.22em] text-warm-taupe underline-grow">
                  Size guide
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-12 border px-4 py-3 text-xs uppercase tracking-widest transition-colors ${
                      size === s
                        ? "border-matte-black bg-matte-black text-ivory"
                        : "border-warm-taupe/40 hover:border-champagne"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center border border-warm-taupe/40">
              <button aria-label="Decrease" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus size={12} strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center text-xs">{qty}</span>
              <button aria-label="Increase" className="p-3" onClick={() => setQty((q) => q + 1)}>
                <Plus size={12} strokeWidth={1.5} />
              </button>
            </div>
            <button
              className="btn-primary flex-1"
              onClick={() => addLine({ id: product.id, name: product.name, price: product.price, image: product.image, size, quantity: qty })}
            >
              Add to Cart · ${(product.price * qty).toLocaleString()}
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-xs text-matte-black/70 sm:grid-cols-3">
            <span className="flex items-center gap-2"><Truck size={14} strokeWidth={1.25} /> Complimentary shipping</span>
            <span className="flex items-center gap-2"><RefreshCcw size={14} strokeWidth={1.25} /> 30-day returns</span>
            <span className="flex items-center gap-2"><Sparkles size={14} strokeWidth={1.25} /> Signature packaging</span>
          </div>

          <div className="mt-12 border-t border-warm-taupe/25">
            {[
              { key: "materials", label: "Materials & Care", body: product.materials },
              { key: "shipping", label: "Shipping & Returns", body: "Complimentary express shipping worldwide. Returns accepted within 30 days in original condition." },
              { key: "atelier", label: "The Atelier", body: "Handcrafted by long-standing partner ateliers in Italy and France, in small numbered runs." },
            ].map((a) => {
              const open = openAcc === a.key;
              return (
                <div key={a.key} className="border-b border-warm-taupe/25">
                  <button
                    className="flex w-full items-center justify-between py-5 text-left"
                    onClick={() => setOpenAcc(open ? null : a.key)}
                    aria-expanded={open}
                  >
                    <span className="text-[11px] uppercase tracking-[0.22em]">{a.label}</span>
                    <ChevronDown size={14} strokeWidth={1.25} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <p className="pb-6 text-sm leading-relaxed text-matte-black/75">{a.body}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">You may also like</h2>
          <Link to="/shop" className="underline-grow text-[11px] uppercase tracking-[0.22em]">All pieces</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-8">
          {relatedFinal.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}