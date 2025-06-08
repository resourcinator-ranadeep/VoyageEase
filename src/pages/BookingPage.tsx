import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Camera, 
  Bus, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  Star,
  Users,
  Search,
  Filter
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'tour');
  const [tourPackages, setTourPackages] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    date: '',
    passengers: 1,
    priceRange: [0, 2000]
  });

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    // Mock data - in real app, fetch from Supabase
    setTourPackages([
      {
        id: 1,
        title: 'Bali Adventure Package',
        location: 'Bali, Indonesia',
        duration: '7 days, 6 nights',
        price: 899,
        originalPrice: 1199,
        image: 'https://images.pexels.com/photos/2833022/pexels-photo-2833022.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.8,
        reviews: 124,
        agency: 'Adventure Tours',
        highlights: ['Beach Resort', 'Temple Tours', 'Cultural Experience', 'All Meals Included']
      },
      {
        id: 2,
        title: 'European City Tour',
        location: 'Paris, Rome, Barcelona',
        duration: '12 days, 11 nights',
        price: 1299,
        originalPrice: 1599,
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.6,
        reviews: 89,
        agency: 'Euro Travel Co',
        highlights: ['Historic Sites', 'Local Cuisine', 'Guided Tours', 'Transportation Included']
      },
      {
        id: 3,
        title: 'Swiss Alps Experience',
        location: 'Switzerland',
        duration: '5 days, 4 nights',
        price: 1599,
        originalPrice: 1899,
        image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.9,
        reviews: 67,
        agency: 'Mountain Adventures',
        highlights: ['Scenic Railways', 'Alpine Hiking', 'Luxury Hotels', 'Photography Tours']
      }
    ]);

    setBusRoutes([
      {
        id: 1,
        route: 'New York → Boston',
        departure: '08:00 AM',
        arrival: '12:30 PM',
        duration: '4h 30m',
        price: 45,
        operator: 'Express Lines',
        busType: 'Luxury Coach',
        amenities: ['WiFi', 'AC', 'Reclining Seats', 'USB Charging'],
        availableSeats: 12
      },
      {
        id: 2,
        route: 'Boston → New York',
        departure: '02:00 PM',
        arrival: '06:30 PM',
        duration: '4h 30m',
        price: 45,
        operator: 'Express Lines',
        busType: 'Luxury Coach',
        amenities: ['WiFi', 'AC', 'Reclining Seats', 'USB Charging'],
        availableSeats: 8
      },
      {
        id: 3,
        route: 'New York → Philadelphia',
        departure: '10:00 AM',
        arrival: '12:00 PM',
        duration: '2h 00m',
        price: 25,
        operator: 'City Connect',
        busType: 'Standard',
        amenities: ['WiFi', 'AC'],
        availableSeats: 22
      }
    ]);
  };

  const handleBooking = (id: number, type: 'tour' | 'bus') => {
    // Handle booking logic
    console.log(`Booking ${type} with ID: ${id}`);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Journey
          </h1>
          <p className="text-gray-600">
            Discover amazing destinations and convenient travel options
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="border-b border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tour')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tour'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Camera className="h-5 w-5" />
              <span>Tour Packages</span>
            </button>
            <button
              onClick={() => setActiveTab('bus')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'bus'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bus className="h-5 w-5" />
              <span>Bus Tickets</span>
            </button>
          </nav>
        </motion.div>

        {/* Search Filters */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'tour' ? 'Destination' : 'Route'}
              </label>
              <div className="relative">
                <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={activeTab === 'tour' ? 'Where to?' : 'From → To'}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.destination}
                  onChange={(e) => setSearchFilters({ ...searchFilters, destination: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'tour' ? 'Departure Date' : 'Travel Date'}
              </label>
              <div className="relative">
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.date}
                  onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'tour' ? 'Travelers' : 'Passengers'}
              </label>
              <div className="relative">
                <Users className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={searchFilters.passengers}
                  onChange={(e) => setSearchFilters({ ...searchFilters, passengers: parseInt(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tour Packages */}
        {activeTab === 'tour' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Tour Packages
              </h2>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {tourPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                      Save ${pkg.originalPrice - pkg.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{pkg.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.slice(0, 3).map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                          <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                        </div>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{pkg.reviews} reviews</p>
                        <p className="text-sm text-gray-500">by {pkg.agency}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleBooking(pkg.id, 'tour')}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bus Routes */}
        {activeTab === 'bus' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Bus Routes
              </h2>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="space-y-4">
              {busRoutes.map((route, index) => (
                <motion.div
                  key={route.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{route.route}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">${route.price}</div>
                          <p className="text-sm text-gray-600">per seat</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Departure</p>
                            <p className="text-sm text-gray-600">{route.departure}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Arrival</p>
                            <p className="text-sm text-gray-600">{route.arrival}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Duration</p>
                            <p className="text-sm text-gray-600">{route.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Available</p>
                            <p className="text-sm text-gray-600">{route.availableSeats} seats</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">{route.operator}</p>
                          <p className="text-sm text-gray-600 mb-2">{route.busType}</p>
                          <div className="flex flex-wrap gap-2">
                            {route.amenities.map((amenity) => (
                              <span
                                key={amenity}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleBooking(route.id, 'bus')}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Select Seats
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;