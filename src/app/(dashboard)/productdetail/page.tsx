import { Suspense } from "react";
import { Wishlist1 } from "@/components/wishlist1";

export default function ProductdetailPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          Loading products...
        </div>
      }
    >
      <Wishlist1 />
    </Suspense>
  );
}
