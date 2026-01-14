import { LandingHeader } from "@widgets/landing-header";
import { LandingHero } from "@widgets/landing-hero";
import { LandingAbout } from "@widgets/landing-about";
import { LandingContact } from "@widgets/landing-contact";
import { LandingFooter } from "@widgets/landing-footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingAbout />
        <LandingContact />
      </main>
      <LandingFooter />
    </div>
  );
};

