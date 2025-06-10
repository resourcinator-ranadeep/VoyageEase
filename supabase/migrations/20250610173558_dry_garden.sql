/*
  # Fix User Signup RLS Policy

  1. Security Updates
    - Add policy to allow users to insert their own profile during signup
    - Ensure proper RLS policies for user registration flow
    
  2. Changes
    - Add INSERT policy for new user registration
    - Update existing policies to handle signup flow properly
*/

-- Drop existing problematic policies if they exist
DROP POLICY IF EXISTS "Allow users to insert their own profile during signup" ON users;

-- Create a policy that allows users to insert their own profile during signup
-- This policy allows INSERT when the user ID matches the authenticated user's ID
CREATE POLICY "Allow users to insert their own profile during signup"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the existing policies are properly configured
-- Update the existing "Allow users to view their own profile" policy to use authenticated role
DROP POLICY IF EXISTS "Allow users to view their own profile" ON users;
CREATE POLICY "Allow users to view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Update the existing "Allow users to update their own profile" policy to use authenticated role  
DROP POLICY IF EXISTS "Allow users to update their own profile" ON users;
CREATE POLICY "Allow users to update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);