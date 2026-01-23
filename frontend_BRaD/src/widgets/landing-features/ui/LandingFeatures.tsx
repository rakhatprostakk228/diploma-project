import "../../../pages/landing/ui/landing.css";

export const LandingFeatures = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-subtitle">Powerful features designed to connect talent with opportunity seamlessly</p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
            </div>
            <h3 className="feature-title">Smart Matching</h3>
            <p className="feature-description">AI-powered algorithm that matches candidates with opportunities based on skills, interests, and company culture.</p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <h3 className="feature-title">Virtual Internships</h3>
            <p className="feature-description">Remote internship opportunities that let you gain real experience from anywhere in the world.</p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
              </svg>
            </div>
            <h3 className="feature-title">Skill-Based Hiring</h3>
            <p className="feature-description">Focus on what you can do, not just your credentials. Showcase your skills through real projects.</p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="feature-title">Diverse Talent Pool</h3>
            <p className="feature-description">Access to thousands of pre-vetted students and junior specialists across various fields.</p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 className="feature-title">Quick Onboarding</h3>
            <p className="feature-description">Get started in minutes with our streamlined application and matching process.</p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="feature-title">Verified Companies</h3>
            <p className="feature-description">All employers are verified to ensure safe and legitimate opportunities for candidates.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
