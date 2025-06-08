import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  User,
  MapPin,
  Clock
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

const ChatPage: React.FC = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatPartner, setChatPartner] = useState(null);
  const [rideInfo, setRideInfo] = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatData();
    
    if (socket) {
      socket.on('new_message', handleNewMessage);
      socket.on('message_delivered', handleMessageDelivered);
      
      return () => {
        socket.off('new_message');
        socket.off('message_delivered');
      };
    }
  }, [socket, chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatData = async () => {
    // Mock data - in real app, fetch from Supabase
    setChatPartner({
      id: 'driver1',
      name: 'John Smith',
      role: 'driver',
      avatar: null,
      isOnline: true,
      lastSeen: new Date()
    });

    setRideInfo({
      id: 'ride123',
      pickup: '123 Main St, New York, NY',
      destination: '456 Broadway, New York, NY',
      status: 'in_progress',
      estimatedArrival: '5 mins',
      fare: 25
    });

    setMessages([
      {
        id: 1,
        senderId: 'driver1',
        content: 'Hi! I\'m on my way to pick you up. I\'ll be there in about 5 minutes.',
        timestamp: new Date(Date.now() - 300000),
        delivered: true,
        read: true
      },
      {
        id: 2,
        senderId: user?.id,
        content: 'Great! I\'ll be waiting outside. I\'m wearing a blue jacket.',
        timestamp: new Date(Date.now() - 240000),
        delivered: true,
        read: true
      },
      {
        id: 3,
        senderId: 'driver1',
        content: 'Perfect! I\'m driving a blue Toyota Camry, license plate ABC-123.',
        timestamp: new Date(Date.now() - 180000),
        delivered: true,
        read: true
      }
    ]);
  };

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleMessageDelivered = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, delivered: true } : msg
    ));
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      senderId: user?.id,
      content: newMessage,
      timestamp: new Date(),
      delivered: false,
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Send via socket
    if (socket) {
      socket.emit('send_message', {
        chatId,
        message
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Chat Header */}
          <motion.div
            className="bg-white border-b border-gray-200 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  {chatPartner?.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{chatPartner?.name}</h2>
                  <p className="text-sm text-gray-600 capitalize">{chatPartner?.role}</p>
                  <p className="text-xs text-green-600">
                    {chatPartner?.isOnline ? 'Online' : `Last seen ${formatTime(chatPartner?.lastSeen)}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Ride Info Banner */}
          {rideInfo && (
            <motion.div
              className="bg-blue-50 border-b border-blue-200 p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Current Ride</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    {rideInfo.pickup} → {rideInfo.destination}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-blue-700">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>ETA: {rideInfo.estimatedArrival}</span>
                  </div>
                  <span className="font-medium">${rideInfo.fare}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === user?.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                    message.senderId === user?.id ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.senderId === user?.id && (
                      <span>
                        {message.read ? '✓✓' : message.delivered ? '✓' : '○'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <motion.div
            className="border-t border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left">
            <MapPin className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Share Location</h3>
            <p className="text-sm text-gray-600">Send your current location</p>
          </button>
          
          <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left">
            <Phone className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Call Driver</h3>
            <p className="text-sm text-gray-600">Make a voice call</p>
          </button>
          
          <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left">
            <Clock className="h-6 w-6 text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900">ETA Update</h3>
            <p className="text-sm text-gray-600">Request arrival time</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;