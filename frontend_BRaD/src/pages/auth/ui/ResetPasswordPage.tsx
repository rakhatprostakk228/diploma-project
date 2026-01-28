import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';
import { Button, Input } from '@shared/ui';
import { useUserStore } from '@entities/user';

const resetPasswordSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useUserStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setError(null);
      await resetPassword(email, data.code, data.newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate('/app/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#EBEDDF' }}>
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: '#333A2F' }}>
              Password Reset Successful!
            </h2>
            <p className="mb-6" style={{ color: 'rgba(51, 58, 47, 0.6)' }}>
              Your password has been reset. Redirecting to login...
            </p>
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
            Enter the code sent to <strong>{email}</strong> and your new password.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>
                Reset Code
              </label>
              <Input
                id="code"
                type="text"
                maxLength={6}
                {...register('code')}
                placeholder="000000"
                className="h-12 text-center text-2xl tracking-widest"
                style={{ 
                  borderColor: 'rgba(51, 58, 47, 0.2)',
                  borderRadius: '0.75rem'
                }}
              />
              {errors.code && (
                <p className="text-sm mt-1" style={{ color: '#dc2626' }}>{errors.code.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                {...register('newPassword')}
                placeholder="••••••••"
                className="h-12"
                style={{ 
                  borderColor: 'rgba(51, 58, 47, 0.2)',
                  borderRadius: '0.75rem'
                }}
              />
              {errors.newPassword && (
                <p className="text-sm mt-1" style={{ color: '#dc2626' }}>{errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="••••••••"
                className="h-12"
                style={{ 
                  borderColor: 'rgba(51, 58, 47, 0.2)',
                  borderRadius: '0.75rem'
                }}
              />
              {errors.confirmPassword && (
                <p className="text-sm mt-1" style={{ color: '#dc2626' }}>{errors.confirmPassword.message}</p>
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
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'rgba(51, 58, 47, 0.6)' }}>
              <Link 
                to="/app/forgot-password" 
                className="hover:underline font-medium" 
                style={{ color: '#333A2F' }}
              >
                Resend code
              </Link>
              {' or '}
              <Link 
                to="/app/login" 
                className="hover:underline font-medium" 
                style={{ color: '#333A2F' }}
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
