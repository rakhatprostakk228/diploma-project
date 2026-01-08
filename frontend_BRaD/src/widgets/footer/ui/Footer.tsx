import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span className={styles.logoText}>CareerMatch</span>
            </div>
            <p className={styles.footerDescription}>
              Connecting talented individuals with virtual internships and remote opportunities worldwide.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <h3>Product</h3>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#">Pricing</a>
            <a href="#testimonials">Success Stories</a>
          </div>

          <div className={styles.footerLinks}>
            <h3>Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Press Kit</a>
          </div>

          <div className={styles.footerLinks}>
            <h3>Resources</h3>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Guides</a>
            <a href="#">API Docs</a>
          </div>

          <div className={styles.footerLinks}>
            <h3>Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">GDPR</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 CareerMatch. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#">Status</a>
            <a href="#">Sitemap</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

