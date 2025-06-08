import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bus, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Route
} from 'lucide-react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../contexts/AuthContext';

const BusOperatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [busRoutes, setBusRoutes] = useState([]);
  const [stats, setStats] = useState({
    totalRoutes: 8,
    activeBuses: 24,
    dailyRevenue: 3400,
    totalPassengers: 156,
    occupancyRate: 78
  });

  useEffect(() => {
    fetchOperatorData();
  }, []);

  const fetchOperatorData = async () => {
    // Mock data - in real app, fetch from Supabase
    setBusRoutes([
      {
        id: 1,
        route: 'New York → Boston',
        departure: '08:00 AM',
        arrival: '12:30 PM',
        price: 45,
        totalSeats: 50,
        availableSeats: 12,
        busType: 'Luxury Coach',
        status: 'active'
      },
      {
        id: 2,
        route: 'Boston → New York',
        departure: '02:00 PM',
        arrival: '06:30 PM',
        price: 45,
        totalSeats: 50,
        availableSeats: 8,
        busType: 'Luxury Coach',
        status: 'active'
      },
      {
        id: 3,
        route: 'New York → Philadelphia',
        departure: '10:00 AM',
        arrival: '12:00 PM',
        price: 25,
        totalSeats: 40,
        availableSeats: 22,
        busType: 'Standard',
        status: 'active'
      },
      {
        id: 4,
        route: 'Philadelphia → New York',
        departure: '04:00 PM',
        arrival: '06:00 PM',
        price: 25,
        totalSeats: 40,
        availableSeats: 15,
        busType: 'Standard',
        status: 'active'
      }
    ]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'routes', label: 'Bus Routes', icon: Route },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'fleet', label: 'Fleet Management', icon: Bus }
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
            Bus Operator Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your bus routes, fleet, and track your operations
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
                { label: 'Total Routes', value: stats.totalRoutes, icon: Route, color: 'text-blue-600' },
                { label: 'Active Buses', value: stats.activeBuses, icon: Bus, color: 'text-green-600' },
                { label: 'Daily Revenue', value: `$${stats.dailyRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600' },
                { label: 'Today\'s Passengers', value: stats.totalPassengers, icon: Users, color: 'text-orange-600' },
                { label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, icon: TrendingUp, color: 'text-teal-600' }
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Route</h3>
                <p className="text-gray-600 text-sm">Create a new bus route for your fleet</p>
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
                <p className="text-gray-600 text-sm">View and manage passenger bookings</p>
              </motion.button>

              <motion.button
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="bg-purple-600 text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Bus className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fleet Status</h3>
                <p className="text-gray-600 text-sm">Monitor your bus fleet and maintenance</p>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bus Routes</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Route</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Availability
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bus Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {busRoutes.map((route, index) => (
                      <motion.tr
                        key={route.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                            <div className="text-sm font-medium text-gray-900">{route.route}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              {route.departure} - {route.arrival}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${route.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {route.availableSeats}/{route.totalSeats} seats
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${((route.totalSeats - route.availableSeats) / route.totalSeats) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{route.busType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            route.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {route.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Bookings</h2>
            <p className="text-gray-600">Booking management features would be implemented here.</p>
          </motion.div>
        )}

        {activeTab === 'fleet' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fleet Management</h2>
            <p className="text-gray-600">Fleet management features would be implemented here.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BusOperatorDashboard;