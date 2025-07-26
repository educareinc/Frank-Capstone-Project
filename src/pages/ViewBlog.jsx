import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Eye, Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, incrementViews, toggleLike, deleteBlog } = useBlog();
  const { user } = useAuth();
  
  const blog = getBlogById(id);

  useEffect(() => {
    if (blog) {
      incrementViews(blog.id);
    }
  }, [blog, incrementViews, id]);

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleLike(blog.id, user.id);
  };

  const handleDelete = () => {
    deleteBlog(blog.id).then(result => {
      if (result.success) {
        navigate('/profile');
      }
    });
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
    e.currentTarget.src = "https://placehold.co/1200x800/1e293b/94a3b8?text=Image+Unavailable";
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>

          <Card className="glass-effect overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  {blog.title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-200"
                >
                  {blog.subtitle}
                </motion.p>
              </div>
            </div>

            <CardContent className="p-8">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-700"
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{blog.author.username}</p>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views} views</span>
                  </div>
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-colors ${
                      user && blog.likedBy?.includes(user.id)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>{blog.likes}</span>
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="prose prose-lg prose-invert max-w-none"
              >
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 mt-8 pt-6 border-t border-gray-700"
              >
                <Button
                  onClick={handleLike}
                  variant={user && blog.likedBy?.includes(user.id) ? 'default' : 'outline'}
                  className="flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>{user && blog.likedBy?.includes(user.id) ? 'Liked' : 'Like'}</span>
                </Button>
                
                {user && user.id === blog.author.id && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex items-center space-x-2">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Post</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {!user && (
                  <Button onClick={() => navigate('/login')}>
                    Login to Interact
                  </Button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewBlog;