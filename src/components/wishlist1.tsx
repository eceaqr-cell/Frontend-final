"use client";

import { useSearchParams } from "next/navigation";
import { Heart, ShoppingCart, TrendingDown, Loader2, Check, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "cn";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  priceDrop?: boolean;
}

interface Wishlist1Props {
  className?: string;
}

const API_BASE = "https://ishop.cheat.casa";
const PAGE_SIZE = 12;
const FALLBACK_IMAGE = "https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image";

function shouldShowDiscountBadge(uuid: string): boolean {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash = (hash * 31 + uuid.charCodeAt(i)) % 100;
  }
  return hash < 30;
}

function mapApiProduct(item: any): ProductItem {
  const hasRealDiscount = item.discount && item.discount > 0;
  const showBadge = hasRealDiscount && shouldShowDiscountBadge(item.uuid);
  const discountFraction = hasRealDiscount ? item.discount / 100 : 0;
  const originalPrice = hasRealDiscount
    ? Math.round((item.priceOut / (1 - discountFraction)) * 100) / 100
    : undefined;

  return {
    id: item.uuid,
    name: item.name,
    image: item.thumbnail || item.filteredImage || item.images?.[0] || "",
    price: item.priceOut,
    originalPrice: showBadge ? originalPrice : undefined,
    inStock: item.availability ?? item.stockQuantity > 0,
    priceDrop: showBadge,
  };
}

const Wishlist1 = ({ className }: Wishlist1Props) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { cartIds, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  async function fetchPage(pageNumber: number, name: string) {
    const params = new URLSearchParams({
      page: String(pageNumber),
      size: String(PAGE_SIZE),
    });
    if (name) params.set("name", name);

    const response = await fetch(`${API_BASE}/api/v1/products?${params}`);
    const result = await response.json();
    const productsData = result?.content ?? [];
    const isLastPage =
      result?.last === true || productsData.length < PAGE_SIZE;
    return { items: productsData.map(mapApiProduct), isLastPage };
  }

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      try {
        const { items, isLastPage } = await fetchPage(0, searchTerm);
        setProducts(items);
        setPage(0);
        setHasMore(!isLastPage);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(loadInitial, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  async function handleLoadMore() {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const { items, isLastPage } = await fetchPage(nextPage, searchTerm);
      setProducts((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(!isLastPage);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11 rounded-full"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="mb-3 size-6 animate-spin" />
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((item) => {
                const inCart = cartIds.has(item.id);
                const wishlisted = isWishlisted(item.id);
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

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {item.priceDrop && (
                          <Badge className="bg-emerald-600 hover:bg-emerald-600">
                            <TrendingDown className="mr-1 size-3" />
                            លក់ដាច់បំផុត
                          </Badge>
                        )}
                        {!item.inStock && (
                          <Badge variant="secondary">Out of Stock</Badge>
                        )}
                      </div>

                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-3 right-3"
                        onClick={() => toggleWishlist(item.id)}
                      >
                        <Heart
                          className={cn(
                            "size-4 transition-colors",
                            wishlisted && "fill-red-500 stroke-red-500",
                          )}
                        />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="line-clamp-2 leading-tight font-medium">
                        {item.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Button
                        className="mt-4 w-full"
                        disabled={!item.inStock}
                        variant={
                          !item.inStock
                            ? "secondary"
                            : inCart
                              ? "outline"
                              : "default"
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

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Products"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="p-0">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">
                {searchTerm ? `No results for "${searchTerm}"` : "No products found"}
              </h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Check back later for new arrivals"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export { Wishlist1 };