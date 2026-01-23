import { LandingHeader } from "@widgets/landing-header";
import { LandingHero } from "@widgets/landing-hero";
import { LandingFeatures } from "@widgets/landing-features";
import { LandingHowItWorks } from "@widgets/landing-how-it-works";
import { LandingBenefits } from "@widgets/landing-benefits";
import { LandingTestimonials } from "@widgets/landing-testimonials";
import { LandingFooter } from "@widgets/landing-footer";
import "./landing.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingBenefits />
        <LandingTestimonials />
      </main>
      <LandingFooter />
    </div>
  );
};

