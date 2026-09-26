"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { cn } from "cn";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/cart-context";

const API_BASE = "https://ishop.cheat.casa";

interface ColorOption {
  color: string;
  images: string[];
}

interface ApiProduct {
  uuid: string;
  name: string;
  description?: string;
  stockQuantity: number;
  priceOut: number;
  discount?: number;
  color?: ColorOption[];
  thumbnail?: string;
  images?: string[];
  availability?: boolean;
  brand?: { name: string };
  category?: { name: string };
}

type FormType = z.infer<typeof formSchema>;

interface ProductImagesProps {
  images: string[];
}

interface PriceProps {
  regular: number;
  sale?: number;
  currency: string;
}

const formSchema = z.object({
  color: z.string(),
  quantity: z.number().min(1),
});

interface ProductDetail1Props {
  className?: string;
  productId?: string;
}

const ProductDetail1 = ({ className, productId }: ProductDetail1Props) => {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cartIds, addToCart } = useCart();

  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/products/${productId}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: ApiProduct = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Couldn't load this product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
        <Loader2 className="mb-3 size-6 animate-spin" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold">រកមិនឃើញផលិតផលនេះទេ!</h2>
        <p className="text-muted-foreground mt-2">ID ដែលទទួលបាន៖ {productId}</p>
      </div>
    );
  }

  const hasDiscount = product.discount && product.discount > 0;
  const salePrice = hasDiscount
    ? Math.round((product.priceOut * (1 - product.discount! / 100)) * 100) / 100
    : undefined;

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail || ""];

  const isInStock = product.availability ?? product.stockQuantity > 0;
  const inCart = cartIds.has(product.uuid);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductImages images={allImages} />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {product.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {product.brand?.name && (
                      <Badge variant="outline">{product.brand.name}</Badge>
                    )}
                    <Badge variant={isInStock ? "secondary" : "destructive"}>
                      {isInStock && <CircleCheck className="mr-1 size-3" />}
                      {isInStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
                <Price
                  regular={product.priceOut}
                  sale={salePrice}
                  currency="USD"
                />
              </div>

              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!isInStock}
              variant={inCart ? "outline" : "default"}
              onClick={() => addToCart(product.uuid)}
            >
              {!isInStock ? (
                "Out of Stock"
              ) : inCart ? (
                <>
                  <Check className="mr-2 size-4" />
                  Added to Cart
                </>
              ) : (
                "Buy Now"
              )}
            </Button>

            {product.color && product.color.length > 0 && (
              <ProductForm colors={product.color} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <Carousel
      opts={{
        breakpoints: {
          "(min-width: 768px)": {
            active: false,
          },
        },
      }}
    >
      <CarouselContent className="gap-4 md:m-0 md:grid md:grid-cols-3 xl:gap-5">
        {images.map((src, index) => (
          <CarouselItem
            className="first:col-span-3 md:p-0"
            key={`product-detail-1-image-${index}`}
          >
            <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
              <img
                src={src}
                alt=""
                className="block size-full object-cover object-center"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="md:hidden">
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </div>
    </Carousel>
  );
};

interface ProductFormProps {
  colors: ColorOption[];
}

const ProductForm = ({ colors }: ProductFormProps) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: colors[0]?.color,
      quantity: 1,
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="color"
        render={({ field }) => (
          <fieldset className="space-y-3">
            <legend className="text-base font-semibold">Select color</legend>
            <ColorRadioGroup field={field} options={colors} />
          </fieldset>
        )}
      />
    </form>
  );
};

interface ColorRadioGroupProps {
  options: ColorOption[];
  field: ControllerRenderProps<FormType>;
}

const ColorRadioGroup = ({ options, field }: ColorRadioGroupProps) => {
  return (
    <RadioGroup
      {...field}
      value={`${field.value}`}
      onValueChange={(value) => {
        if (value !== field.value && value) {
          field.onChange(value);
        }
      }}
      className="flex flex-wrap gap-3"
    >
      {options.map((item, index) => (
        <label
          key={`product-detail-1-color-${index}`}
          htmlFor={`color-${item.color}`}
          className="relative flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground has-checked:bg-primary has-checked:text-primary-foreground"
        >
          <RadioGroupItem
            id={`color-${item.color}`}
            className="absolute size-px overflow-hidden opacity-0"
            value={item.color}
          />
          <span
            className="size-4 rounded-full border"
            style={{ backgroundColor: item.color }}
          />
          <span className="capitalize">{item.color}</span>
        </label>
      ))}
    </RadioGroup>
  );
};

const Price = ({ regular, sale, currency }: PriceProps) => {
  if (!regular || !currency) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

  return (
    <div className="flex items-center gap-2">
      {sale && (
        <span className="text-right text-2xl font-bold text-primary">
          {formatCurrency(sale)}
        </span>
      )}
      <span
        className={cn(
          "text-right text-2xl font-bold",
          sale ? "text-muted-foreground line-through" : "text-foreground",
        )}
      >
        {formatCurrency(regular)}
      </span>
    </div>
  );
};

export { ProductDetail1 };