import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('blogUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User already exists with this email');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('blogUsers', JSON.stringify(existingUsers));

      // Set current user (without password)
      const userSession = { ...newUser };
      delete userSession.password;
      setUser(userSession);
      localStorage.setItem('blogUser', JSON.stringify(userSession));

      toast({
        title: "Account created successfully! 🎉",
        description: "Welcome to the blogging platform!"
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('blogUsers') || '[]');
      const user = existingUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Set current user (without password)
      const userSession = { ...user };
      delete userSession.password;
      setUser(userSession);
      localStorage.setItem('blogUser', JSON.stringify(userSession));

      toast({
        title: "Welcome back! 🚀",
        description: "You've successfully logged in."
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
    toast({
      title: "Logged out successfully! 👋",
      description: "See you next time!"
    });
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};