import { JobSearchForm } from '@features/job-search';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              Over 10,000+ opportunities available
            </div>

            <h1 className={styles.heroTitle}>
              Launch Your Career with <span className={styles.textPrimary}>Virtual Internships</span>
            </h1>
            <p className={styles.heroDescription}>
              Connect with top companies worldwide. Find remote internships and jobs that match your skills, schedule, and career goals.
            </p>

            <JobSearchForm />

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>50K+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>2,500+</div>
                <div className={styles.statLabel}>Companies</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Success Rate</div>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.heroImageBg}></div>
            <img 
              src="https://images.unsplash.com/photo-1617035969674-85423701b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwbGFwdG9wfGVufDF8fHx8MTc2NDc3NTU4MXww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Remote work professional"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

