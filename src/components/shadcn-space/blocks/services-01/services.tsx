"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  Laptop,
  Shirt,
  Sparkles,
  Home,
  Footprints,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
} from "lucide-react";
import Link from "next/link";

type CategoryData = {
  category_icon: LucideIcon;
  category_title: string;
  category_bg_color: string;
  category_text_color: string;
  href: string;
};

const categoryData: CategoryData[] = [
  {
    category_icon: Laptop,
    category_title: "Electronics",
    category_bg_color: "bg-blue-500/10",
    category_text_color: "text-blue-500",
    href: "/products?category=electronics",
  },
  {
    category_icon: Shirt,
    category_title: "Fashion",
    category_bg_color: "bg-orange-400/10",
    category_text_color: "text-orange-400",
    href: "/products?category=fashion",
  },
  {
    category_icon: Sparkles,
    category_title: "Beauty",
    category_bg_color: "bg-teal-400/10",
    category_text_color: "text-teal-400",
    href: "/products?category=beauty",
  },
  {
    category_icon: Home,
    category_title: "Home & Living",
    category_bg_color: "bg-sky-400/10",
    category_text_color: "text-sky-400",
    href: "/products?category=home",
  },
  {
    category_icon: Footprints,
    category_title: "Shoes",
    category_bg_color: "bg-red-500/10",
    category_text_color: "text-red-500",
    href: "/products?category=shoes",
  },
];

type FeatureData = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

const featureData: FeatureData[] = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure Payment", subtitle: "Encrypted checkout" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: Headset, title: "24/7 Support", subtitle: "Always here to help" },
];

const Categories = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <section className="bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-16 justify-center items-center w-full">
          {/* Heading */}
          <div className="flex flex-col gap-4 justify-center items-center animate-in fade-in slide-in-from-top-10 duration-1000 delay-200 ease-in-out fill-mode-both">
            <Badge variant="outline" className="text-sm font-normal py-1 px-3 h-7">
              Categories
            </Badge>
            <div className="max-w-3xs sm:max-w-lg mx-auto text-center">
              <h2 className="text-foreground text-3xl sm:text-5xl font-medium">
                Find what you're looking for
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:gap-12 justify-center items-center">
            {/* categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              {categoryData.map((category, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Link href={category.href}>
                    <Card
                      className={cn(
                        "ring-0 p-8 hover:scale-[1.02] transition-transform cursor-pointer",
                        category.category_bg_color,
                      )}
                    >
                      <CardContent className="p-0 flex flex-col items-start justify-between gap-12 sm:gap-16">
                        <category.category_icon
                          size={32}
                          className={cn(category.category_text_color)}
                        />
                        <p
                          className={cn(
                            "text-2xl font-medium max-w-36",
                            category.category_text_color,
                          )}
                        >
                          {category.category_title}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us — ប្រើ container style ដដែល (bg-gray-950 rounded-2xl border) */}
            <div className="bg-gray-950 border rounded-2xl p-8 sm:p-10 flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 ease-in-out fill-mode-both">
              <p className="text-2xl font-medium text-white text-center">
                Why Choose Nexus E-Com?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {featureData.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <feature.icon
                      className="size-7 text-white"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm sm:text-base font-semibold text-white">
                      {feature.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {feature.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;