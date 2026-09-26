"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Menu, X, LogIn, Search, ShoppingBag, Heart } from 'lucide-react';
import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

export type NavigationSection = {
  title: string;
  href: string;
};

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const CollaborateButton = ({ className }: { className?: string }) => (
  <Link href="/products">
    <Button className={cn("relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden", className, "cursor-pointer")}>
      <span className="relative z-10 transition-all duration-500">
        Browse Products
      </span>
      <span className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </Button>
  </Link>
);

const LoginButton = ({ className }: { className?: string }) => (
  <Link
    href="/login"
    className={cn(
      "inline-flex items-center justify-center text-sm font-medium rounded-full h-10 px-5 border border-input hover:bg-muted transition cursor-pointer",
      className,
    )}
  >
    <LogIn className="mr-2 size-4" />
    Login
  </Link>
);

const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 h-10 rounded-full w-48 lg:w-56"
      />
    </form>
  );
};

const Header = ({ navigationData, className }: HeaderProps) => {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={cn(
        "inset-x-0 z-50 px-4 flex items-center justify-center sticky top-0 h-20",
        className,
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
          sticky
            ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
            : "bg-transparent border-transparent",
        )}
      >
        {/* Logo */}
        <div>
          <Link href="/">
            <Logo className="gap-3" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div>
          <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full">
            <NavigationMenuList className="flex gap-0">
              {navigationData.map((navItem) => {
                const isActive = pathname === navItem.href;
                return (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className={cn(
                        "px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal",
                        isActive ? "bg-background text-foreground" : "",
                      )}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Search */}
        <SearchBar className="hidden lg:block" />

        {/* Desktop CTA */}
        <div className="flex gap-3 items-center">
          <LoginButton className="hidden lg:flex" />

          <Link href="/wishlist" className="relative hidden lg:block">
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="size-4" />
            </Button>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative hidden lg:block">
            <Button variant="outline" size="icon" className="rounded-full">
              <ShoppingBag className="size-4" />
            </Button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <CollaborateButton className="hidden lg:flex" />

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger id="mobile-menu-trigger">
                <span className="rounded-full border border-border p-2 block">
                  <Menu width={20} height={20} />
                  <span className="sr-only">Menu</span>
                </span>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full sm:w-96 p-0 border-l-0"
              >
                <div className="flex items-center justify-between p-6">
                  <a href="/">
                    <Logo className="gap-2" />
                  </a>
                  <SheetClose id="mobile-menu-close">
                    <span className="rounded-full border border-border p-2.5 block">
                      <X width={16} height={16} />
                    </span>
                  </SheetClose>
                </div>

                <div className="flex flex-col gap-8 px-6 pb-6 overflow-y-auto">
                  <SearchBar className="w-full" />

                  <div className="flex flex-col gap-8">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <NavigationMenu
                      orientation="vertical"
                      className="items-start flex-none"
                    >
                      <NavigationMenuList className="flex flex-col items-start gap-3">
                        {navigationData.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <NavigationMenuItem key={item.title}>
                              <NavigationMenuLink
                                href={item.href}
                                className={cn(
                                  "group/nav flex items-center text-2xl font-semibold tracking-tight transition-all p-0 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent",
                                  isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:translate-x-2",
                                )}
                              >
                                <div
                                  className={cn(
                                    "h-0.5 bg-primary transition-all duration-300 overflow-hidden",
                                    isActive
                                      ? "w-4 mr-2 opacity-100"
                                      : "w-0 opacity-0 group-hover/nav:w-4 group-hover/nav:mr-2 group-hover/nav:opacity-100",
                                  )}
                                />
                                {item.title}
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          );
                        })}
                      </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex flex-col gap-4">
                      <Link href="/wishlist" className="flex items-center gap-2 text-2xl font-semibold">
                        <Heart className="size-5" />
                        Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                      </Link>
                      <Link href="/cart" className="flex items-center gap-2 text-2xl font-semibold">
                        <ShoppingBag className="size-5" />
                        Cart {cartCount > 0 && `(${cartCount})`}
                      </Link>
                    </div>

                    <div className="flex flex-col gap-3 w-fit">
                      <LoginButton />
                      <CollaborateButton />
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex gap-3">
                      {[
                        "lucide:instagram",
                        "lucide:twitter",
                        "lucide:linkedin",
                        "lucide:facebook",
                      ].map((icon) => (
                        <a
                          key={icon}
                          href="#"
                          className="flex items-center justify-center rounded-full outline outline-border hover:bg-muted transition p-3 shadow-xs"
                        >
                          <Icon icon={icon} width={16} height={16} />
                        </a>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      © 2026 Nexus E-Com
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;