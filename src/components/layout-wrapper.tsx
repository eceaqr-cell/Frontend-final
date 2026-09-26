"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/shadcn-space/blocks/hero-01/header";
import Footer from "@/components/shadcn-space/blocks/footer-01/footer";
import { Button } from "@/components/ui/button";

const navigationData = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "About us", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isCartPage = pathname === "/cart";
  const isWishlistPage = pathname === "/wishlist";
  const isLoginPage = pathname === "/login";

  const hideFullNav = isCartPage || isWishlistPage || isLoginPage;

  return (
    <>
      {hideFullNav && (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>
      )}

      {!hideFullNav && <Header navigationData={navigationData} />}
      <main className="flex-1">{children}</main>
      {!hideFullNav && <Footer />}
    </>
  );
}