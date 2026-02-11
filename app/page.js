import ActivitiesSlider from "@/components/ActivitiesSlider";
import ExclusiveItinerary from "@/components/ExclusiveItinerary";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HotDestination from "@/components/HotDestination";
import LuxuryHeroSection from "@/components/LuxuryHero";
import PlanTrip from "@/components/PlanTrip";
import PopularDestinations from "@/components/PopularDestination";
import Testimonials from "@/components/Testimonials";
import TravelAssociates from "@/components/TravelAssociates";
import TravelFeatures from "@/components/TravelFeatures";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ActivitiesSlider />
      <LuxuryHeroSection />
      <TravelAssociates />
      <HotDestination />
      <PlanTrip />
      <TravelFeatures />
      <PopularDestinations />
      <ExclusiveItinerary />
      <Testimonials />
      <Footer />
    </main>
  );
}
