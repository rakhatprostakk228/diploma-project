import "../../../pages/landing/ui/landing.css";

export const LandingHowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="bg-decoration-center"></div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to find your perfect match</p>
        </div>

        <div className="steps-grid">
          <div className="connection-line"></div>

          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <path d="M20 8v6M23 11h-6"/>
                </svg>
              </div>
              <h3 className="step-title">Create Your Profile</h3>
              <p className="step-description">Sign up and tell us about your skills, interests, and career goals. For employers, describe your ideal candidate.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="step-title">Get Matched</h3>
              <p className="step-description">Our AI-powered algorithm analyzes your profile and finds the perfect matches based on compatibility and goals.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-content">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 18a5 5 0 1 0-10 0"/>
                  <path d="M12 2v10"/>
                  <path d="M12 12L9 9m3 3 3-3"/>
                </svg>
              </div>
              <h3 className="step-title">Start Collaborating</h3>
              <p className="step-description">Connect with your matches, start virtual internships, and build meaningful professional relationships.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
