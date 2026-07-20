import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
    <circle cx="12" cy="12" r="10" />
    <path d="M11 8v9M9 15c1 1 3 1 4-1 1-2 0-5-2-5s-3 2-3 4" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M15 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M15 4c.5 2.5 2.5 4 5 4" />
  </svg>
);

export function Footer() {
  return (
    <footer className="mt-24 bg-soft-beige">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Logo size={20} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-matte-black/70">
              A house of quiet luxury — clothing, leather, jewelry and perfume, made slowly and worn for decades.
            </p>
            <div className="mt-6 flex gap-4 text-matte-black/70">
              <a aria-label="Instagram" href="#" className="hover:text-champagne-deep"><Instagram size={16} strokeWidth={1.25} /></a>
              <a aria-label="Pinterest" href="#" className="hover:text-champagne-deep"><PinterestIcon /></a>
              <a aria-label="Facebook" href="#" className="hover:text-champagne-deep"><Facebook size={16} strokeWidth={1.25} /></a>
              <a aria-label="TikTok" href="#" className="hover:text-champagne-deep"><TikTokIcon /></a>
            </div>
          </div>

          <div>
            <p className="eyebrow">The Maison</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li><Link to="/story" className="hover:text-champagne-deep">Our Story</Link></li>
              <li><Link to="/shop" className="hover:text-champagne-deep">Collections</Link></li>
              <li><Link to="/journal" className="hover:text-champagne-deep">Journal</Link></li>
              <li><a href="#" className="hover:text-champagne-deep">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Care</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href="#" className="hover:text-champagne-deep">Shipping</a></li>
              <li><a href="#" className="hover:text-champagne-deep">Returns</a></li>
              <li><a href="#" className="hover:text-champagne-deep">FAQs</a></li>
              <li><Link to="/contact" className="hover:text-champagne-deep">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Correspondence</p>
            <p className="mt-6 text-sm text-matte-black/70">
              Private previews, house letters, and quiet launches.
            </p>
            <form className="mt-4 flex border-b border-warm-taupe/40 focus-within:border-champagne">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-warm-taupe/70"
              />
              <button className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne-deep hover:text-matte-black">
                Join
              </button>
            </form>
          </div>
        </div>

        <hr className="hairline mt-16" />
        <div className="mt-6 flex flex-col justify-between gap-4 text-xs text-matte-black/60 md:flex-row">
          <p>© 2026 NURÉ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-matte-black">Privacy</a>
            <a href="#" className="hover:text-matte-black">Terms</a>
            <a href="#" className="hover:text-matte-black">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}