import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  DollarSign, 
  Star,
  Clock,
  Navigation,
  MessageCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Users
} from 'lucide-react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const [isOnline, setIsOnline] = useState(false);
  const [activeRides, setActiveRides] = useState([]);
  const [rideRequests, setRideRequests] = useState([]);
  const [stats, setStats] = useState({
    todayEarnings: 145,
    weeklyEarnings: 890,
    totalRides: 156,
    rating: 4.8,
    completionRate: 98
  });

  useEffect(() => {
    fetchDriverData();
    
    // Listen for new ride requests
    if (socket) {
      socket.on('new_ride_request', handleNewRideRequest);
      socket.on('ride_cancelled', handleRideCancellation);
      
      return () => {
        socket.off('new_ride_request');
        socket.off('ride_cancelled');
      };
    }
  }, [socket]);

  const fetchDriverData = async () => {
    // Mock data - in real app, fetch from Supabase
    setRideRequests([
      {
        id: 1,
        pickup: { address: '123 Main St', lat: 40.7128, lng: -74.0060 },
        destination: { address: '456 Broadway', lat: 40.7589, lng: -73.9851 },
        estimatedFare: 25,
        distance: '3.2 miles',
        requestTime: new Date(Date.now() - 300000) // 5 minutes ago
      }
    ]);

    setActiveRides([
      {
        id: 2,
        passenger: 'John Doe',
        pickup: { address: '789 Park Ave', lat: 40.7614, lng: -73.9776 },
        destination: { address: '321 5th Ave', lat: 40.7505, lng: -73.9934 },
        status: 'in_progress',
        otp: '5847',
        fare: 18
      }
    ]);
  };

  const handleNewRideRequest = (request) => {
    setRideRequests(prev => [request, ...prev]);
  };

  const handleRideCancellation = (rideId) => {
    setRideRequests(prev => prev.filter(req => req.id !== rideId));
    setActiveRides(prev => prev.filter(ride => ride.id !== rideId));
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    if (socket) {
      socket.emit('driver_status_change', { 
        status: !isOnline ? 'online' : 'offline' 
      });
    }
  };

  const acceptRideRequest = (requestId) => {
    // Handle ride request acceptance
    console.log('Accepting ride request:', requestId);
  };

  const submitBid = (requestId, bidAmount) => {
    if (socket) {
      socket.emit('driver_bid', {
        rideRequestId: requestId,
        bidAmount,
        driverId: user?.id
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Driver Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.full_name}! Ready to start earning?
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <button
                onClick={toggleOnlineStatus}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isOnline 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Today\'s Earnings', value: `$${stats.todayEarnings}`, icon: DollarSign, color: 'text-green-600' },
            { label: 'Weekly Earnings', value: `$${stats.weeklyEarnings}`, icon: TrendingUp, color: 'text-blue-600' },
            { label: 'Total Rides', value: stats.totalRides, icon: Car, color: 'text-purple-600' },
            { label: 'Rating', value: stats.rating, icon: Star, color: 'text-yellow-600' },
            { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: Calendar, color: 'text-orange-600' }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ride Requests */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Ride Requests</h2>
              {isOnline && (
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium">Accepting Requests</span>
                </div>
              )}
            </div>

            {!isOnline ? (
              <div className="text-center py-8">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">You're Offline</h3>
                <p className="text-gray-600 mb-4">Go online to start receiving ride requests</p>
                <button
                  onClick={toggleOnlineStatus}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Go Online
                </button>
              </div>
            ) : rideRequests.length === 0 ? (
              <div className="text-center py-8">
                <Navigation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No New Requests</h3>
                <p className="text-gray-600">Waiting for ride requests in your area...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rideRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {request.pickup.address}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {request.destination.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{request.distance}</span>
                          <span>${request.estimatedFare}</span>
                          <span>{Math.floor((Date.now() - request.requestTime) / 60000)}m ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Your bid ($)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => submitBid(request.id, 25)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Bid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Active Rides */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Active Rides</h2>
              <div className="text-sm text-gray-500">
                {activeRides.length} ongoing
              </div>
            </div>

            {activeRides.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Rides</h3>
                <p className="text-gray-600">Accept a ride request to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeRides.map((ride) => (
                  <div key={ride.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{ride.passenger}</h3>
                        <p className="text-sm text-gray-600">Ride #{ride.id}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${ride.fare}</div>
                        <div className={`text-sm px-2 py-1 rounded-full ${
                          ride.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ride.status.replace('_', ' ')}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{ride.pickup.address}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-600">{ride.destination.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="bg-gray-100 px-3 py-1 rounded-lg">
                        <span className="text-sm font-medium">OTP: {ride.otp}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors">
                          <Navigation className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;