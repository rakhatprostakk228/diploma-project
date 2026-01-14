import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@shared/ui";

export const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/80 backdrop-blur-lg shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-baseline gap-1 group">
          <span className="font-heading text-3xl font-extrabold text-gradient tracking-tight group-hover:scale-105 transition-transform duration-300">
            BRaD
          </span>
          <span className="font-heading text-3xl font-extrabold text-primary animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300">
            .
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Contact
          </button>
        </nav>
        <Link to="/app">
          <Button variant="hero" size="default">
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
};

