import FeatureSection from "@/component/featured";
import StudioCategories from "@/component/studio-categories";
import StudioHero from "@/component/studioHero";


export default function Home() {
  return (
    <div>
      <StudioHero/>
      <StudioCategories/>
      <FeatureSection/>
    </div>
  );
}
