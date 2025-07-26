import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { blogs, loading, toggleLike } = useBlog();
  const { user } = useAuth();

  const handleLike = (blogId) => {
    if (!user) {
      return;
    }
    toggleLike(blogId, user.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/800x400/1e293b/94a3b8?text=Image+Unavailable";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6 text-shimmer">
              Welcome to Frank's blog
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover amazing stories, share your thoughts, and connect with writers from around the world.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="pulse-glow">
                  Start Writing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Explore Blogs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Latest Stories
            </h2>
            
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-6">No blogs yet. Be the first to share your story!</p>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="blog-card h-full overflow-hidden">
                      <div className="relative">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title}
                          className="w-full h-48 object-cover"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-xl mb-2 line-clamp-2">
                          {blog.title}
                        </CardTitle>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {blog.subtitle}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>{blog.author.username}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{blog.views}</span>
                            </div>
                            <button
                              onClick={() => handleLike(blog.id)}
                              className={`flex items-center space-x-1 transition-colors ${
                                user && blog.likedBy?.includes(user.id)
                                  ? 'text-red-500'
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className="w-4 h-4" />
                              <span>{blog.likes}</span>
                            </button>
                          </div>
                          
                          <Link to={`/blog/${blog.id}`}>
                            <Button variant="ghost" size="sm">
                              Read More
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;