import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { BlogProvider } from '@/contexts/BlogContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import CreateBlog from '@/pages/CreateBlog';
import ViewBlog from '@/pages/ViewBlog';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/blog/:id" element={<ViewBlog />} />
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <CreateBlog />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;