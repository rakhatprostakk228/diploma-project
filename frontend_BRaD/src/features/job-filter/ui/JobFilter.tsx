import { JobType } from '@shared/types';
import { useJobStore } from '@entities/job';
import styles from './JobFilter.module.css';

const filterTypes: (JobType | 'All')[] = ['All', 'Internship', 'Full-time', 'Part-time'];

export const JobFilter = () => {
  const { filters, setFilters, fetchJobs } = useJobStore();

  const handleFilter = (type: JobType | 'All') => {
    const newFilters = {
      ...filters,
      type: type === 'All' ? undefined : type,
    };
    setFilters(newFilters);
    fetchJobs(newFilters);
  };

  return (
    <div className={styles.filterButtons}>
      {filterTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleFilter(type)}
          className={`${styles.filterBtn} ${
            (filters.type === type || (!filters.type && type === 'All')) ? styles.active : ''
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

