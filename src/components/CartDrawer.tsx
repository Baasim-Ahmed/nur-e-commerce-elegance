import { X, Minus, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, cartKey } from "@/lib/cart-store";
import { useEffect } from "react";

export function CartDrawer() {
  const { isOpen, closeCart, lines, updateQty, remove, subtotal, count } = useCart();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-matte-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-hidden={!isOpen}
        aria-label="Cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-warm-taupe/25 px-6 py-5">
          <div>
            <p className="eyebrow">Your Selection</p>
            <h2 className="mt-1 font-serif text-xl">Cart · {count}</h2>
          </div>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="eyebrow">Empty</p>
              <p className="mt-4 max-w-xs font-serif text-2xl">
                Your cart is waiting to be composed.
              </p>
              <Link to="/shop" onClick={closeCart} className="btn-primary mt-8">
                Explore Collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-warm-taupe/20">
              {lines.map((l) => {
                const k = cartKey(l.id, l.size);
                return (
                  <li key={k} className="flex gap-4 py-6">
                    <img
                      src={l.image}
                      alt={l.name}
                      className="h-28 w-24 object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-serif text-lg leading-tight">{l.name}</p>
                          {l.size && (
                            <p className="mt-1 text-xs uppercase tracking-widest text-warm-taupe">
                              Size {l.size}
                            </p>
                          )}
                        </div>
                        <p className="text-sm">${(l.price * l.quantity).toLocaleString()}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center border border-warm-taupe/40">
                          <button
                            aria-label="Decrease"
                            className="p-2 hover:text-champagne-deep"
                            onClick={() => updateQty(k, l.quantity - 1)}
                          >
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 text-center text-xs">{l.quantity}</span>
                          <button
                            aria-label="Increase"
                            className="p-2 hover:text-champagne-deep"
                            onClick={() => updateQty(k, l.quantity + 1)}
                          >
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(k)}
                          className="text-[10px] uppercase tracking-[0.22em] text-warm-taupe hover:text-matte-black"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-warm-taupe/25 px-6 py-6">
            <div className="mb-3 flex items-center gap-3">
              <input
                placeholder="Promotion code"
                className="flex-1 border-b border-warm-taupe/40 bg-transparent py-2 text-sm outline-none focus:border-champagne"
              />
              <button className="text-[11px] uppercase tracking-[0.22em] text-champagne-deep hover:text-matte-black">
                Apply
              </button>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="font-serif text-2xl">${subtotal.toLocaleString()}</span>
            </div>
            <p className="mt-1 text-xs text-warm-taupe">Shipping and taxes calculated at checkout.</p>
            <button className="btn-primary mt-6 w-full">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}