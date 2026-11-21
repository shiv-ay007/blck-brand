import HeroSection from '../components/home/HeroSection.jsx';
import HeroBridgeSection from '../components/home/HeroBridgeSection.jsx';
import ProductCardsSection from '../components/common/ProductCardsSection.jsx';
import DropSection from '../components/home/DropSection.jsx';
import CommunitySection from '../components/home/CommunitySection.jsx';
import AboutPreviewSection from '../components/home/AboutPreviewSection.jsx';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroBridgeSection />
      <AboutPreviewSection />
      <DropSection />
      <ProductCardsSection title="Latest drop · Night Market" viewAllLink="/collections" />
      <CommunitySection />
    </>
  );
}
