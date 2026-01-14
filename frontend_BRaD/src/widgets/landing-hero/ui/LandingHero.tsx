import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, Zap } from "lucide-react";
import { Button } from "@shared/ui";

export const LandingHero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: "1s" }} 
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Your Career Journey Starts Here</span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Connect with
            <span className="text-gradient"> Virtual Internships </span>
            & Dream Jobs
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            BRaD. matches talented individuals with companies offering remote internships and job opportunities worldwide. Start building your future today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/app">
              <Button variant="hero" size="xl">
                Find Opportunities
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              For Companies
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="font-heading text-3xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <p className="font-heading text-3xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">Companies</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="font-heading text-3xl font-bold text-foreground">95%</p>
              <p className="text-sm text-muted-foreground">Match Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

