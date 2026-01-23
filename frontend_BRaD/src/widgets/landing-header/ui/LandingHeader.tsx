import { Link } from "react-router-dom";
import "../../../pages/landing/ui/landing.css";

export const LandingHeader = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          <img src="/images/logo/logo.png" alt="BRaD Logo" className="logo-img" />
        </a>
        
        <div className="navbar-menu">
          <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>
            Features
          </a>
          <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("how-it-works"); }}>
            How It Works
          </a>
          <a href="#benefits" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("benefits"); }}>
            Benefits
          </a>
          <a href="#testimonials" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}>
            Testimonials
          </a>
        </div>
        
        <div className="navbar-actions">
          <Link to="/app/login" className="nav-btn nav-btn-ghost">Sign In</Link>
          <Link to="/app" className="nav-btn nav-btn-primary">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

