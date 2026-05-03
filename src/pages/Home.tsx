import HeroSection from '../sections/HeroSection';
import IntroSection from '../sections/IntroSection';
import FeaturedInsightSection from '../sections/FeaturedInsightSection';
import SolutionsGridSection from '../sections/SolutionsGridSection';
import ServiceSpotlightSection from '../sections/ServiceSpotlightSection';
import ClientEcosystemSection from '../sections/ClientEcosystemSection';
import FinalCTASection from '../sections/FinalCTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <FeaturedInsightSection />
      <SolutionsGridSection />
      <ServiceSpotlightSection />
      <ClientEcosystemSection />
      <FinalCTASection />
    </main>
  );
}
