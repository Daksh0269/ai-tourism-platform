import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, AlertCircle, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export default function MainLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Itinerary', path: '/itinerary', icon: Map },
    { name: 'Grievances', path: '/grievances', icon: AlertCircle },
    { name: 'Test Harness', path: '/test', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-apple-bg text-apple-text">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-apple-glass backdrop-blur-xl border-b border-apple-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-apple-text flex items-center justify-center text-white font-bold tracking-tighter transition-transform group-hover:scale-105">
              AI
            </div>
            <span className="font-semibold tracking-tight text-lg">Tourism</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors relative py-2",
                    isActive ? "text-apple-text" : "text-apple-text-muted hover:text-apple-text"
                  )}
                >
                  <Icon size={16} />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-apple-blue rounded-t-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium hidden sm:block">
                  {user.name || user.email}
                </span>
                <Button variant="ghost" onClick={logout} className="px-3 py-1.5 text-sm">
                  <LogOut size={16} className="mr-1.5" /> Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" className="text-sm px-4 py-1.5">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content with Transitions */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}