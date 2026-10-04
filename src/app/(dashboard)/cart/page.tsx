"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_BASE = "https://ishop.cheat.casa";
const FALLBACK_IMAGE = "https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default function CartPage() {
  const { cartIds, removeFromCart } = useCart();
  const [cartProducts, setCartProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/v1/products?page=0&size=50`);
        const result = await response.json();
        const allProducts = result?.content ?? [];

        const matchedItems = allProducts
          .filter((item: any) => cartIds.has(item.uuid))
          .map((item: any) => ({
            id: item.uuid,
            name: item.name,
            image: item.thumbnail || item.filteredImage || item.images?.[0] || "",
            price: item.priceOut,
          }));

        setCartProducts(matchedItems);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (cartIds.size > 0) {
      fetchCartItems();
    } else {
      setCartProducts([]);
      setLoading(false);
    }
  }, [cartIds]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  const totalPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      {/* ប៊ូតុងថយក្រោយ ឬត្រឡប់ទៅទំព័រដើម */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Link href="/products">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-muted-foreground">Loading cart items...</div>
      ) : cartProducts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          {/* បញ្ជីទំនិញក្នុងកន្ត្រក */}
          <div className="space-y-4 md:col-span-2">
            {cartProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm bg-card"
              >
                <img
                  src={item.image || FALLBACK_IMAGE}
                  alt={item.name}
                  className="size-20 rounded-md object-contain bg-muted p-2"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{item.name}</h3>
                  <p className="mt-1 font-semibold">{formatPrice(item.price)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* សរុបតម្លៃ និងប៊ូតុង Checkout */}
          <div className="rounded-lg border p-6 shadow-sm h-fit space-y-4 bg-card">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between border-t pt-4">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-lg border border-dashed">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="size-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-1 text-muted-foreground">Add some products to your cart to see them here.</p>
          <Link href="/products" className="mt-6">
            <Button>Browse Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
}