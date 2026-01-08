import { z } from 'zod';

export const jobSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  companyLogo: z.string().optional(),
  type: z.enum(['Internship', 'Full-time', 'Part-time']),
  location: z.string().min(1, 'Location is required'),
  duration: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  requirements: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.enum(['active', 'pending', 'archived']),
  applicationsCount: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createJobSchema = jobSchema.omit({ id: true, createdAt: true, updatedAt: true, applicationsCount: true });
export const updateJobSchema = createJobSchema.partial();

export type JobFormData = z.infer<typeof createJobSchema>;

