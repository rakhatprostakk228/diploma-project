import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '@shared/ui';
import { useJobStore } from '@entities/job';
import styles from './JobSearchForm.module.css';

const searchSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const JobSearchForm = () => {
  const { fetchJobs, filters, setFilters } = useJobStore();
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: '',
      location: '',
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const newFilters = {
      ...filters,
      search: data.keyword || data.location || undefined,
    };
    setFilters(newFilters);
    fetchJobs(newFilters);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputGroup}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <Input
          {...register('keyword')}
          placeholder="Job title or keyword"
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <Input
          {...register('location')}
          placeholder="Location (Remote)"
          className={styles.input}
        />
      </div>
      <Button type="submit" className={styles.searchButton}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        Search
      </Button>
    </form>
  );
};

