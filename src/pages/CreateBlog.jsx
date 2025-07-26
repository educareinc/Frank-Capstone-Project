import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenTool, Image, Type, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { createBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'imageUrl') {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      ...formData,
      author: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };

    const result = await createBlog(blogData);
    
    if (result.success) {
      navigate(`/blog/${result.blog.id}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-effect">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
              >
                <PenTool className="w-6 h-6 text-white" />
              </motion.div>
              <CardTitle className="text-3xl gradient-text">Create Your Story</CardTitle>
              <p className="text-gray-400">Share your thoughts with the world</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center space-x-2">
                    <Type className="w-4 h-4" />
                    <span>Title</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter an engaging title..."
                    value={formData.title}
                    onChange={handleChange}
                    className="text-lg"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subtitle" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Subtitle</span>
                  </Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    placeholder="Add a compelling subtitle..."
                    value={formData.subtitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="flex items-center space-x-2">
                    <Image className="w-4 h-4" />
                    <span>Featured Image URL</span>
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 relative w-full h-48 rounded-lg bg-slate-800 flex items-center justify-center">
                      {!imageError ? (
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-lg"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="text-center text-red-500">
                           <AlertCircle className="mx-auto w-8 h-8 mb-2" />
                           <p>Could not load image preview.</p>
                           <p className="text-xs text-gray-400">Please check the URL.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your amazing story here..."
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    className="resize-none"
                    required
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={loading}
                  >
                    {loading ? 'Publishing...' : 'Publish Blog'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;