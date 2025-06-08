import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'user' | 'driver' | 'tour_agency' | 'bus_operator' | 'admin';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface TourPackage {
  id: string;
  agency_id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

export interface BusRoute {
  id: string;
  operator_id: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  total_seats: number;
  available_seats: number;
  bus_type: string;
  created_at: string;
}

export interface RideRequest {
  id: string;
  user_id: string;
  pickup_location: {
    lat: number;
    lng: number;
    address: string;
  };
  destination_location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  driver_id?: string;
  otp?: string;
  created_at: string;
}

export interface DriverBid {
  id: string;
  ride_request_id: string;
  driver_id: string;
  bid_amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}