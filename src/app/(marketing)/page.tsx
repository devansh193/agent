import { Faq } from "@/modules/landing/ui/components/landing/faq";

import { Advert } from "@/modules/landing/ui/components/landing/advert";
import HeroSection from "@/modules/landing/ui/components/landing/hero-section";
import HowItWorks from "@/modules/landing/ui/components/landing/how-it-works";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Advert />
      <HowItWorks />
      <Faq />
    </div>
  );
}
