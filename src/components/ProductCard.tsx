import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  onQuickView?: (p: Product) => void;
};

export function ProductCard({ product, onQuickView }: Props) {
  return (
    <div className="group relative">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden border border-transparent bg-soft-beige transition-colors duration-500 hover:border-champagne"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-soft-beige">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 border border-champagne bg-ivory/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-champagne-deep backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.name}`}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <Eye size={14} strokeWidth={1.25} />
            </button>
          )}
        </div>
      </Link>
      <div className="flex items-baseline justify-between px-1 pt-4">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3 className="mt-1 font-serif text-lg leading-tight">
            <Link to="/product/$id" params={{ id: product.id }}>{product.name}</Link>
          </h3>
        </div>
        <p className="text-sm text-matte-black/70">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}