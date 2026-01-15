import { Link } from 'react-router-dom';
import { AppHeader } from '@widgets/app-header';
import { Button } from '@shared/ui';
import { ArrowRight, Briefcase, Search, Users } from 'lucide-react';

export const AppPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-gradient">BRaD.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your gateway to remote opportunities. Find your dream job or discover talented candidates.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link to="/app/jobs">
              <div className="bg-card rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all group">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Browse Jobs</h3>
                <p className="text-muted-foreground text-sm">
                  Explore thousands of remote opportunities
                </p>
              </div>
            </Link>

            <Link to="/app/profile">
              <div className="bg-card rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all group">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Your Profile</h3>
                <p className="text-muted-foreground text-sm">
                  Manage your profile and applications
                </p>
              </div>
            </Link>

            <div className="bg-card rounded-2xl shadow-card p-8 hover:shadow-card-hover transition-all group">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">For Employers</h3>
              <p className="text-muted-foreground text-sm">
                Post jobs and find the best talent
              </p>
            </div>
          </div>

          <Link to="/app/jobs">
            <Button variant="hero" size="xl">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};
