-- Supabase Database Schema for Guestbook
-- Run this SQL in your Supabase SQL Editor

-- Create the guestbook table
CREATE TABLE IF NOT EXISTS public.guestbook (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  message TEXT NOT NULL CHECK (length(message) <= 500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS guestbook_created_at_idx ON public.guestbook(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to read messages
CREATE POLICY "Enable read access for all users" 
ON public.guestbook FOR SELECT 
USING (true);

-- Allow anyone to insert messages (rate limiting should be handled at application level)
CREATE POLICY "Enable insert for all users" 
ON public.guestbook FOR INSERT 
WITH CHECK (true);

-- Optional: Add email validation constraint
-- ALTER TABLE public.guestbook 
-- ADD CONSTRAINT valid_email 
-- CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL);

-- Grant permissions
GRANT ALL ON public.guestbook TO anon;
GRANT ALL ON public.guestbook TO authenticated;

-- Insert some sample data (optional)
INSERT INTO public.guestbook (name, email, message) VALUES
  ('Vault Dweller', 'vault@example.com', 'Love the Fallout theme! Outstanding design!'),
  ('Tech Enthusiast', null, 'Your Vue.js skills are impressive. Great work!'),
  ('Recruiter', 'hr@techcorp.com', 'Would love to connect. Please check your email!');
