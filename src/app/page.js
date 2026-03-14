import HeroSlideshow from '@/components/home/HeroSlideshow';
import CategorySlider from '@/components/home/CategorySlider';
import EditorialSection from '@/components/home/EditorialSection';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import ProductGrid from '@/components/product/ProductGrid';
import InfoBar from '@/components/home/InfoBar';
import { getNewArrivals } from '@/data/products';

export default function HomePage() {
  const newArrivals = getNewArrivals();

  return (
    <div className="pageEnter">
      <HeroSlideshow />
      <CategorySlider />
      <EditorialSection />
      <FeaturedProduct />
      <ProductGrid products={newArrivals} columns={4} title="NEW ARRIVALS" />
      <InfoBar />
    </div>
  );
}
