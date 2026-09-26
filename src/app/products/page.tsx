// products/page.tsx
import { Suspense } from "react";
import { Wishlist1 } from "@/components/wishlist1";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <Wishlist1 />
    </Suspense>
  );
}