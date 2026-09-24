import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shadcn-space/blocks/footer-01/footer";
import Header from "@/components/shadcn-space/blocks/hero-01/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus E-Com",
  description: "Your trusted online shop for quality products",
};

const navigationData = [
  { title: "Home", href: "/", isActive: true },
  { title: "Products", href: "/products" },
  { title: "About us", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header navigationData={navigationData} />
        {children}
        <Footer />
      </body>
    </html>
  );
}