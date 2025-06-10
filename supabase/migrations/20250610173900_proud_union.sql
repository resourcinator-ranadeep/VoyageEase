/*
  # Fix RLS Policy for User Signup

  1. Changes
    - Add policy to allow public users to insert their profile during signup
    - This allows the signup process to work correctly by permitting unauthenticated users to create their profile record

  2. Security
    - The policy ensures users can only insert records with their own auth.uid()
    - Maintains security while allowing the signup flow to complete
*/

-- Drop the existing restrictive policy that requires authentication
DROP POLICY IF EXISTS "Allow users to insert their own profile during signup" ON users;

-- Create a new policy that allows public (unauthenticated) users to insert during signup
CREATE POLICY "Allow public signup profile creation"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (
    -- Allow insertion if the id matches the current auth user id
    -- This works during signup because auth.uid() is available even before full authentication
    id = auth.uid()
  );

-- Keep the existing policy for authenticated users to insert (this might be redundant now but keeping for safety)
CREATE POLICY "Allow authenticated users to insert their profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());