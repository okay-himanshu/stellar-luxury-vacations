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
      <CommonHero title="Membership" />

      {/* Main Content Section */}
      <MembershipBenefits />

      <LuxuryRooms />

      <AdditionalFeature />

      <SeasonsApartment />

      <MembershipPriceList />
    </div>
  );
}
