import StudioCategories from "@/component/studio-categories";
import StudioHero from "@/component/studioHero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <StudioHero/>
      <StudioCategories/>
    </div>
  );
}
