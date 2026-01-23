import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@shared/ui';
import { useUserStore } from '@entities/user';
import { useState } from 'react';

export const AppHeader = () => {
  const { currentUser, isAuthenticated, logout } = useUserStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/app');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/app" className="flex items-baseline gap-1 group">
              <span className="font-heading text-xl sm:text-2xl font-extrabold text-gradient tracking-tight">
                BRaD.
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to="/app/jobs"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Jobs
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/app/profile"
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    Profile
                  </Link>
                  {currentUser?.role === 'employer' && (
                    <Link
                      to="/app/employer"
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      Employer Dashboard
                    </Link>
                  )}
                </>
              )}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/app/chat" className="hidden sm:block">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full hidden sm:block"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hidden sm:block">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline">Logout</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/app/login">
                    <Button variant="ghost" className="hidden sm:flex">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/app/register">
                    <Button variant="hero" size="sm">
                      <span className="hidden sm:inline">Get Started</span>
                      <span className="sm:hidden">Start</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </>
              )}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4 mt-2">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/app/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Jobs
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/app/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/app/chat"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      Messages
                    </Link>
                    {currentUser?.role === 'employer' && (
                      <Link
                        to="/app/employer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        Employer Dashboard
                      </Link>
                    )}
                    <Button variant="ghost" onClick={handleLogout} className="justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/app/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/app/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-primary hover:underline font-medium"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

