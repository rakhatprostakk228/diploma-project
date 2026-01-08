import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'moderator', 'user']),
  status: z.enum(['active', 'blocked', 'inactive']),
  avatar: z.string().optional(),
  applicationsCount: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true, applicationsCount: true });
export const updateUserSchema = createUserSchema.partial();

export type UserFormData = z.infer<typeof createUserSchema>;

