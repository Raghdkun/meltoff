import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Signature from "@/components/home/Signature";
import RitualStrip from "@/components/home/RitualStrip";
import HomeCta from "@/components/home/HomeCta";

export default function Home() {
  return (
    <>
      <Hero />
      <RitualStrip />
      <Philosophy />
      <Signature />
      <HomeCta />
    </>
  );
}
