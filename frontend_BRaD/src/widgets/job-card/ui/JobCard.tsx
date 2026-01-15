import { MapPin, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '@entities/job';
import { useUserStore } from '@entities/user';
import { useState } from 'react';
import { ChatWindow } from '@features/chat';
import { useMessageStore } from '@entities/message';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const { currentUser, isAuthenticated } = useUserStore();
  const { getOrCreateConversation } = useMessageStore();
  const [showChat, setShowChat] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated && currentUser) {
      const convId = getOrCreateConversation(currentUser.id, job.employerId);
      setConversationId(convId);
      setShowChat(true);
    }
  };

  return (
    <>
      <Link to={`/app/jobs/${job.id}`}>
        <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-4 sm:p-6 group cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <img
                src={job.companyLogo || '/images/companies/default_company.jpg'}
                alt={job.company}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground mb-2">{job.company}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isAuthenticated && currentUser?.role === 'candidate' && (
              <button
                onClick={handleContact}
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                title="Contact employer"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            )}
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-foreground rounded-lg text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {job.tags.length > 4 && (
              <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-lg text-xs">
                +{job.tags.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
            <span>{job.applicationsCount} applications</span>
          </div>
        </div>
      </Link>

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

