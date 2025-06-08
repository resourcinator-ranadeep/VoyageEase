import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
  UserCheck,
  UserX,
  Search
} from 'lucide-react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    pendingVerifications: 23,
    totalRevenue: 125600,
    activeRides: 45,
    verifiedProviders: 89
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    // Mock data - in real app, fetch from Supabase
    setPendingVerifications([
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        role: 'driver',
        phone: '+1-555-0123',
        submittedAt: '2024-01-15T10:30:00Z',
        documents: ['license', 'insurance', 'vehicle_registration']
      },
      {
        id: 2,
        name: 'Adventure Tours LLC',
        email: 'info@adventuretours.com',
        role: 'tour_agency',
        phone: '+1-555-0456',
        submittedAt: '2024-01-14T15:45:00Z',
        documents: ['business_license', 'insurance', 'certifications']
      },
      {
        id: 3,
        name: 'City Bus Lines',
        email: 'operations@citybuslines.com',
        role: 'bus_operator',
        phone: '+1-555-0789',
        submittedAt: '2024-01-13T09:15:00Z',
        documents: ['operating_license', 'fleet_insurance', 'safety_certificates']
      }
    ]);
  };

  const handleVerification = async (userId: number, action: 'approve' | 'reject') => {
    try {
      // In real app, update verification status in Supabase
      setPendingVerifications(prev => prev.filter(item => item.id !== userId));
      
      if (action === 'approve') {
        console.log(`Approved user ${userId}`);
      } else {
        console.log(`Rejected user ${userId}`);
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'verifications', label: 'Verifications', icon: UserCheck },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Platform Analytics', icon: TrendingUp }
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
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Manage platform operations, verify service providers, and monitor system health
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
                    ? 'border-red-500 text-red-600'
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
                { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600' },
                { label: 'Pending Verifications', value: stats.pendingVerifications, icon: AlertTriangle, color: 'text-yellow-600' },
                { label: 'Platform Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
                { label: 'Active Rides', value: stats.activeRides, icon: Calendar, color: 'text-purple-600' },
                { label: 'Verified Providers', value: stats.verifiedProviders, icon: CheckCircle, color: 'text-teal-600' }
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
                onClick={() => setActiveTab('verifications')}
              >
                <div className="bg-yellow-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Verifications</h3>
                <p className="text-gray-600 text-sm">
                  {stats.pendingVerifications} providers waiting for verification
                </p>
              </motion.button>

              <motion.button
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onClick={() => setActiveTab('users')}
              >
                <div className="bg-blue-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
                <p className="text-gray-600 text-sm">View and manage all platform users</p>
              </motion.button>

              <motion.button
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                onClick={() => setActiveTab('analytics')}
              >
                <div className="bg-purple-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Analytics</h3>
                <p className="text-gray-600 text-sm">Monitor platform performance and metrics</p>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pending Verifications</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search verifications..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {pendingVerifications.map((verification, index) => (
                <motion.div
                  key={verification.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{verification.name}</h3>
                          <p className="text-sm text-gray-600">{verification.email}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                            verification.role === 'driver' ? 'bg-blue-100 text-blue-800' :
                            verification.role === 'tour_agency' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {verification.role.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Phone</p>
                          <p className="text-sm text-gray-600">{verification.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Submitted</p>
                          <p className="text-sm text-gray-600">
                            {new Date(verification.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Documents Submitted</p>
                        <div className="flex flex-wrap gap-2">
                          {verification.documents.map((doc) => (
                            <span
                              key={doc}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                            >
                              {doc.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>Review</span>
                      </button>
                      <button
                        onClick={() => handleVerification(verification.id, 'approve')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleVerification(verification.id, 'reject')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other tabs would go here with similar structure */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <p className="text-gray-600">User management features would be implemented here.</p>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Analytics</h2>
            <p className="text-gray-600">Analytics dashboard would be implemented here.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;