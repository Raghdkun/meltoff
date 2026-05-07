import StoryIntro from "@/components/about/StoryIntro";
import StoryMountain from "@/components/about/StoryMountain";
import StoryTradition from "@/components/about/StoryTradition";
import StoryMap from "@/components/about/StoryMap";
import StoryMeaning from "@/components/about/StoryMeaning";
import StoryBombilla from "@/components/about/StoryBombilla";
import StoryClose from "@/components/about/StoryClose";

export const metadata = {
  title: "Our Story — Meltoff",
  description:
    "From the mountains of Sweida to every place. The story behind Meltoff.",
};

export default function AboutPage() {
  return (
    <>
      <StoryIntro />
      <StoryMountain />
      <StoryTradition />
      <StoryMap />
      <StoryMeaning />
      <StoryBombilla />
      <StoryClose />
    </>
  );
}
