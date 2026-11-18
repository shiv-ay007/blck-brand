import HeroSection from '../components/home/HeroSection.jsx';
import MarqueeSection from '../components/home/MarqueeSection.jsx';
import ProductCardsSection from '../components/common/ProductCardsSection.jsx';
import DropSection from '../components/home/DropSection.jsx';
import StorySection from '../components/home/StorySection.jsx';
import CommunitySection from '../components/home/CommunitySection.jsx';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <DropSection />
      <StorySection />
      <ProductCardsSection title="Latest drop · Night Market" viewAllLink="/collections" />
      <CommunitySection />
    </>
  );
}
