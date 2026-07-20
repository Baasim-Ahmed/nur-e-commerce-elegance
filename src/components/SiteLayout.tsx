import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return (
    <div className="min-h-screen bg-ivory text-matte-black">
      <AnnouncementBar />
      <Navbar transparent={isHome} />
      <main className={isHome ? "" : "pt-24 md:pt-28"}>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}