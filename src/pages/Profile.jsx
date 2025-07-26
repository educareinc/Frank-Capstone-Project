import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, PenTool, Eye, Heart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const { getUserBlogs, deleteBlog } = useBlog();
  
  const userBlogs = getUserBlogs(user.id);
  const totalViews = userBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
  const totalLikes = userBlogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = (blogId) => {
    deleteBlog(blogId);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="glass-effect mb-8">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">{user.username}</h1>
                  <p className="text-gray-400">{user.email}</p>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mt-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-effect text-center">
                <CardContent className="p-6">
                  <PenTool className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="text-2xl font-bold">{userBlogs.length}</h3>
                  <p className="text-gray-400">Blog Posts</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-effect text-center">
                <CardContent className="p-6">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <h3 className="text-2xl font-bold">{totalViews}</h3>
                  <p className="text-gray-400">Total Views</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-effect text-center">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <h3 className="text-2xl font-bold">{totalLikes}</h3>
                  <p className="text-gray-400">Total Likes</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* User's Blogs */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="gradient-text">Your Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {userBlogs.length === 0 ? (
                <div className="text-center py-12">
                  <PenTool className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                  <p className="text-gray-400 mb-4">Start sharing your thoughts with the world!</p>
                  <Link 
                    to="/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PenTool className="w-4 h-4 mr-2" />
                    Create Your First Blog
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="blog-card hover:scale-[1.02] transition-transform flex items-center p-4">
                        <Link to={`/blog/${blog.id}`} className="flex-grow">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={blog.imageUrl} 
                              alt={blog.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                              <p className="text-gray-400 mb-3 line-clamp-2">{blog.subtitle}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{blog.views}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{blog.likes}</span>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-400">
                                  {formatDate(blog.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="ml-4">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
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
                                <AlertDialogAction onClick={() => handleDelete(blog.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;