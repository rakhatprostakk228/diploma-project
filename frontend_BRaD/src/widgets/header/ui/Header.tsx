import { Link } from 'react-router-dom';
import { Button } from '@shared/ui';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <span className={styles.logoText}>CareerMatch</span>
          </Link>

          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#opportunities">Opportunities</a>
            <a href="#testimonials">Testimonials</a>
          </div>

          <div className={styles.navButtons}>
            <Button variant="ghost">Sign In</Button>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

