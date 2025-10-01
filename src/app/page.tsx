import HeroSection from "@/components/sections/HeroSection/HeroSection";
// TrustSection ausgeblendet
// import TrustSection from "@/components/sections/TrustSection/TrustSection";
import ServiceSection from "@/components/sections/ServiceSection/ServiceSection";
import BenefitSection from "@/components/sections/BenefitSection/BenefitSection";
import ProcessSection from "@/components/sections/ProcessSection/ProcessSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection/ExpertiseSection";
import FeatureSection from "@/components/sections/FeatureSection/FeatureSection";
import ApproachSection from "@/components/sections/ApproachSection/ApproachSection";
import CTASection from "@/components/sections/CTASection/CTASection";
import TestimonialSection from "@/components/sections/TestimonialSection/TestimonialSection";
import PricingSection from "@/components/sections/PricingSection/PricingSection";
import FAQSection from "@/components/sections/FAQSection/FAQSection";
import BannerSection from "@/components/sections/BannerSection/BannerSection";
// ToolsSection ausgeblendet
// import ToolsSection from '@/components/sections/ToolsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <HeroSection />
      {/* TrustSection ausgeblendet */}
      <ProcessSection />
      <ServiceSection />
      <BenefitSection />
      {/* ToolsSection ausgeblendet */}

      <div className="py-16 bg-white rounded-[32px] mx-4 my-8 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <ExpertiseSection />
      </div>

      <div className="py-16 bg-gradient-to-br from-[#07222b] to-[#1b3a4b] rounded-[32px] mx-4 my-8 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
        <FeatureSection />
      </div>

      <div className="py-16 bg-white rounded-[32px] mx-4 my-8 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <ApproachSection />
      </div>
      <CTASection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <BannerSection />
    </main>
  );
}
