import { AppHeader } from '@widgets/app-header';
import { Button, Input, Textarea } from '@shared/ui';
import { useUserStore } from '@entities/user';
import { useJobStore } from '@entities/job';
import { Briefcase, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const EmployerPage = () => {
  const { currentUser, getUser } = useUserStore();
  const { jobs } = useJobStore();
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<string | null>(null);

  const user = currentUser ? getUser(currentUser.id) : null;
  const employerJobs = jobs.filter((job) => job.employerId === currentUser?.id);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      company: user?.company || '',
      type: 'Full-time' as const,
      location: 'Remote',
      salary: '',
      description: '',
      requirements: '',
      tags: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Create/Update job:', data);
    reset();
    setShowJobForm(false);
    setEditingJob(null);
  };

  if (!currentUser || currentUser.role !== 'employer') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF', paddingTop: '4rem' }}>
        <AppHeader />
        <main className="container mx-auto px-6 py-12" style={{ maxWidth: '1280px' }}>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: '#333A2F' }}>Access Denied</h1>
            <p style={{ color: 'rgba(51, 58, 47, 0.7)' }}>This page is for employers only</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF' }}>
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ maxWidth: '1280px' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#333A2F' }}>Employer Dashboard</h1>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>Manage your job postings and applications</p>
          </div>
          <Button 
            onClick={() => setShowJobForm(true)} 
            variant="hero" 
            className="w-full sm:w-auto"
            style={{ backgroundColor: '#333A2F', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {showJobForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: '#333A2F' }}>
              {editingJob ? 'Edit Job' : 'Create New Job'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Job Title</label>
                  <Input {...register('title')} className="h-12" required style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Company</label>
                  <Input {...register('company')} className="h-12" required style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Type</label>
                  <select
                    {...register('type')}
                    className="flex h-12 w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: 'rgba(51, 58, 47, 0.2)', backgroundColor: 'white', color: '#333A2F' }}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Location</label>
                  <Input {...register('location')} className="h-12" required style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Salary</label>
                  <Input {...register('salary')} className="h-12" placeholder="$50k - $80k" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Description</label>
                <Textarea {...register('description')} rows={6} required style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>
                  Requirements (one per line)
                </label>
                <Textarea {...register('requirements')} rows={4} required style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Tags (comma separated)</label>
                <Input {...register('tags')} className="h-12" placeholder="React, TypeScript, Remote" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
              </div>
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg"
                  style={{ backgroundColor: '#333A2F', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  {editingJob ? 'Update Job' : 'Post Job'}
                </Button>
                <button
                  type="button"
                  className="px-8 py-3 rounded-xl text-base font-semibold border-2 transition-all duration-200"
                  onClick={() => {
                    setShowJobForm(false);
                    setEditingJob(null);
                    reset();
                  }}
                  style={{ 
                    borderColor: 'rgba(51, 58, 47, 0.2)', 
                    color: '#333A2F',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333A2F';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = '#333A2F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#333A2F';
                    e.currentTarget.style.borderColor = 'rgba(51, 58, 47, 0.2)';
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-bold" style={{ color: '#333A2F' }}>Your Job Postings</h2>
          {employerJobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <Briefcase className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(51, 58, 47, 0.7)' }} />
              <h3 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>No jobs posted yet</h3>
              <p className="mb-4" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>Start by posting your first job</p>
              <Button 
                onClick={() => setShowJobForm(true)} 
                variant="hero"
                style={{ backgroundColor: '#333A2F', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              >
                Post Your First Job
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {employerJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-lg p-6" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>{job.title}</h3>
                      <p className="mb-2" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>{job.company}</p>
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
                        <span>{job.type}</span>
                        <span>{job.location}</span>
                        <span>{job.applicationsCount} applications</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded-lg border-2 transition-all duration-200"
                        onClick={() => {
                          setEditingJob(job.id);
                          setShowJobForm(true);
                        }}
                        style={{ 
                          borderColor: 'rgba(51, 58, 47, 0.2)', 
                          color: '#333A2F',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#333A2F';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#333A2F';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#333A2F';
                          e.currentTarget.style.borderColor = 'rgba(51, 58, 47, 0.2)';
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg border-2 transition-all duration-200"
                        style={{ 
                          borderColor: 'rgba(51, 58, 47, 0.2)', 
                          color: '#333A2F',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#dc2626';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#333A2F';
                          e.currentTarget.style.borderColor = 'rgba(51, 58, 47, 0.2)';
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

