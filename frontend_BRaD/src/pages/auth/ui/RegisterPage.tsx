import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button, Input } from '@shared/ui';
import { useUserStore } from '@entities/user';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['candidate', 'employer']),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { register: registerUser } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'candidate',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await registerUser(data.email, data.password, data.name, data.role);
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/app" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <span className="font-heading text-2xl font-extrabold text-gradient">BRaD</span>
          <span className="font-heading text-2xl font-extrabold text-primary">.</span>
        </Link>

        <div className="bg-card rounded-2xl shadow-xl p-8 relative">
          <Link
            to="/app"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </Link>
          <h2 className="font-heading text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-muted-foreground mb-6">Join BRaD. and start your journey</p>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                id="name"
                {...register('name')}
                placeholder="John Doe"
                className="h-12"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="h-12"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="h-12"
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                I am a
              </label>
              <select
                id="role"
                {...register('role')}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="candidate">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/app/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

