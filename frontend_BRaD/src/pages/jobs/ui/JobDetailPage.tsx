import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase, MessageSquare } from 'lucide-react';
import { AppHeader } from '@widgets/app-header';
import { Button } from '@shared/ui';
import { useJobStore } from '@entities/job';
import { useUserStore } from '@entities/user';
import { useState } from 'react';
import { ChatWindow } from '@features/chat';
import { useMessageStore } from '@entities/message';

export const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useJobStore();
  const { currentUser, isAuthenticated } = useUserStore();
  const { getOrCreateConversation } = useMessageStore();
  const [showChat, setShowChat] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Job not found</h1>
            <Link to="/app/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Link
            to="/app/jobs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Jobs</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                  <img
                    src={job.companyLogo || '/images/companies/default_company.jpg'}
                    alt={job.company}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-4">{job.company}</p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold mb-3">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </div>

                  <div>
                    <h2 className="font-heading text-xl font-bold mb-3">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-card p-4 sm:p-6 lg:sticky lg:top-24">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Posted {new Date(job.postedAt).toLocaleDateString()}</p>
                    <p>{job.applicationsCount} applications</p>
                  </div>

                  {isAuthenticated && currentUser?.role === 'candidate' ? (
                    <>
                      <Button variant="hero" size="lg" className="w-full">
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => {
                          if (currentUser) {
                            const convId = getOrCreateConversation(currentUser.id, job.employerId);
                            setConversationId(convId);
                            setShowChat(true);
                          }
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Employer
                      </Button>
                    </>
                  ) : (
                    <Button variant="hero" size="lg" className="w-full" disabled>
                      Sign in to Apply
                    </Button>
                  )}

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">About {job.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      We are a leading company in the tech industry, focused on innovation and
                      excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showChat && conversationId && (
        <ChatWindow
          conversationId={conversationId}
          receiverId={job.employerId}
          receiverName={job.company}
          onClose={() => {
            setShowChat(false);
            setConversationId(null);
          }}
        />
      )}
    </>
  );
};

