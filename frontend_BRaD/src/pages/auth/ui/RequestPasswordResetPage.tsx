import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { X, Mail } from 'lucide-react';
import { Button, Input } from '@shared/ui';
import { useUserStore } from '@entities/user';

const requestPasswordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type RequestPasswordResetFormData = z.infer<typeof requestPasswordResetSchema>;

export const RequestPasswordResetPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const { requestPasswordReset } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestPasswordResetFormData>({
    resolver: zodResolver(requestPasswordResetSchema),
  });

  const onSubmit = async (data: RequestPasswordResetFormData) => {
    try {
      setError(null);
      await requestPasswordReset(data.email);
      setEmail(data.email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request password reset');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#EBEDDF' }}>
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" style={{ color: '#333A2F' }} />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: '#333A2F' }}>
              Check Your Email
            </h2>
            <p className="mb-6" style={{ color: 'rgba(51, 58, 47, 0.6)' }}>
              We've sent a password reset code to <strong>{email}</strong>
            </p>
            <Button 
              onClick={() => navigate(`/app/reset-password?email=${encodeURIComponent(email)}`)}
              variant="hero" 
              size="lg" 
              className="w-full" 
              style={{ 
                backgroundColor: '#333A2F', 
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              Enter Reset Code
            </Button>
            <div className="mt-4">
              <Link 
                to="/app/login" 
                className="text-sm hover:underline font-medium" 
                style={{ color: '#333A2F' }}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#EBEDDF' }}>
      <div className="w-full max-w-md">
        <Link to="/app" className="inline-flex items-center gap-3 mb-0 transition-colors">
          <img 
            src="/images/logo/logo.png" 
            alt="BRaD Logo" 
            className="h-24 w-auto object-contain"
          />
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 relative" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <Link
            to="/app/login"
            className="absolute top-4 right-4 transition-colors"
            style={{ color: 'rgba(51, 58, 47, 0.6)' }}
          >
            <X className="w-5 h-5" />
          </Link>
          <h2 className="font-heading text-3xl font-bold mb-2" style={{ color: '#333A2F' }}>Reset Password</h2>
          <p className="mb-6" style={{ color: 'rgba(51, 58, 47, 0.6)' }}>
            Enter your email address and we'll send you a code to reset your password.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="h-12"
                style={{ 
                  borderColor: 'rgba(51, 58, 47, 0.2)',
                  borderRadius: '0.75rem'
                }}
              />
              {errors.email && (
                <p className="text-sm mt-1" style={{ color: '#dc2626' }}>{errors.email.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full" 
              disabled={isSubmitting}
              style={{ 
                backgroundColor: '#333A2F', 
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'rgba(51, 58, 47, 0.6)' }}>
              Remember your password?{' '}
              <Link to="/app/login" className="hover:underline font-medium" style={{ color: '#333A2F' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
