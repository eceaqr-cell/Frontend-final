import { ProductDetail1 } from "@/components/product-detail1";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <main>
      <ProductDetail1 productId={id} />
    </main>
  );
}