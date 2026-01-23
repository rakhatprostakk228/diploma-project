import { Link } from "react-router-dom";
import "../../../pages/landing/ui/landing.css";

export const LandingTestimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Thousands</h2>
          <p className="section-subtitle">See what our community has to say about their experience</p>
        </div>

        {/* Testimonial Cards */}
        <div className="testimonials-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <svg className="quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            
            <div className="rating">
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <p className="testimonial-quote">
              "This platform changed my career trajectory. I landed a virtual internship that turned into a full-time position within 3 months."
            </p>
            
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" alt="Sarah Chen" />
              <div>
                <div className="author-name">Sarah Chen</div>
                <div className="author-role">UX Design Intern at TechCorp</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card">
            <svg className="quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            
            <div className="rating">
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <p className="testimonial-quote">
              "We've hired 5 amazing junior developers through this platform. The matching algorithm really understands what we need."
            </p>
            
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Michael Rodriguez" />
              <div>
                <div className="author-name">Michael Rodriguez</div>
                <div className="author-role">HR Director at InnovateLabs</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <svg className="quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            
            <div className="rating">
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg className="star" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <p className="testimonial-quote">
              "As a student, I was nervous about finding the right opportunity. The virtual internship format was perfect for my schedule."
            </p>
            
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" alt="Emma Thompson" />
              <div>
                <div className="author-name">Emma Thompson</div>
                <div className="author-role">Marketing Intern at GrowthHub</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="metrics-card">
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">10,000+</div>
              <div className="metric-label">Active Students</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">500+</div>
              <div className="metric-label">Partner Companies</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">94%</div>
              <div className="metric-label">Match Success Rate</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">2,500+</div>
              <div className="metric-label">Placements This Year</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="final-cta">
          <h3 className="cta-title">Ready to Find Your Perfect Match?</h3>
          <p className="cta-subtitle">Join thousands of students and employers who have found success through our platform</p>
          <div className="cta-buttons">
            <Link to="/app" className="btn btn-primary">Get Started Now</Link>
            <button className="btn btn-secondary">Schedule a Demo</button>
          </div>
        </div>
      </div>
    </section>
  );
};
