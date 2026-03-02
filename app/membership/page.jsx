"use client";

import CommonHero from "../../components/CommonHero";
import MembershipBenefits from "../../components/MembershipBenifits";
import LuxuryRooms from "../../components/LuxuryRooms";
import AdditionalFeature from "../../components/AdditionalFeatures";
import SeasonsApartment from "../../components/SeasonsApartment";
import MembershipPriceList from "../../components/MembershipPriceList";

export default function MembershipPage() {
  return (
    <div className="w-full bg-black min-h-screen">
      {/* Hero Section */}
      <CommonHero title="Membership"  imageSrc="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>

      {/* Main Content Section */}
      <MembershipBenefits />

      <LuxuryRooms />

      <AdditionalFeature />

      <SeasonsApartment />

      <MembershipPriceList />
    </div>
  );
}
