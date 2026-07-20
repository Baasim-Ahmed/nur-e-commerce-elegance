import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addLine } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSize(product?.sizes?.[0]);
  }, [product]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = product ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-matte-black/50 p-4 fade-in-slow"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden bg-ivory md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-ivory/90 p-2"
        >
          <X size={18} strokeWidth={1.25} />
        </button>
        <div className="aspect-[4/5] bg-soft-beige md:aspect-auto">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-between p-8 md:p-12">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight">{product.name}</h2>
            <p className="mt-2 text-sm text-warm-taupe">${product.price.toLocaleString()}</p>
            <p className="mt-6 text-sm leading-relaxed text-matte-black/75">
              {product.description}
            </p>

            {product.sizes && (
              <div className="mt-8">
                <p className="eyebrow">Size</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-11 border px-3 py-2 text-xs uppercase tracking-widest transition-colors ${
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
          </div>

          <button
            className="btn-primary mt-10 w-full"
            onClick={() => {
              addLine({ id: product.id, name: product.name, price: product.price, image: product.image, size });
              onClose();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}