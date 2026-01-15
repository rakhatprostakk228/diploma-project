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
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Please sign in</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                )}
                <div>
                  <h1 className="font-heading text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
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
              <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input {...register('name')} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <Textarea {...register('bio')} rows={4} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input {...register('location')} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
                  <Input {...register('skills')} className="h-12" placeholder="React, TypeScript, Node.js" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience</label>
                  <Input {...register('experience')} className="h-12" placeholder="5 years" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <Input {...register('website')} type="url" className="h-12" />
                </div>
                <Button type="submit" variant="hero" size="lg">
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                {user.bio && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2">About</h2>
                    <p className="text-muted-foreground">{user.bio}</p>
                  </div>
                )}

                {user.skills && user.skills.length > 0 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {user.experience && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2">Experience</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.experience}</span>
                    </div>
                  </div>
                )}

                {user.website && (
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-2">Website</h2>
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
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

