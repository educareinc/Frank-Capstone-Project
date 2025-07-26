import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogPosts');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      const sampleBlogs = [
        {
          id: '1',
          title: 'Frank Blog Post 1',
          subtitle: 'Welcome to our Network',
          content: 'My name is Frank Zakaria. Welcome to our Frank Project Network. Here you will find various and exciting news. Stay tuned!',
          imageUrl: 'https://images.unsplash.com/photo-1554495514-2cb859b48556?q=80&w=2070&auto=format&fit=crop',
          author: {
            id: 'frank_user_id',
            username: 'Frank',
            email: 'frank@example.com'
          },
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          likes: 55,
          views: 210
        },
        {
          id: '2',
          title: 'Frank Blog Post 2: Our Development',
          subtitle: 'We are Building a Strong Nation',
          content: 'In this post, we highlight various ongoing development projects in the country. Our goal is to ensure every citizen benefits from the national resources. Let\'s join hands!',
          imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1974&auto=format&fit=crop',
          author: {
            id: 'frank_user_id',
            username: 'Frank',
            email: 'frank@example.com'
          },
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          likes: 72,
          views: 305
        },
        {
          id: '3',
          title: 'Frank Blog Post 3: Technology and Innovation',
          subtitle: 'The Future of Tanzania',
          content: 'Technology is rapidly changing the world. Here at Frank Project, we analyze how Tanzania can use technology and innovation to grow the economy and improve citizens\' lives. Welcome to the discussion.',
          imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
          author: {
            id: 'frank_user_id',
            username: 'Frank',
            email: 'frank@example.com'
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          likes: 68,
          views: 250
        }
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('blogPosts', JSON.stringify(sampleBlogs));
    }
    setLoading(false);
  }, []);

  const createBlog = async (blogData) => {
    try {
      const newBlog = {
        id: Date.now().toString(),
        ...blogData,
        createdAt: new Date().toISOString(),
        likes: 0,
        views: 0
      };

      const updatedBlogs = [newBlog, ...blogs];
      setBlogs(updatedBlogs);
      localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));

      toast({
        title: "Blog published successfully! 🎉",
        description: "Your amazing content is now live!"
      });

      return { success: true, blog: newBlog };
    } catch (error) {
      toast({
        title: "Failed to publish blog",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
      setBlogs(updatedBlogs);
      localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));

      toast({
        title: "Blog deleted successfully! 🗑️",
        description: "Your post has been removed."
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Failed to delete blog",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const getBlogById = (id) => {
    return blogs.find(blog => blog.id === id);
  };

  const incrementViews = (blogId) => {
    const updatedBlogs = blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, views: (blog.views || 0) + 1 }
        : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));
  };

  const toggleLike = (blogId, userId) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === blogId) {
        const likedBy = blog.likedBy || [];
        const isLiked = likedBy.includes(userId);
        
        return {
          ...blog,
          likes: isLiked ? (blog.likes || 0) - 1 : (blog.likes || 0) + 1,
          likedBy: isLiked 
            ? likedBy.filter(id => id !== userId)
            : [...likedBy, userId]
        };
      }
      return blog;
    });
    
    setBlogs(updatedBlogs);
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));
  };

  const getUserBlogs = (userId) => {
    return blogs.filter(blog => blog.author.id === userId);
  };

  const value = {
    blogs,
    loading,
    createBlog,
    deleteBlog,
    getBlogById,
    incrementViews,
    toggleLike,
    getUserBlogs
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};