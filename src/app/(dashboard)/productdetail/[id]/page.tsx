import { ProductDetail1 } from "@/components/product-detail1";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ProductsResponse {
  content: { uuid: string }[];
  last: boolean;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = new Set<string>();
  const size = 12;

  for (let page = 0; ; page++) {
    const response = await fetch(
      `https://ishop.cheat.casa/api/v1/products?page=${page}&size=${size}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products page ${page}: ${response.status}`,
      );
    }

    const data: ProductsResponse = await response.json();

    if (!Array.isArray(data.content)) {
      throw new Error("Products API response is missing content.");
    }

    for (const product of data.content) {
      if (!product.uuid) {
        throw new Error("A product is missing its UUID.");
      }

      ids.add(product.uuid);
    }

    if (data.last === true || data.content.length < size) {
      break;
    }
  }

  if (ids.size === 0) {
    throw new Error("No product IDs were returned for static export.");
  }

  return Array.from(ids, (id) => ({ id }));
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <main>
      <ProductDetail1 productId={id} />
    </main>
  );
}
