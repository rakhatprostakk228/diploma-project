import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@shared/ui';
import { createJobSchema, JobFormData, useJobStore } from '@entities/job';
import styles from './JobForm.module.css';

interface JobFormProps {
  onSuccess?: () => void;
  initialData?: Partial<JobFormData>;
}

export const JobForm = ({ onSuccess, initialData }: JobFormProps) => {
  const { createJob, updateJob, selectedJob, isLoading } = useJobStore();
  const isEdit = !!selectedJob;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: initialData || {
      title: '',
      company: '',
      type: 'Full-time',
      location: 'Remote',
      description: '',
      requirements: [],
      tags: [],
      status: 'active',
    },
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      if (isEdit && selectedJob) {
        await updateJob(selectedJob.id, data);
      } else {
        await createJob(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label="Job Title"
        {...register('title')}
        error={errors.title?.message}
      />
      <Input
        label="Company"
        {...register('company')}
        error={errors.company?.message}
      />
      <div className={styles.row}>
        <div className={styles.selectGroup}>
          <label className={styles.label}>Type</label>
          <select {...register('type')} className={styles.select}>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <Input
          label="Location"
          {...register('location')}
          error={errors.location?.message}
        />
      </div>
      <div className={styles.textareaGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          {...register('description')}
          className={styles.textarea}
          rows={5}
        />
        {errors.description && (
          <span className={styles.errorText}>{errors.description.message}</span>
        )}
      </div>
      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading}>
          {isEdit ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
};

