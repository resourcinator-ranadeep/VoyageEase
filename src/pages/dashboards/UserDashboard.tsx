import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Car, 
  Bus, 
  Camera, 
  Star,
  Clock,
  CreditCard,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRides: 0,
    totalSpent: 0,
    upcomingTrips: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, you would fetch actual data from Supabase
      // For now, we'll use mock data
      setStats({
        totalBookings: 12,
        totalRides: 28,
        totalSpent: 1250,
        upcomingTrips: 3
      });

      setRecentActivity([
        {
          id: 1,
          type: 'tour',
          title: 'Bali Adventure Package',
          date: '2024-01-15',
          status: 'confirmed',
          amount: 450
        },
        {
          id: 2,
          type: 'ride',
          title: 'Ride to Airport',
          date: '2024-01-10',
          status: 'completed',
          amount: 25
        },
        {
          id: 3,
          type: 'bus',
          title: 'NYC to Boston Bus',
          date: '2024-01-08',
          status: 'completed',
          amount: 35
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Book Tour Package',
      description: 'Explore amazing destinations',
      icon: <Camera className="h-8 w-8" />,
      color: 'bg-blue-500',
      link: '/booking?type=tour'
    },
    {
      title: 'Book Bus Ticket',
      description: 'Inter-city bus travel',
      icon: <Bus className="h-8 w-8" />,
      color: 'bg-green-500',
      link: '/booking?type=bus'
    },
    {
      title: 'Request Ride',
      description: 'Local transportation',
      icon: <Car className="h-8 w-8" />,
      color: 'bg-purple-500',
      link: '/ride-request'
    },
    {
      title: 'Community Forum',
      description: 'Connect with travelers',
      icon: <MessageCircle className="h-8 w-8" />,
      color: 'bg-orange-500',
      link: '/forum'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name}!
          </h1>
          <p className="text-gray-600">
            Ready for your next adventure? Let's explore what's available.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'text-blue-600' },
            { label: 'Total Rides', value: stats.totalRides, icon: Car, color: 'text-green-600' },
            { label: 'Total Spent', value: `$${stats.totalSpent}`, icon: CreditCard, color: 'text-purple-600' },
            { label: 'Upcoming Trips', value: stats.upcomingTrips, icon: MapPin, color: 'text-orange-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.a
                key={action.title}
                href={action.link}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className={`${action.color} text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'tour' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'ride' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'tour' ? <Camera className="h-5 w-5" /> :
                     activity.type === 'ride' ? <Car className="h-5 w-5" /> :
                     <Bus className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${activity.amount}</p>
                  <p className={`text-sm capitalize ${
                    activity.status === 'confirmed' ? 'text-blue-600' :
                    activity.status === 'completed' ? 'text-green-600' :
                    'text-yellow-600'
                  }`}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;