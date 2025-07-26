import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenTool, Home, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect sticky top-0 z-50 border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <PenTool className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">Frank Project</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>

            {user ? (
              <>
                <Link to="/create">
                  <Button 
                    variant={isActive('/create') ? 'default' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Create</span>
                  </Button>
                </Link>

                <Link to="/profile">
                  <Button 
                    variant={isActive('/profile') ? 'default' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.username}</span>
                  </Button>
                </Link>

                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  size="sm"
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant={isActive('/login') ? 'default' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button 
                    variant={isActive('/signup') ? 'default' : 'outline'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;