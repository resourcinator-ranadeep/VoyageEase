/*
  # Fix User Signup RLS Policies

  This migration fixes the Row Level Security policies for the users table to allow proper user registration.

  ## Changes Made
  1. Drop conflicting RLS policies that prevent signup
  2. Create a simplified and secure policy for user registration
  3. Ensure users can insert their own profile during signup

  ## Security
  - Users can only insert their own profile (where id matches auth.uid())
  - Maintains security while allowing proper signup flow
*/

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow public signup profile creation" ON users;
DROP POLICY IF EXISTS "Allow self-registration for users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to insert their profile" ON users;

-- Create a comprehensive policy for user registration
CREATE POLICY "Enable user registration"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (
    -- Allow insertion if the user ID matches the authenticated user ID
    id = auth.uid()
    -- Ensure required fields are provided
    AND email IS NOT NULL
    AND password_hash IS NOT NULL
  );

-- Ensure the existing policies for other operations remain intact
-- (SELECT, UPDATE, DELETE policies should already exist and work correctly)