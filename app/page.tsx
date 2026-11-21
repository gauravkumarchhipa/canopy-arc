import type { Metadata } from "next";
import { HomeChapters, HomeEpilogue } from "./components/sections/home/StoryContent";
import StoryExperience from "./components/sections/home/StoryExperience";
import "./home-story.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://canopy-arc.vercel.app"),
  title: "Canopy Arc — Extraordinary Starts Here",
  description:
    "Follow an idea from its first spark to a secure digital ecosystem. Canopy Arc designs and engineers web, mobile, cloud, and AI solutions.",
  openGraph: {
    title: "Canopy Arc — Extraordinary Starts Here",
    description: "From the first spark to a secure, connected digital ecosystem.",
    type: "website",
    images: [{ url: "/story/ribbon-preview.webp", width: 1200, height: 630, alt: "Canopy Arc’s architectural ribbon" }],
  },
};

export default function Home() {
  return (
    <div className="story-home">
      <StoryExperience>
        <HomeChapters />
      </StoryExperience>
      <HomeEpilogue />
    </div>
  );
}
