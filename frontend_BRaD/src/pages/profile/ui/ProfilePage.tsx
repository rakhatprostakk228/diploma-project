import { AppHeader } from '@widgets/app-header';
import { Button, Input, Textarea } from '@shared/ui';
import { useUserStore } from '@entities/user';
import { useForm } from 'react-hook-form';
import { User, MapPin, Briefcase, Globe, Mail } from 'lucide-react';
import { useState } from 'react';

export const ProfilePage = () => {
  const { currentUser, getUser, updateProfile } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const user = currentUser ? getUser(currentUser.id) : null;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
      skills: user?.skills?.join(', ') || '',
      experience: user?.experience || '',
      website: user?.website || '',
    },
  });

  const onSubmit = (data: any) => {
    if (currentUser) {
      updateProfile(currentUser.id, {
        ...data,
        skills: data.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
      });
      setIsEditing(false);
    }
  };

  if (!currentUser || !user) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF', paddingTop: '4rem' }}>
        <AppHeader />
        <main className="container mx-auto px-6 py-12" style={{ maxWidth: '1280px' }}>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: '#333A2F' }}>Please sign in</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF' }}>
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
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Full Name</label>
                  <Input {...register('name')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Bio</label>
                  <Textarea {...register('bio')} rows={4} style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Location</label>
                  <Input {...register('location')} className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Skills (comma separated)</label>
                  <Input {...register('skills')} className="h-12" placeholder="React, TypeScript, Node.js" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Experience</label>
                  <Input {...register('experience')} className="h-12" placeholder="5 years" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333A2F' }}>Website</label>
                  <Input {...register('website')} type="url" className="h-12" style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }} />
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

                {user.experience && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>Experience</h2>
                    <div className="flex items-center gap-2" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
                      <Briefcase className="w-4 h-4" />
                      <span>{user.experience}</span>
                    </div>
                  </div>
                )}

                {user.website && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2" style={{ color: '#333A2F' }}>Website</h2>
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                      style={{ color: '#333A2F' }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>{user.website}</span>
                    </a>
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

