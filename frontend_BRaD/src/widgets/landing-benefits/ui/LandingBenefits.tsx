import "../../../pages/landing/ui/landing.css";

export const LandingBenefits = () => {
  return (
    <section className="benefits" id="benefits">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Benefits for Everyone</h2>
          <p className="section-subtitle">Whether you're looking to start your career or find top talent, we've got you covered</p>
        </div>

        {/* For Candidates */}
        <div className="benefit-row">
          <div className="benefit-content">
            <div className="benefit-badge">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span>For Students & Junior Specialists</span>
            </div>
            
            <h3 className="benefit-title">Launch Your Career with Confidence</h3>
            
            <div className="benefit-list">
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Gain real-world experience through virtual internships</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Access exclusive opportunities from verified companies</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Build your professional network from day one</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Develop in-demand skills with mentorship</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Get matched based on your unique strengths</span>
              </div>
            </div>
          </div>

          <div className="benefit-image">
            <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80" alt="Student working on laptop" />
            <div className="image-decoration"></div>
          </div>
        </div>

        {/* For Employers */}
        <div className="benefit-row reverse">
          <div className="benefit-image">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" alt="Business team meeting" />
            <div className="image-decoration left"></div>
          </div>

          <div className="benefit-content">
            <div className="benefit-badge">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
              <span>For Employers</span>
            </div>
            
            <h3 className="benefit-title">Find Your Next Great Hire</h3>
            
            <div className="benefit-list">
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Access pre-vetted, skilled junior talent</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Reduce hiring time with smart matching</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Try before you hire with virtual internships</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Build a diverse and inclusive team</span>
              </div>
              <div className="benefit-item">
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                <span>Scale your workforce flexibly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
