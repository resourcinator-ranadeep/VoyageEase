import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  DollarSign, 
  Clock, 
  Car,
  User,
  MessageCircle,
  Shield,
  Star
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

const RideRequestPage: React.FC = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [step, setStep] = useState(1); // 1: Request, 2: Bids, 3: Active Ride
  const [rideRequest, setRideRequest] = useState({
    pickup: { lat: 0, lng: 0, address: '' },
    destination: { lat: 0, lng: 0, address: '' },
    estimatedFare: 0,
    distance: ''
  });
  const [driverBids, setDriverBids] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on('driver_bid_received', handleNewBid);
      socket.on('ride_accepted', handleRideAccepted);
      socket.on('ride_started', handleRideStarted);
      socket.on('ride_completed', handleRideCompleted);
      
      return () => {
        socket.off('driver_bid_received');
        socket.off('ride_accepted');
        socket.off('ride_started');
        socket.off('ride_completed');
      };
    }
  }, [socket]);

  const handleNewBid = (bid) => {
    setDriverBids(prev => [...prev, bid]);
  };

  const handleRideAccepted = (rideData) => {
    setActiveRide(rideData);
    setStep(3);
  };

  const handleRideStarted = (data) => {
    setOtp(data.otp);
  };

  const handleRideCompleted = () => {
    setStep(1);
    setActiveRide(null);
    setDriverBids([]);
    setOtp('');
  };

  const submitRideRequest = () => {
    // Mock ride request submission
    const mockRequest = {
      pickup: { lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' },
      destination: { lat: 40.7589, lng: -73.9851, address: '456 Broadway, New York, NY' },
      estimatedFare: 25,
      distance: '3.2 miles'
    };
    
    setRideRequest(mockRequest);
    setStep(2);
    
    // Simulate receiving bids
    setTimeout(() => {
      setDriverBids([
        {
          id: 1,
          driverId: 'driver1',
          driverName: 'John Smith',
          rating: 4.8,
          totalRides: 156,
          bidAmount: 22,
          estimatedArrival: '5 mins',
          carModel: 'Toyota Camry',
          carColor: 'Blue',
          licensePlate: 'ABC-123'
        },
        {
          id: 2,
          driverId: 'driver2',
          driverName: 'Sarah Johnson',
          rating: 4.9,
          totalRides: 203,
          bidAmount: 24,
          estimatedArrival: '3 mins',
          carModel: 'Honda Accord',
          carColor: 'Silver',
          licensePlate: 'XYZ-789'
        }
      ]);
    }, 2000);
  };

  const acceptBid = (bidId) => {
    const selectedBid = driverBids.find(bid => bid.id === bidId);
    if (selectedBid) {
      setActiveRide({
        ...selectedBid,
        status: 'accepted',
        pickup: rideRequest.pickup,
        destination: rideRequest.destination
      });
      setStep(3);
      
      // Simulate OTP generation
      setTimeout(() => {
        setOtp('5847');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request a Ride
          </h1>
          <p className="text-gray-600">
            Get competitive bids from local drivers in your area
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-8">
            {[
              { number: 1, title: 'Request Ride', active: step >= 1 },
              { number: 2, title: 'Review Bids', active: step >= 2 },
              { number: 3, title: 'Active Ride', active: step >= 3 }
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  stepItem.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.number}
                </div>
                <span className={`ml-2 font-medium ${
                  stepItem.active ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {stepItem.title}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > stepItem.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 1: Ride Request Form */}
        {step === 1 && (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Where are you going?</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="h-5 w-5 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter pickup address"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="123 Main St, New York, NY"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="h-5 w-5 text-red-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter destination address"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="456 Broadway, New York, NY"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Ride Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Estimated Distance:</span>
                    <span className="ml-2 font-medium">3.2 miles</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Estimated Fare:</span>
                    <span className="ml-2 font-medium">$20-30</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={submitRideRequest}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Request Ride
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Driver Bids */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Ride Request</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-green-500 mr-2" />
                  <span>{rideRequest.pickup.address}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-red-500 mr-2" />
                  <span>{rideRequest.destination.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Driver Bids</h2>
                <div className="text-sm text-gray-600">
                  {driverBids.length} drivers responded
                </div>
              </div>

              {driverBids.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Waiting for drivers...</h3>
                  <p className="text-gray-600">Drivers in your area will submit bids shortly</p>
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {driverBids.map((bid, index) => (
                    <motion.div
                      key={bid.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{bid.driverName}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span>{bid.rating}</span>
                              </div>
                              <span>{bid.totalRides} rides</span>
                              <span>{bid.carModel} • {bid.carColor}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">${bid.bidAmount}</div>
                          <div className="text-sm text-gray-600">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {bid.estimatedArrival}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => acceptBid(bid.id)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Accept Bid
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Active Ride */}
        {step === 3 && activeRide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ride Confirmed!</h2>
                <p className="text-gray-600">Your driver is on the way</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{activeRide.driverName}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">{activeRide.rating} • {activeRide.totalRides} rides</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">Vehicle</p>
                      <p className="text-sm text-gray-600">{activeRide.carModel} • {activeRide.carColor}</p>
                      <p className="text-sm text-gray-600">License: {activeRide.licensePlate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Information</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">OTP Code</span>
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{otp || '----'}</div>
                      <p className="text-xs text-gray-600 mt-1">Share this code with your driver</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{activeRide.pickup.address}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-600">{activeRide.destination.address}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Fare</span>
                        <span className="text-lg font-bold text-gray-900">${activeRide.bidAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat with Driver</span>
                </button>
                <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Navigation className="h-5 w-5" />
                  <span>Track Ride</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RideRequestPage;