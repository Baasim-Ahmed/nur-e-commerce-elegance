import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/story", label: "Our Story" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background,box-shadow,color] duration-500",
          solid ? "bg-ivory/95 text-matte-black backdrop-blur-md" : "bg-transparent text-ivory",
        )}
        style={solid ? { boxShadow: "0 1px 0 rgba(0,0,0,0.04)" } : undefined}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-4 md:px-10 md:py-5">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.25} />
            </button>
            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="underline-grow text-[11px] font-medium uppercase tracking-[0.22em]"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="justify-self-center" aria-label="NURÉ home">
            <Logo size={22} />
          </Link>

          <div className="flex items-center justify-end gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <Search size={18} strokeWidth={1.25} />
            </button>
            <button
              aria-label="Account"
              className="hidden opacity-80 transition-opacity hover:opacity-100 sm:block"
            >
              <User size={18} strokeWidth={1.25} />
            </button>
            <button
              onClick={openCart}
              aria-label={`Cart with ${count} items`}
              className="relative opacity-80 transition-opacity hover:opacity-100"
            >
              <ShoppingBag size={18} strokeWidth={1.25} />
              {count > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-medium"
                  style={{ background: "var(--champagne)", color: "var(--matte-black)" }}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory text-matte-black fade-in-slow md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Logo size={20} />
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-8 px-8 pb-24">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl font-light tracking-tight"
              >
                {n.label}
              </Link>
            ))}
            <hr className="hairline my-4" />
            <span className="eyebrow">Born with nobility · Defined by elegance</span>
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-ivory/98 backdrop-blur-md fade-in-slow">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
            <Logo size={20} />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>
          <div className="mx-auto max-w-2xl px-6 pt-16 md:pt-32">
            <span className="eyebrow">Search the maison</span>
            <input
              autoFocus
              placeholder="What are you looking for?"
              className="mt-4 w-full border-b border-warm-taupe/40 bg-transparent pb-4 font-serif text-3xl font-light outline-none placeholder:text-warm-taupe/60 focus:border-champagne md:text-5xl"
            />
            <div className="mt-10">
              <span className="eyebrow">Suggestions</span>
              <div className="mt-4 flex flex-wrap gap-3">
                {["Silk dress", "Tote", "Gold hoop", "Nuit Blanche", "Cashmere coat"].map((s) => (
                  <button
                    key={s}
                    className="rounded-full border border-warm-taupe/30 px-4 py-2 text-xs tracking-widest text-matte-black/80 transition-colors hover:border-champagne hover:text-matte-black"
                    onClick={() => setSearchOpen(false)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}