"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Check, Loader2, Trash2 } from "lucide-react";
import { cn } from "cn";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
}

const API_BASE = "https://ishop.cheat.casa";
const FALLBACK_IMAGE = "https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image";

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { cartIds, addToCart } = useCart();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistProducts() {
      setLoading(true);
      try {
        const ids = Array.from(wishlistIds);
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await fetch(`${API_BASE}/api/v1/products/${id}`);
              if (!res.ok) return null;
              const item = await res.json();
              return {
                id: item.uuid,
                name: item.name,
                image: item.thumbnail || item.filteredImage || item.images?.[0] || "",
                price: item.priceOut,
                inStock: item.availability ?? item.stockQuantity > 0,
              } as ProductItem;
            } catch {
              return null;
            }
          }),
        );
        setProducts(results.filter((p): p is ProductItem => p !== null));
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (wishlistIds.size > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [wishlistIds]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-muted-foreground">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="mb-3 size-6 animate-spin" />
            <p>Loading your wishlist...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => {
              const inCart = cartIds.has(item.id);
              return (
                <Card key={item.id} className="group gap-0 overflow-hidden p-0">
                  <div className="relative">
                    <AspectRatio ratio={1} className="bg-muted">
                      <img
                        src={item.image || FALLBACK_IMAGE}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className={cn(
                          "size-full object-contain p-6",
                          !item.inStock && "opacity-50",
                        )}
                      />
                    </AspectRatio>

                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3"
                      onClick={() => toggleWishlist(item.id)}
                      title="Remove from wishlist"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="line-clamp-2 leading-tight font-medium">
                      {item.name}
                    </h3>
                    <div className="mt-2">
                      <span className="text-lg font-semibold">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      disabled={!item.inStock}
                      variant={
                        !item.inStock ? "secondary" : inCart ? "outline" : "default"
                      }
                      onClick={() => addToCart(item.id)}
                    >
                      {!item.inStock ? (
                        "Notify When Available"
                      ) : inCart ? (
                        <>
                          <Check className="mr-2 size-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 size-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-0">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Heart className="size-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Save items you love by clicking the heart icon on any product
              </p>
              <Link href="/products">
                <Button className="mt-6">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}