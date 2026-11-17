import HeroSection from "./components/sections/home/HeroSection";
import ImpactSection from "./components/sections/home/ImpactSection";
import { HomeCapabilities, HomeContact, HomeWork } from "./components/sections/home/HomeEditorial";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <HomeCapabilities />
      <HomeWork />
      <HomeContact />
    </>
  );
}
