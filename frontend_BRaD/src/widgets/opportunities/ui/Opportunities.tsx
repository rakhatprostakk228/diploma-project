import { useEffect } from 'react';
import { useJobStore } from '@entities/job';
import { JobFilter } from '@features/job-filter';
import { JobCard } from './JobCard';
import styles from './Opportunities.module.css';

export const Opportunities = () => {
  const { jobs, fetchJobs, isLoading } = useJobStore();

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="opportunities" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Browse Opportunities</div>
          <h2 className={styles.sectionTitle}>Latest Opportunities</h2>
          <p className={styles.sectionDescription}>
            Discover virtual internships and remote jobs from top companies worldwide
          </p>
        </div>

        <JobFilter />

        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : jobs.length === 0 ? (
          <div className={styles.loading}>No opportunities found</div>
        ) : (
          <div className={styles.opportunitiesGrid}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <div className={styles.textCenter}>
          <button className={styles.btnOutline}>View All Opportunities</button>
        </div>
      </div>
    </section>
  );
};

