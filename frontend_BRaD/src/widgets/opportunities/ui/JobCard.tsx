import { Job } from '@entities/job';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className={styles.opportunityCard}>
      <div className={styles.opportunityHeader}>
        <div className={styles.opportunityCompany}>
          <span className={styles.companyLogo}>💼</span>
          <div>
            <h3 className={styles.opportunityTitle}>{job.title}</h3>
            <p className={styles.companyName}>{job.company}</p>
          </div>
        </div>
        <button className={styles.bookmarkBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      <div className={styles.opportunityDetails}>
        <div className={styles.detailItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{job.location}</span>
        </div>
        {job.duration && (
          <div className={styles.detailItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{job.duration}</span>
          </div>
        )}
        {job.salary && (
          <div className={styles.detailItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>{job.salary}</span>
          </div>
        )}
      </div>
      <div className={styles.opportunityTags}>
        {job.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.opportunityFooter}>
        <span className={styles.postedDate}>
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
        <button className={styles.btnLink}>View Details</button>
      </div>
    </div>
  );
};

