
// src/context/wishlist-context.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WishlistContextType {
  wishlistIds: Set<string>;
  wishlistCount: number;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isWishlisted = (id: string) => wishlistIds.has(id);

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, wishlistCount: wishlistIds.size, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}