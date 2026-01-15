import { AppHeader } from '@widgets/app-header';
import { Button, Input, Textarea } from '@shared/ui';
import { useUserStore } from '@entities/user';
import { useJobStore } from '@entities/job';
import { Briefcase, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const EmployerPage = () => {
  const { currentUser, getUser } = useUserStore();
  const { jobs, setSelectedJob } = useJobStore();
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
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">This page is for employers only</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">Employer Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your job postings and applications</p>
          </div>
          <Button onClick={() => setShowJobForm(true)} variant="hero" className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {showJobForm && (
          <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 mb-6">
            <h2 className="font-heading text-2xl font-bold mb-6">
              {editingJob ? 'Edit Job' : 'Create New Job'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input {...register('title')} className="h-12" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input {...register('company')} className="h-12" required />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    {...register('type')}
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input {...register('location')} className="h-12" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Salary</label>
                  <Input {...register('salary')} className="h-12" placeholder="$50k - $80k" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea {...register('description')} rows={6} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Requirements (one per line)
                </label>
                <Textarea {...register('requirements')} rows={4} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <Input {...register('tags')} className="h-12" placeholder="React, TypeScript, Remote" />
              </div>
              <div className="flex gap-4">
                <Button type="submit" variant="hero" size="lg">
                  {editingJob ? 'Update Job' : 'Post Job'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setShowJobForm(false);
                    setEditingJob(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-bold">Your Job Postings</h2>
          {employerJobs.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-card p-12 text-center">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">No jobs posted yet</h3>
              <p className="text-muted-foreground mb-4">Start by posting your first job</p>
              <Button onClick={() => setShowJobForm(true)} variant="hero">
                Post Your First Job
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {employerJobs.map((job) => (
                <div key={job.id} className="bg-card rounded-2xl shadow-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{job.type}</span>
                        <span>{job.location}</span>
                        <span>{job.applicationsCount} applications</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingJob(job.id);
                          setShowJobForm(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

