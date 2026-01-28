import { AppHeader } from '@widgets/app-header';
import { Button, Input, Textarea } from '@shared/ui';
import { useUserStore } from '@entities/user';
import { useForm } from 'react-hook-form';
import { User, MapPin, Briefcase, Globe, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export const ProfilePage = () => {
  const { currentUser, getUser, updateProfile, loadProfile, currentProfile } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from backend when component mounts
  useEffect(() => {
    if (currentUser && currentUser.isAuthenticated) {
      loadProfile().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  // Use currentUser data if getUser returns null (user logged in via API)
  const userFromStore = currentUser ? getUser(currentUser.id) : null;
  
  // Combine profile data from backend with currentUser data
  const profileName = currentProfile?.firstName && currentProfile?.lastName 
    ? `${currentProfile.firstName} ${currentProfile.lastName}`.trim()
    : currentProfile?.firstName || currentProfile?.lastName 
    ? (currentProfile.firstName || currentProfile.lastName)
    : currentUser?.name || currentUser?.email?.split('@')[0] || 'User';

  const user = userFromStore || (currentUser ? {
    id: currentUser.id,
    email: currentProfile?.email || currentUser.email,
    name: profileName,
    role: currentUser.role,
    status: 'active' as const,
    avatar: currentUser.avatar,
    bio: currentProfile?.bio || '',
    location: currentProfile?.city || currentProfile?.country 
      ? [currentProfile.city, currentProfile.country].filter(Boolean).join(', ')
      : '',
    skills: [], // Skills need special handling with backend
    experience: currentProfile?.graduationYear 
      ? `Graduation: ${currentProfile.graduationYear}`
      : '',
    website: currentProfile?.portfolioUrl || currentProfile?.githubUrl || currentProfile?.linkedinUrl || '',
    createdAt: new Date().toISOString(),
  } : null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: currentProfile?.firstName || '',
      lastName: currentProfile?.lastName || '',
      bio: currentProfile?.bio || user?.bio || '',
      city: currentProfile?.city || '',
      country: currentProfile?.country || '',
      university: currentProfile?.university || '',
      major: currentProfile?.major || '',
      graduationYear: currentProfile?.graduationYear || '',
      githubUrl: currentProfile?.githubUrl || '',
      linkedinUrl: currentProfile?.linkedinUrl || '',
      portfolioUrl: currentProfile?.portfolioUrl || '',
    },
  });

  // Reset form when profile loads
  useEffect(() => {
    if (currentProfile) {
      reset({
        firstName: currentProfile.firstName || '',
        lastName: currentProfile.lastName || '',
        bio: currentProfile.bio || '',
        city: currentProfile.city || '',
        country: currentProfile.country || '',
        university: currentProfile.university || '',
        major: currentProfile.major || '',
        graduationYear: currentProfile.graduationYear || '',
        githubUrl: currentProfile.githubUrl || '',
        linkedinUrl: currentProfile.linkedinUrl || '',
        portfolioUrl: currentProfile.portfolioUrl || '',
      });
    }
  }, [currentProfile, reset]);

  const onSubmit = async (data: any) => {
    if (currentUser) {
      try {
        await updateProfile(currentUser.id, data);
        await loadProfile(); // Reload profile after update
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF', paddingTop: '8rem' }}>
        <AppHeader />
        <main className="container mx-auto px-6 py-12" style={{ maxWidth: '1280px' }}>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: '#333A2F' }}>Please sign in</h1>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF', paddingTop: '8rem' }}>
        <AppHeader />
        <main className="container mx-auto px-6 py-12" style={{ maxWidth: '1280px' }}>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: '#333A2F' }}>Loading profile...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF', paddingTop: '6rem' }}>
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ maxWidth: '1280px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EBEDDF' }}>
                    <User className="w-12 h-12" style={{ color: '#333A2F' }} />
                  </div>
                )}
                <div>
                  <h1 className="font-heading text-3xl font-bold mb-2" style={{ color: '#333A2F' }}>{user.name}</h1>
                  <div className="flex items-center gap-4" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border-2"
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
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>First Name</label>
                    <Input {...register('firstName')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Last Name</label>
                    <Input {...register('lastName')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Bio</label>
                  <Textarea {...register('bio')} rows={4} style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>City</label>
                    <Input {...register('city')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Country</label>
                    <Input {...register('country')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>University</label>
                    <Input {...register('university')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Major</label>
                    <Input {...register('major')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Graduation Year</label>
                  <Input {...register('graduationYear', { valueAsNumber: true })} type="number" className="h-12" placeholder="2024" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>GitHub URL</label>
                  <Input {...register('githubUrl')} type="url" className="h-12" placeholder="https://github.com/username" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>LinkedIn URL</label>
                  <Input {...register('linkedinUrl')} type="url" className="h-12" placeholder="https://linkedin.com/in/username" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Portfolio URL</label>
                  <Input {...register('portfolioUrl')} type="url" className="h-12" placeholder="https://yourportfolio.com" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg"
                  style={{ backgroundColor: '#333A2F', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                {user.bio && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>About</h2>
                    <p style={{ color: 'rgba(51, 58, 47, 0.7)' }}>{user.bio}</p>
                  </div>
                )}

                {user.skills && user.skills.length > 0 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#333A2F' }}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: '#EBEDDF', color: '#333A2F' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(currentProfile?.university || currentProfile?.major) && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>Education</h2>
                    <div className="flex items-center gap-2" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
                      <Briefcase className="w-4 h-4" />
                      <span>
                        {[currentProfile.university, currentProfile.major, currentProfile.graduationYear].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                )}

                {(currentProfile?.githubUrl || currentProfile?.linkedinUrl || currentProfile?.portfolioUrl) && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>Links</h2>
                    <div className="flex flex-col gap-2">
                      {currentProfile.githubUrl && (
                        <a
                          href={currentProfile.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline"
                          style={{ color: '#333A2F' }}
                        >
                          <Globe className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {currentProfile.linkedinUrl && (
                        <a
                          href={currentProfile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline"
                          style={{ color: '#333A2F' }}
                        >
                          <Globe className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {currentProfile.portfolioUrl && (
                        <a
                          href={currentProfile.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline"
                          style={{ color: '#333A2F' }}
                        >
                          <Globe className="w-4 h-4" />
                          <span>Portfolio</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

