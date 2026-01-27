import { useJobStore } from '@entities/job';
import { JobCard } from '@widgets/job-card';

export const JobsList = () => {
  const { filteredJobs, isLoading } = useJobStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div style={{ color: 'rgba(51, 58, 47, 0.7)' }}>Loading jobs...</div>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>No jobs found</h3>
        <p style={{ color: 'rgba(51, 58, 47, 0.7)' }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

