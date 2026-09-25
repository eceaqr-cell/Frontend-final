import { Wishlist1 } from "@/components/wishlist1";
import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import BrandList from "@/components/shadcn-space/blocks/hero-01/brand-slider";
import ProductListing from "@/components/shadcn-space/blocks/product-listing-01";
import Services from "@/components/shadcn-space/blocks/services-01/services";
import Categories from "@/components/shadcn-space/blocks/services-01/services";

const avatarList = [
  { image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { image: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const brandList = [
  { image: "https://i.pinimg.com/236x/dc/3b/27/dc3b278710dfb77eb029c2d454687e8d.jpg", lightimg: "https://i.pinimg.com/236x/dc/3b/27/dc3b278710dfb77eb029c2d454687e8d.jpg", name: "Brand 1" },
  { image: "https://i.pinimg.com/1200x/79/13/71/791371a21bc6ea299dd752729a4c4d16.jpg", lightimg: "https://i.pinimg.com/1200x/79/13/71/791371a21bc6ea299dd752729a4c4d16.jpg", name: "Brand 2" },
  { image: "https://i.pinimg.com/236x/6b/27/08/6b270821368f72f563bff5bb7c8ef3c3.jpg", lightimg: "https://i.pinimg.com/236x/6b/27/08/6b270821368f72f563bff5bb7c8ef3c3.jpg", name: "Brand 3" },
  { image: "https://i.pinimg.com/1200x/73/48/39/734839b97866d330172094995abc9107.jpg", lightimg: "https://i.pinimg.com/1200x/73/48/39/734839b97866d330172094995abc9107.jpg", name: "Brand 4" },
  { image: "https://i.pinimg.com/1200x/a9/6d/34/a96d34850a74ac78e9b212ec76796180.jpg", lightimg: "https://i.pinimg.com/1200x/a9/6d/34/a96d34850a74ac78e9b212ec76796180.jpg", name: "Brand 5" },
  { image: "https://i.pinimg.com/1200x/2b/a1/4a/2ba14a9cc9390461665c29b55c692090.jpg", lightimg: "https://i.pinimg.com/1200x/2b/a1/4a/2ba14a9cc9390461665c29b55c692090.jpg", name: "Brand 6" },
];

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection avatarList={avatarList} />
      <BrandList brandList={brandList} />
      <ProductListing/>
      <Services/>
      
    </div>
  );
}