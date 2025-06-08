import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Package
} from 'lucide-react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../contexts/AuthContext';

const AgencyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [tourPackages, setTourPackages] = useState([]);
  const [stats, setStats] = useState({
    totalPackages: 15,
    activeBookings: 32,
    totalRevenue: 45600,
    averageRating: 4.7,
    monthlyBookings: 128
  });

  useEffect(() => {
    fetchAgencyData();
  }, []);

  const fetchAgencyData = async () => {
    // Mock data - in real app, fetch from Supabase
    setTourPackages([
      {
        id: 1,
        title: 'Bali Adventure Package',
        location: 'Bali, Indonesia',
        duration: '7 days, 6 nights',
        price: 899,
        image: 'https://images.pexels.com/photos/2833022/pexels-photo-2833022.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        bookings: 24,
        status: 'active'
      },
      {
        id: 2,
        title: 'European City Tour',
        location: 'Paris, Rome, Barcelona',
        duration: '12 days, 11 nights',
        price: 1299,
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.6,
        bookings: 18,
        status: 'active'
      },
      {
        id: 3,
        title: 'Swiss Alps Experience',
        location: 'Switzerland',
        duration: '5 days, 4 nights',
        price: 1599,
        image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        bookings: 12,
        status: 'active'
      }
    ]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'packages', label: 'Tour Packages', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Agency Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your tour packages and track your business performance
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="border-b border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {[
                { label: 'Total Packages', value: stats.totalPackages, icon: Package, color: 'text-blue-600' },
                { label: 'Active Bookings', value: stats.activeBookings, icon: Calendar, color: 'text-green-600' },
                { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600' },
                { label: 'Average Rating', value: stats.averageRating, icon: Star, color: 'text-yellow-600' },
                { label: 'Monthly Bookings', value: stats.monthlyBookings, icon: Users, color: 'text-orange-600' }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-blue-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Package</h3>
                <p className="text-gray-600 text-sm">Add a new tour package to your collection</p>
              </motion.button>

              <motion.button
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="bg-green-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Bookings</h3>
                <p className="text-gray-600 text-sm">View and manage customer bookings</p>
              </motion.button>

              <motion.button
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="bg-purple-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Analytics</h3>
                <p className="text-gray-600 text-sm">Track your business performance metrics</p>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tour Packages</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {pkg.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">${pkg.price}</div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{pkg.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{pkg.bookings} bookings</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other tabs would go here with similar structure */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
            <p className="text-gray-600">Booking management features would be implemented here.</p>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
            <p className="text-gray-600">Analytics dashboard would be implemented here.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AgencyDashboard;