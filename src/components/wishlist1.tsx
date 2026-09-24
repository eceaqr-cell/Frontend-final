"use client";

import { Heart, ShoppingCart, Trash2, TrendingDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "cn";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WishlistItem {
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

const Wishlist1 = ({ className }: Wishlist1Props) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductApi() {
      try {
        const response = await fetch(
          `${API_BASE}/api/v1/products?page=0&size=12`,
        );
        const result = await response.json();

        // Response is a Page object: { content: [...], totalPages, ... }
        const productsData = result?.content;

        if (Array.isArray(productsData)) {
          const formattedProducts = productsData.map((item: any) => {
            const hasDiscount = item.discount && item.discount > 0;
            const originalPrice = hasDiscount
              ? item.priceOut / (1 - item.discount)
              : undefined;

            return {
              id: item.uuid,
              name: item.name,
              image: item.thumbnail || item.filteredImage || item.images?.[0],
              price: item.priceOut,
              originalPrice,
              inStock: item.availability ?? item.stockQuantity > 0,
              priceDrop: hasDiscount,
            };
          });

          setWishlistItems(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductApi();
  }, []);

  const removeItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-6xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="mb-3 size-6 animate-spin" />
            <p>Loading products...</p>
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group gap-0 overflow-hidden p-0">
                <div className="relative">
                  <AspectRatio ratio={1} className="bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
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
                    className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="size-4" />
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
                    variant={item.inStock ? "default" : "secondary"}
                  >
                    {item.inStock ? "Add to Cart" : "Notify When Available"}
                  </Button>
                </CardContent>
              </Card>
            ))}
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
              <Button className="mt-6">Continue Shopping</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export { Wishlist1 };