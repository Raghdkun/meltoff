import MenuHero from "@/components/menu/MenuHero";
import DrinkShowcase from "@/components/menu/DrinkShowcase";
import ParathaSection from "@/components/menu/ParathaSection";
import BestCombo from "@/components/menu/BestCombo";

export const metadata = {
  title: "Menu — Meltoff",
  description:
    "Mate Latte, Karak, SBA3 Milk, Iced Latte, Coconut Ice Latte. The Meltoff drink menu.",
};

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <DrinkShowcase />
      <ParathaSection />
      <BestCombo />
    </>
  );
}
