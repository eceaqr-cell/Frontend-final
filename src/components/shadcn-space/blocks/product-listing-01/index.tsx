"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  ProductCard,
  type ProductCardProps,
} from "@/components/shadcn-space/blocks/product-listing-01/product-card";

const API_BASE = "https://ishop.cheat.casa";
const PRODUCTS_TO_SHOW = 8;

// Fallback data — used if the API fails or before data loads
export const PRODUCTS: ProductCardProps[] = [
  {
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp",
    category: "Electronics",
    name: "Apple Watch S9",
    rating: 4.5,
    reviews: 105,
    price: 684,
    originalPrice: 855,
  },
  {
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-02-2.webp",
    category: "Fashion",
    name: "Beige Jacket",
    rating: 4.3,
    reviews: 105,
    price: 479,
    originalPrice: 599,
    badge: { text: "-15%" },
  },
  {
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-3.webp",
    category: "Beauty",
    name: "Glow Serum",
    rating: 4.5,
    reviews: 105,
    price: 46,
    originalPrice: 55,
    badge: { text: "New" },
  },
  {
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-4.webp",
    category: "Electronics",
    name: "Space WH-1000XM5",
    rating: 4.5,
    reviews: 105,
    price: 279,
    originalPrice: 349,
    badge: { text: "Hot" },
  },
];

// Maps a raw API product into the shape ProductCard expects
function mapApiProduct(item: any): ProductCardProps {
  const hasDiscount = item.discount && item.discount > 0;
  const discountFraction = hasDiscount ? item.discount / 100 : 0;
  const originalPrice = hasDiscount
    ? Math.round((item.priceOut / (1 - discountFraction)) * 100) / 100
    : undefined;

  return {
    image: item.thumbnail || item.filteredImage || item.images?.[0] || "",
    category: item.category?.name ?? item.brand?.name ?? "General",
    name: item.name,
    rating: 4.5,
    reviews: 100,
    price: item.priceOut,
    originalPrice,
    badge: hasDiscount ? { text: `-${item.discount}%` } : undefined,
  };
}

export interface ProductListingProps {
  products?: ProductCardProps[];
}

export default function ProductListing({ products }: ProductListingProps) {
  const [items, setItems] = useState<ProductCardProps[]>(products ?? PRODUCTS);
  const [loading, setLoading] = useState(!products);

  useEffect(() => {
    if (products) return;

    async function fetchProducts() {
      try {
        const response = await fetch(
          `${API_BASE}/api/v1/products?page=0&size=${PRODUCTS_TO_SHOW}`,
        );
        const result = await response.json();
        const productsData = result?.content;

        if (Array.isArray(productsData) && productsData.length > 0) {
          setItems(productsData.map(mapApiProduct));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [products]);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-foreground">
              Featured products
            </h2>
            <p className="text-base text-muted-foreground">
              Handpicked by our team
            </p>
          </div>
          <a
            href="#"
            className="items-center gap-2 text-sm font-medium flex group cursor-pointer"
          >
            See all
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 size-5 animate-spin" />
            Loading products...
          </div>
        ) : (
          <div className="w-full overflow-x-auto xl:[scrollbar-width:none] xl:[-ms-overflow-style:none] xl:[&::-webkit-scrollbar]:hidden">
            <div className="flex gap-6">
              {items.map((product, index) => (
                <div
                  key={index}
                  className="inline-block min-w-67.5 max-w-67.5 w-full whitespace-normal shrink-0"
                >
                  <ProductCard {...product} className="w-full" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}