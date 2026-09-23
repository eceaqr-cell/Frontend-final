import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import type { NavigationSection } from "@/components/shadcn-space/blocks/hero-01/header";
import Header from "@/components/shadcn-space/blocks/hero-01/header";
import BrandSlider, { BrandList } from "@/components/shadcn-space/blocks/hero-01/brand-slider";
import type { AvatarList } from "@/components/shadcn-space/blocks/hero-01/hero";
import Link from "next/link";

export default function Navbar() {
  const avatarList: AvatarList[] = [
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
    },
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    },
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
    },
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
    },
  ];

  const navigationData: NavigationSection[] = [
    {
      title: "Home",
      href: "#",
      isActive: true,
    },
    {
      title: "About us",
      href: "#",
    },
    {
      title: "Services",
      href: "/",
    },    
    {
      title: "Team",
      href: "/",
    },
    {
      title: "Pricing",
      href: "/",
    },
    {
      title: "Awards",
      href: "/",
    },
  ];

  const brandList: BrandList[] = [
    {
      image: "https://i.pinimg.com/236x/dc/3b/27/dc3b278710dfb77eb029c2d454687e8d.jpg",
      lightimg: "https://i.pinimg.com/236x/dc/3b/27/dc3b278710dfb77eb029c2d454687e8d.jpg",
      name: "Brand 1",
    },
    {
      image: "https://i.pinimg.com/1200x/79/13/71/791371a21bc6ea299dd752729a4c4d16.jpg",
      lightimg: "https://i.pinimg.com/1200x/79/13/71/791371a21bc6ea299dd752729a4c4d16.jpg",
      name: "Brand 2",
    },
    {
      image: "https://i.pinimg.com/236x/6b/27/08/6b270821368f72f563bff5bb7c8ef3c3.jpg",
      lightimg: "https://i.pinimg.com/236x/6b/27/08/6b270821368f72f563bff5bb7c8ef3c3.jpg",
      name: "Brand 3",
    },
    {
      image: "https://i.pinimg.com/1200x/73/48/39/734839b97866d330172094995abc9107.jpg",
      lightimg: "https://i.pinimg.com/1200x/73/48/39/734839b97866d330172094995abc9107.jpg",
      name: "Brand 4",
    },
    {
      image: "https://i.pinimg.com/1200x/a9/6d/34/a96d34850a74ac78e9b212ec76796180.jpg",
      lightimg: "https://i.pinimg.com/736x/cf/9c/18/cf9c18d97b5b7bb116cc99e1c93afcff.jpg",
      name: "Brand 5",
    },
     {
      image: "https://i.pinimg.com/1200x/2b/a1/4a/2ba14a9cc9390461665c29b55c692090.jpg",
      lightimg: "https://i.pinimg.com/1200x/2b/a1/4a/2ba14a9cc9390461665c29b55c692090.jpg",
      name: "Brand 5",
    },
  ];

  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}
