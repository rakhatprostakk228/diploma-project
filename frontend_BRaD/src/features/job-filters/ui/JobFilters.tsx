import { useJobStore, JobType } from '@entities/job';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@shared/ui';

const jobTypes: (JobType | 'All')[] = ['All', 'Internship', 'Full-time', 'Part-time', 'Contract'];

export const JobFilters = () => {
  const { filters, setFilters } = useJobStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-4" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" style={{ color: '#333A2F' }} />
        <h3 className="font-heading text-xl font-bold" style={{ color: '#333A2F' }}>Filters</h3>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(51, 58, 47, 0.6)' }} />
        <Input
          placeholder="Search jobs, companies, skills..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="pl-10 h-12"
          style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }}
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(51, 58, 47, 0.6)' }} />
        <Input
          placeholder="Location (e.g., Remote, San Francisco)"
          value={filters.location || ''}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="pl-10 h-12"
          style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Job Type</label>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilters({ ...filters, type: type === 'All' ? undefined : type })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (filters.type === type || (!filters.type && type === 'All'))
                  ? ''
                  : ''
              }`}
              style={(filters.type === type || (!filters.type && type === 'All'))
                ? { backgroundColor: '#333A2F', color: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }
                : { backgroundColor: '#EBEDDF', color: '#333A2F' }
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

