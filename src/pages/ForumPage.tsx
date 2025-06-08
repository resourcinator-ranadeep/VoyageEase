import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Filter,
  ThumbsUp,
  ThumbsDown,
  Reply,
  User,
  Calendar,
  MapPin,
  Tag
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const ForumPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [forumPosts, setForumPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  useEffect(() => {
    fetchForumPosts();
  }, []);

  const fetchForumPosts = async () => {
    // Mock data - in real app, fetch from Supabase
    setForumPosts([
      {
        id: 1,
        title: 'Best time to visit Bali?',
        content: 'Planning a trip to Bali and wondering about the best time to visit. Any recommendations for weather and crowd levels?',
        author: {
          name: 'Sarah Johnson',
          role: 'user',
          avatar: null
        },
        category: 'Travel Tips',
        location: 'Bali, Indonesia',
        createdAt: '2024-01-15T10:30:00Z',
        likes: 12,
        dislikes: 1,
        replies: 8,
        tags: ['bali', 'travel-tips', 'weather']
      },
      {
        id: 2,
        title: 'Reliable bus operators for NYC to Boston route?',
        content: 'Looking for recommendations on the most reliable bus operators for the NYC to Boston route. Comfort and punctuality are my priorities.',
        author: {
          name: 'Mike Chen',
          role: 'user',
          avatar: null
        },
        category: 'Transportation',
        location: 'New York, USA',
        createdAt: '2024-01-14T15:45:00Z',
        likes: 8,
        dislikes: 0,
        replies: 5,
        tags: ['bus', 'nyc', 'boston', 'transportation']
      },
      {
        id: 3,
        title: 'Hidden gems in Switzerland',
        content: 'Just returned from an amazing trip to Switzerland! Here are some hidden gems that most tourists miss...',
        author: {
          name: 'Emma Wilson',
          role: 'user',
          avatar: null
        },
        category: 'Travel Stories',
        location: 'Switzerland',
        createdAt: '2024-01-13T09:15:00Z',
        likes: 24,
        dislikes: 2,
        replies: 12,
        tags: ['switzerland', 'hidden-gems', 'travel-story']
      },
      {
        id: 4,
        title: 'Safety tips for solo female travelers',
        content: 'Sharing some essential safety tips for women traveling alone, based on my experiences across different countries.',
        author: {
          name: 'Lisa Rodriguez',
          role: 'user',
          avatar: null
        },
        category: 'Safety',
        location: 'Global',
        createdAt: '2024-01-12T14:20:00Z',
        likes: 35,
        dislikes: 0,
        replies: 18,
        tags: ['safety', 'solo-travel', 'women-travel']
      }
    ]);
  };

  const categories = [
    { id: 'all', label: 'All Posts', count: 156 },
    { id: 'travel-tips', label: 'Travel Tips', count: 45 },
    { id: 'transportation', label: 'Transportation', count: 32 },
    { id: 'travel-stories', label: 'Travel Stories', count: 28 },
    { id: 'safety', label: 'Safety', count: 21 },
    { id: 'recommendations', label: 'Recommendations', count: 30 }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'travel tips': return 'bg-blue-100 text-blue-800';
      case 'transportation': return 'bg-green-100 text-green-800';
      case 'travel stories': return 'bg-purple-100 text-purple-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'recommendations': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Community Forum
              </h1>
              <p className="text-gray-600">
                Connect with fellow travelers, share experiences, and get advice
              </p>
            </div>
            
            {user && (
              <button
                onClick={() => setShowNewPostModal(true)}
                className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>New Post</span>
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeTab === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">{category.label}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Replies</option>
                  </select>
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">Filters</span>
                </button>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-6">
              {forumPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{post.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            <span className="text-sm">{post.dislikes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <Reply className="h-4 w-4" />
                            <span className="text-sm">{post.replies}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                Load More Posts
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForumPage;